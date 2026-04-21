// Ferris 2026 accessory + collection-system catalog data.
// Compatibility lists pulled verbatim from catalog pages 26-27.
// Photo files live in /public/images/accessories/ — drop the catalog crops in
// using the `photo` filename below. Page falls back to a placeholder if missing.

export type AccessoryCategory = 'collection' | 'accessory';

export interface Accessory {
  id: string;
  name: string;
  category: AccessoryCategory;
  description: string;
  photo: string; // /images/accessories/<file>
  specs?: Record<string, string>;
  compatibility: string[]; // free-form model names from the catalog
}

export const COLLECTION_SYSTEMS: Accessory[] = [
  {
    id: 'turbo-pro',
    name: 'Turbo-Pro System',
    category: 'collection',
    description:
      'Powered collection system for compact zero-turns. Pulls grass clean off the deck and drops it into the bagger of your choice.',
    photo: '/images/accessories/turbo-pro.jpg',
    specs: {
      Airflow: '3,500 CFM',
      'Air speed': '150+ mph',
      Width: '19 inches',
      Weight: '56 lbs',
    },
    compatibility: ['IS 600', 'IS 700', '300S', '500S', 'F60'],
  },
  {
    id: 'turbo-pro-max',
    name: 'Turbo-Pro Max System',
    category: 'collection',
    description:
      'Twice the airflow of the Turbo-Pro, built for the bigger ISX commercial decks. Same drop-into-bagger design, more capacity.',
    photo: '/images/accessories/turbo-pro-max.jpg',
    specs: {
      Airflow: '2× Turbo-Pro',
      Width: '21 inches',
      Weight: '62 lbs',
    },
    compatibility: ['ISX 2200', 'ISX 3300'],
  },
  {
    id: 'clean-sweep-twin',
    name: 'Clean Sweep Twin',
    category: 'collection',
    description: 'Twin-bag pull-behind clean sweep collection.',
    photo: '/images/accessories/clean-sweep-twin.jpg',
    specs: { Capacity: '6.5 cu ft' },
    compatibility: ['IS 600', 'IS 700', 'ISX 800', '300S', '500S'],
  },
  {
    id: '2-bag-soft-top',
    name: '2-Bag Soft Top',
    category: 'collection',
    description: 'Two-bag soft-top collection system. Quick to dump, easy to clean.',
    photo: '/images/accessories/2-bag-soft-top.jpg',
    specs: { Capacity: '6.5 cu ft' },
    compatibility: ['IS 600', 'IS 700', '300S', '500S'],
  },
  {
    id: '3-bag-soft-top',
    name: '3-Bag Soft Top',
    category: 'collection',
    description: 'Three-bag soft-top collection for higher-volume jobs.',
    photo: '/images/accessories/3-bag-soft-top.jpg',
    specs: { Capacity: '9 cu ft' },
    compatibility: ['IS 700', 'ISX 800', 'ISX 2200'],
  },
  {
    id: '2-bag-hard-top',
    name: '2-Bag Hard Top',
    category: 'collection',
    description: 'Two-bag hard-top collection. Sealed lid keeps clippings contained.',
    photo: '/images/accessories/2-bag-hard-top.jpg',
    specs: { Capacity: '6.5 cu ft' },
    compatibility: ['IS 600', 'IS 700', '300S', '500S'],
  },
  {
    id: '3-bag-hard-top',
    name: '3-Bag Hard Top',
    category: 'collection',
    description: 'Three-bag hard-top collection for the bigger commercial decks.',
    photo: '/images/accessories/3-bag-hard-top.jpg',
    specs: { Capacity: '9 cu ft' },
    compatibility: ['IS 700', 'ISX 800', 'ISX 2200'],
  },
  {
    id: 'electric-dfs',
    name: 'Electric DFS',
    category: 'collection',
    description:
      'Electric Dump-From-Seat system. Empty the catcher without leaving the seat.',
    photo: '/images/accessories/electric-dfs.jpg',
    specs: { Capacity: '11 cu ft' },
    compatibility: ['ISX 2200', 'ISX 3300', 'IS 2600', 'IS 6200'],
  },
  {
    id: 'ez-dump',
    name: 'EZ Dump',
    category: 'collection',
    description: 'Mechanical dump-from-seat collection. Simple lever, clean dump.',
    photo: '/images/accessories/ez-dump.jpg',
    specs: { Capacity: '11 cu ft' },
    compatibility: ['ISX 2200', 'ISX 3300'],
  },
  {
    id: 'ez-dump-xl',
    name: 'EZ Dump XL',
    category: 'collection',
    description: 'Larger version of EZ Dump for bigger jobs.',
    photo: '/images/accessories/ez-dump-xl.jpg',
    specs: { Capacity: '15 cu ft' },
    compatibility: ['ISX 3300', 'IS 6200'],
  },
];

