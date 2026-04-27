'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const lightboxImgRef = useRef<HTMLImageElement | null>(null);

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);

  const validImages = images.filter((_, i) => !imgError[i]);
  const displayImages = validImages.length > 0 ? validImages : images;
  const activeIdx = Math.min(active, displayImages.length - 1);

  const isExternal = (src: string) => src.startsWith('http');

  // Lock body scroll and wire keyboard shortcuts while the lightbox is open.
  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen, prev, next]);

  // Reset zoom whenever we switch images or reopen the lightbox.
  useEffect(() => {
    setZoomed(false);
  }, [activeIdx, lightboxOpen]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — fills viewport on mobile, contained on desktop. Click to enlarge. */}
      <button
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Open image in full screen — tap to zoom"
        className="relative bg-white rounded-2xl overflow-hidden border border-gray-300 group aspect-[4/3] sm:aspect-auto w-full cursor-zoom-in"
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

        {/* Zoom hint — fades in on hover */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM10.5 7.5v6M7.5 10.5h6" /></svg>
          Click to zoom
        </div>
      </button>

      {/* Arrow nav under the main image, only when multiple photos */}
      {displayImages.length > 1 && (
        <div className="flex items-center justify-between -mt-1">
          <button
            onClick={prev}
            aria-label="Previous photo"
            className="bg-black/60 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg border border-gray-700"
          >
            ‹
          </button>
          <p className="text-xs text-gray-500">Tap image to open full screen · pinch to zoom</p>
          <button
            onClick={next}
            aria-label="Next photo"
            className="bg-black/60 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg border border-gray-700"
          >
            ›
          </button>
        </div>
      )}

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

      {/* ── FULLSCREEN LIGHTBOX ─────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Product photo viewer"
          onClick={(e) => {
            // Close when clicking the backdrop itself (not the image).
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close full screen"
            className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full w-11 h-11 flex items-center justify-center border border-white/20 backdrop-blur"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-[110] bg-white/10 text-white text-sm px-3 py-1.5 rounded-full border border-white/20 backdrop-blur">
            {activeIdx + 1} / {displayImages.length}
          </div>

          {/* Image canvas — touch-action: pinch-zoom lets mobile browsers pinch natively.
              Double-click on desktop toggles a 2x CSS zoom for mouse users. */}
          <div
            className="w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-auto"
            style={{ touchAction: 'pinch-zoom' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={lightboxImgRef}
              src={displayImages[activeIdx]}
              alt={`${alt} — photo ${activeIdx + 1} (full size)`}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => setZoomed((z) => !z)}
              className={`max-w-full max-h-full object-contain select-none transition-transform duration-200 ${
                zoomed ? 'scale-[2] cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              draggable={false}
            />
          </div>

          {/* Nav arrows (only when multiple photos) */}
          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous photo"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl border border-white/20 backdrop-blur"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next photo"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl border border-white/20 backdrop-blur"
              >
                ›
              </button>
            </>
          )}

          {/* Help text */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60 text-center">
            Pinch to zoom on mobile · double-click on desktop · Esc to close
          </p>
        </div>
      )}
    </div>
  );
}
