import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LS Tractors — Coming Soon | Dykes Motors Power Equipment',
  description:
    'Dykes Motors is now an authorized LS Tractor dealer in Collins, Mississippi. Check back soon for inventory and announcements.',
  alternates: { canonical: 'https://www.dykespower.com/ls-tractors' },
};

export default function LSTractorsPage() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center py-24">
        <p className="text-[#C8C8C8] text-sm font-semibold uppercase tracking-widest mb-4">
          Coming Soon
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
          LS Tractors
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          We are excited to announce that Dykes Motors is now an Authorized LS Tractor Dealer. Check back soon for product listings and further announcements!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="tel:6016415475" className="btn-primary">
            Call (601) 641-5475
          </a>
          <Link href="/contact" className="btn-outline">
            Get Notified
          </Link>
        </div>
      </div>
    </div>
  );
}
