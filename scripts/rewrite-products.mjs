import fs from 'node:fs';

const consolidated = JSON.parse(fs.readFileSync('scripts/ferris-consolidated.json', 'utf8'));
const PATH = 'lib/products.ts';
let src = fs.readFileSync(PATH, 'utf8');

function slugify(model, mfr) {
  return `${model} ${mfr}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function engineLabel(mfr) {
  const map = {
    Kawasaki: 'Kawasaki',
    Briggs: 'Briggs & Stratton',
    Vanguard: 'Vanguard',
    Honda: 'Honda',
    Yanmar: 'Yanmar Diesel',
    CAT: 'CAT Turbo Diesel',
    Other: '',
  };
  return map[mfr] || mfr;
}

// Find a product block by SKU. Captures the entire { ... }, block.
function findBlock(source, sku) {
  const re = new RegExp(`\\n  \\{\\s*\\n(?:[^\\n]*\\n)*?    sku: ['"]${sku}['"],[\\s\\S]*?\\n  \\},`, 'm');
  const m = source.match(re);
  return m ? { match: m[0], index: m.index } : null;
}

function extractField(block, field) {
  const re = new RegExp(`\\n    ${field}:\\s*([^\\n]+?),?\\n`);
  const m = block.match(re);
  return m ? m[1].trim().replace(/,$/, '') : null;
}

// Build listings (skip listings whose hero SKU isn't found — these are Basco-only adds we handle separately)
const listings = [];
const skuToSlug = {}; // all SKUs → canonical slug
const absorbedSkus = new Set(); // non-hero SKUs to delete from products.ts
const heroSkus = new Set();

for (const group of consolidated) {
  const slug = slugify(group.model, group.manufacturer);
  const hero = group.options[0]; // smallest deck first (sorted already)
  heroSkus.add(hero.sku);

  const deckOptions = group.options.map((o) => ({
    sku: o.sku,
    deck: o.deck,
    price: o.map,
    msrp: o.msrp,
    horsepower: o.hp,
  }));

  listings.push({
    slug,
    model: group.model,
    manufacturer: group.manufacturer,
    heroSku: hero.sku,
    engine: engineLabel(group.manufacturer),
    deckOptions,
  });

  for (const o of group.options) {
    skuToSlug[o.sku] = slug;
    if (o.sku !== hero.sku) absorbedSkus.add(o.sku);
  }
}

console.log(`Listings: ${listings.length}`);
console.log(`Hero SKUs: ${heroSkus.size}`);
console.log(`Absorbed (to delete): ${absorbedSkus.size}`);

// --- Update hero SKU blocks: inject slug, manufacturer, deckOptions; update engine, horsepower, deckSizes, price, msrp ---
for (const listing of listings) {
  const found = findBlock(src, listing.heroSku);
  if (!found) {
    console.log(`  MISSING hero block: ${listing.heroSku} (${listing.slug}) — skipping`);
    continue;
  }
  let block = found.match;
  const hero = listing.deckOptions[0];
  const allDecks = listing.deckOptions.map((d) => d.deck).filter((d) => d !== '');

  // Update deckSizes
  block = block.replace(
    /\n    deckSizes:\s*\[[^\]]*\],/,
    `\n    deckSizes: ${JSON.stringify(allDecks)},`
  );
  // Update engine — keep existing if already descriptive; otherwise set manufacturer label
  // We'll leave existing engine string; manufacturer is separately tracked.
  // Update horsepower
  block = block.replace(
    /\n    horsepower:\s*['"][^'"]*['"],/,
    `\n    horsepower: '${hero.horsepower}',`
  );
  // Update price and msrp to hero (smallest-deck) values
  block = block.replace(
    /\n    price:\s*[^,\n]+,/,
    `\n    price: ${hero.price},`
  );
  block = block.replace(
    /\n    msrp:\s*[^,\n]+,/,
    `\n    msrp: ${hero.msrp},`
  );

  // Insert slug, manufacturer, deckOptions right before closing "\n  },"
  const insertLines =
    `\n    slug: '${listing.slug}',` +
    `\n    manufacturer: '${listing.manufacturer}',` +
    `\n    deckOptions: ${JSON.stringify(listing.deckOptions)},`;
  block = block.replace(/\n  \},\s*$/, `${insertLines}\n  },`);

  src = src.replace(found.match, block);
}

// --- Delete absorbed (non-hero) SKU blocks ---
let deleted = 0;
for (const sku of absorbedSkus) {
  const found = findBlock(src, sku);
  if (!found) {
    console.log(`  absorbed but not found: ${sku}`);
    continue;
  }
  src = src.replace(found.match, '');
  deleted++;
}
console.log(`Deleted ${deleted} absorbed product blocks`);

fs.writeFileSync(PATH, src);

// Also write redirect map (old SKU → new slug)
const redirectMap = {};
for (const sku of absorbedSkus) {
  redirectMap[sku] = skuToSlug[sku];
}
fs.writeFileSync('scripts/sku-redirects.json', JSON.stringify(redirectMap, null, 2));
console.log(`Wrote sku-redirects.json with ${Object.keys(redirectMap).length} entries`);
