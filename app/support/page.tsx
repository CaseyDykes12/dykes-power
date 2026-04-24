import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Customer Support | Dykes Motors Power Equipment',
  description:
    'Reach Dykes Motors Power Equipment for warranty, service, parts, returns, shipping, or financing. Authorized Ferris dealer in Collins, MS — real people, straight answers.',
  alternates: { canonical: 'https://www.dykespower.com/support' },
  openGraph: {
    title: 'Customer Support — Dykes Motors Power Equipment',
    description:
      'Call, text, or come by the shop. Warranty, service, parts, returns, shipping, and financing help all in one place.',
    url: 'https://www.dykespower.com/support',
    type: 'website',
  },
};

const TOPICS = [
  {
    href: '/warranty',
    title: 'Warranty claims',
    blurb: '10-year suspension warranty on qualifying Ferris mowers. We file the claim for you.',
  },
  {
    href: '/shipping-returns',
    title: 'Returns & refunds',
    blurb: 'Defective items covered under Ferris warranty. 7-day window to report.',
  },
  {
    href: '/shipping-returns',
    title: 'Shipping & delivery',
    blurb: 'Flat $12.99 on parts, free over $75. Mowers delivered locally or picked up.',
  },
  {
    href: '/service',
    title: 'Service & repairs',
    blurb: 'Certified Ferris techs at our Collins, MS shop. All makes welcome.',
  },
  {
    href: '/parts',
    title: 'Parts lookup',
    blurb: 'OEM Ferris parts. Tell us your model and we will pull it.',
  },
  {
    href: '/financing',
    title: 'Financing help',
    blurb: 'Apply online, answer same day. Qualified buyers only.',
  },
];

export default function SupportPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Customer Support — Dykes Motors Power Equipment',
    url: 'https://www.dykespower.com/support',
    mainEntity: {
      '@type': 'Organization',
      name: 'Dykes Motors Power Equipment',
      url: 'https://www.dykespower.com',
      email: 'info@dykesmotors.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3069 Hwy 49',
        addressLocality: 'Collins',
        addressRegion: 'MS',
        postalCode: '39428',
        addressCountry: 'US',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+1-601-909-5380',
          areaServed: 'US',
          availableLanguage: 'English',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+1-601-336-2541',
          areaServed: 'US',
          availableLanguage: 'English',
        },
      ],
    },
  };

  return (
    <div className="bg-dykes-black min-h-screen text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <section className="border-b border-gray-900 bg-gradient-to-b from-black to-dykes-black">
        <div className="max-w-4xl mx-auto px-4 py-14 md:py-20">
          <p className="text-ferris-yellow text-sm font-bold tracking-widest uppercase mb-3">
            Customer Support
          </p>
          <h1
            className="text-4xl md:text-6xl font-black leading-tight mb-5"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            We handle support three ways.
            <br />
            <span className="text-dykes-gray-100">Call, text, or come by.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Real people in Collins, Mississippi. Not a call center. Not a ticket queue. Pick whichever's easiest for you.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-lg border border-gray-800 bg-black/50 p-6">
            <p className="text-ferris-yellow font-bold text-xs tracking-widest uppercase mb-2">
              Sales
            </p>
            <a href="tel:6019095380" className="text-2xl font-black text-white underline">
              (601) 909-5380
            </a>
            <p className="text-sm text-gray-400 mt-2">Mon–Fri 9–6 · Sat 9–2</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-6">
            <p className="text-ferris-yellow font-bold text-xs tracking-widest uppercase mb-2">
              Service &amp; Parts
            </p>
            <a href="tel:6013362541" className="text-2xl font-black text-white underline">
              (601) 336-2541
            </a>
            <p className="text-sm text-gray-400 mt-2">Mon–Fri 9–7 · Sat 9–2</p>
          </div>
          <div className="rounded-lg border border-gray-800 bg-black/50 p-6">
            <p className="text-ferris-yellow font-bold text-xs tracking-widest uppercase mb-2">
              Email
            </p>
            <a
              href="mailto:info@dykesmotors.com"
              className="text-lg font-bold text-white underline break-all"
            >
              info@dykesmotors.com
            </a>
            <p className="text-sm text-gray-400 mt-2">Reply within 1 business day</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <a
            href="sms:+16016415475"
            className="bg-white text-dykes-black font-bold px-8 py-3 rounded-md hover:bg-dykes-gray-100 transition-colors"
          >
            Text Now
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=3069+Hwy+49+Collins+MS+39428"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-dykes-black transition-colors"
          >
            Get Directions
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          3069 Hwy 49, Collins, MS 39428
        </p>
      </section>

      <section className="bg-[#0a0a0a] border-y border-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <h2
            className="text-2xl md:text-4xl font-black mb-6"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            Common support topics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOPICS.map((t) => (
              <Link
                key={t.title}
                href={t.href}
                className="rounded-lg border border-gray-800 bg-black/50 p-5 hover:border-ferris-yellow/60 transition-colors"
              >
                <p className="font-bold text-white">{t.title}</p>
                <p className="text-sm text-gray-400 mt-1">{t.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h2
          className="text-2xl md:text-4xl font-black mb-6"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
        >
          What to expect
        </h2>
        <ul className="space-y-4 text-gray-300">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ferris-yellow text-dykes-black font-bold flex items-center justify-center">
              1
            </span>
            <span>You reach a real person in Collins — not a call center.</span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ferris-yellow text-dykes-black font-bold flex items-center justify-center">
              2
            </span>
            <span>Emails answered within 1 business day (usually sooner).</span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ferris-yellow text-dykes-black font-bold flex items-center justify-center">
              3
            </span>
            <span>Voicemails returned same day during business hours.</span>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-ferris-yellow text-dykes-black font-bold flex items-center justify-center">
              4
            </span>
            <span>
              If we cannot fix it ourselves, we coordinate directly with Ferris on your behalf.
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}
