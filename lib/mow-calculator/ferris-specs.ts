export interface FerrisSpec {
  sku: string;
  name: string;
  category: 'Zero Turn' | 'Stand-On' | 'Walk-Behind' | 'Electric';
  deckInches: number;
  mowSpeedMph: number;
  overlapEfficiency: number;
  heroImage: string;
  slug?: string;
}

export const FERRIS_SPECS: FerrisSpec[] = [
  {
    sku: '5902093',
    name: 'Ferris 300e Electric',
    category: 'Electric',
    deckInches: 42,
    mowSpeedMph: 5.5,
    overlapEfficiency: 0.8,
    heroImage: '/images/ferris/basco/5902093/5902093_FER_300e_Render_FL_Final.jpg',
  },
  {
    sku: 'F320',
    name: 'Ferris F320',
    category: 'Zero Turn',
    deckInches: 48,
    mowSpeedMph: 6,
    overlapEfficiency: 0.8,
    heroImage: '/images/ferris/f320.jpg',
  },
  {
    sku: 'IS700Z-52',
    name: 'Ferris IS® 700Z',
    category: 'Zero Turn',
    deckInches: 52,
    mowSpeedMph: 7,
    overlapEfficiency: 0.82,
    heroImage: '/images/ferris/is700z.jpg',
  },
  {
    sku: 'ISX800-52',
    name: 'Ferris ISX® 800',
    category: 'Zero Turn',
    deckInches: 52,
    mowSpeedMph: 8,
    overlapEfficiency: 0.82,
    heroImage: '/images/ferris/isx800.jpg',
  },
  {
    sku: 'ISX2200-61',
    name: 'Ferris ISX® 2200',
    category: 'Zero Turn',
    deckInches: 61,
    mowSpeedMph: 10,
    overlapEfficiency: 0.85,
    heroImage: '/images/ferris/isx2200.jpg',
  },
  {
    sku: 'SRSZ3-61',
    name: 'Ferris SRS™ Z3 Soft Ride',
    category: 'Stand-On',
    deckInches: 61,
    mowSpeedMph: 9,
    overlapEfficiency: 0.82,
    heroImage: '/images/ferris/srsz3.jpg',
  },
];

export function acresPerHour(spec: FerrisSpec): number {
  return (spec.mowSpeedMph * spec.deckInches * spec.overlapEfficiency) / 100;
}

export function hoursFor(spec: FerrisSpec, propertyAcres: number): number {
  return propertyAcres / acresPerHour(spec);
}

export function formatHours(hours: number): string {
  if (hours < 1) {
    const mins = Math.round(hours * 60);
    return `${mins} min`;
  }
  const whole = Math.floor(hours);
  const mins = Math.round((hours - whole) * 60);
  if (mins === 0) return `${whole} hr`;
  return `${whole} hr ${mins} min`;
}

export function topRecommendedFor(propertyAcres: number): FerrisSpec {
  if (propertyAcres <= 1) return FERRIS_SPECS[0];
  if (propertyAcres <= 3) return FERRIS_SPECS[1];
  if (propertyAcres <= 6) return FERRIS_SPECS[2];
  if (propertyAcres <= 12) return FERRIS_SPECS[3];
  if (propertyAcres <= 25) return FERRIS_SPECS[5];
  return FERRIS_SPECS[4];
}
