/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { AboutAndReviews } from './components/AboutAndReviews';
import { CallAheadDrawer } from './components/CallAheadDrawer';
import { Hero } from './components/Hero';
import { LocationAndFooter } from './components/LocationAndFooter';
import { MenuSection } from './components/MenuSection';
import { Navbar } from './components/Navbar';
import { SpecialsSection } from './components/SpecialsSection';
import type { MenuItem } from './data/tavernData';
import { getTavernHoursStatus } from './utils/hours';

export default function App() {
  const [now, setNow] = useState(() => new Date());
  const [callAheadQuantities, setCallAheadQuantities] = useState<Record<string, number>>({});
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  // Refresh live Central Time open/closed indicator every 60 seconds
  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  // Listen for Google Maps Platform quota limit events at top-level context
  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const hoursStatus = useMemo(() => getTavernHoursStatus(now), [now]);

  const callAheadCount = useMemo(
    () =>
      Object.values(callAheadQuantities).reduce((sum, count) => sum + count, 0),
    [callAheadQuantities]
  );

  const handleUpdateQuantity = (item: MenuItem, delta: number) => {
    setCallAheadQuantities((prev) => {
      const nextCount = Math.max(0, (prev[item.id] ?? 0) + delta);
      if (nextCount === 0) {
        const rest = { ...prev };
        delete rest[item.id];
        return rest;
      }
      return { ...prev, [item.id]: nextCount };
    });
  };

  const handleClearCallAhead = () => {
    setCallAheadQuantities({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#18181B]">
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar
        callAheadCount={callAheadCount}
        onOpenCallAhead={() => setIsOrderDrawerOpen(true)}
      />

      <main className="flex-1">
        <Hero hoursStatus={hoursStatus} />
        <MenuSection
          callAheadQuantities={callAheadQuantities}
          onUpdateQuantity={handleUpdateQuantity}
        />
        <SpecialsSection />
        <AboutAndReviews />
        <LocationAndFooter hoursStatus={hoursStatus} />
      </main>

      <CallAheadDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        quantities={callAheadQuantities}
        onUpdateQuantity={handleUpdateQuantity}
        onClearAll={handleClearCallAhead}
        hoursStatus={hoursStatus}
      />
    </div>
  );
}
