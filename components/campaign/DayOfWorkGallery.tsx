import Image from 'next/image';

type Shot = {
  src: string;
  alt: string;
  caption: string;
  span?: 'col-span-2' | 'row-span-2' | 'col-span-2 row-span-2';
};

const SHOTS: Shot[] = [
  {
    src: '/images/ferris/campaign/lifestyle-crew.webp',
    alt: 'Ferris zero-turn at sunset with operator walking up',
    caption: 'Dawn to dusk. Every day.',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/images/ferris/campaign/lifestyle-precision.webp',
    alt: 'Clean stripe lines left by a Ferris mower',
    caption: 'Lines like a ruler.',
  },
  {
    src: '/images/ferris/campaign/lifestyle-comfort.webp',
    alt: 'Operator comfort on rough terrain with Ferris suspension',
    caption: 'Rough ground, smooth ride.',
  },
  {
    src: '/images/ferris/campaign/lifestyle-confidence.webp',
    alt: 'Full Ferris lineup — zero-turn, stand-on, walk-behind',
    caption: 'The full lineup.',
  },
  {
    src: '/images/ferris/campaign/section-background.webp',
    alt: 'Ferris independent suspension shock detail',
    caption: 'Shock by shock.',
  },
  {
    src: '/images/ferris/campaign/lifestyle-homeowner.webp',
    alt: 'Homeowner on a Ferris mowing a private acreage',
    caption: 'From your yard to their property.',
  },
];

export default function DayOfWorkGallery() {
  return (
    <section
      id="day-of-work"
      className="bg-dykes-black py-16 md:py-24 px-4 md:px-8"
      aria-labelledby="day-of-work-heading"
    >
      <div className="max-w-[1280px] mx-auto">
        <p className="text-ferris-yellow text-sm font-semibold tracking-widest uppercase mb-2">
          Feels like a day of work
        </p>
        <h2
          id="day-of-work-heading"
          className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.01em' }}
        >
          Mississippi acres. Real crews.
        </h2>
        <p className="text-dykes-gray-300 text-base md:text-lg mb-10 max-w-2xl">
          What a Ferris looks like in the hands of someone who actually uses one.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[180px] gap-3 md:gap-4">
          {SHOTS.map((shot, i) => (
            <figure
              key={shot.src}
              className={`relative overflow-hidden rounded-xl border border-dykes-gray-700 group ${
                shot.span ?? ''
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes={
                  shot.span?.includes('col-span-2')
                    ? '(max-width: 768px) 100vw, 50vw'
                    : '(max-width: 768px) 50vw, 25vw'
                }
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
              />
              <figcaption className="absolute bottom-2 left-3 right-3 text-white text-xs md:text-sm font-semibold drop-shadow-lg">
                {shot.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-dykes-gray-500 text-xs mt-6">
          Photography from the Feels Like a Ferris<sup className="text-[9px]">®</sup> national campaign.
        </p>
      </div>
    </section>
  );
}
