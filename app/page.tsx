import Link from 'next/link';
import { products } from '@/lib/products';
import { getAllPosts } from '@/lib/blog';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const featured = products.filter((p) => p.tag === 'Best Seller' || p.tag === 'Popular').slice(0, 3);
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Financing banner */}
      <div className="bg-red-600 text-white text-center text-xs md:text-sm font-semibold tracking-widest uppercase py-2 px-4">
        Deals from 2.9% financing up to 48 months on select models — <Link href="/contact" className="underline hover:no-underline">Get pre-approved</Link>
      </div>

      {/* Hero */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden min-h-[88vh] flex items-center">
        {/* Watermark — actual DF logo at large scale, low opacity */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/df-logo.png"
          alt=""
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[70vw] max-w-4xl opacity-[0.06] pointer-events-none select-none object-contain"
        />

        {/* Hero content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/df-logo.png" alt="Dykes Family Logo" className="h-14 w-auto" />
              <div>
                <p
                  className="text-3xl text-white leading-tight tracking-widest"
                  style={{ fontFamily: 'var(--font-bebas)', WebkitTextStroke: '0.5px #666' }}
                >
                  DYKES MOTORS
                </p>
                <p
                  className="text-sm tracking-widest uppercase leading-tight"
                  style={{ fontFamily: 'var(--font-bebas)', color: '#C8C8C8', letterSpacing: '0.14em' }}
                >
                  Collins, Mississippi
                </p>
              </div>
            </div>

            <h1
              className="text-5xl md:text-7xl font-black leading-tight mb-6 text-white"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
            >
              Power Equipment —<br />
              <span className="text-[#C8C8C8]">Commercial Mowers</span>
            </h1>

            <p className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed">
              In-stock, inbound, or available to order through our manufacturer network.
              Local service and warranty support.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/financing" className="btn-primary text-base px-8 py-3">
                Finance a Mower
              </Link>
              <Link href="/catalog" className="btn-outline text-base px-8 py-3">
                Browse Inventory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-[#111] py-10 px-4 border-b border-gray-800">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Link href="/catalog" className="flex flex-col items-center gap-2 py-2 hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ferris-logo.png" alt="Ferris Mowers" className="h-8 w-auto object-contain" />
            <p className="font-semibold text-sm text-gray-200">Authorized Ferris Dealer</p>
          </Link>
          <Link href="/service" className="flex flex-col items-center gap-2 py-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">🔧</span>
            <p className="font-semibold text-sm text-gray-200">Service &amp; Repairs</p>
          </Link>
          <Link href="/financing" className="flex flex-col items-center gap-2 py-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">💳</span>
            <p className="font-semibold text-sm text-gray-200">Financing Available</p>
          </Link>
          <div className="flex flex-col items-center gap-2 py-2">
            <span className="text-3xl">📍</span>
            <p className="font-semibold text-sm text-gray-200">Collins, Mississippi</p>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16 px-4 bg-[#111]">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-white">Popular Models</h2>
          <p className="text-gray-400 mb-8">Our most requested Ferris mowers — in stock and ready to go.</p>
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
      <section className="bg-[#0a0a0a] py-16 px-4">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-white">Why Ferris?</h2>
            <p className="text-gray-400 mb-6">
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
                  <span className="text-[#C8C8C8] font-bold mt-0.5">✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/catalog" className="btn-primary mt-8 inline-block">
              Shop the Lineup
            </Link>
          </div>
          <div className="bg-black rounded-xl p-8 text-white text-center border border-gray-800">
            <p className="text-[#C8C8C8] font-semibold mb-2 tracking-widest uppercase text-sm">Local Dealer</p>
            <h3 className="text-2xl font-bold mb-4">Dykes Motors Power Equipment</h3>
            <p className="text-gray-400 mb-6">
              We carry the full Ferris lineup with hands-on support from our team in Collins, MS.
              Come see the machines in person before you buy.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Visit Us or Call
            </Link>
            <p className="text-gray-500 mt-4 text-sm">Sales: (601) 641-5475</p>
          </div>
        </div>
      </section>

      {/* Latest from the blog */}
      {recentPosts.length > 0 && (
        <section className="bg-[#111] py-16 px-4 border-t border-gray-800">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="text-3xl font-bold mb-2 text-white">Mower Tips &amp; Guides</h2>
            <p className="text-gray-400 mb-8">Buying advice and maintenance tips from our team in Collins, MS.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6 hover:border-[#C8C8C8] transition-all flex flex-col"
                >
                  <span className="text-xs text-[#C8C8C8] font-semibold uppercase tracking-widest mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-snug mb-3 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{post.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blog" className="text-[#C8C8C8] font-semibold hover:text-white transition-colors">
                View All Posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-black text-white py-16 px-4 border-t border-gray-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Not sure which mower is right for you?</h2>
          <p className="text-gray-400 mb-8">
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
