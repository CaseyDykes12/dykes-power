// Build parts.ts from Ferris dealer CSV.
// Picks the ~80 highest-demand consumables, applies dealer_cost × 1.5 markup.

import fs from 'node:fs';
import path from 'node:path';

const CSV = 'C:/Users/Cdyke/Downloads/PricePartsFerrisFULL.csv';
const OUT = 'lib/parts.ts';
const MARKUP = 1.40; // 40% markup on dealer cost

const raw = fs.readFileSync(CSV, 'utf8');
const lines = raw.split(/\r?\n/).slice(2); // skip effective-date line + header

const rows = [];
for (const line of lines) {
  if (!line.trim()) continue;
  const cols = line.split(',');
  if (cols[0] !== 'FER') continue;
  const [q, part, desc, superceder, priceStr, discountCode, returnCode, date] = cols;
  const price = parseFloat(priceStr);
  if (isNaN(price) || price <= 0) continue;
  if (superceder && superceder.trim()) continue; // skip superseded parts
  rows.push({ part: part.trim(), desc: (desc || '').trim(), cost: price });
}

// Human descriptions keyed by category. Short, counter-voice, no AI filler.
// Multiple variants per category — rotate by SKU index so parts in the same
// category don't all read identical.
const descVariants = {
  Blades: [
    '3-blade set for {size} iCD decks. Same OEM pattern Ferris builds their mowers with. Swap all three at once or you will feel it in the cut.',
    'OEM replacement set for {size} decks. Keeps the discharge clean and the stripe sharp.',
    'Factory blade set for {size} decks. Run one season, replace as a set — cheaper than limping along with a dull one.',
    '{size} deck blade set. Same part Ferris puts on new mowers — don’t settle for the off-brand.',
    '{size} deck blade set, OEM pattern. Sharpen twice, replace as a set on the third go.',
    'Ferris blade set for {size} decks. Balanced at the factory — aftermarket sets throw vibration.',
  ],
  Belts: [
    'OEM drive belt. Run the aftermarket version and you will be back in a season — not worth the $30 you saved.',
    'Factory belt, same part Ferris ships from Munnsville. Tension and length matched to the deck.',
    'Direct replacement belt. If the deck is slipping or squealing, this is usually your fix.',
    'OEM belt for the iCD drive system. Belts that stretch throw the whole deck off — stay OEM.',
    'Factory spec drive belt. Generics always look close on the tape measure and never run right.',
    'OEM replacement. Keep a spare in the shop — belts fail mid-job, not on a Sunday afternoon.',
    'Same belt the factory uses. If yours is glazed or cracked, don’t wait for it to snap.',
    'Factory belt, original spec. One of those parts you only miss when it’s gone.',
  ],
  'Air Filters': [
    'OEM air filter. Change it yearly or every 200 hours, whichever hits first.',
    'Paper element with pre-cleaner wrap. Cheap insurance against dust eating your engine.',
    'Factory service part. If you’re mowing dry dusty lots, check it every 50 hours.',
    'OEM replacement. The generic ones on Amazon fit loose and let grit past.',
    'Original-spec air filter. Pre-cleaner wrap pulls off for a tap-out, element goes yearly.',
    'Factory air filter. Running a dirty one costs you horsepower and fuel both.',
  ],
  'Oil Filters': [
    'Spin-on oil filter. Swap it every oil change — don’t skip it.',
    'OEM filter. An $8 filter beats a $3,000 engine every time.',
    'Factory spec spin-on. Same one the dealer puts on at service.',
    'OEM replacement filter. Spins on by hand — snug it a three-quarter turn after it seats.',
    'Original spec oil filter. Skipping this on an oil change is how engines die young.',
  ],
  'Fuel Filters': [
    'In-line fuel filter. Keeps the carburetor clean and the engine starting.',
    'OEM replacement. Swap yearly or when you notice hard starting.',
    'Factory fuel filter. Gum builds up fast in ethanol fuel — stay ahead of it.',
    'Original-spec filter. Plumb it with the flow arrow pointing toward the carb.',
  ],
  'Spark Plugs': [
    'Sold each. Most V-twins run two — order a pair.',
    'Pre-gapped OEM plug. Drop-in replacement, no adjustment needed.',
    'Factory spark plug. Change them every 100 hours or when you notice rough idle.',
    'OEM plug, sold individually. Torque to 15 ft-lb — don’t cross-thread it in an aluminum head.',
  ],
  'Spindles & Bearings': [
    'Drop-in spindle assembly with bearing already pressed in. Saves you the shop press fee.',
    'Complete OEM spindle. Bolt it on and re-belt — done in 20 minutes.',
    'Factory spindle assembly. Replace in pairs on the same deck — bearings wear together.',
    'Pre-assembled OEM spindle. If yours has play in the shaft or hum under load, it’s toast.',
    'Original-spec spindle. The cast housing matters — stamped-steel knock-offs crack.',
  ],
  Pulleys: [
    'OEM replacement pulley. Precision-balanced so the belt doesn’t walk.',
    'Factory-spec pulley. If the belt is chewing itself up, this is usually why.',
    'Direct replacement. Same bore and groove as original.',
    'Original OEM pulley. Aftermarket pulleys run rough and eat belts.',
    'Factory pulley. Spin the old one by hand — if the bearing growls, replace it now.',
  ],
  'Tires & Wheels': [
    'Turf-saver tread. Pivots on the grass without tearing it up.',
    'Standard zero-turn rear drive tire. Bolt pattern matches factory.',
    'Replacement tire, same size as stock. Run around 10 PSI for the best ride.',
    'Factory-size tire. Matching fronts and rears is the single easiest way to improve ride quality.',
    'OEM-spec tire. Air pressure changes your scalp and ride more than most people realize.',
  ],
  'Seats & Controls': [
    'Direct bolt-in operator seat. Same mount as factory — no bracket work.',
    'OEM replacement seat. If you’re mowing 30+ hours a week this isn’t a luxury.',
    'Factory seat. Worn-out seats are the #1 comfort complaint — fix it before your back tells you to.',
    'Original-spec seat. Most operators run their seats past the point where the cushion is gone.',
  ],
  Electrical: [
    'OEM switch. Plug-in replacement — no rewiring.',
    'Direct electrical replacement. Connectors match factory.',
    'Factory replacement. Test the old one with a meter before you swap — half the time the switch is fine and the wiring is the problem.',
    'Original-spec electrical component. Read your wiring color codes against the service manual before install.',
    'OEM part. Disconnect the battery before you swap any electrical — saves a lot of blue smoke.',
    'Factory replacement electrical part. Crimp connectors, then dab them with liquid tape.',
  ],
  'Deck Parts': [
    'OEM deck hardware. Direct replacement.',
    'Factory part. If the deck is scarring grass or not washing clean, this is the fix.',
    'Bolt-on replacement. Same hardware as stock.',
    'Original-spec deck component. Use stainless hardware when reinstalling if you can.',
  ],
  Accessories: [
    'Bolt-on accessory kit. Hardware included.',
    'Factory accessory. Direct fit — no cutting or drilling.',
  ],
  'Engine Parts': [
    'OEM engine component. Match by engine model, not mower model.',
    'Factory replacement part. Verify against your engine serial tag before ordering.',
    'Original-spec engine component. Write down your engine family tag before calling if you need help matching.',
    'OEM part from the engine manufacturer. Aftermarket castings often have different bolt spacing.',
  ],
  'Hydraulic Components': [
    'Heavy-duty Hydro-Gear component. Match by transaxle model — not all ZT series use the same parts.',
    'OEM hydraulic part. If your mower is creeping when it should stop, this area is where to look.',
    'Factory Hydro-Gear replacement. Bleed the system after install — air in the lines means slow response.',
  ],
};

