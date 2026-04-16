import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mower Service & Repairs — Dykes Motors Power Equipment | Collins, MS',
  description:
    'Expert mower service and repairs in Collins, Mississippi. Authorized Ferris service center. Oil changes, blade sharpening, engine repair, hydrostatic service, and OEM parts. Call (601) 336-2541.',
  keywords:
    'mower repair Collins MS, Ferris service center Mississippi, lawn mower service Covington County, mower tune-up Collins MS',
  alternates: { canonical: 'https://www.dykespower.com/service' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoRepair',
  name: 'Dykes Motors Power Equipment — Service & Repairs',
  description:
    'Expert mower service and repairs in Collins, Mississippi. Authorized Ferris service center offering oil changes, blade sharpening, engine repair, hydrostatic service, and OEM parts.',
  url: 'https://www.dykespower.com/service',
  telephone: '+16013362541',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '3069 Hwy 49',
    addressLocality: 'Collins',
    addressRegion: 'MS',
    postalCode: '39428',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '14:00' },
  ],
  areaServed: [
    { '@type': 'City', name: 'Collins' },
    { '@type': 'City', name: 'Hattiesburg' },
    { '@type': 'City', name: 'Laurel' },
    { '@type': 'AdministrativeArea', name: 'Covington County' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What brands do you service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We are an authorized Ferris service center and also service Husqvarna, Scag, Exmark, Toro, Gravely, Bad Boy, Snapper, and most other major mower brands.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does mower service take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most routine maintenance like oil changes, blade sharpening, and tune-ups are completed within 1-3 business days. Larger repairs depend on parts availability — call (601) 336-2541 for an estimate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you use OEM parts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. As an authorized Ferris dealer we stock genuine Ferris OEM parts and also carry Briggs & Stratton parts. Aftermarket options are available when requested.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need an appointment for mower service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No appointment needed. You can drop off your equipment at our Collins, MS location during service hours (Mon-Fri 9am-7pm, Sat 9am-2pm) or call ahead at (601) 336-2541.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.dykespower.com' },
    { '@type': 'ListItem', position: 2, name: 'Service & Repairs', item: 'https://www.dykespower.com/service' },
  ],
};

