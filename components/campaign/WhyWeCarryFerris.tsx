'use client';

import Image from 'next/image';
import StatTile from './StatTile';

export default function WhyWeCarryFerris() {
  return (
    <section
      id="why-we-carry-ferris"
      className="bg-dykes-black py-16 md:py-24 px-4 md:px-8"
      aria-labelledby="why-we-carry-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
          <div>
            <h2
              id="why-we-carry-heading"
              className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
            >
              Why We Carry Ferris.
            </h2>
            <div className="text-dykes-gray-100 text-lg md:text-xl leading-relaxed border-l-2 border-ferris-yellow pl-4">
              <p>
                Ferris invented the suspension mower — independent shocks on all four corners.
                Nobody else comes close. That&apos;s why we carry them. When you&apos;re running
                a crew in Mississippi heat, your mower has to work as hard as you do.
              </p>
            </div>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden bg-dykes-gray-900 border border-dykes-gray-700">
            <Image
              src="/images/ferris/campaign/lifestyle-confidence.webp"
              alt="Full Ferris lineup — commercial zero-turn, stand-on, and walk-behind"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <StatTile
            value="73%"
            label="reduction in whole-body vibration vs. rigid-frame competitors"
            isNumeric
            targetNumber={73}
            suffix="%"
          />
          <StatTile
            value="4-wheel"
            label="independent suspension, front to back"
          />
          <StatTile
            value="0"
            label="compromise on cut quality, on any terrain"
          />
        </div>

        <p className="text-dykes-gray-500 text-xs mt-6 text-center md:text-left">
          Statistics from Ferris Commercial Mowers R&amp;D.
        </p>
      </div>
    </section>
  );
}
