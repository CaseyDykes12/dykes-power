export type ProductCategory =
  | 'Zero Turn Mowers'
  | 'Stand-On Mowers'
  | 'Walk-Behind Mowers'
  | 'Stand-On Blowers'
  | 'Ride-On Spreader/Sprayers';

export type InventoryStatus = 'IN_STOCK' | 'INBOUND' | 'AVAILABLE_TO_ORDER';

export interface Product {
  sku: string;
  name: string;
  category: ProductCategory;
  engine: string;
  horsepower: string;
  deckSizes: string[];
  price: number | null; // null = contact for price
  msrp: number | null;
  description: string;
  features: string[];
  imageUrl: string;
  status: InventoryStatus;
  tag?: string; // e.g. "Best Seller", "New"
}

// ─── DISCLOSURE TEXT (mandatory per business rules) ───────────────────────────
export const NOT_ON_LOT_DISCLOSURE =
  'This unit is not currently in our on-site inventory. It is available to order from the manufacturer. Lead times and availability are subject to change. Contact us for current pricing and estimated delivery.';

// ─── PRODUCT CATALOG ──────────────────────────────────────────────────────────
export const products: Product[] = [
  // ZERO TURN MOWERS
  {
    sku: '5902144',
    name: 'Ferris 300S Series',
    category: 'Zero Turn Mowers',
    engine: 'Briggs & Stratton PXi',
    horsepower: '23 hp',
    deckSizes: ['42"'],
    price: 4729,
    msrp: 4729,
    description:
      'The entry-level commercial zero-turn built for durability and ease of use. Perfect for smaller properties and first-time commercial operators.',
    features: [
      'Briggs & Stratton PXi engine',
      'Hydro-Gear 2800 drive system',
      'Electric start',
      'Commercial-grade fabricated deck',
      'Tool-free deck height adjustment',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/300s/FER_300S_Front.jpg',
    status: 'IN_STOCK',
  },
  {
    sku: '5902206',
    name: 'Ferris 300S Series',
    category: 'Zero Turn Mowers',
    engine: 'Briggs & Stratton PXi',
    horsepower: '23 hp',
    deckSizes: ['48"'],
    price: 4729,
    msrp: 4729,
    description:
      'The 48" 300S delivers reliable commercial performance with a wider cut for increased productivity.',
    features: [
      'Briggs & Stratton PXi engine',
      'Hydro-Gear 2800 drive system',
      'Electric start',
      'Commercial-grade fabricated deck',
      'Tool-free deck height adjustment',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/300s/FER_300S_Front.jpg',
    status: 'AVAILABLE_TO_ORDER',
  },
  {
    sku: '5902204',
    name: 'Ferris 300R Series',
    category: 'Zero Turn Mowers',
    engine: 'Briggs & Stratton',
    horsepower: '23 hp',
    deckSizes: ['42"'],
    price: 4499,
    msrp: 4499,
    description:
      'The 300R brings residential-grade reliability with commercial construction at an accessible price point.',
    features: [
      '23 HP Briggs & Stratton engine',
      'Dual hydro drive',
      'Electric start',
      'Residential/light commercial use',
      'Easy operator controls',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/300r/FER_300R_FL-PDP.jpg',
    status: 'IN_STOCK',
    tag: 'Best Value',
  },
  {
    sku: '5901911',
    name: 'Ferris IS® 600 Series',
    category: 'Zero Turn Mowers',
    engine: 'Kawasaki FR',
    horsepower: '23 hp',
    deckSizes: ['52"'],
    price: 8964,
    msrp: 8964,
    description:
      "The IS 600 features Ferris's patented independent suspension system for a smooth, comfortable ride and consistent cut quality on uneven terrain.",
    features: [
      'Ferris patented suspension system',
      'Kawasaki FR engine',
      'Dual Hydro-Gear® ZT-3400 drive',
      'iCD™ cutting system',
      'Fabricated 52" deck',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/is600/IS600_PDP_HERO.jpg',
    status: 'IN_STOCK',
    tag: 'Popular',
  },
  {
    sku: '5902109',
    name: 'Ferris IS® 600 Series',
    category: 'Zero Turn Mowers',
    engine: 'Briggs & Stratton Commercial',
    horsepower: '25 hp',
    deckSizes: ['52"'],
    price: 8964,
    msrp: 8964,
    description:
      'IS 600 with the Briggs & Stratton Commercial engine option — same legendary suspension, more torque.',
    features: [
      'Ferris patented suspension system',
      'Briggs & Stratton Commercial engine',
      'Dual Hydro-Gear® ZT-3400 drive',
      'iCD™ cutting system',
      '52" fabricated deck',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/is600/IS600_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
  },
  {
    sku: '5902061',
    name: 'Ferris IS® 700 Series',
    category: 'Zero Turn Mowers',
    engine: 'Kawasaki FX',
    horsepower: '27 hp',
    deckSizes: ['60"'],
    price: 9624,
    msrp: 9624,
    description:
      'The IS 700 steps up productivity with a 60" deck and 27 HP Kawasaki FX engine, backed by Ferris independent suspension.',
    features: [
      '27 HP Kawasaki FX engine',
      'Ferris independent suspension',
      'Dual Hydro-Gear® ZT-3400 drive',
      'iCD™ cutting system',
      '60" fabricated deck',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/is700/IS700_PDP_HERO.jpg',
    status: 'IN_STOCK',
  },
  {
    sku: '5902180',
    name: 'Ferris ISX™ 2200 Series',
    category: 'Zero Turn Mowers',
    engine: 'Kawasaki FX',
    horsepower: '30.5 hp',
    deckSizes: ['60"'],
    price: 15399,
    msrp: 15399,
    description:
      'The ISX 2200 combines ForeFront™ suspension technology with serious cutting power for demanding commercial operations.',
    features: [
      '30.5 HP Kawasaki FX engine',
      'ForeFront™ suspension system',
      'Dual Hydro-Gear® ZT-5400 drive',
      '2-belt iCD™ cutting system',
      '60" fabricated deck',
      'Up to 12 mph ground speed',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/isx2200/ISX2200_PDP_HERO.jpg',
    status: 'IN_STOCK',
    tag: 'Best Seller',
  },
  {
    sku: '5902064',
    name: 'Ferris ISX™ 3300 Series',
    category: 'Zero Turn Mowers',
    engine: 'Vanguard™ Big Block EFI',
    horsepower: '40 hp',
    deckSizes: ['60"'],
    price: 20514,
    msrp: 20514,
    description:
      'The flagship ISX 3300 delivers Ferris\'s most advanced suspension and the power of the Vanguard™ Big Block EFI engine for the most demanding commercial work.',
    features: [
      '40 HP Vanguard™ Big Block EFI engine',
      'Next-gen ForeFront™ suspension',
      'Dual commercial Hydro-Gear® ZT-5400 drive',
      '2-belt iCD™ cutting system',
      '60" fabricated deck',
      'Up to 12 mph ground speed',
      'Electronic Fuel Injection',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/isx3300/ISX3300_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
    tag: 'Top of the Line',
  },
  {
    sku: '5902162',
    name: 'Ferris IS® 6200 Series',
    category: 'Zero Turn Mowers',
    engine: 'Kubota Diesel',
    horsepower: '48 hp',
    deckSizes: ['72"'],
    price: 40424,
    msrp: 40424,
    description:
      'The IS 6200 is Ferris\'s most powerful zero-turn — a 48 HP diesel machine built for large-scale commercial operations where nothing else will do.',
    features: [
      '48 HP Kubota diesel engine',
      'Ferris independent suspension',
      'Heavy-duty commercial drive system',
      '72" commercial deck',
      'Diesel fuel efficiency',
      'Built for large acreage operations',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/is6200/IS6200_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
    tag: 'Commercial Grade',
  },
  // STAND-ON MOWERS
  {
    sku: '5901939',
    name: 'Ferris SRS™ Z1 Series',
    category: 'Stand-On Mowers',
    engine: 'Kawasaki FX',
    horsepower: '19 hp',
    deckSizes: ['36"'],
    price: 9899,
    msrp: 9899,
    description:
      'The SRS Z1 stand-on mower is compact, maneuverable, and built for gated properties and tight spaces.',
    features: [
      '19 HP Kawasaki engine',
      'Stand-on platform design',
      'Compact 36" deck for tight areas',
      'Commercial hydrostatic drive',
      'Low center of gravity',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/stand-on-mowers/srsz1/SRSZ1_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
  },
  {
    sku: '5901940',
    name: 'Ferris SRS™ Z1 Series',
    category: 'Stand-On Mowers',
    engine: 'Kawasaki FX',
    horsepower: '22 hp',
    deckSizes: ['48"'],
    price: 9899,
    msrp: 9899,
    description:
      'The 48" SRS Z1 balances productivity with maneuverability — ideal for medium-size commercial routes.',
    features: [
      '22 HP Kawasaki engine',
      'Stand-on platform design',
      '48" productivity deck',
      'Commercial hydrostatic drive',
      'Operator comfort platform',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/stand-on-mowers/srsz1/SRSZ1_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
  },
  {
    sku: '5902168',
    name: 'Ferris SRS™ Z3X Series',
    category: 'Stand-On Mowers',
    engine: 'Kawasaki FX',
    horsepower: '27 hp',
    deckSizes: ['52"'],
    price: 15839,
    msrp: 15839,
    description:
      'The SRS Z3X is the premium stand-on mower with Ferris suspension technology — maximum productivity and operator comfort combined.',
    features: [
      '27 HP Kawasaki FX engine',
      'Ferris suspension platform',
      '52" commercial deck',
      'Heavy-duty commercial drive',
      'High-capacity grass management',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/stand-on-mowers/srsz3x/SRSZ3X_PDP_HERO.jpg',
    status: 'IN_STOCK',
    tag: 'Best Seller',
  },
  {
    sku: '5902071',
    name: 'Ferris SRS™ Z3X Series',
    category: 'Stand-On Mowers',
    engine: 'Vanguard™',
    horsepower: '37 hp',
    deckSizes: ['60"'],
    price: 15839,
    msrp: 15839,
    description:
      'The 60" SRS Z3X with Vanguard power — built for large commercial properties that demand stand-on efficiency.',
    features: [
      '37 HP Vanguard™ engine',
      'Ferris suspension platform',
      '60" commercial deck',
      'Heavy-duty commercial drive',
      'Maximum productivity design',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/stand-on-mowers/srsz3x/SRSZ3X_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
  },
  // WALK-BEHIND MOWERS
  {
    sku: '5902050',
    name: 'Ferris FW25 Walk-Behind',
    category: 'Walk-Behind Mowers',
    engine: 'Kawasaki FJ',
    horsepower: '9 hp',
    deckSizes: ['21"'],
    price: null,
    msrp: null,
    description:
      'The FW25 is a commercial-grade walk-behind built for detail trimming, slopes, and areas a ride-on cannot reach.',
    features: [
      'Kawasaki commercial engine',
      'Self-propelled hydrostatic drive',
      '21" steel deck',
      'Mulch / bag / side discharge',
      'Adjustable handle height',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/walk-behind-mowers/fw25/FW25_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
  },
  {
    sku: '5902051',
    name: 'Ferris FW45 Walk-Behind',
    category: 'Walk-Behind Mowers',
    engine: 'Kawasaki FJ',
    horsepower: '13 hp',
    deckSizes: ['21"'],
    price: null,
    msrp: null,
    description:
      'The FW45 is the top-of-the-line Ferris walk-behind — commercial build quality for operators who demand the best from every machine.',
    features: [
      'High-output Kawasaki engine',
      'Heavy-duty commercial transmission',
      '21" fabricated deck',
      'Dual-lever blade control',
      'Mulch / bag / side discharge',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/walk-behind-mowers/fw45/FW45_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
    tag: 'Commercial Grade',
  },
  // STAND-ON BLOWERS
  {
    sku: '5901950',
    name: 'Ferris FB1000 Hurricane™',
    category: 'Stand-On Blowers',
    engine: 'Kawasaki FX',
    horsepower: '25 hp',
    deckSizes: ['N/A'],
    price: null,
    msrp: null,
    description:
      'The FB1000 Hurricane stand-on blower clears debris fast — built for commercial landscape crews that need maximum productivity on large properties.',
    features: [
      '25 HP Kawasaki FX engine',
      'Stand-on operator platform',
      'High-velocity blower system',
      'Hydrostatic drive',
      'Commercial-grade construction',
    ],
    imageUrl:
      'https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/blowers/fb1000/FB1000_PDP_HERO.jpg',
    status: 'AVAILABLE_TO_ORDER',
  },
];

export function getProductsBySku(sku: string): Product | undefined {
  return products.find((p) => p.sku === sku);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function getAllCategories(): ProductCategory[] {
  return [...new Set(products.map((p) => p.category))];
}

export const statusLabels: Record<InventoryStatus, { label: string; color: string }> = {
  IN_STOCK: { label: 'In Stock', color: 'bg-green-500' },
  INBOUND: { label: 'Inbound', color: 'bg-yellow-500' },
  AVAILABLE_TO_ORDER: { label: 'Available to Order', color: 'bg-blue-500' },
};
