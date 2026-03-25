import Link from 'next/link';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featured = products.filter((p) => p.tag === 'Best Seller' || p.tag === 'Popular').slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#00CFD7] font-semibold tracking-widest uppercase text-sm mb-3">
              Authorized Ferris Dealer — Collins, MS
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Commercial-Grade<br />
              <span className="text-[#00CFD7]">Ferris Mowers</span><br />
              Built to Work
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Dykes Motors Power Equipment carries the full Ferris lineup — zero-turn, stand-on,
              and walk-behind mowers for homeowners and commercial operators in Mississippi.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/catalog" className="btn-primary text-lg px-8 py-3">
                Shop Mowers
              </Link>
              <Link href="/contact" className="btn-outline text-lg px-8 py-3">
                Get a Quote
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
              src="https://www.ferrismowers.com/content/dam/ferrismowers/en_US/products/mowers/zero-turn-mowers/isx2200/ISX2200_PDP_HERO.jpg"
              alt="Ferris ISX 2200 Zero Turn Mower"
              className="rounded-xl shadow-2xl max-h-80 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white py-10 px-4 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: '🏆', label: 'Authorized Ferris Dealer' },
            { icon: '🔧', label: 'Service & Repairs' },
            { icon: '💳', label: 'Financing Available' },
            { icon: '📍', label: 'Collins, Mississippi' },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 py-2">
              <span className="text-3xl">{item.icon}</span>
              <p className="font-semibold text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 px-4">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl font-bold mb-2">Popular Models</h2>
          <p className="text-gray-500 mb-8">Our most requested Ferris mowers — in stock and ready to go.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.sku} product={p} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/catalog" className="btn-primary text-lg px-10 py-3">
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Why Ferris */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Ferris?</h2>
            <p className="text-gray-600 mb-6">
              Ferris invented the suspension mower. Their patented independent suspension system
              means a smoother ride, less fatigue, and a better cut — on any terrain.
            </p>
            <ul className="space-y-3">
              {[
                'Patented suspension system on most models',
                'Commercial-grade engines — Kawasaki, Vanguard, Kubota diesel',
                'iCD™ cutting system for superior cut quality',
                'Built for full-time commercial use',
                'Industry-leading dealer support',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#00CFD7] font-bold mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/catalog" className="btn-primary mt-8 inline-block">
              Shop the Lineup
            </Link>
          </div>
          <div className="bg-black rounded-xl p-8 text-white text-center">
            <p className="text-[#00CFD7] font-semibold mb-2 tracking-widest uppercase text-sm">Local Dealer</p>
            <h3 className="text-2xl font-bold mb-4">Dykes Motors Power Equipment</h3>
            <p className="text-gray-300 mb-6">
              We carry the full Ferris lineup with hands-on support from our team in Collins, MS.
              Come see the machines in person before you buy.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Visit Us or Call
            </Link>
            <p className="text-gray-400 mt-4 text-sm">(601) 606-2095</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black text-white py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Not sure which mower is right for you?</h2>
          <p className="text-gray-300 mb-8">
            Tell us about your property and we'll recommend the right machine with a real price — no runaround.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-10 py-4">
            Get a Free Recommendation
          </Link>
        </div>
      </section>
    </>
  );
}
