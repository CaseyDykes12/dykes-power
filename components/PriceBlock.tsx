// Amazon-style price presentation. Three modes:
//   compact  — for catalog cards (small)
//   detail   — for product detail page (large, prominent)
//   variant  — for in-PDP variant selector (medium)
//
// Order: MSRP -> Save $Y (% off) -> Our Price -> from $X/mo*
//
// Pricing displayed here is MAP-compliant. Manufacturer instant rebates are
// already baked into the displayed price where applicable; the underlying
// product name carries "(Instant Rebate Included)" so the rebate disclosure
// rides along with every reference to that product.

type Mode = 'compact' | 'detail' | 'variant';

// 4.9% APR, 72 months — matches the financing copy site-wide.
function monthlyPayment(price: number): number {
  const rate = 0.049 / 12;
  const n = 72;
  return Math.ceil((price * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1));
}

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
  const savings = showMsrp ? msrp! - price : 0;
  const pctOff = showMsrp ? Math.round((savings / msrp!) * 100) : 0;
  const monthly = monthlyPayment(price);

  if (mode === 'compact') {
    return (
      <div className="space-y-0.5">
        {showMsrp && (
          <p className="text-gray-500 text-[11px] line-through leading-tight">
            MSRP ${msrp!.toLocaleString()}
          </p>
        )}
        {showMsrp && (
          <p className="text-red-500 text-[11px] font-bold leading-tight">
            Save ${savings.toLocaleString()} ({pctOff}% — Rebate)
          </p>
        )}
        <p className="font-bold text-lg text-white leading-tight">
          <span className="text-[10px] text-gray-400 font-normal mr-1 uppercase tracking-wider">Our Price</span>
          ${price.toLocaleString()}
        </p>
        <p className="text-gray-500 text-[11px] leading-tight">
          from <span className="text-gray-300 font-semibold">${monthly}/mo</span>*
        </p>
      </div>
    );
  }

  if (mode === 'variant') {
    return (
      <div>
        {showMsrp && (
          <p className="text-gray-500 text-sm line-through mb-0.5">
            MSRP ${msrp!.toLocaleString()}
          </p>
        )}
        {showMsrp && (
          <p className="text-red-500 text-sm font-bold mb-1">
            Save ${savings.toLocaleString()} ({pctOff}% — Rebate)
          </p>
        )}
        <p className="text-[10px] font-semibold text-[#C8C8C8] uppercase tracking-widest mb-0.5">Our Price</p>
        <p className="text-3xl font-black text-white leading-tight">${price.toLocaleString()}</p>
        <p className="text-gray-400 text-sm mt-1">
          from <span className="text-white font-semibold">${monthly}/mo</span>
          <span className="text-gray-500">*</span>
        </p>
      </div>
    );
  }

  // detail
  return (
    <div>
      {showMsrp && (
        <p className="text-gray-500 text-base line-through mb-1">
          MSRP ${msrp!.toLocaleString()}
        </p>
      )}
      {showMsrp && (
        <p className="text-red-500 text-sm font-bold mb-2">
          Save ${savings.toLocaleString()} ({pctOff}% — Rebate)
        </p>
      )}
      <p className="text-xs font-semibold text-[#C8C8C8] uppercase tracking-widest mb-1">Our Price</p>
      <p className="text-4xl font-black text-white leading-tight mb-1">${price.toLocaleString()}</p>
      <p className="text-gray-400 text-sm">
        from <span className="text-white font-semibold">${monthly}/mo</span>
        <span className="text-gray-500">*</span>
        <span className="text-gray-500"> · 4.9% APR · 72 mo · qualified credit</span>
      </p>
    </div>
  );
}
