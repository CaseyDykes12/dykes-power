import Link from 'next/link';
import { Product, statusLabels } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const status = statusLabels[product.status];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Image */}
      <div className="bg-gray-50 h-52 flex items-center justify-center p-4 relative">
        {product.tag && (
          <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-2 py-1 rounded">
            {product.tag}
          </span>
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/placeholder-mower.png';
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-base leading-tight">{product.name}</h3>
          <span className={`text-white text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${status.color}`}>
            {status.label}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-1">{product.engine} · {product.horsepower}</p>
        <p className="text-gray-500 text-sm mb-3">
          Deck: {product.deckSizes.join(', ')}
        </p>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            {product.price ? (
              <p className="font-bold text-lg">${product.price.toLocaleString()}</p>
            ) : (
              <p className="font-semibold text-[#00CFD7]">Contact for price</p>
            )}
          </div>
          <Link
            href={`/product/${product.sku}`}
            className="btn-primary text-sm py-2 px-4"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
