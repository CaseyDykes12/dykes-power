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
 * Curated third-party reviewer videos, keyed by the same family slug used
 * everywhere else. These are independent owner/operator videos on YouTube
 * (long-term reviews, walk-arounds, side-by-side comparisons). We embed
 * them on the PDP as a "Watch a real review" panel — no Review schema
 * markup emitted, since the speaker isn't a Dykes Motors buyer.
 *
 * Curation policy: pick channels run by working lawn-care operators or
 * trusted equipment reviewers, not Ferris marketing. Replace any video that
 * goes private/unlisted.
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
    videoId: '6sS33fFRjkM',
    title: 'Ferris 300S — 52" / 25HP Briggs Walk-Around Review',
    context: 'Independent reviewer goes through deck, controls, and ride quality.',
  },
  '300r': {
    videoId: '9UeQAcooBog',
    title: 'Ferris 300R — Owner Review',
    context: 'Independent owner walks through the 21.5HP Kawasaki configuration.',
  },
  '500s': {
    videoId: 'hYytgo80Ppc',
    title: 'Ferris 500S — 61" / 24HP Kawasaki Review',
    context: 'Detailed review of deck construction, cut quality, and ride.',
  },
  'f60': {
    videoId: 'S-aZy89_GlA',
    title: 'Ferris F60Z — 36" Sit-Down Mower Owner Review',
    context: 'Owner shares real-world impressions of the compact commercial zero-turn.',
  },

  // ── Commercial IS / ISX zero turn ─────────────────────────────────
  'is600': {
    videoId: 'CbwGXeKBENw',
    title: 'Ferris IS 600Z — Owner Demo & Ride Review',
    context: 'Working operator demonstrates how the suspension handles rough ground.',
  },
  'is700': {
    videoId: 'aheOEcBEz4k',
    title: 'Ferris IS 700Z — Are Ferris Mowers Really That Fast?',
    context: 'Independent review focused on speed, productivity, and ride comfort.',
  },
  'isx800': {
    videoId: 'GJrv1QOidvQ',
    title: 'Ferris ISX 800 — Long-Term Review (Watch Before You Buy)',
    context: 'Honest pros and cons after extended use on a residential property.',
  },
  'isx2200': {
    videoId: '1r-6gBUzw2Q',
    title: 'Ferris ISX 2200 — Two-Year Owner Review',
    context: 'Independent owner shares maintenance, durability, and operating tips after two seasons.',
  },
  'isx3300': {
    videoId: 'KtO9IO45x30',
    title: 'Ferris ISX 3300 — 100-Hour Brutally Honest Review',
    context: 'Working operator gives an unfiltered review at the 100-hour mark.',
  },

  // ── Diesel ────────────────────────────────────────────────────────
  'is2600': {
    videoId: '2_g3pqkJ5-o',
    title: 'Ferris IS® 2600 Diesel — Walk-Around & Overview',
    context: 'Independent walk-around of the diesel commercial zero turn.',
  },
  'is6200': {
    videoId: 'LiX4A0shpxo',
    title: 'Ferris IS 6200 Diesel — 72" / 48HP CAT Walk-Around',
    context: 'Independent review of the flagship 72-inch diesel zero turn.',
  },

  // ── Stand-On (SRS) ────────────────────────────────────────────────
  'srsz1': {
    videoId: 'UmId2WFZXxw',
    title: 'Ferris SRS Z1 — How Good Is It, and Is It Priced Right?',
    context: 'Operator-focused review of the entry stand-on with soft-ride suspension.',
  },
  'srsz2': {
    videoId: '6VPYf3WEnIw',
    title: 'Ferris SRS Z2 — One of the Best Mowers You Can Buy',
    context: 'Independent operator review focused on commercial productivity and ride.',
  },
  'srsz3x': {
    videoId: 'L8U_r4pMt9s',
    title: 'Ferris SRS Z3X 60" — 100-Hour Honest Review',
    context: 'Pros and cons on the 37HP Vanguard ETC stand-on at 100 hours.',
  },

  // ── Walk-Behind ───────────────────────────────────────────────────
  'fw15': {
    videoId: 'Qx5PnH1MgCU',
    title: 'Ferris FW15 — Why I Sold My 32" Mower After 2 Years',
    context: 'Long-term owner review of the FW15 hydro walk-behind.',
  },
  'fw25': {
    videoId: '62whqpNZUec',
    title: 'Ferris FW25 52" — Walk-Behind Owner Review',
    context: 'Independent review at 42 hours of commercial use.',
  },
  'fw45': {
    videoId: 'uyJauJhRnm8',
    title: 'Ferris FW45 — 50-Hour Walk-Behind Review',
    context: 'Owner walks through the 52" / 20.5HP Kawasaki commercial unit.',
  },

  // ── Blowers (Hurricane) ───────────────────────────────────────────
  'fb1000': {
    videoId: 'pnhCk92Zxlw',
    title: 'Ferris FB1000 — Is It Any Good? Backyard Beast?',
    context: 'Real-world test of the stand-on blower against typical fall debris.',
  },
  'fb3000': {
    videoId: 'Ld4XGKIZHLE',
    title: 'Ferris FB3000 — Stand-On Blower Review',
    context: 'Independent owner shows the FB3000 in action and covers honest pros/cons.',
  },

  // ── Ride-On Spreader/Sprayer ──────────────────────────────────────
  'venturex': {
    videoId: 'i3HpC4Cb67s',
    title: 'Ferris Venture XC FS3200 — Spreader/Sprayer Review',
    context: 'Working applicator covers productivity and feature highlights.',
  },

  // 300e (electric) intentionally omitted — too new for credible
  // independent owner reviews; revisit once we find a real one.
};

/** Look up a curated YouTube review for a given family slug. */
export function getYoutubeReview(familySlug: string): YoutubeReview | null {
  return YOUTUBE_REVIEWS[familySlug] ?? null;
}
