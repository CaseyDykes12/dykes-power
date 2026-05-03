// SLE-style price presentation. Three modes:
//   compact  — for catalog cards (small, single line + small Sale badge)
//   detail   — for product detail page (large, prominent)
//   variant  — for in-PDP variant selector (medium)
//
// Pattern matches sleequipment.com:
//   - "-X%" red Sale badge (top-left)
//   - "Sale price $X" (bold, primary)
//   - "Regular price $Y" (strikethrough, secondary)
//
// Pricing displayed here is MAP-compliant. Manufacturer instant rebates are
// already baked into the displayed Sale price where applicable; the underlying
// product name carries "(Instant Rebate Included)" so the rebate disclosure
// rides along with every reference to that product.

type Mode = 'compact' | 'detail' | 'variant';

export default function PriceBlock({
  price,
  msrp,
  mode = 'compact',
}: {
  price: number | null;
  msrp: number | null;
  mode?: Mode;
}) {
  if (!price) {
    return mode === 'detail' ? (
      <div>
        <p className="text-2xl font-bold text-[#C8C8C8]">Contact us for pricing</p>
        <p className="text-gray-500 text-sm mt-1">Call or message us for a real quote</p>
      </div>
    ) : (
      <p className="font-semibold text-[#C8C8C8]">Contact for price</p>
    );
  }

  const showMsrp = msrp != null && msrp > price;
  const pctOff = showMsrp ? Math.round(((msrp! - price) / msrp!) * 100) : 0;

  if (mode === 'compact') {
    return (
      <div className="space-y-0.5">
        {showMsrp && (
          <div className="flex items-center gap-2">
            <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
              -{pctOff}%
            </span>
            <span className="text-[10px] uppercase tracking-wider text-red-500 font-bold">Sale</span>
          </div>
        )}
        <p className="font-bold text-lg text-white">
          <span className="text-xs text-gray-400 font-normal mr-1">Sale price</span>
          ${price.toLocaleString()}
        </p>
        {showMsrp && (
          <p className="text-gray-500 text-xs line-through">
            Regular price ${msrp!.toLocaleString()}
          </p>
        )}
      </div>
    );
  }

  if (mode === 'variant') {
    return (
      <div>
        {showMsrp && (
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              -{pctOff}%
            </span>
            <span className="text-[11px] uppercase tracking-wider text-red-500 font-bold">Sale</span>
          </div>
        )}
        <div className="flex items-baseline gap-3 flex-wrap">
          <p className="text-3xl font-black text-white">
            <span className="text-xs text-gray-400 font-normal mr-2 align-baseline">Sale price</span>
            ${price.toLocaleString()}
          </p>
          {showMsrp && (
            <p className="text-gray-500 text-sm line-through">
              Regular price ${msrp!.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    );
  }

  // detail
  return (
    <div>
      {showMsrp && (
        <div className="flex items-center gap-2 mb-1">
          <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            -{pctOff}%
          </span>
          <span className="text-xs uppercase tracking-wider text-red-500 font-bold">Sale</span>
        </div>
      )}
      {showMsrp && (
        <p className="text-gray-500 text-base line-through mb-1">
          Regular price ${msrp!.toLocaleString()}
        </p>
      )}
      <p className="text-xs font-semibold text-[#C8C8C8] uppercase tracking-widest mb-1">Sale price</p>
      <p className="text-4xl font-black text-white mb-1">${price.toLocaleString()}</p>
      <p className="text-gray-500 text-sm">Cash or finance — your choice</p>
    </div>
  );
}
