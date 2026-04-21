import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative bg-black text-gray-400 overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-center text-[22vw] md:text-[14vw] font-black text-white/[0.03] leading-none tracking-tighter select-none"
        style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.02em' }}
      >
        DYKES MOTORS
      </span>
      <div className="relative max-w-[1280px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/df-logo.png" alt="Dykes Family Logo" className="h-10 w-auto mb-2" />
          <p className="text-2xl text-white leading-tight tracking-widest" style={{ fontFamily: 'var(--font-bebas)', WebkitTextStroke: '0.5px #888' }}>
            DYKES MOTORS
          </p>
          <p className="text-sm tracking-widest uppercase leading-tight mb-1" style={{ fontFamily: 'var(--font-bebas)', color: '#C8C8C8', letterSpacing: '0.12em' }}>
            Power Equipment
          </p>
          <p className="text-sm text-gray-400">Authorized Ferris Dealer<br />Collins, Mississippi</p>
          <p className="text-sm mt-3">
            Sales: <a href="tel:6019095380" className="hover:text-[#C8C8C8]">(601) 909-5380</a>
          </p>
          <p className="text-sm">
            Service: <a href="tel:6013362541" className="hover:text-[#C8C8C8]">(601) 336-2541</a>
          </p>
          <p className="text-sm mt-1">
            <a href="mailto:info@dykesmotors.com" className="hover:text-[#C8C8C8]">info@dykesmotors.com</a>
          </p>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/catalog?category=Zero+Turn+Mowers" className="hover:text-[#C8C8C8]">Zero Turn Mowers</Link></li>
            <li><Link href="/catalog?category=Stand-On+Mowers" className="hover:text-[#C8C8C8]">Stand-On Mowers</Link></li>
            <li><Link href="/catalog?category=Walk-Behind+Mowers" className="hover:text-[#C8C8C8]">Walk-Behind Mowers</Link></li>
            <li><Link href="/trailers" className="hover:text-[#C8C8C8]">Utility Trailers</Link></li>
            <li><Link href="/catalog" className="hover:text-[#C8C8C8]">All Products</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-3">Support</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-[#C8C8C8]">About Us</Link></li>
            <li><Link href="/service" className="hover:text-[#C8C8C8]">Service & Repairs</Link></li>
            <li><Link href="/contact" className="hover:text-[#C8C8C8]">Get a Quote</Link></li>
            <li><Link href="/contact" className="hover:text-[#C8C8C8]">Contact Us</Link></li>
            <li><Link href="/blog" className="hover:text-[#C8C8C8]">Blog</Link></li>
            <li><a href="/downloads/ferris-2026-catalog.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8C8C8]">2026 Ferris Catalog (PDF)</a></li>
            <li><Link href="/shipping-returns" className="hover:text-[#C8C8C8]">Shipping & Returns</Link></li>
            <li><Link href="/privacy" className="hover:text-[#C8C8C8]">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#C8C8C8]">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-white mb-2">Sales Hours</p>
          <ul className="space-y-1 text-sm mb-3">
            <li>Mon–Fri: 9am – 6pm</li>
            <li>Sat: 9am – 2pm</li>
            <li>Sun: Closed</li>
          </ul>
          <p className="font-semibold text-white mb-2">Service Hours</p>
          <ul className="space-y-1 text-sm">
            <li>Mon–Fri: 9am – 7pm</li>
            <li>Sat: 9am – 2pm</li>
            <li>Sun: Closed</li>
          </ul>
          <p className="text-sm mt-4 text-gray-500">3069 Hwy 49, Collins, MS 39428</p>
        </div>
      </div>
      <div className="relative border-t border-gray-800 max-w-[1280px] mx-auto px-4 py-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/DykesMotor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dykes Motors on Facebook"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
            </svg>
          </a>
          <p className="text-xs text-gray-600">Built in Mississippi. Backed by Dykes.</p>
        </div>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Dykes Power Equipment. All rights reserved.
        </p>
      </div>
      <div className="relative border-t border-gray-900 max-w-[1280px] mx-auto px-4 py-4 flex items-center justify-center gap-3 text-xs text-gray-600">
        <span>Proudly an Authorized Ferris<sup className="text-[0.6rem]">®</sup> Dealer. Participating in the &ldquo;Feels Like a Ferris&rdquo; national campaign.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ferris-logo.png" alt="Ferris" className="h-4 w-auto opacity-60" />
      </div>
    </footer>
  );
}
