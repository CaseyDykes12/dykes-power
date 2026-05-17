#!/usr/bin/env node
/**
 * Lists every product (and variant) with MSRP, price, dollar gap, and
 * implied rebate %. Output is a markdown table so Casey can paste it into
 * a doc and reconcile against the current Ferris rebate sheet.
 *
 * Usage: node scripts/audit-rebates.mjs > rebate-audit.md
 *
 * Parses lib/products.ts as text (same pattern as audit-canonicals.mjs) so
 * we don't need a TS loader for this throwaway script.
 */
import { readFileSync } from 'fs';

const src = readFileSync(new URL('../lib/products.ts', import.meta.url), 'utf8');

const startIdx = src.indexOf('export const products: Product[] = [');
const arrayStart = src.indexOf('= [', startIdx) + 2;
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
    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }
}

const arrText = src.slice(arrayStart, arrayEnd + 1);
const products = JSON.parse(arrText);

const rows = [];

for (const p of products) {
  if (p.canonicalSku) continue;

  const price = p.price;
  const msrp = p.msrp;
  let status = '';
  let gap = 0;
  let pct = 0;

  if (price == null || msrp == null) {
    status = 'NO_PRICE';
  } else if (price > msrp) {
    status = 'PRICE_OVER_MSRP';
    gap = price - msrp;
  } else if (price === msrp) {
    status = 'NO_REBATE';
  } else {
    gap = msrp - price;
    pct = Math.round((gap / msrp) * 100);
    status = 'OK';
  }

  rows.push({
    sku: p.sku,
    name: p.name,
    category: p.category,
    msrp: msrp ?? '',
    price: price ?? '',
    gap,
    pct,
    status,
  });

  if (p.variants) {
    for (const v of p.variants) {
      if (v.price === p.price && v.msrp === p.msrp) continue;
      const vGap =
        v.msrp != null && v.price != null && v.msrp > v.price
          ? v.msrp - v.price
          : 0;
      const vPct = vGap && v.msrp ? Math.round((vGap / v.msrp) * 100) : 0;
      rows.push({
        sku: `  ↳ ${v.sku}`,
        name: `(variant ${v.deckSize})`,
        category: p.category,
        msrp: v.msrp ?? '',
        price: v.price ?? '',
        gap: vGap,
        pct: vPct,
        status: vGap > 0 ? 'OK' : v.price === v.msrp ? 'NO_REBATE' : 'CHECK',
      });
    }
  }
}

const fmt = (n) =>
  typeof n === 'number' && n ? `$${n.toLocaleString()}` : n === 0 ? '' : n;

const isParent = (r) => !r.sku.startsWith('  ');
const summary = {
  total: rows.filter(isParent).length,
  ok: rows.filter((r) => r.status === 'OK' && isParent(r)).length,
  noRebate: rows.filter((r) => r.status === 'NO_REBATE' && isParent(r)).length,
  noPrice: rows.filter((r) => r.status === 'NO_PRICE' && isParent(r)).length,
  overMsrp: rows.filter((r) => r.status === 'PRICE_OVER_MSRP' && isParent(r))
    .length,
};

console.log(`# Dykes Power — Rebate Audit\n`);
console.log(`Generated: ${new Date().toISOString()}\n`);
console.log(`## Summary\n`);
console.log(`- Total products: ${summary.total}`);
console.log(`- With rebate (msrp > price): ${summary.ok}`);
console.log(`- No rebate (msrp == price): ${summary.noRebate}`);
console.log(`- No price set: ${summary.noPrice}`);
console.log(`- Price > MSRP (data error): ${summary.overMsrp}\n`);

console.log(`## All products\n`);
console.log(
  `| SKU | Name | Category | MSRP | Price | Rebate ($) | Rebate (%) | Status |`,
);
console.log(`|---|---|---|---:|---:|---:|---:|---|`);
for (const r of rows) {
  console.log(
    `| ${r.sku} | ${r.name} | ${r.category} | ${fmt(r.msrp)} | ${fmt(r.price)} | ${fmt(r.gap)} | ${r.pct ? r.pct + '%' : ''} | ${r.status} |`,
  );
}
