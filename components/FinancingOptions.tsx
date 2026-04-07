'use client';
import { useState } from 'react';
import Link from 'next/link';

function calcMonthly(price: number, aprPercent: number, months: number): number {
  const r = aprPercent / 100 / 12;
  if (r === 0) return price / months;
  return price * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function FinancingOptions({ price }: { price: number }) {
  const [tab, setTab] = useState<'dealer' | 'affirm' | 'klarna'>('dealer');

  const mo48 = Math.ceil(calcMonthly(price, 2.9, 48));
  const mo60 = Math.ceil(calcMonthly(price, 3.9, 60));
  const mo36 = Math.ceil(calcMonthly(price, 2.9, 36));
  const payIn4 = Math.ceil(price / 4);

  const tabs = [
    { key: 'dealer', label: 'Dealer Financing' },
    { key: 'affirm', label: 'Affirm' },
    { key: 'klarna', label: 'Klarna' },
  ] as const;

  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden mb-6">
      {/* Monthly teaser header */}
      <div className="px-5 pt-5 pb-4 border-b border-gray-800">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Financing</p>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-3xl font-black text-white">${mo48.toLocaleString()}<span className="text-base font-semibold text-gray-400">/mo</span></span>
          <span className="text-gray-500 text-sm">at 2.9% APR · 48 months</span>
        </div>
        <p className="text-[#D4AF37] text-xs mt-1 font-semibold">Multiple financing options available — see below</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
              tab === t.key
                ? 'text-white border-b-2 border-[#D4AF37] bg-[#1a1a1a]'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-5">
        {tab === 'dealer' && (
          <div className="space-y-3">
            {[
              { term: '36 months', apr: '2.9%', mo: mo36 },
              { term: '48 months', apr: '2.9%', mo: mo48 },
              { term: '60 months', apr: '3.9%', mo: mo60 },
            ].map(({ term, apr, mo }) => (
              <div key={term} className="flex items-center justify-between bg-[#1a1a1a] rounded-lg px-4 py-3 border border-gray-800">
                <div>
                  <p className="text-white font-semibold text-sm">{term}</p>
                  <p className="text-gray-500 text-xs">{apr} APR</p>
                </div>
                <p className="text-white font-bold text-lg">${mo.toLocaleString()}<span className="text-gray-500 text-xs font-normal">/mo</span></p>
              </div>
            ))}
            <p className="text-gray-600 text-xs mt-1">
              Rates shown are estimates. OAC — Sheffield Financial, Synchrony, & Octane available.
            </p>
            <Link
              href="/financing"
              className="block w-full text-center bg-[#D4AF37] text-black font-bold text-sm py-3 rounded-lg hover:bg-[#C8A830] transition-colors mt-2"
            >
              Apply for Financing
            </Link>
          </div>
        )}

        {tab === 'affirm' && (
          <div className="space-y-3 text-center">
            <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg px-4 py-3 border border-gray-800">
              <p className="text-white font-semibold text-sm">Pay in 4</p>
              <p className="text-white font-bold text-lg">${payIn4.toLocaleString()}<span className="text-gray-500 text-xs font-normal"> × 4</span></p>
            </div>
            <p className="text-gray-500 text-sm">
              Split into 4 interest-free payments. No impact to your credit to check eligibility.
            </p>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
              <p className="text-[#D4AF37] font-semibold text-sm mb-1">Affirm Coming Soon</p>
              <p className="text-gray-400 text-xs">We're setting up our Affirm merchant account. Call us today and we'll work out a payment plan that fits your budget.</p>
            </div>
            <a
              href="tel:6016415475"
              className="block w-full text-center border border-[#D4AF37] text-[#D4AF37] font-bold text-sm py-3 rounded-lg hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              📞 Call to Discuss Options
            </a>
          </div>
        )}

        {tab === 'klarna' && (
          <div className="space-y-3 text-center">
            <div className="flex items-center justify-between bg-[#1a1a1a] rounded-lg px-4 py-3 border border-gray-800">
              <p className="text-white font-semibold text-sm">Pay in 4</p>
              <p className="text-white font-bold text-lg">${payIn4.toLocaleString()}<span className="text-gray-500 text-xs font-normal"> × 4</span></p>
            </div>
            <p className="text-gray-500 text-sm">
              4 interest-free payments, every 2 weeks. No late fees.
            </p>
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3">
              <p className="text-[#D4AF37] font-semibold text-sm mb-1">Klarna Coming Soon</p>
              <p className="text-gray-400 text-xs">Klarna integration is in progress. In the meantime, call us and we'll find a payment option that works for you.</p>
            </div>
            <a
              href="tel:6016415475"
              className="block w-full text-center border border-[#D4AF37] text-[#D4AF37] font-bold text-sm py-3 rounded-lg hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              📞 Call to Discuss Options
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
