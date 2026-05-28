export type ProductCategory =
  | 'Zero Turn Mowers'
  | 'Stand-On Mowers'
  | 'Walk-Behind Mowers'
  | 'Stand-On Blowers'
  | 'Front Mount Mowers'
  | 'Ride-On Spreader/Sprayers';

export type InventoryStatus = 'IN_STOCK' | 'INBOUND' | 'AVAILABLE_TO_ORDER';

export interface ProductVariant {
  sku: string;
  engine: string;
  horsepower: string;
  deckSize: string;
  price: number | null;
  msrp: number | null;
  status: InventoryStatus;
}

export interface KeyFeature {
  title: string;
  body: string;
  icon?: string; // optional emoji or keyword ('suspension', 'deck', 'engine', 'transaxle', 'seat', 'warranty')
}

export interface ProductSpecs {
  // Quick-stat bar fields (shown prominently under the hero)
  groundSpeedFwd?: string; // e.g., "0–8 mph"
  groundSpeedRev?: string;
  deckConstruction?: string; // e.g., "10-gauge fabricated steel"
  cuttingHeight?: string;
  // Engine detail
  engineBrand?: string;
  engineModel?: string;
  engineDisplacement?: string; // "726 cc"
  engineCylinders?: string;
  starter?: string;
  fuelType?: string;
  fuelCapacity?: string;
  // Drive
  transmission?: string; // e.g., "Dual Hydro-Gear ZT-2800 with 7in cooling fans"
  parkingBrake?: string;
  suspension?: string; // e.g., "Front and Rear independent"
  // Comfort
  seat?: string;
  instrumentation?: string;
  // Deck + wear
  spindles?: string;
  driveTires?: string;
  casterTires?: string;
  // Dimensions
  overallLength?: string;
  overallHeight?: string;
  overallWidth?: string;
  dryWeight?: string;
  // Warranty
  warrantyMachine?: string;
  warrantySuspension?: string;
  warrantyEngine?: string;
}

export interface Product {
  sku: string;
  name: string;
  category: ProductCategory;
  engine: string;
  horsepower: string;
  deckSizes: string[];
  price: number | null;
  msrp: number | null;
  description: string;
  features: string[];
  imageUrl: string;
  images?: string[];
  status: InventoryStatus;
  tag?: string;
  // Engine + deck variants for this family. When present, the detail page
  // renders a compatibility table; the canonical SKU acts as the landing page.
  variants?: ProductVariant[];
  // When set, this entry is a non-canonical alias of another SKU. The catalog
  // listing skips it and the product detail route redirects to the canonical.
  canonicalSku?: string;
  // Optional: rich content for the Ferris-style product page sections.
  keyFeatures?: KeyFeature[];
  specs?: ProductSpecs;
}

export const NOT_ON_LOT_DISCLOSURE =
  'This unit is not currently in our on-site inventory. It is available to order from the manufacturer. Lead times and availability are subject to change. Contact us for current pricing and estimated delivery.';

