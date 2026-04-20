import type { Metadata } from 'next';
import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ProductLeadForm from '@/components/ProductLeadForm';

export const metadata: Metadata = {
  title: 'Ferris Mowers Near Hattiesburg, MS | Dykes Motors',
  description:
    'Authorized Ferris mower dealer 45 min north of Hattiesburg on Hwy 49. Zero-turns, stand-ons, parts, service, financing. Call (601) 909-5380.',
  alternates: { canonical: 'https://www.dykespower.com/ferris-mowers-hattiesburg-ms' },
  openGraph: {
    title: 'Ferris Mowers Near Hattiesburg, MS | Dykes Motors',
    description:
      'Authorized Ferris mower dealer 45 min north of Hattiesburg on Hwy 49. Zero-turns, stand-ons, parts, service, financing.',
    url: 'https://www.dykespower.com/ferris-mowers-hattiesburg-ms',
    type: 'website',
  },
};

const geoSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dykes Motors Power Equipment',
  description: 'Authorized Ferris mower dealer serving Hattiesburg, Petal, Oak Grove, Purvis, and the Pine Belt region. Located 45 minutes north on Highway 49 in Collins, MS.',
  url: 'https://www.dykespower.com/ferris-mowers-hattiesburg-ms',
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
    { '@type': 'City', name: 'Petal' },
    { '@type': 'City', name: 'Oak Grove' },
    { '@type': 'City', name: 'Purvis' },
    { '@type': 'AdministrativeArea', name: 'Pine Belt Region' },
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
    { '@type': 'ListItem', position: 2, name: 'Ferris Mowers Near Hattiesburg, MS', item: 'https://www.dykespower.com/ferris-mowers-hattiesburg-ms' },
  ],
};

export default function FerrisMowersHattiesburgPage() {
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
            Serving Hattiesburg & the Pine Belt
          </p>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight text-white mb-4">
            Ferris Mowers Near Hattiesburg, Mississippi
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Dykes Motors Power Equipment is the closest authorized Ferris dealer to Hattiesburg —
            about 45 minutes north on Highway 49 in Collins. If you&apos;re in Petal, Oak Grove,
            Purvis, or anywhere around the Pine Belt, it&apos;s worth the drive for a mower that
            actually holds up to Mississippi summers.
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
          <h2>Why Hattiesburg Landscapers and Property Owners Drive Up Here</h2>
          <p>
            Hattiesburg has plenty of equipment stores, but there&apos;s a difference between a
            franchise big-box counter and an authorized dealer who actually knows the machines.
            We&apos;re a family-owned shop — we stock Ferris, we service Ferris, and we&apos;re not
            going to sell you the wrong mower for your property.
          </p>
          <p>
            Most of our Hattiesburg customers fall into three groups: landscape crews running
            commercial routes, property owners mowing 3–15 acres at home, and small farms keeping
            pastures and fence lines cut. The Ferris lineup covers all three, and we can walk you
            through the right model based on the ground you&apos;re actually cutting.
          </p>

          <h2>The Ferris Models Hattiesburg Customers Buy Most</h2>
          <p>
            If you&apos;re cutting your own property, the <Link href="/catalog">Ferris 500S</Link>{' '}
            is usually the right starting point — 23.5 HP, 52&quot; or 61&quot; deck, enough
            machine to mow several acres fast without being overkill. It&apos;s the one we sell
            most to homeowners with bigger yards.
          </p>
          <p>
            For commercial crews or property owners with rough terrain, the{' '}
            <Link href="/catalog">ISX2200</Link> is the step up. Ferris invented the independent
            suspension mower, and the ISX2200 has the full system — which makes a real difference
            if you&apos;re on uneven ground or running eight-hour days. Less operator fatigue,
            cleaner cut at speed.
          </p>
          <p>
            Commercial zero-turns and stand-ons live in our{' '}
            <Link href="/catalog?category=Stand-On+Mowers">stand-on section</Link> — those are
            what most Hattiesburg landscape companies are running on their trailers now.
          </p>

          <h2>Service and Parts — Without a Half-Day Wait</h2>
          <p>
            One thing Hattiesburg customers keep mentioning: if something breaks in July, they
            don&apos;t want to hand their mower off for two weeks. Our{' '}
            <Link href="/service">service shop</Link> handles Ferris warranty work, tune-ups,
            blade sharpening, hydro service, and engine diagnostics — usually with a turnaround
            measured in days, not weeks. Parts phone: <strong>(601) 336-2541</strong>.
          </p>

          <h2>Financing That Works</h2>
          <p>
            A commercial Ferris usually runs $8K–$16K depending on the model. We work with{' '}
            <Link href="/financing">top national lenders</Link> for competitive rates — often
            under $300/month on a full commercial machine. Apply online, get a decision fast, and
            we&apos;ll hold the mower until you&apos;re ready to pick up.
          </p>

          <h2>Getting Here from Hattiesburg</h2>
          <p>
            We&apos;re at <strong>3069 U.S. Hwy 49, Collins, MS 39428</strong>. Head north on Hwy
            49 — you&apos;ll drive straight through Seminary and into Collins, about 45 minutes
            from the Hattiesburg city limits. Our shop is on the right as you come into town,
            same address as Dykes Motors (our used truck lot). Sales hours Mon–Fri 9–6, Sat 9–2.
          </p>

          <h2>Want to See One in Person?</h2>
          <p>
            We&apos;d rather you come touch the machine before you buy. Sit on a demo unit, look
            at the deck build, check the suspension travel — it&apos;s the kind of thing photos
            on a listing can&apos;t replace. Call ahead if you want a specific model pulled out
            and ready when you get here.
          </p>

          <p>
            Related reading:{' '}
            <Link href="/blog/ferris-mower-dealer-near-hattiesburg">
              What to know before you drive up here from Hattiesburg
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#0a0a0a] py-12 px-4 border-t border-gray-800">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Popular With Pine Belt Customers</h2>
          <p className="text-gray-400 mb-8">
            A few of the Ferris models our Hattiesburg-area customers buy most often.
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

      {/* CTA + Quick Quote */}
      <section className="bg-black text-white py-12 px-4 border-t border-gray-800">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Drive Up or Call — Your Choice</h2>
            <p className="text-gray-400 mb-6">
              We&apos;ll talk you through the right mower for your property without runaround. Call
              now, come see us at 3069 Hwy 49 in Collins, or drop your info below and we&apos;ll
              call you back fast.
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