function humanDesc(category, size, index) {
  const variants = descVariants[category] || ['OEM replacement. Fits Ferris mowers — match by model before ordering.'];
  const tpl = variants[index % variants.length];
  return size ? tpl.replace('{size}', size) : tpl.replace(/{size} ?/g, '');
}

function sizeFromDesc(d) {
  const m = d.match(/\b(36|42|44|48|52|60|61|72)\b/);
  return m ? `${m[1]}"` : '';
}

// Match helpers: pick the first row where desc contains all keywords.
function find(keywords, opts = {}) {
  const { exclude = [], minCost = 0, maxCost = Infinity } = opts;
  const lower = keywords.map((k) => k.toLowerCase());
  const exc = exclude.map((k) => k.toLowerCase());
  return rows.find((r) => {
    const d = r.desc.toLowerCase();
    if (!lower.every((k) => d.includes(k))) return false;
    if (exc.some((k) => d.includes(k))) return false;
    if (r.cost < minCost || r.cost > maxCost) return false;
    return true;
  });
}

function all(keywords, opts = {}) {
  const { exclude = [] } = opts;
  const lower = keywords.map((k) => k.toLowerCase());
  const exc = exclude.map((k) => k.toLowerCase());
  return rows.filter((r) => {
    const d = r.desc.toLowerCase();
    return lower.every((k) => d.includes(k)) && !exc.some((k) => d.includes(k));
  });
}

