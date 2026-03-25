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
  price: number | null; // null = pending dealer portal pricing
  imageUrl: string;
  fits: string[]; // mower model names this part fits
  inStock: boolean;
  oem: boolean; // true = genuine Ferris/OEM part
}

export const parts: Part[] = [

  // ─── BLADES ──────────────────────────────────────────────────────────────────
  {
    partNumber: '5020127',
    name: 'High-Lift Blade 52"',
    category: 'Blades',
    description: 'Genuine Ferris high-lift blade for 52" iCD™ cutting decks. Provides superior lift and discharge for clean, consistent cuts.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 (52")', 'IS 700 (52")', 'ISX 800 (52")', 'ISX 2200 (52")', 'SRS Z3X (52")', 'SRS Z2 (52")', 'FW45 (52")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5020128',
    name: 'High-Lift Blade 60"',
    category: 'Blades',
    description: 'Genuine Ferris high-lift blade for 60" iCD™ cutting decks. Optimized for maximum airflow and clean discharge.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 700 (60")', 'ISX 800 (60")', 'ISX 2200 (60")', 'ISX 3300 (60")', 'SRS Z3X (60")', 'SRS Z2 (60")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5020129',
    name: 'High-Lift Blade 48"',
    category: 'Blades',
    description: 'Genuine Ferris high-lift blade for 48" cutting decks. Fits 300S, IS 600, and SRS Z1 48" platforms.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['300S (48")', 'IS 600 (48")', 'SRS Z1 (48")', 'FW25 (48")', 'FW45 (48")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5020130',
    name: 'High-Lift Blade 61"',
    category: 'Blades',
    description: 'Genuine Ferris high-lift blade for 61" cutting decks. Designed for 500S and IS 2600 wide-cut platforms.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['500S (61")', 'IS 2600 (61")', 'ProCut S (61")', 'FW45 (61")'],
    inStock: false,
    oem: true,
  },
  {
    partNumber: '5020131',
    name: 'High-Lift Blade 72"',
    category: 'Blades',
    description: 'Genuine Ferris high-lift blade for 72" cutting decks. For IS 6200 and ISX 3300 72" commercial platforms.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 6200 (72")', 'ISX 3300 (72")', 'SRS Z3X (72")'],
    inStock: false,
    oem: true,
  },
  {
    partNumber: '5020133',
    name: 'Mulching Blade 52"',
    category: 'Blades',
    description: 'Genuine Ferris mulching blade for 52" decks. Triple-cut design for fine clipping mulch without a mulch kit.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 (52")', 'IS 700 (52")', 'ISX 800 (52")', 'ISX 2200 (52")', 'SRS Z3X (52")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5020135',
    name: 'Gator Mulching Blade 60"',
    category: 'Blades',
    description: 'High-performance Gator-style mulching blade for 60" decks. Enhanced serrated edge for superior mulching capability.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 700 (60")', 'ISX 800 (60")', 'ISX 2200 (60")', 'ISX 3300 (60")'],
    inStock: true,
    oem: false,
  },
  {
    partNumber: '5020140',
    name: 'High-Lift Blade 42"',
    category: 'Blades',
    description: 'Genuine Ferris high-lift blade for 42" cutting decks. Fits 300R and 300S 42" platforms.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['300R (42")', '300S (42")', 'F60 (36")'],
    inStock: true,
    oem: true,
  },

  // ─── BELTS ───────────────────────────────────────────────────────────────────
  {
    partNumber: '5021765',
    name: 'Drive Belt — IS 600 / IS 700',
    category: 'Belts',
    description: 'OEM deck drive belt for IS 600 and IS 700 series mowers. Replaces worn or cracked belts for restored cutting performance.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 (52")', 'IS 600 (48")', 'IS 700 (52")', 'IS 700 (60")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021766',
    name: 'Drive Belt — ISX 2200',
    category: 'Belts',
    description: 'OEM 2-belt iCD™+ drive belt set for ISX 2200 series. Genuine Ferris for proper tension and deck engagement.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 2200 (52")', 'ISX 2200 (60")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021767',
    name: 'Drive Belt — ISX 3300',
    category: 'Belts',
    description: 'OEM 2-belt iCD™+ drive belt set for ISX 3300 series. High-strength belt for heavy commercial use.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 3300 (60")', 'ISX 3300 (72")'],
    inStock: false,
    oem: true,
  },
  {
    partNumber: '5021770',
    name: 'Drive Belt — 300S / 300R',
    category: 'Belts',
    description: 'OEM deck drive belt for 300S and 300R series mowers. Direct replacement for all 300-series deck sizes.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['300S (42")', '300S (48")', '300S (52")', '300R (42")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021772',
    name: 'Drive Belt — 500S',
    category: 'Belts',
    description: 'OEM deck drive belt for 500S series mowers. Fits all 500S deck configurations.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['500S (48")', '500S (52")', '500S (61")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021780',
    name: 'Drive Belt — ISX 800',
    category: 'Belts',
    description: 'OEM deck drive belt for ISX 800 series. Designed for Hydro-Gear ZT-3400 platform belt routing.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 800 (52")', 'ISX 800 (60")'],
    inStock: true,
    oem: true,
  },

  // ─── AIR FILTERS ─────────────────────────────────────────────────────────────
  {
    partNumber: '5101095',
    name: 'Air Filter — Kawasaki FX/FS Series',
    category: 'Air Filters',
    description: 'OEM Kawasaki air filter for FX and FS series engines. Dual-element design with foam pre-cleaner for extended engine life.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 Kawasaki', 'IS 700 Kawasaki', 'ISX 800 Kawasaki', 'ISX 2200 Kawasaki', 'SRS Z1 Kawasaki', 'SRS Z3X Kawasaki', 'FW25 Kawasaki', 'FW45 Kawasaki'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101096',
    name: 'Air Filter — Vanguard 810cc',
    category: 'Air Filters',
    description: 'OEM Vanguard air filter for 810cc engines. Dual-stage filtration for maximum protection in dusty commercial conditions.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 2200 Vanguard', 'ISX 3300 Vanguard', 'SRS Z2 Vanguard', 'SRS Z3X Vanguard', 'FW45 Vanguard'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101097',
    name: 'Air Filter — Briggs & Stratton CXi/PXi',
    category: 'Air Filters',
    description: 'OEM B&S air filter for CXi and PXi series engines. Paper element with foam pre-cleaner wrap.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['300S B&S', '300R B&S', '500S B&S', 'IS 600 B&S', 'IS 700 B&S', 'ISX 800 B&S'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101098',
    name: 'Air Filter — Kubota Diesel',
    category: 'Air Filters',
    description: 'OEM Kubota air filter for IS 6200 diesel engine. Heavy-duty commercial-grade filtration.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 6200 Kubota Diesel'],
    inStock: false,
    oem: true,
  },

  // ─── OIL FILTERS ─────────────────────────────────────────────────────────────
  {
    partNumber: '5101110',
    name: 'Oil Filter — Kawasaki FX/FS Series',
    category: 'Oil Filters',
    description: 'OEM Kawasaki oil filter for FX and FS series engines. High-capacity filter media for extended oil life.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 Kawasaki', 'IS 700 Kawasaki', 'ISX 800 Kawasaki', 'ISX 2200 Kawasaki', 'SRS Z1 Kawasaki', 'SRS Z3X Kawasaki'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101111',
    name: 'Oil Filter — Vanguard 810cc / Big Block',
    category: 'Oil Filters',
    description: 'OEM Vanguard oil filter for 810cc and Big Block EFI engines. Extended-life filter for Oil Guard-equipped models.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 2200 Vanguard', 'ISX 3300 Vanguard', 'SRS Z2 Vanguard', 'SRS Z3X Vanguard'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101112',
    name: 'Oil Filter — Briggs & Stratton CXi/PXi',
    category: 'Oil Filters',
    description: 'OEM B&S oil filter for CXi and PXi series engines. Spin-on canister design for quick changes.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['300S B&S', '300R B&S', '500S B&S', 'IS 600 B&S', 'IS 700 B&S', 'ISX 800 B&S'],
    inStock: true,
    oem: true,
  },

  // ─── FUEL FILTERS ────────────────────────────────────────────────────────────
  {
    partNumber: '5101120',
    name: 'In-Line Fuel Filter — Gas Engines',
    category: 'Fuel Filters',
    description: 'Universal in-line fuel filter for all Ferris gas engine models. Protects carburetor and injectors from fuel contamination.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All gas engine Ferris models'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101121',
    name: 'Fuel Filter — Kubota Diesel',
    category: 'Fuel Filters',
    description: 'OEM Kubota diesel fuel filter for IS 6200. Water-separating filter for clean fuel delivery.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 6200 Kubota Diesel'],
    inStock: false,
    oem: true,
  },

  // ─── SPARK PLUGS ─────────────────────────────────────────────────────────────
  {
    partNumber: '5101130',
    name: 'Spark Plug — Kawasaki FX/FS (each)',
    category: 'Spark Plugs',
    description: 'OEM NGK spark plug for Kawasaki FX and FS series V-twin engines. Sold individually — most engines require 2.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 Kawasaki', 'IS 700 Kawasaki', 'ISX 800 Kawasaki', 'ISX 2200 Kawasaki', 'SRS Z1 Kawasaki', 'SRS Z3X Kawasaki', 'FW25 Kawasaki', 'FW45 Kawasaki'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101131',
    name: 'Spark Plug — Vanguard 810cc (each)',
    category: 'Spark Plugs',
    description: 'OEM spark plug for Vanguard 810cc V-twin engines. Sold individually — most engines require 2.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 2200 Vanguard', 'ISX 3300 Vanguard', 'SRS Z2 Vanguard', 'SRS Z3X Vanguard'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101132',
    name: 'Spark Plug — Briggs & Stratton CXi/PXi (each)',
    category: 'Spark Plugs',
    description: 'OEM spark plug for Briggs & Stratton CXi and PXi series engines. Sold individually — most engines require 2.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['300S B&S', '300R B&S', '500S B&S', 'IS 600 B&S', 'IS 700 B&S', 'ISX 800 B&S'],
    inStock: true,
    oem: true,
  },

  // ─── SPINDLES & BEARINGS ─────────────────────────────────────────────────────
  {
    partNumber: '5021820',
    name: 'Deck Spindle Assembly — 52" / 60"',
    category: 'Spindles & Bearings',
    description: 'Complete OEM spindle assembly with bearing for 52" and 60" iCD™ cutting decks. Heavy-duty cast housing for commercial use.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 (52")', 'IS 700 (52")', 'IS 700 (60")', 'ISX 800 (52")', 'ISX 800 (60")', 'ISX 2200 (52")', 'ISX 2200 (60")', 'SRS Z3X (52")', 'SRS Z3X (60")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021821',
    name: 'Deck Spindle Assembly — 48"',
    category: 'Spindles & Bearings',
    description: 'Complete OEM spindle assembly for 48" decks. Includes pre-installed bearing for drop-in replacement.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['300S (48")', 'IS 600 (48")', 'SRS Z1 (48")', 'FW25 (48")', 'FW45 (48")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021825',
    name: 'Spindle Bearing Kit',
    category: 'Spindles & Bearings',
    description: 'Replacement bearing kit for Ferris deck spindles. Includes upper and lower bearings and seals.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All Ferris iCD™ deck models'],
    inStock: true,
    oem: true,
  },

  // ─── PULLEYS ─────────────────────────────────────────────────────────────────
  {
    partNumber: '5021840',
    name: 'Idler Pulley — Deck Drive',
    category: 'Pulleys',
    description: 'OEM idler pulley for deck drive belt system. Smooth-bore bearing pulley for consistent belt tension.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800', 'ISX 2200', '500S', '300S', '300R'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021841',
    name: 'Blade Drive Pulley',
    category: 'Pulleys',
    description: 'OEM blade drive pulley for iCD™ spindle assemblies. Precision-balanced for vibration-free operation.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All Ferris iCD™ deck models'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021843',
    name: 'PTO Engagement Pulley',
    category: 'Pulleys',
    description: 'OEM PTO clutch pulley for Ferris electric PTO systems. Precision fit for smooth engagement.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800', 'ISX 2200', 'ISX 3300'],
    inStock: false,
    oem: true,
  },

  // ─── TIRES & WHEELS ──────────────────────────────────────────────────────────
  {
    partNumber: '5101200',
    name: 'Rear Drive Tire 24x12-12',
    category: 'Tires & Wheels',
    description: 'OEM rear drive tire for zero-turn mowers. Turf-saver tread pattern for minimal lawn damage.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800', 'ISX 2200', '500S', '300S', '300R'],
    inStock: true,
    oem: false,
  },
  {
    partNumber: '5101201',
    name: 'Front Caster Tire 13x6.5-6',
    category: 'Tires & Wheels',
    description: 'OEM front caster tire for zero-turn mowers. Smooth-tread design for easy pivot turns.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800', 'ISX 2200', '500S', '300S', '300R'],
    inStock: true,
    oem: false,
  },
  {
    partNumber: '5101205',
    name: 'Rear Drive Tire 26x12-12 — ISX/Commercial',
    category: 'Tires & Wheels',
    description: 'Heavy-duty commercial rear tire for ISX series and larger commercial mowers.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 2200', 'ISX 3300', 'IS 6200', 'IS 2600'],
    inStock: false,
    oem: false,
  },

  // ─── DECK PARTS ──────────────────────────────────────────────────────────────
  {
    partNumber: '5021900',
    name: 'Deck Wash Port Kit',
    category: 'Deck Parts',
    description: 'Install a quick-connect water fitting to flush your deck after mowing. Prevents corrosion and buildup.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All Ferris zero-turn mowers with iCD™ deck'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021901',
    name: 'Deck Height Adjustment Knob',
    category: 'Deck Parts',
    description: 'OEM deck height adjustment knob with detent positions. Tool-free height changes from 1.5" to 4.5".',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['300S', '300R', '500S', 'IS 600', 'IS 700'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5021905',
    name: 'Anti-Scalp Roller Kit',
    category: 'Deck Parts',
    description: 'OEM anti-scalp roller set for iCD™ decks. Prevents deck gouging on uneven terrain. Set of 3.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800', 'ISX 2200', 'ISX 3300', '500S'],
    inStock: true,
    oem: true,
  },

  // ─── ELECTRICAL ──────────────────────────────────────────────────────────────
  {
    partNumber: '5101300',
    name: 'PTO Clutch — Electric',
    category: 'Electrical',
    description: 'OEM electric PTO clutch for Ferris zero-turn mowers. Electromagnetic engagement for smooth blade start.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800', 'ISX 2200', 'ISX 3300', '500S'],
    inStock: false,
    oem: true,
  },
  {
    partNumber: '5101301',
    name: 'Ignition Switch',
    category: 'Electrical',
    description: 'OEM ignition key switch for Ferris mowers. 5-position switch with standard key.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All Ferris zero-turn and walk-behind models'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101302',
    name: 'Seat Safety Switch',
    category: 'Electrical',
    description: 'OEM operator presence seat safety switch. Required for safe mower operation — must be replaced if malfunctioning.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All Ferris zero-turn mowers'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5101305',
    name: 'Battery — 12V Commercial',
    category: 'Electrical',
    description: 'Heavy-duty 12V 35Ah sealed AGM battery for Ferris commercial mowers. Extended cold cranking amps for reliable starts.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All Ferris zero-turn mowers'],
    inStock: true,
    oem: false,
  },

  // ─── HYDRAULIC COMPONENTS ────────────────────────────────────────────────────
  {
    partNumber: '5101400',
    name: 'Hydrostatic Fluid — 1 Quart',
    category: 'Hydraulic Components',
    description: 'OEM-spec hydrostatic transmission fluid for Hydro-Gear transaxles. Required for ZT-3200, ZT-3400, and ZT-5400 transaxles.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All Ferris hydrostatic drive models'],
    inStock: true,
    oem: false,
  },
  {
    partNumber: '5101401',
    name: 'Hydro-Gear Pump Return Filter',
    category: 'Hydraulic Components',
    description: 'OEM return filter for Hydro-Gear ZT-series transaxle systems. Replace per maintenance schedule to prevent contamination.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 2200', 'ISX 3300', 'IS 6200', 'IS 2600'],
    inStock: false,
    oem: true,
  },

  // ─── SEATS & CONTROLS ────────────────────────────────────────────────────────
  {
    partNumber: '5021960',
    name: 'Operator Seat — Standard',
    category: 'Seats & Controls',
    description: 'OEM replacement operator seat for Ferris zero-turn mowers. High-back design with lumbar support. Direct bolt-on replacement.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800', '500S', '300S', '300R'],
    inStock: false,
    oem: true,
  },
  {
    partNumber: '5021961',
    name: 'Operator Seat — Suspension (ISX)',
    category: 'Seats & Controls',
    description: 'OEM suspension seat for ISX series mowers. Built-in mechanical suspension for reduced operator fatigue on long jobs.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 2200', 'ISX 3300'],
    inStock: false,
    oem: true,
  },
  {
    partNumber: '5021965',
    name: 'Control Arm Grip Set',
    category: 'Seats & Controls',
    description: 'OEM replacement lap bar grip set. Non-slip rubber grips for both control arms. Sold as a pair.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All Ferris zero-turn mowers'],
    inStock: true,
    oem: true,
  },

  // ─── ENGINE PARTS ────────────────────────────────────────────────────────────
  {
    partNumber: '5101500',
    name: 'Carburetor — Kawasaki FS651V',
    category: 'Engine Parts',
    description: 'OEM replacement carburetor for Kawasaki FS651V engines. Genuine Kawasaki part for proper fuel metering.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 Kawasaki FS651V', 'IS 700 Kawasaki FS', 'SRS Z1 Kawasaki'],
    inStock: false,
    oem: true,
  },
  {
    partNumber: '5101501',
    name: 'Engine Oil — 10W-30 Commercial (1 Qt)',
    category: 'Engine Parts',
    description: 'Commercial-grade SAE 10W-30 engine oil for Kawasaki and Briggs engines. 1 quart.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['All gas engine Ferris models'],
    inStock: true,
    oem: false,
  },
  {
    partNumber: '5101502',
    name: 'Engine Oil — 10W-40 (1 Qt)',
    category: 'Engine Parts',
    description: 'SAE 10W-40 engine oil for Vanguard engines. 1 quart. Check your engine manual for recommended viscosity.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['ISX 2200 Vanguard', 'ISX 3300 Vanguard', 'SRS Z2 Vanguard'],
    inStock: true,
    oem: false,
  },

  // ─── ACCESSORIES ─────────────────────────────────────────────────────────────
  {
    partNumber: '5022000',
    name: 'Striping Kit — Zero Turn',
    category: 'Accessories',
    description: 'Bolt-on lawn striping roller kit for Ferris zero-turn mowers. Creates professional-quality stripes without slowing mowing speed.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800', 'ISX 2200', 'ISX 3300'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5022001',
    name: 'Mulch Kit — 52" Deck',
    category: 'Accessories',
    description: 'OEM mulch kit for 52" iCD™ decks. Includes discharge blocker plate and mulching blades.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600 (52")', 'IS 700 (52")', 'ISX 800 (52")', 'ISX 2200 (52")', 'SRS Z3X (52")'],
    inStock: true,
    oem: true,
  },
  {
    partNumber: '5022002',
    name: 'Mulch Kit — 60" Deck',
    category: 'Accessories',
    description: 'OEM mulch kit for 60" iCD™+ decks. Includes discharge blocker plate and mulching blades.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 700 (60")', 'ISX 800 (60")', 'ISX 2200 (60")', 'ISX 3300 (60")'],
    inStock: false,
    oem: true,
  },
  {
    partNumber: '5022010',
    name: 'Operator Manual — IS Series',
    category: 'Accessories',
    description: 'Official Ferris operator manual for IS 600, IS 700, and ISX 800 series mowers. Includes maintenance schedule.',
    price: null,
    imageUrl: '/images/parts/placeholder-part.svg',
    fits: ['IS 600', 'IS 700', 'ISX 800'],
    inStock: true,
    oem: true,
  },
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
      p.fits.some((f) => f.toLowerCase().includes(q))
  );
}
