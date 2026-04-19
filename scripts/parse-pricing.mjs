import fs from 'node:fs';

const text = fs.readFileSync('scripts/ferris-pricing.txt', 'utf8');
const lines = text.split('\n');

// Normalize engine strings
function normalizeEngine(raw) {
  const e = raw.trim();
  if (/Briggs.*Commercial/i.test(e)) return 'Briggs & Stratton Commercial Series';
  if (/Briggs.*CXi/i.test(e)) return 'Briggs & Stratton CXi Series';
  if (/Briggs.*PXi/i.test(e)) return 'Briggs & Stratton PXi';
  if (/Vanguard.*BIG BLOCK/i.test(e)) return 'Vanguard Big Block EFI';
  if (/Vanguard.*810cc.*EFI/i.test(e)) return 'Vanguard 810cc EFI';
  if (/Vanguard.*627cc/i.test(e)) return 'Vanguard 627cc V-Twin';
  if (/Vanguard/i.test(e)) return e.replace(/.*(Vanguard[^,]*?)(w\/.*|$)/, '$1').trim();
  if (/Kawasaki FT730V EFI/i.test(e)) return 'Kawasaki FT730V EFI';
  if (/Kawasaki FT730V/i.test(e)) return 'Kawasaki FT730V';
  if (/Kawasaki FX1000V EFI/i.test(e)) return 'Kawasaki FX1000V EFI';
  if (/Kawasaki FX1000 EFI/i.test(e)) return 'Kawasaki FX1000 EFI';
  if (/Kawasaki FX921V/i.test(e)) return 'Kawasaki FX921V';
  if (/Kawasaki FX850V/i.test(e)) return 'Kawasaki FX850V';
  if (/Kawasaki FX801V/i.test(e)) return 'Kawasaki FX801V';
  if (/Kawasaki FX781V EVO/i.test(e)) return 'Kawasaki FX781V EVO';
  if (/Kawasaki FX781V/i.test(e)) return 'Kawasaki FX781V';
  if (/Kawasaki FX730V/i.test(e)) return 'Kawasaki FX730V';
  if (/Kawasaki FX691V/i.test(e)) return 'Kawasaki FX691V';
  if (/Kawasaki FX651V/i.test(e)) return 'Kawasaki FX651V';
  if (/Kawasaki FX600V/i.test(e)) return 'Kawasaki FX600V';
  if (/Kawasaki FS730V/i.test(e)) return 'Kawasaki FS730V';
  if (/Kawasaki FS691V/i.test(e)) return 'Kawasaki FS691V';
  if (/Kawasaki FS600V/i.test(e)) return 'Kawasaki FS600V';
  if (/Honda/i.test(e)) return 'Honda GXV390';
  if (/CAT Turbocharged/i.test(e)) return 'CAT Turbo Diesel';
  if (/Yanmar/i.test(e)) return 'Yanmar Diesel';
  return e;
}

// Normalize model name
function normalizeModel(m) {
  const n = m.replace(/TM/gi, '').replace(/[^\w\d ]/g, '').trim();
  if (/^F60$/i.test(n)) return 'F60';
  if (/^ISX? 800$/i.test(n)) return 'ISX 800';
  if (/^ISX? 2200$/i.test(n)) return 'ISX 2200';
  if (/^ISX? 3300$/i.test(n)) return 'ISX 3300';
  if (/^IS 2600$/i.test(n)) return 'IS 2600';
  if (/^IS 6200$/i.test(n)) return 'IS 6200';
  if (/^SRS? Z1$/i.test(n)) return 'SRS Z1';
  if (/^SRS? Z2$/i.test(n)) return 'SRS Z2';
  if (/^SRS? Z3X$/i.test(n)) return 'SRS Z3X';
  if (/^FW15$/i.test(n)) return 'FW15';
  if (/^FW25$/i.test(n)) return 'FW25';
  if (/^FW45$/i.test(n)) return 'FW45';
  if (/^ProCut S$/i.test(n)) return 'ProCut S';
  return n;
}