// Price helper — dealer cost × 1.5, rounded to nearest $0.99 psychological.
function retail(cost) {
  const r = cost * MARKUP;
  return Math.round(r) - 0.01 >= r ? Math.round(r) - 0.01 : Math.floor(r) + 0.99;
}

const parts = [];
const seen = new Set();
const catIndex = {}; // rotate description variants per category

function add({ part, desc, cost, category, name, fits, oem = true, imageUrl, description = '' }) {
  if (seen.has(part)) return;
  seen.add(part);
  const idx = (catIndex[category] || 0);
  catIndex[category] = idx + 1;
  // Pull size from whatever source string is available (legacy `description`
  // argument carries the raw CSV desc, e.g., "BLADE SET MULCH 52 DECK").
  const sourceText = (description || '') + ' ' + (desc || '') + ' ' + name;
  const size = sizeFromDesc(sourceText);
  const humanDescription = humanDesc(category, size, idx);
  parts.push({
    partNumber: part,
    name,
    category,
    description: humanDescription,
    price: retail(cost),
    imageUrl,
    fits,
    inStock: true,
    oem,
    dealerCost: cost,
  });
}

// ─── BLADES ──────────────────────────────────────────────────────────────────
const bladeTargets = [
  { desc: 'High-Lift Blade Set — 48" Deck', key: ['blade set', '48'], fits: ['300S (48")', 'IS 600 (48")', 'SRS Z1 (48")', 'FW25 (48")', 'FW45 (48")'] },
  { desc: 'High-Lift Blade Set — 52" Deck', key: ['blade set'], exclude: ['mulch', '48', '44', '61', '72'], fits: ['IS 600 (52")', 'IS 700 (52")', 'ISX 800 (52")', 'ISX 2200 (52")', 'SRS Z3X (52")', 'SRS Z2 (52")', 'FW45 (52")'], prefer: '5101755S' },
  { desc: 'Mulching Blade Set — 52" Deck', key: ['blade set', 'mulch', '52'], fits: ['IS 600 (52")', 'IS 700 (52")', 'ISX 800 (52")', 'ISX 2200 (52")', 'SRS Z3X (52")'] },
  { desc: 'Mulching Blade Set — 61" Deck', key: ['blade set', 'mulch', '61'], fits: ['500S (61")', 'IS 2600 (61")', 'ProCut S (61")'] },
  { desc: 'High-Lift Blade Set — 44" Deck', key: ['blade set', '44'], fits: ['Ferris 44" decks'] },
  { desc: 'High-Lift Blade Set — 72" Deck', key: ['blade set', '72'], fits: ['IS 6200 (72")', 'ISX 3300 (72")', 'SRS Z3X (72")'] },
];

for (const t of bladeTargets) {
  let row = null;
  if (t.prefer) row = rows.find((r) => r.part === t.prefer);
  if (!row) row = find(t.key, { exclude: t.exclude || [] });
  if (!row) continue;
  add({
    part: row.part,
    cost: row.cost,
    category: 'Blades',
    name: t.desc,
    description: `Genuine Ferris OEM blade set — ${row.desc.trim().replace(/\s+/g, ' ')}. Direct factory replacement for consistent cut quality.`,
    fits: t.fits,
    imageUrl: '/images/parts/blade.jpg',
  });
}

