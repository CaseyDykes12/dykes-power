'use client';

export default function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="max-h-72 max-w-full object-contain"
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/placeholder-mower.svg';
      }}
    />
  );
}
