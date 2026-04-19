import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | Dykes Motors Power Equipment — Collins, MS',
  description:
    'Dykes Motors Power Equipment is an authorized Ferris mower dealer in Collins, Mississippi. Family-owned and operated — sales, service, parts, and financing for commercial and residential mowers.',
  alternates: { canonical: 'https://www.dykespower.com/about' },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dykes Motors Power Equipment',
  url: 'https://www.dykespower.com',
  logo: 'https://www.dykespower.com/df-logo.png',
  description: 'Authorized Ferris mower dealer in Collins, Mississippi. Family-owned and operated — sales, service, parts, and financing for commercial and residential mowers.',
  foundingDate: '2025-09',
  telephone: '+16016415475',
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
    <div className="bg-[#0f0f0f] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2 text-white">About Dykes Motors Power Equipment</h1>
        <p className="text-gray-400 mb-10">Authorized Ferris Dealer — Collins, Mississippi</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-white">Who We Are</h2>
          <p className="text-gray-300 mb-4">
            Dykes Motors Power Equipment is a division of Dykes Motors, a family-owned and operated
            business located at 3069 Hwy 49 in Collins, Mississippi. We are an authorized Ferris
            mower dealer, proudly serving homeowners, commercial landscapers, and municipalities
            across South Mississippi and beyond.
          </p>
          <p className="text-gray-300 mb-4">
            We opened our doors in September 2025 with a straightforward mission: give our customers
            access to the best commercial-grade mowers on the market, backed by honest service and
            real expertise. Every machine we sell is one we stand behind — from the first demo cut to
            years of reliable use.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-white">Why Ferris</h2>
          <p className="text-gray-300 mb-4">
            We chose to partner with Ferris because their machines are built for the people who
            depend on them every day. Ferris is known for their patented suspension technology,
            which reduces operator fatigue and delivers a superior cut — even at high speeds and
            on rough terrain. From the residential 300 Series to the commercial ISX 3300 and
            the all-electric 300e, Ferris builds mowers that last.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-white">What We Offer</h2>
          <ul className="space-y-3 text-gray-300">
            <li>
              <span className="font-semibold text-white">Sales:</span> Full lineup of Ferris
              zero-turn, stand-on, and walk-behind mowers, plus utility trailers and accessories.
            </li>
            <li>
              <span className="font-semibold text-white">Service & Repairs:</span> Factory-trained
              technicians who service every brand, not just what we sell. Oil changes, blade
              sharpening, engine rebuilds, hydrostatic drive service, and seasonal tune-ups.
            </li>
            <li>
              <span className="font-semibold text-white">Genuine OEM Parts:</span> We stock Ferris
              and Briggs & Stratton parts in-house. If we don't have it, we'll get it ordered fast.
            </li>
            <li>
              <span className="font-semibold text-white">Financing:</span> We work with top national
              lenders to offer competitive rates — including promotional financing on qualifying
              Ferris models. Rates as low as 4.9% APR for qualified credit.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-white">Our Location</h2>
          <p className="text-gray-300 mb-4">
            We're located on Highway 49 in Collins, Mississippi — easy to find whether you're
            coming from Hattiesburg, Laurel, Mendenhall, or anywhere in the Pine Belt region.
            Walk the lot, sit on the machines, and talk to someone who actually knows the product.
          </p>
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 space-y-2">
            <p className="text-white font-semibold">3069 Hwy 49, Collins, MS 39428</p>
            <p className="text-gray-400 text-sm">Sales: <a href="tel:6016415475" className="text-[#C8C8C8] hover:text-white">(601) 641-5475</a></p>
            <p className="text-gray-400 text-sm">Service & Parts: <a href="tel:6013362541" className="text-[#C8C8C8] hover:text-white">(601) 336-2541</a></p>
            <p className="text-gray-400 text-sm">Email: <a href="mailto:info@dykesmotors.com" className="text-[#C8C8C8] hover:text-white">info@dykesmotors.com</a></p>
            <div className="pt-2 border-t border-gray-700 mt-3 grid grid-cols-2 gap-2 text-sm text-gray-400">
              <div>
                <p className="text-white font-semibold mb-1">Sales Hours</p>
                <p>Mon-Fri: 9am - 6pm</p>
                <p>Sat: 9am - 2pm</p>
                <p>Sun: Closed</p>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Service Hours</p>
                <p>Mon-Fri: 9am - 7pm</p>
                <p>Sat: 9am - 2pm</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3 text-white">Part of the Dykes Motors Family</h2>
          <p className="text-gray-300 mb-4">
            Dykes Motors Power Equipment operates alongside{' '}
            <a href="https://www.dykesmotors.com" className="text-[#C8C8C8] hover:text-white underline" target="_blank" rel="noopener noreferrer">
              Dykes Motors
            </a>, our used vehicle dealership at the same location. Whether you need a truck to
            pull your trailer or a mower to maintain your property, we've got you covered under one roof.
          </p>
        </section>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/catalog" className="btn-primary text-center py-3 px-6">
            Browse Our Mowers
          </Link>
          <Link href="/contact" className="btn-outline text-center py-3 px-6">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
