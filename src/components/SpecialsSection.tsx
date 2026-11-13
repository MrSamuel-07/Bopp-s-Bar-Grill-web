import { useState } from 'react';
import { Calendar, Flame, Tv } from 'lucide-react';
import fridayFishFryImg from '../assets/images/friday_fish_fry_plate_1794538419009.jpg';
import { TAVERN_INFO, WEEKLY_SPECIALS } from '../data/tavernData';

export function SpecialsSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="specials"
      className="bg-[#18181B] text-[#FAF8F5] py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left 7 Cols: Specials Copy & 2x2 Highlight Grid */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
                <Flame className="w-4 h-4" aria-hidden="true" />
                <span>Weekly Tavern Hooks &amp; Game Days</span>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF8F5]"
                style={{ textWrap: 'balance' }}
              >
                Midweek Wing Nights, Friday Fish Fry &amp; Late-Night Kitchen
              </h2>
              <p className="text-base text-zinc-300 leading-relaxed max-w-xl">
                Whether you’re meeting neighbors after work on Wednesday or grabbing a booth before kickoff, there is always something hot coming out of our kitchen.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {WEEKLY_SPECIALS.map((special) => (
                <div
                  key={special.id}
                  className="rounded-lg bg-[#27272A] border border-zinc-700/80 p-5 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs text-zinc-400">
                      <span className="font-semibold text-[#F59E0B] uppercase tracking-wider">
                        {special.dayLabel}
                      </span>
                      <span className="tabular-nums">{special.timing}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#FAF8F5]">
                      {special.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#FBBF24]">
                      {special.highlight}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {special.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Friday Fish Fry Visual Spotlight & Game Day Callout */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-[#27272A] flex-1 min-h-[280px]">
              {!imgError ? (
                <img
                  src={fridayFishFryImg}
                  alt="Golden beer-battered Friday night cod fish fry platter with fries, marble rye, and tartar sauce"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full min-h-[280px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#27272A] to-[#18181B]">
                  <Calendar className="w-10 h-10 text-[#F59E0B] mb-3" aria-hidden="true" />
                  <p className="font-display text-xl font-bold text-[#FAF8F5]">
                    Friday Night Fish Fry
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">
                    Hand-dipped Atlantic cod served every Friday from 11:00 AM
                  </p>
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#18181B]/90 via-[#18181B]/20 to-transparent"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 space-y-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
                  Every Friday · Harvard Tradition
                </p>
                <p className="font-display text-xl font-bold text-[#FAF8F5]">
                  Beer-Battered Cod Platter
                </p>
                <p className="text-sm text-zinc-300">
                  Served with creamy coleslaw, buttered marble rye &amp; house tartar.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-[#27272A] border border-zinc-700/80 p-5 flex items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Tv className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#FAF8F5]">
                    Calling in a Friday Night Pickup?
                  </p>
                  <p className="text-xs text-zinc-300 mt-0.5">
                    Skip the wait and phone your fish fry order ahead.
                  </p>
                </div>
              </div>
              <a
                href={TAVERN_INFO.phoneHref}
                className="px-4 py-2 rounded-md bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold whitespace-nowrap shrink-0 transition-colors tabular-nums"
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
