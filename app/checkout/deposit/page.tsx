'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProductsBySku, type Product } from '@/lib/products';
import PayPalCheckout from '@/components/PayPalCheckout';

const DEPOSIT_AMOUNT = 1000;

function DepositContent() {
  const params = useSearchParams();
  const sku = params.get('sku');
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (sku) {
      const p = getProductsBySku(sku);
      if (p) setProduct(p);
    }
  }, [sku]);

  if (!sku) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen px-4 py-20 text-center">
        <p className="text-white">Missing product. Pick a machine from the catalog first.</p>
        <Link href="/catalog" className="btn-primary px-6 py-3 inline-block mt-6">
          Browse Catalog
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen px-4 py-20 text-center text-gray-500">
        Loading…
      </div>
    );
  }

  const customerComplete = name.trim() && email.trim() && phone.trim();
  const canPay = customerComplete && agreed;

  const items = [
    {
      name: `Deposit — ${product.name}`,
      sku: product.sku,
      price: DEPOSIT_AMOUNT,
      quantity: 1,
    },
  ];

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link href={`/product/${product.sku}`} className="text-sm text-gray-400 hover:text-white">
          ← Back to {product.name}
        </Link>

        <h1
          className="text-3xl md:text-4xl font-black text-white mt-4 mb-2"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
        >
          RESERVE YOUR MACHINE
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          $1,000 deposit holds your machine. Balance due at pickup or before delivery.
        </p>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-5 mb-6 flex gap-4 items-center">
          <div className="bg-[#0a0a0a] rounded-lg w-24 h-24 p-2 flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold">{product.name}</p>
            <p className="text-gray-500 text-xs mb-2">SKU: {product.sku}</p>
            {product.price && (
              <p className="text-gray-300 text-sm">
                Total price: <span className="text-white font-bold">${product.price.toLocaleString()}</span>
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-5 mb-6">
          <h2 className="text-white font-bold mb-4">Your Information</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Full Name" value={name} onChange={setName} required />
            <Input label="Phone" value={phone} onChange={setPhone} type="tel" required />
            <div className="sm:col-span-2">
              <Input label="Email" value={email} onChange={setEmail} type="email" required />
            </div>
          </div>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
          <h2 className="text-white font-bold mb-4">Reservation Summary</h2>

          <div className="space-y-1.5 text-sm border-b border-gray-800 pb-3 mb-3">
            <div className="flex justify-between text-gray-300">
              <span>Reservation Deposit</span>
              <span>${DEPOSIT_AMOUNT.toFixed(2)}</span>
            </div>
            {product.price && (
              <div className="flex justify-between text-gray-500 text-xs">
                <span>Balance due at pickup/delivery</span>
                <span>${(product.price - DEPOSIT_AMOUNT).toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between text-white font-bold text-lg mb-5">
            <span>Pay Today</span>
            <span>${DEPOSIT_AMOUNT.toFixed(2)}</span>
          </div>

          <label className="flex items-start gap-3 mb-5 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-gray-300">
              I understand the $1,000 deposit reserves this machine and is applied to the final purchase total. Balance is due at pickup or before delivery. Deposit is refundable within 7 days if I change my mind. See{' '}
              <Link href="/shipping-returns" className="text-[#D4AF37] hover:underline">
                Shipping & Returns Policy
              </Link>
              .
            </span>
          </label>

          {canPay ? (
            <PayPalCheckout
              mode="deposit"
              productName={product.name}
              total={DEPOSIT_AMOUNT}
              subtotal={DEPOSIT_AMOUNT}
              tax={0}
              shipping={{ method: 'pickup', fee: 0 }}
              items={items}
              customer={{ name, email, phone }}
            />
          ) : (
            <button
              disabled
              className="w-full bg-gray-800 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
            >
              {customerComplete ? 'Check the box above to continue' : 'Fill in your info to continue'}
            </button>
          )}

          <p className="text-xs text-gray-500 mt-4 text-center">
            Secure payment via PayPal · Questions? Call{' '}
            <a href="tel:6019095380" className="text-[#D4AF37] hover:underline">
              (601) 909-5380
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-gray-400 text-xs uppercase tracking-wider">
        {label} {required && <span className="text-[#D4AF37]">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-1 w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
      />
    </label>
  );
}

export default function DepositPage() {
  return (
    <Suspense>
      <DepositContent />
    </Suspense>
  );
}
