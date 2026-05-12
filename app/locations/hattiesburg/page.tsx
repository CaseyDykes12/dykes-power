import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'Ferris Mower Dealer Near Hattiesburg, MS | Dykes Motors Power Equipment',
  description:
    'Authorized Ferris dealer 45 min north of Hattiesburg on Hwy 49 in Collins. Zero-turns, stand-ons, OEM parts, service, financing. Call (601) 909-5380.',
  alternates: { canonical: 'https://www.dykespower.com/locations/hattiesburg' },
  openGraph: {
    title: 'Ferris Mower Dealer Near Hattiesburg, MS | Dykes Motors Power Equipment',
    description:
      'Authorized Ferris dealer 45 min north of Hattiesburg on Hwy 49. Zero-turns, stand-ons, parts, service, financing.',
    url: 'https://www.dykespower.com/locations/hattiesburg',
    type: 'website',
  },
};

const geoSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  description:
    'Authorized Ferris mower dealer serving Hattiesburg, Oak Grove, Sumrall, Purvis, and Forrest and Lamar counties. Located 45 minutes north on Highway 49 in Collins, MS.',
  url: 'https://www.dykespower.com/locations/hattiesburg',
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
    { '@type': 'City', name: 'Hattiesburg' },
    { '@type': 'City', name: 'Oak Grove' },
    { '@type': 'City', name: 'Sumrall' },
    { '@type': 'City', name: 'Purvis' },
    { '@type': 'City', name: 'Petal' },
    { '@type': 'AdministrativeArea', name: 'Forrest County' },
    { '@type': 'AdministrativeArea', name: 'Lamar County' },
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
      name: 'Ferris Mower Dealer Near Hattiesburg, MS',
      item: 'https://www.dykespower.com/locations/hattiesburg',
    },
  ],
};

const HATTIESBURG_AREA = [
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
    name: 'Sumrall',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  {
    '@type': 'City',
    name: 'Purvis',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  { '@type': 'AdministrativeArea', name: 'Forrest County, Mississippi' },
  { '@type': 'AdministrativeArea', name: 'Lamar County, Mississippi' },
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
    name: 'Ferris Mower Sales near Hattiesburg, MS',
    serviceType: 'Mower Sales',
    description:
      'New Ferris zero-turn, stand-on, and walk-behind mower sales for Hattiesburg, Oak Grove, Sumrall, and Lamar County. Free freight on qualifying units, financing as low as 4.9% APR for qualified credit.',
    provider: PROVIDER,
    areaServed: HATTIESBURG_AREA,
    url: 'https://www.dykespower.com/locations/hattiesburg',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris Mower Service and Repair near Hattiesburg, MS',
    serviceType: 'Mower Repair',
    description:
      'Authorized Ferris service center serving Hattiesburg and Forrest/Lamar counties. Engine diagnostics, hydrostatic service, blade sharpening, seasonal tune-ups, warranty work.',
    provider: PROVIDER,
    areaServed: HATTIESBURG_AREA,
    url: 'https://www.dykespower.com/service',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris OEM Parts near Hattiesburg, MS',
    serviceType: 'Parts Sales',
    description:
      'Ferris OEM parts — blades, belts, filters, spindles, decks. Same-day shipping on stocked parts. Free shipping nationwide.',
    provider: PROVIDER,
    areaServed: HATTIESBURG_AREA,
    url: 'https://www.dykespower.com/parts',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mower Financing near Hattiesburg, MS',
    serviceType: 'Equipment Financing',
    description:
      'Mower financing for Hattiesburg-area buyers as low as 4.9% APR up to 84 months for qualified credit. Soft-pull pre-qualification with no credit impact.',
    provider: PROVIDER,
    areaServed: HATTIESBURG_AREA,
    url: 'https://www.dykespower.com/financing',
  },
];

const FEATURED_SKUS = ['5902101', '5902084', '5902159'];

