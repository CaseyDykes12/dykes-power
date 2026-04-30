import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import HomepageStickyCTA from '@/components/HomepageStickyCTA';
import FerrisHero from '@/components/campaign/FerrisHero';
import WhyWeCarryFerris from '@/components/campaign/WhyWeCarryFerris';
import MowCalculator from '@/components/MowCalculator';
import WatchTheFilm from '@/components/campaign/WatchTheFilm';
import DealerStory from '@/components/campaign/DealerStory';
import DayOfWorkGallery from '@/components/campaign/DayOfWorkGallery';
import HomeAboutTeam from '@/components/HomeAboutTeam';
import BuildYourFerris from '@/components/BuildYourFerris';
import CategoryBrowser from '@/components/CategoryBrowser';

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  const explore: { href: string; label: string; image: string }[] = [
    { href: '/parts', label: 'Genuine Parts', image: 'https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Zero%20Turn%20Mowers/ISX800/Product%20Images/FER_ISX800_FL-PDP.jpg' },
    { href: '/service', label: 'Service & Repair', image: 'https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Stand-On%20Mowers/Z3/Product%20Images/FER_PDP_SRSZ3X_Hero_FL.jpg' },
    { href: '/financing', label: 'Financing 4.9% APR', image: 'https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Zero%20Turn%20Mowers/500/Product%20Images/FER_Products_500S.jpg' },
    { href: '/catalog', label: 'Full Catalog', image: 'https://www.ferrismowers.com/hubfs/Website%20Migration%202025/Ferris/Images/Products/Zero%20Turn%20Mowers/IS600/Product%20Images/FER_PDP_IS600_Hero_FR.jpg' },
  ];

  return (
    <>
      {/* Financing banner */}
      <div className="bg-red-600 text-white text-center text-xs md:text-sm font-semibold tracking-widest uppercase py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4">
        <span>Financing as low as 4.9% APR up to 84 months for qualified credit</span>
        <Link
          href="/financing"
          className="inline-block bg-white text-red-600 font-bold tracking-wider px-4 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          Get Pre-Approved →
        </Link>
      </div>

      {/* 1. Hero */}
      <FerrisHero />

      {/* 10-year suspension warranty band */}
      <Link
        href="/warranty"
        className="block bg-ferris-yellow text-dykes-black text-center text-sm md:text-base font-bold py-3 px-4 hover:bg-ferris-yellow-dark transition-colors"
      >
        <span className="tracking-widest uppercase">10-Year Suspension Warranty</span>
        <span className="mx-2 opacity-60">·</span>
        <span className="font-semibold">Standard on our core Ferris lineup</span>
        <span className="ml-2 underline decoration-dotted">See coverage →</span>
      </Link>

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

      {/* 3. Find Your Ferris — category browser */}
      <CategoryBrowser />

      {/* 3b. Mid-page CTA — give shoppers a fast path to a quote without scrolling 12 sections */}
      <section className="bg-ferris-yellow text-dykes-black py-12 md:py-14 px-4 border-y-4 border-dykes-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-black mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            Ready to talk to us?
          </h2>
          <p className="text-base md:text-lg mb-6 text-dykes-black/80 max-w-xl mx-auto">
            Real pricing, real people, no pressure. Tell us what you need and we'll get back fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-block bg-dykes-black text-white text-base md:text-lg font-bold px-8 py-3 md:py-4 rounded-md hover:bg-dykes-gray-900 transition-colors shadow-md"
            >
              Schedule a Demo →
            </Link>
            <a
              href="tel:6019095380"
              className="inline-block border-2 border-dykes-black text-dykes-black text-base md:text-lg font-bold px-8 py-3 md:py-4 rounded-md hover:bg-dykes-black hover:text-white transition-colors"
            >
              Call (601) 909-5380
            </a>
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

      {/* 10b. Customer Reviews */}
      <section className="bg-dykes-black py-16 md:py-20 px-4 border-t border-dykes-gray-700">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-2">
            What customers are saying
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold mb-8 text-white"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
          >
            Real reviews from real customers.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-dykes-gray-900 border border-dykes-gray-700 rounded-xl p-6 md:p-7">
              <div className="flex items-center gap-2 mb-3 text-ferris-yellow text-lg" aria-label="5 out of 5 stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <blockquote className="text-dykes-gray-100 text-base md:text-lg leading-relaxed mb-4">
                &ldquo;I had the best experience at Dykes Motors. Everyone was so helpful and so attentive. I highly recommend!!&rdquo;
              </blockquote>
              <p className="text-dykes-silver text-sm">
                <span className="text-white font-semibold">Natalie C.</span> · Verified Facebook review
              </p>
            </article>
            <article className="bg-dykes-gray-900 border border-dykes-gray-700 rounded-xl p-6 md:p-7">
              <div className="flex items-center gap-2 mb-3 text-ferris-yellow text-lg" aria-label="5 out of 5 stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <blockquote className="text-dykes-gray-100 text-base md:text-lg leading-relaxed mb-4">
                &ldquo;Thanks so much for guiding me through my purchase. Your knowledge and excellent service made my purchase a joy and a blessing.&rdquo;
              </blockquote>
              <p className="text-dykes-silver text-sm">
                <span className="text-white font-semibold">Nelda D.</span> · Verified Facebook review
              </p>
            </article>
            <article className="bg-dykes-gray-900 border border-dykes-gray-700 rounded-xl p-6 md:p-7">
              <div className="flex items-center gap-2 mb-3 text-ferris-yellow text-lg" aria-label="5 out of 5 stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <blockquote className="text-dykes-gray-100 text-base md:text-lg leading-relaxed mb-4">
                &ldquo;They were very easy to work with, and provided the best sales and service. We will absolutely do business with them again!&rdquo;
              </blockquote>
              <p className="text-dykes-silver text-sm">
                <span className="text-white font-semibold">Jennifer S.</span> · Verified Facebook review
              </p>
            </article>
          </div>
          <p className="text-dykes-gray-400 text-sm mt-6">
            Reviews pulled from our verified Google and Facebook profiles.{' '}
            <a
              href="https://www.google.com/search?q=Dykes+Motors+Power+Equipment+Collins+MS"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-dykes-silver"
            >
              Read more on Google →
            </a>
          </p>
        </div>
      </section>

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
