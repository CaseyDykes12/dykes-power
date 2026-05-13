'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

export interface GalleryVideo {
  /** YouTube video ID (the part after watch?v=). */
  videoId: string;
  /** Title shown to assistive tech. */
  title: string;
}

interface Props {
  images: string[];
  alt: string;
  /**
   * Optional YouTube product video. When provided, the first slot in the
   * gallery becomes the video — shown as a thumbnail with a play button
   * overlay until the user clicks. Stock images follow after the video.
   */
  video?: GalleryVideo | null;
}

export default function ProductGallery({ images, alt, video }: Props) {
  // Internal index: 0 is the video slot when video is set, then images start at 1.
  // When there's no video, 0..N-1 map to images directly.
  const [active, setActive] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const lightboxImgRef = useRef<HTMLImageElement | null>(null);

  // Filter out broken images.
  const validImages = images.filter((_, i) => !imgError[i]);
  const displayImages = validImages.length > 0 ? validImages : images;

  // Total slots = video (if any) + images.
  const totalSlots = (video ? 1 : 0) + displayImages.length;
  const activeIdx = Math.min(active, Math.max(totalSlots - 1, 0));

  // When video is present, slot 0 is the video; image slot k maps to image index k - 1.
  // When no video, slot k maps to image index k.
  const isVideoSlot = !!video && activeIdx === 0;
  const imageIndex = video ? activeIdx - 1 : activeIdx;

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + totalSlots) % totalSlots);
    setVideoPlaying(false);
  }, [totalSlots]);
  const next = useCallback(() => {
    setActive((i) => (i + 1) % totalSlots);
    setVideoPlaying(false);
  }, [totalSlots]);

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

  // Reset zoom whenever we switch slots or reopen the lightbox.
  useEffect(() => {
    setZoomed(false);
  }, [activeIdx, lightboxOpen]);

  // Stop video playback whenever the user switches to a different slot.
  useEffect(() => {
    if (!isVideoSlot) setVideoPlaying(false);
  }, [isVideoSlot]);

  const videoThumbnail = video ? `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg` : null;

  return (
    <div className="flex flex-col gap-3">
      {/* Main canvas — video slot OR image. Video slot shows poster + play
          overlay until clicked; then the iframe loads and autoplays. */}
      {isVideoSlot && video && (
        <div className="relative bg-black rounded-2xl overflow-hidden border border-gray-700 aspect-video w-full">
          {videoPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0`}
              title={video.title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setVideoPlaying(true)}
              aria-label={`Play product video: ${video.title}`}
              className="group absolute inset-0 w-full h-full"
            >
              {/* Poster */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={videoThumbnail!}
                alt={`Product video poster — ${alt}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark vignette */}
              <span aria-hidden className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              {/* Play button */}
              <span
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-600 group-hover:bg-red-500 transition-colors shadow-2xl"
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-10 h-10 sm:w-12 sm:h-12 ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {/* Label */}
              <span className="absolute bottom-3 left-3 right-3 text-left text-white text-sm font-semibold drop-shadow-lg line-clamp-2">
                ▶ {video.title}
              </span>
              {/* Counter (top-right, matches image canvas) */}
              <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                1 / {totalSlots}
              </span>
            </button>
          )}
        </div>
      )}

      {!isVideoSlot && (
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label="Open image in full screen — tap to zoom"
          className="relative bg-white rounded-2xl overflow-hidden border border-gray-300 group aspect-[4/3] sm:aspect-auto w-full cursor-zoom-in"
          style={{ minHeight: '320px', maxHeight: '600px' }}
        >
          <Image
            key={imageIndex}
            src={displayImages[imageIndex]}
            alt={`${alt} — photo ${imageIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-4 sm:p-6"
            priority={imageIndex === 0 && !video}
            onError={() => setImgError((prev) => ({ ...prev, [imageIndex]: true }))}
            {...(isExternal(displayImages[imageIndex]) ? { unoptimized: false } : {})}
          />

          {/* Counter */}
          <div className="absolute top-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10">
            {activeIdx + 1} / {totalSlots}
          </div>

          {/* Zoom hint — fades in on hover */}
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full z-10 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15zM10.5 7.5v6M7.5 10.5h6" /></svg>
            Click to zoom
          </div>
        </button>
      )}

      {/* Arrow nav under the main canvas, only when multiple slots */}
      {totalSlots > 1 && (
        <div className="flex items-center justify-between -mt-1">
          <button
            onClick={prev}
            aria-label="Previous"
            className="bg-black/60 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg border border-gray-700"
          >
            ‹
          </button>
          <p className="text-xs text-gray-500">
            {isVideoSlot
              ? 'Click play above · then swipe to see photos'
              : 'Tap image to open full screen · pinch to zoom'}
          </p>
          <button
            onClick={next}
            aria-label="Next"
            className="bg-black/60 hover:bg-black/90 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg border border-gray-700"
          >
            ›
          </button>
        </div>
      )}

      {/* Thumbnail strip — video first (if present), then images */}
      {totalSlots > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {video && (
            <button
              onClick={() => setActive(0)}
              aria-label="Play product video"
              className={`shrink-0 w-20 h-16 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                isVideoSlot
                  ? 'border-[#C8C8C8] opacity-100'
                  : 'border-gray-800 opacity-80 hover:opacity-100 hover:border-gray-600'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${video.videoId}/mqdefault.jpg`}
                alt="Product video"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span aria-hidden className="absolute inset-0 bg-black/35 flex items-center justify-center">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-600 shadow">
                  <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </span>
            </button>
          )}
          {displayImages.map((img, i) => {
            const slot = (video ? 1 : 0) + i;
            const isActive = slot === activeIdx;
            return (
              <button
                key={i}
                onClick={() => setActive(slot)}
                aria-label={`View photo ${i + 1}`}
                className={`shrink-0 w-20 h-16 sm:w-20 sm:h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                  isActive
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
            );
          })}
        </div>
      )}

      {/* ── FULLSCREEN LIGHTBOX ─────────────────────────────────────────── */}
      {lightboxOpen && !isVideoSlot && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Product photo viewer"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close full screen"
            className="absolute top-4 right-4 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full w-11 h-11 flex items-center justify-center border border-white/20 backdrop-blur"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div className="absolute top-4 left-4 z-[110] bg-white/10 text-white text-sm px-3 py-1.5 rounded-full border border-white/20 backdrop-blur">
            {activeIdx + 1} / {totalSlots}
          </div>

          <div
            className="w-full h-full flex items-center justify-center p-4 sm:p-12 overflow-auto"
            style={{ touchAction: 'pinch-zoom' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={lightboxImgRef}
              src={displayImages[imageIndex]}
              alt={`${alt} — photo ${imageIndex + 1} (full size)`}
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={() => setZoomed((z) => !z)}
              className={`max-w-full max-h-full object-contain select-none transition-transform duration-200 ${
                zoomed ? 'scale-[2] cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              draggable={false}
            />
          </div>

          {totalSlots > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl border border-white/20 backdrop-blur"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl border border-white/20 backdrop-blur"
              >
                ›
              </button>
            </>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60 text-center">
            Pinch to zoom on mobile · double-click on desktop · Esc to close
          </p>
        </div>
      )}
    </div>
  );
}