export default function FerrisMowersHattiesburgPage() {
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
            Serving Hattiesburg, Oak Grove &amp; Forrest County
          </p>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white mb-4">
            Ferris Mower Dealer Near Hattiesburg, Mississippi
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Dykes Motors Power Equipment is the closest authorized Ferris dealer to Hattiesburg —
            about 45 minutes north on Highway 49 in Collins. If you&apos;re running a landscape
            crew, mowing a big property in Oak Grove, or keeping a farm operation in Lamar County,
            we stock the full commercial Ferris lineup, service what we sell, and carry OEM parts
            on-site.
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
          <h2>Why Hattiesburg Operators Make the Drive to Collins</h2>
          <p>
            Hattiesburg is South Mississippi&apos;s biggest equipment market. There are plenty of
            places to buy a mower in the metro — but most of them stop at residential-grade
            machines. Commercial operators and serious property owners need an authorized dealer who
            stocks real commercial inventory, has a service shop behind it, and carries OEM parts on
            the shelf. That&apos;s us, 45 minutes up the road.
          </p>
          <p>
            Forrest and Lamar counties have a mix that means something to us: commercial
            landscapers running dense residential and commercial routes, large-property homeowners
            in the Oak Grove and Sumrall corridors, and working farms around the edges of the metro.
            Different needs, different machines — we can talk through which Ferris fits your
            situation without pushing you toward whatever is sitting in the corner.
          </p>

          <h2>Who in the Hattiesburg Area Buys from Us</h2>
          <ul>
            <li>
              <strong>Commercial landscaping crews</strong> — Companies working routes in Hattiesburg,
              Oak Grove, and the US-98 corridor need mowers that hold up to five- and six-day weeks
              in Mississippi heat. The{' '}
              <Link href="/product/5902084">Ferris ISX 800</Link> (27 HP, ForeFront
              suspension, 52–60&quot; iCD+ deck, from $10,149) is what most serious operations are
              running. Downtime is money — the ISX 800&apos;s independent suspension and
              commercial hydrostatics reduce both operator fatigue and service calls.
            </li>
            <li>
              <strong>Large-property homeowners</strong> — Properties in the 3–15-acre range in Oak
              Grove, the rural edges of Lamar County, and north Forrest County. The{' '}
              <Link href="/product/5902101">Ferris 500S</Link> (25 HP, 48–61&quot; deck, from
              $6,499) handles those acres efficiently without being more machine than you need. It
              finishes fast, sits comfortably, and doesn&apos;t require commercial-level
              maintenance to keep running.
            </li>
            <li>
              <strong>Farm and timber operations</strong> — Pastures, fence rows, food plots, and
              pond banks around Forrest and Lamar counties need a mower built to handle uneven
              terrain and long days. The{' '}
              <Link href="/product/5902159">Ferris ISX 2200</Link> (full independent suspension,
              29+ HP, 61–72&quot; deck, from $12,699) is what operators running rough ground
              tend to end up on after they get tired of beating themselves up on a flat-deck
              machine.
            </li>
          </ul>

          <h2>What We Do for Hattiesburg Customers</h2>
          <p>
            <strong>Sales:</strong> We stock the full Ferris commercial lineup — zero-turns,
            stand-ons, walk-behinds. Browse the{' '}
            <Link href="/catalog">full catalog</Link> online, then come look at the actual machines
            before you buy. Call ahead if you want a specific model pulled out for a demo.
          </p>
          <p>
            <strong>Service:</strong> Our{' '}
            <Link href="/service">service shop</Link> handles authorized Ferris warranty work,
            tune-ups, blade sharpening, hydrostatic service, and engine diagnostics. Service line:{' '}
            <strong>(601) 336-2541</strong>. Turnaround is days, not weeks.
          </p>
          <p>
            <strong>Parts:</strong> OEM Ferris parts on-site — blades, belts, spindles, filters,
            deck components. Order through the{' '}
            <Link href="/parts">parts page</Link> or call us. Free shipping on stocked parts.
          </p>
          <p>
            <strong>Financing:</strong> We work with{' '}
            <Link href="/financing">top national lenders</Link> — rates as low as 4.9% APR for
            qualified credit, terms up to 84 months. A commercial ISX 800 can run under
            $300/month at those terms. Apply online and get a fast decision.
          </p>

          <h2>Drive Directions from Hattiesburg</h2>
          <p>
            From Hattiesburg, take US-49 North. Stay on 49 through Sumrall and Seminary — no
            turns, straight shot. You&apos;ll arrive in Collins in about 45 minutes from the
            Hattiesburg city limits. We&apos;re at{' '}
            <strong>3069 U.S. Hwy 49, Collins, MS 39428</strong> — on the right side of the
            highway coming into town, same address as Dykes Motors. Sales hours Mon–Fri 9–6,
            Sat 9–2.
          </p>
          <p>
            Coming from Oak Grove (Lamar County): head east on US-98 to Hwy 49, then north to
            Collins. About 50 minutes from Oak Grove.
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#0a0a0a] py-12 px-4 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Popular With Hattiesburg-Area Customers
          </h2>
          <p className="text-gray-400 mb-8">
            Three Ferris models that cover the range — from large-property residential to
            full commercial operations.
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">45 Minutes Up Hwy 49</h2>
            <p className="text-gray-400 mb-6">
              Call ahead, come by the shop, or drop your info below. We&apos;ll talk through
              the right mower for your operation without the runaround.
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
