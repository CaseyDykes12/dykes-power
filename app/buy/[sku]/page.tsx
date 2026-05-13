import { notFound } from 'next/navigation';
import { getProductsBySku, products } from '@/lib/products';
import BuyRedirect from './BuyRedirect';

export const dynamic = 'force-static';

/** Pre-generate one /buy/{sku} page per priced product. */
export async function generateStaticParams() {
  return products
    .filter((p) => p.price && p.price > 0)
    .map((p) => ({ sku: p.sku }));
}

/**
 * Direct-checkout deep link used by Google Merchant Center's
 * checkout_link_template. Customer clicks a Shopping ad for SKU X →
 * lands here → product gets added to their cart → bounced to /checkout
 * with payment form ready. Skips the PDP click-through.
 */
export default async function BuyPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const product = getProductsBySku(sku);
  if (!product || !product.price) notFound();

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 text-white text-lg">
          <span className="inline-block w-5 h-5 border-2 border-[#C8C8C8] border-t-transparent rounded-full animate-spin" aria-hidden />
          <span>Adding {product.name} to your cart…</span>
        </div>
        <p className="text-gray-500 text-sm mt-3">Sit tight — you'll be at checkout in a moment.</p>
        <BuyRedirect product={product} />
      </div>
    </div>
  );
}
