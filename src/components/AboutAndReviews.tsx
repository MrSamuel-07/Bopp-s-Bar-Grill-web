import { useState } from 'react';
import { Award, Quote, Star } from 'lucide-react';
import tavernInteriorImg from '../assets/images/tavern_bar_interior_clean_1794538435368.jpg';
import { LOCAL_REVIEWS, TAVERN_INFO } from '../data/tavernData';

export function AboutAndReviews() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      className="bg-[#FAF8F5] text-[#18181B] py-16 sm:py-20 lg:py-24 border-b border-zinc-200/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
        {/* About Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-100 min-h-[300px]">
            {!imgError ? (
              <img
                src={tavernInteriorImg}
                alt="Historic polished wood bar, brass beer taps, and warm Edison lighting inside Bopp's Bar & Grill in Harvard, IL"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-zinc-200 to-zinc-100">
                <Award className="w-10 h-10 text-[#D97706] mb-3" aria-hidden="true" />
                <p className="font-display text-xl font-bold text-[#18181B]">
                  103 E Front St · Downtown Harvard
                </p>
                <p className="text-sm text-zinc-600 mt-1">
                  Historic neighborhood bar &amp; family-friendly grill
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center space-y-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#B45309]">
              Our Story · Downtown Harvard
            </p>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B]"
              style={{ textWrap: 'balance' }}
            >
              A Historic Front Street Tavern Built on Fresh Grill Fare &amp; Familiar Faces
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              Housed in one of downtown Harvard’s longest-running bar spaces, Bopp’s Bar &amp; Grill pairs classic small-town tavern character with a scratch-minded kitchen. From our polished mahogany bar to our cozy dining booths, it is a clean, laid-back room where neighbors stop in for a quick lunch, families gather on Friday nights, and regulars pull up a stool for the game.
            </p>
            <p className="text-base text-zinc-600 leading-relaxed">
              We keep things straightforward: locally ground beef seared to order on a seasoned flattop, crisp hand-dipped Atlantic cod every Friday, and frosty cold pints poured fast.
            </p>

            <div className="pt-2 grid grid-cols-3 gap-4 border-t border-zinc-200">
              <div className="pt-4">
                <p className="font-display text-2xl font-bold text-[#18181B] tabular-nums">
                  103
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">E Front St Landmark</p>
              </div>
              <div className="pt-4">
                <p className="font-display text-2xl font-bold text-[#18181B] tabular-nums">
                  4.4 ★
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">Local Guest Rating</p>
              </div>
              <div className="pt-4">
                <p className="font-display text-2xl font-bold text-[#18181B] tabular-nums">
                  7 Days
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">Open Daily at 11 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof / Local Love Trust Bar */}
        <div className="space-y-8 pt-4 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#B45309]">
                Local Love
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#18181B]">
                Trusted by Harvard &amp; McHenry County Regulars
              </h3>
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-md bg-white border border-zinc-200 shrink-0">
              <div className="flex items-center gap-0.5 text-[#D97706]" aria-label="4.4 out of 5 stars">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < 4 ? 'fill-[#D97706] text-[#D97706]' : 'fill-[#D97706]/40 text-[#D97706]'
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-[#18181B] tabular-nums">
                {TAVERN_INFO.ratingScore}★ Rating
              </span>
              <span aria-hidden="true" className="text-zinc-300">
                ·
              </span>
              <span className="text-sm text-zinc-600 tabular-nums">
                {TAVERN_INFO.reviewCountLabel} Local Reviews
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LOCAL_REVIEWS.map((review) => (
              <blockquote
                key={review.id}
                className="rounded-lg bg-white border border-zinc-200 p-6 flex flex-col justify-between gap-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Quote className="w-5 h-5 text-[#D97706]" aria-hidden="true" />
                    <div className="flex items-center gap-0.5 text-[#D97706]" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star
                          key={idx}
                          className="w-3.5 h-3.5 fill-[#D97706]"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-700 leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <footer className="pt-3 border-t border-zinc-100">
                  <p className="text-sm font-semibold text-[#18181B]">
                    {review.author}
                  </p>
                  <p className="text-xs text-zinc-500 mt-0.5">{review.context}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
