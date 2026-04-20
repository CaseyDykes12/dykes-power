import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Ferris Mowers Near Laurel, MS | Dykes Motors',
  description:
    'Authorized Ferris mower dealer 20 min north of Laurel on Hwy 49. Zero-turns, stand-ons, parts, service, financing. Call (601) 909-5380.',
  alternates: { canonical: 'https://www.dykespower.com/ferris-mowers-laurel-ms' },
  openGraph: {
    title: 'Ferris Mowers Near Laurel, MS | Dykes Motors',
    description:
      'Authorized Ferris mower dealer 20 min north of Laurel on Hwy 49. Zero-turns, stand-ons, parts, service, financing.',
    url: 'https://www.dykespower.com/ferris-mowers-laurel-ms',
    type: 'website',
  },
};

const geoSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  description: 'Authorized Ferris mower dealer serving Laurel, Ellisville, and Jones County. Located 20 minutes north on Highway 49 in Collins, MS.',
  url: 'https://www.dykespower.com/ferris-mowers-laurel-ms',
  telephone: '+16019095380',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3069 Hwy 49',
    addressLocality: 'Collins',
    addressRegion: 'MS',
    postalCode: '39428',
    addressCountry: 'US',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 31.6454, longitude: -89.5548 },
  areaServed: [
    { '@type': 'City', name: 'Laurel' },
    { '@type': 'City', name: 'Ellisville' },
    { '@type': 'AdministrativeArea', name: 'Jones County' },
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
    { '@type': 'ListItem', position: 2, name: 'Ferris Mowers Near Laurel, MS', item: 'https://www.dykespower.com/ferris-mowers-laurel-ms' },
  ],
};

export default function FerrisMowersLaurelPage() {
  const featured = products
    .filter((p) => p.tag === 'Best Seller' || p.tag === 'Popular')
    .slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(geoSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white px-4 py-12 sm:py-16 border-b border-gray-800">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C8C8C8] text-xs font-semibold uppercase tracking-widest mb-3">
            Serving Laurel & Jones County
          </p>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white mb-4">
            Ferris Mowers Near Laurel, Mississippi
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Dykes Motors Power Equipment is about 20 minutes north of Laurel on Highway 49 — the
            closest authorized Ferris dealer. If you&apos;re mowing a working property in Jones
            County or running a commercial crew out of Laurel or Ellisville, we&apos;re a quick
            drive with the full Ferris lineup and service in-house.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:6019095380"
              className="btn-primary text-center text-base px-6 py-3 inline-block"
            >
              Call (601) 909-5380
            </a>
            <Link
              href="/catalog"
              className="btn-outline text-center text-base px-6 py-3 inline-block"
            >
              Browse the Lineup
            </Link>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-[#111] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-li:text-gray-300
          prose-strong:text-white
          prose-a:text-[#C8C8C8] prose-a:no-underline hover:prose-a:underline">
          <h2>Laurel Customers — You Don&apos;t Have to Settle for Whatever&apos;s on a Big-Box Lot</h2>
          <p>
            Laurel&apos;s got options, but most of them mean rack-and-stack lineups that aren&apos;t
            built for the hours or terrain real mowers around here are running. Ferris is a
            commercial-grade brand, and we&apos;re an authorized dealer — meaning we actually
            stock, service, and warranty these machines, not just write them up.
          </p>
          <p>
            Most of our Laurel-area customers are running larger properties — pastures, long
            driveways, commercial lots. A 42-inch residential rider gets eaten up on that kind
            of ground in a season or two. A commercial Ferris keeps going for 2,000+ hours with
            basic maintenance.
          </p>

          <h2>Best Ferris Picks for Jones County Terrain</h2>
          <p>
            Jones County has a lot of rolling ground, mixed pasture, and properties with fence
            lines to mow. A few models match that well:
          </p>
          <p>
            The <Link href="/catalog">Ferris 500S</Link> is the sweet spot for 3–8 acres. Enough
            power to handle thick Bermuda or fescue, big enough deck to finish in a reasonable
            time, not so big you can&apos;t maneuver around posts and trees.
          </p>
          <p>
            For farms, commercial crews, or anything 10+ acres, the{' '}
            <Link href="/catalog">ISX2200</Link> is the one. Independent suspension takes the
            beating out of uneven ground — your body will notice the difference after 4 hours.
            We&apos;ve got customers running these on cattle operations and hay fields across
            Jones and Covington Counties.
          </p>
          <p>
            The full commercial stand-on lineup is in our{' '}
            <Link href="/catalog?category=Stand-On+Mowers">stand-on section</Link> — compact
            footprint, trailer-friendly, common choice for landscape companies on tight Laurel
            residential routes.
          </p>

          <h2>Local Service — Not a Ship-It-Out-of-State Operation</h2>
          <p>
            Our <Link href="/service">service shop</Link> is on-site. Full Ferris warranty work,
            tune-ups, belt and spindle replacement, hydraulic service, engine diagnostics.
            Parts phone: <strong>(601) 336-2541</strong>. Most repairs turn around in days, not
            weeks.
          </p>

          <h2>Financing for Qualified Buyers</h2>
          <p>
            We work with <Link href="/financing">top national lenders</Link> on the Ferris
            lineup — competitive rates, quick decisions, apply online. Monthly payments on most
            commercial models run under $300. We&apos;ll walk you through what&apos;s realistic
            for what you&apos;re trying to mow.
          </p>

          <h2>How to Get Here From Laurel</h2>
          <p>
            We&apos;re at <strong>3069 U.S. Hwy 49, Collins, MS 39428</strong> — head north on
            Hwy 49 from Laurel, about 20 minutes straight through. Shop is on the right as you
            come into Collins. Same address as our used truck lot (Dykes Motors). Sales Mon–Fri
            9–6, Sat 9–2.
          </p>

          <p>
            Related reading:{' '}
            <Link href="/blog/ferris-mower-dealer-near-laurel">
              What Laurel-area customers ask before they drive up
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#0a0a0a] py-12 px-4 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Popular With Jones County Customers</h2>
          <p className="text-gray-400 mb-8">
            A few of the Ferris models our Laurel-area customers come in for most often.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/catalog" className="btn-primary text-base px-8 py-3 inline-block">
              Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-12 px-4 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">20 Minutes Up Hwy 49</h2>
          <p className="text-gray-400 mb-6">
            Give us a call or come by. We&apos;ll help you figure out the right mower for your
            ground — no pressure, no runaround.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:6019095380"
              className="btn-primary text-center text-base px-8 py-3 inline-block"
            >
              Call (601) 909-5380
            </a>
            <Link
              href="/contact"
              className="btn-outline text-center text-base px-8 py-3 inline-block"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
