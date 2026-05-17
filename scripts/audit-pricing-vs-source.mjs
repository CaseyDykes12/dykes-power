#!/usr/bin/env node
/**
 * Reconciles lib/products.ts against:
 *   1. ferris-prices-2026-clean.json   (authoritative MSRP + MAP per SKU)
 *   2. ferris-rebates-may-2026.json    (current month's consumer rebate per family)
 *
 * Correct site values:
 *   correct_msrp  = pricing.msrp
 *   correct_price = pricing.map - rebate_for_family
 *
 * Output: pricing-discrepancies.md (markdown table of every mismatch)
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- products.ts ---
const src = readFileSync(join(__dirname, '../lib/products.ts'), 'utf8');
const startIdx = src.indexOf('export const products: Product[] = [');
const arrayStart = src.indexOf('= [', startIdx) + 2;
let depth = 0,
  arrayEnd = -1,
  inStr = false;
for (let i = arrayStart; i < src.length; i++) {
  const c = src[i],
    prev = src[i - 1];
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
const products = JSON.parse(src.slice(arrayStart, arrayEnd + 1));

// --- sources ---
const pricing = JSON.parse(
  readFileSync(join(__dirname, 'ferris-prices-2026-clean.json'), 'utf8'),
);
const pricingBySku = new Map(pricing.map((p) => [p.sku, p]));
const rebates = JSON.parse(
  readFileSync(join(__dirname, 'ferris-rebates-may-2026.json'), 'utf8'),
);

// --- family inference from product name on site ---
function inferFamily(name) {
  const n = name.replace(/[®™]/g, '').trim();
  // Most specific first
  const tests = [
    [/300e/i, '300e'],
    [/300R/i, '300R'],
    [/300S/i, '300S'],
    [/500S/i, '500S'],
    [/F60/i, 'F60'],
    [/ISX[^0-9]*3300/i, 'ISX 3300'],
    [/ISX[^0-9]*2200/i, 'ISX 2200'],
    [/ISX[^0-9]*800/i, 'ISX 800'],
    [/IS[^0-9]*6200/i, 'IS 6200'],
    [/IS[^0-9]*2600/i, 'IS 2600'],
    [/IS[^0-9]*700/i, 'IS 700'],
    [/IS[^0-9]*600/i, 'IS 600'],
    [/SRS[^Z]*Z3X/i, 'SRS Z3X'],
    [/SRS[^Z]*Z2/i, 'SRS Z2'],
    [/SRS[^Z]*Z1/i, 'SRS Z1'],
    [/FW15/i, 'FW15'],
    [/FW25/i, 'FW25'],
    [/FW45/i, 'FW45'],
    [/FB1000/i, 'FB1000'],
    [/FB2000/i, 'FB2000'],
    [/FB3000/i, 'FB3000'],
    [/ProCut/i, 'ProCut S'],
    [/Pathfinder/i, 'Pathfinder'],
    [/Rover/i, 'Rover'],
    [/Venture/i, 'Venture'],
  ];
  for (const [re, fam] of tests) if (re.test(n)) return fam;
  return '?';
}

const rows = [];

function evaluate(siteSku, siteName, siteMsrp, sitePrice, variantLabel = '') {
  const family = inferFamily(siteName);
  const ref = pricingBySku.get(siteSku);
  const rebate = rebates.rebatesByFamily[family] ?? 0;
  const knownNoRebate = rebates.noRebate.includes(family);

  let correctMsrp = null;
  let correctMap = null;
  let correctPrice = null;
  let pdfStatus = 'PDF_OK';

  if (!ref) {
    pdfStatus = 'NOT_IN_PDF';
  } else {
    correctMsrp = ref.msrp;
    correctMap = ref.map;
    correctPrice = ref.map - rebate;
  }

  const msrpOk = correctMsrp == null || siteMsrp === correctMsrp;
  const priceOk = correctPrice == null || sitePrice === correctPrice;
  const familyOk = family !== '?';

  let action = 'OK';
  const issues = [];
  if (!familyOk) issues.push('FAMILY_UNKNOWN');
  if (pdfStatus === 'NOT_IN_PDF') issues.push('NOT_IN_PDF');
  if (!msrpOk) issues.push('MSRP_DRIFT');
  if (!priceOk) issues.push('PRICE_DRIFT');
  if (!familyOk && !knownNoRebate && pdfStatus === 'PDF_OK') {
    // Family unknown but we have PDF — still flag
  }
  if (issues.length) action = issues.join('+');

  rows.push({
    sku: siteSku,
    name: siteName + variantLabel,
    family,
    rebate,
    siteMsrp,
    sitePrice,
    correctMsrp,
    correctMap,
    correctPrice,
    action,
  });
}

for (const p of products) {
  if (p.canonicalSku) continue;
  evaluate(p.sku, p.name, p.msrp, p.price);
  if (p.variants) {
    for (const v of p.variants) {
      evaluate(v.sku, p.name, v.msrp, v.price, ` (${v.deckSize})`);
    }
  }
}

// --- report ---
const fmt = (n) => (typeof n === 'number' ? `$${n.toLocaleString()}` : '—');
const lines = [];
lines.push('# Dykes Power — Pricing Reconciliation (vs Ferris All-Prices PDF + May 2026 rebates)');
lines.push(`Generated: ${new Date().toISOString()}\n`);

const okRows = rows.filter((r) => r.action === 'OK');
const badRows = rows.filter((r) => r.action !== 'OK');

lines.push('## Summary');
lines.push(`- Site SKUs evaluated: ${rows.length}`);
lines.push(`- ✅ Match: ${okRows.length}`);
lines.push(`- ❌ Need correction: ${badRows.length}`);

const noPdf = rows.filter((r) => r.action.includes('NOT_IN_PDF')).length;
const msrpDrift = rows.filter((r) => r.action.includes('MSRP_DRIFT')).length;
const priceDrift = rows.filter((r) => r.action.includes('PRICE_DRIFT')).length;
const unknownFam = rows.filter((r) => r.action.includes('FAMILY_UNKNOWN')).length;
lines.push(`- Not in PDF: ${noPdf}`);
lines.push(`- MSRP mismatch: ${msrpDrift}`);
lines.push(`- Price (= MAP − rebate) mismatch: ${priceDrift}`);
lines.push(`- Family inference failed: ${unknownFam}\n`);

lines.push('## Corrections needed\n');
lines.push('| SKU | Model | Family | Site MSRP | Site Price | → MSRP | MAP | − Rebate | = Price | Action |');
lines.push('|---|---|---|---:|---:|---:|---:|---:|---:|---|');
for (const r of badRows) {
  lines.push(
    `| ${r.sku} | ${r.name} | ${r.family} | ${fmt(r.siteMsrp)} | ${fmt(r.sitePrice)} | ${fmt(r.correctMsrp)} | ${fmt(r.correctMap)} | ${r.rebate ? '−$' + r.rebate : '$0'} | ${fmt(r.correctPrice)} | ${r.action} |`,
  );
}

writeFileSync(join(__dirname, '..', 'pricing-discrepancies.md'), lines.join('\n'), 'utf8');
console.log(`Wrote pricing-discrepancies.md`);
console.log(`Summary: ${okRows.length} OK, ${badRows.length} need correction.`);
console.log(`Breakdown: ${noPdf} not-in-PDF, ${msrpDrift} MSRP drift, ${priceDrift} price drift, ${unknownFam} unknown family.`);
