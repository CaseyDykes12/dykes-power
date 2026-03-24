import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 mt-16">
      <div className="max-w-[1280px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <p className="font-bold text-white text-lg mb-2" style={{ fontFamily: 'var(--font-montserrat)', color: '#00CFD7' }}>
            DYKES POWER
          </p>
          <p className="text-sm text-gray-400">Authorized Ferris Dealer<br />Collins, Mississippi</p>
          <p className="text-sm mt-3">
            <a href="tel:6016062095" className="hover:text-[#00CFD7]">(601) 606-2095</a>
          </p>
          <p className="text-sm">
            <a href="mailto:Casey@dykesmotors.com" className="hover:text-[#00CFD7]">Casey@dykesmotors.com</a>
          </p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/catalog?category=Zero+Turn+Mowers" className="hover:text-[#00CFD7]">Zero Turn Mowers</Link></li>
            <li><Link href="/catalog?category=Stand-On+Mowers" className="hover:text-[#00CFD7]">Stand-On Mowers</Link></li>
            <li><Link href="/catalog?category=Walk-Behind+Mowers" className="hover:text-[#00CFD7]">Walk-Behind Mowers</Link></li>
            <li><Link href="/catalog" className="hover:text-[#00CFD7]">All Products</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Support</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/service" className="hover:text-[#00CFD7]">Service & Repairs</Link></li>
            <li><Link href="/contact" className="hover:text-[#00CFD7]">Get a Quote</Link></li>
            <li><Link href="/contact" className="hover:text-[#00CFD7]">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Hours</p>
          <ul className="space-y-1 text-sm">
            <li>Mon–Fri: 8am – 5pm</li>
            <li>Sat: 8am – 12pm</li>
            <li>Sun: Closed</li>
          </ul>
          <p className="text-sm mt-4 text-gray-500">Collins, MS 39428</p>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-xs text-gray-600 py-4">
        © {new Date().getFullYear()} Dykes Power Equipment. All rights reserved. Authorized Ferris Dealer.
      </div>
    </footer>
  );
}
