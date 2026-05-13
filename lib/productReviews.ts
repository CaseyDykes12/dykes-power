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
