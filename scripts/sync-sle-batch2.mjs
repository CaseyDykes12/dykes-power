// Phase 2 SLE price sync. Pulled live from sleequipment.com Shopify
// /products/<handle>.json on 2026-05-02. Only bare-mower SKUs are synced
// here — bundle/package listings (with trailer or handhelds bundled in) are
// excluded since SLE's price reflects the bundle, not just the machine.

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PRODUCTS = join(__dirname, '..', 'lib', 'products.ts');

// Bare-mower SLE listings (no bundle/package extras included). Prices direct
// from /products/<handle>.json `variants[0].price` and `compare_at_price`.
const SLE = {
  '5902204': { price: 4499,  msrp: 4949,  rebate: false }, // 300R 42" 23HP Briggs PXi
  '5902205': { price: 4699,  msrp: 5169,  rebate: false }, // 300R 42" 21.5HP KAW
  '5902102': { price: 6899,  msrp: 7259,  rebate: false }, // 500S 52" 25HP Briggs
  '5902110': { price: 7899,  msrp: 8689,  rebate: false }, // IS 600 48" 25HP Briggs
  '5901911': { price: 8749,  msrp: 9624,  rebate: false }, // IS 600 52" 23HP Kawasaki
  '5901895': { price: 7499,  msrp: 8249,  rebate: false }, // F60 36" 19HP Kawasaki
  '5902165': { price: 10699, msrp: 13144, rebate: true  }, // SRS Z2 52" 25.5HP Kawasaki
  '5902233': { price: 12499, msrp: 15289, rebate: true  }, // SRS Z3X 52" 38.5HP KAW
  '5902217': { price: 13099, msrp: 15949, rebate: true  }, // SRS Z3X 52" 40HP Vanguard
  '5901887': { price: 7799,  msrp: 8579,  rebate: false }, // FW25 48" 18.5HP Kawasaki
  '5902015': { price: 9749,  msrp: 10723, rebate: false }, // FW45 52" 20.5HP KAW
  '5902016': { price: 10349, msrp: 11999, rebate: false }, // FW45 61" Hydro 23.5HP Kawasaki
};

const src = readFileSync(PRODUCTS, 'utf8');
let out = src;
const summary = [];

for (const [sku, target] of Object.entries(SLE)) {
  // Update top-level entry: "sku": "<SKU>" ... "price": <n> ... "msrp": <n>
  const entryRe = new RegExp(
    `("sku":\\s*"${sku}"[\\s\\S]*?"price":\\s*)(\\d+)([\\s\\S]*?"msrp":\\s*)(\\d+|null)`,
    'g',
  );
  let entryReplaced = 0;
  out = out.replace(entryRe, (m, p1, _oldPrice, p3, _oldMsrp) => {
    entryReplaced++;
    return `${p1}${target.price}${p3}${target.msrp}`;
  });

  // Update variant block inside canonical's variants[]
  const variantRe = new RegExp(
    `(\\{[^{}]*?"sku":\\s*"${sku}"[^{}]*?"price":\\s*)(\\d+)([^{}]*?"msrp":\\s*)(\\d+|null)`,
    'g',
  );
  let variantReplaced = 0;
  out = out.replace(variantRe, (m, p1, _oldPrice, p3, _oldMsrp) => {
    variantReplaced++;
    return `${p1}${target.price}${p3}${target.msrp}`;
  });

  // Tag name with "(Instant Rebate Included)" if SLE has it (alias entries
  // only — won't match canonical's `name` because the regex grabs the first
  // "name" field within the entry block bounded by the SKU lookup).
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
    msrp: target.msrp,
    rebate: target.rebate,
    entryHits: entryReplaced,
    variantHits: variantReplaced,
  });
}

writeFileSync(PRODUCTS, out, 'utf8');

console.log('SLE batch-2 sync complete:');
console.table(summary);
const matched = summary.filter((s) => s.entryHits + s.variantHits > 0).length;
console.log(`\n${matched} of ${summary.length} SKUs matched in lib/products.ts`);
