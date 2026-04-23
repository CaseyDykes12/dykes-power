// Rich feature + spec content for flagship Ferris models.
// Keyed by `name` (family name in products.ts) so any canonical or variant
// SKU in the same family picks up the same content.
//
// Source: facts pulled from ferrismowers.com and the Ferris 2026 dealer
// catalog. Facts (specs, dimensions, warranty periods) are not copyrightable;
// all narrative copy here is rewritten in Dykes Motors' counter voice.

import type { KeyFeature, ProductSpecs } from './products';

export interface RichContent {
  keyFeatures: KeyFeature[];
  specs: ProductSpecs;
}

export const richContentByFamily: Record<string, RichContent> = {
  'Ferris 300S Series': {
    keyFeatures: [
      {
        title: 'Full suspension at entry price',
        body: 'Front and rear independent suspension on a sub-$6k machine. You feel the bumps in your back on rigid mowers. You won\'t on this.',
        icon: 'suspension',
      },
      {
        title: 'Commercial-grade engines',
        body: 'Your choice of Kawasaki FR651V (21.5 HP) or Briggs & Stratton PXi (23–25 HP). Both start first pull, both built for hours-per-week use.',
        icon: 'engine',
      },
      {
        title: 'Hydro-Gear ZT-2800 transaxles',
        body: 'Dual transaxles with 7-inch cooling fans. Smooth control, clean stops, and engineered to run all day in Mississippi heat without overheating.',
        icon: 'transaxle',
      },
      {
        title: '10-gauge fabricated steel deck',
        body: '48" or 52" deck cut from heavy-gauge fabricated steel — not stamped. Anti-scalp rollers stock, cutting height 1.5–4.5 inches.',
        icon: 'deck',
      },
      {
        title: 'Bolstered 18" spring-suspension seat',
        body: 'The seat is not an afterthought. Bolsters keep you in place on side-hills; the spring base takes the rest of what the suspension doesn\'t.',
        icon: 'seat',
      },
      {
        title: 'Pre-drilled hitch mount',
        body: 'Standard trailer hitch receiver built into the frame. Pull a spreader, a sprayer, a small trailer — no welding, no add-on brackets.',
        icon: 'hitch',
      },
    ],
    specs: {
      groundSpeedFwd: '0–8 mph',
      groundSpeedRev: '0–4 mph',
      deckConstruction: '10-gauge fabricated steel',
      cuttingHeight: '1.5–4.5 inches',
      engineBrand: 'Kawasaki FR651V or Briggs & Stratton PXi',
      engineDisplacement: '724–726 cc',
      engineCylinders: '2',
      starter: 'Electric',
      fuelType: 'Gasoline',
      fuelCapacity: '3 gallons',
      transmission: 'Dual Hydro-Gear ZT-2800 with 7" cooling fans',
      parkingBrake: 'Hand-operated internal transaxle brake',
      suspension: 'Front and rear independent',
      seat: 'Premium bolstered 18" with spring suspension',
      instrumentation: 'Hour meter in control panel',
      spindles: 'Aluminum, greasable',
      driveTires: '20 x 10–8',
      casterTires: '11 x 6–5',
      overallLength: '72 inches',
      overallHeight: '42–44 inches',
      overallWidth: '72 inches',
      dryWeight: '643–700 lbs',
      warrantyMachine: '3 years (90-day commercial)',
      warrantySuspension: '10 years',
      warrantyEngine: 'Per engine manufacturer\'s warranty',
    },
  },

  'Ferris ISX™ 800 Series': {
    keyFeatures: [
      {
        title: 'Step up to real commercial',
        body: 'ISX is where Ferris stops pretending and goes full commercial. Heavier frame, bigger engines, thicker deck — built for 30+ hours a week.',
        icon: 'engine',
      },
      {
        title: 'ForeFront™ suspension',
        body: 'Four-wheel independent suspension with adjustable coil-overs. Same 10-year warranty as the top-tier machines. Ride quality is not optional on a commercial.',
        icon: 'suspension',
      },
      {
        title: 'iCD™+ cutting system',
        body: 'Ferris\'s third-gen cut design. Deeper chamber pulls grass upright, blades finish clean, discharge moves out fast — even in wet grass.',
        icon: 'deck',
      },
      {
        title: 'Hydro-Gear ZT-3400 transaxles',
        body: 'Commercial-grade transaxles with 10" cooling fans. Handle heavy loads, side-slopes, and all-day duty cycles without fading.',
        icon: 'transaxle',
      },
      {
        title: '11-gauge fabricated deck',
        body: '52" or 60" deck built from 11-ga fabricated steel. Side discharge, mulch-compatible, cutting height 1.5–4.5 inches with a foot-assist lift.',
        icon: 'deck',
      },
      {
        title: 'Commercial warranty',
        body: '3 years / 500 hours commercial, 4 years residential. Suspension covered 10 years no matter what. Engine per manufacturer.',
        icon: 'warranty',
      },
    ],
    specs: {
      groundSpeedFwd: '0–10 mph',
      groundSpeedRev: '0–5 mph',
      deckConstruction: '11-gauge fabricated steel with deep deck shell',
      cuttingHeight: '1.5–4.5 inches',
      engineBrand: 'Briggs & Stratton CXi Commercial Series',
      engineDisplacement: '810 cc',
      engineCylinders: '2',
      starter: 'Electric',
      fuelType: 'Gasoline',
      fuelCapacity: '5 gallons',
      transmission: 'Dual Hydro-Gear ZT-3400 with 10" cooling fans',
      parkingBrake: 'Internal transaxle brake with hand lever',
      suspension: 'ForeFront™ four-wheel independent (adjustable coil-over)',
      seat: 'High-back suspension seat with armrests',
      instrumentation: 'Hour meter, fuel gauge, maintenance-minder',
      spindles: 'Cast-iron, greasable',
      driveTires: '22 x 10.5–12',
      casterTires: '13 x 6.5–6',
      overallLength: '80 inches',
      overallHeight: '48 inches',
      overallWidth: '62–72 inches (deck-dependent)',
      dryWeight: '985 lbs',
      warrantyMachine: '3 years / 500 hours commercial · 4 years residential',
      warrantySuspension: '10 years',
      warrantyEngine: 'Per engine manufacturer\'s warranty',
    },
  },

  'Ferris ISX™ 2200 Series': {
    keyFeatures: [
      {
        title: 'Pro-grade production mower',
        body: 'ISX 2200 is built for crews logging 1,000+ hours a year. Heavier components across the board vs ISX 800 — frame, spindles, transaxles, seat.',
        icon: 'engine',
      },
      {
        title: 'EFI engine options',
        body: 'Vanguard 810cc EFI or Kawasaki FX781V EVO. Both fuel-injected — no carb to clean, first-pull starts, 15–25% better fuel economy than carb equivalents.',
        icon: 'engine',
      },
      {
        title: 'Oil Guard™ available',
        body: 'On Vanguard trims, Oil Guard stretches oil-change intervals to 500 hours (vs 100 standard). One oil change every 3-4 months instead of weekly.',
        icon: 'engine',
      },
      {
        title: 'iCD™+ deck with deep shell',
        body: '52" or 60" fabricated deck, commercial spindles, deeper shell for better vacuum and discharge. Consistent cut at 10 mph ground speed.',
        icon: 'deck',
      },
      {
        title: 'Hydro-Gear ZT-5400 Powertrain',
        body: 'Serviceable commercial transaxles with external cooler and 10" cooling fans. Engineered for full-day commercial routes.',
        icon: 'transaxle',
      },
      {
        title: 'Operator platform',
        body: 'Full-suspension high-back seat, adjustable armrests, padded control pods. Hours-on-end comfort — productivity without the back pain.',
        icon: 'seat',
      },
    ],
    specs: {
      groundSpeedFwd: '0–10 mph',
      groundSpeedRev: '0–5 mph',
      deckConstruction: '10-gauge fabricated steel, iCD+ deep-shell',
      cuttingHeight: '1.5–4.5 inches',
      engineBrand: 'Vanguard 810cc EFI or Kawasaki FX781V EVO',
      engineDisplacement: '810 cc (Vanguard) · 852 cc (Kawasaki)',
      engineCylinders: '2',
      starter: 'Electric',
      fuelType: 'Gasoline',
      fuelCapacity: '9 gallons',
      transmission: 'Dual Hydro-Gear ZT-5400 Powertrain',
      parkingBrake: 'Hand-operated transaxle brake',
      suspension: 'ForeFront™ four-wheel independent',
      seat: 'Suspension high-back with armrests and bolsters',
      instrumentation: 'Digital hour meter, fuel gauge, engine diagnostics',
      spindles: 'Heavy-duty cast-iron, greasable',
      driveTires: '24 x 12–12',
      casterTires: '13 x 6.5–6',
      overallLength: '83 inches',
      overallHeight: '52 inches',
      overallWidth: '62–72 inches (deck-dependent)',
      dryWeight: '1,130 lbs',
      warrantyMachine: '3 years / 500 hours commercial · 4 years residential',
      warrantySuspension: '10 years',
      warrantyEngine: 'Per engine manufacturer\'s warranty',
    },
  },

  'Ferris SRS™ Z3X Series': {
    keyFeatures: [
      {
        title: 'Stand-on productivity',
        body: 'SRS Z3X is Ferris\'s top-tier stand-on. Mow faster, trim tighter, stay on your feet — and get more acres per day than any sit-down of the same deck.',
        icon: 'engine',
      },
      {
        title: 'Suspension platform',
        body: 'Full-platform suspension on a stand-on is still rare. You get the ground-speed of stand-on with the ride quality of a zero-turn. 10-year suspension warranty.',
        icon: 'suspension',
      },
      {
        title: 'iCD™+ deck, three deck sizes',
        body: '52", 60", or 72" deck. iCD+ deep shell cuts clean at full ground speed. Side discharge + optional mulch kit or OCDC.',
        icon: 'deck',
      },
      {
        title: 'Vanguard or Kawasaki commercial',
        body: 'Vanguard Big Block EFI or Kawasaki FX1000V EFI. Either way, commercial-grade fuel-injected power for all-day use.',
        icon: 'engine',
      },
      {
        title: 'Fold-up platform',
        body: 'The operator platform folds up for transport and tight garage storage. Saves footprint without sacrificing walk-around room on the job.',
        icon: 'seat',
      },
      {
        title: 'ZT-5400 transaxles',
        body: 'Same commercial Powertrain transaxles as the ISX 2200. Serviceable, external cooler, 12 mph top ground speed.',
        icon: 'transaxle',
      },
    ],
    specs: {
      groundSpeedFwd: '0–12 mph',
      groundSpeedRev: '0–6 mph',
      deckConstruction: '10-gauge fabricated steel, iCD+ deep-shell',
      cuttingHeight: '1.5–4.5 inches',
      engineBrand: 'Vanguard Big Block EFI or Kawasaki FX1000V EFI',
      engineDisplacement: '993 cc (Vanguard) · 999 cc (Kawasaki)',
      engineCylinders: '2',
      starter: 'Electric',
      fuelType: 'Gasoline',
      fuelCapacity: '8 gallons',
      transmission: 'Dual Hydro-Gear ZT-5400 Powertrain',
      parkingBrake: 'Automatic operator-presence lockout',
      suspension: 'Full-platform suspension (operator + front wheels)',
      seat: 'Stand-on platform, fold-up for transport',
      instrumentation: 'Digital hour meter, maintenance alerts',
      spindles: 'Heavy-duty cast-iron, greasable',
      driveTires: '24 x 12–12',
      casterTires: '13 x 6.5–6',
      overallLength: '79 inches',
      overallHeight: '61 inches',
      overallWidth: '62–82 inches (deck-dependent)',
      dryWeight: '1,080 lbs',
      warrantyMachine: '3 years / 500 hours commercial · 4 years residential',
      warrantySuspension: '10 years',
      warrantyEngine: 'Per engine manufacturer\'s warranty',
    },
  },
};

export function getRichContent(familyName: string): RichContent | undefined {
  return richContentByFamily[familyName];
}
