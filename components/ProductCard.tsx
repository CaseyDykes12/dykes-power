'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link href={`/product/${product.sku}`} className="bg-[#1a1a1a] border border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:border-[#C8C8C8] transition-all flex flex-col cursor-pointer">
      {/* Image — taller on mobile so photos fill the screen */}
      <div className="bg-[#111] h-72 sm:h-56 relative">
        {product.tag && (
          <span className="absolute top-3 left-3 z-10 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 rounded">
            {product.tag}
          </span>
        )}
        {imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/placeholder-mower.svg"
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain p-4"
          />
        ) : (
          <Image
            src={product.imageUrl}
            alt={`${product.name} — ${product.deckSizes.join('/')} deck, ${product.engine}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-4"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base leading-tight text-white">{product.name}</h3>
        </div>

        <p className="text-gray-400 text-sm mb-1">
          {[product.engine, product.horsepower].filter(Boolean).join(' · ')}
        </p>
        {product.deckSizes.length > 0 && (
          <p className="text-gray-400 text-sm mb-3">
            Deck: {product.deckSizes.join(', ')}
          </p>
        )}

        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-700">
          <div>
            {product.price ? (
              <>
                {product.msrp && product.msrp !== product.price && (
                  <p className="text-gray-500 text-xs line-through">MSRP ${product.msrp.toLocaleString()}</p>
                )}
                <p className="font-bold text-lg text-white">${product.price.toLocaleString()}</p>
                <p className="text-[#C8C8C8] text-xs font-semibold">Dykes Motors Price</p>
                <p className="text-gray-500 text-xs">from ${Math.ceil(product.price * 0.00408333 * Math.pow(1.00408333, 72) / (Math.pow(1.00408333, 72) - 1)).toLocaleString()}/mo*</p>
              </>
            ) : (
              <p className="font-semibold text-[#C8C8C8]">Contact for price</p>
            )}
          </div>
          <span className="btn-primary text-sm py-2 px-4">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
