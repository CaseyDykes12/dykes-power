'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCart, cartTotal, type Cart } from '@/lib/cart';
import {
  calculateTax,
  getShippingOptions,
  getShippingPrice,
  type ShippingMethod,
} from '@/lib/checkout';
import PayPalCheckout from '@/components/PayPalCheckout';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart>({ items: [] });
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('MS');
  const [zip, setZip] = useState('');
  const [shipping, setShipping] = useState<ShippingMethod>('pickup');
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
  }, []);

  const subtotal = cartTotal(cart);
  const options = useMemo(() => getShippingOptions(cart), [cart]);
  const selectedOption = options.find((o) => o.id === shipping)!;
  const shippingFee = useMemo(
    () => getShippingPrice(shipping, cart),
    [shipping, cart]
  );
  const tax = useMemo(
    () => calculateTax(subtotal, shipping === 'pickup' ? 'MS' : state),
    [subtotal, shipping, state]
  );
  const total = subtotal + shippingFee + tax;
  const isQuoteShipping = selectedOption?.price === 'quote';

  const customerComplete =
    name.trim() &&
    email.trim() &&
    phone.trim() &&
    (shipping === 'pickup' ||
      (street.trim() && city.trim() && state.trim() && zip.trim()));

  const canPay = customerComplete && agreed && !isQuoteShipping;

  if (!mounted) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen px-4 py-20 text-center text-gray-500">
        Loading…
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen px-4 py-20 text-center">
        <p className="text-white text-xl mb-4">Your cart is empty</p>
        <Link href="/catalog" className="btn-primary px-6 py-3">
          Browse Catalog
        </Link>
      </div>
    );
  }

  const orderItems = cart.items.map((i) => ({
    name: i.name,
    sku: i.sku,
    price: i.price,
    quantity: i.quantity,
  }));

  const submitQuoteRequest = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'quote',
          customer: { name, email, phone, street, city, state, zip },
          shipping: { method: shipping, fee: 0 },
          items: orderItems,
          subtotal,
          tax: 0,
          total: subtotal,
        }),
      });
      if (!res.ok) throw new Error('Request failed');
      router.push('/order-confirmed?mode=quote');
    } catch {
      setSubmitError('Could not submit. Please call (601) 909-5380.');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0f0f0f] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1
          className="text-3xl md:text-4xl font-black text-white mb-2"
          style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}
        >
          CHECKOUT
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          Secure checkout · Pickup or shipped from Collins, MS
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Section title="1. Contact Information">
              <div className="grid sm:grid-cols-2 gap-3">
                <Input label="Full Name" value={name} onChange={setName} required />
                <Input label="Phone" value={phone} onChange={setPhone} type="tel" required />
                <div className="sm:col-span-2">
                  <Input label="Email" value={email} onChange={setEmail} type="email" required />
                </div>
              </div>
            </Section>

            <Section title="2. Shipping Method">
              <div className="space-y-2">
                {options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`block border rounded-lg p-4 cursor-pointer transition-colors ${
                      shipping === opt.id
                        ? 'border-[#D4AF37] bg-[#1a1500]'
                        : 'border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.id}
                        checked={shipping === opt.id}
                        onChange={() => setShipping(opt.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <p className="text-white font-semibold">{opt.label}</p>
                          <p className="text-white font-bold text-sm">
                            {opt.price === 'quote'
                              ? 'Quote required'
                              : opt.price === 0
                                ? 'Free'
                                : `$${opt.price.toFixed(2)}`}
                          </p>
                        </div>
                        <p className="text-gray-400 text-xs">{opt.description}</p>
                        {opt.notes && (
                          <p className="text-gray-500 text-xs mt-1">{opt.notes}</p>
                        )}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </Section>

            {shipping !== 'pickup' && (
              <Section title="3. Shipping Address">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <Input label="Street Address" value={street} onChange={setStreet} required />
                  </div>
                  <Input label="City" value={city} onChange={setCity} required />
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="State" value={state} onChange={setState} required maxLength={2} />
                    <Input label="ZIP" value={zip} onChange={setZip} required maxLength={10} />
                  </div>
                </div>
              </Section>
            )}

            <Section title={shipping === 'pickup' ? '3. Review & Pay' : '4. Review & Pay'}>
              <label className="flex items-start gap-3 mb-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-gray-300">
                  I agree to the{' '}
                  <Link href="/shipping-returns" className="text-[#D4AF37] hover:underline">
                    Shipping & Returns Policy
                  </Link>
                  ,{' '}
                  <Link href="/privacy" className="text-[#D4AF37] hover:underline">
                    Privacy Policy
                  </Link>
                  , and confirm my order details above are correct.
                </span>
              </label>

              {!customerComplete && (
                <p className="text-amber-500 text-xs mb-3">
                  Fill in your contact info{shipping !== 'pickup' && ' and shipping address'} to continue.
                </p>
              )}

              {isQuoteShipping ? (
                <div>
                  <div className="bg-[#1a1500] border border-[#D4AF37] rounded-lg p-4 mb-4">
                    <p className="text-[#D4AF37] font-bold text-sm mb-1">
                      Freight Quote Required
                    </p>
                    <p className="text-gray-300 text-xs">
                      Large equipment ships via freight carrier. Submit your order details and we will call you within 1 business day with a freight quote and total. No payment is taken until you approve.
                    </p>
                  </div>
                  <button
                    onClick={submitQuoteRequest}
                    disabled={!customerComplete || !agreed || submitting}
                    className="btn-primary w-full py-3 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting…' : 'Request Freight Quote'}
                  </button>
                  {submitError && (
                    <p className="text-red-400 text-xs mt-2 text-center">{submitError}</p>
                  )}
                </div>
              ) : canPay ? (
                <PayPalCheckout
                  total={total}
                  items={orderItems}
                  customer={{ name, email, phone, street, city, state, zip }}
                  shipping={{ method: shipping, fee: shippingFee }}
                  tax={tax}
                  subtotal={subtotal}
                />
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-800 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                >
                  Complete the form above to pay
                </button>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                Payments processed securely by PayPal · We never see your card details
              </p>
            </Section>
          </div>

          <aside className="lg:col-span-1">
            <div className="bg-[#111] border border-gray-800 rounded-xl p-5 lg:sticky lg:top-24">
              <h2 className="text-white font-bold text-lg mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-72 overflow-y-auto">
                {cart.items.map((i) => (
                  <div
                    key={`${i.sku}-${i.deckSize ?? ''}`}
                    className="flex gap-3 text-sm"
                  >
                    <div className="bg-[#0a0a0a] rounded w-12 h-12 shrink-0 p-1 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={i.imageUrl}
                        alt={i.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate text-xs font-semibold">{i.name}</p>
                      <p className="text-gray-500 text-xs">Qty {i.quantity}</p>
                    </div>
                    <p className="text-white text-xs font-semibold whitespace-nowrap">
                      ${(i.price * i.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 text-sm border-t border-gray-800 pt-3">
                <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
                <Row
                  label={selectedOption?.label || 'Shipping'}
                  value={
                    isQuoteShipping
                      ? 'TBD'
                      : shippingFee === 0
                        ? 'Free'
                        : `$${shippingFee.toFixed(2)}`
                  }
                />
                <Row
                  label={`Tax (MS 7%)`}
                  value={tax === 0 ? '—' : `$${tax.toFixed(2)}`}
                />
              </div>

              <div className="border-t border-gray-800 mt-3 pt-3">
                <div className="flex justify-between text-white font-bold text-lg">
                  <span>Total</span>
                  <span>
                    {isQuoteShipping
                      ? `$${subtotal.toFixed(2)}+`
                      : `$${total.toFixed(2)}`}
                  </span>
                </div>
              </div>

              <Link
                href="/cart"
                className="block text-center text-sm text-gray-400 hover:text-white mt-4"
              >
                ← Edit Cart
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
      <h2 className="text-white font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = 'text',
  required,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
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
        maxLength={maxLength}
        required={required}
        className="mt-1 w-full bg-[#0a0a0a] border border-gray-800 rounded-lg px-3 py-2 text-white focus:border-[#D4AF37] focus:outline-none"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-gray-400">
      <span>{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
