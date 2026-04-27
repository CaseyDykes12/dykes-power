import type { ProductCategory } from './products';
import { products } from './products';

export interface CategoryMeta {
  slug: string;
  category: ProductCategory | 'Accessories';
  label: string;
  shortLabel: string;
  description: string;
  href: string;
  fallbackImage: string;
}

export const categoryBrowse: CategoryMeta[] = [
  {
    slug: 'zero-turn-mowers',
    category: 'Zero Turn Mowers',
    label: 'Zero Turn Mowers',
    shortLabel: 'Zero Turn Mowers',
    description: 'Get more done, in less time, without sacrificing your equipment, body, or your work.',
    href: '/products/zero-turn-mowers',
    fallbackImage: '/images/ferris/isx3300.jpg',
  },
  {
    slug: 'stand-on-mowers',
    category: 'Stand-On Mowers',
    label: 'Stand-On Mowers',
    shortLabel: 'Stand-On Mowers',
    description: 'Combining speed, agility, and high cut quality with comfort for unprecedented performance.',
    href: '/products/stand-on-mowers',
    fallbackImage: '/images/ferris/srs-z3x.webp',
  },
  {
    slug: 'walk-behind-mowers',
    category: 'Walk-Behind Mowers',
    label: 'Walk Behind Mowers',
    shortLabel: 'Walk Behind Mowers',
    description: 'Feel the superior handling once you grab hold of our CC™ Centralized Controls.',
    href: '/products/walk-behind-mowers',
    fallbackImage: '/images/ferris/300s.jpg',
  },
  {
    slug: 'front-mount-mowers',
    category: 'Front Mount Mowers',
    label: 'Front-Mount Mowers',
    shortLabel: 'Front-Mount Mowers',
    description: 'Out-front cutting deck so you can mow under fences, around obstacles, and into corners other mowers miss.',
    href: '/products/front-mount-mowers',
    fallbackImage: '/images/ferris/300s.jpg',
  },
  {
    slug: 'stand-on-blowers',
    category: 'Stand-On Blowers',
    label: 'Stand-On Blowers',
    shortLabel: 'Stand-On Blowers',
    description: 'Maximum air flow and power for serious debris management, without the back strain of walk-behinds.',
    href: '/products/stand-on-blowers',
    fallbackImage: '/images/ferris/300s.jpg',
  },
  {
    slug: 'ride-on-spreader-sprayers',
    category: 'Ride-On Spreader/Sprayers',
    label: 'Ride-On Spreader/Sprayers',
    shortLabel: 'Spreader/Sprayers',
    description: 'Precision-engineered for maneuverability, stability, and traction across your turf care work.',
    href: '/products/ride-on-spreader-sprayers',
    fallbackImage: '/images/ferris/300s.jpg',
  },
  {
    slug: 'accessories',
    category: 'Accessories',
    label: 'Collection Systems & Accessories',
    shortLabel: 'Accessories',
    description: 'Baggers, mulch kits, striping kits, light kits, Sulkies, and the small parts that turn a mower into a setup.',
    href: '/accessories',
    fallbackImage: 'https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Zero%20Turn%20Mowers/ISX800/Product%20Images/FER_ISX800_FL-PDP.jpg',
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categoryBrowse.find((c) => c.slug === slug);
}

export function getProductCategorySlugs(): string[] {
  return categoryBrowse.filter((c) => c.category !== 'Accessories').map((c) => c.slug);
}

// Pull a representative image for a category — first canonical product's imageUrl,
// or the fallback if none found.
export function getCategoryCoverImage(meta: CategoryMeta): string {
  if (meta.category === 'Accessories') return meta.fallbackImage;
  const first = products.find((p) => p.category === meta.category && !p.canonicalSku);
  return first?.imageUrl || meta.fallbackImage;
}