export default function ServicePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Page header */}
      <div className="mb-10">
        <p className="text-[#C8C8C8] text-sm font-semibold uppercase tracking-widest mb-2">
          Authorized Ferris Service Center — Collins, Mississippi
        </p>
        <h1 className="text-4xl font-bold text-white mb-3">Service &amp; Repairs</h1>
        <p className="text-gray-400 max-w-2xl">
          We service all Ferris mowers and most major brands. Trained technicians, OEM parts,
          and honest turnaround times — right here in Collins, MS.
        </p>
      </div>

      {/* Top info bar */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <a
          href="tel:6013362541"
          className="bg-[#1a1a1a] border border-gray-700 hover:border-[#C8C8C8] transition-colors rounded-xl p-5 flex items-center gap-4"
        >
          <span className="text-3xl">📞</span>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Call Service</p>
            <p className="text-white font-bold text-lg">(601) 336-2541</p>
          </div>
        </a>

        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-5 flex items-center gap-4">
          <span className="text-3xl">🕐</span>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Service Hours</p>
            <p className="text-white font-semibold text-sm">Mon–Fri: 9am – 7pm</p>
            <p className="text-white font-semibold text-sm">Sat: 9am – 2pm &nbsp;|&nbsp; Sun: Closed</p>
          </div>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-5 flex items-center gap-4">
          <span className="text-3xl">📍</span>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Location</p>
            <p className="text-white font-semibold text-sm">3069 Hwy 49, Collins, MS 39428</p>
            <p className="text-gray-400 text-sm">Drop-in or drop-off welcome</p>
          </div>
        </div>
      </div>

      {/* Service cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {[
          {
            icon: '🔧',
            title: 'Routine Maintenance',
            items: ['Oil changes', 'Blade sharpening & replacement', 'Belt inspection & replacement', 'Filter service', 'Seasonal tune-ups'],
          },
          {
            icon: '⚙️',
            title: 'Repairs',
            items: ['Engine diagnostics & repair', 'Hydrostatic drive service', 'Deck repair & fabrication', 'Electrical systems', 'Suspension service'],
          },
          {
            icon: '📦',
            title: 'Parts',
            items: ['OEM Ferris parts', 'Aftermarket options available', 'Same-day if in stock', 'Order turnaround varies', 'Call for availability'],
          },
        ].map((section) => (
          <div key={section.title} className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
            <p className="text-3xl mb-3">{section.icon}</p>
            <h3 className="font-bold text-lg mb-3 text-white">{section.title}</h3>
            <ul className="space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-gray-400">
                  <span className="text-[#C8C8C8]">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Map + Schedule side by side */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        {/* Google Map embed */}
        <div className="rounded-xl overflow-hidden border border-gray-700 h-72 md:h-auto">
          {/* Replace the src below with your GBP embed code:
              Google Maps → your business → Share → Embed a map → copy the iframe src */}
          <iframe
            title="Dykes Motors Power Equipment Location"
            src="https://maps.google.com/maps?q=3069+Hwy+49+Collins+MS+39428&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '288px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Schedule service CTA */}
        <div className="bg-black border border-gray-800 rounded-xl p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-white mb-3">Schedule Service</h2>
          <p className="text-gray-400 mb-6">
            Call us to schedule or drop your equipment off at our Collins, MS location.
            We&apos;ll diagnose the issue and give you a straight answer on turnaround and cost.
          </p>
          <div className="flex flex-col gap-3">
            <a href="tel:6013362541" className="btn-primary text-center">
              Call Service — (601) 336-2541
            </a>
            <Link href="/contact" className="btn-outline text-center">
              Request Service Online
            </Link>
            <Link href="/parts" className="text-center text-sm text-gray-400 hover:text-[#C8C8C8] transition-colors pt-1">
              Browse OEM Parts →
            </Link>
          </div>
        </div>
      </div>

      {/* Brands we service */}
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 mb-10">
        <h3 className="font-bold text-white mb-3">Brands We Service</h3>
        <p className="text-gray-400 text-sm">
          Ferris (authorized) &nbsp;·&nbsp; Husqvarna &nbsp;·&nbsp; Scag &nbsp;·&nbsp; Exmark &nbsp;·&nbsp;
          Toro &nbsp;·&nbsp; Gravely &nbsp;·&nbsp; Bad Boy &nbsp;·&nbsp; Snapper &nbsp;·&nbsp; Most major brands
        </p>
        <p className="text-gray-500 text-xs mt-3">
          Not sure if we service your machine? Call us at (601) 336-2541 and we&apos;ll let you know.
        </p>
      </div>

      {/* FAQ */}
      <div className="border-t border-gray-800 pt-10">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {[
            {
              q: 'What brands do you service?',
              a: 'We are an authorized Ferris service center and also service Husqvarna, Scag, Exmark, Toro, Gravely, Bad Boy, Snapper, and most other major mower brands.',
            },
            {
              q: 'How long does mower service take?',
              a: 'Most routine maintenance like oil changes, blade sharpening, and tune-ups are completed within 1-3 business days. Larger repairs depend on parts availability — call (601) 336-2541 for an estimate.',
            },
            {
              q: 'Do you use OEM parts?',
              a: 'Yes. As an authorized Ferris dealer we stock genuine Ferris OEM parts and also carry Briggs & Stratton parts. Aftermarket options are available when requested.',
            },
            {
              q: 'Do I need an appointment for mower service?',
              a: 'No appointment needed. You can drop off your equipment at our Collins, MS location during service hours (Mon-Fri 9am-7pm, Sat 9am-2pm) or call ahead at (601) 336-2541.',
            },
          ].map(({ q, a }) => (
            <div key={q}>
              <h3 className="font-semibold text-white mb-2">{q}</h3>
              <p className="text-gray-400 text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