export const products: Product[] =  [
  {
    "sku": "5902093",
    "name": "Ferris 300e Series",
    "category": "Zero Turn Mowers",
    "engine": "Vanguard® Lithium-Ion Electric",
    "horsepower": "48V",
    "deckSizes": [
      "42\"",
      "48\""
    ],
    "price": null,
    "msrp": null,
    "description": "The 300e is Ferris's all-electric zero-turn — zero emissions, zero oil changes, and up to 3.5 acres per charge with a whisper-quiet ride.",
    "features": [
      "Vanguard® 48V Lithium-Ion battery (3.5 kWh)",
      "Up to 3.5 acres per charge",
      "Zero emissions — no fuel, no oil",
      "8-year battery warranty (consumer)",
      "Cutting height 1.5–4.5 inches"
    ],
    "imageUrl": "/images/ferris/basco/5902093/5902093_FER_300e_Render_FL_Final.jpg",
    "images": [
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_FL_Final.jpg",
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_F_Final.jpg",
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_FR_Final.jpg",
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_L_Final.jpg",
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_R_Final.jpg",
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_T_Final.jpg",
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_B_Final.jpg",
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_BR_Final.jpg",
      "/images/ferris/basco/5902093/5902093_FER_300e_Render_BL_Final.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "tag": "Electric",
    "variants": [
      {
        "sku": "5902093",
        "engine": "Vanguard® Lithium-Ion Electric",
        "horsepower": "48V",
        "deckSize": "42\"",
        "price": null,
        "msrp": null,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902094",
        "engine": "Vanguard® Lithium-Ion Electric",
        "horsepower": "48V",
        "deckSize": "48\"",
        "price": null,
        "msrp": null,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902094",
    "name": "Ferris 300e Series",
    "category": "Zero Turn Mowers",
    "engine": "Vanguard® Lithium-Ion Electric",
    "horsepower": "48V",
    "deckSizes": [
      "48\""
    ],
    "price": null,
    "msrp": null,
    "description": "The 300e 48\" delivers wider electric coverage — zero emissions, zero oil changes, and up to 3.5 acres per charge.",
    "features": [
      "Vanguard® 48V Lithium-Ion battery (3.5 kWh)",
      "Up to 3.5 acres per charge",
      "Zero emissions — no fuel, no oil",
      "8-year battery warranty (consumer)",
      "48\" commercial deck"
    ],
    "imageUrl": "/images/ferris/300e.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "tag": "Electric",
    "canonicalSku": "5902093"
  },
  {
    "sku": "5902204",
    "name": "Ferris 300R Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® PXi",
    "horsepower": "23 hp",
    "deckSizes": [
      "42\""
    ],
    "price": 4299,
    "msrp": 4949,
    "description": "The 300R brings residential-grade reliability with commercial construction at an accessible price point.",
    "features": [
      "23 HP Briggs & Stratton PXi engine",
      "Dual hydrostatic drive",
      "Electric start",
      "Residential/light commercial use",
      "Easy operator controls"
    ],
    "imageUrl": "/images/ferris/basco/5902204/5902204_FER_300R_FL_Final.jpg",
    "images": [
      "/images/ferris/basco/5902204/5902204_FER_300R_FL_Final.jpg",
      "/images/ferris/basco/5902204/5902204_FER_300R_F_Final.jpg",
      "/images/ferris/basco/5902204/5902204_FER_300R_FR_Final.jpg",
      "/images/ferris/basco/5902204/5902204_FER_300R_L_Final.jpg",
      "/images/ferris/basco/5902204/5902204_FER_300R_R_Final.jpg",
      "/images/ferris/basco/5902204/5902204_FER_300R_K_Final.jpg",
      "/images/ferris/basco/5902204/5902204_FER_300R_KL_Final.jpg",
      "/images/ferris/basco/5902204/5902204_FER_300R_KR_Final.jpg",
      "/images/ferris/basco/5902204/5902204_FER_300R_T_Final.jpg"
    ],
    "status": "IN_STOCK",
    "tag": "Best Value",
    "variants": [
      {
        "sku": "5902204",
        "engine": "Briggs & Stratton® PXi",
        "horsepower": "23 hp",
        "deckSize": "42\"",
        "price": 4299,
        "msrp": 4949,
        "status": "IN_STOCK"
      },
      {
        "sku": "5902205",
        "engine": "Kawasaki®",
        "horsepower": "21.5 hp",
        "deckSize": "42\"",
        "price": 4499,
        "msrp": 5169,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902205",
    "name": "Ferris 300R Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki®",
    "horsepower": "21.5 hp",
    "deckSizes": [
      "42\""
    ],
    "price": 4499,
    "msrp": 5169,
    "description": "The 300R with Kawasaki power — reliable, easy to operate, and built for residential and light commercial use.",
    "features": [
      "21.5 HP Kawasaki engine",
      "Dual hydrostatic drive",
      "Electric start",
      "Residential/light commercial use",
      "Easy operator controls"
    ],
    "imageUrl": "/images/ferris/300r-hero.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902204"
  },
  {
    "sku": "5902144",
    "name": "Ferris 300S Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton®",
    "horsepower": "23 hp",
    "deckSizes": [
      "48\"",
      "52\""
    ],
    "price": 5099,
    "msrp": 5199,
    "description": "The 300S is Ferris's residential zero-turn — commercial-grade construction at an accessible price. Choose Briggs or Kawasaki, 48\" or 52\" deck.",
    "features": [
      "Choice of Briggs & Stratton 23/25 HP or Kawasaki FR651V 21.5 HP",
      "Hydro-Gear 2800 drive system",
      "48\" or 52\" commercial-grade fabricated deck",
      "Electric start",
      "Tool-free deck height adjustment"
    ],
    "imageUrl": "/images/ferris/basco/5902207/5902207_FER_300S_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902211",
        "engine": "Briggs & Stratton®",
        "horsepower": "23 hp",
        "deckSize": "48\"",
        "price": 5099,
        "msrp": 5199,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902206",
        "engine": "Kawasaki® FR651V",
        "horsepower": "21.5 hp",
        "deckSize": "48\"",
        "price": 5199,
        "msrp": 5299,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902212",
        "engine": "Briggs & Stratton®",
        "horsepower": "25 hp",
        "deckSize": "52\"",
        "price": 5499,
        "msrp": 5599,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902207",
        "engine": "Kawasaki® FR651V",
        "horsepower": "21.5 hp",
        "deckSize": "52\"",
        "price": 5599,
        "msrp": 5699,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902211",
    "name": "Ferris 300S Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton®",
    "horsepower": "23 hp",
    "deckSizes": [
      "48\""
    ],
    "price": 5099,
    "msrp": 5199,
    "description": "The 48\" 300S with Briggs & Stratton 23 HP — commercial-grade construction with easy maintenance.",
    "features": [
      "23 HP Briggs & Stratton engine",
      "Hydro-Gear 2800 drive system",
      "Electric start",
      "Commercial-grade fabricated deck",
      "Tool-free deck height adjustment"
    ],
    "imageUrl": "/images/ferris/basco/5902207/5902207_FER_300S_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902144"
  },
  {
    "sku": "5902206",
    "name": "Ferris 300S Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FR651V",
    "horsepower": "21.5 hp",
    "deckSizes": [
      "48\""
    ],
    "price": 5199,
    "msrp": 5299,
    "description": "The 48\" 300S delivers reliable commercial performance with a wider cut for increased productivity.",
    "features": [
      "Kawasaki FR651V engine",
      "Hydro-Gear 2800 drive system",
      "Electric start",
      "Commercial-grade fabricated deck",
      "Tool-free deck height adjustment"
    ],
    "imageUrl": "/images/ferris/basco/5902207/5902207_FER_300S_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902144"
  },
  {
    "sku": "5902212",
    "name": "Ferris 300S Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton®",
    "horsepower": "25 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 5499,
    "msrp": 5599,
    "description": "The 52\" 300S with Briggs & Stratton 25 HP — wide-cut commercial performance at an accessible price.",
    "features": [
      "25 HP Briggs & Stratton engine",
      "Hydro-Gear 2800 drive system",
      "Electric start",
      "52\" commercial-grade deck",
      "Tool-free deck height adjustment"
    ],
    "imageUrl": "/images/ferris/basco/5902207/5902207_FER_300S_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902144"
  },
  {
    "sku": "5902207",
    "name": "Ferris 300S Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FR651V",
    "horsepower": "21.5 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 5599,
    "msrp": 5699,
    "description": "The 52\" 300S maximizes cutting width for larger residential and light commercial properties.",
    "features": [
      "Kawasaki FR651V engine",
      "Hydro-Gear 2800 drive system",
      "Electric start",
      "52\" commercial-grade deck",
      "Tool-free deck height adjustment"
    ],
    "imageUrl": "/images/ferris/basco/5902207/5902207_FER_300S_FL_FINAL.jpg",
    "images": [
      "/images/ferris/basco/5902207/5902207_FER_300S_FL_FINAL.jpg",
      "/images/ferris/basco/5902207/5902207_FER_300S_F_Final.jpg",
      "/images/ferris/basco/5902207/5902207_FER_300S_FR_FINAL.jpg",
      "/images/ferris/basco/5902207/5902207_FER_300S_L_Final.jpg",
      "/images/ferris/basco/5902207/5902207_FER_300S_R_Final.jpg",
      "/images/ferris/basco/5902207/5902207_FER_300S_K_Final.jpg",
      "/images/ferris/basco/5902207/5902207_FER_300S_KL_Final.jpg",
      "/images/ferris/basco/5902207/5902207_FER_300S_KR_Final.jpg",
      "/images/ferris/basco/5902207/5902207_FER_300S_T_Final.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902144"
  },
  {
    "sku": "5902101",
    "name": "Ferris 500S Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "25 hp",
    "deckSizes": [
      "48\"",
      "52\"",
      "61\""
    ],
    "price": 6499,
    "msrp": 7478,
    "description": "The 500S bridges the gap between residential and full commercial — delivering suspension comfort and commercial construction at a mid-range price.",
    "features": [
      "25 HP Briggs & Stratton CXi engine",
      "Dual Hydro-Gear® transaxles",
      "iCD™ cutting system",
      "48\" fabricated deck",
      "Up to 8.5 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902101/5902101_FER_500S_FL_FINAL.jpg",
    "images": [
      "/images/ferris/basco/5902101/5902101_FER_500S_FL_FINAL.jpg",
      "/images/ferris/basco/5902101/5902101_FER_500S_F_Final_.jpg",
      "/images/ferris/basco/5902101/5902101_FER_500S_FR_FINAL.jpg",
      "/images/ferris/basco/5902101/5902101_FER_500S_L_Final_.jpg",
      "/images/ferris/basco/5902101/5902101_FER_500S_R_Final_.jpg",
      "/images/ferris/basco/5902101/5902101_FER_500S_K_Final_.jpg",
      "/images/ferris/basco/5902101/5902101_FER_500S_KL_Final_.jpg",
      "/images/ferris/basco/5902101/5902101_FER_500S_KR_Final_.jpg",
      "/images/ferris/basco/5902101/5902101_FER_500S_T_Final_.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902101",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "25 hp",
        "deckSize": "48\"",
        "price": 6499,
        "msrp": 7478,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902102",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "25 hp",
        "deckSize": "52\"",
        "price": 6599,
        "msrp": 7588,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902103",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "25 hp",
        "deckSize": "61\"",
        "price": 7049,
        "msrp": 8084,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902056",
        "engine": "Kawasaki® FR730V",
        "horsepower": "24 hp",
        "deckSize": "61\"",
        "price": 7249,
        "msrp": 8304,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902102",
    "name": "Ferris 500S Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "25 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 6599,
    "msrp": 7588,
    "description": "The 52\" 500S adds more cutting width to Ferris's mid-range commercial platform.",
    "features": [
      "25 HP Briggs & Stratton CXi engine",
      "Dual Hydro-Gear® transaxles",
      "iCD™ cutting system",
      "52\" fabricated deck",
      "Up to 8.5 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902101/5902101_FER_500S_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902101"
  },
  {
    "sku": "5902103",
    "name": "Ferris 500S Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "25 hp",
    "deckSizes": [
      "61\""
    ],
    "price": 7049,
    "msrp": 8084,
    "description": "The 61\" 500S delivers maximum productivity for larger properties with Ferris commercial construction.",
    "features": [
      "25 HP Briggs & Stratton CXi engine",
      "Dual Hydro-Gear® transaxles",
      "iCD™ cutting system",
      "61\" wide-cut deck",
      "Up to 8.5 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902101/5902101_FER_500S_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902101"
  },
  {
    "sku": "5902056",
    "name": "Ferris 500S Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FR730V",
    "horsepower": "24 hp",
    "deckSizes": [
      "61\""
    ],
    "price": 7249,
    "msrp": 8304,
    "description": "The 500S with Kawasaki power and a 61\" deck — proven commercial reliability for larger properties.",
    "features": [
      "24 HP Kawasaki FR730V engine",
      "Dual Hydro-Gear® transaxles",
      "iCD™ cutting system",
      "61\" wide-cut deck",
      "Up to 8.5 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902101/5902101_FER_500S_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902101"
  },
  {
    "sku": "5901895",
    "name": "Ferris F60 Zero Turn",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki®",
    "horsepower": "18.5 hp",
    "deckSizes": [
      "36\""
    ],
    "price": 7499,
    "msrp": 8249,
    "description": "The F60 is Ferris's compact zero-turn built for tight spaces — ideal for gated backyards and detailed trimming in residential properties.",
    "features": [
      "18.5 HP Kawasaki engine",
      "Commercial hydrostatic transmission",
      "36\" deck for tight access",
      "Zero-turn maneuverability",
      "Durable commercial construction"
    ],
    "imageUrl": "/images/ferris/basco/5901895/5901895_FER_F60_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5901895/5901895_FER_F60_Studio_FL.jpg",
      "/images/ferris/basco/5901895/5901895_FER_F60_Studio_FR.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5901895",
        "engine": "Kawasaki®",
        "horsepower": "18.5 hp",
        "deckSize": "36\"",
        "price": 7499,
        "msrp": 8249,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902110",
    "name": "Ferris IS® 600 Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "25 hp",
    "deckSizes": [
      "48\"",
      "52\""
    ],
    "price": 7599,
    "msrp": 8689,
    "description": "IS 600 with Briggs & Stratton CXi and 48\" deck — suspension comfort at a lower entry price.",
    "features": [
      "Ferris patented suspension system",
      "Briggs & Stratton CXi engine",
      "Dual Hydro-Gear® ZT-3200® transaxles",
      "iCD™ cutting system",
      "48\" fabricated deck"
    ],
    "imageUrl": "/images/ferris/basco/5901908/5901908_FER_IS600Z_Studio_FL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902110",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "25 hp",
        "deckSize": "48\"",
        "price": 7599,
        "msrp": 8689,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901908",
        "engine": "Kawasaki® FS600V",
        "horsepower": "18.5 hp",
        "deckSize": "48\"",
        "price": 8149,
        "msrp": 9294,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902109",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "25 hp",
        "deckSize": "52\"",
        "price": 7799,
        "msrp": 8909,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901911",
        "engine": "Kawasaki® FS691V",
        "horsepower": "25 hp",
        "deckSize": "52\"",
        "price": 8749,
        "msrp": 9624,
        "status": "IN_STOCK"
      }
    ]
  },
  {
    "sku": "5901908",
    "name": "Ferris IS® 600 Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FS600V",
    "horsepower": "18.5 hp",
    "deckSizes": [
      "48\""
    ],
    "price": 8149,
    "msrp": 9294,
    "description": "The IS 600 features Ferris's patented independent suspension for a smooth ride and consistent cut on any terrain.",
    "features": [
      "Ferris patented suspension system",
      "Kawasaki FS600V engine",
      "Dual Hydro-Gear® ZT-3200® transaxles",
      "iCD™ cutting system",
      "48\" fabricated deck"
    ],
    "imageUrl": "/images/ferris/basco/5901908/5901908_FER_IS600Z_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5901908/5901908_FER_IS600Z_Studio_FL.jpg",
      "/images/ferris/basco/5901908/5901908_FER_IS600_Studio_FR.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902110"
  },
  {
    "sku": "5902109",
    "name": "Ferris IS® 600 Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "25 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 7799,
    "msrp": 8909,
    "description": "IS 600 with the Briggs & Stratton CXi engine — same legendary suspension, lower price point.",
    "features": [
      "Ferris patented suspension system",
      "Briggs & Stratton CXi engine",
      "Dual Hydro-Gear® ZT-3200® transaxles",
      "iCD™ cutting system",
      "52\" fabricated deck"
    ],
    "imageUrl": "/images/ferris/basco/5901908/5901908_FER_IS600Z_Studio_FL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902110"
  },
  {
    "sku": "5901911",
    "name": "Ferris IS® 600 Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FS691V",
    "horsepower": "25 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 8749,
    "msrp": 9624,
    "description": "The IS 600 52\" features Ferris's patented independent suspension for a smooth, comfortable ride and consistent cut quality on uneven terrain.",
    "features": [
      "Ferris patented suspension system",
      "Kawasaki FS691V engine",
      "Dual Hydro-Gear® ZT-3200® transaxles",
      "iCD™ cutting system",
      "52\" fabricated deck"
    ],
    "imageUrl": "/images/ferris/basco/5901908/5901908_FER_IS600Z_Studio_FL.jpg",
    "status": "IN_STOCK",
    "canonicalSku": "5902110"
  },
  {
    "sku": "5902107",
    "name": "Ferris IS® 700 Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "27 hp",
    "deckSizes": [
      "52\"",
      "60\""
    ],
    "price": 8749,
    "msrp": 9954,
    "description": "The IS 700 52\" steps up productivity with commercial suspension and a 27 HP engine for demanding work.",
    "features": [
      "27 HP Briggs & Stratton CXi engine",
      "Ferris independent suspension",
      "Dual Hydro-Gear® ZT-3200® transaxles",
      "iCD™ cutting system",
      "52\" fabricated deck"
    ],
    "imageUrl": "/images/ferris/basco/5902107/5902107_FER_IS700_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5902107/5902107_FER_IS700_Studio_FL.jpg",
      "/images/ferris/basco/5902107/5902107_FER_IS700_Studio_FR.jpg",
      "/images/ferris/basco/5902107/5902107_FER_IS700_Studio_K.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902107",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "27 hp",
        "deckSize": "52\"",
        "price": 8749,
        "msrp": 9954,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902061",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "27 hp",
        "deckSize": "60\"",
        "price": 9199,
        "msrp": 10449,
        "status": "IN_STOCK"
      }
    ]
  },
  {
    "sku": "5902061",
    "name": "Ferris IS® 700 Series (Instant Rebate Included)",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "27 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 9199,
    "msrp": 10449,
    "description": "The IS 700 60\" delivers maximum suspension comfort and productivity for large commercial properties.",
    "features": [
      "27 HP Briggs & Stratton CXi engine",
      "Ferris independent suspension",
      "Dual Hydro-Gear® ZT-3200® transaxles",
      "iCD™ cutting system",
      "60\" fabricated deck"
    ],
    "imageUrl": "/images/ferris/is700-hero.jpg",
    "status": "IN_STOCK",
    "canonicalSku": "5902107"
  },
  {
    "sku": "5902154",
    "name": "Ferris ISX™ 800 Series (Instant Rebate Included)",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "27 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 10199,
    "msrp": 11769,
    "description": "The ISX 800 upgrades to Hydro-Gear ZT-3400 transaxles and advanced suspension for demanding commercial routes.",
    "features": [
      "Briggs & Stratton CXi engine",
      "Ferris suspension system",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "iCD™ cutting system",
      "52\" fabricated deck",
      "Up to 10 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902154/5902154_FER_ISX800_F_Final.jpg",
    "images": [
      "/images/ferris/basco/5902154/5902154_FER_ISX800_F_Final.jpg",
      "/images/ferris/basco/5902154/5902154_FER_ISX800_L_Final.jpg",
      "/images/ferris/basco/5902154/5902154_FER_ISX800_R_Final.jpg",
      "/images/ferris/basco/5902154/5902154_FER_ISX800_K_Final.jpg",
      "/images/ferris/basco/5902154/5902154_FER_ISX800_KL_Final.jpg",
      "/images/ferris/basco/5902154/5902154_FER_ISX800_KR_Final.jpg",
      "/images/ferris/basco/5902154/5902154_FER_ISX800_T_Final.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902154",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "27 hp",
        "deckSize": "52\"",
        "price": 10199,
        "msrp": 11769,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902075",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "27 hp",
        "deckSize": "60\"",
        "price": 10399,
        "msrp": 11989,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902172",
        "engine": "B&S CXi EFI-ETC w/ OilXtend™",
        "horsepower": "27 hp",
        "deckSize": "60\"",
        "price": 10749,
        "msrp": 12374,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902155",
        "engine": "Kawasaki® FT730V",
        "horsepower": "24 hp",
        "deckSize": "52\"",
        "price": 10399,
        "msrp": 11989,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902073",
        "engine": "Kawasaki® FT730V",
        "horsepower": "24 hp",
        "deckSize": "60\"",
        "price": 10999,
        "msrp": 12648,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902074",
        "engine": "Kawasaki® FT730V EFI",
        "horsepower": "27 hp",
        "deckSize": "60\"",
        "price": 11449,
        "msrp": 13143,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902155",
    "name": "Ferris ISX™ 800 Series (Instant Rebate Included)",
    "canonicalSku": "5902084",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FT730V",
    "horsepower": "24 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 10399,
    "msrp": 11989,
    "description": "The ISX 800 52\" with Kawasaki FT730V — commercial suspension and proven Kawasaki reliability.",
    "features": [
      "Kawasaki FT730V engine",
      "Ferris suspension system",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "iCD™ cutting system",
      "52\" fabricated deck",
      "Up to 10 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902154/5902154_FER_ISX800_F_Final.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902075",
    "name": "Ferris ISX™ 800 Series (Instant Rebate Included)",
    "canonicalSku": "5902084",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi",
    "horsepower": "27 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 10399,
    "msrp": 11989,
    "description": "The ISX 800 60\" with B&S CXi — wide-cut commercial performance with upgraded ZT-3400 drive.",
    "features": [
      "Briggs & Stratton CXi engine",
      "Ferris suspension system",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "iCD™ cutting system",
      "60\" fabricated deck",
      "Up to 10 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902154/5902154_FER_ISX800_F_Final.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902172",
    "name": "Ferris ISX™ 800 Series",
    "canonicalSku": "5902084",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® CXi EFI-ETC w/ OilXtend™",
    "horsepower": "27 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 10749,
    "msrp": 12374,
    "description": "The ISX 800 with B&S EFI-ETC and OilXtend technology — extended oil intervals and fuel injection for maximum uptime.",
    "features": [
      "B&S CXi EFI-ETC with OilXtend™",
      "Ferris suspension system",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "iCD™ cutting system",
      "60\" fabricated deck",
      "Extended oil change intervals"
    ],
    "imageUrl": "/images/ferris/basco/5902154/5902154_FER_ISX800_F_Final.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902073",
    "name": "Ferris ISX™ 800 Series",
    "canonicalSku": "5902084",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FT730V",
    "horsepower": "24 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 10999,
    "msrp": 12648,
    "description": "The ISX 800 60\" with Kawasaki power — serious commercial capability with Ferris suspension comfort.",
    "features": [
      "Kawasaki FT730V engine",
      "Ferris suspension system",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "iCD™ cutting system",
      "60\" fabricated deck",
      "Up to 10 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902154/5902154_FER_ISX800_F_Final.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902074",
    "name": "Ferris ISX™ 800 Series (Instant Rebate Included)",
    "canonicalSku": "5902084",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FT730V EFI",
    "horsepower": "27 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 11449,
    "msrp": 13143,
    "description": "The ISX 800 EFI delivers fuel-injected Kawasaki efficiency with Ferris suspension on a 60\" platform.",
    "features": [
      "Kawasaki FT730V EFI engine",
      "Ferris suspension system",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "iCD™ cutting system",
      "60\" fabricated deck",
      "Electronic Fuel Injection"
    ],
    "imageUrl": "/images/ferris/basco/5902154/5902154_FER_ISX800_F_Final.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902159",
    "name": "Ferris ISX™ 2200 Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FX781V EVO",
    "horsepower": "30.5 hp",
    "deckSizes": [
      "52\"",
      "60\""
    ],
    "price": 12699,
    "msrp": 14794,
    "description": "The ISX 2200 52\" Kawasaki delivers ForeFront™ suspension comfort with proven Kawasaki EVO reliability.",
    "features": [
      "Kawasaki FX781V EVO engine",
      "ForeFront™ suspension system",
      "Dual Hydro-Gear® ZT-5400 drive",
      "2-belt iCD™+ cutting system",
      "52\" fabricated deck",
      "Up to 12 mph ground speed"
    ],
    "imageUrl": "/images/ferris/isx2200-hero.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902159",
        "engine": "Kawasaki® FX781V EVO",
        "horsepower": "30.5 hp",
        "deckSize": "52\"",
        "price": 12699,
        "msrp": 14794,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902157",
        "engine": "Vanguard™ 810cc EFI w/ Oil Guard",
        "horsepower": "28 hp",
        "deckSize": "52\"",
        "price": 12949,
        "msrp": 15069,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902180",
        "engine": "Kawasaki® FX781V EVO",
        "horsepower": "30.5 hp",
        "deckSize": "60\"",
        "price": 13349,
        "msrp": 15509,
        "status": "IN_STOCK"
      },
      {
        "sku": "5902078",
        "engine": "Vanguard™ 810cc EFI w/ Oil Guard",
        "horsepower": "28 hp",
        "deckSize": "60\"",
        "price": 13749,
        "msrp": 15949,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902157",
    "name": "Ferris ISX™ 2200 Series (Instant Rebate Included)",
    "category": "Zero Turn Mowers",
    "engine": "Vanguard™ 810cc EFI w/ Oil Guard",
    "horsepower": "28 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 12949,
    "msrp": 15069,
    "description": "The ISX 2200 52\" with Vanguard EFI combines ForeFront™ suspension with premium power and extended oil intervals.",
    "features": [
      "Vanguard 810cc EFI with Oil Guard",
      "ForeFront™ suspension system",
      "Dual Hydro-Gear® ZT-5400 drive",
      "2-belt iCD™+ cutting system",
      "52\" fabricated deck",
      "Up to 12 mph ground speed"
    ],
    "imageUrl": "/images/ferris/isx2200-hero.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902159"
  },
  {
    "sku": "5902180",
    "name": "Ferris ISX™ 2200 Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FX781V EVO",
    "horsepower": "30.5 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 13349,
    "msrp": 15509,
    "description": "The ISX 2200 combines ForeFront™ suspension technology with serious cutting power for demanding commercial operations.",
    "features": [
      "Kawasaki FX781V EVO engine",
      "ForeFront™ suspension system",
      "Dual Hydro-Gear® ZT-5400 drive",
      "2-belt iCD™+ cutting system",
      "60\" fabricated deck",
      "Up to 12 mph ground speed"
    ],
    "imageUrl": "/images/ferris/isx2200-hero.jpg",
    "status": "IN_STOCK",
    "canonicalSku": "5902159"
  },
  {
    "sku": "5902078",
    "name": "Ferris ISX™ 2200 Series",
    "category": "Zero Turn Mowers",
    "engine": "Vanguard™ 810cc EFI w/ Oil Guard",
    "horsepower": "28 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 13749,
    "msrp": 15949,
    "description": "The ISX 2200 60\" Vanguard — Ferris's premium suspension platform with maximum power for commercial operators.",
    "features": [
      "Vanguard 810cc EFI with Oil Guard",
      "ForeFront™ suspension system",
      "Dual Hydro-Gear® ZT-5400 drive",
      "2-belt iCD™+ cutting system",
      "60\" fabricated deck",
      "Up to 12 mph ground speed"
    ],
    "imageUrl": "/images/ferris/basco/5902078/5902078_FER_ISX2200_FL_FINAL.jpg",
    "images": [
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_FL_FINAL.jpg",
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_F_Final_.jpg",
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_FR_FINAL.jpg",
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_L_Final_.jpg",
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_R_Final_.jpg",
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_K_Final_.jpg",
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_KL_Final_.jpg",
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_KR_Final_.jpg",
      "/images/ferris/basco/5902078/5902078_FER_ISX2200_T_Final_.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902159"
  },
  {
    "sku": "5902064",
    "name": "Ferris ISX™ 3300 Series",
    "category": "Zero Turn Mowers",
    "engine": "Vanguard® Big Block EFI ETC",
    "horsepower": "40 hp",
    "deckSizes": [
      "60\"",
      "72\""
    ],
    "price": 17049,
    "msrp": 20129,
    "description": "The flagship ISX 3300 delivers Ferris's most advanced suspension and Vanguard™ Big Block EFI power for the most demanding commercial work.",
    "features": [
      "40 HP Vanguard® Big Block EFI ETC",
      "Next-gen ForeFront™ suspension",
      "Dual Hydro-Gear® ZT-5400 drive",
      "2-belt iCD™+ cutting system",
      "60\" fabricated deck",
      "Oil Guard extended intervals"
    ],
    "imageUrl": "/images/ferris/basco/5902064/5902064_FER_ISX3300_FL_FINAL.jpg",
    "images": [
      "/images/ferris/basco/5902064/5902064_FER_ISX3300_FL_FINAL.jpg",
      "/images/ferris/basco/5902064/5902064_FER_ISX3300_F_Final_.jpg",
      "/images/ferris/basco/5902064/5902064_FER_ISX3300_FR_FINAL_with_Tweel.jpg",
      "/images/ferris/basco/5902064/5902064_FER_ISX3300_L_Final_.jpg",
      "/images/ferris/basco/5902064/5902064_FER_ISX3300_R_Final_.jpg",
      "/images/ferris/basco/5902064/5902064_FER_ISX3300_K_Final_.jpg",
      "/images/ferris/basco/5902064/5902064_FER_ISX3300_KL_Final_.jpg",
      "/images/ferris/basco/5902064/5902064_FER_ISX3300_KR_Final_.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902064",
        "engine": "Vanguard® Big Block EFI ETC",
        "horsepower": "40 hp",
        "deckSize": "60\"",
        "price": 17049,
        "msrp": 20129,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902065",
        "engine": "Kawasaki® FX1000V EFI",
        "horsepower": "38.5 hp",
        "deckSize": "60\"",
        "price": 17399,
        "msrp": 20514,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902145",
        "engine": "Vanguard® Big Block EFI ETC",
        "horsepower": "40 hp",
        "deckSize": "72\"",
        "price": 17749,
        "msrp": 20899,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902160",
        "engine": "Kawasaki® FX1000V EFI",
        "horsepower": "38.5 hp",
        "deckSize": "72\"",
        "price": 18099,
        "msrp": 21284,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902065",
    "name": "Ferris ISX™ 3300 Series (Instant Rebate Included)",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FX1000V EFI",
    "horsepower": "38.5 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 17399,
    "msrp": 20514,
    "description": "The ISX 3300 Kawasaki EFI delivers maximum suspension performance with fuel-injected reliability for professional commercial crews.",
    "features": [
      "35 HP Kawasaki FX1000V EFI engine",
      "Next-gen ForeFront™ suspension",
      "Dual Hydro-Gear® ZT-5400 drive",
      "2-belt iCD™+ cutting system",
      "60\" fabricated deck",
      "Electronic Fuel Injection"
    ],
    "imageUrl": "/images/ferris/basco/5902064/5902064_FER_ISX3300_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "tag": "Top of the Line",
    "canonicalSku": "5902064"
  },
  {
    "sku": "5902145",
    "name": "Ferris ISX™ 3300 Series (Instant Rebate Included)",
    "category": "Zero Turn Mowers",
    "engine": "Vanguard® Big Block EFI ETC",
    "horsepower": "40 hp",
    "deckSizes": [
      "72\""
    ],
    "price": 17749,
    "msrp": 20899,
    "description": "The ISX 3300 72\" Vanguard — the widest-cutting zero-turn in the Ferris lineup with premium suspension and EFI power.",
    "features": [
      "40 HP Vanguard® Big Block EFI ETC",
      "Next-gen ForeFront™ suspension",
      "Dual Hydro-Gear® ZT-5400 drive",
      "2-belt iCD™+ cutting system",
      "72\" wide-cut deck",
      "Oil Guard extended intervals"
    ],
    "imageUrl": "/images/ferris/basco/5902064/5902064_FER_ISX3300_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902064"
  },
  {
    "sku": "5902160",
    "name": "Ferris ISX™ 3300 Series",
    "category": "Zero Turn Mowers",
    "engine": "Kawasaki® FX1000V EFI",
    "horsepower": "38.5 hp",
    "deckSizes": [
      "72\""
    ],
    "price": 18099,
    "msrp": 21284,
    "description": "The ISX 3300 72\" Kawasaki — maximum deck coverage for large commercial operations with full ForeFront™ suspension.",
    "features": [
      "35 HP Kawasaki FX1000V EFI engine",
      "Next-gen ForeFront™ suspension",
      "Dual Hydro-Gear® ZT-5400 drive",
      "2-belt iCD™+ cutting system",
      "72\" wide-cut deck",
      "Electronic Fuel Injection"
    ],
    "imageUrl": "/images/ferris/basco/5902064/5902064_FER_ISX3300_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902064"
  },
  {
    "sku": "5901929",
    "name": "Ferris IS® 2600 Series",
    "category": "Zero Turn Mowers",
    "engine": "Briggs & Stratton® Vanguard® Landmark™",
    "horsepower": "24 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 22199,
    "msrp": 22199,
    "description": "The IS 2600 is Ferris's heavy-duty commercial workhorse — built for operators who demand full-day runtime and reliable productivity on large properties.",
    "features": [
      "24 HP Briggs & Stratton Vanguard Landmark engine",
      "Ferris independent suspension",
      "Dual Hydro-Gear® transaxles",
      "iCD™ cutting system",
      "60\" commercial deck",
      "Pricing shown is final — no rebate"
    ],
    "imageUrl": "/images/ferris/basco/5901929/5901929_FER_IS2600_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5901929/5901929_FER_IS2600_Studio_FL.jpg",
      "/images/ferris/basco/5901929/5901929_FER_IS2600_Studio_FR.jpg",
      "/images/ferris/basco/5901929/5901929_FER_IS2600_Studio_KL-Engine.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "tag": "Commercial Grade",
    "variants": [
      {
        "sku": "5901929",
        "engine": "Briggs & Stratton® Vanguard® Landmark™",
        "horsepower": "24 hp",
        "deckSize": "60\"",
        "price": 22199,
        "msrp": 22199,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902162",
    "name": "Ferris IS® 6200 Series",
    "category": "Zero Turn Mowers",
    "engine": "Caterpillar® Turbo Diesel",
    "horsepower": "48 hp",
    "deckSizes": [
      "72\""
    ],
    "price": 38049,
    "msrp": 38049,
    "description": "The IS 6200 is Ferris's most powerful zero-turn — a 48 HP Caterpillar turbo diesel machine built for large-scale commercial operations where nothing else will do.",
    "features": [
      "48 HP Caterpillar turbo diesel engine",
      "Ferris independent suspension",
      "Heavy-duty commercial drive system",
      "72\" commercial deck",
      "Diesel fuel efficiency",
      "Pricing shown is final — no rebate"
    ],
    "imageUrl": "/images/ferris/basco/5902162/5902162_FER_IS6200_FL_FINAL.jpg",
    "images": [
      "/images/ferris/basco/5902162/5902162_FER_IS6200_FL_FINAL.jpg",
      "/images/ferris/basco/5902162/5902162_FER_IS6200_F_Final.jpg",
      "/images/ferris/basco/5902162/5902162_FER_IS6200_FR.jpg",
      "/images/ferris/basco/5902162/5902162_FER_IS6200_L_Final.jpg",
      "/images/ferris/basco/5902162/5902162_FER_IS6200_R_Final.jpg",
      "/images/ferris/basco/5902162/5902162_FER_IS6200_K_Final.jpg",
      "/images/ferris/basco/5902162/5902162_FER_IS6200_KL_Final.jpg",
      "/images/ferris/basco/5902162/5902162_FER_IS6200_KR_Final.jpg",
      "/images/ferris/basco/5902162/5902162_FER_IS6200_T_Final.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "tag": "Commercial Grade",
    "variants": [
      {
        "sku": "5902162",
        "engine": "Caterpillar® Turbo Diesel",
        "horsepower": "48 hp",
        "deckSize": "72\"",
        "price": 38049,
        "msrp": 38049,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5901941",
    "name": "Ferris SRS™ Z1 Series",
    "category": "Stand-On Mowers",
    "engine": "Vanguard®",
    "horsepower": "23 hp",
    "deckSizes": [
      "36\"",
      "48\""
    ],
    "price": 8799,
    "msrp": 10229,
    "description": "The SRS Z1 36\" with Vanguard power — compact, reliable, and built for tight access properties.",
    "features": [
      "23 HP Vanguard engine",
      "Stand-on platform design",
      "Compact 36\" deck",
      "Commercial hydrostatic drive",
      "Low center of gravity"
    ],
    "imageUrl": "/images/ferris/basco/5901940/5901940_FER_SRSZ1_Studio_FL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5901941",
        "engine": "Vanguard®",
        "horsepower": "23 hp",
        "deckSize": "36\"",
        "price": 8799,
        "msrp": 10229,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901939",
        "engine": "Kawasaki® FX600V",
        "horsepower": "19 hp",
        "deckSize": "36\"",
        "price": 8999,
        "msrp": 10449,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901942",
        "engine": "Vanguard®",
        "horsepower": "23 hp",
        "deckSize": "48\"",
        "price": 9649,
        "msrp": 11164,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901940",
        "engine": "Kawasaki® FX691V",
        "horsepower": "22 hp",
        "deckSize": "48\"",
        "price": 9849,
        "msrp": 11384,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5901939",
    "name": "Ferris SRS™ Z1 Series (Instant Rebate Included)",
    "category": "Stand-On Mowers",
    "engine": "Kawasaki® FX600V",
    "horsepower": "19 hp",
    "deckSizes": [
      "36\""
    ],
    "price": 8999,
    "msrp": 10449,
    "description": "The SRS Z1 stand-on mower is compact, maneuverable, and built for gated properties and tight spaces.",
    "features": [
      "19 HP Kawasaki FX600V engine",
      "Stand-on platform design",
      "Compact 36\" deck for tight areas",
      "Commercial hydrostatic drive",
      "Low center of gravity"
    ],
    "imageUrl": "/images/ferris/basco/5901939/5901939_FER_SRSZ1_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5901939/5901939_FER_SRSZ1_Studio_FL.jpg",
      "/images/ferris/basco/5901939/5901939_FER_SRSZ1_Studio_FR.jpg",
      "/images/ferris/basco/5901939/5901939_FER_SRSZ1_Studio_K.jpg",
      "/images/ferris/basco/5901939/5901939_FER_SRSZ1_Studio_KR.jpg",
      "/images/ferris/basco/5901939/5901939_FER_SRSZ1_Studio_Tank.jpg",
      "/images/ferris/basco/5901939/5901939_FER_SRSZ1_Studio_FL-low.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5901941"
  },
  {
    "sku": "5901942",
    "name": "Ferris SRS™ Z1 Series",
    "category": "Stand-On Mowers",
    "engine": "Vanguard®",
    "horsepower": "23 hp",
    "deckSizes": [
      "48\""
    ],
    "price": 9649,
    "msrp": 11164,
    "description": "The SRS Z1 48\" Vanguard — wider stand-on coverage for commercial routes with proven Vanguard reliability.",
    "features": [
      "23 HP Vanguard engine",
      "Stand-on platform design",
      "48\" productivity deck",
      "Commercial hydrostatic drive",
      "Operator comfort platform"
    ],
    "imageUrl": "/images/ferris/basco/5901940/5901940_FER_SRSZ1_Studio_FL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5901941"
  },
  {
    "sku": "5901940",
    "name": "Ferris SRS™ Z1 Series (Instant Rebate Included)",
    "category": "Stand-On Mowers",
    "engine": "Kawasaki® FX691V",
    "horsepower": "22 hp",
    "deckSizes": [
      "48\""
    ],
    "price": 9849,
    "msrp": 11384,
    "description": "The 48\" SRS Z1 balances productivity with maneuverability — ideal for medium-size commercial routes.",
    "features": [
      "22 HP Kawasaki FX691V engine",
      "Stand-on platform design",
      "48\" productivity deck",
      "Commercial hydrostatic drive",
      "Operator comfort platform"
    ],
    "imageUrl": "/images/ferris/basco/5901940/5901940_FER_SRSZ1_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5901940/5901940_FER_SRSZ1_Studio_FL.jpg",
      "/images/ferris/basco/5901940/5901940_FER_SRSZ1_Studio_FR.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5901941"
  },
  {
    "sku": "5901948",
    "name": "Ferris SRS™ Z2 Series",
    "category": "Stand-On Mowers",
    "engine": "Kawasaki®",
    "horsepower": "25.5 hp",
    "deckSizes": [
      "52\"",
      "60\""
    ],
    "price": 10899,
    "msrp": 13034,
    "description": "The SRS Z2 upgrades the stand-on experience with SoftRide suspension and two engine options — Kawasaki or Vanguard — across 52\" and 60\" commercial decks.",
    "features": [
      "Choice of Kawasaki 25.5 HP or Vanguard 28 HP",
      "SoftRide™ suspension platform",
      "52\" or 60\" commercial deck",
      "Heavy-duty commercial drive",
      "Built for daily commercial use"
    ],
    "imageUrl": "/images/ferris/basco/5901948/5901948_FER_Z2_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902235",
        "engine": "Kawasaki®",
        "horsepower": "25.5 hp",
        "deckSize": "52\"",
        "price": 10899,
        "msrp": 13034,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902165",
        "engine": "Vanguard®",
        "horsepower": "28 hp",
        "deckSize": "52\"",
        "price": 11199,
        "msrp": 13144,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902070",
        "engine": "Vanguard®",
        "horsepower": "28 hp",
        "deckSize": "60\"",
        "price": 11649,
        "msrp": 13639,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902235",
    "name": "Ferris SRS™ Z2 Series (Instant Rebate Included)",
    "category": "Stand-On Mowers",
    "engine": "Kawasaki®",
    "horsepower": "25.5 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 10899,
    "msrp": 13034,
    "description": "The SRS Z2 Kawasaki — stand-on suspension comfort with proven Kawasaki reliability.",
    "features": [
      "25.5 HP Kawasaki engine",
      "SoftRide™ suspension platform",
      "52\" commercial deck",
      "Heavy-duty commercial drive",
      "Proven Kawasaki reliability"
    ],
    "imageUrl": "/images/ferris/basco/5901948/5901948_FER_Z2_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5901948"
  },
  {
    "sku": "5902165",
    "name": "Ferris SRS™ Z2 Series (Instant Rebate Included)",
    "category": "Stand-On Mowers",
    "engine": "Vanguard®",
    "horsepower": "28 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 11199,
    "msrp": 13144,
    "description": "The SRS Z2 52\" Vanguard — premium stand-on performance with Ferris suspension and reliable commercial power.",
    "features": [
      "28 HP Vanguard engine",
      "SoftRide™ suspension platform",
      "52\" commercial deck",
      "Heavy-duty commercial drive",
      "Built for daily commercial use"
    ],
    "imageUrl": "/images/ferris/basco/5902165/5902165_FER_Z2_F_Final.jpg",
    "images": [
      "/images/ferris/basco/5902165/5902165_FER_Z2_F_Final.jpg",
      "/images/ferris/basco/5902165/5902165_FER_Z2_L_Final.jpg",
      "/images/ferris/basco/5902165/5902165_FER_Z2_R_Final.jpg",
      "/images/ferris/basco/5902165/5902165_FER_Z2_K_Final.jpg",
      "/images/ferris/basco/5902165/5902165_FER_Z2_KL_Final.jpg",
      "/images/ferris/basco/5902165/5902165_FER_Z2_KR_Final.jpg",
      "/images/ferris/basco/5902165/5902165_FER_Z2_T_Final.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5901948"
  },
  {
    "sku": "5902070",
    "name": "Ferris SRS™ Z2 Series",
    "category": "Stand-On Mowers",
    "engine": "Vanguard®",
    "horsepower": "28 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 11649,
    "msrp": 13639,
    "description": "The SRS Z2 60\" Vanguard — wide-cut stand-on efficiency with Ferris suspension and reliable Vanguard power.",
    "features": [
      "28 HP Vanguard engine",
      "SoftRide™ suspension platform",
      "60\" commercial deck",
      "Heavy-duty commercial drive",
      "Maximum productivity design"
    ],
    "imageUrl": "/images/ferris/basco/5901948/5901948_FER_Z2_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5901948"
  },
  {
    "sku": "5902168",
    "name": "Ferris SRS™ Z3X Series",
    "category": "Stand-On Mowers",
    "engine": "Kawasaki® FX850V",
    "horsepower": "27 hp",
    "deckSizes": [
      "52\"",
      "60\"",
      "72\""
    ],
    "price": 11899,
    "msrp": 14189,
    "description": "The SRS Z3X is the premium stand-on mower with Ferris suspension technology — maximum productivity and operator comfort combined.",
    "features": [
      "Choice of Kawasaki 27 HP or Vanguard Big Block 37 HP / Vanguard 40 HP",
      "Ferris suspension platform",
      "52\", 60\", or 72\" commercial deck",
      "Heavy-duty commercial drive",
      "High-capacity grass management"
    ],
    "imageUrl": "/images/ferris/basco/5901955/5901955_FER_Z3X_FL_FINAL.jpg",
    "status": "IN_STOCK",
    "variants": [
      {
        "sku": "5902168",
        "engine": "Kawasaki® FX850V",
        "horsepower": "27 hp",
        "deckSize": "52\"",
        "price": 11899,
        "msrp": 14189,
        "status": "IN_STOCK"
      },
      {
        "sku": "5901955",
        "engine": "Vanguard® Big Block EFI w/ Oil Guard",
        "horsepower": "37 hp",
        "deckSize": "52\"",
        "price": 13249,
        "msrp": 15069,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902217",
        "engine": "Vanguard™ EFI-ETC w/ Oil Guard",
        "horsepower": "40 hp",
        "deckSize": "52\"",
        "price": 13499,
        "msrp": 15949,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902071",
        "engine": "Vanguard® Big Block EFI w/ Oil Guard",
        "horsepower": "37 hp",
        "deckSize": "60\"",
        "price": 13999,
        "msrp": 16499,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902216",
        "engine": "Vanguard™ EFI-ETC w/ Oil Guard",
        "horsepower": "40 hp",
        "deckSize": "60\"",
        "price": 14249,
        "msrp": 16774,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902215-37",
        "engine": "Vanguard® Big Block EFI w/ Oil Guard",
        "horsepower": "37 hp",
        "deckSize": "72\"",
        "price": 14899,
        "msrp": 17499,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902215",
        "engine": "Vanguard™ EFI-ETC w/ Oil Guard",
        "horsepower": "40 hp",
        "deckSize": "72\"",
        "price": 15149,
        "msrp": 17764,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5901955",
    "name": "Ferris SRS™ Z3X Series (Instant Rebate Included)",
    "category": "Stand-On Mowers",
    "engine": "Vanguard® Big Block EFI w/ Oil Guard",
    "horsepower": "37 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 13249,
    "msrp": 15069,
    "description": "The SRS Z3X 52\" with Vanguard Big Block EFI delivers maximum stand-on productivity — premium suspension, electronic fuel injection, and commercial-grade build quality.",
    "features": [
      "37 HP Vanguard Big Block EFI with Oil Guard",
      "Ferris suspension platform",
      "52\" commercial deck",
      "Heavy-duty commercial drive",
      "Electronic Fuel Injection"
    ],
    "imageUrl": "/images/ferris/basco/5901955/5901955_FER_Z3X_FL_FINAL.jpg",
    "images": [
      "/images/ferris/basco/5901955/5901955_FER_Z3X_FL_FINAL.jpg",
      "/images/ferris/basco/5901955/5901955_FER_Z3X_FR_FINAL.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902168"
  },
  {
    "sku": "5902217",
    "name": "Ferris SRS™ Z3X Series (Instant Rebate Included)",
    "category": "Stand-On Mowers",
    "engine": "Vanguard™ EFI-ETC w/ Oil Guard",
    "horsepower": "40 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 13499,
    "msrp": 15949,
    "description": "The SRS Z3X 52\" Vanguard — premium stand-on performance with EFI power and Oil Guard convenience.",
    "features": [
      "40 HP Vanguard EFI-ETC with Oil Guard",
      "Ferris suspension platform",
      "52\" commercial deck",
      "Heavy-duty commercial drive",
      "Extended oil change intervals"
    ],
    "imageUrl": "/images/ferris/basco/5901955/5901955_FER_Z3X_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902168"
  },
  {
    "sku": "5902071",
    "name": "Ferris SRS™ Z3X Series",
    "category": "Stand-On Mowers",
    "engine": "Vanguard® Big Block EFI w/ Oil Guard",
    "horsepower": "37 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 13999,
    "msrp": 16499,
    "description": "The 60\" SRS Z3X Vanguard Big Block — built for large commercial properties demanding stand-on efficiency with premium power.",
    "features": [
      "37 HP Vanguard Big Block EFI with Oil Guard",
      "Ferris suspension platform",
      "60\" commercial deck",
      "Heavy-duty commercial drive",
      "Extended oil change intervals"
    ],
    "imageUrl": "/images/ferris/basco/5901955/5901955_FER_Z3X_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902168"
  },
  {
    "sku": "5902216",
    "name": "Ferris SRS™ Z3X Series (Instant Rebate Included)",
    "category": "Stand-On Mowers",
    "engine": "Vanguard™ EFI-ETC w/ Oil Guard",
    "horsepower": "40 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 14249,
    "msrp": 16774,
    "description": "The SRS Z3X 60\" Vanguard EFI with Oil Guard — premium power and minimal downtime for commercial crews.",
    "features": [
      "40 HP Vanguard EFI-ETC with Oil Guard",
      "Ferris suspension platform",
      "60\" commercial deck",
      "Heavy-duty commercial drive",
      "Extended oil change intervals"
    ],
    "imageUrl": "/images/ferris/basco/5901955/5901955_FER_Z3X_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902168"
  },
  {
    "sku": "5902215-37",
    "name": "Ferris SRS™ Z3X Series",
    "category": "Stand-On Mowers",
    "engine": "Vanguard® Big Block EFI w/ Oil Guard",
    "horsepower": "37 hp",
    "deckSizes": [
      "72\""
    ],
    "price": 14899,
    "msrp": 17499,
    "description": "The SRS Z3X 72\" with Vanguard Big Block EFI — widest stand-on deck in the Ferris lineup, paired with Oil Guard extended service intervals.",
    "features": [
      "37 HP Vanguard Big Block EFI with Oil Guard",
      "Ferris suspension platform",
      "72\" wide-cut commercial deck",
      "Heavy-duty commercial drive",
      "Extended oil change intervals"
    ],
    "imageUrl": "/images/ferris/basco/5901955/5901955_FER_Z3X_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902168"
  },
  {
    "sku": "5902215",
    "name": "Ferris SRS™ Z3X Series",
    "category": "Stand-On Mowers",
    "engine": "Vanguard™ EFI-ETC w/ Oil Guard",
    "horsepower": "40 hp",
    "deckSizes": [
      "72\""
    ],
    "price": 15149,
    "msrp": 17764,
    "description": "The SRS Z3X 72\" is the widest stand-on in the Ferris lineup — built for maximum commercial productivity.",
    "features": [
      "40 HP Vanguard EFI-ETC with Oil Guard",
      "Ferris suspension platform",
      "72\" wide-cut commercial deck",
      "Heavy-duty commercial drive",
      "Maximum stand-on productivity"
    ],
    "imageUrl": "/images/ferris/basco/5901955/5901955_FER_Z3X_FL_FINAL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902168"
  },
  {
    "sku": "5901737",
    "name": "Ferris FW15 Walk-Behind",
    "category": "Walk-Behind Mowers",
    "engine": "Honda® GXV390",
    "horsepower": "10.2 hp",
    "deckSizes": [
      "32\""
    ],
    "price": 3749,
    "msrp": 4343,
    "description": "The FW15 is Ferris's entry-level commercial walk-behind — compact, hydrostatic, and built for precision trimming and tight areas.",
    "features": [
      "Honda GXV390 engine",
      "Hydro-Gear® RT-310 hydrostatic drive",
      "32\" commercial deck",
      "0–4 MPH variable ground speed",
      "Commercial 2-year warranty"
    ],
    "imageUrl": "/images/ferris/basco/5901737/5901737_FER_FW15_FRONT.jpg",
    "images": [
      "/images/ferris/basco/5901737/5901737_FER_FW15_FRONT.jpg",
      "/images/ferris/basco/5901737/5901737_FER_FW15_LFRONT.jpg",
      "/images/ferris/basco/5901737/5901737_FER_FW15_RFRONT.jpg",
      "/images/ferris/basco/5901737/5901737_FER_FW15_LSIDE.jpg",
      "/images/ferris/basco/5901737/5901737_FER_FW15_BACK.jpg",
      "/images/ferris/basco/5901737/5901737_FER_FW15_RBACK.jpg",
      "/images/ferris/basco/5901737/5901737_FER_FW15_PIVOTWHEELS.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5901737",
        "engine": "Honda® GXV390",
        "horsepower": "10.2 hp",
        "deckSize": "32\"",
        "price": 3749,
        "msrp": 4343,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5901886",
    "name": "Ferris FW25 Walk-Behind",
    "category": "Walk-Behind Mowers",
    "engine": "Kawasaki® FS600V",
    "horsepower": "18.5 hp",
    "deckSizes": [
      "36\"",
      "48\""
    ],
    "price": 7399,
    "msrp": 8139,
    "description": "The FW25 is a commercial-grade walk-behind built for detail trimming, slopes, and areas a ride-on cannot reach.",
    "features": [
      "18.5 HP Kawasaki FS600V engine",
      "Hydro-Gear® dual transaxle drive",
      "36\" fabricated steel deck",
      "Variable speed hydrostatic control",
      "Mulch / bag / side discharge"
    ],
    "imageUrl": "/images/ferris/basco/5901886/5901886_FER_FW25_36-CC_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5901886/5901886_FER_FW25_36-CC_Studio_FL.jpg",
      "/images/ferris/basco/5901886/5901886_FER_FW25_36-CC_Studio_FR.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5901886",
        "engine": "Kawasaki® FS600V",
        "horsepower": "18.5 hp",
        "deckSize": "36\"",
        "price": 7399,
        "msrp": 8139,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901888",
        "engine": "Kawasaki® FS600V",
        "horsepower": "18.5 hp",
        "deckSize": "48\" with CC control",
        "price": 7799,
        "msrp": 7799,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901888-NCC",
        "engine": "Kawasaki® FS600V",
        "horsepower": "18.5 hp",
        "deckSize": "48\" without CC control",
        "price": 7799,
        "msrp": 7799,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5901888",
    "name": "Ferris FW25 Walk-Behind",
    "category": "Walk-Behind Mowers",
    "engine": "Kawasaki® FS600V",
    "horsepower": "18.5 hp",
    "deckSizes": [
      "48\""
    ],
    "price": 7799,
    "msrp": 7799,
    "description": "The FW25 48\" — commercial walk-behind performance for properties where ride-ons can't go. Choose with or without Control Console (CC).",
    "features": [
      "18.5 HP Kawasaki FS600V engine",
      "Hydro-Gear® dual transaxle drive",
      "48\" fabricated steel deck",
      "With or without CC (Control Console)",
      "Pricing shown is final — no rebate"
    ],
    "imageUrl": "/images/ferris/basco/5901888/5901888_FER_FW25_48-CC_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5901888/5901888_FER_FW25_48-CC_Studio_FL.jpg",
      "/images/ferris/basco/5901888/5901888_FER_FW25_48-CC_Studio_FR.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5901886"
  },
  {
    "sku": "5902014",
    "name": "Ferris FW45 Walk-Behind",
    "category": "Walk-Behind Mowers",
    "engine": "Kawasaki® FX651V",
    "horsepower": "20.5 hp",
    "deckSizes": [
      "48\"",
      "52\" with CC",
      "52\" without CC",
      "61\""
    ],
    "price": 8799,
    "msrp": 10339,
    "description": "The FW45 is the top-of-the-line Ferris walk-behind — commercial build quality with dual ZT-3400 drive. Choose Kawasaki or Vanguard power, plus Control Console (CC) or non-CC at 52\".",
    "features": [
      "Choice of Kawasaki 20.5 HP / 23.5 HP or Vanguard 28 HP",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "48\", 52\" (with or without CC), or 61\" fabricated deck",
      "Dual-lever blade control",
      "Mulch / bag / side discharge"
    ],
    "imageUrl": "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5902014",
        "engine": "Kawasaki® FX651V",
        "horsepower": "20.5 hp",
        "deckSize": "48\"",
        "price": 8799,
        "msrp": 10339,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902015",
        "engine": "Kawasaki® FX651V",
        "horsepower": "20.5 hp",
        "deckSize": "52\" with CC",
        "price": 9149,
        "msrp": 10723,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901891",
        "engine": "Kawasaki® FX651V",
        "horsepower": "20.5 hp",
        "deckSize": "52\" without CC",
        "price": 9149,
        "msrp": 10723,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901893",
        "engine": "Vanguard® 810cc EFI w/ Oil Guard",
        "horsepower": "28 hp",
        "deckSize": "52\" with CC",
        "price": 9849,
        "msrp": 11494,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5901893-NCC",
        "engine": "Vanguard® 810cc EFI w/ Oil Guard",
        "horsepower": "28 hp",
        "deckSize": "52\" without CC",
        "price": 9849,
        "msrp": 11494,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5902016",
        "engine": "Kawasaki® FX730V",
        "horsepower": "23.5 hp",
        "deckSize": "61\"",
        "price": 9749,
        "msrp": 11384,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5901891",
    "name": "Ferris FW45 Walk-Behind",
    "category": "Walk-Behind Mowers",
    "engine": "Kawasaki® FX651V",
    "horsepower": "20.5 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 9149,
    "msrp": 10723,
    "description": "The FW45 52\" Kawasaki without CC — premium walk-behind with dual ZT-3400 transaxles for commercial crews.",
    "features": [
      "20.5 HP Kawasaki FX651V engine",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "52\" fabricated deck (without Control Console)",
      "Dual-lever blade control",
      "Mulch / bag / side discharge"
    ],
    "imageUrl": "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902014"
  },
  {
    "sku": "5902015",
    "name": "Ferris FW45 Walk-Behind",
    "category": "Walk-Behind Mowers",
    "engine": "Kawasaki® FX651V",
    "horsepower": "20.5 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 9149,
    "msrp": 10723,
    "description": "The FW45 52\" Kawasaki with CC — top-of-line commercial walk-behind for sloped terrain and precision trimming.",
    "features": [
      "20.5 HP Kawasaki FX651V engine",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "52\" fabricated deck (with Control Console)",
      "Dual-lever blade control",
      "Mulch / bag / side discharge"
    ],
    "imageUrl": "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902014"
  },
  {
    "sku": "5901893",
    "name": "Ferris FW45 Walk-Behind",
    "category": "Walk-Behind Mowers",
    "engine": "Vanguard® 810cc EFI w/ Oil Guard",
    "horsepower": "28 hp",
    "deckSizes": [
      "52\""
    ],
    "price": 9849,
    "msrp": 11494,
    "description": "The FW45 Vanguard EFI 52\" — top-of-line commercial walk-behind with Oil Guard extended service intervals.",
    "features": [
      "Vanguard 810cc EFI with Oil Guard",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "52\" fabricated deck",
      "Electronic Fuel Injection",
      "Extended oil change intervals"
    ],
    "imageUrl": "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FL.jpg",
    "images": [
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FL.jpg",
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FR.jpg",
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_L.jpg",
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_R.jpg",
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_KL.jpg",
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_KR.jpg",
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_HOC.jpg",
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FL-low.jpg",
      "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FR-low.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER",
    "tag": "Commercial Grade",
    "canonicalSku": "5902014"
  },
  {
    "sku": "5902016",
    "name": "Ferris FW45 Walk-Behind",
    "category": "Walk-Behind Mowers",
    "engine": "Kawasaki® FX730V",
    "horsepower": "23.5 hp",
    "deckSizes": [
      "61\""
    ],
    "price": 9749,
    "msrp": 11384,
    "description": "The FW45 61\" — the widest Ferris walk-behind, delivering maximum coverage for large commercial walk-behind applications.",
    "features": [
      "Kawasaki FX730V engine",
      "Dual Hydro-Gear® ZT-3400® transaxles",
      "61\" wide-cut fabricated deck",
      "Dual-lever blade control",
      "Mulch / bag / side discharge"
    ],
    "imageUrl": "/images/ferris/basco/5901893/5901893_FER_FW45_CC_Studio_FL.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "canonicalSku": "5902014"
  },
  {
    "sku": "5902012",
    "name": "Ferris FB1000 Hurricane™",
    "category": "Stand-On Blowers",
    "engine": "Vanguard® V-Twin",
    "horsepower": "18 hp",
    "deckSizes": [],
    "price": 10299,
    "msrp": 11329,
    "description": "The FB1000 Hurricane stand-on blower clears debris fast — built for commercial landscape crews that need maximum productivity on large properties.",
    "features": [
      "18 HP Vanguard V-Twin engine",
      "Stand-on operator platform",
      "3,500 CFM blowing power",
      "Hydrostatic dual drive",
      "35.5\" overall width"
    ],
    "imageUrl": "/images/ferris/basco/5902012/5902012_FER_FB1000_FL_TN.jpg",
    "images": [
      "/images/ferris/basco/5902012/5902012_FER_FB1000_FL_TN.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_F_BR_v2_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_FR_TN_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_FR-Chute_BR_v2_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_FR-Top_TN_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_R_BR_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_KR_BR_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_DeflectorControl-L_TN_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_Engine_BR_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_KL-AccessPanel_BR_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_KR-Controls_BR_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_PlatformFoldedUp_TN_Final.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_F-Lifestyle_EB.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_FL-Lifestyle_EB.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_FR-Lifestyle_EB.jpg",
      "/images/ferris/basco/5902012/5902012_FER_FB1000_R-Lifestyle_EB.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902193",
    "name": "Ferris FB2000 Hurricane™",
    "category": "Stand-On Blowers",
    "engine": "Vanguard® V-Twin",
    "horsepower": "23 hp",
    "deckSizes": [],
    "price": 13199,
    "msrp": 14519,
    "description": "The FB2000 steps up with 4,500 CFM and 165+ mph velocity — serious debris clearing power for large commercial routes.",
    "features": [
      "23 HP Vanguard V-Twin engine",
      "Stand-on operator platform",
      "4,500 CFM airflow",
      "165+ mph air velocity",
      "Joystick-controlled dual deflector"
    ],
    "imageUrl": "https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Stand-On%20Blowers/FB2000/Product%20Images/FER_PDP_FB2000_Hero_FL.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902194",
    "name": "Ferris FB3000 Hurricane™",
    "category": "Stand-On Blowers",
    "engine": "Vanguard® V-Twin",
    "horsepower": "35 hp",
    "deckSizes": [],
    "price": 14850,
    "msrp": 16335,
    "description": "The FB3000 is the most powerful stand-on blower Ferris makes — 7,500 CFM and up to 190 mph for maximum fall cleanup efficiency.",
    "features": [
      "35 HP Vanguard V-Twin engine",
      "Stand-on operator platform",
      "7,500 CFM maximum airflow",
      "Up to 190 mph air velocity",
      "Joystick-controlled dual deflector"
    ],
    "imageUrl": "/images/ferris/basco/5901810/5901810_FER_FB3000_FRONT.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5900533",
    "name": "Ferris ProCut S",
    "category": "Front Mount Mowers",
    "engine": "Kawasaki® FS730V",
    "horsepower": "24 hp",
    "deckSizes": [],
    "price": 13598,
    "msrp": 13598,
    "description": "The ProCut S is a front-mount commercial mower built for municipalities, schools, and large-property operators. Choose the complete unit, the mower without a deck, or the 61\" deck on its own — two engine options available.",
    "features": [
      "Choice of 24 HP Kawasaki FS730V or 27 HP Briggs & Stratton CXi",
      "61\" front-mount cutting deck (sold complete, deck-only, or mower-only)",
      "Rear-discharge cutting system",
      "Commercial-grade construction",
      "Pricing shown is final — no rebate"
    ],
    "imageUrl": "https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Front%20Mount%20Mowers/Procut%20S/Product%20Images/FER_ProCutS_ProductImage.jpg",
    "status": "AVAILABLE_TO_ORDER",
    "variants": [
      {
        "sku": "5900533",
        "engine": "Kawasaki® FS730V",
        "horsepower": "24 hp",
        "deckSize": "61\" Deck + Mower (Complete Unit)",
        "price": 13598,
        "msrp": 13598,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5900533-MO",
        "engine": "Kawasaki® FS730V",
        "horsepower": "24 hp",
        "deckSize": "Mower Only (no deck)",
        "price": 10499,
        "msrp": 10499,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5900533-BS",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "27 hp",
        "deckSize": "61\" Deck + Mower (Complete Unit)",
        "price": 13098,
        "msrp": 13098,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5900533-BS-MO",
        "engine": "Briggs & Stratton® CXi",
        "horsepower": "27 hp",
        "deckSize": "Mower Only (no deck)",
        "price": 9999,
        "msrp": 9999,
        "status": "AVAILABLE_TO_ORDER"
      },
      {
        "sku": "5900533-DECK",
        "engine": "Deck unit (no engine)",
        "horsepower": "—",
        "deckSize": "61\" Deck Only",
        "price": 3099,
        "msrp": 3099,
        "status": "AVAILABLE_TO_ORDER"
      }
    ]
  },
  {
    "sku": "5902195",
    "name": "Ferris Venture X",
    "category": "Ride-On Spreader/Sprayers",
    "engine": "Vanguard® V-Twin",
    "horsepower": "18 hp",
    "deckSizes": [],
    "price": 16499,
    "msrp": 18149,
    "description": "The Venture X is Ferris's premium ride-on spreader/sprayer with 24 gallons of liquid capacity and zero-turn precision.",
    "features": [
      "18 HP Vanguard V-Twin engine",
      "24 gallon liquid capacity",
      "Zero-turn maneuverability",
      "Up to 8 mph ground speed",
      "Precision application system"
    ],
    "imageUrl": "/images/ferris/basco/5902195/5902195_FER_VentureX_FL_Final.jpg",
    "images": [
      "/images/ferris/basco/5902195/5902195_FER_VentureX_FL_Final.jpg",
      "/images/ferris/basco/5902195/5902195_FER_VentureX_F_Final.jpg",
      "/images/ferris/basco/5902195/5902195_FER_VentureX_FR_Final.jpg",
      "/images/ferris/basco/5902195/5902195_FER_VentureX_L_Final.jpg",
      "/images/ferris/basco/5902195/5902195_FER_VentureX_R_Final.jpg",
      "/images/ferris/basco/5902195/5902195_FER_VentureX_K_Final.jpg",
      "/images/ferris/basco/5902195/5902195_FER_VentureX_KL_Final.jpg",
      "/images/ferris/basco/5902195/5902195_FER_VentureX_KR_Final.jpg",
      "/images/ferris/basco/5902195/5902195_FER_VentureX_T_Final.jpg"
    ],
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902209",
    "name": "Ferris Pathfinder XC™ FS2200",
    "category": "Ride-On Spreader/Sprayers",
    "engine": "Honda® GX200",
    "horsepower": "6.5 hp",
    "deckSizes": [],
    "price": 11249,
    "msrp": 12374,
    "description": "The Pathfinder XC FS2200 delivers precision granular and liquid application in a compact ride-on platform.",
    "features": [
      "Honda GX200 engine",
      "16 gallon liquid capacity",
      "Granular spread capability",
      "Compact ride-on design"
    ],
    "imageUrl": "https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Spreader%20Sprayers/FS2200/Product%20Images/FER_PathfinderXC-FS2200_Updated.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902208",
    "name": "Ferris Pathfinder™ FS2100",
    "category": "Ride-On Spreader/Sprayers",
    "engine": "Honda®",
    "horsepower": "",
    "deckSizes": [],
    "price": 10449,
    "msrp": 11494,
    "description": "The Pathfinder FS2100 is Ferris's entry-level ride-on spreader/sprayer — precise, compact, and built for residential lawn care routes.",
    "features": [
      "Honda engine",
      "Ride-on operator platform",
      "Granular and liquid application",
      "Compact design"
    ],
    "imageUrl": "https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Spreader%20Sprayers/FS2100/Product%20Images/FER_Pathfinder-FS2100_Updated.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "5902199",
    "name": "Ferris Rover XC™ FS1200",
    "category": "Ride-On Spreader/Sprayers",
    "engine": "Vanguard® 160",
    "horsepower": "",
    "deckSizes": [],
    "price": 8249,
    "msrp": 9073,
    "description": "The Rover XC FS1200 is the most compact Ferris spreader — fits through 36\" gates with a 200 lb stainless steel hopper for precise granular applications.",
    "features": [
      "Vanguard 160 engine",
      "200 lb granular hopper",
      "Stainless steel frame",
      "Fits through 36\" gates",
      "Precision granular application"
    ],
    "imageUrl": "https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Spreader%20Sprayers/FS1200/Product%20Images/FER_RoverXC-FS1200_Updated.jpg",
    "status": "AVAILABLE_TO_ORDER"
  },
  {
    "sku": "ferris-isx3300-curtis-ac-cab",
    "name": "Ferris ISX™ 3300 — Curtis Premium A/C Cab",
    "category": "Zero Turn Mowers",
    "engine": "Vanguard® Big Block EFI ETC with Oil Guard",
    "horsepower": "40 hp",
    "deckSizes": [
      "60\""
    ],
    "price": 29300,
    "msrp": 36200,
    "description": "A Ferris ISX 3300 with the Curtis Industries Premium A/C cab installed and ready to roll. Air conditioning that's pre-charged from the factory, hard-coated polycarbonate windshield, lockable doors, side mirrors, front and rear wipers, and headlights — all on this unit. Cutting in 95-degree humidity is a different deal when you're sitting in here. The chassis is the top of the Ferris line: ForeFront suspension, Dual Hydro-Gear ZT-5400, 2-belt iCD+ deck, Vanguard Big Block EFI with Oil Guard. Want a 61\" or 72\" deck instead of the 60\"? We'll order it and install the cab for you — pricing on request.",
    "features": [
      "Curtis Industries Premium A/C Cab (SKU 1FISX33PR)",
      "Pre-charged automotive A/C — runs at full throttle",
      "Hard-coated tinted polycarbonate windshield + doors",
      "Lockable rear-hinged side doors",
      "Front + rear wipers, headlights, side mirrors — all installed",
      "Lightweight aluminum cab with acoustical headliner",
      "40 HP Vanguard® Big Block EFI ETC with Oil Guard",
      "60\" iCD+ side-discharge deck (61\" or 72\" available — call us)",
      "Next-gen ForeFront™ suspension, front + rear independent",
      "Dual Hydro-Gear® ZT-5400 commercial drive"
    ],
    "imageUrl": "/images/ferris/isx3300-curtis-cab/02-rear-3q.webp",
    "images": [
      "/images/ferris/isx3300-curtis-cab/02-rear-3q.webp",
      "/images/ferris/isx3300-curtis-cab/01-front-3q-hero.webp",
      "/images/ferris/isx3300-curtis-cab/03-side-profile.webp",
      "/images/ferris/isx3300-curtis-cab/04-operator-station.webp",
      "/images/ferris/isx3300-curtis-cab/05-cab-interior-controls.webp",
      "/images/ferris/isx3300-curtis-cab/06-curtis-ac-unit.webp",
      "/images/ferris/isx3300-curtis-cab/07-vanguard-engine.webp",
      "/images/ferris/isx3300-curtis-cab/08-60in-deck.webp",
      "/images/ferris/isx3300-curtis-cab/09-isx3300-chassis-decal.webp",
      "/images/ferris/isx3300-curtis-cab/10-curtis-mfg-label.webp"
    ],
    "status": "IN_STOCK",
    "tag": "Climate-Controlled Cab",
    "keyFeatures": [
      {
        "title": "Real A/C, Real Cab",
        "body": "Curtis Industries built the cab. We installed it. Hard polycarbonate windshield, doors that lock, automotive A/C pre-charged from the factory. Aluminum frame, acoustical headliner. Same outfit you see on the John Deere and Kubota dealer floors.",
        "icon": "seat"
      },
      {
        "title": "Top of the Ferris Line",
        "body": "ISX 3300 is the flagship. ForeFront suspension, Dual Hydro-Gear ZT-5400, 2-belt iCD+ cutting deck, and Vanguard's Big Block EFI ETC with Oil Guard for extended service intervals. The cab needs the Big Block — Kawasaki won't work with this setup.",
        "icon": "engine"
      },
      {
        "title": "Wipers, Lights, Mirrors — All On It",
        "body": "Three Curtis kits already installed on this unit: front + rear wiper kit, light kit (headlights for early starts), side-mirror kit. You can see the three rocker switches on the headliner in the photos.",
        "icon": "deck"
      },
      {
        "title": "Build Your Own",
        "body": "This unit is the 60\" deck. The same ISX 3300 chassis comes in 61\" or 72\" too — we'll order whichever deck you want and install the cab. Curtis also sells add-on accessories like an overhead console, door storage bracket kit ($109), and an additional 5-LED low-profile work light kit ($312). Call or text us at (601) 641-5475 and we'll quote whatever build you want.",
        "icon": "transaxle"
      },
      {
        "title": "Warranty Notes (Important)",
        "body": "Curtis Industries provides their own manufacturer warranty on the cab — terms on file in our parts office, call us and we'll send you a copy. Heads up: aftermarket cab installation can affect Ferris factory warranty coverage on systems the cab modifies (electrical and A/C-related drive). Talk to us before purchase so you know exactly what's covered and what isn't. We'd rather you go in eyes-open.",
        "icon": "warranty"
      }
    ],
    "specs": {
      "groundSpeedFwd": "0–11.5 mph",
      "groundSpeedRev": "0–6 mph",
      "deckConstruction": "10-gauge fabricated steel, iCD+ 2-belt",
      "cuttingHeight": "1.5\" – 5.5\" in 0.25\" increments",
      "engineBrand": "Vanguard®",
      "engineModel": "Big Block EFI ETC with Oil Guard",
      "engineDisplacement": "993 cc",
      "engineCylinders": "V-Twin",
      "starter": "Electric",
      "fuelType": "Unleaded gasoline",
      "fuelCapacity": "11.5 gal",
      "transmission": "Dual Hydro-Gear® ZT-5400 with cooling fans",
      "parkingBrake": "Automatic",
      "suspension": "Next-gen ForeFront™ — front and rear independent",
      "seat": "High-back commercial with armrests, inside Curtis A/C cab",
      "instrumentation": "Digital hour meter + cab control panel (wiper, light, A/C)",
      "spindles": "Heavy-duty cast iron",
      "driveTires": "24x12-12 turf",
      "casterTires": "13x6.5-6 dual",
      "overallLength": "82 in",
      "overallHeight": "76 in (with cab)",
      "overallWidth": "65.5 in (60\" deck)",
      "dryWeight": "~1,950 lb (with Curtis cab installed)",
      "warrantyMachine": "4-yr / 500-hr Ferris commercial limited (subject to standard exclusions; cab install may affect coverage on modified systems)",
      "warrantySuspension": "5-yr / unlimited-hour suspension components",
      "warrantyEngine": "3-yr Vanguard limited engine warranty"
    }
  }
];

export function getProductsBySku(sku: string): Product | undefined {
  return products.find((p) => p.sku === sku);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category && !p.canonicalSku);
}

export function getAllCategories(): ProductCategory[] {
  return [...new Set(products.filter((p) => !p.canonicalSku).map((p) => p.category))];
}

// Catalog listing: one card per family. Excludes non-canonical variant aliases.
export function getCatalogProducts(): Product[] {
  return products.filter((p) => !p.canonicalSku);
}

export const statusLabels: Record<InventoryStatus, { label: string; color: string }> = {
  IN_STOCK: { label: 'In Stock', color: 'bg-green-500' },
  INBOUND: { label: 'Inbound', color: 'bg-yellow-500' },
  AVAILABLE_TO_ORDER: { label: 'Available to Order', color: 'bg-blue-500' },
};
