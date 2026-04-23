export type PartCategory =
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
export const parts: Part[] = [
  {
    "partNumber": "5101986S",
    "name": "High-Lift Blade Set — 48\" Deck",
    "category": "Blades",
    "description": "3-blade set for 48\" iCD decks. Same OEM pattern Ferris builds their mowers with. Swap all three at once or you will feel it in the cut.",
    "price": 83.99,
    "imageUrl": "/images/parts/blade.jpg",
    "fits": [
      "300S (48\")",
      "IS 600 (48\")",
      "SRS Z1 (48\")",
      "FW25 (48\")",
      "FW45 (48\")"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5101755S",
    "name": "High-Lift Blade Set — 52\" Deck",
    "category": "Blades",
    "description": "OEM replacement set for 52\" decks. Keeps the discharge clean and the stripe sharp.",
    "price": 100.99,
    "imageUrl": "/images/parts/blade.jpg",
    "fits": [
      "IS 600 (52\")",
      "IS 700 (52\")",
      "ISX 800 (52\")",
      "ISX 2200 (52\")",
      "SRS Z3X (52\")",
      "SRS Z2 (52\")",
      "FW45 (52\")"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5103304S",
    "name": "Mulching Blade Set — 52\" Deck",
    "category": "Blades",
    "description": "Factory blade set for 52\" decks. Run one season, replace as a set — cheaper than limping along with a dull one.",
    "price": 105.99,
    "imageUrl": "/images/parts/blade.jpg",
    "fits": [
      "IS 600 (52\")",
      "IS 700 (52\")",
      "ISX 800 (52\")",
      "ISX 2200 (52\")",
      "SRS Z3X (52\")"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5103305S",
    "name": "Mulching Blade Set — 61\" Deck",
    "category": "Blades",
    "description": "61\" deck blade set. Same part Ferris puts on new mowers — don’t settle for the off-brand.",
    "price": 103.99,
    "imageUrl": "/images/parts/blade.jpg",
    "fits": [
      "500S (61\")",
      "IS 2600 (61\")",
      "ProCut S (61\")"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5061827S",
    "name": "High-Lift Blade Set — 44\" Deck",
    "category": "Blades",
    "description": "44\" deck blade set, OEM pattern. Sharpen twice, replace as a set on the third go.",
    "price": 88.99,
    "imageUrl": "/images/parts/blade.jpg",
    "fits": [
      "Ferris 44\" decks"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5103306S",
    "name": "High-Lift Blade Set — 72\" Deck",
    "category": "Blades",
    "description": "Ferris blade set for 72\" decks. Balanced at the factory — aftermarket sets throw vibration.",
    "price": 113.99,
    "imageUrl": "/images/parts/blade.jpg",
    "fits": [
      "IS 6200 (72\")",
      "ISX 3300 (72\")",
      "SRS Z3X (72\")"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5104583FS",
    "name": "OEM Drive Belt — 5104583FS",
    "category": "Belts",
    "description": "OEM drive belt. Run the aftermarket version and you will be back in a season — not worth the $30 you saved.",
    "price": 298.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Multiple Ferris models use this belt pattern",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5105029FS",
    "name": "OEM Drive Belt — 5105029FS",
    "category": "Belts",
    "description": "Factory belt, same part Ferris ships from Munnsville. Tension and length matched to the deck.",
    "price": 109.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Multiple Ferris models use this belt pattern",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5103928FS",
    "name": "OEM Drive Belt — 5103928FS",
    "category": "Belts",
    "description": "Direct replacement belt. If the deck is slipping or squealing, this is usually your fix.",
    "price": 156.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Multiple Ferris models use this belt pattern",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5105884FS",
    "name": "OEM Drive Belt — 5105884FS",
    "category": "Belts",
    "description": "OEM belt for the iCD drive system. Belts that stretch throw the whole deck off — stay OEM.",
    "price": 44.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Multiple Ferris models use this belt pattern",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84003255",
    "name": "OEM Drive Belt — 84003255",
    "category": "Belts",
    "description": "Factory spec drive belt. Generics always look close on the tape measure and never run right.",
    "price": 126.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Multiple Ferris models use this belt pattern",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009021",
    "name": "OEM Drive Belt — 84009021",
    "category": "Belts",
    "description": "OEM replacement. Keep a spare in the shop — belts fail mid-job, not on a Sunday afternoon.",
    "price": 90.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Multiple Ferris models use this belt pattern",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5021251SM",
    "name": "OEM Drive Belt — 5021251SM",
    "category": "Belts",
    "description": "Same belt the factory uses. If yours is glazed or cracked, don’t wait for it to snap.",
    "price": 50.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Multiple Ferris models use this belt pattern",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102594FS",
    "name": "OEM Drive Belt — 5102594FS",
    "category": "Belts",
    "description": "Factory belt, original spec. One of those parts you only miss when it’s gone.",
    "price": 72.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Multiple Ferris models use this belt pattern",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "792303",
    "name": "OEM Air Filter — 792303",
    "category": "Air Filters",
    "description": "OEM air filter. Change it yearly or every 200 hours, whichever hits first.",
    "price": 10.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5400582B",
    "name": "OEM Air Filter — 5400582B",
    "category": "Air Filters",
    "description": "Paper element with pre-cleaner wrap. Cheap insurance against dust eating your engine.",
    "price": 21.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "841497",
    "name": "OEM Air Filter — 841497",
    "category": "Air Filters",
    "description": "Factory service part. If you’re mowing dry dusty lots, check it every 50 hours.",
    "price": 41.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84008852",
    "name": "OEM Air Filter — 84008852",
    "category": "Air Filters",
    "description": "OEM replacement. The generic ones on Amazon fit loose and let grit past.",
    "price": 91.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102126X6",
    "name": "OEM Air Filter — 5102126X6",
    "category": "Air Filters",
    "description": "Original-spec air filter. Pre-cleaner wrap pulls off for a tap-out, element goes yearly.",
    "price": 56.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "792105",
    "name": "OEM Air Filter — 792105",
    "category": "Air Filters",
    "description": "Factory air filter. Running a dirty one costs you horsepower and fuel both.",
    "price": 31.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009389",
    "name": "OEM Oil Filter — 84009389",
    "category": "Oil Filters",
    "description": "Spin-on oil filter. Swap it every oil change — don’t skip it.",
    "price": 50.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "842921",
    "name": "OEM Oil Filter — 842921",
    "category": "Oil Filters",
    "description": "OEM filter. An $8 filter beats a $3,000 engine every time.",
    "price": 16.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5101026X1SM",
    "name": "OEM Oil Filter — 5101026X1SM",
    "category": "Oil Filters",
    "description": "Factory spec spin-on. Same one the dealer puts on at service.",
    "price": 47.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5401130B",
    "name": "OEM Oil Filter — 5401130B",
    "category": "Oil Filters",
    "description": "OEM replacement filter. Spins on by hand — snug it a three-quarter turn after it seats.",
    "price": 22.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009883",
    "name": "OEM Oil Filter — 84009883",
    "category": "Oil Filters",
    "description": "Original spec oil filter. Skipping this on an oil change is how engines die young.",
    "price": 28.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84001895",
    "name": "OEM Fuel Filter — 84001895",
    "category": "Fuel Filters",
    "description": "In-line fuel filter. Keeps the carburetor clean and the engine starting.",
    "price": 8.99,
    "imageUrl": "/images/parts/fuel-filter-kit.jpg",
    "fits": [
      "Universal in-line style — works on most Ferris gas engines",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009438",
    "name": "OEM Fuel Filter — 84009438",
    "category": "Fuel Filters",
    "description": "OEM replacement. Swap yearly or when you notice hard starting.",
    "price": 109.99,
    "imageUrl": "/images/parts/fuel-filter-kit.jpg",
    "fits": [
      "Universal in-line style — works on most Ferris gas engines",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009442",
    "name": "OEM Fuel Filter — 84009442",
    "category": "Fuel Filters",
    "description": "Factory fuel filter. Gum builds up fast in ethanol fuel — stay ahead of it.",
    "price": 70.99,
    "imageUrl": "/images/parts/fuel-filter-kit.jpg",
    "fits": [
      "Universal in-line style — works on most Ferris gas engines",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5021178X3FS",
    "name": "OEM Fuel Filter — 5021178X3FS",
    "category": "Fuel Filters",
    "description": "Original-spec filter. Plumb it with the flow arrow pointing toward the carb.",
    "price": 15.99,
    "imageUrl": "/images/parts/fuel-filter-kit.jpg",
    "fits": [
      "Universal in-line style — works on most Ferris gas engines",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84003655",
    "name": "OEM Spindle Assembly — 84003655",
    "category": "Spindles & Bearings",
    "description": "Drop-in spindle assembly with bearing already pressed in. Saves you the shop press fee.",
    "price": 34.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Fits multiple Ferris iCD deck configurations",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5416763FS",
    "name": "OEM Spindle Assembly — 5416763FS",
    "category": "Spindles & Bearings",
    "description": "Complete OEM spindle. Bolt it on and re-belt — done in 20 minutes.",
    "price": 163.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Fits multiple Ferris iCD deck configurations",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5100993SM",
    "name": "OEM Spindle Assembly — 5100993SM",
    "category": "Spindles & Bearings",
    "description": "Factory spindle assembly. Replace in pairs on the same deck — bearings wear together.",
    "price": 208.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Fits multiple Ferris iCD deck configurations",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5417770FS",
    "name": "OEM Spindle Assembly — 5417770FS",
    "category": "Spindles & Bearings",
    "description": "Pre-assembled OEM spindle. If yours has play in the shaft or hum under load, it’s toast.",
    "price": 240.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Fits multiple Ferris iCD deck configurations",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5104807FS",
    "name": "OEM Spindle Assembly — 5104807FS",
    "category": "Spindles & Bearings",
    "description": "Original-spec spindle. The cast housing matters — stamped-steel knock-offs crack.",
    "price": 196.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Fits multiple Ferris iCD deck configurations",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5023178SM",
    "name": "OEM Pulley — 5023178SM",
    "category": "Pulleys",
    "description": "OEM replacement pulley. Precision-balanced so the belt doesn’t walk.",
    "price": 87.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "300S (52\")",
      "500S (52\")",
      "FW45 (52\")",
      "IS 600 (52\")",
      "IS 700 (52\")",
      "ISX 2200 (52\")",
      "ISX 800 (52\")",
      "ProCut S (61\")",
      "SRS Z2 (52\")",
      "SRS Z3X (52\")"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102496YP",
    "name": "OEM Pulley — 5102496YP",
    "category": "Pulleys",
    "description": "Factory-spec pulley. If the belt is chewing itself up, this is usually why.",
    "price": 72.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Fits multiple Ferris deck and drive systems",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102276FS",
    "name": "OEM Pulley — 5102276FS",
    "category": "Pulleys",
    "description": "Direct replacement. Same bore and groove as original.",
    "price": 63.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Fits multiple Ferris deck and drive systems",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5104528FS",
    "name": "OEM Pulley — 5104528FS",
    "category": "Pulleys",
    "description": "Original OEM pulley. Aftermarket pulleys run rough and eat belts.",
    "price": 91.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Fits multiple Ferris deck and drive systems",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5105101YP",
    "name": "OEM Pulley — 5105101YP",
    "category": "Pulleys",
    "description": "Factory pulley. Spin the old one by hand — if the bearing growls, replace it now.",
    "price": 56.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Fits multiple Ferris deck and drive systems",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5022433X1SM",
    "name": "OEM Tire/Wheel — 5022433X1SM",
    "category": "Tires & Wheels",
    "description": "Turf-saver tread. Pivots on the grass without tearing it up.",
    "price": 92.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Fits most Ferris zero-turn and stand-on platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "5109036FS",
    "name": "OEM Tire/Wheel — 5109036FS",
    "category": "Tires & Wheels",
    "description": "Standard zero-turn rear drive tire. Bolt pattern matches factory.",
    "price": 87.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Fits most Ferris zero-turn and stand-on platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "84003896",
    "name": "OEM Tire/Wheel — 84003896",
    "category": "Tires & Wheels",
    "description": "Replacement tire, same size as stock. Run around 10 PSI for the best ride.",
    "price": 457.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Fits most Ferris zero-turn and stand-on platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "84010749",
    "name": "OEM Tire/Wheel — 84010749",
    "category": "Tires & Wheels",
    "description": "Factory-size tire. Matching fronts and rears is the single easiest way to improve ride quality.",
    "price": 185.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Fits most Ferris zero-turn and stand-on platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "5104433YP",
    "name": "OEM Tire/Wheel — 5104433YP",
    "category": "Tires & Wheels",
    "description": "OEM-spec tire. Air pressure changes your scalp and ride more than most people realize.",
    "price": 337.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Fits most Ferris zero-turn and stand-on platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "84010178",
    "name": "OEM Operator Seat — 84010178",
    "category": "Seats & Controls",
    "description": "Direct bolt-in operator seat. Same mount as factory — no bracket work.",
    "price": 1397.99,
    "imageUrl": "/images/parts/seat.jpg",
    "fits": [
      "Fits most Ferris zero-turn mowers",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84008926",
    "name": "OEM Operator Seat — 84008926",
    "category": "Seats & Controls",
    "description": "OEM replacement seat. If you’re mowing 30+ hours a week this isn’t a luxury.",
    "price": 451.99,
    "imageUrl": "/images/parts/seat.jpg",
    "fits": [
      "Fits most Ferris zero-turn mowers",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5415237BFS",
    "name": "OEM Operator Seat — 5415237BFS",
    "category": "Seats & Controls",
    "description": "Factory seat. Worn-out seats are the #1 comfort complaint — fix it before your back tells you to.",
    "price": 211.99,
    "imageUrl": "/images/parts/seat.jpg",
    "fits": [
      "Fits most Ferris zero-turn mowers",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5601014",
    "name": "OEM Operator Seat — 5601014",
    "category": "Seats & Controls",
    "description": "Original-spec seat. Most operators run their seats past the point where the cushion is gone.",
    "price": 407.99,
    "imageUrl": "/images/parts/seat.jpg",
    "fits": [
      "Fits most Ferris zero-turn mowers",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5107021FS",
    "name": "OEM Electrical Component — 5107021FS",
    "category": "Electrical",
    "description": "OEM switch. Plug-in replacement — no rewiring.",
    "price": 39.99,
    "imageUrl": "/images/parts/pto-switch.jpg",
    "fits": [
      "Fits most Ferris zero-turn and walk-behind platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84010299",
    "name": "OEM Electrical Component — 84010299",
    "category": "Electrical",
    "description": "Direct electrical replacement. Connectors match factory.",
    "price": 60.99,
    "imageUrl": "/images/parts/pto-switch.jpg",
    "fits": [
      "Fits most Ferris zero-turn and walk-behind platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5020927FS",
    "name": "OEM Electrical Component — 5020927FS",
    "category": "Electrical",
    "description": "Factory replacement. Test the old one with a meter before you swap — half the time the switch is fine and the wiring is the problem.",
    "price": 41.99,
    "imageUrl": "/images/parts/pto-switch.jpg",
    "fits": [
      "Fits most Ferris zero-turn and walk-behind platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102962FS",
    "name": "OEM Electrical Component — 5102962FS",
    "category": "Electrical",
    "description": "Original-spec electrical component. Read your wiring color codes against the service manual before install.",
    "price": 125.99,
    "imageUrl": "/images/parts/pto-switch.jpg",
    "fits": [
      "Fits most Ferris zero-turn and walk-behind platforms",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5010673X35SM",
    "name": "OEM Deck Component — 5010673X35SM",
    "category": "Deck Parts",
    "description": "OEM deck hardware. Direct replacement.",
    "price": 27.99,
    "imageUrl": "/images/parts/deck-chute.jpg",
    "fits": [
      "Fits multiple Ferris deck configurations",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5020785SM",
    "name": "OEM Deck Component — 5020785SM",
    "category": "Deck Parts",
    "description": "Factory part. If the deck is scarring grass or not washing clean, this is the fix.",
    "price": 36.99,
    "imageUrl": "/images/parts/deck-chute.jpg",
    "fits": [
      "Fits multiple Ferris deck configurations",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5410502AYP",
    "name": "OEM Deck Component — 5410502AYP",
    "category": "Deck Parts",
    "description": "Bolt-on replacement. Same hardware as stock.",
    "price": 143.99,
    "imageUrl": "/images/parts/deck-chute.jpg",
    "fits": [
      "300S (52\")",
      "500S (52\")",
      "FW45 (52\")",
      "IS 600 (52\")",
      "IS 700 (52\")",
      "ISX 2200 (52\")",
      "ISX 800 (52\")",
      "ProCut S (61\")",
      "SRS Z2 (52\")",
      "SRS Z3X (52\")"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5010673X33FS",
    "name": "OEM Deck Component — 5010673X33FS",
    "category": "Deck Parts",
    "description": "Original-spec deck component. Use stainless hardware when reinstalling if you can.",
    "price": 11.99,
    "imageUrl": "/images/parts/deck-chute.jpg",
    "fits": [
      "Fits multiple Ferris deck configurations",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "1696909",
    "name": "OEM Accessory — 1696909",
    "category": "Accessories",
    "description": "Bolt-on accessory kit. Hardware included.",
    "price": 313.99,
    "imageUrl": "/images/parts/mulch-kit.jpg",
    "fits": [
      "300S (48\")",
      "500S (48\")",
      "FW25 (48\")",
      "FW45 (48\")",
      "IS 600 (48\")",
      "SRS Z1 (48\")"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5416154BFS",
    "name": "OEM Engine Component — 5416154BFS",
    "category": "Engine Parts",
    "description": "OEM engine component. Match by engine model, not mower model.",
    "price": 240.99,
    "imageUrl": "/images/parts/engine-parts.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102389FS",
    "name": "OEM Engine Component — 5102389FS",
    "category": "Engine Parts",
    "description": "Factory replacement part. Verify against your engine serial tag before ordering.",
    "price": 473.99,
    "imageUrl": "/images/parts/engine-parts.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5105069YP",
    "name": "OEM Engine Component — 5105069YP",
    "category": "Engine Parts",
    "description": "Original-spec engine component. Write down your engine family tag before calling if you need help matching.",
    "price": 353.99,
    "imageUrl": "/images/parts/engine-parts.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009854",
    "name": "OEM Engine Component — 84009854",
    "category": "Engine Parts",
    "description": "OEM part from the engine manufacturer. Aftermarket castings often have different bolt spacing.",
    "price": 360.99,
    "imageUrl": "/images/parts/engine-parts.jpg",
    "fits": [
      "Engine-specific — match by your engine family",
      "Text your mower model to Addison at (601) 336-2541 to confirm fit before ordering"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84006964",
    "name": "OEM Hydraulic Component — 84006964",
    "category": "Hydraulic Components",
    "description": "Heavy-duty Hydro-Gear component. Match by transaxle model — not all ZT series use the same parts.",
    "price": 1556.99,
    "imageUrl": "/images/parts/hydraulic-filter.jpg",
    "fits": [
      "IS 2600",
      "IS 6200",
      "ISX 2200",
      "ISX 3300"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102815YP",
    "name": "OEM Hydraulic Component — 5102815YP",
    "category": "Hydraulic Components",
    "description": "OEM hydraulic part. If your mower is creeping when it should stop, this area is where to look.",
    "price": 1237.99,
    "imageUrl": "/images/parts/hydraulic-filter.jpg",
    "fits": [
      "IS 2600",
      "IS 6200",
      "ISX 2200",
      "ISX 3300"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84007620",
    "name": "OEM Hydraulic Component — 84007620",
    "category": "Hydraulic Components",
    "description": "Factory Hydro-Gear replacement. Bleed the system after install — air in the lines means slow response.",
    "price": 1434.99,
    "imageUrl": "/images/parts/hydraulic-filter.jpg",
    "fits": [
      "IS 2600",
      "IS 6200",
      "ISX 2200",
      "ISX 3300"
    ],
    "inStock": true,
    "oem": true
  }
];

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
