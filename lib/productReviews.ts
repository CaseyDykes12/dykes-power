// Customer reviews displayed on every PDP.
//
// Two sources, both surfaced via components/ProductReviews.tsx:
//
//   1. dealerReviews — Casey's Google Business Profile reviews of the
//      Dykes Motors Power Equipment dealership at 3069 Hwy 49 Collins MS.
//      Pulled by hand from the three GBPs (Dykes Motors, Service & Repair,
//      Power Equipment) and de-duplicated. These are real, attributable
//      reviews of the BUSINESS — they appear on every PDP because the
//      buyer's trust in the dealer is product-agnostic.
//
//   2. productReviews — model-specific buyer testimonials, keyed by the
//      family slug used in productImages.ts (300s, 300r, isx800, srsz2,
//      etc.). Initially empty for most models. Populate as Casey collects
//      real, verifiable testimonials from customers who bought that
//      specific model from him. We deliberately do NOT scrape forums or
//      fabricate reviews — Google MC reviewers parse review schema, and
//      one bad review-source citation triggers Misrepresentation again.
//
// Schema markup: components/ProductReviews.tsx emits AggregateRating
// + Review JSON-LD on each PDP. Only do this when productReviews[family]
// has at least one entry — otherwise leave the schema off so we don't
// claim ratings we don't have.

export interface CustomerReview {
  /** Reviewer's display name. Full name or first-name + last-initial. */
  name: string;
  /** Star rating out of 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Short headline (optional). */
  title?: string;
  /** Review body text. Keep authentic — no marketing copy. */
  body: string;
  /** ISO date string YYYY-MM-DD. */
  date: string;
  /** City/state if known. */
  location?: string;
  /** Where the review came from. Used for attribution under the review. */
  source: 'Google Business Profile' | 'Direct testimonial' | 'Email follow-up';
  /** Set true when the reviewer purchased from Dykes Motors. */
  verifiedBuyer?: boolean;
}

/**
 * Dealer reviews — show on every PDP as "What buyers say about Dykes Motors."
 * Real reviews from Casey's three Google Business Profiles at 3069 US 49.
 * Update via the GBP dashboard; mirror new reviews here when they come in.
 */
export const dealerReviews: CustomerReview[] = [
  // === Populate from GBP exports ===
  // Casey: replace this placeholder block with the real reviewer names and
  // body text from your three GBPs. Keep ratings and dates accurate.
];

/**
 * Aggregate dealer rating computed from dealerReviews above.
 * If dealerReviews is empty, this returns null and the component hides
 * the aggregate rating display.
 */
export function getDealerAggregateRating(): { average: number; count: number } | null {
  if (dealerReviews.length === 0) return null;
  const sum = dealerReviews.reduce((s, r) => s + r.rating, 0);
  return {
    average: Math.round((sum / dealerReviews.length) * 10) / 10,
    count: dealerReviews.length,
  };
}

/**
 * Per-model reviews. Keyed by the same family slug used in productImages.ts.
 * Add entries as Casey collects real testimonials from customers who bought
 * that specific model. Each model with at least one review will display the
 * reviews section + AggregateRating schema on its PDP.
 */
export const productReviews: Record<string, CustomerReview[]> = {
  '300s':    [],
  '300r':    [],
  '300e':    [],
  '500s':    [],
  'is600':   [],
  'is700':   [],
  'isx800':  [],
  'isx2200': [],
  'isx3300': [],
  'is2600':  [],
  'is6200':  [],
  'srsz1':   [],
  'srsz2':   [],
  'srsz3x':  [],
  'fw15':    [],
  'fw25':    [],
  'fw45':    [],
  'f60':     [],
  'fb1000':  [],
  'fb3000':  [],
  'venturex': [],
};

/** Look up reviews for a given family slug. Returns empty array if none. */
export function getProductReviews(familySlug: string): CustomerReview[] {
  return productReviews[familySlug] ?? [];
}

/** Aggregate rating for a specific family. Null when there are no reviews. */
export function getProductAggregateRating(familySlug: string): { average: number; count: number } | null {
  const reviews = getProductReviews(familySlug);
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return {
    average: Math.round((sum / reviews.length) * 10) / 10,
    count: reviews.length,
  };
}

/**
 * Official-style Ferris product walkthrough videos, keyed by family slug.
 * Used as the first slot in the PDP gallery — customer sees the play
 * button and watching the manufacturer overview is their first action.
 * YouTube's related-video panel after playback then surfaces real-owner
 * reviews naturally, so we don't double-embed reviewer content.
 *
 * Curation policy: prefer videos with Ferris-branded titles (no third-party
 * "Review of" prefix). Drop any video that goes private/unlisted.
 */
export interface YoutubeReview {
  /** YouTube video ID (the part after watch?v= ). */
  videoId: string;
  /** Display title shown above the embed. */
  title: string;
  /** Short context line — what kind of review this is. */
  context: string;
}

