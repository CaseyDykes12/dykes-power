import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mower Service & Repairs — Dykes Motors Power Equipment | Collins, MS',
  description:
    'Expert mower service and repairs in Collins, Mississippi. Authorized Ferris service center. Oil changes, blade sharpening, engine repair, hydrostatic service, and OEM parts. Call (601) 336-2541.',
  keywords:
    'mower repair Collins MS, Ferris service center Mississippi, lawn mower service Covington County, mower tune-up Collins MS',
};

export default function ServicePage() {
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">

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
      <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
        <h3 className="font-bold text-white mb-3">Brands We Service</h3>
        <p className="text-gray-400 text-sm">
          Ferris (authorized) &nbsp;·&nbsp; Husqvarna &nbsp;·&nbsp; Scag &nbsp;·&nbsp; Exmark &nbsp;·&nbsp;
          Toro &nbsp;·&nbsp; Gravely &nbsp;·&nbsp; Bad Boy &nbsp;·&nbsp; Snapper &nbsp;·&nbsp; Most major brands
        </p>
        <p className="text-gray-500 text-xs mt-3">
          Not sure if we service your machine? Call us at (601) 336-2541 and we&apos;ll let you know.
        </p>
      </div>

    </div>
  );
}
