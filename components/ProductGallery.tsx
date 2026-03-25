'use client';
import { useState, useCallback } from 'react';

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

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative bg-[#0a0a0a] rounded-2xl overflow-hidden border border-gray-800 group"
        style={{ minHeight: '480px', maxHeight: '600px' }}
      >
        <div className="absolute inset-0 flex items-center justify-center p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={activeIdx}
            src={displayImages[activeIdx]}
            alt={`${alt} — photo ${activeIdx + 1}`}
            className="max-h-full max-w-full object-contain transition-opacity duration-200"
            onError={() => setImgError((prev) => ({ ...prev, [active]: true }))}
          />
        </div>

        {/* Counter */}
        <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
          {activeIdx + 1} / {displayImages.length}
        </div>

        {/* Arrow nav */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/90 text-white rounded-full w-10 h-10 flex items-center justify-center text-xl opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View photo ${i + 1}`}
              className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIdx
                  ? 'border-[#C8C8C8] opacity-100'
                  : 'border-gray-800 opacity-50 hover:opacity-80 hover:border-gray-600'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${alt} thumbnail ${i + 1}`}
                className="w-full h-full object-cover bg-[#111]"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
