import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Massimo Powersports — UTVs, ATVs & More | Dykes Motors Power Equipment',
  description:
    'Authorized Massimo Motor dealer in Collins, Mississippi. UTVs, ATVs, and powersports built for work and recreation. Sales, service, and parts. Call (601) 641-5475.',
  alternates: { canonical: 'https://www.dykespower.com/massimo-powersports' },
};

const CATEGORIES = [
  {
    name: 'UTVs / Side-by-Sides',
    description: 'Work and sport UTVs built for farms, hunting, and off-road use across South Mississippi.',
  },
  {
    name: 'ATVs',
    description: 'Single-rider ATVs for trail riding, farm chores, and getting where trucks can\'t go.',
  },
  {
    name: 'Youth Models',
    description: 'Youth ATVs and go-karts sized and powered right for younger riders.',
  },
  {
    name: 'Golf & Neighborhood Carts',
    description: 'Electric and gas-powered carts for the course, the neighborhood, and the farm.',
  },
];

const SERVICES = [
  {
    title: 'Sales',
    description: 'Inventory on the lot and available to order. Stop in or call.',
  },
  {
    title: 'Service',
    description: 'Engine, drivetrain, electrical — we work on what we sell.',
  },
  {
    title: 'Parts & Accessories',
    description: 'OEM Massimo parts in stock and available to order.',
  },
  {
    title: 'Financing',
    description: 'Flexible financing for qualified buyers. Ask about current terms.',
  },
];

export default function MassimoPowersportsPage() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      {/* Hero */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-[1280px] mx-auto px-4 py-16 md:py-24">
          <p className="text-[#C8C8C8] text-sm font-semibold uppercase tracking-widest mb-3">
            Now Available · Collins, Mississippi
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Massimo Powersports
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">
            Authorized Massimo Motor dealer at Dykes Motors. UTVs, ATVs, and powersports built for work and recreation — priced for real people. Right here in Collins, MS.
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

      <div className="max-w-[1280px] mx-auto px-4 py-16">
        {/* Inventory coming soon */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 md:p-12 text-center mb-16">
          <div className="text-5xl mb-4">🏍️</div>
          <h2 className="text-2xl font-bold mb-3">Inventory Loading</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            We&apos;re stocking up. Call or stop by the lot at 3069 Hwy 49, Collins to see what&apos;s on hand and what we can order.
          </p>
          <a href="tel:6016415475" className="btn-primary inline-block">
            Call (601) 641-5475 to Check Inventory
          </a>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">What We Carry</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
                <h3 className="font-bold text-white mb-2">{c.name}</h3>
                <p className="text-gray-400 text-sm">{c.description}</p>
              </div>
            ))}
          </div>
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

        {/* About Massimo */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-8 md:p-12 mb-16">
          <h2 className="text-2xl font-bold mb-4">About Massimo Motor</h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-400">
            <div>
              <p className="mb-4">
                Massimo Motor builds UTVs, ATVs, and powersports equipment that gets the job done without breaking the bank. Based in Texas, they&apos;ve become one of the fastest-growing powersports brands in the country — popular with farmers, hunters, and weekend riders alike.
              </p>
              <p>
                Strong machines, honest pricing, and backed by a dealer network that actually supports them. That&apos;s why we carry them.
              </p>
            </div>
            <div>
              <ul className="space-y-3">
                {[
                  'UTVs from 400cc to 1000cc',
                  'Work and sport configurations',
                  'Youth models available',
                  'Electric and gas options',
                  'Strong parts availability',
                  'Warranty on new units',
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
          <h2 className="text-2xl font-bold mb-3">Come See What We Have</h2>
          <p className="text-gray-400 mb-6">3069 Hwy 49, Collins, MS · Mon–Fri 9am–6pm · Sat 9am–2pm</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:6016415475" className="btn-primary">Call (601) 641-5475</a>
            <Link href="/contact" className="btn-outline">Send a Message</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
