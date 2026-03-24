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
      if (res.ok) setSubmitted(true);
    } catch {
      alert('Something went wrong. Please call us directly at (601) 606-2095.');
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
          call us at <a href="tel:6016062095" className="text-[#00CFD7] font-semibold">(601) 606-2095</a>.
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Name *</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00CFD7]"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00CFD7]"
                  placeholder="(601) 555-0123"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Email *</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00CFD7]"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">I&apos;m interested in</label>
              <select
                name="interest"
                value={form.interest}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00CFD7]"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00CFD7]"
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00CFD7]"
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
            <h2 className="text-xl font-bold mb-4 text-[#00CFD7]">Dykes Power Equipment</h2>
            <div className="space-y-3 text-sm text-gray-300">
              <p>📍 Collins, Mississippi 39428</p>
              <p>📞 <a href="tel:6016062095" className="text-[#00CFD7]">(601) 606-2095</a></p>
              <p>✉️ <a href="mailto:Casey@dykesmotors.com" className="text-[#00CFD7]">Casey@dykesmotors.com</a></p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-sm font-semibold text-white mb-2">Hours</p>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Mon–Fri: 8:00am – 5:00pm</p>
                <p>Saturday: 8:00am – 12:00pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold mb-3">Why buy local?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2"><span className="text-[#00CFD7]">✓</span> See the machines in person before you buy</li>
              <li className="flex gap-2"><span className="text-[#00CFD7]">✓</span> Local service and support after the sale</li>
              <li className="flex gap-2"><span className="text-[#00CFD7]">✓</span> Real advice from people who know the machines</li>
              <li className="flex gap-2"><span className="text-[#00CFD7]">✓</span> Financing options available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
