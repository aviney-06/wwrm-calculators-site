/** Shared pure helpers for the Other date/time calculators. */

const MS_PER_DAY = 86_400_000;

export function pad2(n: number): string {
  return String(Math.floor(Math.abs(n))).padStart(2, "0");
}

/** Parse a yyyy-mm-dd string into a local Date at noon (avoids DST edge cases). */
export function parseDateInput(value: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function todayInput(): string {
  return new Date().toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ */
/* Age / date differences                                              */
/* ------------------------------------------------------------------ */

export type AgeResult = {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
};

/** Calendar-accurate age (years/months/days) between two dates. */
export function calcAge(from: Date, to: Date): AgeResult {
  let start = from;
  let end = to;
  if (start.getTime() > end.getTime()) [start, end] = [end, start];

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY);
  return {
    years,
    months,
    days,
    totalMonths: years * 12 + months,
    totalWeeks: Math.floor(totalDays / 7),
    totalDays,
    totalHours: totalDays * 24,
  };
}

/** Whole days between two dates (absolute). */
export function diffInDays(a: Date, b: Date): number {
  return Math.round(Math.abs(b.getTime() - a.getTime()) / MS_PER_DAY);
}

export type DayBreakdown = {
  totalDays: number;
  weekdays: number;
  weekendDays: number;
  weeks: number;
  remainderDays: number;
};

/**
 * Day-by-day breakdown of an inclusive date range [start, end].
 * Counts weekdays vs weekend days. Capped at a sane range.
 */
export function dayBreakdown(start: Date, end: Date): DayBreakdown {
  let a = start;
  let b = end;
  if (a.getTime() > b.getTime()) [a, b] = [b, a];

  const totalDays = diffInDays(a, b) + 1; // inclusive of both ends
  let weekdays = 0;
  let weekendDays = 0;
  const cursor = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const cap = Math.min(totalDays, 200_000);
  for (let i = 0; i < cap; i++) {
    const dow = cursor.getDay();
    if (dow === 0 || dow === 6) weekendDays += 1;
    else weekdays += 1;
    cursor.setDate(cursor.getDate() + 1);
  }
  return {
    totalDays,
    weekdays,
    weekendDays,
    weeks: Math.floor(totalDays / 7),
    remainderDays: totalDays % 7,
  };
}

export type ShiftUnit = "days" | "weeks" | "months" | "years";

/** Add or subtract a {value, unit} amount to a date. */
export function shiftDate(
  base: Date,
  value: number,
  unit: ShiftUnit,
  op: "add" | "subtract",
): Date {
  const signed = op === "subtract" ? -value : value;
  const d = new Date(base);
  switch (unit) {
    case "days":
      d.setDate(d.getDate() + signed);
      break;
    case "weeks":
      d.setDate(d.getDate() + signed * 7);
      break;
    case "months":
      d.setMonth(d.getMonth() + signed);
      break;
    case "years":
      d.setFullYear(d.getFullYear() + signed);
      break;
  }
  return d;
}

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function weekdayName(d: Date): string {
  return WEEKDAYS[d.getDay()] ?? "";
}

export function formatDateLong(d: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

/* ------------------------------------------------------------------ */
/* Times, durations & hours                                            */
/* ------------------------------------------------------------------ */

/** Parse "HH:MM" (24h) to minutes since midnight. */
export function parseTimeToMinutes(value: string): number | null {
  if (!value) return null;
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

/**
 * Minutes worked between a start and end time.
 * If end is earlier than start it is treated as the next day (overnight shift).
 */
export function durationMinutes(startMin: number, endMin: number): number {
  let diff = endMin - startMin;
  if (diff < 0) diff += 24 * 60;
  return diff;
}

export type HM = { hours: number; minutes: number };

export function minutesToHM(total: number): HM {
  const sign = total < 0 ? -1 : 1;
  const abs = Math.abs(Math.round(total));
  return { hours: sign * Math.floor(abs / 60), minutes: (abs % 60) };
}

export function formatHM(total: number): string {
  const { hours, minutes } = minutesToHM(total);
  return `${hours} h ${Math.abs(minutes)} min`;
}

/** Decimal hours from total minutes (e.g. 90 -> 1.5). */
export function minutesToDecimalHours(total: number): number {
  return Math.round((total / 60) * 100) / 100;
}

/* ------------------------------------------------------------------ */
/* Military / 12-hour time                                             */
/* ------------------------------------------------------------------ */

/** Convert 24h "HH:MM" to 12h "h:MM AM/PM". */
export function to12Hour(value: string): string | null {
  const min = parseTimeToMinutes(value);
  if (min == null) return null;
  let h = Math.floor(min / 60);
  const m = min % 60;
  const period = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${pad2(m)} ${period}`;
}

/** Convert 12h time to 24h "HH:MM". */
export function to24Hour(value: string, period: "AM" | "PM"): string | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  let h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 1 || h > 12 || min > 59) return null;
  if (period === "AM") {
    if (h === 12) h = 0;
  } else if (h !== 12) {
    h += 12;
  }
  return `${pad2(h)}:${pad2(min)}`;
}

/* ------------------------------------------------------------------ */
/* Time-zone conversion (DST aware, via Intl)                          */
/* ------------------------------------------------------------------ */

export const TIME_ZONES = [
  "Pacific/Honolulu",
  "America/Anchorage",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "UTC",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Bangkok",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
] as const;

/** Offset (ms) of a time zone at a given UTC instant. */
function tzOffsetMs(timeZone: string, date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(date);
  const map: Record<string, number> = {};
  for (const p of parts) {
    if (p.type !== "literal") map[p.type] = Number(p.value);
  }
  const asUTC = Date.UTC(
    map.year ?? 1970,
    (map.month ?? 1) - 1,
    map.day ?? 1,
    (map.hour ?? 0) === 24 ? 0 : map.hour ?? 0,
    map.minute ?? 0,
    map.second ?? 0,
  );
  return asUTC - date.getTime();
}

export type TimeZoneResult = {
  time: string;
  date: string;
  zoneLabel: string;
};

/**
 * Convert a wall-clock date/time in `fromZone` into `toZone`.
 * `dateInput` = "yyyy-mm-dd", `timeInput` = "HH:MM" (24h).
 */
export function convertTimeZone(
  dateInput: string,
  timeInput: string,
  fromZone: string,
  toZone: string,
): TimeZoneResult | null {
  const minutes = parseTimeToMinutes(timeInput);
  const dParts = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateInput);
  if (minutes == null || !dParts) return null;

  const y = Number(dParts[1]);
  const mo = Number(dParts[2]);
  const d = Number(dParts[3]);
  const h = Math.floor(minutes / 60);
  const mi = minutes % 60;

  // Treat the wall-clock value as if UTC, then correct by the source offset.
  const naive = new Date(Date.UTC(y, mo - 1, d, h, mi));
  const offset = tzOffsetMs(fromZone, naive);
  const instant = new Date(naive.getTime() - offset);

  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: toZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  const parts = fmt.formatToParts(instant);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    time: `${get("hour")}:${get("minute")} ${get("dayPeriod")}`.trim(),
    date: `${get("weekday")}, ${get("month")} ${get("day")}, ${get("year")}`,
    zoneLabel: toZone.replace(/_/g, " "),
  };
}

export function zoneLabel(zone: string): string {
  return zone.replace(/_/g, " ");
}

/* ------------------------------------------------------------------ */
/* Sunrise / sunset (NOAA approximation, returns local clock times)    */
/* ------------------------------------------------------------------ */

export type SunResult = {
  sunrise: string | null;
  sunset: string | null;
  dayLength: string;
  note?: string;
};

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Sunrise / sunset using the standard sunrise equation (zenith 90.833°).
 * `tzOffsetHours` is the UTC offset of the location's time zone.
 * Returns local clock strings ("h:MM AM/PM") or null when sun does not rise/set.
 */
export function sunTimes(
  date: Date,
  latitude: number,
  longitude: number,
  tzOffsetHours: number,
): SunResult {
  // Day of year
  const start = new Date(date.getFullYear(), 0, 0);
  const dayOfYear = Math.floor(
    (date.getTime() - start.getTime()) / MS_PER_DAY,
  );

  const calc = (isSunrise: boolean): number | null => {
    const zenith = 90.833;
    const lngHour = longitude / 15;
    const t = isSunrise
      ? dayOfYear + (6 - lngHour) / 24
      : dayOfYear + (18 - lngHour) / 24;

    const M = 0.9856 * t - 3.289;
    let L =
      M + 1.916 * Math.sin(toRad(M)) + 0.02 * Math.sin(toRad(2 * M)) + 282.634;
    L = ((L % 360) + 360) % 360;

    let RA = toDeg(Math.atan(0.91764 * Math.tan(toRad(L))));
    RA = ((RA % 360) + 360) % 360;
    const Lquadrant = Math.floor(L / 90) * 90;
    const RAquadrant = Math.floor(RA / 90) * 90;
    RA = (RA + (Lquadrant - RAquadrant)) / 15;

    const sinDec = 0.39782 * Math.sin(toRad(L));
    const cosDec = Math.cos(Math.asin(sinDec));

    const cosH =
      (Math.cos(toRad(zenith)) - sinDec * Math.sin(toRad(latitude))) /
      (cosDec * Math.cos(toRad(latitude)));
    if (cosH > 1) return null; // sun never rises
    if (cosH < -1) return null; // sun never sets

    let H = isSunrise ? 360 - toDeg(Math.acos(cosH)) : toDeg(Math.acos(cosH));
    H /= 15;

    const T = H + RA - 0.06571 * t - 6.622;
    let UT = T - lngHour;
    UT = ((UT % 24) + 24) % 24;
    return UT + tzOffsetHours;
  };

  const fmt = (utLocal: number | null): string | null => {
    if (utLocal == null) return null;
    let hours = ((utLocal % 24) + 24) % 24;
    let h = Math.floor(hours);
    let m = Math.round((hours - h) * 60);
    if (m === 60) {
      m = 0;
      h = (h + 1) % 24;
    }
    const period = h >= 12 ? "PM" : "AM";
    let h12 = h % 12;
    if (h12 === 0) h12 = 12;
    return `${h12}:${pad2(m)} ${period}`;
  };

  const riseLocal = calc(true);
  const setLocal = calc(false);
  const sunrise = fmt(riseLocal);
  const sunset = fmt(setLocal);

  let dayLength = "—";
  let note: string | undefined;
  if (riseLocal != null && setLocal != null) {
    let len = setLocal - riseLocal;
    if (len < 0) len += 24;
    const lh = Math.floor(len);
    const lm = Math.round((len - lh) * 60);
    dayLength = `${lh} h ${pad2(lm)} min`;
  } else {
    note = "The sun may not rise or set on this date at this latitude.";
  }

  return { sunrise, sunset, dayLength, note };
}
