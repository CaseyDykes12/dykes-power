import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Buy | Dykes Motors Power Equipment',
  description: 'How to purchase Ferris mowers and equipment from Dykes Motors Power Equipment in Collins, MS.',
};

export default function CartPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-4 text-white">How to Buy</h1>
      <p className="text-gray-300 mb-8 text-lg">
        Ready to purchase? We handle all sales in person or by phone to make sure you get
        the right machine at the right price — with real answers, not a checkout screen.
      </p>

      <div className="grid gap-4 text-left mb-10">
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
          <p className="text-white font-bold mb-1">Call Us</p>
          <p className="text-gray-400 text-sm mb-2">Talk to our sales team directly.</p>
          <a href="tel:6016415475" className="text-[#C8C8C8] font-semibold hover:text-white">(601) 641-5475</a>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
          <p className="text-white font-bold mb-1">Request a Quote</p>
          <p className="text-gray-400 text-sm mb-2">Fill out our contact form and we&apos;ll get back to you within one business day.</p>
          <Link href="/contact" className="text-[#C8C8C8] font-semibold hover:text-white">Go to Contact Form</Link>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
          <p className="text-white font-bold mb-1">Visit Our Dealership</p>
          <p className="text-gray-400 text-sm mb-2">Walk the lot and see the machines in person.</p>
          <p className="text-[#C8C8C8] font-semibold">3069 Hwy 49, Collins, MS 39428</p>
          <p className="text-gray-500 text-xs mt-1">Mon-Fri 9am-6pm | Sat 9am-2pm</p>
        </div>
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
          <p className="text-white font-bold mb-1">Apply for Financing</p>
          <p className="text-gray-400 text-sm mb-2">Get pre-qualified in minutes with no credit impact.</p>
          <Link href="/financing" className="text-[#C8C8C8] font-semibold hover:text-white">Start Application</Link>
        </div>
      </div>

      <Link href="/catalog" className="btn-primary py-3 px-8">
        Browse Our Catalog
      </Link>
    </div>
  );
}
