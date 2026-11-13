import { useState } from 'react';
import { Menu, Phone, ShoppingBag, X } from 'lucide-react';
import { TAVERN_INFO } from '../data/tavernData';

interface NavbarProps {
  callAheadCount: number;
  onOpenCallAhead: () => void;
}

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Specials', href: '#specials' },
  { label: 'About', href: '#about' },
  { label: 'Location & Hours', href: '#location' },
];

export function Navbar({ callAheadCount, onOpenCallAhead }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full max-w-full h-16 bg-[#18181B]/95 backdrop-blur-md border-b border-zinc-800 text-[#FAF8F5]">
      <div className="max-w-6xl mx-auto w-full h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 min-w-0">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-[15px] sm:text-lg lg:text-xl font-bold tracking-tight text-[#FAF8F5] truncate min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
        >
          BOPP&apos;S BAR &amp; GRILL
        </a>

        {/* Zone 2: Primary Anchor Navigation */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300 shrink-0"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 py-1 hover:text-[#FAF8F5] underline-offset-4 hover:underline decoration-[#D97706] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D97706]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Phone & Call-Ahead Action */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <a
            href={TAVERN_INFO.phoneHref}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-zinc-200 hover:text-white hover:bg-zinc-800/80 transition-colors whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
            aria-label={`Call Bopp's Bar & Grill at ${TAVERN_INFO.phoneDisplay}`}
          >
            <Phone className="w-4 h-4 text-[#D97706]" aria-hidden="true" />
            <span>{TAVERN_INFO.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={onOpenCallAhead}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-4 py-2 rounded-md bg-[#D97706] hover:bg-[#B45309] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
            <span className="sm:hidden">
              Call Ahead{callAheadCount > 0 ? ` (${callAheadCount})` : ''}
            </span>
            <span className="hidden sm:inline">
              Order / Call Ahead{callAheadCount > 0 ? ` (${callAheadCount})` : ''}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D97706]"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18181B] border-b border-zinc-800 px-4 py-4 space-y-2 shadow-xl">
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-base font-medium text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-zinc-800">
            <a
              href={TAVERN_INFO.phoneHref}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium text-[#F59E0B] hover:bg-zinc-800 transition-colors tabular-nums"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Call {TAVERN_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
