// Consolidate Ferris mower products by model family.
// Strategy:
//   1. Group all non-aliased products by `name` (model family).
//   2. Pick the SKU with the smallest deck as the canonical.
//   3. Collapse every sibling entry into the canonical's `variants` array.
//   4. Non-canonicals get `canonicalSku` set and keep their SKU so old URLs resolve.
//   5. Canonical's `deckSizes` becomes the sorted unique list across variants.
//   6. Canonical's `price` becomes the smallest-deck variant price (default).
// Also validates deck sizes against the authoritative Ferris catalog and drops
// any SKU whose deck doesn't match what Ferris actually sells.

import fs from 'node:fs';
import path from 'node:path';

const IN = 'lib/products.ts';
const BACKUP = 'lib/products.before-consolidate.ts.bak';

// Authoritative deck sizes Ferris actually manufactures. Source: ferrismowers.com.
const VALID_DECKS = {
  'Ferris F60 Zero Turn':             ['36"'],
  'Ferris 300e Series':               ['42"', '48"'],
  'Ferris 300R Series':               ['42"'],
  'Ferris 300S Series':               ['42"', '48"', '52"'],
  'Ferris 500S Series':               ['48"', '52"', '61"'],
  'Ferris IS® 600 Series':            ['48"', '52"'],
  'Ferris IS® 700 Series':            ['52"', '60"'],
  'Ferris ISX™ 800 Series':           ['52"', '60"'],
  'Ferris ISX™ 2200 Series':          ['52"', '60"'],
  'Ferris ISX™ 3300 Series':          ['60"', '72"'],
  'Ferris IS® 2600 Series':           ['61"'],
  'Ferris IS® 6200 Series':           ['72"'],
  'Ferris SRS™ Z1 Series':            ['36"', '48"'],
  'Ferris SRS™ Z2 Series':            ['52"', '60"'],
  'Ferris SRS™ Z3X Series':           ['52"', '60"', '72"'],
  'Ferris FW15 Walk-Behind':          ['32"'],
  'Ferris FW25 Walk-Behind':          ['36"', '48"'],
  'Ferris FW45 Walk-Behind':          ['48"', '52"', '61"'],
  'Ferris ProCut S':                  ['61"'],
  // Non-deck products — no deck validation
  'Ferris FB1000 Hurricane™':         [],
  'Ferris FB2000 Hurricane™':         [],
  'Ferris FB3000 Hurricane™':         [],
  'Ferris Venture XC™ FS3200':        [],
  'Ferris Venture X':                 [],
  'Ferris Pathfinder XC™ FS2200':     [],
  'Ferris Pathfinder™ FS2100':        [],
  'Ferris Rover XC™ FS1200':          [],
};

// Parse the TypeScript products array via eval after stripping types.
// (This is a one-shot migration — we trust the shape of our own source file.)
const src = fs.readFileSync(IN, 'utf8');
fs.writeFileSync(BACKUP, src);
console.log(`Backed up original to ${BACKUP}`);

// Extract the products array by matching "export const products: Product[] = [ ... ];"
const match = src.match(/export const products: Product\[\] = (\[[\s\S]*?\n\]);/);
if (!match) {
  console.error('Could not find products array in', IN);
  process.exit(1);
}

// Eval inside a minimal sandbox. The array uses TS-specific literals like `as const` — we
// don't need those because the file already types it. Strip any trailing `as const`.
const arrSrc = match[1].replace(/\s+as\s+const/g, '');
const products = eval(arrSrc); // eslint-disable-line no-eval
console.log(`Loaded ${products.length} products`);

function deckInches(d) {
  const m = String(d || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 99;
}

function smallestDeck(arr) {
  return [...arr].sort((a, b) => deckInches(a) - deckInches(b))[0];
}

// Group by name, dropping any entry whose deck isn't in VALID_DECKS for that family.
const byName = {};
const dropped = [];
for (const p of products) {
  // If the canonical Name isn't in our validation map, keep the product as-is (non-mower).
  if (!(p.name in VALID_DECKS)) {
    byName[p.name] = byName[p.name] || [];
    byName[p.name].push(p);
    continue;
  }
  const validDecks = VALID_DECKS[p.name];
  const productDeck = (p.deckSizes || [])[0] || '';
  if (validDecks.length > 0 && !validDecks.includes(productDeck)) {
    dropped.push({ sku: p.sku, name: p.name, deck: productDeck, reason: `${productDeck} not in ${validDecks.join('/')}` });
    continue;
  }
  byName[p.name] = byName[p.name] || [];
  byName[p.name].push(p);
}

if (dropped.length) {
  console.log(`\nDropped ${dropped.length} SKUs with invalid decks:`);
  for (const d of dropped) console.log(`  - ${d.sku} (${d.name}) — ${d.reason}`);
}

// For each family, pick canonical (smallest deck, lowest price tiebreaker).
const consolidated = [];
for (const [name, group] of Object.entries(byName)) {
  // Non-mower families (blowers, sprayers) — keep each product as-is.
  if (!(name in VALID_DECKS) || VALID_DECKS[name].length === 0) {
    consolidated.push(...group);
    continue;
  }

  // Sort: smallest deck first, then lowest price, then first engine alphabetically
  group.sort((a, b) => {
    const da = deckInches((a.deckSizes || [])[0]);
    const db = deckInches((b.deckSizes || [])[0]);
    if (da !== db) return da - db;
    const pa = a.price ?? Infinity;
    const pb = b.price ?? Infinity;
    if (pa !== pb) return pa - pb;
    return String(a.engine).localeCompare(String(b.engine));
  });

  const canonical = group[0];
  const variants = group.map((g) => ({
    sku: g.sku,
    engine: g.engine,
    horsepower: g.horsepower,
    deckSize: (g.deckSizes || [])[0] || '',
    price: g.price,
    msrp: g.msrp,
    status: g.status,
  }));

  const allDecks = [...new Set(variants.map((v) => v.deckSize).filter(Boolean))]
    .sort((a, b) => deckInches(a) - deckInches(b));

  // Canonical keeps its fields but gets the full variants array and union deck list.
  const canonicalOut = {
    ...canonical,
    deckSizes: allDecks,
    variants,
  };
  consolidated.push(canonicalOut);

  // Non-canonical siblings: point to canonical, skip catalog listing, keep route.
  for (const g of group.slice(1)) {
    consolidated.push({
      ...g,
      canonicalSku: canonical.sku,
    });
  }
}

console.log(`\nConsolidated: ${products.length} → ${consolidated.length} entries (${consolidated.filter(p => !p.canonicalSku).length} canonical)`);

// Serialize back to TypeScript. We preserve the file prefix (types + exports)
// and only replace the products array.
const serialized = JSON.stringify(consolidated, null, 2);
const newFile = src.replace(match[0], `export const products: Product[] = ${serialized};`);
fs.writeFileSync(IN, newFile);
console.log(`\nWrote ${IN}`);

// Summary of canonicals with variant counts and deck sizes.
console.log('\n── Canonicals ──');
for (const p of consolidated.filter((x) => !x.canonicalSku)) {
  const vCount = p.variants ? p.variants.length : 1;
  console.log(`  ${p.sku.padEnd(10)} ${p.name.padEnd(32)} decks=${(p.deckSizes || []).join(',').padEnd(14)} variants=${vCount}`);
}