// ─── BELTS ───────────────────────────────────────────────────────────────────
const belts = rows.filter((r) => /^BELT\b|^BELT DRIVE|^BELT SET/i.test(r.desc) && r.cost > 20 && r.cost < 250).slice(0, 10);
for (const r of belts) {
  add({
    part: r.part,
    cost: r.cost,
    category: 'Belts',
    name: `OEM Drive Belt — ${r.part}`,
    description: `Genuine Ferris ${r.desc.trim()}. OEM belt for original-spec tension and service life.`,
    fits: ['Verify fit by mower serial number — call (601) 336-2541'],
    imageUrl: '/images/parts/belt.jpg',
  });
  if (parts.filter((p) => p.category === 'Belts').length >= 8) break;
}

// ─── AIR FILTERS ─────────────────────────────────────────────────────────────
const airFilters = rows.filter((r) => /FILTER.*AIR|AIR.*FILTER|FILTER-A\/C|PRE CLEANER/i.test(r.desc) && r.cost > 3 && r.cost < 90);
let airAdded = 0;
for (const r of airFilters) {
  if (airAdded >= 6) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Air Filters',
    name: `OEM Air Filter — ${r.part}`,
    description: `Genuine Ferris/engine-manufacturer OEM air filter — ${r.desc.trim()}. Protects against dust and debris ingestion.`,
    fits: ['Verify engine model before ordering — call (601) 336-2541'],
    imageUrl: '/images/parts/air-filter.jpg',
  });
  airAdded++;
}

// ─── OIL FILTERS ─────────────────────────────────────────────────────────────
const oilFilters = rows.filter((r) => /FILTER.*OIL|OIL.*FILTER/i.test(r.desc) && r.cost > 3 && r.cost < 50);
let oilAdded = 0;
for (const r of oilFilters) {
  if (oilAdded >= 5) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Oil Filters',
    name: `OEM Oil Filter — ${r.part}`,
    description: `Genuine OEM oil filter — ${r.desc.trim()}. Spin-on element for engine longevity.`,
    fits: ['Verify engine model — call (601) 336-2541'],
    imageUrl: '/images/parts/kawasaki-oil-filter.png',
  });
  oilAdded++;
}

// ─── FUEL FILTERS ────────────────────────────────────────────────────────────
const fuelFilters = rows.filter((r) => /FILTER.*FUEL|FUEL.*FILTER/i.test(r.desc) && r.cost > 2 && r.cost < 80);
let fuelAdded = 0;
for (const r of fuelFilters) {
  if (fuelAdded >= 4) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Fuel Filters',
    name: `OEM Fuel Filter — ${r.part}`,
    description: `Genuine OEM fuel filter — ${r.desc.trim()}. Protects carburetor and injectors from contamination.`,
    fits: ['Verify engine model — call (601) 336-2541'],
    imageUrl: '/images/parts/fuel-filter-kit.jpg',
  });
  fuelAdded++;
}

// ─── SPARK PLUGS ─────────────────────────────────────────────────────────────
const sparkPlugs = rows.filter((r) => /SPARK PLUG|SPARK-PLUG|SPARKPLUG/i.test(r.desc) && r.cost > 2 && r.cost < 25);
let spAdded = 0;
for (const r of sparkPlugs) {
  if (spAdded >= 4) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Spark Plugs',
    name: `OEM Spark Plug — ${r.part}`,
    description: `Genuine OEM spark plug — ${r.desc.trim()}. Sold individually — most V-twin engines require 2.`,
    fits: ['Verify engine model — call (601) 336-2541'],
    imageUrl: '/images/parts/spark-plug.jpg',
  });
  spAdded++;
}

// ─── SPINDLES & BEARINGS ─────────────────────────────────────────────────────
const spindles = rows.filter((r) => /SPINDLE ASS?E?M?B?L?Y?|SPINDLE HOUSING/i.test(r.desc) && r.cost > 20 && r.cost < 400);
let spindleAdded = 0;
for (const r of spindles) {
  if (spindleAdded >= 5) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Spindles & Bearings',
    name: `OEM Spindle Assembly — ${r.part}`,
    description: `Genuine Ferris spindle assembly — ${r.desc.trim()}. Heavy-duty cast housing for commercial use.`,
    fits: ['Verify deck model — call (601) 336-2541'],
    imageUrl: '/images/parts/spindle.jpg',
  });
  spindleAdded++;
}

