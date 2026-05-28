import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LS Tractors for Sale — Collins, MS | Dykes Motors Power Equipment',
  description:
    'Authorized LS Tractor dealer in Collins, Mississippi. Compact and sub-compact tractors for farms, acreage, and land management. Sales, service, and parts. Call (601) 641-5475.',
  alternates: { canonical: 'https://www.dykespower.com/ls-tractors' },
};

const SERVICES = [
  {
    title: 'Tractor Sales',
    description: 'New LS Tractor inventory on the lot and available to order. Stop in or call to see what we have.',
  },
  {
    title: 'Service & Repairs',
    description: 'Factory-trained technicians. Engine work, hydraulics, PTO, loader issues — we work on what we sell.',
  },
  {
    title: 'Parts & Implements',
    description: 'OEM LS parts in stock and available to order. Loader buckets, finish mowers, box blades, and more.',
  },
  {
    title: 'Financing',
    description: 'Flexible financing options for qualified buyers. Ask us about current rates and terms.',
  },
];

export default function LSTractorsPage() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      {/* Hero */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 py-16 md:py-24">
          <p className="text-[#C8C8C8] text-sm font-semibold uppercase tracking-widest mb-3">
            Now Available · Collins, Mississippi
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            LS Tractors
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">
            Authorized LS Tractor dealer at Dykes Motors. Compact and sub-compact tractors built for South Mississippi farms, acreage, and land management. Serious machines at a fair price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:6016415475" className="btn-primary text-center">
              Call (601) 641-5475
            </a>
            <Link href="/contact" className="btn-outline text-center">
              Ask a Question
            </Link>
          </div>
        </div>
      </div>

      {/* Inventory coming soon */}
      <div className="max-w-[1280px] mx-auto px-4 py-16">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 md:p-12 text-center mb-16">
          <div className="text-5xl mb-4">🚜</div>
          <h2 className="text-2xl font-bold mb-3">Inventory Loading</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            We&apos;re stocking up. Call or stop by the lot at 3069 Hwy 49, Collins to see what&apos;s currently available and what we can order for you.
          </p>
          <a href="tel:6016415475" className="btn-primary inline-block">
            Call (601) 641-5475 to Check Inventory
          </a>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">What We Do</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About LS Tractors */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold mb-4">About LS Tractors</h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-400">
            <div>
              <p className="mb-4">
                LS Tractor builds compact and sub-compact tractors designed for real work — mowing, tilling, loading, and land clearing. Built on Korean engineering with Perkins and Yanmar diesel engines, they&apos;re known for reliability and value.
              </p>
              <p>
                Whether you&apos;re running a few acres or a full farm operation, LS has a tractor that fits the job without the premium markup of the big names.
              </p>
            </div>
            <div>
              <ul className="space-y-3">
                {[
                  'Sub-compact models from 25 HP',
                  'Compact utility tractors up to 100+ HP',
                  'Front loader packages available',
                  'Backhoe attachments available',
                  'Perkins & Yanmar diesel engines',
                  'Hydrostatic and gear transmission options',
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <span className="text-[#C8C8C8] shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to Talk Tractors?</h2>
          <p className="text-gray-400 mb-6">Come see us at 3069 Hwy 49, Collins, MS or give us a call.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:6016415475" className="btn-primary">Call (601) 641-5475</a>
            <Link href="/contact" className="btn-outline">Send a Message</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
