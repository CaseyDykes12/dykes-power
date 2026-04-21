import { products, getProductsBySku } from '@/lib/products';
import { getProductImages } from '@/lib/productImages';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import AddToCartButton from '@/components/AddToCartButton';
import ProductGallery from '@/components/ProductGallery';
import FinancingOptions from '@/components/FinancingOptions';
import StickyMobileCTA from '@/components/StickyMobileCTA';
import ProductLeadForm from '@/components/ProductLeadForm';
import { SuspensionWarrantyBadge, isWarrantyEligible } from '@/components/SuspensionWarrantyBadge';
import { getFamilyTagline, FAMILY_TAGLINE_ATTRIBUTION } from '@/lib/familyTaglines';

export async function generateStaticParams() {
  return products.map((p) => ({ sku: p.sku }));
}

export async function generateMetadata({ params }: { params: Promise<{ sku: string }> }): Promise<Metadata> {
  const { sku } = await params;
  const product = getProductsBySku(sku);
  if (!product) return {};
  if (product.canonicalSku) {
    return { alternates: { canonical: `https://www.dykespower.com/product/${product.canonicalSku}` } };
  }

  const title = `${product.name} | Dykes Motors Power Equipment — Collins, MS`;
  const description = `${product.name} — ${product.engine}, ${product.deckSizes.join('/')} deck. ${product.price ? `$${product.price.toLocaleString()} at` : 'Available at'} Dykes Motors Power Equipment, authorized Ferris dealer in Collins, Mississippi.`;
  const images = getProductImages(product);

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url: `https://www.dykespower.com/product/${sku}`,
      images: images.length > 0 ? [{ url: images[0], alt: product.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.length > 0 ? [images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ sku: string }> }) {
  const { sku } = await params;
  const product = getProductsBySku(sku);
  if (!product) notFound();
  if (product.canonicalSku) permanentRedirect(`/product/${product.canonicalSku}`);

  const images = getProductImages(product);
  const familyTagline = getFamilyTagline(product.name);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
      { '@type': 'ListItem', position: 2, name: 'Catalog', item: 'https://www.dykespower.com/catalog' },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.category,
        item: `https://www.dykespower.com/catalog?category=${encodeURIComponent(product.category)}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: product.name,
        item: `https://www.dykespower.com/product/${product.sku}`,
      },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: images,
    brand: { '@type': 'Brand', name: 'Ferris' },
    category: product.category,
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        url: `https://www.dykespower.com/product/${product.sku}`,
        priceCurrency: 'USD',
        price: product.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: product.status === 'IN_STOCK'
          ? 'https://schema.org/InStock'
          : product.status === 'INBOUND'
            ? 'https://schema.org/PreOrder'
            : 'https://schema.org/MadeToOrder',
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'US',
          returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
          merchantReturnLink: 'https://www.dykespower.com/shipping-returns',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'US',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 3, unitCode: 'DAY' },
            transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 7, unitCode: 'DAY' },
          },
        },
        seller: {
          '@type': 'LocalBusiness',
          name: 'Dykes Motors Power Equipment',
          telephone: '+16019095380',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '3069 Hwy 49',
            addressLocality: 'Collins',
            addressRegion: 'MS',
            postalCode: '39428',
            addressCountry: 'US',
          },
        },
      },
    }),
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen pb-20 md:pb-0">
      <StickyMobileCTA product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
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
            <div className="relative">
              <ProductGallery images={images} alt={product.name} />

              {/* "Feels Like a Ferris" campaign sash */}
              <div
                aria-label="Feels Like a Ferris campaign"
                className="absolute top-3 left-3 z-20 bg-ferris-yellow text-dykes-black text-[10px] md:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-lg pointer-events-none"
              >
                Feels Like a Ferris<sup className="text-[8px]">®</sup>
              </div>
            </div>

            {/* Photo count badge */}
            <p className="text-center text-gray-600 text-xs mt-3">
              {images.length} official photos · Ferris Motors authorized imagery
            </p>
          </div>

          {/* ── Details ─────────────────────────────────────────────── */}
          <div>
            {/* Badges */}
            {product.tag && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded">
                  {product.tag}
                </span>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-black text-white mb-1 leading-tight"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.03em' }}>
              {product.name}
            </h1>
            <p className="text-gray-500 text-sm mb-5">SKU: {product.sku}</p>

            {/* Price */}
            <div className="mb-6">
              {product.price ? (
                <div>
                  {product.msrp && product.msrp !== product.price && (
                    <p className="text-gray-500 text-base line-through mb-0.5">
                      MSRP: ${product.msrp.toLocaleString()}
                    </p>
                  )}
                  <p className="text-xs font-semibold text-[#C8C8C8] uppercase tracking-widest mb-1">Dykes Motors Price</p>
                  <p className="text-4xl font-black text-white mb-1">${product.price.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">Cash or finance — your choice</p>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-bold text-[#C8C8C8]">Contact us for pricing</p>
                  <p className="text-gray-500 text-sm mt-1">Call or message us for a real quote</p>
                </div>
              )}
            </div>

            {/* 10-Year Suspension Warranty */}
            {isWarrantyEligible(product.name) && <SuspensionWarrantyBadge variant="detail" />}

            {/* Financing options */}
            {product.price && <FinancingOptions price={product.price} />}

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { label: 'Engine', value: product.engine },
                { label: 'Horsepower', value: product.horsepower },
                { label: 'Deck Size(s)', value: product.deckSizes.join(', ') },
                { label: 'Category', value: product.category },
              ]
                .filter(({ value }) => value && value.trim() !== '' && value !== 'N/A')
                .map(({ label, value }) => (
                  <div key={label} className="bg-[#111] rounded-lg p-3 border border-gray-800">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-white font-semibold text-sm">{value}</p>
                  </div>
                ))}
            </div>

            {/* Engine + deck options table — shown when this family has variants */}
            {product.variants && product.variants.length > 1 && (
              <div className="mb-6 rounded-lg border border-gray-800 bg-[#0c0c0c] overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-800 flex items-baseline justify-between">
                  <p className="text-xs font-bold text-[#C8C8C8] uppercase tracking-widest">Engine and deck options</p>
                  <p className="text-xs text-gray-500">{product.variants.length} configurations</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wider text-gray-500 border-b border-gray-800">
                        <th className="px-4 py-2 font-semibold">Engine</th>
                        <th className="px-4 py-2 font-semibold">HP</th>
                        <th className="px-4 py-2 font-semibold">Deck</th>
                        <th className="px-4 py-2 font-semibold text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {product.variants.map((v) => (
                        <tr
                          key={v.sku}
                          className={`border-b border-gray-900 last:border-b-0 ${v.sku === product.sku ? 'bg-[#1a1a1a]' : ''}`}
                        >
                          <td className="px-4 py-2.5 text-gray-200">{v.engine}</td>
                          <td className="px-4 py-2.5 text-gray-400">{v.horsepower}</td>
                          <td className="px-4 py-2.5 text-gray-400">{v.deckSize}</td>
                          <td className="px-4 py-2.5 text-right text-white font-semibold">
                            {v.price ? `$${v.price.toLocaleString()}` : '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="px-4 py-3 text-xs text-gray-500 border-t border-gray-800">
                  Use the quote form below to lock in the exact engine and deck you want. We can pull any of these from the Ferris factory.
                </p>
              </div>
            )}

            {/* Description — family tagline from catalog when available */}
            {familyTagline ? (
              <div className="mb-5">
                <p className="text-gray-300 leading-relaxed">{familyTagline}</p>
                <p className="text-gray-500 text-xs mt-2 italic">{FAMILY_TAGLINE_ATTRIBUTION}</p>
              </div>
            ) : (
              <p className="text-gray-300 mb-5 leading-relaxed">{product.description}</p>
            )}

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

            {/* CTAs */}
            <div className="mb-4">
              <AddToCartButton product={product} />
            </div>

            {/* Inline lead form — captures every shopper, phone or not */}
            <ProductLeadForm product={product} />

            {product.price && product.price >= 5000 && (
              <div className="mb-4">
                <Link
                  href={`/checkout/deposit?sku=${product.sku}`}
                  className="block w-full text-center bg-[#1a1a1a] border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Reserve with $1,000 Deposit →
                </Link>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Holds your machine. Balance due at pickup or delivery.
                </p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:6019095380" className="text-center text-sm text-gray-400 hover:text-[#C8C8C8] transition-colors py-2 border border-gray-800 rounded-lg flex-1">
                📞 Sales: (601) 909-5380
              </a>
              <Link href="/financing" className="text-center text-sm text-gray-400 hover:text-[#C8C8C8] transition-colors py-2 border border-gray-800 rounded-lg flex-1">
                💳 Apply for Financing
              </Link>
            </div>

            {/* Trust & Policy Links */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
                <Link href="/shipping-returns" className="hover:text-gray-300">Shipping & Returns</Link>
                <Link href="/financing" className="hover:text-gray-300">Financing Options</Link>
                <Link href="/service" className="hover:text-gray-300">Service & Warranty</Link>
                <Link href="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Authorized Ferris dealer · Collins, MS · All manufacturer warranties honored
              </p>
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
                <div key={i} className="bg-[#111] rounded-xl overflow-hidden border border-gray-800 aspect-[4/3] relative hover:border-[#C8C8C8] transition-colors">
                  <Image
                    src={img}
                    alt={`${product.name} — ${product.deckSizes.join('/')} deck, ${product.engine} — view ${i + 2}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-3"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── See more / Talk to team ──────────────────────────────── */}
        <div className="mt-16 bg-[#111] border border-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <p className="text-[#C8C8C8] text-xs font-semibold uppercase tracking-widest mb-3">See It In Action</p>
          <h2 className="text-2xl font-bold text-white mb-3">Watch the {product.name} on Ferris</h2>
          <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
            Visit the official Ferris YouTube channel for in-action footage, or call our team in Collins, MS — we know every machine we sell inside and out.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://www.youtube.com/@MowWithFerris"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm px-6 py-2"
            >
              ▶ Ferris YouTube Channel
            </a>
            <a href="tel:6019095380" className="btn-primary text-sm px-6 py-2">
              Talk to Our Team
            </a>
          </div>
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { icon: '💳', title: 'Financing Available', body: 'As low as 4.9% APR up to 84 months for qualified credit. Get pre-approved today.', href: '/contact', cta: 'Get Pre-Approved' },
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
