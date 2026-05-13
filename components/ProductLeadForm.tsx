'use client';
import { useState } from 'react';
import type { Product } from '@/lib/products';

type Props = {
  product?: Product;
  heading?: string;
  anchorId?: string;
};

export default function ProductLeadForm({ product, heading, anchorId }: Props) {
  const interestLabel = product ? `${product.name} (SKU ${product.sku})` : '';
  const [form, setForm] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: '',
        phone: form.phone,
        interest: product ? interestLabel : 'Speak with a Representative',
        propertySize: '',
        message: '',
      };
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
          (window as any).gtag('set', 'user_data', { phone_number: form.phone });
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-17992871675/pNOLCL2li48cEPvd1YND',
          });
        }
      } else {
        alert(
          "We got your info, but our email system hit a snag. Please call us at (601) 909-5380 so we don't miss you — sorry about that."
        );
      }
    } catch {
      alert('Something went wrong. Please call us directly at (601) 909-5380.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div id={anchorId ?? 'quick-quote'} className="bg-[#111] border border-[#C8C8C8] rounded-xl p-6 text-center scroll-mt-24">
        <p className="text-3xl mb-2">✅</p>
        <h3 className="text-lg font-bold text-white mb-2">Got it — we'll reach out fast.</h3>
        <p className="text-sm text-gray-400">
          Someone from our Collins shop will contact you shortly. Need to talk now? Call{' '}
          <a href="tel:6019095380" className="text-[#C8C8C8] font-semibold">(601) 909-5380</a>.
        </p>
      </div>
    );
  }

  return (
    <div id={anchorId ?? 'quick-quote'} className="bg-[#111] border border-gray-800 rounded-xl p-5 mb-4 scroll-mt-24">
      <h3 className="text-lg font-bold text-white mb-1">
        {heading ?? 'Have additional questions or concerns? Want to speak with a Representative?'}
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        Input your contact info below and one of our representatives will reach out to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          required
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name *"
          className="w-full bg-black border border-gray-700 text-white rounded-lg px-3 py-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
        />
        <input
          required
          type="tel"
          inputMode="tel"
          name="phone"
          autoComplete="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number *"
          className="w-full bg-black border border-gray-700 text-white rounded-lg px-3 py-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 text-base disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