// ─── PULLEYS ─────────────────────────────────────────────────────────────────
const pulleys = rows.filter((r) => /^PULLEY/i.test(r.desc) && !/GUARD/i.test(r.desc) && r.cost > 8 && r.cost < 200);
let pulleyAdded = 0;
for (const r of pulleys) {
  if (pulleyAdded >= 5) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Pulleys',
    name: `OEM Pulley — ${r.part}`,
    description: `Genuine Ferris pulley — ${r.desc.trim()}. Precision-balanced for vibration-free operation.`,
    fits: ['Verify model before ordering — call (601) 336-2541'],
    imageUrl: '/images/parts/pulley.jpg',
  });
  pulleyAdded++;
}

// ─── TIRES & WHEELS ──────────────────────────────────────────────────────────
const tires = rows.filter((r) => /^TIRE|TIRE ASS|WHEEL ASS|^WHEEL\b/i.test(r.desc) && r.cost > 15 && r.cost < 500);
let tireAdded = 0;
for (const r of tires) {
  if (tireAdded >= 5) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Tires & Wheels',
    name: `OEM Tire/Wheel — ${r.part}`,
    description: `Genuine Ferris ${r.desc.trim()}. Commercial-grade tread for zero-turn use.`,
    fits: ['Verify tire size and mower model — call (601) 336-2541'],
    imageUrl: '/images/parts/tire-wheel.jpg',
    oem: false,
  });
  tireAdded++;
}

// ─── SEATS & CONTROLS ────────────────────────────────────────────────────────
const seats = rows.filter((r) => /^SEAT\b|OPERATOR SEAT|SEAT ASS|SEAT PLATE/i.test(r.desc) && r.cost > 50 && r.cost < 1200);
let seatAdded = 0;
for (const r of seats) {
  if (seatAdded >= 4) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Seats & Controls',
    name: `OEM Operator Seat — ${r.part}`,
    description: `Genuine Ferris operator seat — ${r.desc.trim()}. Direct bolt-on replacement.`,
    fits: ['Verify mower model — call (601) 336-2541'],
    imageUrl: '/images/parts/seat.jpg',
  });
  seatAdded++;
}

// ─── ELECTRICAL ──────────────────────────────────────────────────────────────
const ignitions = rows.filter((r) => /IGNITION|KEY SWITCH|SWITCH.*SEAT|SAFETY SWITCH|PTO.*SWITCH|SWITCH.*PTO/i.test(r.desc) && r.cost > 5 && r.cost < 150);
let elecAdded = 0;
for (const r of ignitions) {
  if (elecAdded >= 4) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Electrical',
    name: `OEM Electrical Component — ${r.part}`,
    description: `Genuine Ferris electrical part — ${r.desc.trim()}.`,
    fits: ['Verify mower model — call (601) 336-2541'],
    imageUrl: '/images/parts/pto-switch.jpg',
  });
  elecAdded++;
}

// Add a PTO clutch if available.
const ptoClutches = rows.filter((r) => /PTO CLUTCH|CLUTCH.*PTO|ELECTRIC CLUTCH/i.test(r.desc) && r.cost > 100 && r.cost < 800);
for (const r of ptoClutches.slice(0, 2)) {
  add({
    part: r.part,
    cost: r.cost,
    category: 'Electrical',
    name: `OEM PTO Clutch — ${r.part}`,
    description: `Genuine Ferris electric PTO clutch — ${r.desc.trim()}. Electromagnetic engagement for smooth blade start.`,
    fits: ['Verify mower model — call (601) 336-2541'],
    imageUrl: '/images/parts/pto-switch.jpg',
  });
}

// ─── DECK PARTS ──────────────────────────────────────────────────────────────
const deckParts = rows.filter((r) => /ROLLER|DECK WASH|HEIGHT ADJUST|ANTI.?SCALP/i.test(r.desc) && r.cost > 5 && r.cost < 200);
let deckAdded = 0;
for (const r of deckParts) {
  if (deckAdded >= 4) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Deck Parts',
    name: `OEM Deck Component — ${r.part}`,
    description: `Genuine Ferris ${r.desc.trim()}.`,
    fits: ['Verify deck model — call (601) 336-2541'],
    imageUrl: '/images/parts/deck-chute.jpg',
  });
  deckAdded++;
}

