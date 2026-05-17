#!/usr/bin/env node
/**
 * Cross-references our site SKUs against the 2026 Ferris PDF.
 *
 * For each site SKU that is NOT in the PDF, proposes the closest PDF SKU
 * based on family + deck size (so Casey can verify before we rewrite
 * products.ts + image filenames + URL slugs).
 *
 * Output: sku-mapping-proposal.md
 */
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const src = readFileSync(join(ROOT, 'lib/products.ts'), 'utf8');
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
const pdf = JSON.parse(readFileSync(join(__dirname, 'ferris-prices-2026-clean.json'), 'utf8'));
const pdfBySku = new Map(pdf.map((p) => [p.sku, p]));

function siteFamily(name) {
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
    [/Venture XC/i, 'Venture'], // Venture XC FS3200 -> just "Venture" in PDF
    [/Venture/i, 'Venture'],
  ];
  for (const [re, f] of tests) if (re.test(n)) return f;
  return '?';
}

function deckOf(item) {
  if (item.deckSize) {
    const m = item.deckSize.match(/\d+/);
    return m ? m[0] : null;
  }
  return null;
}

function findPdfMatch(family, deck, hpHint) {
  const candidates = pdf.filter((p) => p.model_family === family);
  if (!candidates.length) return null;
  if (deck) {
    const sameDeck = candidates.filter((c) => c.deck === deck);
    if (sameDeck.length === 1) return sameDeck[0];
    if (sameDeck.length > 1) {
      // Pick by HP if available
      if (hpHint) {
        const exact = sameDeck.find((c) => c.hp === hpHint);
        if (exact) return exact;
      }
      // Pick lowest MSRP as default
      return sameDeck.sort((a, b) => a.msrp - b.msrp)[0];
    }
    return null;
  }
  // No deck — single-config products
  if (candidates.length === 1) return candidates[0];
  return null;
}

const rows = [];

function evaluate(siteSku, siteName, siteMsrp, sitePrice, siteImg, deckSize, hp) {
  const fam = siteFamily(siteName);
  const inPdf = pdfBySku.get(siteSku);
  const deck = deckSize ? (deckSize.match(/\d+/) || [null])[0] : null;
  const hpClean = hp ? hp.replace(/\s+gross|HP|hp/g, '').match(/\d+(\.\d+)?/)?.[0] : null;

  if (inPdf) {
    rows.push({
      action: 'KEEP_SKU',
      siteSku,
      siteName,
      proposedSku: siteSku,
      fam,
      deck,
      pdfMsrp: inPdf.msrp,
      pdfMap: inPdf.map,
      siteMsrp,
      sitePrice,
      img: siteImg,
    });
    return;
  }

  // Special-case: skip 300e and Curtis cab per Casey
  if (fam === '300e' || siteSku.includes('curtis')) {
    rows.push({
      action: 'KEEP_AS_IS',
      siteSku,
      siteName,
      proposedSku: siteSku,
      fam,
      deck,
      pdfMsrp: null,
      pdfMap: null,
      siteMsrp,
      sitePrice,
      img: siteImg,
      note: 'No rebate, keep current price',
    });
    return;
  }

  const match = findPdfMatch(fam, deck, hpClean);
  if (match) {
    rows.push({
      action: 'SKU_SWAP',
      siteSku,
      siteName,
      proposedSku: match.sku,
      fam,
      deck,
      pdfMsrp: match.msrp,
      pdfMap: match.map,
      siteMsrp,
      sitePrice,
      img: siteImg,
      raw: match.raw,
    });
  } else {
    rows.push({
      action: 'NO_MATCH',
      siteSku,
      siteName,
      proposedSku: null,
      fam,
      deck,
      pdfMsrp: null,
      pdfMap: null,
      siteMsrp,
      sitePrice,
      img: siteImg,
      note: 'Could not find matching family+deck in PDF',
    });
  }
}

for (const p of products) {
  if (p.canonicalSku) continue;
  evaluate(p.sku, p.name, p.msrp, p.price, p.imageUrl, p.deckSizes?.[0], p.horsepower);
  if (p.variants) {
    for (const v of p.variants) {
      evaluate(v.sku, p.name + ` (${v.deckSize})`, v.msrp, v.price, p.imageUrl, v.deckSize, v.horsepower);
    }
  }
}

const fmt = (n) => (typeof n === 'number' ? `$${n.toLocaleString()}` : '—');

const out = [];
out.push('# Site → PDF SKU Mapping Proposal\n');
out.push(`Generated: ${new Date().toISOString()}\n`);

const buckets = {
  SKU_SWAP: rows.filter((r) => r.action === 'SKU_SWAP'),
  NO_MATCH: rows.filter((r) => r.action === 'NO_MATCH'),
  KEEP_AS_IS: rows.filter((r) => r.action === 'KEEP_AS_IS'),
};

out.push(`## Summary\n`);
out.push(`- Site SKUs evaluated: ${rows.length}`);
out.push(`- Already in PDF (no SKU change, price update only): ${rows.filter((r) => r.action === 'KEEP_SKU').length}`);
out.push(`- **Need SKU swap to PDF SKU**: ${buckets.SKU_SWAP.length}`);
out.push(`- No PDF match found (manual): ${buckets.NO_MATCH.length}`);
out.push(`- Keep as-is (300e / Curtis cab): ${buckets.KEEP_AS_IS.length}\n`);

if (buckets.SKU_SWAP.length) {
  out.push(`## Proposed SKU swaps\n`);
  out.push(`| Current SKU | → New SKU | Model | Family | Deck | Site Price | PDF MAP | PDF Match |`);
  out.push(`|---|---|---|---|---|---:|---:|---|`);
  for (const r of buckets.SKU_SWAP) {
    out.push(`| **${r.siteSku}** | **${r.proposedSku}** | ${r.siteName} | ${r.fam} | ${r.deck ?? '—'}" | ${fmt(r.sitePrice)} | ${fmt(r.pdfMap)} | ${r.raw?.slice(0, 60)}… |`);
  }
  out.push('');
}

if (buckets.NO_MATCH.length) {
  out.push(`## NO MATCH — need your input\n`);
  out.push(`| Site SKU | Model | Family | Deck | Site MSRP | Site Price | Note |`);
  out.push(`|---|---|---|---|---:|---:|---|`);
  for (const r of buckets.NO_MATCH) {
    out.push(`| ${r.siteSku} | ${r.siteName} | ${r.fam} | ${r.deck ?? '—'}" | ${fmt(r.siteMsrp)} | ${fmt(r.sitePrice)} | ${r.note} |`);
  }
  out.push('');
}

if (buckets.KEEP_AS_IS.length) {
  out.push(`## Keep as-is\n`);
  out.push(`| Site SKU | Model | Family | Site Price | Note |`);
  out.push(`|---|---|---|---:|---|`);
  for (const r of buckets.KEEP_AS_IS) {
    out.push(`| ${r.siteSku} | ${r.siteName} | ${r.fam} | ${fmt(r.sitePrice)} | ${r.note ?? ''} |`);
  }
  out.push('');
}

writeFileSync(join(ROOT, 'sku-mapping-proposal.md'), out.join('\n'), 'utf8');
console.log(`Wrote sku-mapping-proposal.md`);
console.log(`KEEP_SKU: ${rows.filter((r) => r.action === 'KEEP_SKU').length}, SKU_SWAP: ${buckets.SKU_SWAP.length}, NO_MATCH: ${buckets.NO_MATCH.length}, KEEP_AS_IS: ${buckets.KEEP_AS_IS.length}`);
