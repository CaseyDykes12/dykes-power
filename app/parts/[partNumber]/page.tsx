import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { parts, getPartByNumber } from '@/lib/parts';
import AddPartToCartButton from '@/components/AddPartToCartButton';

export function generateStaticParams() {
  return parts.map((p) => ({ partNumber: p.partNumber }));
}

export async function generateMetadata({ params }: { params: Promise<{ partNumber: string }> }): Promise<Metadata> {
  const { partNumber } = await params;
  const part = getPartByNumber(partNumber);
  if (!part) return {};
  const title = `${part.name} — Ferris OEM Part #${part.partNumber} | Dykes Motors`;
  const description = `${part.name} (Part #${part.partNumber}). ${part.description} Fits: ${part.fits.slice(0, 4).join(', ')}. Available at Dykes Motors Power Equipment, Collins, MS.`;
  return {
    title,
    description,
    alternates: { canonical: `https://www.dykespower.com/parts/${partNumber}` },
    openGraph: {
      title,
      description,
      url: `https://www.dykespower.com/parts/${partNumber}`,
      type: 'website',
    },
  };
}

export default async function PartDetailPage({ params }: { params: Promise<{ partNumber: string }> }) {
  const { partNumber } = await params;
  const part = getPartByNumber(partNumber);
  if (!part) notFound();

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: part.name,
    description: part.description,
    sku: part.partNumber,
    image: part.imageUrl.startsWith('/') ? `https://www.dykespower.com${part.imageUrl}` : part.imageUrl,
    brand: { '@type': 'Brand', name: 'Ferris' },
    category: part.category,
    ...(part.price !== null && {
      offers: {
        '@type': 'Offer',
        url: `https://www.dykespower.com/parts/${part.partNumber}`,
        priceCurrency: 'USD',
        price: part.price,
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'LocalBusiness',
          name: 'Dykes Motors Power Equipment',
          telephone: '+16013362541',
        },
      },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
      { '@type': 'ListItem', position: 2, name: 'Parts', item: 'https://www.dykespower.com/parts' },
      { '@type': 'ListItem', position: 3, name: part.category, item: `https://www.dykespower.com/parts?category=${encodeURIComponent(part.category)}` },
      { '@type': 'ListItem', position: 4, name: part.name, item: `https://www.dykespower.com/parts/${part.partNumber}` },
    ],
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Breadcrumb */}
      <div className="bg-[#0a0a0a] border-b border-gray-800 px-4 py-4">
        <div className="max-w-[1280px] mx-auto text-sm text-gray-500">
          <Link href="/" className="hover:text-[#C8C8C8] transition-colors">Home</Link>
          {' '}›{' '}
          <Link href="/parts" className="hover:text-[#C8C8C8] transition-colors">Parts</Link>
          {' '}›{' '}
          <Link href={`/parts?category=${encodeURIComponent(part.category)}`} className="hover:text-[#C8C8C8] transition-colors">
            {part.category}
          </Link>
          {' '}›{' '}
          <span className="text-gray-300">{part.name}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="bg-[#111] rounded-xl border border-gray-800 flex items-center justify-center p-10 min-h-72">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={part.imageUrl}
              alt={part.name}
              className="max-h-64 max-w-full object-contain opacity-80"
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {part.oem && (
                <span className="bg-[#C8C8C8] text-black text-xs font-bold px-2 py-0.5 rounded">
                  Genuine OEM
                </span>
              )}
              <span className="bg-[#1a1a1a] text-gray-400 text-xs px-2 py-0.5 rounded border border-gray-700">
                {part.category}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">{part.name}</h1>
            <p className="text-gray-500 font-mono text-sm mb-4">Part #{part.partNumber}</p>

            <p className="text-gray-300 mb-6 leading-relaxed">{part.description}</p>

            {/* Price block */}
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5 mb-6">
              {part.price !== null ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-white">${part.price.toFixed(2)}</p>
                    <p className="text-gray-500 text-sm">each</p>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Ships $12.99 flat rate · <span className="text-[#C8C8C8] font-semibold">Free over $75</span>
                  </p>
                </>
              ) : (
                <div>
                  <p className="text-[#C8C8C8] font-bold text-lg mb-1">Pricing Available In-Store</p>
                  <p className="text-gray-500 text-sm">Call or visit us for current pricing on this part.</p>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="mb-8">
              <AddPartToCartButton part={part} />

              {/* Text Addison + install CTAs */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={`sms:+16013362541?body=${encodeURIComponent(`Hey Addison — question about part #${part.partNumber} (${part.name}).`)}`}
                  className="flex items-center justify-center gap-2 border border-gray-700 hover:border-[#C8C8C8] text-gray-300 hover:text-white text-sm py-2 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  Text Addison
                </a>
                <Link
                  href="/service"
                  className="flex items-center justify-center gap-2 border border-gray-700 hover:border-[#C8C8C8] text-gray-300 hover:text-white text-sm py-2 rounded-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/></svg>
                  Book Install
                </Link>
              </div>

              <p className="text-gray-600 text-xs mt-3 text-center">
                Not sure about the swap? <Link href="/service" className="underline hover:text-[#C8C8C8]">Bring it by the shop</Link> — we&rsquo;ll install it for you.
              </p>
            </div>

            {/* Fits list */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Fits These Models</h3>
              <ul className="space-y-1.5">
                {part.fits.map((model) => (
                  <li key={model} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-[#C8C8C8] font-bold">✓</span>
                    {model}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-gray-800">
          <Link href="/parts" className="text-[#C8C8C8] hover:text-white transition-colors text-sm font-semibold">
            ← Back to Parts Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