// Parse rows - handle "header spec" rows where the full spec+pricing is on a header line and subsequent SKU rows reference it
const rows = [];
let pendingSpec = null; // { description, msrp, map } from a header row missing SKU

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // Match pattern: ModelName SKU RestOfLine... MSRP MAP ... (and possibly 4 more prices)
  // Handle tabular: 7-digit SKU somewhere in line
  const skuMatch = line.match(/\b(59\d{5})\b/);
  if (!skuMatch) continue;
  const sku = skuMatch[1];

  // Try to extract the whole row. Extract everything after SKU up to any 2+ price dollar figures
  const afterSku = line.slice(line.indexOf(sku) + sku.length).trim();

  // Model name is what's before the SKU
  const before = line.slice(0, line.indexOf(sku)).trim();
  const model = normalizeModel(before);

  // Extract all dollar amounts
  const priceRe = /\$[\d,]+/g;
  const prices = afterSku.match(priceRe) || [];
  // Description: from start of afterSku up to first $
  const firstDollar = afterSku.indexOf('$');
  let description = firstDollar >= 0 ? afterSku.slice(0, firstDollar).trim() : afterSku.trim();

  // If the line has no prices and no description → it's a continuation SKU referencing the previous header's spec
  if (prices.length === 0 && description === '') {
    // Search upward for the nearest header-continuation row: "Number   {spec...}   MSRP   MAP"
    for (let j = i - 1; j >= 0 && j > i - 6; j--) {
      const prev = lines[j];
      if (/Number\s+\S.*\$[\d,]+\s+\$[\d,]+/.test(prev)) {
        const idx = prev.indexOf('Number') + 'Number'.length;
        const rest = prev.slice(idx).trim();
        const rPrices = rest.match(priceRe) || [];
        const rFirst = rest.indexOf('$');
        description = rFirst >= 0 ? rest.slice(0, rFirst).trim() : '';
        if (rPrices.length >= 2) {
          rows.push(parseRow(model, sku, description, rPrices[0], rPrices[1]));
        }
        break;
      }
    }
    continue;
  }

  if (prices.length >= 2) {
    rows.push(parseRow(model, sku, description, prices[0], prices[1]));
  }
}

function parseRow(model, sku, desc, msrpStr, mapStr) {
  const msrp = Number(msrpStr.replace(/[^0-9]/g, ''));
  const map = Number(mapStr.replace(/[^0-9]/g, ''));

  // Extract deck size
  const deckMatch = desc.match(/(\d+)"\s*Deck/i);
  const deck = deckMatch ? `${deckMatch[1]}"` : '';

  // Extract horsepower
  const hpMatch = desc.match(/([\d.]+)\s*(gross|net)\s*hp/i);
  const hp = hpMatch ? `${hpMatch[1]} hp` : '';

  // Extract engine (between hp marker and deck, roughly)
  let engineRaw = desc
    .replace(/^[\d.]+\s*(gross|net)\s*hp\*{0,2}\^?\s*/i, '')
    .replace(/w\/[^$]*$/, '')
    .replace(/\s+(Manual|Electric)\s*Start\s*/i, ' ')
    .replace(/\s*-\s*CC Control\s*/i, '')
    .trim();
  const engine = normalizeEngine(engineRaw);

  return { model, sku, engine, hp, deck, msrp, map, desc };
}

// Print CSV-style
console.log('MODEL | SKU | ENGINE | HP | DECK | MSRP | MAP');
for (const r of rows) {
  console.log(`${r.model} | ${r.sku} | ${r.engine} | ${r.hp} | ${r.deck} | $${r.msrp} | $${r.map}`);
}
console.log(`\nTotal: ${rows.length} rows`);

fs.writeFileSync('scripts/ferris-pricing-parsed.json', JSON.stringify(rows, null, 2));
