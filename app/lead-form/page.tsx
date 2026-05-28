import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us | Dykes Motors Power Equipment',
  description: 'Get in touch with Dykes Motors Power Equipment. Sales, service, parts, and financing inquiries.',
  robots: { index: false, follow: false },
};

export default function LeadFormPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2 text-white">Contact Us</h1>
      <p className="text-gray-400 mb-10">
        Fill out the form below and a Dykes Motors representative will reach out to you shortly.
      </p>

      <form className="space-y-6" action="#" method="POST">
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
            <option value="ferris-mower">Ferris Mower</option>
            <option value="ls-tractor">LS Tractor</option>
            <option value="massimo-powersports">Massimo Powersports</option>
            <option value="trailer">Utility Trailer</option>
            <option value="parts">Parts</option>
            <option value="service">Service</option>
            <option value="financing">Financing</option>
            <option value="other">Other</option>
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

        {/* SMS Consent — required by TCR/10DLC */}
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
              <Link href="/sms-terms" className="underline text-white hover:text-[#C8C8C8]">
                SMS Terms
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline text-white hover:text-[#C8C8C8]">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="btn-primary w-full text-center"
        >
          Submit
        </button>
      </form>

      <p className="text-gray-500 text-xs mt-8">
        Dykes Motors, LLC · 3069 Hwy 49, Collins, MS 39428 ·{' '}
        <a href="tel:6016415475" className="underline hover:text-gray-300">(601) 641-5475</a> ·{' '}
        <a href="mailto:info@dykesmotors.com" className="underline hover:text-gray-300">info@dykesmotors.com</a>
      </p>
    </div>
  );
}
