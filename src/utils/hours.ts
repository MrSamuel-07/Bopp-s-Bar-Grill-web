export interface TavernHoursStatus {
  isOpen: boolean;
  statusLabel: string;
  detailText: string;
  todaySchedule: string;
  dayName: string;
}

const CHICAGO_TZ = 'America/Chicago';

const DAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const FULL_DAY_NAMES: Record<number, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

/**
 * Evaluates Bopp's Bar & Grill hours in local Harvard, IL time (America/Chicago).
 * Mon–Thu: 11:00 AM – 10:00 PM
 * Fri–Sun: 11:00 AM – 12:00 AM (Midnight)
 */
export function getTavernHoursStatus(now: Date = new Date()): TavernHoursStatus {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: CHICAGO_TZ,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const weekdayShort = parts.find((p) => p.type === 'weekday')?.value ?? 'Mon';
  const hourRaw = Number(parts.find((p) => p.type === 'hour')?.value ?? '12');
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');

  // Intl hour12:false can return 24 at midnight in some runtimes
  const hour = hourRaw === 24 ? 0 : hourRaw;
  const currentMinutes = hour * 60 + minute;
  const dayNum = DAY_INDEX[weekdayShort] ?? 1;
  const dayName = FULL_DAY_NAMES[dayNum] ?? 'Today';

  const isWeekendHours = dayNum === 5 || dayNum === 6 || dayNum === 0;
  const openMinutes = 11 * 60; // 11:00 AM
  const closeMinutes = isWeekendHours ? 24 * 60 : 22 * 60; // 12:00 AM vs 10:00 PM
  const closeLabel = isWeekendHours ? '12:00 AM' : '10:00 PM';
  const todaySchedule = isWeekendHours ? '11:00 AM – 12:00 AM' : '11:00 AM – 10:00 PM';

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  if (isOpen) {
    const minutesUntilClose = closeMinutes - currentMinutes;
    const detailText =
      minutesUntilClose <= 60
        ? `Closes soon at ${closeLabel} CT`
        : `Open until ${closeLabel} CT`;

    return {
      isOpen: true,
      statusLabel: 'Open Now',
      detailText,
      todaySchedule,
      dayName,
    };
  }

  if (currentMinutes < openMinutes) {
    return {
      isOpen: false,
      statusLabel: 'Opens at 11:00 AM',
      detailText: `Today (${dayName}): ${todaySchedule} CT`,
      todaySchedule,
      dayName,
    };
  }

  return {
    isOpen: false,
    statusLabel: 'Closed Now',
    detailText: 'Opens tomorrow at 11:00 AM CT',
    todaySchedule,
    dayName,
  };
}
