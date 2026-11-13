import { useState } from 'react';
import { ArrowRight, Clock, MapPin, UtensilsCrossed } from 'lucide-react';
import heroTavernImg from '../assets/images/hero_tavern_burger_pint_1794538419158.jpg';
import { TAVERN_INFO } from '../data/tavernData';
import type { TavernHoursStatus } from '../utils/hours';

interface HeroProps {
  hoursStatus: TavernHoursStatus;
}

export function Hero({ hoursStatus }: HeroProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#18181B] text-[#FAF8F5] min-h-[540px] lg:min-h-[640px] flex items-center"
    >
      {/* Background Photo or CSS Fallback */}
      {!imgError ? (
        <img
          src={heroTavernImg}
          alt="Seared double tavern cheeseburger with melted cheddar and a cold amber draft pint at Bopp's Bar & Grill"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-gradient-to-br from-[#27272A] via-[#18181B] to-[#09090B]"
        />
      )}

      {/* Measured Contrast Scrim for WCAG AA Readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#18181B]/95 via-[#18181B]/80 to-[#18181B]/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#18181B]/90 via-transparent to-[#18181B]/50"
      />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        <div className="max-w-2xl space-y-6">
          {/* Dynamic Open Now / Hours Indicator */}
          <div className="inline-flex flex-wrap items-center gap-2.5 text-sm text-zinc-200 border border-zinc-700/80 bg-[#18181B]/80 backdrop-blur-sm rounded-md px-3.5 py-2">
            <Clock
              className={`w-4 h-4 shrink-0 ${
                hoursStatus.isOpen ? 'text-[#F59E0B]' : 'text-zinc-400'
              }`}
              aria-hidden="true"
            />
            <span
              className={`font-semibold ${
                hoursStatus.isOpen ? 'text-[#FBBF24]' : 'text-zinc-300'
              }`}
            >
              {hoursStatus.statusLabel}
            </span>
            <span aria-hidden="true" className="text-zinc-500">
              ·
            </span>
            <span className="text-zinc-300 tabular-nums">{hoursStatus.detailText}</span>
          </div>

          {/* Display Headline */}
          <h1
            className="font-display font-bold tracking-tight text-[#FAF8F5] leading-[1.08]"
            style={{
              fontSize: 'clamp(2.25rem, 4.4vw, 3.75rem)',
              textWrap: 'balance',
            }}
          >
            Harvard’s Neighborhood Gathering Spot for Cold Drinks &amp; Classic Grill Fare
          </h1>

          {/* Supporting Copy & Address */}
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
            Fresh locally ground burgers, crisp Friday night fish fry, and ice-cold drafts poured at our historic wooden bar at{' '}
            <span className="text-[#FAF8F5] font-medium">103 E Front St, Harvard, IL</span>.
          </p>

          {/* Primary & Secondary Actions */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md bg-[#D97706] hover:bg-[#B45309] text-white text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <UtensilsCrossed className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>View Full Menu</span>
            </a>

            <a
              href={TAVERN_INFO.mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-md border border-zinc-500/80 bg-[#18181B]/70 hover:bg-zinc-800 text-[#FAF8F5] text-base font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
            >
              <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
              <span>Get Directions</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Quiet Hours Summary Line */}
          <p className="pt-2 text-xs sm:text-sm text-zinc-400 tabular-nums">
            Mon–Thu: 11:00 AM – 10:00 PM <span aria-hidden="true" className="mx-2 text-zinc-600">|</span> Fri–Sun: 11:00 AM – 12:00 AM
          </p>
        </div>
      </div>
    </section>
  );
}
