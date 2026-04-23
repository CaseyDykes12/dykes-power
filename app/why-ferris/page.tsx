import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Ferris — Feels Like a Ferris | Dykes Motors Power Equipment',
  description:
    'Why commercial crews pick Ferris: 10-year suspension warranty, iCD+ cutting system, Vanguard EFI engines, and Oil Guard protection. See why it feels like a Ferris — authorized dealer in Collins, MS.',
  alternates: { canonical: 'https://www.dykespower.com/why-ferris' },
  openGraph: {
    title: 'Why Ferris — Feels Like a Ferris',
    description:
      'Ferris is built different. Suspension on every model, iCD+ cutting system, commercial-grade engines. Authorized dealer in Collins, Mississippi.',
    url: 'https://www.dykespower.com/why-ferris',
    type: 'website',
  },
};

export default function WhyFerrisPage() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      {/* Hero */}
      <section className="relative bg-black border-b border-gray-800 px-4 py-16 md:py-24 overflow-hidden">
        <div className="max-w-[1280px] mx-auto relative z-10">
          <p className="text-xs text-[#C8C8C8] uppercase tracking-[0.3em] mb-3 font-semibold">
            Authorized Ferris® Dealer · Collins, Mississippi
          </p>
          <h1
            className="text-5xl md:text-7xl font-black leading-[0.95] mb-6 max-w-3xl"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            Feels Like a Ferris<sup className="text-2xl">®</sup>.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Once you mow behind one, nothing else rides the same. Suspension on every model, a cutting system Ferris calls <em>iCD+</em>, and commercial-grade engines built to log thousand-hour seasons. Here&rsquo;s what sets them apart — and why we carry them.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/catalog"
              className="bg-white text-black font-bold px-7 py-3 rounded-md hover:bg-[#C8C8C8] transition-colors"
            >
              Shop the Lineup
            </Link>
            <a
              href="sms:+16013362541?body=Hey%20Addison%20%E2%80%94%20I%27m%20on%20the%20Why%20Ferris%20page%20and%20have%20a%20question."
              className="border-2 border-white text-white font-semibold px-7 py-3 rounded-md hover:bg-white hover:text-black transition-colors"
            >
              Text Addison a Question
            </a>
          </div>
        </div>
      </section>

      {/* Pillars intro */}
      <section className="max-w-[1280px] mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-4 text-sm">
          {[
            { t: '10-Year', l: 'Suspension Warranty' },
            { t: 'iCD+', l: 'Cutting System' },
            { t: 'Vanguard', l: 'EFI & ETC Engines' },
            { t: 'Oil Guard', l: 'Engine Protection' },
          ].map((p) => (
            <div key={p.t} className="bg-[#111] border border-gray-800 rounded-xl p-5">
              <p className="text-[#C8C8C8] text-2xl font-black" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.04em' }}>
                {p.t}
              </p>
              <p className="text-gray-400 text-sm mt-1">{p.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suspension */}
      <section id="suspension" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 py-16 border-t border-gray-800">
        <p className="text-xs text-[#C8C8C8] uppercase tracking-[0.25em] mb-3 font-semibold">The Original Advantage</p>
        <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}>
          10-Year Suspension Warranty
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
            <p>
              Ferris invented suspension on commercial zero-turns. Every IS®, ISX™, and SRS™ model rides on a four-wheel independent suspension system — front arms plus rear coil-overs. Bumps go into the machine, not into your back.
            </p>
            <p>
              And Ferris stands behind it. <span className="text-white font-semibold">10-year warranty on the suspension components</span> — the longest coverage in the commercial mower business. No one else writes that warranty because no one else builds it to last that long.
            </p>
            <p className="text-[#C8C8C8] italic">
              &ldquo;The difference shows up around hour 800 — when a rigid-frame mower starts rattling itself apart, a Ferris is still tight.&rdquo;
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 text-lg">What the suspension changes</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Faster ground speed without losing cut quality on uneven terrain</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Less operator fatigue — measurable reduction in whole-body vibration</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Fewer stress fractures on the frame and deck hangers</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Better scalp resistance on rough yards, athletic fields, pasture edges</li>
            </ul>
          </div>
        </div>
      </section>

      {/* iCD+ Cutting System */}
      <section id="icd-cutting" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 py-16 border-t border-gray-800">
        <p className="text-xs text-[#C8C8C8] uppercase tracking-[0.25em] mb-3 font-semibold">The Cut</p>
        <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}>
          iCD<sup className="text-2xl">™</sup>+ Cutting System
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
            <p>
              iCD+ stands for Inverted Cutter Deck Plus — Ferris&rsquo;s third-generation deck design. The blades sit in a tighter chamber that pulls grass upright before the cut, so you get a cleaner finish at higher speeds.
            </p>
            <p>
              Discharge is where it shines. Deep side discharge chute, optimized airflow, and a blade profile that moves clippings out of the deck fast — no clumps, no double-cut needed. The stripe holds in wet grass, tall grass, and the first cut of spring.
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 text-lg">What iCD+ gets you</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Clean discharge — no windrow, no double-pass</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Uniform cut across the full width of the deck</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Stripe quality that shows up in photos — not just in person</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Mulches without a kit if you let the grass get a little long</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Engines */}
      <section id="engines" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 py-16 border-t border-gray-800">
        <p className="text-xs text-[#C8C8C8] uppercase tracking-[0.25em] mb-3 font-semibold">The Power</p>
        <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}>
          Vanguard<sup className="text-2xl">®</sup> EFI & ETC Engines
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
            <p>
              On the heavier-duty Ferris models, you get Vanguard V-twins with <span className="text-white font-semibold">EFI</span> (Electronic Fuel Injection) and <span className="text-white font-semibold">ETC</span> (Electronic Throttle Control). No carburetor to clean, no choke to mess with.
            </p>
            <p>
              EFI meters fuel based on load, altitude, and temperature — cold-starts first pull, smoother under load, 15-25% better fuel economy than a carbureted equivalent. ETC holds engine RPM steady as you work heavy grass so the cut doesn&rsquo;t bog down.
            </p>
            <p>
              Also available: Kawasaki FX/FS series, Briggs & Stratton CXi/PXi, and Kubota diesel on the IS 6200.
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 text-lg">Why EFI matters for commercial crews</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> First-pull starts in cold morning and hot afternoon</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> 15-25% better fuel burn — less trips to the gas can</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> No carburetor maintenance, no gum build-up from ethanol fuel</li>
              <li className="flex gap-3"><span className="text-[#C8C8C8] font-bold">✓</span> Cleaner emissions — increasingly required on municipal and HOA contracts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Oil Guard */}
      <section id="oil-guard" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 py-16 border-t border-gray-800">
        <p className="text-xs text-[#C8C8C8] uppercase tracking-[0.25em] mb-3 font-semibold">The Longevity Play</p>
        <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}>
          Oil Guard<sup className="text-2xl">™</sup> Protection
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="text-gray-300 space-y-4 text-lg leading-relaxed">
            <p>
              Vanguard Oil Guard is a larger oil capacity and a pressurized cooling system wrapped around the crankcase. Combined, it stretches oil-change intervals from 100 hours to <span className="text-white font-semibold">500 hours</span> — a 5x improvement.
            </p>
            <p>
              For a landscape crew running two mowers 30 hours a week, that&rsquo;s 10 oil changes a year becoming 2. Less downtime, less waste oil, lower maintenance cost per acre.
            </p>
            <p>
              Available on select ISX 2200, ISX 3300, SRS Z2, SRS Z3X, and FW45 Vanguard models.
            </p>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4 text-lg">Oil Guard math</h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>Standard oil change interval</span>
                <span className="text-white font-bold">100 hrs</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>Oil Guard interval</span>
                <span className="text-[#C8C8C8] font-bold">500 hrs</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-2">
                <span>Annual hours (30 hrs/week)</span>
                <span className="text-white">1,560</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>Oil changes saved per year</span>
                <span className="text-[#C8C8C8] font-bold">~13</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section id="calculators" className="scroll-mt-24 max-w-[1280px] mx-auto px-4 py-16 border-t border-gray-800">
        <p className="text-xs text-[#C8C8C8] uppercase tracking-[0.25em] mb-3 font-semibold">The Pro Tools</p>
        <h2 className="text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}>
          Productivity & ROI Calculators
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-2 text-xl">Mow Calculator</h3>
            <p className="text-gray-400 text-sm mb-4">
              Enter your acreage and we&rsquo;ll show which Ferris deck size and model cuts it fastest — and how much time you save against your current mower.
            </p>
            <Link href="/mow-calculator" className="inline-block bg-white text-black font-bold px-5 py-2 rounded-md hover:bg-[#C8C8C8] transition-colors text-sm">
              Open Mow Calculator
            </Link>
          </div>
          <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-2 text-xl">Ferris ROI Calculator</h3>
            <p className="text-gray-400 text-sm mb-4">
              Ferris also publishes an official ROI and productivity tool on their dealer-support site. We&rsquo;re happy to walk you through it — text Addison and we&rsquo;ll build the numbers for your crew.
            </p>
            <a
              href="sms:+16013362541?body=Hey%20Addison%20%E2%80%94%20I%27d%20like%20help%20with%20the%20Ferris%20ROI%20calculator."
              className="inline-block bg-white text-black font-bold px-5 py-2 rounded-md hover:bg-[#C8C8C8] transition-colors text-sm"
            >
              Text Addison
            </a>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black border-t border-gray-800 px-4 py-16">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}>
            Come Sit On One.
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            The fastest way to know why Ferris is different is to demo one. Come by 3069 Hwy 49 in Collins — we&rsquo;ll put you behind a suspension machine and a rigid one and you&rsquo;ll feel it in 30 seconds.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/catalog" className="bg-white text-black font-bold px-8 py-3 rounded-md hover:bg-[#C8C8C8] transition-colors">
              Shop the Lineup
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
