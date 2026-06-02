import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'Ferris Mower Dealer Near Mendenhall, MS | Dykes Motors Power Equipment',
  description:
    'Authorized Ferris dealer about 35 min south of Mendenhall on Hwy 49 in Collins. Zero-turns, stand-ons, OEM parts, service, financing. Call (601) 641-5475.',
  alternates: { canonical: 'https://www.dykespower.com/locations/mendenhall' },
  openGraph: {
    title: 'Ferris Mower Dealer Near Mendenhall, MS | Dykes Motors Power Equipment',
    description:
      'Authorized Ferris dealer 35 min south of Mendenhall on Hwy 49. Zero-turns, stand-ons, parts, service, financing.',
    url: 'https://www.dykespower.com/locations/mendenhall',
    type: 'website',
  },
};

const geoSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  description:
    'Authorized Ferris mower dealer serving Mendenhall, D\'Lo, Harrisville, and Simpson County. Located about 35 minutes south on Highway 49 in Collins, MS.',
  url: 'https://www.dykespower.com/locations/mendenhall',
  telephone: '+16016415475',
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
    { '@type': 'City', name: 'Mendenhall' },
    { '@type': 'City', name: 'D\'Lo' },
    { '@type': 'City', name: 'Harrisville' },
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
      name: 'Ferris Mower Dealer Near Mendenhall, MS',
      item: 'https://www.dykespower.com/locations/mendenhall',
    },
  ],
};

const MENDENHALL_AREA = [
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
    name: 'Harrisville',
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
  telephone: '+16016415475',
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
    name: 'Ferris Mower Sales near Mendenhall, MS',
    serviceType: 'Mower Sales',
    description:
      'New Ferris zero-turn, stand-on, and walk-behind mower sales for Mendenhall, D\'Lo, Harrisville, and Simpson County. Free freight on qualifying units, financing as low as 4.9% APR for qualified credit.',
    provider: PROVIDER,
    areaServed: MENDENHALL_AREA,
    url: 'https://www.dykespower.com/locations/mendenhall',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris Mower Service and Repair near Mendenhall, MS',
    serviceType: 'Mower Repair',
    description:
      'Authorized Ferris service center serving Mendenhall, D\'Lo, and Simpson County. Engine diagnostics, hydrostatic service, blade sharpening, seasonal tune-ups, warranty work.',
    provider: PROVIDER,
    areaServed: MENDENHALL_AREA,
    url: 'https://www.dykespower.com/service',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ferris OEM Parts near Mendenhall, MS',
    serviceType: 'Parts Sales',
    description:
      'Ferris OEM parts — blades, belts, filters, spindles, decks. Same-day shipping on stocked parts. Free shipping nationwide.',
    provider: PROVIDER,
    areaServed: MENDENHALL_AREA,
    url: 'https://www.dykespower.com/parts',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Mower Financing near Mendenhall, MS',
    serviceType: 'Equipment Financing',
    description:
      'Mower financing for Mendenhall-area buyers as low as 4.9% APR up to 84 months for qualified credit. Soft-pull pre-qualification with no credit impact.',
    provider: PROVIDER,
    areaServed: MENDENHALL_AREA,
    url: 'https://www.dykespower.com/financing',
  },
];

const FEATURED_SKUS = ['5902101', '5902154', '5902159'];

