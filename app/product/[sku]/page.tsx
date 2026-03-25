import { products, getProductsBySku, statusLabels, NOT_ON_LOT_DISCLOSURE } from '@/lib/products';
import { getProductImages } from '@/lib/productImages';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/components/AddToCartButton';
import ProductGallery from '@/components/ProductGallery';

export async function generateStaticParams() {
  return products.map((p) => ({ sku: p.sku }));
}

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const product = getProductsBySku(sku);
  if (!product) notFound();

  const status = statusLabels[product.status];
  const showDisclosure = product.status !== 'IN_STOCK';
  const images = getProductImages(product);

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#0a0a0a] border-b border-gray-800 px-4 py-3">
        <nav className="max-w-[1280px] mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-[#C8C8C8] transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <Link href="/catalog" className="hover:text-[#C8C8C8] transition-colors">Catalog</Link>
          <span className="mx-2">›</span>
          <Link href={`/catalog?category=${encodeURIComponent(product.category)}`} className="hover:text-[#C8C8C8] transition-colors">
            {product.category}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-300">{product.name}</span>
        </nav>
      </div>

      {/* Main content */}
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Gallery ─────────────────────────────────────────────── */}
          <div className="lg:sticky lg:top-24">
            <ProductGallery images={images} alt={product.name} />

            {/* Photo count badge */}
            <p className="text-center text-gray-600 text-xs mt-3">
              {images.length} official photos · Ferris Motors authorized imagery
            </p>
          </div>

          {/* ── Details ─────────────────────────────────────────────── */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tag && (
                <span className="bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded">
                  {product.tag}
                </span>
              )}
              <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${status.color}`}>
                {status.label}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white mb-1 leading-tight"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.03em' }}>
              {product.name}
            </h1>
            <p className="text-gray-500 text-sm mb-5">SKU: {product.sku}</p>

            {/* Price */}
            <div className="mb-6">
              {product.price ? (
                <div>
                  <p className="text-4xl font-black text-white">${product.price.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm mt-1">MSRP · Financing available from 2.9%</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-bold text-[#C8C8C8]">Contact us for pricing</p>
                  <p className="text-gray-500 text-sm mt-1">Call or message us for a real quote</p>
                </div>
              )}
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Engine', value: product.engine },
                { label: 'Horsepower', value: product.horsepower },
                { label: 'Deck Size(s)', value: product.deckSizes.join(', ') },
                { label: 'Category', value: product.category },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#111] rounded-lg p-3 border border-gray-800">
                  <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-white font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-5 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Key Features</p>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="text-[#C8C8C8] font-bold mt-0.5 shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclosure */}
            {showDisclosure && (
              <div className="bg-[#111] border border-gray-700 rounded-lg p-4 mb-6 text-sm text-gray-400">
                <strong className="text-gray-300">Note:</strong> {NOT_ON_LOT_DISCLOSURE}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <AddToCartButton product={product} />
              <Link href="/contact" className="btn-outline text-center py-3 px-6">
                Request a Quote
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:6016415475" className="text-center text-sm text-gray-400 hover:text-[#C8C8C8] transition-colors py-2 border border-gray-800 rounded-lg">
                📞 Sales: (601) 641-5475
              </a>
              <Link href="/contact" className="text-center text-sm text-gray-400 hover:text-[#C8C8C8] transition-colors py-2 border border-gray-800 rounded-lg">
                💳 Financing from 2.9% — Get Pre-Approved
              </Link>
            </div>
          </div>
        </div>

        {/* ── Feature photo strip ──────────────────────────────────── */}
        {images.length > 3 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}>
              See Every Angle
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Official Ferris product photography — click any photo in the gallery above to expand.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.slice(1).map((img, i) => (
                <div key={i} className="bg-[#111] rounded-xl overflow-hidden border border-gray-800 aspect-[4/3] flex items-center justify-center p-3 hover:border-[#C8C8C8] transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${product.name} — detail ${i + 2}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Video placeholder ────────────────────────────────────── */}
        <div className="mt-16 bg-[#111] border border-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-[#C8C8C8] text-xs font-semibold uppercase tracking-widest mb-3">See It In Action</p>
          <h2 className="text-2xl font-bold text-white mb-3">Watch the {product.name}</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
            Official Ferris product videos coming soon. In the meantime, visit the Ferris YouTube channel or call us — we know these machines inside and out.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://www.youtube.com/@MowWithFerris"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm px-6 py-2"
            >
              ▶ Watch on YouTube
            </a>
            <a href="tel:6016415475" className="btn-primary text-sm px-6 py-2">
              Talk to Our Team
            </a>
          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { icon: '💳', title: 'Financing Available', body: 'From 2.9% up to 48 months on select models. Get pre-approved today.', href: '/contact', cta: 'Get Pre-Approved' },
            { icon: '🔧', title: 'Local Service & Support', body: 'Our team in Collins, MS services every machine we sell — before and after the sale.', href: '/service', cta: 'Service Info' },
            { icon: '📍', title: 'See It In Person', body: 'Come to our Collins, MS location and walk the lot. No pressure, real advice.', href: '/contact', cta: 'Get Directions' },
          ].map(({ icon, title, body, href, cta }) => (
            <div key={title} className="bg-[#111] border border-gray-800 rounded-xl p-6 text-center hover:border-gray-600 transition-colors">
              <p className="text-3xl mb-3">{icon}</p>
              <h3 className="font-bold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm mb-4">{body}</p>
              <Link href={href} className="text-[#C8C8C8] text-sm font-semibold hover:text-white transition-colors">
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
