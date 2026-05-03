// One-shot price sync to match SLE Equipment listed prices.
// Reads lib/products.ts, updates `price` on each alias and the matching
// variant in the canonical's variants[]. Also tags name with "(Instant
// Rebate Included)" where SLE has that tag. Idempotent — safe to re-run.

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS = join(__dirname, '..', 'lib', 'products.ts');

// SKU → { price, hasRebateTag, percentOff } pulled from sleequipment.com 2026-05-02
const SLE = {
  '5902061': { price: 9199,  pct: 9,  rebate: true  }, // IS 700 60" 27HP Briggs FS
  '5902206': { price: 5299,  pct: 6,  rebate: false }, // 300S 48" 21.5HP KAW
  '5902155': { price: 10899, pct: 15, rebate: false }, // ISX 800 52" 24HP Kawasaki
  '5901940': { price: 9349,  pct: 14, rebate: true  }, // SRS Z1 48" 22HP KAW
  '5902064': { price: 17299, pct: 14, rebate: true  }, // ISX 3300 60" 40HP Vanguard (canonical)
  '5902065': { price: 17649, pct: 10, rebate: true  }, // ISX 3300 60" 38.5HP KAW EFI
  '5902074': { price: 11449, pct: 10, rebate: true  }, // ISX 800 60" 26HP KAW EFI
  '5902075': { price: 10399, pct: 14, rebate: true  }, // ISX 800 60" 27HP Briggs Susp
  '5902078': { price: 13749, pct: 9,  rebate: false }, // ISX 2200 60" 28HP VAN EFI
  '5902101': { price: 6499,  pct: 6,  rebate: false }, // 500S 48" 25HP Briggs (canonical)
  '5902103': { price: 7349,  pct: 14, rebate: false }, // 500S 61" 25HP Briggs
  '5902145': { price: 17999, pct: 6,  rebate: true  }, // ISX 3300 72" 40HP VAN EFI
  '5902154': { price: 10699, pct: 14, rebate: false }, // ISX 800 52" 27HP Briggs Susp
  '5902157': { price: 12949, pct: 11, rebate: true  }, // ISX 2200 52" 28HP Vanguard
  '5902159': { price: 12699, pct: 9,  rebate: true  }, // ISX 2200 52" 30.5HP KAW (canonical)
  '5902162': { price: 38049, pct: 14, rebate: false }, // IS 6200 72" 48HP CAT Diesel
  '5902180': { price: 13349, pct: 17, rebate: false }, // ISX 2200 60" 30.5HP KAW
  '5902216': { price: 13849, pct: 19, rebate: true  }, // SRS Z3X 60" 40HP Vanguard
  '5902235': { price: 10599, pct: 15, rebate: true  }, // SRS Z2 52" 30.5HP KAW
  '5901939': { price: 8499,  pct: 15, rebate: true  }, // SRS Z1 36" 19HP KAW (15% derived from $9999 → $8499)
};

// The Cab variant is a separate listing with its own SKU pattern in our store.
// SLE listed it under SKU 5902064 with cab, so we treat the existing cab entry
// (sku contains '5902064-cab' or similar) separately.
const CAB_SKUS = {
  // Will fuzzy-match; see runtime resolution below
  cab_isx3300: { price: 29300, pct: 19, rebate: false }, // ISX 3300 60" w/ Curtis Cab
};

const src = readFileSync(PRODUCTS, 'utf8');

// Walk the products array and update price fields. Use simple regex on each
// JSON-like block to keep edits surgical.
let out = src;
const summary = [];

for (const [sku, target] of Object.entries(SLE)) {
  // Implied MSRP from SLE's "-X%" badge: round to nearest $50 (matches Ferris's
  // public MSRP convention). msrp = price / (1 - pct/100).
  const impliedMsrp = Math.round((target.price / (1 - target.pct / 100)) / 50) * 50;

  // 1) Update the standalone alias/canonical entry whose top-level "sku": "<SKU>".
  // Match the entry block from { ... "sku": "<SKU>" ... } including its "price"
  // and "msrp" lines, replace those numbers.
  const entryRe = new RegExp(
    `("sku":\\s*"${sku}"[\\s\\S]*?"price":\\s*)(\\d+)([\\s\\S]*?"msrp":\\s*)(\\d+)`,
    'g',
  );
  let entryReplaced = 0;
  out = out.replace(entryRe, (m, p1, _oldPrice, p3, _oldMsrp) => {
    entryReplaced++;
    return `${p1}${target.price}${p3}${impliedMsrp}`;
  });

  // 2) Update the variant inside canonical's variants[]: the variant block
  // that has its own "sku": "<SKU>" inside a {} with "price" + "msrp".
  // Already covered by the broader entry regex above when the variant block
  // is the one being matched (variants[] entries are also { sku, price, msrp }).
  // To catch BOTH the alias entry AND the variant entry, run again with a
  // narrower variant-only pattern.
  const variantRe = new RegExp(
    `(\\{[^{}]*?"sku":\\s*"${sku}"[^{}]*?"price":\\s*)(\\d+)([^{}]*?"msrp":\\s*)(\\d+)`,
    'g',
  );
  let variantReplaced = 0;
  out = out.replace(variantRe, (m, p1, _oldPrice, p3, _oldMsrp) => {
    variantReplaced++;
    return `${p1}${target.price}${p3}${impliedMsrp}`;
  });

  // 3) Tag the alias entry name with "(Instant Rebate Included)" when SLE has it,
  // and ensure tag isn't duplicated.
  if (target.rebate) {
    const nameRe = new RegExp(
      `("sku":\\s*"${sku}"[\\s\\S]*?"name":\\s*")([^"]+)(")`,
      'g',
    );
    out = out.replace(nameRe, (m, p1, name, p3) => {
      if (name.includes('Instant Rebate Included')) return m;
      return `${p1}${name} (Instant Rebate Included)${p3}`;
    });
  }

  summary.push({
    sku,
    price: target.price,
    msrp: impliedMsrp,
    pct: target.pct,
    rebate: target.rebate,
    entryHits: entryReplaced,
    variantHits: variantReplaced,
  });
}

writeFileSync(PRODUCTS, out, 'utf8');

console.log('SLE price sync complete:');
console.table(summary);
const matched = summary.filter((s) => s.entryHits + s.variantHits > 0).length;
console.log(`\n${matched} of ${summary.length} SKUs matched in lib/products.ts`);
const unmatched = summary.filter((s) => s.entryHits + s.variantHits === 0);
if (unmatched.length) {
  console.log('UNMATCHED (not present in products.ts):');
  unmatched.forEach((s) => console.log(`  ${s.sku}`));
}
