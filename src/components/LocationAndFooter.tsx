/// <reference types="@types/google.maps" />

import { useCallback, useEffect, useState } from 'react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { Clock, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { TAVERN_INFO } from '../data/tavernData';
import type { TavernHoursStatus } from '../utils/hours';

interface LocationAndFooterProps {
  hoursStatus: TavernHoursStatus;
}

const MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

interface ResolvedVenue {
  position: google.maps.LatLngLiteral;
  name: string;
  formattedAddress: string;
}

function isQuotaError(err: unknown): boolean {
  const msg = String(err ?? '');
  return (
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('OVER_QUERY_LIMIT') ||
    msg.includes('OverQuota') ||
    msg.includes('429')
  );
}

function VenueMapContent() {
  const loadingStatus = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');

  const [venue, setVenue] = useState<ResolvedVenue | null>(null);
  const [lookupState, setLookupState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [markerInstance, setMarkerInstance] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);

  const markerRef = useCallback(
    (node: google.maps.marker.AdvancedMarkerElement | null) => {
      setMarkerInstance(node);
    },
    []
  );

  useEffect(() => {
    if (
      loadingStatus === APILoadingStatus.FAILED ||
      loadingStatus === APILoadingStatus.AUTH_FAILURE
    ) {
      setLookupState('error');
      return;
    }

    if (!placesLib) return;

    let cancelled = false;

    async function resolveVenueLocation() {
      try {
        const { places } = await placesLib!.Place.searchByText({
          textQuery: `${TAVERN_INFO.name}, ${TAVERN_INFO.fullAddress}`,
          fields: ['displayName', 'location', 'formattedAddress'],
          region: 'us',
          maxResultCount: 1,
        });

        if (cancelled) return;

        const match = places?.[0];
        if (match?.location) {
          setVenue({
            position: {
              lat: match.location.lat(),
              lng: match.location.lng(),
            },
            name: match.displayName ?? TAVERN_INFO.name,
            formattedAddress: match.formattedAddress ?? TAVERN_INFO.fullAddress,
          });
          setLookupState('ready');
        } else {
          setLookupState('error');
        }
      } catch (err) {
        if (cancelled) return;
        if (isQuotaError(err)) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        setLookupState('error');
      }
    }

    void resolveVenueLocation();

    return () => {
      cancelled = true;
    };
  }, [placesLib, loadingStatus]);

  if (lookupState === 'error') {
    return <MapFallbackCard />;
  }

  if (lookupState === 'loading' || !venue) {
    return (
      <div className="h-[360px] w-full rounded-lg border border-zinc-700 bg-[#27272A] flex flex-col items-center justify-center p-6 text-center">
        <MapPin className="w-7 h-7 text-[#F59E0B] mb-2" aria-hidden="true" />
        <p className="text-sm font-medium text-[#FAF8F5]">
          Loading interactive map for {TAVERN_INFO.streetAddress}…
        </p>
        <p className="text-xs text-zinc-400 mt-1">{TAVERN_INFO.cityStateZip}</p>
      </div>
    );
  }

  return (
    <div className="h-[360px] w-full rounded-lg overflow-hidden border border-zinc-700 bg-[#27272A]">
      <GoogleMap
        mapId="DEMO_MAP_ID"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        defaultCenter={venue.position}
        defaultZoom={16}
        gestureHandling="cooperative"
        mapTypeControl={false}
        streetViewControl={false}
        style={{ width: '100%', height: '100%' }}
      >
        <AdvancedMarker
          ref={markerRef}
          position={venue.position}
          title={venue.name}
          onClick={() => setInfoOpen((prev) => !prev)}
        >
          <Pin
            background="#D97706"
            borderColor="#78350F"
            glyphColor="#FFFFFF"
          />
        </AdvancedMarker>

        {infoOpen && markerInstance && (
          <InfoWindow
            anchor={markerInstance}
            onCloseClick={() => setInfoOpen(false)}
            maxWidth={240}
          >
            <div className="p-1 text-[#18181B] space-y-1">
              <p className="font-bold text-sm">{venue.name}</p>
              <p className="text-xs text-zinc-600">{venue.formattedAddress}</p>
              <a
                href={TAVERN_INFO.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#B45309] hover:underline pt-1"
              >
                <span>Directions in Google Maps</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

function MapFallbackCard() {
  return (
    <div className="h-[360px] w-full rounded-lg border border-zinc-700 bg-[#27272A] flex flex-col items-center justify-center p-8 text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-[#D97706]/15 border border-[#D97706]/40 flex items-center justify-center">
        <MapPin className="w-6 h-6 text-[#F59E0B]" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="font-display text-xl font-bold text-[#FAF8F5]">
          {TAVERN_INFO.name}
        </p>
        <p className="text-sm text-zinc-300">{TAVERN_INFO.fullAddress}</p>
        <p className="text-xs text-zinc-400">
          Downtown Harvard · Steps from the Metra Front Street corridor
        </p>
      </div>
      <a
        href={TAVERN_INFO.mapsPlaceUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors"
      >
        <Navigation className="w-4 h-4" aria-hidden="true" />
        <span>Open in Google Maps</span>
      </a>
    </div>
  );
}

export function LocationAndFooter({ hoursStatus }: LocationAndFooterProps) {
  return (
    <>
      <section
        id="location"
        className="bg-[#18181B] text-[#FAF8F5] py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Address, Hours, Phone & Direct Google Maps Links */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#F59E0B]">
                  Visit Us in Harvard, IL
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF8F5]">
                  Location &amp; Hours
                </h2>
                <p className="text-sm text-zinc-300">
                  Right on East Front Street in downtown Harvard. Easy street parking out front and plenty of room at the bar.
                </p>
              </div>

              <div className="space-y-5 border-t border-zinc-800 pt-6">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Address
                    </p>
                    <p className="text-base font-medium text-[#FAF8F5]">
                      {TAVERN_INFO.streetAddress}
                      <br />
                      {TAVERN_INFO.cityStateZip}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Phone &amp; Call-Ahead Takeout
                    </p>
                    <a
                      href={TAVERN_INFO.phoneHref}
                      className="inline-block text-base font-semibold text-[#FAF8F5] hover:text-[#FBBF24] transition-colors tabular-nums"
                    >
                      {TAVERN_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Hours Breakdown */}
                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Kitchen &amp; Bar Hours
                      </p>
                      <span
                        className={`text-xs font-semibold ${
                          hoursStatus.isOpen ? 'text-[#FBBF24]' : 'text-zinc-400'
                        }`}
                      >
                        {hoursStatus.statusLabel}
                      </span>
                    </div>
                    <dl className="space-y-1.5 text-sm">
                      {TAVERN_INFO.hours.map((row) => (
                        <div
                          key={row.days}
                          className="flex items-center justify-between gap-4 py-1 border-b border-zinc-800/80 last:border-b-0"
                        >
                          <dt className="text-zinc-300 font-medium">{row.days}</dt>
                          <dd className="text-[#FAF8F5] font-semibold tabular-nums">
                            {row.time}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={TAVERN_INFO.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
                >
                  <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Get Directions</span>
                </a>

                <a
                  href={TAVERN_INFO.mapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column: Compact Embedded Google Map */}
            <div className="lg:col-span-7 space-y-3">
              {MAPS_API_KEY ? (
                <APIProvider
                  apiKey={MAPS_API_KEY}
                  libraries={['places', 'marker']}
                  language="en"
                  region="US"
                >
                  <VenueMapContent />
                </APIProvider>
              ) : (
                <MapFallbackCard />
              )}
              <p className="text-xs text-zinc-400 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <span>103 E Front St, Harvard, IL 60033</span>
                <a
                  href={TAVERN_INFO.mapsPlaceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F59E0B] hover:underline whitespace-nowrap"
                >
                  View larger map →
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-[#121215] text-zinc-400 border-t border-zinc-800/80 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-zinc-300">
            <span className="font-display font-bold text-[#FAF8F5]">
              Bopp&apos;s Bar &amp; Grill
            </span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span>{TAVERN_INFO.fullAddress}</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <a
              href={TAVERN_INFO.phoneHref}
              className="hover:text-[#F59E0B] transition-colors tabular-nums"
            >
              {TAVERN_INFO.phoneDisplay}
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a href="#menu" className="hover:text-[#FAF8F5] transition-colors">
              Menu
            </a>
            <a href="#specials" className="hover:text-[#FAF8F5] transition-colors">
              Specials
            </a>
            <a href="#about" className="hover:text-[#FAF8F5] transition-colors">
              About
            </a>
            <a href="#location" className="hover:text-[#FAF8F5] transition-colors">
              Hours
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
