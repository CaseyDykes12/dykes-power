import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Utility Trailers for Sale — Dykes Motors Power Equipment | Collins, MS',
  description:
    'Utility trailers in stock at Dykes Motors Power Equipment in Collins, MS. Single axle trailers for hauling mowers, equipment, and farm supplies across South Mississippi and the Pine Belt.',
  keywords:
    'utility trailer Collins MS, utility trailer for sale Mississippi, single axle trailer South Mississippi, trailer dealer Collins MS, landscape trailer Mississippi, utility trailer Hattiesburg, utility trailer Laurel MS',
};

const trailers = [
  {
    id: '10114',
    name: "2026 Utility Trailer — 5' × 10' Single Axle",
    price: 1590,
    capacity: '3,000 lbs',
    dimensions: "5' Wide × 10' Long",
    axle: 'Single Axle',
    color: 'Black',
    status: 'IN_STOCK' as const,
    description:
      'A tough, no-frills utility trailer built for South Mississippi work. Perfect for landscapers, farmers, and contractors hauling mowers, equipment, or supplies across Covington County and the Pine Belt.',
    features: [
      '3,000 lb capacity',
      "5' × 10' open deck",
      'Single axle',
      'Heavy-duty steel frame',
      'Treated wood deck',
      'Safety chains included',
      'Standard ball hitch',
    ],
    imageUrl: null as string | null,
  },
];

export default function TrailersPage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">

      {/* Header */}
      <div className="mb-10">
        <p className="text-[#C8C8C8] text-sm font-semibold uppercase tracking-widest mb-2">
          In Stock — Collins, Mississippi
        </p>
        <h1 className="text-4xl font-bold text-white mb-3">Utility Trailers</h1>
        <p className="text-gray-400 max-w-2xl">
          Utility trailers in stock at our Collins, MS location — built for farmers, landscapers, and contractors
          hauling equipment across South Mississippi. Stop in or call to purchase.
        </p>
      </div>

      {/* Listings */}
      {trailers.map((trailer) => (
        <div key={trailer.id} className="bg-[#1a1a1a] border border-gray-700 rounded-xl overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-0">

            {/* Image */}
            <div className="bg-[#111] flex items-center justify-center h-72 md:h-auto border-b md:border-b-0 md:border-r border-gray-700">
              {trailer.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={trailer.imageUrl} alt={trailer.name} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8 w-full">
                  <div className="inline-block bg-[#0a0a0a] border border-gray-700 rounded-xl p-6">
                    <p className="text-5xl mb-2">🚜</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">In-Person Viewing</p>
                    <p className="text-sm text-gray-300 mb-4 max-w-xs mx-auto">
                      This trailer is on our lot in Collins, MS — come see it in person or call for current details.
                    </p>
                    <a href="tel:6016415475" className="text-[#C8C8C8] text-sm font-semibold">
                      (601) 641-5475
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-green-400 bg-green-400/10 px-2 py-1 rounded mb-2 inline-block">
                    In Stock
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">{trailer.name}</h2>
                </div>
                <p className="text-3xl font-black text-[#C8C8C8] whitespace-nowrap">
                  ${trailer.price.toLocaleString()}
                </p>
              </div>

              <p className="text-gray-400 text-sm mb-6">{trailer.description}</p>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  ['Capacity', trailer.capacity],
                  ['Dimensions', trailer.dimensions],
                  ['Axle', trailer.axle],
                  ['Color', trailer.color],
                ].map(([label, value]) => (
                  <div key={label} className="bg-black/40 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-white font-semibold text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {/* Features */}
              <ul className="space-y-1 mb-6">
                {trailer.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-gray-400">
                    <span className="text-[#C8C8C8]">✓</span> {f}
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col gap-3">
                <a href="tel:6016415475" className="btn-primary text-center">
                  Call to Purchase — (601) 641-5475
                </a>
                <Link href="/contact" className="btn-outline text-center">
                  Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Cross-sell blocks */}
      <div className="grid md:grid-cols-2 gap-6 mt-2">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
          <h3 className="font-bold text-white mb-2">Need Something to Pull It?</h3>
          <p className="text-gray-400 text-sm mb-4">
            Our sister lot — Dykes Motors — carries trucks, SUVs, and work vehicles on the same property in Collins, MS.
          </p>
          <a
            href="https://www.dykesmotors.com/inventory"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-center text-sm py-2 block"
          >
            Browse Vehicle Inventory at Dykes Motors →
          </a>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
          <h3 className="font-bold text-white mb-2">Ferris Zero-Turn Mowers</h3>
          <p className="text-gray-400 text-sm mb-4">
            Pair your trailer with a Ferris zero-turn. Authorized dealer — full lineup available in Collins, MS.
          </p>
          <Link href="/catalog" className="btn-outline text-center text-sm py-2 block">
            Shop Ferris Mowers →
          </Link>
        </div>
      </div>

      {/* SEO block */}
      <div className="mt-12 border-t border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-white mb-3">Utility Trailers Near You — Collins, MS</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          Dykes Motors Power Equipment stocks utility trailers at 3069 Hwy 49 in Collins, Mississippi. We serve
          customers from Hattiesburg, Laurel, Brookhaven, Columbia, Magee, Mendenhall, Bassfield, Seminary, Sumrall,
          and across Covington County and the Pine Belt. Whether you&apos;re hauling a zero-turn mower, farm
          equipment, or building supplies, our single axle utility trailers are ready to work.
          Call <a href="tel:6016415475" className="text-[#C8C8C8] hover:underline">(601) 641-5475</a> or stop by.
        </p>
      </div>

    </div>
  );
}