export const YOUTUBE_REVIEWS: Record<string, YoutubeReview> = {
  // ── Entry zero turn ───────────────────────────────────────────────
  '300s': {
    videoId: 'tRz1nxSMFgY',
    title: 'Ferris 300S — 52" Deck / 25 HP Briggs & Stratton',
    context: 'Manufacturer-style walk-around of the 300S residential zero turn.',
  },
  '300r': {
    videoId: '9UeQAcooBog',
    title: 'Ferris 300R Zero Turn — Walk-Around',
    context: 'Walk-around of the 300R / 21.5 HP Kawasaki entry zero turn.',
  },
  '500s': {
    videoId: 'PSZnvfnMP60',
    title: 'Ferris 500S — 61" / 25HP Briggs Overview',
    context: 'Authorized-dealer overview of the 500S zero turn — deck, suspension, controls.',
  },
  'f60': {
    videoId: 'NmUt7sc-DiM',
    title: 'Ferris F60Z Commercial Zero Turn Mower',
    context: 'Walk-around of the compact 36" commercial F60Z.',
  },

  // ── Commercial IS / ISX zero turn ─────────────────────────────────
  'is600': {
    videoId: 'FdB3VZ_HfI8',
    title: 'Ferris IS600Z & IS700Z Zero Turn Mowers',
    context: 'Side-by-side walk-around of the IS 600Z and 700Z platforms.',
  },
  'is700': {
    videoId: 'xgcvJSxxG1M',
    title: 'Ferris Zero-Turn Commercial Mower: IS 700Z',
    context: 'Manufacturer-style overview of the IS 700Z commercial zero turn.',
  },
  'isx800': {
    videoId: 'A2-Y_L6EPp4',
    title: 'Feature Overview: Ferris ISX™ 800',
    context: 'Forefront™ Suspension System and feature walkthrough.',
  },
  'isx2200': {
    videoId: 'zmV1SQde5ok',
    title: 'Ferris ISX™ 2200 Zero Turn Mower',
    context: 'Manufacturer-style overview of the ISX 2200 commercial zero turn.',
  },
  'isx3300': {
    videoId: 'flek4cB2Q4E',
    title: 'Ferris ISX™ 3300 Zero Turn Mower — Walkaround Introduction',
    context: 'Dennie walks through the ISX 3300 features and benefits.',
  },

  // ── Diesel ────────────────────────────────────────────────────────
  'is2600': {
    videoId: 'IN8_jQMO9p4',
    title: 'Ferris IS® 2600 Diesel Zero Turn Mower',
    context: 'Manufacturer-style walk-around of the IS 2600 diesel.',
  },
  'is6200': {
    videoId: '7kzN0PyT3tI',
    title: 'Ferris IS® 6200 Diesel Zero Turn Mower — Walkaround Introduction',
    context: 'Walkaround of the flagship 72" CAT-powered diesel zero turn.',
  },

  // ── Stand-On (SRS) ────────────────────────────────────────────────
  'srsz1': {
    videoId: 'TJroXtK1zA8',
    title: 'Ferris SRS™ Z1 Stand-On Mower',
    context: 'Overview of the Z1 with soft-ride stand-on suspension.',
  },
  'srsz2': {
    videoId: 'O_fBKCpqGuI',
    title: 'Ferris Stand-On Commercial Zero Turn Mower: SRS™ Z2',
    context: 'Walk-around of the SRS Z2 commercial stand-on.',
  },
  'srsz3x': {
    videoId: 'xedBWcnX99s',
    title: 'Ferris SRS™ Z3X Stand-On Mower with Oil Guard',
    context: 'Feature walkthrough of the Z3X stand-on with Oil Guard system.',
  },

  // ── Walk-Behind ───────────────────────────────────────────────────
  'fw15': {
    videoId: '8NImp8aaXvM',
    title: 'Ferris FW15 Walk-Behind Mower',
    context: 'Overview of the FW15 commercial walk-behind with Honda engine.',
  },
  'fw25': {
    videoId: 'ekUm5mPnsZA',
    title: 'Ferris FW25 48" Walk-Behind Mower',
    context: 'Walk-around of the FW25 commercial walk-behind.',
  },
  'fw45': {
    videoId: '59hOp0_2qWM',
    title: 'Ferris FW45 Commercial Walk-Behind Lawn Mower',
    context: 'Manufacturer-style overview of the FW45 commercial walk-behind.',
  },

  // ── Blowers (Hurricane) ───────────────────────────────────────────
  'fb1000': {
    videoId: 'j7WEIlNWPL8',
    title: 'Ferris FB1000 Hurricane™ Stand-On Commercial Blower',
    context: 'Manufacturer-style overview of the FB1000 stand-on blower.',
  },
  'fb3000': {
    videoId: 'DuKEJHDLYM4',
    title: 'Ferris FB3000 Stand-On Blower',
    context: 'Overview of the FB3000 Hurricane stand-on commercial blower.',
  },

  // ── Ride-On Spreader/Sprayer ──────────────────────────────────────
  'venturex': {
    videoId: 'i3HpC4Cb67s',
    title: 'Ferris Spreader/Sprayer Venture XC FS3200',
    context: 'Working applicator walks through productivity and features.',
  },

  // 300E electric intentionally omitted — too new for a credible
  // Ferris-branded walk-around video; revisit once one is released.
};

/** Look up a curated YouTube review for a given family slug. */
export function getYoutubeReview(familySlug: string): YoutubeReview | null {
  return YOUTUBE_REVIEWS[familySlug] ?? null;
}
