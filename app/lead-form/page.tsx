'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LeadFormPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fd.get('name'),
          email: fd.get('email') || '',
          phone: fd.get('phone'),
          interest: fd.get('interest') || 'General inquiry',
          message: fd.get('message') || '',
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please call us at (601) 641-5475.');
      }
    } catch {
      setError('Something went wrong. Please call us at (601) 641-5475.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">✅</p>
        <h1 className="text-2xl font-bold text-white mb-2">We got it — thank you.</h1>
        <p className="text-gray-400">
          Someone from Dykes Motors Power Equipment will reach out shortly.
          Need us now? Call{' '}
          <a href="tel:6016415475" className="text-[#C8C8C8] font-semibold">(601) 641-5475</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2 text-white">Contact Us</h1>
      <p className="text-gray-400 mb-10">
        Fill out the form below and a Dykes Motors representative will reach out to you shortly.
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-white mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8C8C8]"
            placeholder="John Smith"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-white mb-1">
            Phone Number <span className="text-red-400">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8C8C8]"
            placeholder="(601) 555-0100"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-white mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8C8C8]"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="interest" className="block text-sm font-semibold text-white mb-1">
            I&apos;m interested in
          </label>
          <select
            id="interest"
            name="interest"
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#C8C8C8]"
          >
            <option value="">Select one...</option>
            <option value="Ferris Mower">Ferris Mower</option>
            <option value="Utility Trailer">Utility Trailer</option>
            <option value="Parts">Parts</option>
            <option value="Service">Service</option>
            <option value="Financing">Financing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-white mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#C8C8C8] resize-none"
            placeholder="Tell us what you're looking for..."
          />
        </div>

        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="sms_consent"
              id="sms_consent"
              className="mt-1 h-4 w-4 rounded border-gray-600 bg-[#111] accent-white shrink-0"
            />
            <span className="text-sm text-gray-300 leading-relaxed">
              I agree to receive text messages from Dykes Motors at the phone number provided above. Message frequency varies. Message and data rates may apply. Reply{' '}
              <strong className="text-white">STOP</strong> to unsubscribe at any time. Reply{' '}
              <strong className="text-white">HELP</strong> for assistance. View our{' '}
              <Link href="/sms-terms" className="underline text-white hover:text-[#C8C8C8]">SMS Terms</Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline text-white hover:text-[#C8C8C8]">Privacy Policy</Link>.
            </span>
          </label>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-center disabled:opacity-60"
        >
          {loading ? 'Sending…' : 'Submit'}
        </button>
      </form>

      <p className="text-gray-500 text-xs mt-8">
        Dykes Motors Power Equipment · 3069 Hwy 49, Collins, MS 39428 ·{' '}
        <a href="tel:6016415475" className="underline hover:text-gray-300">(601) 641-5475</a> ·{' '}
        <a href="mailto:support@dykespower.com" className="underline hover:text-gray-300">support@dykespower.com</a>
      </p>
    </div>
  );
}