// ─── ACCESSORIES ─────────────────────────────────────────────────────────────
const accessories = rows.filter((r) => /MULCH KIT|STRIPING|STRIPE KIT|MULCH COVER/i.test(r.desc) && r.cost > 30 && r.cost < 600);
let accAdded = 0;
for (const r of accessories) {
  if (accAdded >= 4) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Accessories',
    name: `OEM Accessory — ${r.part}`,
    description: `Genuine Ferris ${r.desc.trim()}. Bolt-on accessory kit.`,
    fits: ['Verify mower compatibility — call (601) 336-2541'],
    imageUrl: '/images/parts/mulch-kit.jpg',
  });
  accAdded++;
}

// ─── ENGINE PARTS ────────────────────────────────────────────────────────────
const enginePartsList = rows.filter((r) => /^CARBURETOR|STARTER|ALTERNATOR|MUFFLER/i.test(r.desc) && r.cost > 20 && r.cost < 600);
let engAdded = 0;
for (const r of enginePartsList) {
  if (engAdded >= 4) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Engine Parts',
    name: `OEM Engine Component — ${r.part}`,
    description: `Genuine OEM engine component — ${r.desc.trim()}.`,
    fits: ['Verify engine model — call (601) 336-2541'],
    imageUrl: '/images/parts/engine-parts.jpg',
  });
  engAdded++;
}

// ─── HYDRAULIC COMPONENTS ────────────────────────────────────────────────────
const hydroParts = rows.filter((r) => /HYDRO|TRANSAX|PUMP.*HYDRO|WHEEL MOTOR/i.test(r.desc) && r.cost > 50 && r.cost < 1200);
let hydroAdded = 0;
for (const r of hydroParts) {
  if (hydroAdded >= 3) break;
  add({
    part: r.part,
    cost: r.cost,
    category: 'Hydraulic Components',
    name: `OEM Hydraulic Component — ${r.part}`,
    description: `Genuine Hydro-Gear component — ${r.desc.trim()}.`,
    fits: ['Verify transaxle model — call (601) 336-2541'],
    imageUrl: '/images/parts/hydraulic-filter.jpg',
  });
  hydroAdded++;
}

console.log(`\nExtracted ${parts.length} parts across ${new Set(parts.map(p=>p.category)).size} categories:\n`);
for (const cat of new Set(parts.map((p) => p.category))) {
  const ct = parts.filter((p) => p.category === cat).length;
  console.log(`  ${cat}: ${ct}`);
}

// Emit the TS file.
const ts = `export type PartCategory =
  | 'Blades'
  | 'Belts'
  | 'Air Filters'
  | 'Oil Filters'
  | 'Fuel Filters'
  | 'Spark Plugs'
  | 'Tires & Wheels'
  | 'Spindles & Bearings'
  | 'Pulleys'
  | 'Deck Parts'
  | 'Engine Parts'
  | 'Electrical'
  | 'Hydraulic Components'
  | 'Seats & Controls'
  | 'Accessories';

export interface Part {
  partNumber: string;
  name: string;
  category: PartCategory;
  description: string;
  price: number;
  imageUrl: string;
  fits: string[];
  inStock: boolean;
  oem: boolean;
}

// Auto-generated from Ferris dealer catalog (PricePartsFerrisFULL.csv).
// Pricing: dealer_cost × 1.40 (40% markup). Refine to competitor-median later.
export const parts: Part[] = ${JSON.stringify(
  parts.map(({ dealerCost, ...p }) => p),
  null,
  2,
)};

export function getPartByNumber(partNumber: string): Part | undefined {
  return parts.find((p) => p.partNumber === partNumber);
}

export function getPartsByCategory(category: PartCategory): Part[] {
  return parts.filter((p) => p.category === category);
}

export function getAllPartCategories(): PartCategory[] {
  return [...new Set(parts.map((p) => p.category))];
}

export function searchParts(query: string): Part[] {
  const q = query.toLowerCase();
  return parts.filter(
    (p) =>
      p.partNumber.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.fits.some((f) => f.toLowerCase().includes(q)),
  );
}
`;

fs.writeFileSync(OUT, ts);
console.log(`\nWrote ${OUT} (${(ts.length / 1024).toFixed(1)} KB)\n`);
