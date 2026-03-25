'use client';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './CartIcon';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/df-logo.png" alt="Dykes Family Logo" className="h-10 w-auto" />
          <div className="flex flex-col leading-none">
            <span
              className="text-2xl tracking-widest text-white leading-tight"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.08em', WebkitTextStroke: '0.5px #888' }}
            >
              DYKES MOTORS
            </span>
            <span
              className="text-sm tracking-widest uppercase leading-tight"
              style={{ fontFamily: 'var(--font-bebas)', color: '#C8C8C8', letterSpacing: '0.12em' }}
            >
              Power Equipment
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <Link href="/catalog" className="hover:text-[#C8C8C8] transition-colors">Shop</Link>
          <Link href="/catalog?category=Zero+Turn+Mowers" className="hover:text-[#C8C8C8] transition-colors">Zero Turn</Link>
          <Link href="/catalog?category=Stand-On+Mowers" className="hover:text-[#C8C8C8] transition-colors">Stand-On</Link>
          <Link href="/parts" className="hover:text-[#C8C8C8] transition-colors">Parts</Link>
          <Link href="/service" className="hover:text-[#C8C8C8] transition-colors">Service</Link>
          <Link href="/contact" className="hover:text-[#C8C8C8] transition-colors">Contact</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <CartIcon />
          <Link href="/contact" className="hidden md:inline-block btn-primary text-sm py-2 px-4">
            Get a Quote
          </Link>
          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black border-t border-gray-800 px-4 py-4 flex flex-col gap-4 text-sm font-semibold">
          <Link href="/catalog" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Shop All</Link>
          <Link href="/catalog?category=Zero+Turn+Mowers" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Zero Turn Mowers</Link>
          <Link href="/catalog?category=Stand-On+Mowers" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Stand-On Mowers</Link>
          <Link href="/parts" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Parts</Link>
          <Link href="/service" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Service</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Contact</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary text-center">Get a Quote</Link>
        </div>
      )}
    </header>
  );
}
