import { products, getProductsBySku, statusLabels, NOT_ON_LOT_DISCLOSURE } from '@/lib/products';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import ProductImage from '@/components/ProductImage';

export async function generateStaticParams() {
  return products.map((p) => ({ sku: p.sku }));
}

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const product = getProductsBySku(sku);
  if (!product) notFound();

  const status = statusLabels[product.status];
  const showDisclosure = product.status !== 'IN_STOCK';

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-[#C8C8C8]">Home</Link>
        <span className="mx-2">›</span>
        <Link href="/catalog" className="hover:text-[#C8C8C8]">Catalog</Link>
        <span className="mx-2">›</span>
        <Link href={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-[#C8C8C8]">
          {product.category}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-gray-50 rounded-xl flex items-center justify-center p-8 min-h-80">
          <ProductImage src={product.imageUrl} alt={product.name} />
        </div>

        {/* Details */}
        <div>
          {product.tag && (
            <span className="inline-block bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded mb-3">
              {product.tag}
            </span>
          )}
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>
              {status.label}
            </span>
            <span className="text-gray-400 text-sm">SKU: {product.sku}</span>
          </div>

          <div className="mb-6">
            {product.price ? (
              <p className="text-3xl font-bold">${product.price.toLocaleString()}</p>
            ) : (
              <p className="text-xl font-semibold text-[#C8C8C8]">Contact us for pricing</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 rounded-lg p-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Engine</p>
              <p className="font-semibold text-sm mt-0.5">{product.engine}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Horsepower</p>
              <p className="font-semibold text-sm mt-0.5">{product.horsepower}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Deck Size(s)</p>
              <p className="font-semibold text-sm mt-0.5">{product.deckSizes.join(', ')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Category</p>
              <p className="font-semibold text-sm mt-0.5">{product.category}</p>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <ul className="space-y-2 mb-8">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-[#C8C8C8] font-bold mt-0.5">✓</span>
                {f}
              </li>
            ))}
          </ul>

          {showDisclosure && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800">
              <strong>Note:</strong> {NOT_ON_LOT_DISCLOSURE}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <AddToCartButton product={product} />
            <Link href="/contact" className="btn-outline text-center">
              Request a Quote
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Questions? Call us at{' '}
            <a href="tel:6016415475" className="text-[#C8C8C8]">(601) 641-5475</a>
          </p>
        </div>
      </div>
    </div>
  );
}