export const ACCESSORIES: Accessory[] = [
  {
    id: 'mulch-kit',
    name: 'Mulch Kit',
    category: 'accessory',
    description: 'Recirculates clippings back into the deck for finer cut and natural fertilization.',
    photo: '/images/accessories/mulch-kit.jpg',
    compatibility: ['All Ferris models'],
  },
  {
    id: 'fender-kit',
    name: 'Fender Kit',
    category: 'accessory',
    description: 'Side fender kit. Cuts down on grass throw and trim damage on commercial decks.',
    photo: '/images/accessories/fender-kit.jpg',
    compatibility: ['ISX 800', 'ISX 2200', 'ISX 3300'],
  },
  {
    id: 'tweel-tires',
    name: 'Michelin X Tweel Turf Airless Radial Tires',
    category: 'accessory',
    description:
      'Airless radial drive tires from Michelin. No flats, no air pressure to manage, longer service life.',
    photo: '/images/accessories/tweel-tires.jpg',
    compatibility: ['ISX 2200', 'ISX 3300', 'SRS Z3X'],
  },
  {
    id: 'service-jack',
    name: 'Service Jack',
    category: 'accessory',
    description: 'Built-in service jack for blade swaps and underdeck cleaning.',
    photo: '/images/accessories/service-jack.jpg',
    compatibility: ['Most zero-turn and stand-on models'],
  },
  {
    id: 'rops-led-light-kit',
    name: 'ROPS LED Light Kit',
    category: 'accessory',
    description: 'LED work-light kit mounted to the roll-over protection bar.',
    photo: '/images/accessories/rops-led-light-kit.jpg',
    compatibility: ['IS 700', 'ISX 800', 'ISX 2200', 'ISX 3300', 'IS 2600'],
  },
  {
    id: 'led-light-kit',
    name: 'LED Light Kit',
    category: 'accessory',
    description: 'Front-mounted LED work-light kit for early-morning and dusk jobs.',
    photo: '/images/accessories/led-light-kit.jpg',
    compatibility: ['F60', '300R', '300S', '500S', 'IS 600', 'IS 700'],
  },
  {
    id: 'metal-grass-catcher',
    name: 'Metal Grass Catcher',
    category: 'accessory',
    description: 'Heavy-duty metal grass catcher for select walk-behind and zero-turn models.',
    photo: '/images/accessories/metal-grass-catcher.jpg',
    compatibility: ['Select models — call to confirm fit'],
  },
  {
    id: 'fabric-grass-catcher',
    name: 'Fabric Grass Catcher',
    category: 'accessory',
    description: 'Lightweight fabric catcher built for the FW15 walk-behind.',
    photo: '/images/accessories/fabric-grass-catcher.jpg',
    compatibility: ['FW15'],
  },
  {
    id: 'trailer-hitch-kit',
    name: 'Trailer Hitch Kit',
    category: 'accessory',
    description: 'Receiver-style hitch kit for pulling small carts and dump trailers.',
    photo: '/images/accessories/trailer-hitch-kit.jpg',
    compatibility: ['All Ferris zero-turns'],
  },
  {
    id: 'rubber-striping-kit',
    name: 'Rubber Striping Kit',
    category: 'accessory',
    description: 'Rear-mounted rubber stripe kit for crisp ball-field and lawn stripes.',
    photo: '/images/accessories/rubber-striping-kit.jpg',
    compatibility: ['IS Series', 'ISX Series', 'SRS Series', 'IS 2600', 'IS 6200'],
  },
  {
    id: 'roller-bar-stripe-kit',
    name: 'Roller Bar Stripe Kit',
    category: 'accessory',
    description: 'Heavier roller-bar stripe kit for the S Series.',
    photo: '/images/accessories/roller-bar-stripe-kit.jpg',
    compatibility: ['300S', '500S'],
  },
  {
    id: 'sulky',
    name: 'Sulky',
    category: 'accessory',
    description: 'Sulky platform turns the FW25 / FW45 walk-behind into a ride-on.',
    photo: '/images/accessories/sulky.jpg',
    compatibility: ['FW25', 'FW45'],
  },
];
