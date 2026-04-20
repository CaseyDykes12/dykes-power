'use client';

import { useState, useMemo } from 'react';
import {
  FERRIS_SPECS,
  hoursFor,
  formatHours,
  topRecommendedFor,
} from '@/lib/mow-calculator/ferris-specs';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const MIN_ACRES = 0.5;
const MAX_ACRES = 50;
const STEP = 0.5;

export default function MowCalculator() {
  const [acres, setAcres] = useState<number>(5);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const results = useMemo(() => {
    return FERRIS_SPECS.map((spec) => ({
      spec,
      hours: hoursFor(spec, acres),
    })).sort((a, b) => a.hours - b.hours);
  }, [acres]);

  const recommended = useMemo(() => topRecommendedFor(acres), [acres]);

  const handleCalculate = () => {
    setSubmitted(true);
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'mow_calculator_submit', {
        acres,
        top_recommended_model: recommended.name,
      });
    }
  };

  const scrollToLineup = () => {
    const el = document.getElementById('popular-models');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="your-property"
      className="bg-dykes-gray-900 py-16 md:py-24 px-4 md:px-8"
      aria-labelledby="your-property-heading"
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-dykes-silver text-sm font-semibold tracking-widest uppercase mb-2">
          Your Property
        </p>
        <h2
          id="your-property-heading"
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          How long would your place take on a Ferris?
        </h2>
        <p className="text-dykes-gray-300 text-base md:text-lg mb-8 max-w-2xl">
          Move the slider to your property size. We&apos;ll show you real mow times for
          every Ferris we carry. No address. No email. Just the numbers.
        </p>

        <div className="bg-dykes-black rounded-xl p-6 md:p-10 border border-dykes-gray-700">
          <label htmlFor="acres-slider" className="block mb-4">
            <span className="text-white text-lg md:text-xl font-semibold block mb-1">
              Property size
            </span>
            <span className="text-dykes-silver text-4xl md:text-5xl font-bold tabular-nums">
              {acres.toFixed(1)}
            </span>
            <span className="text-dykes-gray-300 text-lg ml-2">acres</span>
          </label>

          <input
            id="acres-slider"
            type="range"
            min={MIN_ACRES}
            max={MAX_ACRES}
            step={STEP}
            value={acres}
            onChange={(e) => setAcres(parseFloat(e.target.value))}
            aria-label={`Property size in acres, currently ${acres.toFixed(1)}`}
            className="w-full h-2 bg-dykes-gray-700 rounded-lg appearance-none cursor-pointer accent-ferris-yellow"
          />

          <div className="flex justify-between text-dykes-gray-500 text-xs mt-2 mb-8">
            <span>½ ac</span>
            <span>10 ac</span>
            <span>25 ac</span>
            <span>50 ac</span>
          </div>

          {!submitted ? (
            <button
              type="button"
              onClick={handleCalculate}
              className="w-full md:w-auto bg-white text-dykes-black font-bold py-3 px-8 rounded-md hover:bg-dykes-gray-100 transition-colors"
            >
              Show me the numbers →
            </button>
          ) : (
            <div className="mt-2">
              <p className="text-white text-lg mb-6">
                Your property is approximately{' '}
                <strong className="text-dykes-silver">{acres.toFixed(1)} acres</strong>.
                Here&apos;s how each Ferris stacks up:
              </p>

              <ul className="space-y-3 mb-8">
                {results.map(({ spec, hours }) => {
                  const isTop = spec.sku === recommended.sku;
                  return (
                    <li
                      key={spec.sku}
                      className={`flex items-center justify-between gap-4 p-4 rounded-lg border ${
                        isTop
                          ? 'border-ferris-yellow bg-dykes-gray-900'
                          : 'border-dykes-gray-700 bg-dykes-gray-900'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold truncate">
                          {spec.name}
                          {isTop && (
                            <span className="ml-2 text-dykes-silver text-xs font-bold tracking-wider uppercase">
                              Best Match
                            </span>
                          )}
                        </p>
                        <p className="text-dykes-gray-300 text-sm">
                          {spec.deckInches}&quot; deck · {spec.mowSpeedMph} mph
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-white text-xl md:text-2xl font-bold tabular-nums">
                          {formatHours(hours)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                type="button"
                onClick={scrollToLineup}
                className="w-full md:w-auto bg-white text-dykes-black font-bold py-3 px-8 rounded-md hover:bg-dykes-gray-100 transition-colors"
              >
                See these mowers in Collins →
              </button>

              <p className="text-dykes-gray-500 text-xs mt-6 max-w-xl">
                Estimates use standard industry math: deck width × ground speed × 80–85%
                overlap efficiency. Real-world time varies with terrain, grass height, and
                obstacles. Call Casey at <a href="tel:6019095380" className="underline">(601)
                641-5475</a> for a property walk-through.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
