import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'Ferris Mowers Near Petal, MS | Dykes Motors Power Equipment',
  description:
    'Authorized Ferris mower dealer about 50 min north of Petal on Hwy 49 in Collins. Zero-turns, stand-ons, parts, service, financing. Call (601) 909-5380.',
  alternates: { canonical: 'https://www.dykespower.com/locations/petal' },
  openGraph: {
    title: 'Ferris Mowers Near Petal, MS | Dykes Motors Power Equipment',
    description:
      'Authorized Ferris mower dealer 50 min north of Petal on Hwy 49. Zero-turns, stand-ons, parts, service, financing.',
    url: 'https://www.dykespower.com/locations/petal',
    type: 'website',
  },
};

const geoSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  description:
    'Authorized Ferris mower dealer serving Petal, Hattiesburg, Oak Grove, and Forrest County. Located about 50 minutes north on Highway 49 in Collins, MS.',
  url: 'https://www.dykespower.com/locations/petal',
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
    { '@type': 'City', name: 'Petal' },
    { '@type': 'City', name: 'Hattiesburg' },
    { '@type': 'City', name: 'Oak Grove' },
    { '@type': 'City', name: 'Purvis' },
    { '@type': 'AdministrativeArea', name: 'Forrest County' },
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
      name: 'Ferris Mowers Near Petal, MS',
      item: 'https://www.dykespower.com/locations/petal',
    },
  ],
};

