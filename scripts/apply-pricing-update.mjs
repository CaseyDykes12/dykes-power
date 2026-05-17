#!/usr/bin/env node
/**
 * Applies the full pricing reconciliation to lib/products.ts:
 *   1. Removes SKU 5902144 (300S 42" — discontinued in 2026 lineup)
 *   2. Swaps 9 stale/wrong SKUs to their 2026 PDF SKU equivalents
 *      (also updates imageUrl path so the SKU in the path matches)
 *   3. For every SKU now matching the Ferris PDF: sets price = MAP − rebate
 *   4. For engine-variant SKUs Casey carries that aren't in the 2026 PDF:
 *      treats current `price` as MAP, subtracts family rebate
 *   5. For 300e + Curtis cab: leaves alone (no rebate)
 *
 * Writes back lib/products.ts with the same TS wrapper, just the
 * products[] array body regenerated as JSON.stringify(...).
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ---------- INPUTS ----------
const src = readFileSync(join(ROOT, 'lib/products.ts'), 'utf8');
const pdf = JSON.parse(readFileSync(join(__dirname, 'ferris-prices-2026-clean.json'), 'utf8'));
const rebates = JSON.parse(readFileSync(join(__dirname, 'ferris-rebates-may-2026.json'), 'utf8'));

const pdfBySku = new Map(pdf.map((p) => [p.sku, p]));

// SKU swaps approved by Casey 2026-05-17.
// For some of these, the "target" SKU already exists as a separate product
// in products.ts (the old SKU was effectively a duplicate listing). When
// that's the case, we DELETE the old entry instead of renaming, so we don't
// create a duplicate parent SKU. The new SKU's existing entry will just
// get its msrp/price aligned to the PDF.
const SKU_SWAPS = {
  '5902084': '5902154', // ISX 800 52"  (target already on site → delete old)
  '5901948': '5902164', // SRS Z2 52"   (target already on site → delete old)
  '5901892': '5902015', // FW45 52"     (target already on site → delete old)
  '5902132': '5902193', // FB2000 Hurricane (target NOT on site → rename)
  '5902000': '5902199', // Rover XC FS1200 (target NOT on site → rename)
  '5901752': '5902208', // Pathfinder FS2100 (target NOT on site → rename)
  '5901753': '5902209', // Pathfinder XC FS2200 (target NOT on site → rename)
  '5901755': '5902195', // Venture XC FS3200 (target already on site as Venture X → delete old)
  '5901887': '5901888', // FW25 48"     (target already on site → delete old)
};

const REMOVE_SKUS = new Set(['5902144']);

// SKUs Casey wants kept (engine variants not in PDF) — apply rebate to current price (= MAP)
const ENGINE_VARIANT_KEEP = new Set(['5902169', '5902071', '5901891']);
// Family inference for keep-alone SKUs
const KEEP_FAMILY = {
  '5902169': 'SRS Z3X',
  '5902071': 'SRS Z3X',
  '5901891': 'FW45',
  '5901955': 'SRS Z3X', // canonical alias — handled separately
};

// ---------- FIND ARRAY BOUNDS ----------
const si = src.indexOf('export const products: Product[] = [');
const ast = src.indexOf('= [', si) + 2;
let depth = 0,
  ae = -1,
  inStr = false;
for (let i = ast; i < src.length; i++) {
  const c = src[i],
    prev = src[i - 1];
  if (c === '"' && prev !== '\\') inStr = !inStr;
  if (inStr) continue;
  if (c === '[') depth++;
  else if (c === ']') {
    depth--;
    if (depth === 0) {
      ae = i;
      break;
    }
  }
}
const products = JSON.parse(src.slice(ast, ae + 1));

// ---------- TRANSFORM ----------
const stats = {
  removed: 0,
  swapped: 0,
  priceUpdatedPdf: 0,
  priceUpdatedKeep: 0,
  keepAsIs: 0,
  variantSwapped: 0,
  variantPriceUpdated: 0,
};

function inferFamily(name) {
  const n = name.replace(/[®™]/g, '').trim();
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
    [/Pathfinder XC/i, 'Pathfinder XC'],
    [/Pathfinder/i, 'Pathfinder'],
    [/Rover XC/i, 'Rover XC'],
    [/Rover/i, 'Rover'],
    [/Venture/i, 'Venture'],
  ];
  for (const [re, f] of tests) if (re.test(n)) return f;
  return null;
}

function getRebate(family) {
  return rebates.rebatesByFamily[family] ?? 0;
}

function swapImagePath(url, oldSku, newSku) {
  if (!url) return url;
  return url.replace(new RegExp(`/${oldSku}/`, 'g'), `/${newSku}/`)
            .replace(new RegExp(`/${oldSku}_`, 'g'), `/${newSku}_`)
            .replace(new RegExp(`/${oldSku}\\.`, 'g'), `/${newSku}.`);
}

function processItem(item, parentName, existingParentSkus) {
  // Returns new item or null to remove
  if (REMOVE_SKUS.has(item.sku)) {
    stats.removed++;
    return null;
  }

  const family = inferFamily(parentName ?? item.name ?? '');

  // SKU swap
  if (SKU_SWAPS[item.sku]) {
    const newSku = SKU_SWAPS[item.sku];
    // Collision: if the target SKU is already a parent in products.ts,
    // delete this entry entirely — the existing target entry will get the
    // price update below.
    if (!parentName && existingParentSkus.has(newSku)) {
      stats.removed++;
      return null;
    }
    const ref = pdfBySku.get(newSku);
    if (!ref) {
      console.error(`!! Swap target ${newSku} not in PDF — keeping ${item.sku} as-is`);
    } else {
      const rebate = getRebate(family);
      const newPrice = ref.map - rebate;
      const oldSku = item.sku;
      item.sku = newSku;
      item.msrp = ref.msrp;
      item.price = newPrice;
      if (item.imageUrl) item.imageUrl = swapImagePath(item.imageUrl, oldSku, newSku);
      if (item.images) item.images = item.images.map((u) => swapImagePath(u, oldSku, newSku));
      if (parentName) stats.variantSwapped++;
      else stats.swapped++;
    }
  } else if (pdfBySku.has(item.sku)) {
    // SKU already correct — just align msrp + price
    const ref = pdfBySku.get(item.sku);
    const rebate = getRebate(family);
    item.msrp = ref.msrp;
    item.price = ref.map - rebate;
    if (parentName) stats.variantPriceUpdated++;
    else stats.priceUpdatedPdf++;
  } else if (ENGINE_VARIANT_KEEP.has(item.sku)) {
    // Engine variant — treat current price as MAP, apply family rebate
    const fam = KEEP_FAMILY[item.sku] ?? family;
    const rebate = rebates.rebatesByFamily[fam] ?? 0;
    if (item.price && rebate) {
      item.price = item.price - rebate;
      stats.priceUpdatedKeep++;
    } else {
      stats.keepAsIs++;
    }
  } else {
    // 300e, Curtis cab, canonical aliases — leave alone
    stats.keepAsIs++;
  }

  // Recurse into variants
  if (item.variants) {
    item.variants = item.variants
      .map((v) => processItem(v, parentName ?? item.name, existingParentSkus))
      .filter(Boolean);
  }

  return item;
}

const existingParentSkus = new Set(products.map((p) => p.sku));
const newProducts = products
  .map((p) => processItem(p, null, existingParentSkus))
  .filter(Boolean);

// ---------- SERIALIZE ----------
// JSON.stringify with 2-space indent matches the existing file style.
const newArrayBody = JSON.stringify(newProducts, null, 2);
const newSrc = src.slice(0, ast) + ' ' + newArrayBody + src.slice(ae + 1);

writeFileSync(join(ROOT, 'lib/products.ts'), newSrc, 'utf8');

console.log('Wrote lib/products.ts');
console.log('Stats:');
console.log(`  Removed products:        ${stats.removed}`);
console.log(`  SKU swaps (parent):      ${stats.swapped}`);
console.log(`  SKU swaps (variant):     ${stats.variantSwapped}`);
console.log(`  Price updates (in PDF):  ${stats.priceUpdatedPdf} parents + ${stats.variantPriceUpdated} variants`);
console.log(`  Price updates (engine):  ${stats.priceUpdatedKeep}`);
console.log(`  Untouched (300e/curtis): ${stats.keepAsIs}`);
console.log(`  Total products now:      ${newProducts.length}`);
