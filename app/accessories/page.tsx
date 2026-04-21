import type { Metadata } from 'next';
import Link from 'next/link';
import { COLLECTION_SYSTEMS, ACCESSORIES } from '@/lib/accessories';
import AccessoryCard from '@/components/AccessoryCard';

export const metadata: Metadata = {
  title: 'Ferris Accessories and Add-Ons | Dykes Motors Power Equipment',
  description:
    'Ferris collection systems, mulch kits, light kits, striping kits, Sulkies, and more. Compatibility matrix for the full Ferris lineup, available at our Collins, MS shop.',
  alternates: { canonical: 'https://www.dykespower.com/accessories' },
  openGraph: {
    title: 'Ferris Accessories and Add-Ons',
    description:
      'Collection systems, striping kits, light kits, Sulkies, and more — all compatible with the Ferris lineup we carry.',
    url: 'https://www.dykespower.com/accessories',
    type: 'website',
  },
};

export default function AccessoriesPage() {
  return (
    <div className="bg-dykes-black min-h-screen text-white">
      <section className="border-b border-gray-900 bg-gradient-to-b from-black to-dykes-black">
        <div className="max-w-5xl mx-auto px-4 py-14 md:py-20">
          <p className="text-ferris-yellow text-sm font-bold tracking-widest uppercase mb-3">
            Ferris Accessories
          </p>
          <h1
            className="text-4xl md:text-6xl font-black leading-tight mb-5"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            Accessories and add-ons.
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Collection systems, striping kits, light kits, Sulkies, and the small parts that turn a
            mower into a setup. All compatible with the Ferris lineup we carry. Call the shop if
            you are not sure what fits.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        <h2
          className="text-2xl md:text-4xl font-black mb-6"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          Collection systems
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl">
          Powered Turbo-Pro pickups for the deck plus bagging options that range from twin-bag soft
          tops to dump-from-seat units for the bigger commercial machines.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COLLECTION_SYSTEMS.map((item) => (
            <AccessoryCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-[#0a0a0a] border-y border-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <h2
            className="text-2xl md:text-4xl font-black mb-6"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            Accessories
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl">
            Mulch kits, light kits, striping kits, hitches, fenders, Sulkies, and Michelin Tweel
            airless tires. Compatibility lives on every card.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACCESSORIES.map((item) => (
              <AccessoryCard key={item.id} item={item} />
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-6">
            Compatibility data from the Ferris 2026 Product Catalog, pages 26 and 27.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-14 md:py-20 text-center">
        <h2
          className="text-3xl md:text-5xl font-black mb-4"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          Not sure what fits your mower?
        </h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Call us at <a href="tel:6019095380" className="text-white underline">(601) 909-5380</a>{' '}
          or stop by the shop in Collins. We will pull the parts book and tell you exactly what
          works on your machine.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="tel:6019095380"
            className="bg-white text-dykes-black font-bold px-8 py-3 rounded-md hover:bg-dykes-gray-100 transition-colors"
          >
            Call (601) 909-5380
          </a>
          <Link
            href="/contact"
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-dykes-black transition-colors"
          >
            Message the Shop
          </Link>
          <Link
            href="/parts"
            className="border-2 border-ferris-yellow text-ferris-yellow font-semibold px-8 py-3 rounded-md hover:bg-ferris-yellow hover:text-dykes-black transition-colors"
          >
            Shop Parts
          </Link>
        </div>
      </section>
    </div>
  );
}
