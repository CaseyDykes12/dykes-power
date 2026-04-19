'use client';

import { useState } from 'react';

const FILM_YOUTUBE_ID = ''; // TODO: paste unlisted YouTube ID once Casey uploads the 30-sec spot

export default function WatchTheFilm() {
  const [playing, setPlaying] = useState(false);

  const hasFilm = FILM_YOUTUBE_ID.length > 0;

  return (
    <section
      id="watch-the-film"
      className="bg-dykes-black py-16 md:py-24 px-4 md:px-8"
      aria-labelledby="watch-the-film-heading"
    >
      <div className="max-w-[1280px] mx-auto text-center">
        <p className="text-dykes-gray-300 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          Ferris® National Campaign
        </p>
        <h2
          id="watch-the-film-heading"
          className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
        >
          Feels Like a Ferris.
        </h2>
        <p className="text-dykes-gray-300 text-sm md:text-base mb-10">
          Campaign by Ferris Commercial Mowers · Proudly shown by Dykes Motors
        </p>

        <div className="relative aspect-video rounded-xl overflow-hidden bg-dykes-gray-900 border border-dykes-gray-700 max-w-5xl mx-auto">
          {hasFilm && playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${FILM_YOUTUBE_ID}?autoplay=1&rel=0`}
              title="Feels Like a Ferris — 30-second national spot"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => hasFilm && setPlaying(true)}
              disabled={!hasFilm}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-cover bg-center disabled:cursor-not-allowed"
              style={{ backgroundImage: 'url(/images/ferris/lot/isx800-lot-3.jpg)' }}
              aria-label={hasFilm ? 'Play the Feels Like a Ferris 30-second film' : 'Film coming soon'}
            >
              <span className="absolute inset-0 bg-black/60" />
              <span className="relative z-10 flex flex-col items-center gap-3">
                <span className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-dykes-black ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span className="text-white text-sm font-semibold tracking-widest uppercase">
                  {hasFilm ? 'Play the Film · 0:30' : 'Film coming soon'}
                </span>
              </span>
            </button>
          )}
        </div>

        <p className="text-dykes-gray-300 text-base md:text-lg mt-10 font-semibold">
          Come feel it in Collins.
        </p>
        <a
          href="/contact"
          className="inline-block mt-4 bg-white text-dykes-black font-bold px-8 py-3 rounded-md hover:bg-dykes-gray-100 transition-colors"
        >
          Schedule a Demo →
        </a>
      </div>
    </section>
  );
}
