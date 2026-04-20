import Link from 'next/link';
import { products } from '@/lib/products';
import { getAllPosts } from '@/lib/blog';
import ProductCard from '@/components/ProductCard';
import HomepageStickyCTA from '@/components/HomepageStickyCTA';
import FerrisHero from '@/components/campaign/FerrisHero';
import WhyWeCarryFerris from '@/components/campaign/WhyWeCarryFerris';
import MowCalculator from '@/components/MowCalculator';
import WatchTheFilm from '@/components/campaign/WatchTheFilm';
import DealerStory from '@/components/campaign/DealerStory';
import DayOfWorkGallery from '@/components/campaign/DayOfWorkGallery';

export default function HomePage() {
  const featured = products
    .filter((p) => p.tag && p.imageUrl.includes('/basco/'))
    .slice(0, 3);
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Financing banner */}
      <div className="bg-red-600 text-white text-center text-xs md:text-sm font-semibold tracking-widest uppercase py-2 px-4">
        Financing as low as 4.9% APR up to 84 months for qualified credit — <Link href="/contact" className="underline hover:no-underline">Get pre-approved</Link>
      </div>

      {/* 1. Hero */}
      <FerrisHero />

      {/* Value props row */}
      <section className="bg-dykes-gray-900 py-10 px-4 border-b border-dykes-gray-700">
        <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Link href="/catalog" className="flex flex-col items-center gap-2 py-2 hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ferris-logo.png" alt="Ferris Mowers" className="h-8 w-auto object-contain" />
            <p className="font-semibold text-sm text-dykes-gray-100">Authorized Ferris Dealer</p>
          </Link>
          <Link href="/service" className="flex flex-col items-center gap-2 py-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">🔧</span>
            <p className="font-semibold text-sm text-dykes-gray-100">Service &amp; Repairs</p>
          </Link>
          <Link href="/financing" className="flex flex-col items-center gap-2 py-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">💳</span>
            <p className="font-semibold text-sm text-dykes-gray-100">Financing Available</p>
          </Link>
          <div className="flex flex-col items-center gap-2 py-2">
            <span className="text-3xl">📍</span>
            <p className="font-semibold text-sm text-dykes-gray-100">Collins, Mississippi</p>
          </div>
        </div>
      </section>

      {/* 2. Why We Carry Ferris */}
      <WhyWeCarryFerris />

      {/* 3. Popular Models */}
      <section id="popular-models" className="py-16 px-4 bg-dykes-gray-900 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-ferris-yellow text-sm font-semibold tracking-widest uppercase mb-2">
            Popular Models
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-3 text-white"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
          >
            The ones we move the most.
          </h2>
          <p className="text-dykes-gray-300 mb-8">
            Real lot, real service, real numbers. Monthly payments assume 4.9% APR over 72 months for qualified credit.
          </p>
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

      {/* 4. Why Ferris — refreshed */}
      <section className="bg-dykes-black py-16 md:py-24 px-4">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-ferris-yellow text-sm font-semibold tracking-widest uppercase mb-2">
              Why Ferris
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold mb-4 text-white"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
            >
              Built different. Rides different.
            </h2>
            <p className="text-dykes-gray-300 mb-6">
              Ferris invented the suspension mower. Their patented independent suspension means a
              smoother ride, less fatigue, and a better cut — on any Mississippi terrain.
            </p>
            <ul className="space-y-3">
              {[
                'Patented suspension system on most models',
                'Commercial-grade engines — Kawasaki, Vanguard, Kubota diesel',
                'iCD™ cutting system for superior cut quality',
                'Built for full-time commercial use',
                'Industry-leading dealer support',
                'The only authorized Ferris dealer between Jackson and the Gulf',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-ferris-yellow font-bold mt-0.5">✓</span>
                  <span className="text-dykes-gray-100">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/quiz"
              className="inline-block mt-8 bg-white text-dykes-black font-bold px-8 py-3 rounded-md hover:bg-dykes-gray-100 transition-colors"
            >
              Find Your Ferris →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              '/images/ferris/lot/isx800-lot.jpg',
              '/images/ferris/lot/srsz3-lot.jpg',
              '/images/ferris/lot/500s-lot.jpg',
              '/images/ferris/lot/is600-lot.jpg',
            ].map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={src}
                src={src}
                alt=""
                className="aspect-square w-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Your Property — mow-time calculator */}
      <MowCalculator />

      {/* 5b. Feels Like a Day of Work */}
      <DayOfWorkGallery />

      {/* 6. Watch the Film */}
      <WatchTheFilm />

      {/* 7. Dealer Story */}
      <DealerStory />

      {/* 8. Mower Tips */}
      {recentPosts.length > 0 && (
        <section className="bg-dykes-gray-900 py-16 px-4 border-t border-dykes-gray-700">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-ferris-yellow text-sm font-semibold tracking-widest uppercase mb-2">
              Mower Tips &amp; Guides
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold mb-3 text-white"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
            >
              From our team in Collins.
            </h2>
            <p className="text-dykes-gray-300 mb-8">Buying advice and maintenance tips from folks who actually work on these machines.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-dykes-black border border-dykes-gray-700 rounded-xl p-6 hover:border-ferris-yellow hover:-translate-y-0.5 transition-all flex flex-col"
                >
                  <span className="text-xs text-ferris-yellow font-semibold uppercase tracking-widest mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-snug mb-3 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-dykes-gray-300 text-sm line-clamp-2">{post.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blog" className="text-white font-semibold hover:text-ferris-yellow transition-colors">
                View All Posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 9. Quiz CTA */}
      <section className="bg-dykes-black text-white py-16 md:py-20 px-4 border-t border-dykes-gray-700">
        <div className="max-w-2xl mx-auto text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ferris-logo.png" alt="Ferris" className="h-6 w-auto mx-auto mb-4 opacity-70" />
          <p className="text-dykes-gray-300 text-sm font-semibold tracking-widest uppercase mb-3">
            Find the right Ferris for your property
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
          >
            Not sure which mower is right for you?
          </h2>
          <p className="text-dykes-gray-300 mb-8">
            Answer 4 quick questions — we&apos;ll match you to the Ferris that fits your property,
            your work, and your budget.
          </p>
          <Link
            href="/quiz"
            className="inline-block bg-white text-dykes-black text-lg font-bold px-10 py-4 rounded-md hover:bg-dykes-gray-100 transition-colors"
          >
            Take the Quiz
          </Link>
          <p className="text-dykes-gray-500 text-sm mt-4">
            Prefer to talk? Call Casey in Collins: <a href="tel:6019095380" className="underline hover:text-white">(601) 909-5380</a>.
          </p>
        </div>
      </section>

      <HomepageStickyCTA />
    </>
  );
}
