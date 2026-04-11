'use client';
import { useState } from 'react';

interface Props {
  videoId: string;
  title: string;
}

export default function ProductVideo({ videoId, title }: Props) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const sdThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (playing) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-800 bg-black"
        style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className="relative w-full rounded-2xl overflow-hidden border border-gray-800 group cursor-pointer"
      style={{ paddingTop: '56.25%' }}
      aria-label={`Play video: ${title}`}
    >
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumb}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { (e.target as HTMLImageElement).src = sdThumb; }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-red-600 group-hover:bg-red-500 transition-colors rounded-full w-16 h-16 flex items-center justify-center shadow-2xl">
          <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {/* Label */}
      <div className="absolute bottom-4 left-4 right-4">
        <p className="text-white font-semibold text-sm drop-shadow">{title}</p>
        <p className="text-gray-300 text-xs drop-shadow">Official Ferris Video</p>
      </div>
    </button>
  );
}
