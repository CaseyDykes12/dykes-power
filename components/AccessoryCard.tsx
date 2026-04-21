'use client';

import type { Accessory } from '@/lib/accessories';

export default function AccessoryCard({ item }: { item: Accessory }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-black/50 p-4 flex flex-col">
      <div className="aspect-[4/3] w-full mb-3 rounded-md bg-[#0a0a0a] border border-gray-900 overflow-hidden flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.photo}
          alt={item.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <p className="font-bold text-white">{item.name}</p>
      <p className="text-sm text-gray-400 mt-1 mb-3">{item.description}</p>

      {item.specs && Object.keys(item.specs).length > 0 && (
        <ul className="text-xs text-gray-300 mb-3 space-y-1">
          {Object.entries(item.specs).map(([k, v]) => (
            <li key={k}>
              <span className="text-gray-500">{k}:</span> <span className="text-white">{v}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-3 border-t border-gray-900">
        <p className="text-[11px] font-bold text-ferris-yellow tracking-widest uppercase mb-1">
          Fits
        </p>
        <p className="text-xs text-gray-300 leading-snug">{item.compatibility.join(', ')}</p>
      </div>
    </div>
  );
}
