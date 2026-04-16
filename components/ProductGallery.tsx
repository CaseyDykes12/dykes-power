'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);

  const validImages = images.filter((_, i) => !imgError[i]);
  const displayImages = validImages.length > 0 ? validImages : images;
  const activeIdx = Math.min(active, displayImages.length - 1);

  const isExternal = (src: string) => src.startsWith('http');

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — fills viewport on mobile, contained on desktop */}
      <div className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-gray-800 group aspect-[4/3] sm:aspect-auto"
        style={{ minHeight: '320px', maxHeight: '600px' }}
      >
        <Image
          key={activeIdx}
          src={displayImages[activeIdx]}
          alt={`${alt} — photo ${activeIdx + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4 sm:p-6"
          priority={activeIdx === 0}
          onError={() => setImgError((prev) => ({ ...prev, [active]: true }))}
          {...(isExternal(displayImages[activeIdx]) ? { unoptimized: false } : {})}
        />

        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
          {activeIdx + 1} / {displayImages.length}
        </div>

        {/* Arrow nav — always visible on mobile (no hover), hover on desktop */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/90 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity border border-gray-700"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/90 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity border border-gray-700"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip — scrollable, bigger on mobile */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={`shrink-0 w-20 h-16 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                i === activeIdx
                  ? 'border-[#C8C8C8] opacity-100'
                  : 'border-gray-800 opacity-50 hover:opacity-80 hover:border-gray-600'
              }`}
            >
              <Image
                src={img}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
