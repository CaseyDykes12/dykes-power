'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Engine = 'briggs' | 'kawasaki';

type Variant = {
  sku: string;
  deck: string;
  price: number;
  msrp: number;
  hp: string;
  image: string;
};

type Series = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  engineLabels: Record<Engine, string>;
  variants: Record<Engine, Variant[]>;
};

const SERIES: Series[] = [
  {
    id: 'is600',
    name: 'Ferris IS® 600 Series',
    tag: 'Suspension Comfort',
    blurb: "Ferris's patented independent suspension at the most accessible price point — same ride, smaller deck.",
    engineLabels: {
      briggs: 'Briggs & Stratton CXi · 25 hp',
      kawasaki: 'Kawasaki FS Series',
    },
    variants: {
      briggs: [
        { sku: '5902110', deck: '48"', price: 7899, msrp: 8689, hp: '25 hp', image: '/images/ferris/lot/is600-lot.jpg' },
        { sku: '5902109', deck: '52"', price: 8099, msrp: 8909, hp: '25 hp', image: '/images/ferris/lot/is600-lot.jpg' },
      ],
      kawasaki: [
        { sku: '5901908', deck: '48"', price: 8449, msrp: 9294, hp: '18.5 hp', image: '/images/ferris/basco/5901908/5901908_FER_IS600Z_Studio_FL.jpg' },
        { sku: '5901911', deck: '52"', price: 8749, msrp: 9624, hp: '25 hp', image: '/images/ferris/basco/5901908/5901908_FER_IS600Z_Studio_FL.jpg' },
      ],
    },
  },
  {
    id: 'isx800',
    name: 'Ferris ISX™ 800 Series',
    tag: 'Pro Workhorse',
    blurb: 'Hydro-Gear ZT-3400 transaxles, ForeFront™ suspension, and a deck built for full-time crews.',
    engineLabels: {
      briggs: 'Briggs & Stratton CXi · 24 hp',
      kawasaki: 'Kawasaki FT730V · 24 hp',
    },
    variants: {
      briggs: [
        { sku: '5902154', deck: '52"', price: 10699, msrp: 11769, hp: '24 hp', image: '/images/ferris/basco/5902154/5902154_FER_ISX800_L_Final.jpg' },
        { sku: '5902075', deck: '60"', price: 10899, msrp: 11989, hp: '24 hp', image: '/images/ferris/basco/5902154/5902154_FER_ISX800_L_Final.jpg' },
      ],
      kawasaki: [
        { sku: '5902155', deck: '52"', price: 10899, msrp: 11989, hp: '24 hp', image: '/images/ferris/basco/5902154/5902154_FER_ISX800_L_Final.jpg' },
        { sku: '5902073', deck: '60"', price: 11499, msrp: 12648, hp: '24 hp', image: '/images/ferris/basco/5902154/5902154_FER_ISX800_L_Final.jpg' },
      ],
    },
  },
  {
    id: 'isx2200',
    name: 'Ferris ISX™ 2200 Series',
    tag: 'Top of the Line',
    blurb: 'ForeFront™ suspension, ZT-5400 drive, and the iCD™+ 2-belt cutting system. Premium platform, premium power.',
    engineLabels: {
      briggs: 'Vanguard™ 810cc EFI · 31 hp',
      kawasaki: 'Kawasaki FX781V EVO · 27 hp',
    },
    variants: {
      briggs: [
        { sku: '5902157', deck: '52"', price: 13699, msrp: 15069, hp: '31 hp', image: '/images/ferris/basco/5902078/5902078_FER_ISX2200_FL_FINAL.jpg' },
        { sku: '5902078', deck: '60"', price: 14499, msrp: 15949, hp: '31 hp', image: '/images/ferris/basco/5902078/5902078_FER_ISX2200_FL_FINAL.jpg' },
      ],
      kawasaki: [
        { sku: '5902159', deck: '52"', price: 13449, msrp: 14794, hp: '27 hp', image: '/images/ferris/basco/5902078/5902078_FER_ISX2200_FL_FINAL.jpg' },
        { sku: '5902180', deck: '60"', price: 14099, msrp: 15509, hp: '27 hp', image: '/images/ferris/basco/5902078/5902078_FER_ISX2200_FL_FINAL.jpg' },
      ],
    },
  },
];

function monthlyFrom(price: number) {
  const r = 0.049 / 12;
  const n = 72;
  return Math.ceil((price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
}

function SeriesCard({ series }: { series: Series }) {
  const [engine, setEngine] = useState<Engine>('briggs');
  const [deckIdx, setDeckIdx] = useState(0);

  const variants = series.variants[engine];
  const variant = variants[Math.min(deckIdx, variants.length - 1)];

  const handleEngineChange = (next: Engine) => {
    setEngine(next);
    setDeckIdx(0);
  };

  const photoBg = 'bg-white';
  const isBriggs = engine === 'briggs';
  const engineLabel = series.engineLabels[engine];

  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl overflow-hidden flex flex-col">
      <div className={`relative h-64 sm:h-56 transition-colors ${photoBg}`}>
        <span className="absolute top-3 left-3 z-10 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 rounded">
          {series.tag}
        </span>
        <Image
          key={variant.sku}
          src={variant.image}
          alt={`${series.name} ${variant.deck} — ${engineLabel}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-4"
        />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base leading-tight text-white mb-1">{series.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{engineLabel}</p>

        <div className="mb-3">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1.5">Engine</p>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleEngineChange('briggs')}
              className={`text-xs font-semibold py-2 rounded-md border transition-colors ${
                isBriggs
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-400'
              }`}
              aria-pressed={isBriggs}
            >
              Briggs
            </button>
            <button
              type="button"
              onClick={() => handleEngineChange('kawasaki')}
              className={`text-xs font-semibold py-2 rounded-md border transition-colors ${
                !isBriggs
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-400'
              }`}
              aria-pressed={!isBriggs}
            >
              Kawasaki
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold mb-1.5">Deck size</p>
          <div className="flex gap-1.5">
            {variants.map((v, i) => (
              <button
                key={v.sku}
                type="button"
                onClick={() => setDeckIdx(i)}
                className={`flex-1 text-xs font-semibold py-2 rounded-md border transition-colors ${
                  i === deckIdx
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-transparent text-gray-300 border-gray-600 hover:border-gray-400'
                }`}
                aria-pressed={i === deckIdx}
              >
                {v.deck}
              </button>
            ))}
          </div>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{series.blurb}</p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
          <div>
            {variant.msrp && variant.msrp !== variant.price && (
              <p className="text-gray-500 text-xs line-through">MSRP ${variant.msrp.toLocaleString()}</p>
            )}
            <p className="font-bold text-lg text-white">${variant.price.toLocaleString()}</p>
            <p className="text-[#C8C8C8] text-xs font-semibold">Dykes Motors Price</p>
            <p className="text-gray-500 text-xs">from ${monthlyFrom(variant.price).toLocaleString()}/mo*</p>
          </div>
          <Link
            href={`/product/${variant.sku}`}
            className="btn-primary text-sm py-2 px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedSeries() {
  const series = useMemo(() => SERIES, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {series.map((s) => (
        <SeriesCard key={s.id} series={s} />
      ))}
    </div>
  );
}
