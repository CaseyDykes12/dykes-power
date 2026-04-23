'use client';
import Link from 'next/link';
import { useState } from 'react';
import CartIcon from './CartIcon';

// Mega-menu structure — mirrors ferrismowers.com Products nav with dealer-only
// additions (Trailers, Parts, Accessories). Each model links to its canonical
// product page.
const PRODUCT_MEGA_MENU: Array<{
  heading: string;
  href?: string;
  models?: Array<{ label: string; href: string }>;
}> = [
  {
    heading: 'Zero Turn Mowers',
    href: '/catalog?category=Zero+Turn+Mowers',
    models: [
      { label: 'F60 Zero Turn', href: '/product/5901895' },
      { label: '300e Electric Zero Turn', href: '/product/5902093' },
      { label: '300R Zero Turn', href: '/product/5902204' },
      { label: '300S Zero Turn', href: '/product/5902144' },
      { label: '500S Zero Turn', href: '/product/5902101' },
      { label: 'IS® 600 Zero Turn', href: '/product/5902110' },
      { label: 'IS® 700 Zero Turn', href: '/product/5902107' },
      { label: 'ISX™ 800 Zero Turn', href: '/product/5902084' },
      { label: 'ISX™ 2200 Zero Turn', href: '/product/5902159' },
      { label: 'ISX™ 3300 Zero Turn', href: '/product/5902064' },
      { label: 'IS® 2600 Zero Turn (Diesel)', href: '/product/5901929' },
      { label: 'IS® 6200 Zero Turn (Diesel)', href: '/product/5902162' },
    ],
  },
  {
    heading: 'Stand-On Mowers',
    href: '/catalog?category=Stand-On+Mowers',
    models: [
      { label: 'SRS™ Z1 Stand-On', href: '/product/5901941' },
      { label: 'SRS™ Z2 Stand-On', href: '/product/5901948' },
      { label: 'SRS™ Z3X Stand-On', href: '/product/5902168' },
    ],
  },
  {
    heading: 'Walk-Behind Mowers',
    href: '/catalog?category=Walk-Behind+Mowers',
    models: [
      { label: 'FW15 Walk-Behind', href: '/product/5901737' },
      { label: 'FW25 Walk-Behind', href: '/product/5901886' },
      { label: 'FW45 Walk-Behind', href: '/product/5902014' },
    ],
  },
  {
    heading: 'Front-Mount Mowers',
    models: [
      { label: 'ProCut S Front Mount', href: '/product/5900533' },
    ],
  },
  {
    heading: 'Stand-On Blowers',
    models: [
      { label: 'FB1000 Hurricane™', href: '/product/5902012' },
      { label: 'FB2000 Hurricane™', href: '/product/5902132' },
      { label: 'FB3000 Hurricane™', href: '/product/5902194' },
    ],
  },
  {
    heading: 'Ride-On Spreader/Sprayers',
    models: [
      { label: 'Venture XC™ FS3200', href: '/product/5901755' },
      { label: 'Venture X', href: '/product/5902195' },
      { label: 'Pathfinder XC™ FS2200', href: '/product/5901753' },
      { label: 'Pathfinder™ FS2100', href: '/product/5901752' },
      { label: 'Rover XC™ FS1200', href: '/product/5902000' },
    ],
  },
  {
    heading: 'Trailers',
    href: '/trailers',
  },
  {
    heading: 'Parts',
    href: '/parts',
  },
  {
    heading: 'Accessories',
    href: '/accessories',
  },
];

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
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold whitespace-nowrap">
          {/* Products — mega-menu with nested model flyouts */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#C8C8C8] transition-colors py-5" aria-haspopup="true">
              Products
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute left-0 top-full mt-0 bg-black border border-gray-800 rounded-lg shadow-xl min-w-[270px] opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-150 z-50 py-2">
              {PRODUCT_MEGA_MENU.map((cat) => {
                const hasModels = cat.models && cat.models.length > 0;
                if (!hasModels) {
                  // Leaf link (Trailers, Parts, Accessories).
                  return (
                    <Link
                      key={cat.heading}
                      href={cat.href!}
                      className="block px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors"
                    >
                      {cat.heading}
                    </Link>
                  );
                }
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
                    {/* Nested model flyout */}
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

          {/* Why Ferris — dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#C8C8C8] transition-colors py-5" aria-haspopup="true">
              Why Ferris
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute left-0 top-full mt-0 bg-black border border-gray-800 rounded-lg shadow-xl min-w-[260px] opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-all duration-150 z-50 py-2">
              <Link href="/why-ferris" className="block px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors font-semibold">Feels Like a Ferris — Overview</Link>
              <div className="border-t border-gray-800 my-1" />
              <Link href="/why-ferris#suspension" className="block px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors">10-Year Suspension Warranty</Link>
              <Link href="/why-ferris#icd-cutting" className="block px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors">iCD+ Cutting System</Link>
              <Link href="/why-ferris#engines" className="block px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors">Vanguard EFI & ETC Engines</Link>
              <Link href="/why-ferris#oil-guard" className="block px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors">Oil Guard Protection</Link>
              <div className="border-t border-gray-800 my-1" />
              <Link href="/why-ferris#calculators" className="block px-4 py-2 hover:bg-gray-900 hover:text-[#C8C8C8] transition-colors">Productivity & ROI Calculators</Link>
            </div>
          </div>

          <Link href="/service" className="hover:text-[#C8C8C8] transition-colors">Service</Link>
          <Link href="/financing" className="hover:text-[#C8C8C8] transition-colors">Financing</Link>
          <Link href="/blog" className="hover:text-[#C8C8C8] transition-colors">Blog</Link>
          <Link href="/contact" className="hover:text-[#C8C8C8] transition-colors">Contact</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <CartIcon />
          {/* Call button — visible on ALL sizes (mobile shows phone icon only, desktop shows full number) */}
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
          {/* Mobile / tablet menu button (hidden at lg+) */}
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

      {/* Mobile / tablet category strip — horizontal scroll, hidden at lg+ */}
      <nav
        aria-label="Shop categories"
        className="lg:hidden border-t border-gray-800 overflow-x-auto no-scrollbar"
      >
        <div className="flex items-center gap-1 px-3 py-2 text-xs font-semibold whitespace-nowrap">
          <Link href="/catalog?category=Zero+Turn+Mowers" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Zero Turn</Link>
          <Link href="/catalog?category=Stand-On+Mowers" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Stand-On</Link>
          <Link href="/trailers" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Trailers</Link>
          <Link href="/parts" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Parts</Link>
          <Link href="/accessories" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Accessories</Link>
          <Link href="/service" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Service</Link>
          <Link href="/financing" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Financing</Link>
          <Link href="/blog" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Blog</Link>
          <Link href="/contact" className="px-3 py-1.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white">Contact</Link>
          <Link href="/why-ferris" className="px-3 py-1.5 rounded-full bg-[#C8C8C8]/10 hover:bg-[#C8C8C8]/20 text-[#C8C8C8] border border-[#C8C8C8]/30">Why Ferris</Link>
        </div>
      </nav>

      {/* Mobile / tablet menu */}
      {open && (
        <div className="lg:hidden bg-black border-t border-gray-800 px-4 py-4 flex flex-col gap-3 text-sm font-semibold max-h-[85vh] overflow-y-auto">
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mt-1">Products</p>
          {PRODUCT_MEGA_MENU.map((cat) => {
            const hasModels = cat.models && cat.models.length > 0;
            if (!hasModels) {
              return (
                <Link
                  key={cat.heading}
                  href={cat.href!}
                  onClick={() => setOpen(false)}
                  className="hover:text-[#C8C8C8] pl-3"
                >
                  {cat.heading}
                </Link>
              );
            }
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
          <Link href="/why-ferris" onClick={() => setOpen(false)} className="text-[#C8C8C8] font-bold">Why Ferris</Link>
          <Link href="/service" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Service</Link>
          <Link href="/financing" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Financing</Link>
          <Link href="/blog" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Blog</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-[#C8C8C8]">Contact</Link>
          <a href="tel:6019095380" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">Call (601) 909-5380</a>
        </div>
      )}
    </header>
  );
}
