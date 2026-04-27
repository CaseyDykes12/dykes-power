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
            <li><Link href="/products/zero-turn-mowers" className="hover:text-[#C8C8C8]">Zero Turn Mowers</Link></li>
            <li><Link href="/products/stand-on-mowers" className="hover:text-[#C8C8C8]">Stand-On Mowers</Link></li>
            <li><Link href="/products/walk-behind-mowers" className="hover:text-[#C8C8C8]">Walk-Behind Mowers</Link></li>
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
            <li><Link href="/support" className="hover:text-[#C8C8C8]">Customer Support</Link></li>
            <li><Link href="/warranty" className="hover:text-[#C8C8C8]">Warranty</Link></li>
            <li><Link href="/blog" className="hover:text-[#C8C8C8]">Blog</Link></li>
            <li><Link href="/why-ferris" className="hover:text-[#C8C8C8]">Why Ferris</Link></li>
            <li><Link href="/accessories" className="hover:text-[#C8C8C8]">Accessories</Link></li>
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
        <div className="flex items-center gap-5">
          {/* Facebook */}
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

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@dykesmotors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dykes Motors on YouTube"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@dykesmotors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dykes Motors on TikTok"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z" />
            </svg>
          </a>

          {/* Instagram (keep for completeness — same brand family) */}
          <a
            href="https://www.instagram.com/dykesmotors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dykes Motors on Instagram"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>

          <p className="text-xs text-gray-600 ml-2 hidden md:inline">Family-owned in Mississippi · Established 2025 in Collins, MS</p>
        </div>
        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} Dykes Power Equipment. All rights reserved.
        </p>
      </div>

      {/* Payment methods */}
      <div className="relative border-t border-gray-900 max-w-[1280px] mx-auto px-4 py-4">
        <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-2 text-center">We Accept</p>
        <div className="flex items-center justify-center flex-wrap gap-2 md:gap-3">
          {[
            { label: 'Visa', bg: '#1a1f71' },
            { label: 'Mastercard', bg: '#000000' },
            { label: 'Amex', bg: '#016fd0' },
            { label: 'Discover', bg: '#ff6000' },
            { label: 'PayPal', bg: '#003087' },
            { label: 'Apple Pay', bg: '#000000' },
            { label: 'Google Pay', bg: '#4285f4' },
            { label: 'Financing', bg: '#16a34a' },
          ].map(({ label, bg }) => (
            <span
              key={label}
              className="inline-flex items-center justify-center text-white text-[10px] font-bold px-2.5 py-1 rounded border border-gray-800"
              style={{ backgroundColor: bg }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative border-t border-gray-900 max-w-[1280px] mx-auto px-4 py-4 flex items-center justify-center gap-3 text-xs text-gray-600">
        <span>Proudly an Authorized Ferris<sup className="text-[0.6rem]">®</sup> Dealer. Participating in the &ldquo;Feels Like a Ferris&rdquo; national campaign.</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ferris-logo.png" alt="Ferris" className="h-4 w-auto opacity-60" />
      </div>
    </footer>
  );
}