const PETAL_AREA = [
  { '@type': 'City', name: 'Petal', containedInPlace: { '@type': 'State', name: 'Mississippi' } },
  {
    '@type': 'City',
    name: 'Hattiesburg',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  {
    '@type': 'City',
    name: 'Oak Grove',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  {
    '@type': 'City',
    name: 'Purvis',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  { '@type': 'AdministrativeArea', name: 'Forrest County, Mississippi' },
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
    name: 'Ferris Mower Sales near Petal, MS',
    serviceType: 'Mower Sales',
    description:
      'New Ferris zero-turn, stand-on, and walk-behind mower sales for Petal and Forrest County. Free freight on qualifying units, financing as low as 4.9% APR for qualified credit.',
    provider: PROVIDER,
    areaServed: PETAL_AREA,
    url: 'https://www.dykespower.com/locations/petal',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris Mower Service & Repair near Petal, MS',
    serviceType: 'Mower Repair',
    description:
      'Authorized Ferris service center serving Petal, Hattiesburg, and Forrest County. Engine diagnostics, hydrostatic service, blade sharpening, seasonal tune-ups, warranty work.',
    provider: PROVIDER,
    areaServed: PETAL_AREA,
    url: 'https://www.dykespower.com/service',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris OEM Parts near Petal, MS',
    serviceType: 'Parts Sales',
    description:
      'Ferris OEM parts — blades, belts, filters, spindles, decks. Same-day shipping on stocked parts. Free shipping nationwide.',
    provider: PROVIDER,
    areaServed: PETAL_AREA,
    url: 'https://www.dykespower.com/parts',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mower Financing near Petal, MS',
    serviceType: 'Equipment Financing',
    description:
      'Mower financing for Petal-area buyers as low as 4.9% APR up to 84 months for qualified credit. Soft-pull pre-qualification with no credit impact.',
    provider: PROVIDER,
    areaServed: PETAL_AREA,
    url: 'https://www.dykespower.com/financing',
  },
];

export default function FerrisMowersPetalPage() {
  const featured = products.filter((p) => !p.canonicalSku && p.tag).slice(0, 3);

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
            Serving Petal &amp; Forrest County
          </p>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white mb-4">
            Ferris Mower Dealer Near Petal, Mississippi
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Dykes Motors Power Equipment is the closest authorized Ferris dealer to Petal — about
            50 minutes north on Highway 49 in Collins. If you&apos;re in Petal, Oak Grove, Purvis,
            or anywhere in Forrest County with ground to cut, it&apos;s worth the drive for a
            machine that holds up to Mississippi summers and has real dealer support behind it.
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
          <h2>Why Petal Customers Make the Drive to Collins</h2>
          <p>
            Petal sits right on the edge of the Hattiesburg metro — lots of large residential
            properties, established neighborhoods with real acreage, and a mix of landscaping crews
            working routes across Forrest County. Most equipment options nearby are big-box retail
            or residential-only brands. We&apos;re an authorized Ferris dealer, meaning we stock
            the full commercial lineup, we service what we sell, and we carry OEM parts on-site.
          </p>
          <p>
            Ferris is a working machine. The operators we see from Petal and the surrounding area
            aren&apos;t mowing a quarter-acre twice a month — they&apos;re running several acres
            every week through a Mississippi growing season that runs nine months. That&apos;s a
            different job than what a residential rider handles.
          </p>

          <h2>Who in Petal Buys from Us</h2>
          <p>
            Three groups from the Petal area come to us regularly:
          </p>
          <ul>
            <li>
              <strong>Large-property homeowners</strong> — properties in the 3–15-acre range around
              Petal, Old Highway 11, and the rural edges of Forrest County. They want a mower that
              finishes fast, rides well, and doesn&apos;t need to be babied. The{' '}
              <Link href="/product/5902101">Ferris 500S</Link> (starting at $6,499, 25 HP, 48–61&quot;
              deck) handles that job for years without drama.
            </li>
            <li>
              <strong>Commercial landscapers</strong> — crews working residential and commercial
              accounts across Hattiesburg and Petal. Stand-on mowers from our{' '}
              <Link href="/catalog">lineup</Link> are what most trailer-based crews are running —
              compact, fast, and trailer-friendly. The{' '}
              <Link href="/product/5902084">Ferris ISX 800</Link> (27 HP, ForeFront suspension,
              52–60&quot; deck, from $10,149) is a proven commercial platform that holds up to
              daily use.
            </li>
            <li>
              <strong>Poultry and farm operations</strong> — Forrest County has active broiler
              operations, and keeping biosecure pad edges and driveways mowed is part of the job.
              Consistent cut, reliable starts every time, and a mower that washes down easy matter
              more than most buyers realize until they&apos;re on their third residential unit.
            </li>
          </ul>

          <h2>What We Do for Petal Customers</h2>
          <p>
            Sales is straightforward — we stock Ferris, you come look at it, we talk through
            what fits your ground and your budget. No pressure, no runaround.
          </p>
          <p>
            <strong>Service:</strong> Our <Link href="/service">service shop</Link> handles full
            Ferris warranty work, tune-ups, blade sharpening, hydrostatic service, and engine
            diagnostics. Parts line: <strong>(601) 336-2541</strong>. Turnaround is measured in
            days, not weeks, which matters when you&apos;re in the middle of a mow season.
          </p>
          <p>
            <strong>Parts:</strong> We stock OEM Ferris parts — blades, belts, spindles, filters,
            deck components. Order online through our <Link href="/parts">parts page</Link> or call
            the shop. Free shipping on stocked parts.
          </p>
          <p>
            <strong>Financing:</strong> We work with{' '}
            <Link href="/financing">top national lenders</Link> — rates as low as 4.9% APR for
            qualified credit, terms up to 84 months. A full commercial machine can run under
            $300/month. Apply online and get a fast decision.
          </p>

          <h2>Drive Directions from Petal</h2>
          <p>
            From Petal, head north on US-11 until it merges with US-49, then continue north on
            Highway 49 through Seminary. You&apos;ll arrive in Collins in about 50 minutes —
            we&apos;re at <strong>3069 U.S. Hwy 49, Collins, MS 39428</strong>. Shop is on the
            right side of the highway as you come into Collins, same address as our used truck lot
            (Dykes Motors). Sales hours Mon–Fri 9–6, Sat 9–2.
          </p>
          <p>
            Prefer a direct route via Highway 49? From the Petal/Hattiesburg interchange, stay
            north on Hwy 49 the whole way — straight shot to Collins through Seminary, no turns
            needed.
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#0a0a0a] py-12 px-4 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Popular With Forrest County Customers
          </h2>
          <p className="text-gray-400 mb-8">
            A few Ferris models our Petal-area customers come in for most often.
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">50 Minutes Up Hwy 49</h2>
            <p className="text-gray-400 mb-6">
              Call ahead, come by the shop, or drop your info below. We&apos;ll help you find the
              right mower for your property without the runaround.
            </p>
            <a
              href="tel:6019095380"
              className="btn-primary text-center text-base px-8 py-3 inline-block"
            >
              Call (601) 909-5380
            </a>
          </div>
          <ProductLeadForm heading="Prefer we call you? Get a real quote from Collins." />
        </div>
      </section>
    </>
  );
}
