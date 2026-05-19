import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'Ferris Mower Dealer Near Laurel, MS | Dykes Motors Power Equipment',
  description:
    'Authorized Ferris dealer about 40 min west of Laurel on US-84 in Collins. Zero-turns, stand-ons, OEM parts, service, financing. Call (601) 909-5380.',
  alternates: { canonical: 'https://www.dykespower.com/locations/laurel' },
  openGraph: {
    title: 'Ferris Mower Dealer Near Laurel, MS | Dykes Motors Power Equipment',
    description:
      'Authorized Ferris dealer 40 min west of Laurel on US-84. Zero-turns, stand-ons, parts, service, financing.',
    url: 'https://www.dykespower.com/locations/laurel',
    type: 'website',
  },
};

const geoSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  description:
    'Authorized Ferris mower dealer serving Laurel, Ellisville, Moselle, and Jones County. Located about 40 minutes west on US-84 in Collins, MS.',
  url: 'https://www.dykespower.com/locations/laurel',
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
    { '@type': 'City', name: 'Moselle' },
    { '@type': 'City', name: 'Ovett' },
    { '@type': 'AdministrativeArea', name: 'Jones County' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '14:00',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Ferris Mower Dealer Near Laurel, MS',
      item: 'https://www.dykespower.com/locations/laurel',
    },
  ],
};

const LAUREL_AREA = [
  {
    '@type': 'City',
    name: 'Laurel',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  {
    '@type': 'City',
    name: 'Ellisville',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  {
    '@type': 'City',
    name: 'Moselle',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  { '@type': 'AdministrativeArea', name: 'Jones County, Mississippi' },
];

const PROVIDER = {
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  url: 'https://www.dykespower.com',
  telephone: '+16019095380',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3069 Hwy 49',
    addressLocality: 'Collins',
    addressRegion: 'MS',
    postalCode: '39428',
    addressCountry: 'US',
  },
};

const serviceSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris Mower Sales near Laurel, MS',
    serviceType: 'Mower Sales',
    description:
      'New Ferris zero-turn, stand-on, and walk-behind mower sales for Laurel, Ellisville, Moselle, and Jones County. Free freight on qualifying units, financing as low as 4.9% APR for qualified credit.',
    provider: PROVIDER,
    areaServed: LAUREL_AREA,
    url: 'https://www.dykespower.com/locations/laurel',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris Mower Service and Repair near Laurel, MS',
    serviceType: 'Mower Repair',
    description:
      'Authorized Ferris service center serving Laurel and Jones County. Engine diagnostics, hydrostatic service, blade sharpening, seasonal tune-ups, warranty work.',
    provider: PROVIDER,
    areaServed: LAUREL_AREA,
    url: 'https://www.dykespower.com/service',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris OEM Parts near Laurel, MS',
    serviceType: 'Parts Sales',
    description:
      'Ferris OEM parts — blades, belts, filters, spindles, decks. Same-day shipping on stocked parts. Free shipping nationwide.',
    provider: PROVIDER,
    areaServed: LAUREL_AREA,
    url: 'https://www.dykespower.com/parts',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mower Financing near Laurel, MS',
    serviceType: 'Equipment Financing',
    description:
      'Mower financing for Laurel-area buyers as low as 4.9% APR up to 84 months for qualified credit. Soft-pull pre-qualification with no credit impact.',
    provider: PROVIDER,
    areaServed: LAUREL_AREA,
    url: 'https://www.dykespower.com/financing',
  },
];

const FEATURED_SKUS = ['5902154', '5901939', '5902101'];

