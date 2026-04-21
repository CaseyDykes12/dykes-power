import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import HomepageStickyCTA from '@/components/HomepageStickyCTA';
import FerrisHero from '@/components/campaign/FerrisHero';
import WhyWeCarryFerris from '@/components/campaign/WhyWeCarryFerris';
import MowCalculator from '@/components/MowCalculator';
import WatchTheFilm from '@/components/campaign/WatchTheFilm';
import DealerStory from '@/components/campaign/DealerStory';
import DayOfWorkGallery from '@/components/campaign/DayOfWorkGallery';
import FeaturedSeries from '@/components/FeaturedSeries';
import HomeAboutTeam from '@/components/HomeAboutTeam';
import BuildYourFerris from '@/components/BuildYourFerris';

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  const explore: { href: string; label: string; image: string }[] = [
    { href: '/parts', label: 'Genuine Parts', image: '/images/ferris/lot/isx800-lot.jpg' },
    { href: '/service', label: 'Service & Repair', image: '/images/ferris/lot/srsz3-lot.jpg' },
    { href: '/financing', label: 'Financing 4.9% APR', image: '/images/ferris/lot/500s-lot.jpg' },
    { href: '/catalog', label: 'Full Catalog', image: '/images/ferris/lot/is600-lot.jpg' },
  ];

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

      {/* 3. Popular Models — interactive series picker */}
      <section id="popular-models" className="py-16 px-4 bg-dykes-gray-900 scroll-mt-20">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-2">
            Popular Models
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-3 text-white"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
          >
            The ones we move the most.
          </h2>
          <p className="text-dykes-gray-300 mb-8">
            Pick the engine, pick the deck, see the price. Monthly payments assume 4.9% APR over 72 months for qualified credit.
          </p>
          <FeaturedSeries />
          <div className="mt-10 text-center">
            <Link href="/catalog" className="btn-primary text-lg px-10 py-3">
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Why Ferris — refreshed, photos now linked */}
      <section className="bg-dykes-black py-16 md:py-24 px-4">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-2">
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
                  <span className="text-dykes-silver font-bold mt-0.5">✓</span>
                  <span className="text-dykes-gray-100">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/catalog"
              className="inline-block mt-8 bg-white text-dykes-black font-bold px-8 py-3 rounded-md hover:bg-dykes-gray-100 transition-colors"
            >
              Shop the Lineup →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {explore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative aspect-square overflow-hidden rounded-lg block"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <span className="absolute bottom-3 left-3 right-3 text-white font-bold text-sm md:text-base leading-tight drop-shadow">
                  {item.label} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Build Your Ferris — interactive configurator */}
      <BuildYourFerris />

      {/* 6. Mow time calculator */}
      <MowCalculator />

      {/* 7. Feels Like a Day of Work */}
      <DayOfWorkGallery />

      {/* 8. Watch the Film */}
      <WatchTheFilm />

      {/* 9. Dealer Story */}
      <DealerStory />

      {/* 10. About / Team */}
      <HomeAboutTeam />

      {/* 11. Mower Tips */}
      {recentPosts.length > 0 && (
        <section className="bg-dykes-gray-900 py-16 px-4 border-t border-dykes-gray-700">
          <div className="max-w-[1280px] mx-auto">
            <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-2">
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
                  <span className="text-xs text-dykes-silver font-semibold uppercase tracking-widest mb-3">
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
              <Link href="/blog" className="text-white font-semibold hover:text-dykes-silver transition-colors">
                View All Posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 12. Final CTA — replaces "Take the Quiz" */}
      <section className="bg-dykes-black text-white py-16 md:py-20 px-4 border-t border-dykes-gray-700">
        <div className="max-w-3xl mx-auto text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ferris-logo.png" alt="Ferris" className="h-6 w-auto mx-auto mb-4 opacity-70" />
          <p className="text-dykes-gray-300 text-sm font-semibold tracking-widest uppercase mb-3">
            Ride It. Feel It. Own It.
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
          >
            Come sit on a Ferris in Collins.
          </h2>
          <p className="text-dykes-gray-300 mb-8 max-w-xl mx-auto">
            The suspension is what sells these mowers — pictures can&apos;t do it. Schedule a no-pressure demo, ride it across our back lot, and decide for yourself.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-white text-dykes-black text-lg font-bold px-10 py-4 rounded-md hover:bg-dykes-gray-100 transition-colors"
            >
              Schedule My Demo
            </Link>
            <a
              href="tel:6019095380"
              className="inline-block border-2 border-white text-white text-lg font-bold px-10 py-4 rounded-md hover:bg-white hover:text-dykes-black transition-colors"
            >
              Call Sales · (601) 909-5380
            </a>
          </div>
          <p className="text-dykes-gray-500 text-sm mt-4">
            3069 Hwy 49, Collins, MS · Mon–Fri 9–6 · Sat 9–2
          </p>
        </div>
      </section>

      <HomepageStickyCTA />
    </>
  );
}
