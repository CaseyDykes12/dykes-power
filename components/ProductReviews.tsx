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
 * Reviews section for the bottom of every PDP. Two parts:
 *   1. Reviews of this specific Ferris model (if any collected)
 *   2. Reviews of the Dykes Motors dealership (always shown when populated)
 *
 * Also emits Product + AggregateRating + Review JSON-LD when productReviews
 * has at least one entry — this is what powers Google rich results.
 */
export default function ProductReviews({ familySlug, productName, limit = 5 }: Props) {
  const productList = getProductReviews(familySlug).slice(0, limit);
  const productRating = getProductAggregateRating(familySlug);
  const dealerList = dealerReviews.slice(0, limit);
  const dealerRating = getDealerAggregateRating();

  // Don't render anything if we have no reviews at all yet.
  if (productList.length === 0 && dealerList.length === 0) {
    return null;
  }

  // Schema markup — only when we have at least one product review.
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

      {/* === Product-specific reviews === */}
      {productList.length > 0 ? (
        <div className="mb-10">
          <div className="flex items-baseline flex-wrap gap-3 mb-5">
            <h3 className="text-lg font-bold text-white">About the {productName}</h3>
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
      ) : (
        <div className="mb-10 bg-[#0c0c0c] border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-300 mb-2">
            <span className="font-semibold text-white">Be the first to review the {productName}.</span>
          </p>
          <p className="text-sm text-gray-500">
            Bought one from us? Email <a href="mailto:support@dykespower.com" className="text-[#C8C8C8] underline">support@dykespower.com</a> with how it's working out and we'll feature your review here.
          </p>
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