export default function FerrisMowersLaurelPage() {
  const featured = products.filter((p) => FEATURED_SKUS.includes(p.sku));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(geoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {serviceSchemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* Hero */}
      <section className="bg-[#0a0a0a] text-white px-4 py-12 sm:py-16 border-b border-gray-800">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#C8C8C8] text-xs font-semibold uppercase tracking-widest mb-3">
            Serving Laurel, Ellisville &amp; Jones County
          </p>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white mb-4">
            Ferris Mower Dealer Near Laurel, Mississippi
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Dykes Motors Power Equipment is the authorized Ferris dealer closest to Laurel —
            about 40 minutes west on US-84 in Collins. Jones County runs everything from poultry
            houses to timber tracts to commercial landscaping routes, and the right mower looks
            different depending on what you&apos;re running. We stock the full commercial Ferris
            lineup, service what we sell, and carry OEM parts on-site.
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
        <div
          className="max-w-3xl mx-auto prose prose-invert prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-p:text-gray-300 prose-p:leading-relaxed
          prose-li:text-gray-300
          prose-strong:text-white
          prose-a:text-[#C8C8C8] prose-a:no-underline hover:prose-a:underline"
        >
          <h2>Why Laurel Operators Make the Run to Collins</h2>
          <p>
            Jones County has been commercial equipment country for decades — poultry integrators,
            timber operations, working farms, and a growing landscaping market in Laurel proper.
            Most local equipment dealers carry residential-grade mowers or generalist brands.
            If you need an authorized Ferris dealer with a full service shop and actual commercial
            inventory on the lot, Collins is the closest option at about 40 minutes down US-84.
          </p>
          <p>
            We&apos;re not just a sales counter. Our service shop handles warranty work,
            hydrostatic repairs, and seasonal maintenance. OEM Ferris parts ship same day on
            stocked items. When something breaks during a mowing cycle — whether that&apos;s
            a chicken house pad job or a landscaping route — you need turnaround in days, not weeks.
          </p>

          <h2>Who in Jones County Buys from Us</h2>
          <ul>
            <li>
              <strong>Poultry operations</strong> — Jones County has a significant concentration
              of broiler houses and breeder farms. Mowing pad edges, around tunnel inlets, and
              between houses requires a machine that&apos;s easy to maneuver and simple to wash
              down. The{' '}
              <Link href="/product/5901939">Ferris SRS Z1 stand-on</Link> (from $9,249
              with instant rebate, 52&quot; deck) is what a lot of chicken farm operators are
              moving to — faster on tight runs, easy to dismount, and takes a pressure wash
              without issue. Stand-ons also keep the operator&apos;s line of sight clear around
              tight pad corners.
            </li>
            <li>
              <strong>Commercial landscaping crews</strong> — Laurel has a real commercial
              landscaping market running residential and commercial routes. The{' '}
              <Link href="/product/5902154">Ferris ISX 800</Link> (from $10,449 with instant
              rebate, 52–60&quot; iCD+ deck, ForeFront suspension) is the workhorse for crews
              logging five-day weeks in Mississippi summer heat. Independent suspension reduces
              operator fatigue on long shifts, and the commercial Hydro-Gear ZT-5400 transaxles
              hold up to the hours.
            </li>
            <li>
              <strong>Timber and large-property owners</strong> — Shooting lanes, food plots,
              and rural acreage around the Jones County pine belt. Properties in the 5–25-acre
              range where a residential mower gave up after a season or two. The{' '}
              <Link href="/product/5902101">Ferris 500S</Link> (from $6,649, 48–61&quot; deck,
              25 HP Briggs commercial engine) handles that terrain and those hours without
              commercial-level maintenance overhead. It sits in the right price band for a
              working property that doesn&apos;t need fleet-grade equipment.
            </li>
          </ul>

          <h2>What We Do for Laurel Customers</h2>
          <p>
            <strong>Sales:</strong> Full Ferris commercial lineup in stock — zero-turns, stand-ons,
            walk-behinds. Browse the{' '}
            <Link href="/catalog">full catalog</Link> online or call ahead to confirm what&apos;s
            on the lot before you make the drive.
          </p>
          <p>
            <strong>Service:</strong> Authorized Ferris warranty work and repairs through our{' '}
            <Link href="/service">service shop</Link>. Engine diagnostics, hydrostatic service,
            blade sharpening, seasonal tune-ups. Service line: <strong>(601) 336-2541</strong>.
            Text Addison at the same number for faster turnaround on scheduling.
          </p>
          <p>
            <strong>Parts:</strong> OEM Ferris parts on-site — blades, belts, spindles, filters,
            deck components. Order through the{' '}
            <Link href="/parts">parts page</Link> or call us. Free shipping on stocked parts,
            same-day processing on most orders.
          </p>
          <p>
            <strong>Financing:</strong> We work with{' '}
            <Link href="/financing">top national lenders</Link> — rates as low as 4.9% APR for
            qualified credit, terms up to 84 months. A commercial ISX 800 at those terms runs
            under $300/month. Apply online, soft-pull pre-qualification, fast decision.
          </p>

          <h2>Drive Directions from Laurel</h2>
          <p>
            From Laurel, take US-84 West. Stay on 84 through Ellisville — it&apos;s a straight
            run west into Covington County. Collins is about 35 miles from Laurel, roughly 40
            minutes depending on traffic through Ellisville. We&apos;re at{' '}
            <strong>3069 U.S. Hwy 49, Collins, MS 39428</strong> — you&apos;ll need to turn
            north on US-49 for a short distance when 84 intersects. Look for the lot on the
            right, same property as Dykes Motors. Sales hours Mon–Fri 9–6, Sat 9–2.
          </p>
          <p>
            Coming from Moselle or Ovett: head west on US-84 into Ellisville, then continue
            west to Collins. Add about 10 minutes from Moselle.
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#0a0a0a] py-12 px-4 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Popular With Laurel-Area Customers
          </h2>
          <p className="text-gray-400 mb-8">
            Three Ferris models covering the range — from poultry-farm stand-ons to
            commercial zero-turns to large-property workhorses.
          </p>
          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          ) : null}
          <div className="mt-8 text-center">
            <Link href="/catalog" className="btn-primary text-base px-8 py-3 inline-block">
              Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* CTA + Quick Quote */}
      <section className="bg-black text-white py-12 px-4 border-t border-gray-800">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">40 Minutes West on US-84</h2>
            <p className="text-gray-400 mb-6">
              Call ahead, come by the shop, or drop your info below. We&apos;ll match you with
              the right Ferris for your operation — chicken farm, landscape crew, or big-acreage
              property.
            </p>
            <a
              href="tel:6019095380"
              className="btn-primary text-center text-base px-8 py-3 inline-block"
            >
              Call (601) 909-5380
            </a>
          </div>
          <ProductLeadForm />
        </div>
      </section>
    </>
  );
}
