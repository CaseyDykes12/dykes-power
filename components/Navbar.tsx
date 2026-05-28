'use client';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './CartIcon';

const FERRIS_MEGA_MENU: Array<{
  heading: string;
  href?: string;
  models?: Array<{ label: string; href: string }>;
}> = [
  {
    heading: 'Zero Turn Mowers',
    href: '/products/zero-turn-mowers',
    models: [
      { label: 'F60 Zero Turn', href: '/product/5901895' },
      { label: '300e Electric Zero Turn', href: '/product/5902093' },
      { label: '300R Zero Turn', href: '/product/5902204' },
      { label: '300S Zero Turn', href: '/product/5902207' },
      { label: '500S Zero Turn', href: '/product/5902101' },
      { label: 'IS® 600 Zero Turn', href: '/product/5902110' },
      { label: 'IS® 700 Zero Turn', href: '/product/5902107' },
      { label: 'ISX™ 800 Zero Turn', href: '/product/5902154' },
      { label: 'ISX™ 2200 Zero Turn', href: '/product/5902159' },
      { label: 'ISX™ 3300 Zero Turn', href: '/product/5902064' },
      { label: 'IS® 2600 Zero Turn (Diesel)', href: '/product/5901929' },
      { label: 'IS® 6200 Zero Turn (Diesel)', href: '/product/5902162' },
    ],
  },
  {
    heading: 'Stand-On Mowers',
    href: '/products/stand-on-mowers',
    models: [
      { label: 'SRS™ Z1 Stand-On', href: '/product/5901941' },
      { label: 'SRS™ Z2 Stand-On', href: '/product/5902164' },
      { label: 'SRS™ Z3X Stand-On', href: '/product/5902168' },
    ],
  },
  {
    heading: 'Walk-Behind Mowers',
    href: '/products/walk-behind-mowers',
    models: [
      { label: 'FW15 Walk-Behind', href: '/product/5901737' },
      { label: 'FW25 Walk-Behind', href: '/product/5901886' },
      { label: 'FW45 Walk-Behind', href: '/product/5902014' },
    ],
  },
  {
    heading: 'Front-Mount Mowers',
    href: '/products/front-mount-mowers',
    models: [
      { label: 'ProCut S Front Mount', href: '/product/5900533' },
    ],
  },
  {
    heading: 'Stand-On Blowers',
    href: '/products/stand-on-blowers',
    models: [
      { label: 'FB1000 Hurricane™', href: '/product/5902012' },
      { label: 'FB2000 Hurricane™', href: '/product/5902193' },
      { label: 'FB3000 Hurricane™', href: '/product/5902194' },
    ],
  },
  {
    heading: 'Ride-On Spreader/Sprayers',
    href: '/products/ride-on-spreader-sprayers',
    models: [
      { label: 'Venture', href: '/product/5902195' },
      { label: 'Pathfinder XC', href: '/product/5902209' },
      { label: 'Pathfinder', href: '/product/5902208' },
      { label: 'Rover XC', href: '/product/5902199' },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/df-logo.png" alt="Dykes Family Logo" className="h-8 sm:h-10 w-auto shrink-0" />
          <div className="flex flex-col leading-none min-w-0">
            <span
              className="text-lg sm:text-2xl tracking-widest text-white leading-tight truncate"
              style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.08em' }}
            >
              DYKES MOTORS
            </span>
            <span
              className="text-[10px] sm:text-sm tracking-widest uppercase leading-tight truncate"
              style={{ fontFamily: 'var(--font-bebas)', color: '#C8C8C8', letterSpacing: '0.12em' }}
            >
              Power Equipment
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-semibold whitespace-nowrap">
          {/* Ferris — mega-menu */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#C8C8C8] transition-colors py-5" aria-haspopup="true">
              Ferris
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute left-0 top-full mt-0 bg-black border border-gray-800 rounded-lg shadow-xl min-w-[270px] opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-150 z-50 py-2">
              <Link href="/catalog" className="block px-4 py-2 text-[#C8C8C8] font-semibold hover:bg-gray-900 transition-colors border-b border-gray-800 mb-1">
                View All Ferris
              </Link>
              {FERRIS_MEGA_MENU.map((cat) => {
                const hasModels = cat.models && cat.models.length > 0;
                if (!hasModels) return null;
                return (
                  <div key={cat.heading} className="relative group/sub">
                    {cat.href ? (
                      <Link
                        href={cat.href}
                        className="flex items-center justify-between px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors"
                      >
                        <span>{cat.heading}</span>
                        <svg className="w-3 h-3 ml-3 shrink-0 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors cursor-default">
                        <span>{cat.heading}</span>
                        <svg className="w-3 h-3 ml-3 shrink-0 opacity-60" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                      </div>
                    )}
                    <div className="absolute left-full top-0 ml-0 bg-black border border-gray-800 rounded-lg shadow-xl min-w-[280px] opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible focus-within:opacity-100 focus-within:visible transition-all duration-150 z-50 py-2">
                      {cat.href && (
                        <>
                          <Link
                            href={cat.href}
                            className="block px-4 py-2 text-[#C8C8C8] font-semibold hover:bg-gray-900 transition-colors"
                          >
                            Shop all {cat.heading.toLowerCase()}
                          </Link>
                          <div className="border-t border-gray-800 my-1" />
                        </>
                      )}
                      {cat.models!.map((m) => (
                        <Link
                          key={m.href}
                          href={m.href}
                          className="block px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors"
                        >
                          {m.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link href="https://www.dykesmotors.com" className="hover:text-[#C8C8C8] transition-colors">Vehicles</Link>
          <Link href="/ls-tractors" className="hover:text-[#C8C8C8] transition-colors">LS Tractors</Link>
          <Link href="/massimo-powersports" className="hover:text-[#C8C8C8] transition-colors">Massimo</Link>
          <Link href="/service" className="hover:text-[#C8C8C8] transition-colors">Service</Link>
          <Link href="/parts" className="hover:text-[#C8C8C8] transition-colors">Parts</Link>
          <Link href="/trailers" className="hover:text-[#C8C8C8] transition-colors">Trailers</Link>
          <Link href="/contact" className="hover:text-[#C8C8C8] transition-colors">Contact</Link>
          <Link href="/about" className="hover:text-[#C8C8C8] transition-colors">About Us</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <CartIcon />
          <a
            href="tel:6019095380"
            aria-label="Call Dykes Motors Power Equipment at (601) 909-5380"
            className="btn-primary text-sm py-2 px-3 md:px-4 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="hidden lg:inline">Call (601) 909-5380</span>
            <span className="lg:hidden">Call</span>
          </a>
          <button
            className="lg:hidden text-white"
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

      {/* Mobile category strip */}
      <nav
        aria-label="Shop categories"
        className="lg:hidden border-t border-gray-800 overflow-x-auto no-scrollbar"
      >
        <div className="flex items-center gap-1 px-3 py-2 text-xs font-semibold whitespace-nowrap">
          <Link href="/catalog" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Ferris</Link>
          <Link href="https://www.dykesmotors.com" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Vehicles</Link>
          <Link href="/ls-tractors" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">LS Tractors</Link>
          <Link href="/massimo-powersports" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Massimo</Link>
          <Link href="/service" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Service</Link>
          <Link href="/parts" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Parts</Link>
          <Link href="/trailers" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Trailers</Link>
          <Link href="/contact" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Contact</Link>
          <Link href="/about" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">About Us</Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-black border-t border-gray-800 px-4 py-4 flex flex-col gap-3 text-sm font-semibold max-h-[85vh] overflow-y-auto">
          {/* Ferris dropdown */}
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1">Ferris Mowers</p>
          {FERRIS_MEGA_MENU.map((cat) => {
            const hasModels = cat.models && cat.models.length > 0;
            if (!hasModels) return null;
            return (
              <details key={cat.heading} className="group pl-3">
                <summary className="list-none cursor-pointer flex items-center justify-between hover:text-[#C8C8C8]">
                  <span>{cat.heading}</span>
                  <svg className="w-3 h-3 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </summary>
                <div className="mt-2 flex flex-col gap-2 pl-3 border-l border-gray-800">
                  {cat.href && (
                    <Link
                      href={cat.href}
                      onClick={() => setOpen(false)}
                      className="text-[#C8C8C8] font-semibold text-xs uppercase tracking-wider"
                    >
                      All {cat.heading.toLowerCase()}
                    </Link>
                  )}
                  {cat.models!.map((m) => (
                    <Link
                      key={m.href}
                      href={m.href}
                      onClick={() => setOpen(false)}
                      className="text-gray-400 hover:text-[#C8C8C8] text-sm font-normal"
                    >
                      {m.label}
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}

          <div className="border-t border-gray-800 mt-1 pt-2" />
          <a href="https://www.dykesmotors.com" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Vehicles</a>
          <Link href="/ls-tractors" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">LS Tractors</Link>
          <Link href="/massimo-powersports" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Massimo Powersports</Link>
          <Link href="/service" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Service</Link>
          <Link href="/parts" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Parts</Link>
          <Link href="/trailers" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Trailers</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Contact</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">About Us</Link>
          <a href="tel:6019095380" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">Call (601) 909-5380</a>
        </div>
      )}
    </header>
  );
}
