import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'Ferris Mower Dealer Near Magee, MS | Dykes Motors Power Equipment',
  description:
    'Authorized Ferris dealer about 25 min south of Magee on Hwy 49 in Collins. Zero-turns, stand-ons, OEM parts, service, financing. Call (601) 909-5380.',
  alternates: { canonical: 'https://www.dykespower.com/locations/magee' },
  openGraph: {
    title: 'Ferris Mower Dealer Near Magee, MS | Dykes Motors Power Equipment',
    description:
      'Authorized Ferris dealer 25 min south of Magee on Hwy 49. Zero-turns, stand-ons, parts, service, financing.',
    url: 'https://www.dykespower.com/locations/magee',
    type: 'website',
  },
};

const geoSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  description:
    'Authorized Ferris mower dealer serving Magee, Mendenhall, D\'Lo, and Simpson County. Located about 25 minutes south on Highway 49 in Collins, MS.',
  url: 'https://www.dykespower.com/locations/magee',
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
    { '@type': 'City', name: 'Magee' },
    { '@type': 'City', name: 'Mendenhall' },
    { '@type': 'City', name: 'D\'Lo' },
    { '@type': 'City', name: 'Silver Creek' },
    { '@type': 'AdministrativeArea', name: 'Simpson County' },
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
      name: 'Ferris Mower Dealer Near Magee, MS',
      item: 'https://www.dykespower.com/locations/magee',
    },
  ],
};

