'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Use = 'home' | 'side' | 'pro';
type Terrain = 'flat' | 'rolling' | 'rough';

type Pick = {
  series: string;
  sku: string;
  blurb: string;
  startsAt: number;
  href: string;
};

const PICKS: Record<Use, Record<Terrain, Pick>> = {
  home: {
    flat: {
      series: 'Ferris 400S Series',
      sku: '5902101',
      blurb: 'Entry zero-turn for clean residential lots — quiet, simple, easy to live with.',
      startsAt: 5499,
      href: '/product/5902101',
    },
    rolling: {
      series: 'Ferris IS® 600 Series',
      sku: '5902110',
      blurb: 'Independent suspension means rolling Mississippi yards stop beating you up.',
      startsAt: 7899,
      href: '/product/5902110',
    },
    rough: {
      series: 'Ferris IS® 600 Series',
      sku: '5901908',
      blurb: 'Patented suspension on Kawasaki power — built to chew up rough back acres.',
      startsAt: 8449,
      href: '/product/5901908',
    },
  },
  side: {
    flat: {
      series: 'Ferris ISX™ 800 Series',
      sku: '5902154',
      blurb: 'Step-up commercial deck so a side hustle pays itself off faster.',
      startsAt: 10699,
      href: '/product/5902154',
    },
    rolling: {
      series: 'Ferris ISX™ 800 Series',
      sku: '5902075',
      blurb: '60" deck + Ferris suspension — chew through neighborhood routes without fatigue.',
      startsAt: 10899,
      href: '/product/5902075',
    },
    rough: {
      series: 'Ferris ISX™ 2200 Series',
      sku: '5902159',
      blurb: 'ForeFront™ suspension and Kawasaki EVO power — handles rough commercial properties all day.',
      startsAt: 13449,
      href: '/product/5902159',
    },
  },
  pro: {
    flat: {
      series: 'Ferris ISX™ 2200 Series',
      sku: '5902157',
      blurb: 'Vanguard EFI + iCD™+ 2-belt cutting system — fast, fuel-efficient, full-day uptime.',
      startsAt: 13699,
      href: '/product/5902157',
    },
    rolling: {
      series: 'Ferris ISX™ 2200 Series',
      sku: '5902078',
      blurb: '60" Vanguard with ForeFront™ suspension — Ferris\'s premium platform for crews.',
      startsAt: 14499,
      href: '/product/5902078',
    },
    rough: {
      series: 'Ferris ISX™ 3300 Series',
      sku: '5902065',
      blurb: 'Top-tier Kawasaki EFI suspension platform — built for the toughest commercial routes.',
      startsAt: 18649,
      href: '/product/5902065',
    },
  },
};

const USE_LABEL: Record<Use, string> = {
  home: 'Around the house',
  side: 'Side hustle',
  pro: 'Full-time crew',
};

const TERRAIN_LABEL: Record<Terrain, string> = {
  flat: 'Flat & open',
  rolling: 'Rolling hills',
  rough: 'Rough & uneven',
};

export default function BuildYourFerris() {
  const [use, setUse] = useState<Use>('home');
  const [terrain, setTerrain] = useState<Terrain>('rolling');
  const [acres, setAcres] = useState(3);

  const pick = useMemo(() => PICKS[use][terrain], [use, terrain]);

  // crude time-saved estimate vs a 42" residential mower at ~3 mph
  const baselineHours = (acres * 0.85).toFixed(1);
  const ferrisHours = (acres * 0.42).toFixed(1);

  return (
    <section className="bg-gradient-to-b from-dykes-black via-dykes-gray-900 to-dykes-black py-16 md:py-24 px-4 border-y border-dykes-gray-700">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-10">
          <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-2">
            Build Your Ferris
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
          >
            One question at a time. Real answer in seconds.
          </h2>
          <p className="text-dykes-gray-300 max-w-2xl mx-auto">
            Tell us how you mow. We&apos;ll narrow the lineup down to the one that fits your work — no quiz, no email gate, no waiting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Inputs */}
          <div className="bg-[#0d0d0d] border border-dykes-gray-700 rounded-xl p-6 md:p-8 space-y-7">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-dykes-silver font-semibold mb-3">
                1 · How will you use it?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(USE_LABEL) as Use[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUse(u)}
                    className={`text-xs sm:text-sm font-semibold py-3 px-2 rounded-md border transition-colors ${
                      use === u
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-dykes-gray-300 border-dykes-gray-700 hover:border-dykes-gray-300'
                    }`}
                  >
                    {USE_LABEL[u]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-widest text-dykes-silver font-semibold mb-3">
                2 · What does the ground look like?
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(TERRAIN_LABEL) as Terrain[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTerrain(t)}
                    className={`text-xs sm:text-sm font-semibold py-3 px-2 rounded-md border transition-colors ${
                      terrain === t
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-dykes-gray-300 border-dykes-gray-700 hover:border-dykes-gray-300'
                    }`}
                  >
                    {TERRAIN_LABEL[t]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-3">
                <p className="text-[11px] uppercase tracking-widest text-dykes-silver font-semibold">
                  3 · How many acres?
                </p>
                <p className="text-white font-bold text-lg">{acres} acre{acres === 1 ? '' : 's'}</p>
              </div>
              <input
                type="range"
                min={0.5}
                max={30}
                step={0.5}
                value={acres}
                onChange={(e) => setAcres(parseFloat(e.target.value))}
                className="w-full accent-[#D4AF37]"
                aria-label="Acres to mow"
              />
              <div className="flex justify-between text-[10px] text-dykes-gray-500 mt-1.5 font-mono">
                <span>0.5</span>
                <span>5</span>
                <span>10</span>
                <span>20</span>
                <span>30+</span>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white text-dykes-black rounded-xl p-6 md:p-8 flex flex-col">
            <p className="text-[11px] uppercase tracking-widest text-dykes-gray-700 font-bold mb-1">
              Your match
            </p>
            <h3
              className="text-3xl md:text-4xl font-bold leading-tight mb-2"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
            >
              {pick.series}
            </h3>
            <p className="text-dykes-gray-700 mb-5">{pick.blurb}</p>

            <div className="grid grid-cols-2 gap-3 mb-6 text-center">
              <div className="bg-dykes-gray-100/50 rounded-lg py-3 px-2">
                <p className="text-[10px] uppercase tracking-wider text-dykes-gray-700 font-semibold">Starts at</p>
                <p className="text-2xl font-bold text-dykes-black">${pick.startsAt.toLocaleString()}</p>
              </div>
              <div className="bg-dykes-gray-100/50 rounded-lg py-3 px-2">
                <p className="text-[10px] uppercase tracking-wider text-dykes-gray-700 font-semibold">Mow time</p>
                <p className="text-2xl font-bold text-dykes-black">~{ferrisHours} hr</p>
                <p className="text-[10px] text-dykes-gray-700">vs ~{baselineHours} hr on a 42" residential</p>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-2">
              <Link
                href={pick.href}
                className="flex-1 bg-dykes-black text-white text-center font-bold px-5 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                See This Mower
              </Link>
              <Link
                href="/contact"
                className="flex-1 border-2 border-dykes-black text-dykes-black text-center font-bold px-5 py-3 rounded-md hover:bg-dykes-black hover:text-white transition-colors"
              >
                Schedule a Demo
              </Link>
            </div>
            <p className="text-[10px] text-dykes-gray-700 mt-3">
              Mow-time estimate compares Ferris cutting width and ForeFront™-class speed against a 42" residential mower at typical ground speed. Real-world results depend on terrain and obstacles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
