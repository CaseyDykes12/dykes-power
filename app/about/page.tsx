import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Dykes Motors Power Equipment — Collins, MS',
  description:
    'Family built. Family backed. Dykes Motors Power Equipment is the only authorized Ferris dealer between Jackson and the Gulf — selling, servicing, and standing behind every machine from our Collins, Mississippi shop.',
  alternates: { canonical: 'https://www.dykespower.com/about' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dykes Motors Power Equipment',
  url: 'https://www.dykespower.com',
  logo: 'https://www.dykespower.com/df-logo.png',
  description:
    'Authorized Ferris mower dealer in Collins, Mississippi. Family-owned and operated — sales, service, parts, and financing for commercial and residential mowers.',
  foundingDate: '2025-09',
  telephone: '+16019095380',
  email: 'info@dykesmotors.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3069 Hwy 49',
    addressLocality: 'Collins',
    addressRegion: 'MS',
    postalCode: '39428',
    addressCountry: 'US',
  },
  sameAs: ['https://www.facebook.com/DykesMotor'],
  parentOrganization: {
    '@type': 'AutoDealer',
    name: 'Dykes Motors',
    url: 'https://www.dykesmotors.com',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
    { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://www.dykespower.com/about' },
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-dykes-black min-h-screen text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-dykes-gray-700">
        <div className="absolute inset-0">
          <Image
            src="/images/ferris/lot/isx800-lot-3.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-30"
            priority
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-dykes-black" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 py-20 md:py-28">
          <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-3">
            About Dykes Motors Power Equipment
          </p>
          <h1
            className="text-4xl md:text-6xl font-black leading-[0.95] mb-5 text-white"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            Family Built.<br />
            <span className="text-dykes-gray-100">Family Backed.</span>
          </h1>
          <p className="text-dykes-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
            The only authorized Ferris dealer between Jackson and the Gulf. Sales, service, and parts —
            all under one roof on Highway 49 in Collins.
          </p>
        </div>
      </section>

      {/* The story */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20">
        <div className="border-l-2 border-ferris-yellow pl-5 mb-12">
          <p className="text-dykes-gray-300 text-lg md:text-xl leading-relaxed">
            Dykes Motors Power Equipment is a division of Dykes Motors — a family-owned
            business at 3069 Hwy 49 in Collins, Mississippi. We opened the power-equipment side
            in September 2025 to do one thing right: put commercial-grade Ferris mowers into the
            hands of the people who actually work for a living on them.
          </p>
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          Why we carry Ferris.
        </h2>
        <p className="text-dykes-gray-300 leading-relaxed mb-4">
          When we picked the line to stand behind, we chose Ferris. Ferris invented the
          suspension mower — independent shocks on all four corners — and nobody else comes
          close. When you spend 40 hours a week on a machine, that matters. That&apos;s why
          every commercial crew we sell to goes home on a Ferris.
        </p>
        <p className="text-dykes-gray-300 leading-relaxed mb-12">
          From the residential 300 Series to the commercial ISX 3300 and the all-electric 300e,
          Ferris builds mowers that last. We sell them. We service them. And we stand behind
          every one of them.
        </p>

        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          What we offer.
        </h2>
        <ul className="space-y-4 text-dykes-gray-300 mb-12">
          <li className="flex gap-3">
            <span className="text-dykes-silver font-bold shrink-0 mt-1">✓</span>
            <span>
              <span className="font-semibold text-white">Sales.</span>{' '}
              The full Ferris lineup — zero-turn, stand-on, and walk-behind mowers, plus utility
              trailers and accessories.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-dykes-silver font-bold shrink-0 mt-1">✓</span>
            <span>
              <span className="font-semibold text-white">Service &amp; repair.</span>{' '}
              Experienced techs who work on every brand, not just what we sell. Oil changes,
              blade sharpening, engine rebuilds, hydrostatic drive service, seasonal tune-ups.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-dykes-silver font-bold shrink-0 mt-1">✓</span>
            <span>
              <span className="font-semibold text-white">Genuine OEM parts.</span>{' '}
              Ferris and Briggs &amp; Stratton stocked in-house. What&apos;s not on the shelf, we
              get ordered fast.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-dykes-silver font-bold shrink-0 mt-1">✓</span>
            <span>
              <span className="font-semibold text-white">Local financing.</span>{' '}
              Top national lenders, competitive rates — as low as 4.9% APR for qualified credit —
              handled by folks who know you.
            </span>
          </li>
        </ul>

        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          Part of the Dykes Motors family.
        </h2>
        <p className="text-dykes-gray-300 leading-relaxed mb-12">
          Dykes Motors Power Equipment operates alongside{' '}
          <a
            href="https://www.dykesmotors.com"
            className="text-white underline hover:text-dykes-silver transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dykes Motors
          </a>
          , our used-vehicle dealership at the same location. Need a truck to pull your trailer
          and a mower to maintain the property? We&apos;ve got you covered under one roof.
        </p>

        {/* Authorized dealer badge + address */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-dykes-gray-900 border border-dykes-gray-700 rounded-xl p-6">
            <p className="text-dykes-silver text-xs font-bold tracking-widest uppercase mb-3">
              Authorized Ferris<sup className="text-[9px]">®</sup> Dealer
            </p>
            <p className="text-white font-semibold mb-1">Dykes Motors Power Equipment</p>
            <p className="text-dykes-gray-300 text-sm">
              Participating in the Feels Like a Ferris<sup className="text-[10px]">®</sup> national campaign.
            </p>
          </div>
          <div className="bg-dykes-gray-900 border-l-2 border-ferris-yellow rounded-xl p-6">
            <p className="text-white font-semibold mb-2">3069 Hwy 49, Collins, MS 39428</p>
            <p className="text-dykes-gray-300 text-sm">
              Sales:{' '}
              <a href="tel:6019095380" className="text-white hover:text-dykes-silver transition-colors">
                (601) 909-5380
              </a>
            </p>
            <p className="text-dykes-gray-300 text-sm">
              Service &amp; Parts:{' '}
              <a href="tel:6013362541" className="text-white hover:text-dykes-silver transition-colors">
                (601) 336-2541
              </a>
            </p>
            <p className="text-dykes-gray-300 text-sm mt-3">
              Mon–Fri 9–6 · Sat 9–2
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/catalog"
            className="bg-white text-dykes-black font-bold py-3 px-8 rounded-md hover:bg-dykes-gray-100 transition-colors text-center"
          >
            Browse Our Mowers
          </Link>
          <Link
            href="/contact"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-dykes-black transition-colors text-center"
          >
            Come See Us
          </Link>
        </div>
      </section>
    </div>
  );
}