export default function FerrisMowersMendenhallPage() {
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
            Serving Mendenhall, D&apos;Lo &amp; Simpson County
          </p>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white mb-4">
            Ferris Mower Dealer Near Mendenhall, Mississippi
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Dykes Motors Power Equipment is the closest authorized Ferris dealer to Mendenhall
            — about 35 minutes south on Highway 49 in Collins. If you&apos;re in Simpson County
            running a farm operation, managing a commercial crew, or keeping up a large property,
            we stock the full commercial Ferris lineup, service what we sell, and carry OEM parts
            on-site.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:6016415475"
              className="btn-primary text-center text-base px-6 py-3 inline-block"
            >
              Call (601) 641-5475
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
          <h2>Why Mendenhall and Simpson County Buyers Come to Collins</h2>
          <p>
            Mendenhall is the county seat of Simpson County — and it&apos;s a straight shot south
            on US-49 to Collins. About 35 minutes and you&apos;re at the shop. That close enough
            to come in, look at a machine before you commit, and get back in time for the afternoon
            field work.
          </p>
          <p>
            Simpson County runs a significant mix of row-crop operations, cattle ground, and timber
            tracts. The farms around Mendenhall, D&apos;Lo, and Harrisville are real working
            operations with fence lines, pond banks, and pasture edges that demand a machine built
            to hold up. We carry the commercial Ferris lineup precisely because these buyers are
            done replacing equipment every three years.
          </p>

          <h2>Who in Mendenhall Buys from Us</h2>
          <ul>
            <li>
              <strong>Row-crop and cattle farmers</strong> — Simpson County has serious working
              ground. Corn, soybeans, cattle operations, and the pasture edges and fence rows that
              come with them. The{' '}
              <Link href="/product/5902159">Ferris ISX 2200</Link> (full independent suspension,
              30.5 HP, 61&quot; iCD+ deck, from $12,699) handles rough terrain without wearing the
              operator down over a long day. When your farm is your livelihood, you need a mower
              that starts every time and holds up through Mississippi&apos;s nine-month mowing
              season.
            </li>
            <li>
              <strong>Large-property homeowners</strong> — Properties in the 3–10-acre range around
              Mendenhall, D&apos;Lo, and the rural edges of Simpson County. The{' '}
              <Link href="/product/5902101">Ferris 500S</Link> (25 HP, 48–61&quot; deck, from
              $6,499) gets those acres done fast and stays comfortable without requiring heavy
              commercial maintenance to keep running. A real step up from big-box equipment at a
              price that makes sense.
            </li>
            <li>
              <strong>Commercial landscaping operations</strong> — Crews running accounts across
              Mendenhall and the surrounding Simpson County area. The{' '}
              <Link href="/product/5902154">Ferris ISX 800</Link> (27 HP, ForeFront suspension,
              52–60&quot; deck, from $10,199) is what serious South Mississippi crews rely on. Fast,
              comfortable six days a week, and the independent suspension keeps operators productive
              across long days on uneven residential lots.
            </li>
          </ul>

          <h2>What We Do for Mendenhall Customers</h2>
          <p>
            <strong>Sales:</strong> We stock the full Ferris commercial lineup — zero-turns,
            stand-ons, walk-behinds. Browse the{' '}
            <Link href="/catalog">full catalog</Link> online and come look at the actual machines
            before you buy. Call ahead if you want a specific model pulled for a demo.
          </p>
          <p>
            <strong>Service:</strong> Our{' '}
            <Link href="/service">service shop</Link> handles authorized Ferris warranty work,
            tune-ups, blade sharpening, hydrostatic service, and engine diagnostics. Service line:{' '}
            <strong>(601) 336-2541</strong>. Turnaround is days, not weeks — which matters when the
            grass doesn&apos;t wait for your mower to come back from the shop.
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
            at those terms. Apply online and get a decision fast.
          </p>

          <h2>Drive Directions from Mendenhall</h2>
          <p>
            From Mendenhall, take US-49 South toward Magee. Continue through Magee and Silver Creek
            — it&apos;s a continuous run on 49 the whole way. You&apos;ll reach Collins in about
            35 minutes. We&apos;re at{' '}
            <strong>3069 U.S. Hwy 49, Collins, MS 39428</strong> — on the right side heading south
            into Collins, same address as Dykes Motors. Sales hours Mon–Fri 9–6, Sat 9–2.
          </p>
          <p>
            Coming from D&apos;Lo: head south on MS-149 to US-49, then take 49 South through Magee
            to Collins. About 40 minutes total.
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
            Three Ferris models covering the range — from large-property residential to working farm
            and full commercial operations.
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
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">35 Minutes Down Hwy 49</h2>
            <p className="text-gray-400 mb-6">
              Call ahead, come by the shop, or drop your info below. We&apos;ll talk through the
              right mower for your operation without the runaround.
            </p>
            <a
              href="tel:6016415475"
              className="btn-primary text-center text-base px-8 py-3 inline-block"
            >
              Call (601) 641-5475
            </a>
          </div>
          <ProductLeadForm />
        </div>
      </section>
    </>
  );
}
