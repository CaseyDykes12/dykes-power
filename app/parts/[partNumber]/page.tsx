import { notFound } from 'next/navigation';
import Link from 'next/link';
import { parts, getPartByNumber } from '@/lib/parts';

export function generateStaticParams() {
  return parts.map((p) => ({ partNumber: p.partNumber }));
}

export default async function PartDetailPage({ params }: { params: Promise<{ partNumber: string }> }) {
  const { partNumber } = await params;
  const part = getPartByNumber(partNumber);
  if (!part) notFound();

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
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
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                part.inStock ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-400'
              }`}>
                {part.inStock ? 'In Stock' : 'Call to Order'}
              </span>
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
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-white">${part.price.toFixed(2)}</p>
                  <p className="text-gray-500 text-sm">each</p>
                </div>
              ) : (
                <div>
                  <p className="text-[#C8C8C8] font-bold text-lg mb-1">Pricing Available In-Store</p>
                  <p className="text-gray-500 text-sm">Call or visit us for current pricing on this part.</p>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="mb-8">
              <a href="tel:6013362541" className="btn-primary px-6 py-3 inline-block">
                📞 Call to Order — (601) 336-2541
              </a>
              <p className="text-gray-600 text-xs mt-3">
                {part.inStock
                  ? 'In stock — call the parts desk to confirm and reserve.'
                  : 'Call the parts desk for availability and ordering.'}
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
