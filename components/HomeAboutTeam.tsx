import Link from 'next/link';

const PILLARS = [
  {
    title: 'Family-owned',
    body:
      'Dykes Motors Power Equipment is part of the Dykes family of businesses headquartered in Collins, Mississippi. The same family answers the phone, signs the bill of sale, and stands behind every machine that leaves the lot.',
  },
  {
    title: 'Sales floor that knows the lineup',
    body:
      'Our sales team rides the machines we sell. They will walk you through the difference between an IS 600 and an ISX 800, explain what suspension actually does for an 8-hour day, and tell you straight if a smaller mower will save you money.',
  },
  {
    title: 'Service writers and techs in-house',
    body:
      'We do warranty work, blade sharpening, deck rebuilds, hydro service, and full pre-season tune-ups right here in Collins. Drop-off and pickup; loaners when we can. Direct line: (601) 336-2541.',
  },
  {
    title: 'Parts counter stocked for Ferris and Briggs',
    body:
      "OEM Ferris parts, Vanguard, Briggs, and Kawasaki engine parts, plus blades, belts, filters, and oil — drop-shipped from Power Distributors when we don't have it on the shelf.",
  },
];

export default function HomeAboutTeam() {
  return (
    <section className="bg-dykes-gray-900 py-16 md:py-24 px-4 border-y border-dykes-gray-700">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-5">
            <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-2">
              Who You&apos;re Buying From
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
            >
              A Mississippi family. A real shop. A name on the building.
            </h2>
            <p className="text-dykes-gray-300 mb-4 leading-relaxed">
              We opened the Power Equipment side in 2025 next to our used car dealership at 3069 Hwy 49. Same lot, same family, same handshake. We became the only authorized Ferris dealer between Jackson and the Gulf because Mississippi acres deserve a mower built for Mississippi acres.
            </p>
            <p className="text-dykes-gray-300 mb-6 leading-relaxed">
              When you call, you&apos;re talking to somebody in Collins — not a regional rep or a chat bot. When you pull in, somebody walks out to the lot with you.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-block bg-white text-dykes-black font-bold px-6 py-3 rounded-md hover:bg-dykes-gray-100 transition-colors"
              >
                Read Our Story →
              </Link>
              <Link
                href="/contact"
                className="inline-block border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-dykes-black transition-colors"
              >
                Stop By the Shop
              </Link>
            </div>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="bg-dykes-black border border-dykes-gray-700 rounded-xl p-5"
              >
                <h3 className="text-white font-bold text-lg mb-2 leading-snug">{p.title}</h3>
                <p className="text-dykes-gray-300 text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
