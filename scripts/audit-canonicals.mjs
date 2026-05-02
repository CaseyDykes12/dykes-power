// Use ts-node-style: read the products.ts source as text, transpile to JS by stripping types.
import { readFileSync } from 'fs';
import { tmpdir } from 'os';
import { writeFileSync } from 'fs';
import { join } from 'path';

const src = readFileSync(new URL('../lib/products.ts', import.meta.url), 'utf8');

// Pull just the products array body (between the opening [ and the closing ])
const startIdx = src.indexOf('export const products: Product[] = [');
const arrayStart = src.indexOf('= [', startIdx) + 2;
// Find matching closing bracket
let depth = 0;
let arrayEnd = -1;
let inStr = false;
for (let i = arrayStart; i < src.length; i++) {
  const c = src[i];
  const prev = src[i - 1];
  if (c === '"' && prev !== '\\') inStr = !inStr;
  if (inStr) continue;
  if (c === '[') depth++;
  else if (c === ']') {
    depth--;
    if (depth === 0) { arrayEnd = i; break; }
  }
}
const arrayLiteral = src.slice(arrayStart, arrayEnd + 1);

// JSON.parse can't handle JS-style trailing commas, comments, or unquoted keys.
// products.ts uses double-quoted keys + values, no trailing commas. Should parse as JSON.
let data;
try {
  data = JSON.parse(arrayLiteral);
} catch (e) {
  // Fallback: eval as JS
  data = eval('(' + arrayLiteral + ')');
}

const aliases = data.filter(p => p.canonicalSku);
const canonicals = new Set(aliases.map(a => a.canonicalSku));

console.log(`${data.length} total products`);
console.log(`${aliases.length} aliases (have canonicalSku)`);
console.log(`${canonicals.size} distinct canonical SKUs referenced`);
console.log();
console.log('Canonical-entry status:');
for (const csku of [...canonicals].sort()) {
  const entry = data.find(p => p.sku === csku);
  if (!entry) {
    console.log(`  ${csku}: MISSING from products.ts`);
    continue;
  }
  const aliasesForThis = aliases.filter(a => a.canonicalSku === csku);
  const variants = entry.variants ?? [];
  console.log(`  ${csku} (${entry.name}): ${aliasesForThis.length} aliases, variants[] has ${variants.length} entries`);
  // Check that every alias SKU is represented in variants[]
  const variantSkus = new Set(variants.map(v => v.sku));
  const missing = aliasesForThis.filter(a => !variantSkus.has(a.sku));
  if (missing.length) {
    console.log(`    MISSING from variants[]: ${missing.map(m => m.sku).join(', ')}`);
  }
  // Also check the canonical's own SKU is in variants[]
  if (variants.length && !variantSkus.has(csku)) {
    console.log(`    NOTE: canonical ${csku} not listed in its own variants[] (might be intentional)`);
  }
}

console.log();
console.log('Families that may need consolidation (multiple SKUs share name but no canonical link):');
const byName = {};
for (const p of data) {
  if (!byName[p.name]) byName[p.name] = [];
  byName[p.name].push(p);
}
for (const [name, group] of Object.entries(byName).sort()) {
  if (group.length === 1) continue;
  const canonical = group.find(p => !p.canonicalSku && p.variants?.length);
  const linkedAliases = group.filter(p => p.canonicalSku);
  const orphans = group.filter(p => p !== canonical && !p.canonicalSku);
  if (orphans.length) {
    console.log(`  ${name}: ${group.length} total, canonical=${canonical?.sku ?? 'NONE'}, ${linkedAliases.length} linked aliases, ${orphans.length} ORPHANS:`);
    orphans.forEach(o => console.log(`    - ${o.sku} (${o.engine ?? '?'}, ${o.deckSizes?.join('+') ?? '?'})`));
  }
}