const MAGEE_AREA = [
  {
    '@type': 'City',
    name: 'Magee',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  {
    '@type': 'City',
    name: 'Mendenhall',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  {
    '@type': 'City',
    name: 'D\'Lo',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  {
    '@type': 'City',
    name: 'Silver Creek',
    containedInPlace: { '@type': 'State', name: 'Mississippi' },
  },
  { '@type': 'AdministrativeArea', name: 'Simpson County, Mississippi' },
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
    name: 'Ferris Mower Sales near Magee, MS',
    serviceType: 'Mower Sales',
    description:
      'New Ferris zero-turn, stand-on, and walk-behind mower sales for Magee, Mendenhall, and Simpson County. Free freight on qualifying units, financing as low as 4.9% APR for qualified credit.',
    provider: PROVIDER,
    areaServed: MAGEE_AREA,
    url: 'https://www.dykespower.com/locations/magee',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris Mower Service and Repair near Magee, MS',
    serviceType: 'Mower Repair',
    description:
      'Authorized Ferris service center serving Magee, Mendenhall, and Simpson County. Engine diagnostics, hydrostatic service, blade sharpening, seasonal tune-ups, warranty work.',
    provider: PROVIDER,
    areaServed: MAGEE_AREA,
    url: 'https://www.dykespower.com/service',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris OEM Parts near Magee, MS',
    serviceType: 'Parts Sales',
    description:
      'Ferris OEM parts — blades, belts, filters, spindles, decks. Same-day shipping on stocked parts. Free shipping nationwide.',
    provider: PROVIDER,
    areaServed: MAGEE_AREA,
    url: 'https://www.dykespower.com/parts',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mower Financing near Magee, MS',
    serviceType: 'Equipment Financing',
    description:
      'Mower financing for Magee-area buyers as low as 4.9% APR up to 84 months for qualified credit. Soft-pull pre-qualification with no credit impact.',
    provider: PROVIDER,
    areaServed: MAGEE_AREA,
    url: 'https://www.dykespower.com/financing',
  },
];

const FEATURED_SKUS = ['5902101', '5902154', '5902159'];

export default function FerrisMowersMageePage() {
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
            Serving Magee, Mendenhall &amp; Simpson County
          </p>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white mb-4">
            Ferris Mower Dealer Near Magee, Mississippi
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Dykes Motors Power Equipment is the closest authorized Ferris dealer to Magee — about
            25 minutes south on Highway 49 in Collins. If you&apos;re in Simpson County running a
            farm operation, keeping a large property, or managing a landscaping crew, we stock the
            full commercial Ferris lineup, service what we sell, and carry OEM parts on-site.
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
          <h2>Why Magee and Simpson County Buyers Come to Collins</h2>
          <p>
            Magee is close — 25 minutes down 49 and you&apos;re at the shop. That matters when
            you need to look a machine over before you buy, or when something needs to come in for
            service and you want to deal with a real dealer, not a call center.
          </p>
          <p>
            Simpson County runs a mix of cattle operations, row-crop ground, timber tracts, and
            working farms around Magee and Mendenhall. There are also larger residential properties
            in town and on the edges. The commercial mower market here is buyers who put serious
            hours on a machine — and they&apos;re done spending money on something that doesn&apos;t
            hold up. We carry commercial-grade Ferris equipment that&apos;s built for exactly that
            kind of use.
          </p>

          <h2>Who in Magee Buys from Us</h2>
          <ul>
            <li>
              <strong>Cattle and row-crop farmers</strong> — Simpson County has real working ground:
              fence rows, pasture edges, pond banks, and hay fields that need a dependable mower
              season after season. The{' '}
              <Link href="/product/5902159">Ferris ISX 2200</Link> (full independent suspension,
              29+ HP, 61–72&quot; iCD+ deck, from $12,699) handles rough terrain and long days
              without beating the operator up. When the farm is your livelihood, you need equipment
              that starts every time and holds up through a nine-month Mississippi mowing season.
            </li>
            <li>
              <strong>Large-property homeowners</strong> — Properties in the 3–10-acre range around
              Magee, D&apos;Lo, and the rural edges of Simpson County. The{' '}
              <Link href="/product/5902101">Ferris 500S</Link> (25 HP, 48–61&quot; deck, from
              $6,499) finishes those acres fast and sits comfortably without requiring commercial
              maintenance to keep running. A significant step up from the big-box machines, without
              going full commercial price.
            </li>
            <li>
              <strong>Commercial landscaping operations</strong> — Crews working accounts in Magee,
              Mendenhall, and the surrounding area. The{' '}
              <Link href="/product/5902154">Ferris ISX 800</Link> (27 HP, ForeFront suspension,
              52–60&quot; deck, from $10,149) is what most serious crews in South Mississippi are
              running. It&apos;s fast, comfortable to operate six days a week, and the independent
              suspension keeps operators productive through long days on uneven residential lots.
            </li>
          </ul>

          <h2>What We Do for Magee Customers</h2>
          <p>
            <strong>Sales:</strong> We stock the full Ferris commercial lineup — zero-turns,
            stand-ons, walk-behinds. Browse the{' '}
            <Link href="/catalog">full catalog</Link> online and come look at the actual machines
            before you buy. Call ahead if you want a specific model ready for a demo.
          </p>
          <p>
            <strong>Service:</strong> Our{' '}
            <Link href="/service">service shop</Link> handles authorized Ferris warranty work,
            tune-ups, blade sharpening, hydrostatic service, and engine diagnostics. Service line:{' '}
            <strong>(601) 336-2541</strong>. Turnaround is days, not weeks — which matters when
            the grass doesn&apos;t stop growing because your mower is in the shop.
          </p>
          <p>
            <strong>Parts:</strong> OEM Ferris parts on-site — blades, belts, spindles, filters,
            deck components. Order through the{' '}
            <Link href="/parts">parts page</Link> or call the shop. Free shipping on stocked parts.
          </p>
          <p>
            <strong>Financing:</strong> We work with{' '}
            <Link href="/financing">top national lenders</Link> — rates as low as 4.9% APR for
            qualified credit, terms up to 84 months. A commercial ISX 800 can run under $300/month
            at those terms. Apply online and get a fast decision.
          </p>

          <h2>Drive Directions from Magee</h2>
          <p>
            From Magee, take US-49 South. It&apos;s a straight shot — no turns needed. You&apos;ll
            pass through Silver Creek and arrive in Collins in about 25 minutes. We&apos;re at{' '}
            <strong>3069 U.S. Hwy 49, Collins, MS 39428</strong> — on the left side of the highway
            heading south into Collins, same address as Dykes Motors. Sales hours Mon–Fri 9–6,
            Sat 9–2.
          </p>
          <p>
            Coming from Mendenhall: head west on MS-28 to US-49, then south about 20 miles to
            Collins. About 30 minutes total.
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#0a0a0a] py-12 px-4 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Popular With Simpson County Customers
          </h2>
          <p className="text-gray-400 mb-8">
            Three Ferris models that cover the range — from large-property residential to working
            farm and full commercial operations.
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">25 Minutes Down Hwy 49</h2>
            <p className="text-gray-400 mb-6">
              Call ahead, come by the shop, or drop your info below. We&apos;ll talk through the
              right mower for your ground without the runaround.
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
