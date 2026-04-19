import fs from 'node:fs';

const rows = JSON.parse(fs.readFileSync('scripts/ferris-pricing-parsed.json', 'utf8'));

// Add missing rows I saw by eye in the raw PDF
const manualAdds = [
  { model: 'ISX 2200', sku: '5902157', engine: 'Vanguard 810cc EFI', hp: '28 hp', deck: '52"', msrp: 14519, map: 13199 },
  { model: 'SRS Z3X',  sku: '5902169', engine: 'Kawasaki FX850V',    hp: '27 hp', deck: '52"', msrp: 13694, map: 12449 },
  { model: 'FW45',     sku: '5902016', engine: 'Kawasaki FX730V',    hp: '23.5 hp', deck: '61"', msrp: 10999, map: 9999 },
];
for (const a of manualAdds) if (!rows.find(r => r.sku === a.sku)) rows.push(a);

// Engine → manufacturer
function manufacturer(engine) {
  if (/Briggs/i.test(engine)) return 'Briggs';
  if (/Kawasaki/i.test(engine)) return 'Kawasaki';
  if (/Vanguard/i.test(engine)) return 'Vanguard';
  if (/Honda/i.test(engine)) return 'Honda';
  if (/Yanmar/i.test(engine)) return 'Yanmar';
  if (/CAT/i.test(engine)) return 'CAT';
  return 'Other';
}

// Group by (model, manufacturer)
const groups = {};
for (const r of rows) {
  if (r.model === 'ProCut S' && /Deck Assembly/i.test(r.engine || r.desc || '')) continue; // skip deck-only
  const key = `${r.model} | ${manufacturer(r.engine)}`;
  (groups[key] ||= []).push(r);
}

// Sort deck options by deck size
function deckNum(d) { const m = String(d).match(/\d+/); return m ? Number(m[0]) : 0; }

const consolidated = [];
for (const [key, list] of Object.entries(groups)) {
  list.sort((a,b) => deckNum(a.deck) - deckNum(b.deck) || a.map - b.map);
  const [model, mfr] = key.split(' | ');

  // Within the same deck, dedup: keep lower-MAP (better for customer). Note duplicates.
  const byDeck = {};
  for (const r of list) {
    const d = r.deck;
    if (!byDeck[d] || r.map < byDeck[d].map) byDeck[d] = r;
  }
  const options = Object.values(byDeck).sort((a,b)=> deckNum(a.deck)-deckNum(b.deck));

  consolidated.push({
    model, manufacturer: mfr,
    optionCount: options.length,
    deckSizes: options.map(o => o.deck),
    startingMAP: options[0].map,
    topMAP: options[options.length-1].map,
    options,
  });
}

// Print summary
consolidated.sort((a,b) => a.model.localeCompare(b.model) || a.manufacturer.localeCompare(b.manufacturer));
console.log('PROPOSED LISTINGS (commercial models from PDF):\n');
for (const c of consolidated) {
  const decks = c.options.map(o => `${o.deck} $${o.map.toLocaleString()}`).join(' / ');
  console.log(`• ${c.model} — ${c.manufacturer}`);
  console.log(`    Decks: ${decks}`);
  console.log(`    SKUs: ${c.options.map(o=>o.sku).join(', ')}`);
}
console.log(`\nTotal listings: ${consolidated.length}`);

fs.writeFileSync('scripts/ferris-consolidated.json', JSON.stringify(consolidated, null, 2));
