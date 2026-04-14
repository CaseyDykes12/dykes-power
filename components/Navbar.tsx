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
          <Link href="/trailers" className="hover:text-[#C8C8C8] transition-colors">Trailers</Link>
          <Link href="/parts" className="hover:text-[#C8C8C8] transition-colors">Parts</Link>
          <Link href="/service" className="hover:text-[#C8C8C8] transition-colors">Service</Link>
          <Link href="/financing" className="hover:text-[#C8C8C8] transition-colors">Financing</Link>
          <Link href="/blog" className="hover:text-[#C8C8C8] transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-[#C8C8C8] transition-colors">Contact</Link>
          <a href="https://www.dykesmotors.com/inventory" target="_blank" rel="noopener noreferrer" className="hover:text-[#C8C8C8] transition-colors">Auto Inventory</a>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Call button — visible on ALL sizes (mobile shows phone icon only, desktop shows full number) */}
          <a
            href="tel:6016415475"
            aria-label="Call Dykes Motors Power Equipment at (601) 641-5475"
            className="btn-primary text-sm py-2 px-3 md:px-4 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="hidden md:inline">Call (601) 641-5475</span>
            <span className="md:hidden">Call</span>
          </a>
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
          <Link href="/trailers" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Trailers</Link>
          <Link href="/parts" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Parts</Link>
          <Link href="/service" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Service</Link>
          <Link href="/financing" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Financing</Link>
          <Link href="/blog" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Blog</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Contact</Link>
          <a href="https://www.dykesmotors.com/inventory" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Auto Inventory</a>
          <a href="tel:6016415475" onClick={() => setOpen(false)} className="btn-primary text-center">Call (601) 641-5475</a>
        </div>
      )}
    </header>
  );
}
