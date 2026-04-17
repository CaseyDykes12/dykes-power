'use client';
import Link from 'next/link';
import { useState } from 'react';

function calcMonthly(principal: number, aprPercent: number, months: number): number {
  const r = aprPercent / 100 / 12;
  if (r === 0) return principal / months;
  return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

const TERMS: { months: number; apr: number }[] = [
  { months: 36, apr: 2.9 },
  { months: 48, apr: 2.9 },
  { months: 60, apr: 3.9 },
];

export default function FinancingOptions({ price }: { price: number }) {
  const defaultDown = Math.round((price * 0.1) / 100) * 100;
  const [down, setDown] = useState<number>(defaultDown);
  const [months, setMonths] = useState<number>(48);

  const maxDown = Math.floor(price * 0.5);
  const principal = Math.max(0, price - down);
  const apr = TERMS.find((t) => t.months === months)?.apr ?? 2.9;
  const monthly = Math.ceil(calcMonthly(principal, apr, months));
  const totalInterest = Math.round(monthly * months - principal);

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden mb-6">
      {/* Monthly teaser header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-800">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Estimated Payment</p>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-4xl font-black text-white">
            ${monthly.toLocaleString()}
            <span className="text-base font-semibold text-gray-400">/mo</span>
          </span>
          <span className="text-gray-500 text-sm">at {apr}% APR · {months} months</span>
        </div>
        <p className="text-[#D4AF37] text-xs mt-1 font-semibold">Sheffield Financial · Synchrony · Octane</p>
      </div>

      <div className="p-5 space-y-5">
        {/* Down payment slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="down-payment" className="text-gray-400 text-xs uppercase tracking-wider font-semibold">
              Down Payment
            </label>
            <span className="text-white font-bold text-sm">
              ${down.toLocaleString()}
              <span className="text-gray-500 font-normal"> ({Math.round((down / price) * 100)}%)</span>
            </span>
          </div>
          <input
            id="down-payment"
            type="range"
            min={0}
            max={maxDown}
            step={100}
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
            className="w-full h-2 bg-[#1a1a1a] rounded-full appearance-none cursor-pointer accent-[#D4AF37]"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>$0</span>
            <span>${maxDown.toLocaleString()}</span>
          </div>
        </div>

        {/* Term buttons */}
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold mb-2">
            Term
          </p>
          <div className="grid grid-cols-3 gap-2">
            {TERMS.map(({ months: m, apr: a }) => (
              <button
                key={m}
                type="button"
                onClick={() => setMonths(m)}
                className={`py-3 rounded-lg border text-sm font-semibold transition-colors ${
                  months === m
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]'
                    : 'bg-[#1a1a1a] text-gray-300 border-gray-700 hover:border-gray-500'
                }`}
              >
                {m} mo
                <span className={`block text-xs font-normal mt-0.5 ${months === m ? 'text-black/70' : 'text-gray-500'}`}>
                  {a}% APR
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 divide-y divide-gray-800">
          <div className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="text-gray-400">Amount financed</span>
            <span className="text-white font-semibold">${principal.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="text-gray-400">Total interest</span>
            <span className="text-white font-semibold">${totalInterest.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5 text-sm">
            <span className="text-gray-400">Total paid</span>
            <span className="text-white font-semibold">${(down + principal + totalInterest).toLocaleString()}</span>
          </div>
        </div>

        <p className="text-gray-600 text-xs">
          Rates shown are estimates for qualified buyers. Actual terms subject to lender approval.
        </p>

        <Link
          href="/financing"
          className="block w-full text-center bg-[#D4AF37] text-black font-bold text-sm py-3 rounded-lg hover:bg-[#C8A830] transition-colors"
        >
          Apply for Financing
        </Link>
      </div>
    </div>
  );
}
