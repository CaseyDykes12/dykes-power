'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    propertySize: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
                    // Enhanced conversions: send user-provided data for better conversion matching
                    (window as any).gtag('set', 'user_data', {
                                  email: form.email,
                                  phone_number: form.phone,
                    });
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-17992871675/pNOLCL2li48cEPvd1YND',
          });
        }
      }
    } catch {
      alert('Something went wrong. Please call us directly at (601) 641-5475.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">✅</p>
        <h1 className="text-3xl font-bold mb-3">We got your message!</h1>
        <p className="text-gray-600 mb-6">
          Casey or one of our team will reach out to you shortly. If you need to talk now,
          call us at <a href="tel:6016415475" className="text-[#C8C8C8] font-semibold">(601) 641-5475</a>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Get a Quote</h1>
          <p className="text-gray-500 mb-8">
            Tell us what you need and we'll get back to you with real pricing — no pressure, no runaround.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="contact-name">Name *</label>
                <input
                  required
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="contact-phone">Phone</label>
                <input
                  id="contact-phone"
                  type="tel"
                  inputMode="tel"
                  name="phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
                  placeholder="(601) 555-0123"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="contact-email">Email *</label>
              <input
                required
                id="contact-email"
                type="email"
                inputMode="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">I&apos;m interested in</label>
              <select
                name="interest"
                value={form.interest}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
              >
                <option value="">Select a category</option>
                <option>Zero Turn Mowers</option>
                <option>Stand-On Mowers</option>
                <option>Walk-Behind Mowers</option>
                <option>Service / Repair</option>
                <option>Not sure — need help choosing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Property size (acres)</label>
              <input
                name="propertySize"
                value={form.propertySize}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
                placeholder="e.g. 2 acres, 10+ acres, commercial"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8C8C8]"
                placeholder="Tell us more about what you're looking for..."
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
              {loading ? 'Sending...' : 'Send My Request'}
            </button>
          </form>
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="bg-black text-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-[#C8C8C8]">Dykes Motors Power Equipment</h2>
            <div className="space-y-3 text-sm text-gray-300">
              <p>📍 3069 Hwy 49, Collins, MS 39428</p>
              <p>📞 Sales: <a href="tel:6016415475" className="text-[#C8C8C8]">(601) 641-5475</a></p>
              <p>📞 Service &amp; Parts: <a href="tel:6013362541" className="text-[#C8C8C8]">(601) 336-2541</a></p>
              <p>✉️ <a href="mailto:info@dykesmotors.com" className="text-[#C8C8C8]">info@dykesmotors.com</a></p>
              <p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=3069+Hwy+49+Collins+MS+39428"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C8C8C8] underline"
                >
                  Get directions →
                </a>
              </p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm font-semibold text-white mb-2">Sales Hours</p>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Mon–Fri: 9:00am – 6:00pm</p>
                <p>Saturday: 9:00am – 2:00pm</p>
                <p>Sunday: Closed</p>
              </div>
              <p className="text-sm font-semibold text-white mt-4 mb-2">Service &amp; Parts Hours</p>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Mon–Fri: 9:00am – 7:00pm</p>
                <p>Saturday: 9:00am – 2:00pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200">
            <iframe
              title="Dykes Motors Power Equipment location map"
              src="https://maps.google.com/maps?q=3069+Hwy+49+Collins+MS+39428&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold mb-3">Why buy local?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-[#C8C8C8]">✓</span> See the machines in person before you buy</li>
              <li className="flex gap-2"><span className="text-[#C8C8C8]">✓</span> Local service and support after the sale</li>
              <li className="flex gap-2"><span className="text-[#C8C8C8]">✓</span> Real advice from people who know the machines</li>
              <li className="flex gap-2"><span className="text-[#C8C8C8]">✓</span> Financing options available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
