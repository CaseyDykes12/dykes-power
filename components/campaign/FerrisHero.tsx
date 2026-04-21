'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';

const PORTRAIT_QUERY = '(max-width: 767px)';

function subscribePortrait(callback: () => void) {
  const mq = window.matchMedia(PORTRAIT_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function getPortraitSnapshot() {
  return window.matchMedia(PORTRAIT_QUERY).matches;
}

function serverSnapshotFalse() {
  return false;
}

export default function FerrisHero() {
  const isPortrait = useSyncExternalStore(
    subscribePortrait,
    getPortraitSnapshot,
    serverSnapshotFalse
  );

  const videoBase = isPortrait
    ? '/videos/ferris/campaign/landscaper-15s-portrait'
    : '/videos/ferris/campaign/landscaper-15s';

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    tryPlay();
    const onVisible = () => {
      if (document.visibilityState === 'visible') tryPlay();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [videoBase]);

  const scrollToFilm = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('watch-the-film');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative bg-dykes-black text-white overflow-hidden min-h-[88vh] flex items-center">
      <video
        key={videoBase}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/ferris/campaign/isx3300-fr.webp"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
        aria-hidden="true"
      >
        <source src={`${videoBase}.webm`} type="video/webm" />
        <source src={`${videoBase}.mp4`} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"
      />

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
                Power Equipment · Collins, MS
              </p>
            </div>
          </div>

          <h1
            className="text-5xl md:text-7xl font-black leading-[0.95] mb-6 text-white"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
          >
            Built for Mississippi Acres.<br />
            <span className="text-dykes-gray-100">Backed by Dykes Motors.</span>
          </h1>

          <p className="text-dykes-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
            Authorized Ferris<sup className="text-sm">®</sup> Dealer · Collins, Mississippi.
            Commercial zero-turns, stand-ons, and walk-behinds with real service behind every sale.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              href="/catalog"
              className="bg-white text-dykes-black font-bold px-8 py-3 rounded-md hover:bg-dykes-gray-100 transition-colors"
            >
              Shop the Lineup
            </Link>
            <a
              href="#watch-the-film"
              onClick={scrollToFilm}
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-md hover:bg-white hover:text-dykes-black transition-colors"
            >
              Watch the Film
            </a>
          </div>

          <div className="flex items-center gap-2 text-sm text-dykes-gray-300 border-l-2 border-ferris-yellow pl-3">
            <span className="italic">Now carrying the new Ferris<sup className="text-xs">®</sup> national campaign:</span>
            <strong className="text-white not-italic">Feels Like a Ferris.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
