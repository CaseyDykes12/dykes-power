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
    "description": "Genuine Ferris OEM blade set — BLADE SET 48 DECK. Direct factory replacement for consistent cut quality.",
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
    "description": "Genuine Ferris OEM blade set — BLADE SET. Direct factory replacement for consistent cut quality.",
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
    "description": "Genuine Ferris OEM blade set — BLADE SET MULCH 52 DECK. Direct factory replacement for consistent cut quality.",
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
    "description": "Genuine Ferris OEM blade set — BLADE SET MULCH 61 DECK. Direct factory replacement for consistent cut quality.",
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
    "description": "Genuine Ferris OEM blade set — BLADE SET 44 DECK. Direct factory replacement for consistent cut quality.",
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
    "description": "Genuine Ferris OEM blade set — BLADE SET MULCH 72 DECK. Direct factory replacement for consistent cut quality.",
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
    "description": "Genuine Ferris BELT. OEM belt for original-spec tension and service life.",
    "price": 298.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Verify fit by mower serial number — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5105029FS",
    "name": "OEM Drive Belt — 5105029FS",
    "category": "Belts",
    "description": "Genuine Ferris BELT. OEM belt for original-spec tension and service life.",
    "price": 109.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Verify fit by mower serial number — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5103928FS",
    "name": "OEM Drive Belt — 5103928FS",
    "category": "Belts",
    "description": "Genuine Ferris BELT. OEM belt for original-spec tension and service life.",
    "price": 156.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Verify fit by mower serial number — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5105884FS",
    "name": "OEM Drive Belt — 5105884FS",
    "category": "Belts",
    "description": "Genuine Ferris BELT. OEM belt for original-spec tension and service life.",
    "price": 44.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Verify fit by mower serial number — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84003255",
    "name": "OEM Drive Belt — 84003255",
    "category": "Belts",
    "description": "Genuine Ferris BELT  DRIVE. OEM belt for original-spec tension and service life.",
    "price": 126.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Verify fit by mower serial number — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009021",
    "name": "OEM Drive Belt — 84009021",
    "category": "Belts",
    "description": "Genuine Ferris BELT. OEM belt for original-spec tension and service life.",
    "price": 90.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Verify fit by mower serial number — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5021251SM",
    "name": "OEM Drive Belt — 5021251SM",
    "category": "Belts",
    "description": "Genuine Ferris BELT. OEM belt for original-spec tension and service life.",
    "price": 50.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Verify fit by mower serial number — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102594FS",
    "name": "OEM Drive Belt — 5102594FS",
    "category": "Belts",
    "description": "Genuine Ferris BELT SET. OEM belt for original-spec tension and service life.",
    "price": 72.99,
    "imageUrl": "/images/parts/belt.jpg",
    "fits": [
      "Verify fit by mower serial number — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "792303",
    "name": "OEM Air Filter — 792303",
    "category": "Air Filters",
    "description": "Genuine Ferris/engine-manufacturer OEM air filter — FILTER-PRE CLEANER. Protects against dust and debris ingestion.",
    "price": 10.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Verify engine model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5400582B",
    "name": "OEM Air Filter — 5400582B",
    "category": "Air Filters",
    "description": "Genuine Ferris/engine-manufacturer OEM air filter — PLATE  AIR FILTER - RED. Protects against dust and debris ingestion.",
    "price": 21.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Verify engine model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "841497",
    "name": "OEM Air Filter — 841497",
    "category": "Air Filters",
    "description": "Genuine Ferris/engine-manufacturer OEM air filter — FILTER-A/C CARTRIDGE. Protects against dust and debris ingestion.",
    "price": 41.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Verify engine model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84008852",
    "name": "OEM Air Filter — 84008852",
    "category": "Air Filters",
    "description": "Genuine Ferris/engine-manufacturer OEM air filter — FILTER  AIR. Protects against dust and debris ingestion.",
    "price": 91.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Verify engine model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102126X6",
    "name": "OEM Air Filter — 5102126X6",
    "category": "Air Filters",
    "description": "Genuine Ferris/engine-manufacturer OEM air filter — BRKT AIR FILTER 22 24&26HP KAV  INNER. Protects against dust and debris ingestion.",
    "price": 56.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Verify engine model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "792105",
    "name": "OEM Air Filter — 792105",
    "category": "Air Filters",
    "description": "Genuine Ferris/engine-manufacturer OEM air filter — FILTER-AIR CLEANER CA. Protects against dust and debris ingestion.",
    "price": 31.99,
    "imageUrl": "/images/parts/air-filter.jpg",
    "fits": [
      "Verify engine model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009389",
    "name": "OEM Oil Filter — 84009389",
    "category": "Oil Filters",
    "description": "Genuine OEM oil filter — FILTER  OIL. Spin-on element for engine longevity.",
    "price": 50.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "842921",
    "name": "OEM Oil Filter — 842921",
    "category": "Oil Filters",
    "description": "Genuine OEM oil filter — FILTER-OIL. Spin-on element for engine longevity.",
    "price": 16.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5101026X1SM",
    "name": "OEM Oil Filter — 5101026X1SM",
    "category": "Oil Filters",
    "description": "Genuine OEM oil filter — FILTER  OIL. Spin-on element for engine longevity.",
    "price": 47.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5401130B",
    "name": "OEM Oil Filter — 5401130B",
    "category": "Oil Filters",
    "description": "Genuine OEM oil filter — MOUNT  OIL FILTER - RED. Spin-on element for engine longevity.",
    "price": 22.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009883",
    "name": "OEM Oil Filter — 84009883",
    "category": "Oil Filters",
    "description": "Genuine OEM oil filter — FILTER  OIL. Spin-on element for engine longevity.",
    "price": 28.99,
    "imageUrl": "/images/parts/kawasaki-oil-filter.png",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84001895",
    "name": "OEM Fuel Filter — 84001895",
    "category": "Fuel Filters",
    "description": "Genuine OEM fuel filter — FILTER  FUEL. Protects carburetor and injectors from contamination.",
    "price": 8.99,
    "imageUrl": "/images/parts/fuel-filter-kit.jpg",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009438",
    "name": "OEM Fuel Filter — 84009438",
    "category": "Fuel Filters",
    "description": "Genuine OEM fuel filter — FILTER  FUEL. Protects carburetor and injectors from contamination.",
    "price": 109.99,
    "imageUrl": "/images/parts/fuel-filter-kit.jpg",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009442",
    "name": "OEM Fuel Filter — 84009442",
    "category": "Fuel Filters",
    "description": "Genuine OEM fuel filter — FILTER  FUEL. Protects carburetor and injectors from contamination.",
    "price": 70.99,
    "imageUrl": "/images/parts/fuel-filter-kit.jpg",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5021178X3FS",
    "name": "OEM Fuel Filter — 5021178X3FS",
    "category": "Fuel Filters",
    "description": "Genuine OEM fuel filter — FILTER  FUEL. Protects carburetor and injectors from contamination.",
    "price": 15.99,
    "imageUrl": "/images/parts/fuel-filter-kit.jpg",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84003655",
    "name": "OEM Spindle Assembly — 84003655",
    "category": "Spindles & Bearings",
    "description": "Genuine Ferris spindle assembly — SPINDLE ASSEMBLY. Heavy-duty cast housing for commercial use.",
    "price": 34.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5416763FS",
    "name": "OEM Spindle Assembly — 5416763FS",
    "category": "Spindles & Bearings",
    "description": "Genuine Ferris spindle assembly — SPINDLE ASSEMBLY. Heavy-duty cast housing for commercial use.",
    "price": 163.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5100993SM",
    "name": "OEM Spindle Assembly — 5100993SM",
    "category": "Spindles & Bearings",
    "description": "Genuine Ferris spindle assembly — SPINDLE ASSEMBLY. Heavy-duty cast housing for commercial use.",
    "price": 208.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5417770FS",
    "name": "OEM Spindle Assembly — 5417770FS",
    "category": "Spindles & Bearings",
    "description": "Genuine Ferris spindle assembly — SPINDLE ASSEMBLY. Heavy-duty cast housing for commercial use.",
    "price": 240.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5104807FS",
    "name": "OEM Spindle Assembly — 5104807FS",
    "category": "Spindles & Bearings",
    "description": "Genuine Ferris spindle assembly — SPINDLE ASSEMBLY. Heavy-duty cast housing for commercial use.",
    "price": 196.99,
    "imageUrl": "/images/parts/spindle.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5023178SM",
    "name": "OEM Pulley — 5023178SM",
    "category": "Pulleys",
    "description": "Genuine Ferris pulley — PULLEY  6.122 OD.  52. Precision-balanced for vibration-free operation.",
    "price": 87.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Verify model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102496YP",
    "name": "OEM Pulley — 5102496YP",
    "category": "Pulleys",
    "description": "Genuine Ferris pulley — PULLEY  IDLER. Precision-balanced for vibration-free operation.",
    "price": 72.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Verify model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102276FS",
    "name": "OEM Pulley — 5102276FS",
    "category": "Pulleys",
    "description": "Genuine Ferris pulley — PULLEY  IDLER. Precision-balanced for vibration-free operation.",
    "price": 63.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Verify model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5104528FS",
    "name": "OEM Pulley — 5104528FS",
    "category": "Pulleys",
    "description": "Genuine Ferris pulley — PULLEY. Precision-balanced for vibration-free operation.",
    "price": 91.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Verify model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5105101YP",
    "name": "OEM Pulley — 5105101YP",
    "category": "Pulleys",
    "description": "Genuine Ferris pulley — PULLEY  IDLER. Precision-balanced for vibration-free operation.",
    "price": 56.99,
    "imageUrl": "/images/parts/pulley.jpg",
    "fits": [
      "Verify model before ordering — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5022433X1SM",
    "name": "OEM Tire/Wheel — 5022433X1SM",
    "category": "Tires & Wheels",
    "description": "Genuine Ferris TIRE  11 X 4.0-5 (TIR. Commercial-grade tread for zero-turn use.",
    "price": 92.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Verify tire size and mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "5109036FS",
    "name": "OEM Tire/Wheel — 5109036FS",
    "category": "Tires & Wheels",
    "description": "Genuine Ferris TIRE ASSEMBLY. Commercial-grade tread for zero-turn use.",
    "price": 87.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Verify tire size and mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "84003896",
    "name": "OEM Tire/Wheel — 84003896",
    "category": "Tires & Wheels",
    "description": "Genuine Ferris TIRE ASSEMBLY. Commercial-grade tread for zero-turn use.",
    "price": 457.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Verify tire size and mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "84010749",
    "name": "OEM Tire/Wheel — 84010749",
    "category": "Tires & Wheels",
    "description": "Genuine Ferris WHEEL. Commercial-grade tread for zero-turn use.",
    "price": 185.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Verify tire size and mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "5104433YP",
    "name": "OEM Tire/Wheel — 5104433YP",
    "category": "Tires & Wheels",
    "description": "Genuine Ferris TIRE ASSM  20X10.00-8. Commercial-grade tread for zero-turn use.",
    "price": 337.99,
    "imageUrl": "/images/parts/tire-wheel.jpg",
    "fits": [
      "Verify tire size and mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": false
  },
  {
    "partNumber": "84010178",
    "name": "OEM Operator Seat — 84010178",
    "category": "Seats & Controls",
    "description": "Genuine Ferris operator seat — SEAT. Direct bolt-on replacement.",
    "price": 1397.99,
    "imageUrl": "/images/parts/seat.jpg",
    "fits": [
      "Verify mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84008926",
    "name": "OEM Operator Seat — 84008926",
    "category": "Seats & Controls",
    "description": "Genuine Ferris operator seat — SEAT PLATE ASSEMBLY. Direct bolt-on replacement.",
    "price": 451.99,
    "imageUrl": "/images/parts/seat.jpg",
    "fits": [
      "Verify mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5415237BFS",
    "name": "OEM Operator Seat — 5415237BFS",
    "category": "Seats & Controls",
    "description": "Genuine Ferris operator seat — SEAT PLATE ASSEMBLY. Direct bolt-on replacement.",
    "price": 211.99,
    "imageUrl": "/images/parts/seat.jpg",
    "fits": [
      "Verify mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5601014",
    "name": "OEM Operator Seat — 5601014",
    "category": "Seats & Controls",
    "description": "Genuine Ferris operator seat — ASSM  SEAT PLATE W/DECAL  F320Z-DOM. Direct bolt-on replacement.",
    "price": 407.99,
    "imageUrl": "/images/parts/seat.jpg",
    "fits": [
      "Verify mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5107021FS",
    "name": "OEM Electrical Component — 5107021FS",
    "category": "Electrical",
    "description": "Genuine Ferris electrical part — SWITCH  IGNITION.",
    "price": 39.99,
    "imageUrl": "/images/parts/pto-switch.jpg",
    "fits": [
      "Verify mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84010299",
    "name": "OEM Electrical Component — 84010299",
    "category": "Electrical",
    "description": "Genuine Ferris electrical part — SWITCH  IGNITION.",
    "price": 60.99,
    "imageUrl": "/images/parts/pto-switch.jpg",
    "fits": [
      "Verify mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5020927FS",
    "name": "OEM Electrical Component — 5020927FS",
    "category": "Electrical",
    "description": "Genuine Ferris electrical part — SWITCH  IGNITION.",
    "price": 41.99,
    "imageUrl": "/images/parts/pto-switch.jpg",
    "fits": [
      "Verify mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102962FS",
    "name": "OEM Electrical Component — 5102962FS",
    "category": "Electrical",
    "description": "Genuine Ferris electrical part — SWITCH  IGNITION.",
    "price": 125.99,
    "imageUrl": "/images/parts/pto-switch.jpg",
    "fits": [
      "Verify mower model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5010673X35SM",
    "name": "OEM Deck Component — 5010673X35SM",
    "category": "Deck Parts",
    "description": "Genuine Ferris #40 ROLLER CHAIN.",
    "price": 27.99,
    "imageUrl": "/images/parts/deck-chute.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5020785SM",
    "name": "OEM Deck Component — 5020785SM",
    "category": "Deck Parts",
    "description": "Genuine Ferris ROLLER  DECK.",
    "price": 36.99,
    "imageUrl": "/images/parts/deck-chute.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5410502AYP",
    "name": "OEM Deck Component — 5410502AYP",
    "category": "Deck Parts",
    "description": "Genuine Ferris ROLLER MOUNT 52 & 61.",
    "price": 143.99,
    "imageUrl": "/images/parts/deck-chute.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5010673X33FS",
    "name": "OEM Deck Component — 5010673X33FS",
    "category": "Deck Parts",
    "description": "Genuine Ferris CHAIN  ROLLER.",
    "price": 11.99,
    "imageUrl": "/images/parts/deck-chute.jpg",
    "fits": [
      "Verify deck model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "1696909",
    "name": "OEM Accessory — 1696909",
    "category": "Accessories",
    "description": "Genuine Ferris MULCH KIT 48. Bolt-on accessory kit.",
    "price": 313.99,
    "imageUrl": "/images/parts/mulch-kit.jpg",
    "fits": [
      "Verify mower compatibility — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5416154BFS",
    "name": "OEM Engine Component — 5416154BFS",
    "category": "Engine Parts",
    "description": "Genuine OEM engine component — MUFFLER  GUARD.",
    "price": 240.99,
    "imageUrl": "/images/parts/engine-parts.jpg",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102389FS",
    "name": "OEM Engine Component — 5102389FS",
    "category": "Engine Parts",
    "description": "Genuine OEM engine component — MUFFLER.",
    "price": 473.99,
    "imageUrl": "/images/parts/engine-parts.jpg",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5105069YP",
    "name": "OEM Engine Component — 5105069YP",
    "category": "Engine Parts",
    "description": "Genuine OEM engine component — MUFFLER.",
    "price": 353.99,
    "imageUrl": "/images/parts/engine-parts.jpg",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84009854",
    "name": "OEM Engine Component — 84009854",
    "category": "Engine Parts",
    "description": "Genuine OEM engine component — MUFFLER.",
    "price": 360.99,
    "imageUrl": "/images/parts/engine-parts.jpg",
    "fits": [
      "Verify engine model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84006964",
    "name": "OEM Hydraulic Component — 84006964",
    "category": "Hydraulic Components",
    "description": "Genuine Hydro-Gear component — TRANSAXLE.",
    "price": 1556.99,
    "imageUrl": "/images/parts/hydraulic-filter.jpg",
    "fits": [
      "Verify transaxle model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "5102815YP",
    "name": "OEM Hydraulic Component — 5102815YP",
    "category": "Hydraulic Components",
    "description": "Genuine Hydro-Gear component — WHEEL MOTOR  RH  11.9.",
    "price": 1237.99,
    "imageUrl": "/images/parts/hydraulic-filter.jpg",
    "fits": [
      "Verify transaxle model — call (601) 336-2541"
    ],
    "inStock": true,
    "oem": true
  },
  {
    "partNumber": "84007620",
    "name": "OEM Hydraulic Component — 84007620",
    "category": "Hydraulic Components",
    "description": "Genuine Hydro-Gear component — TRANSAXLE.",
    "price": 1434.99,
    "imageUrl": "/images/parts/hydraulic-filter.jpg",
    "fits": [
      "Verify transaxle model — call (601) 336-2541"
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
