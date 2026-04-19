'use client';

import { useEffect, useRef, useState } from 'react';

interface StatTileProps {
  value: string;
  label: string;
  isNumeric?: boolean;
  targetNumber?: number;
  suffix?: string;
}

export default function StatTile({ value, label, isNumeric, targetNumber, suffix }: StatTileProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(isNumeric ? '0' : value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isNumeric || targetNumber === undefined) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 1200;
            const start = performance.now();
            const tick = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              const current = Math.round(targetNumber * eased);
              setDisplayValue(`${current}${suffix ?? ''}`);
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [isNumeric, targetNumber, suffix, hasAnimated]);

  return (
    <div
      ref={ref}
      className="bg-dykes-gray-900 border-t-2 border-ferris-yellow p-6 md:p-8 rounded-b-lg"
    >
      <p className="text-4xl md:text-5xl font-bold text-white tabular-nums leading-none mb-2">
        {displayValue}
      </p>
      <p className="text-dykes-gray-300 text-sm md:text-base leading-tight">{label}</p>
    </div>
  );
}
