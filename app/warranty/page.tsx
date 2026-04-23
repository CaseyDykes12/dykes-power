import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ferris Warranty — 10-Year Suspension Coverage | Dykes Motors Power Equipment',
  description:
    'Ferris offers a 10-year suspension warranty on most of its commercial and premium residential lineup. See what is covered, which models qualify, and how warranty service works at our Collins, MS shop.',
  alternates: { canonical: 'https://www.dykespower.com/warranty' },
  openGraph: {
    title: 'Ferris Warranty — 10-Year Suspension Coverage',
    description:
      '10-year suspension warranty on qualifying Ferris mowers. Full-coverage structure explained, eligible models listed, and how we handle service locally in Collins, MS.',
    url: 'https://www.dykespower.com/warranty',
    type: 'website',
  },
};

const ELIGIBLE_MODELS = [
  { name: 'IS 600', blurb: 'Residential zero-turn, 48"/52" decks.' },
  { name: 'IS 700', blurb: 'Residential zero-turn, 52"/60" decks.' },
  { name: 'ISX 800', blurb: 'Commercial zero-turn, 52"/60" decks.' },
  { name: 'ISX 2200', blurb: 'Commercial zero-turn, 52"/60" decks.' },
  { name: 'ISX 3300', blurb: 'Heavy commercial zero-turn, 60"/72" decks.' },
  { name: 'IS 2600', blurb: 'Diesel zero-turn.' },
  { name: 'IS 6200', blurb: 'Kubota diesel zero-turn, 72" deck.' },
  { name: 'SRS Z1', blurb: 'Stand-on commercial.' },
  { name: 'SRS Z2', blurb: 'Stand-on commercial.' },
  { name: 'SRS Z3X', blurb: 'Stand-on commercial, 52"/60"/72".' },
  { name: 'ProCut S', blurb: 'Commercial zero-turn.' },
  { name: '300S', blurb: 'Residential zero-turn.' },
  { name: '500S', blurb: 'Residential zero-turn.' },
];

export default function WarrantyPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which Ferris mowers come with a 10-year suspension warranty?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'The 10-year suspension warranty is standard on IS 600, IS 700, ISX 800, ISX 2200, ISX 3300, IS 2600, IS 6200, SRS Z1, SRS Z2, SRS Z3X, ProCut S, 300S, and 500S series.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the Ferris limited warranty cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Ferris covers 3 years residential and 2 years commercial on the mower, with a 10-year suspension warranty on qualifying models. Engine coverage is handled by the engine manufacturer (Briggs, Kawasaki, Vanguard, or Kubota).',
        },
      },
      {
        '@type': 'Question',
        name: 'Where do I get warranty service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Warranty service is performed by certified technicians at Dykes Motors Power Equipment, 3069 Hwy 49, Collins, MS. Call (601) 336-2541 for service.',
        },
      },
    ],
  };

  return (
    <div className="bg-dykes-black min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="border-b border-gray-900 bg-gradient-to-b from-black to-dykes-black">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
          <p className="text-ferris-yellow text-sm font-bold tracking-widest uppercase mb-3">
            Ferris Warranty
          </p>
          <h1
            className="text-4xl md:text-6xl font-black leading-tight mb-5"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            10 Years on the Suspension.
            <br />
            <span className="text-dykes-gray-100">Backed by Dykes Motors.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Ferris is the only brand in our building that puts a 10-year warranty on its suspension system. That coverage is standard on most of the lineup we carry. If it needs warranty work, you bring it here. We handle it in Collins.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h2
          className="text-2xl md:text-4xl font-black mb-6"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          What the 10-year coverage is
        </h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            Ferris builds a real suspension into every qualifying mower. Coil-over shocks, independent travel, the patented geometry that started out on a NASCAR pit equipment build. That whole suspension system is covered for 10 years against defects in material and workmanship when you own the mower.
          </p>
          <p>
            This is not a gimmick warranty and it is not an extended service plan you pay extra for. It is standard on the series listed below.
          </p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] border-y border-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2
            className="text-2xl md:text-4xl font-black mb-6"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            Models with 10-year suspension coverage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ELIGIBLE_MODELS.map((m) => (
              <div
                key={m.name}
                className="rounded-lg border border-gray-800 bg-black/50 p-4"
              >
                <p className="font-bold text-white">{m.name}</p>
                <p className="text-sm text-gray-400 mt-1">{m.blurb}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            From the 2026 Ferris Product Catalog. Full terms and conditions on file at our dealership — stop by or call (601) 909-5380.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h2
          className="text-2xl md:text-4xl font-black mb-6"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          Full warranty structure
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-800 bg-black/50 p-5">
            <p className="text-ferris-yellow font-bold text-xs tracking-widest uppercase mb-2">
              Residential use
            </p>
            <p className="text-2xl font-black text-white mb-1">3 Years</p>
            <p className="text-sm text-gray-400">
              Full coverage on the mower itself (excluding engine).
            </p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-5">
            <p className="text-ferris-yellow font-bold text-xs tracking-widest uppercase mb-2">
              Commercial use
            </p>
            <p className="text-2xl font-black text-white mb-1">2 Years</p>
            <p className="text-sm text-gray-400">
              Full coverage on the mower itself (excluding engine).
            </p>
          </div>
          <div className="rounded-lg border border-ferris-yellow/60 bg-ferris-yellow/5 p-5">
            <p className="text-ferris-yellow font-bold text-xs tracking-widest uppercase mb-2">
              Suspension system
            </p>
            <p className="text-2xl font-black text-white mb-1">10 Years</p>
            <p className="text-sm text-gray-400">
              Covered on every qualifying model above.
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-5 leading-relaxed">
          Engine warranty is handled by the engine manufacturer (Briggs, Kawasaki, Vanguard, Kubota) and varies by engine. Consumables like belts, blades, filters, and tires are not covered. Damage from abuse, modification, or lack of maintenance is not covered.
        </p>
      </section>

      <section className="bg-[#0a0a0a] border-y border-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2
            className="text-2xl md:text-4xl font-black mb-6"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            How warranty service works here
          </h2>
          <ol className="space-y-4 text-gray-300">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ferris-yellow text-dykes-black font-bold flex items-center justify-center">
                1
              </span>
              <span>
                Call our service department at{' '}
                <a href="tel:6013362541" className="text-white underline">
                  (601) 336-2541
                </a>{' '}
                or stop by. Bring the mower in or schedule a pickup.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ferris-yellow text-dykes-black font-bold flex items-center justify-center">
                2
              </span>
              <span>
                Our certified Ferris techs inspect the unit, diagnose the issue, and file the warranty claim with Ferris on your behalf.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ferris-yellow text-dykes-black font-bold flex items-center justify-center">
                3
              </span>
              <span>
                Covered repairs are done at no cost to you. We coordinate parts directly with Ferris.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ferris-yellow text-dykes-black font-bold flex items-center justify-center">
                4
              </span>
              <span>
                You get a call when it is ready for pickup.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-14 md:py-20 text-center">
        <h2
          className="text-3xl md:text-5xl font-black mb-4"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          Questions on coverage?
        </h2>
        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          We will walk you through the warranty terms before you buy. Nothing hidden. Call, come by, or see the catalog.
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
            href="/catalog"
            className="border-2 border-ferris-yellow text-ferris-yellow font-semibold px-8 py-3 rounded-md hover:bg-ferris-yellow hover:text-dykes-black transition-colors"
          >
            Shop the Lineup
          </Link>
        </div>
      </section>
    </div>
  );
}
