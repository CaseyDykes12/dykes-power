import {
  type CustomerReview,
  getProductReviews,
  getProductAggregateRating,
  dealerReviews,
  getDealerAggregateRating,
} from '@/lib/productReviews';

interface Props {
  /** Family slug — same as the key used in productImages.ts (300s, isx800, etc.). */
  familySlug: string;
  /** Product display name — used in section heading. */
  productName: string;
  /** Maximum reviews of each kind to display. Defaults to 5. */
  limit?: number;
}

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span aria-label={`${rating} out of 5 stars`} className="text-[#D4AF37] tracking-tight">
      {'★'.repeat(filled)}
      <span className="text-gray-700">{'★'.repeat(5 - filled)}</span>
    </span>
  );
}

function ReviewCard({ review }: { review: CustomerReview }) {
  return (
    <article className="border-b border-gray-800 pb-5 last:border-b-0 last:pb-0">
      <div className="flex items-baseline gap-3 mb-1">
        <Stars rating={review.rating} />
        {review.verifiedBuyer && (
          <span className="text-[10px] uppercase tracking-widest text-[#C8C8C8] font-bold">
            Verified Buyer
          </span>
        )}
      </div>
      {review.title && (
        <h3 className="text-white font-bold mt-1">{review.title}</h3>
      )}
      <p className="text-gray-300 leading-relaxed mt-1">{review.body}</p>
      <p className="text-xs text-gray-500 mt-2">
        — {review.name}
        {review.location ? `, ${review.location}` : ''}
        {' · '}
        {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
        {' · '}
        <span className="text-gray-600">{review.source}</span>
      </p>
    </article>
  );
}

/**
 * Reviews section for the bottom of every PDP. Two blocks:
 *   1. Reviews from Dykes Motors customers of this Ferris model (if any).
 *   2. Reviews of the Dykes Motors dealership (shown when populated).
 *
 * Product + AggregateRating + Review JSON-LD is emitted only when we have at
 * least one entry in productReviews[familySlug]. The Ferris product video
 * lives in the PDP gallery, not here.
 */
export default function ProductReviews({ familySlug, productName, limit = 5 }: Props) {
  const productList = getProductReviews(familySlug).slice(0, limit);
  const productRating = getProductAggregateRating(familySlug);
  const dealerList = dealerReviews.slice(0, limit);
  const dealerRating = getDealerAggregateRating();

  // Nothing to show at all — bail.
  if (productList.length === 0 && dealerList.length === 0) {
    return null;
  }

  // Schema markup — only when we have at least one real customer review.
  const reviewSchema =
    productList.length > 0 && productRating
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: productName,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: productRating.average,
            reviewCount: productRating.count,
            bestRating: 5,
            worstRating: 1,
          },
          review: productList.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.name },
            datePublished: r.date,
            reviewBody: r.body,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: r.rating,
              bestRating: 5,
              worstRating: 1,
            },
          })),
        }
      : null;

  return (
    <section className="mt-12 pt-10 border-t border-gray-800" aria-labelledby="reviews-heading">
      {reviewSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}

      <h2
        id="reviews-heading"
        className="text-2xl md:text-3xl font-black text-white mb-2"
        style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.03em' }}
      >
        What Buyers Say
      </h2>

      {/* === Customer reviews of this specific model (Dykes Motors buyers) === */}
      {productList.length > 0 && (
        <div className="mb-10">
          <div className="flex items-baseline flex-wrap gap-3 mb-5">
            <h3 className="text-lg font-bold text-white">From Dykes Motors buyers</h3>
            {productRating && (
              <p className="text-sm text-gray-400">
                <Stars rating={productRating.average} />{' '}
                <span className="text-white font-semibold">{productRating.average} of 5</span>
                <span className="text-gray-500"> · {productRating.count} verified review{productRating.count === 1 ? '' : 's'}</span>
              </p>
            )}
          </div>
          <div className="space-y-5">
            {productList.map((r, i) => (
              <ReviewCard key={`${r.name}-${r.date}-${i}`} review={r} />
            ))}
          </div>
        </div>
      )}

      {/* === Dealer reviews === */}
      {dealerList.length > 0 && (
        <div>
          <div className="flex items-baseline flex-wrap gap-3 mb-5">
            <h3 className="text-lg font-bold text-white">About Dykes Motors</h3>
            {dealerRating && (
              <p className="text-sm text-gray-400">
                <Stars rating={dealerRating.average} />{' '}
                <span className="text-white font-semibold">{dealerRating.average} of 5</span>
                <span className="text-gray-500"> · {dealerRating.count} review{dealerRating.count === 1 ? '' : 's'} across Google</span>
              </p>
            )}
          </div>
          <div className="space-y-5">
            {dealerList.map((r, i) => (
              <ReviewCard key={`${r.name}-${r.date}-${i}`} review={r} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Reviews aggregated from the three Dykes Motors Google Business Profiles at 3069 Hwy 49, Collins MS.
          </p>
        </div>
      )}
    </section>
  );
}
