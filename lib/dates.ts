/**
 * Date helpers. All times are Kigali time (CAT, UTC+2). Formatting is done by hand so server
 * and client render identical strings regardless of locale or time zone.
 */

/** Sample data is anchored to this day so countdowns stay consistent across pages and builds. */
export const SAMPLE_TODAY = "2026-11-08";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parts(iso: string) {
  const [d, t = "00:00"] = iso.split("T");
  const [y, m, day] = d.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, day));
  return { y, m, day, weekday: DAYS[date.getUTCDay()], month: MONTHS[m - 1], time: t.slice(0, 5), utc: date.getTime() };
}

/** "Fri 20 Nov · 10:00" — for cards (year dropped). */
export function cardDate(iso: string) {
  const p = parts(iso);
  return `${p.weekday} ${p.day} ${p.month} · ${p.time}`;
}

/** "Fri 20 Nov 2026 · 10:00 CAT" — for tender pages. */
export function fullDate(iso: string) {
  const p = parts(iso);
  return `${p.weekday} ${p.day} ${p.month} ${p.y} · ${p.time} CAT`;
}

/** "Fri 20 Nov 2026, 10:00 CAT" — for the action panel heading. */
export function panelDate(iso: string) {
  const p = parts(iso);
  return `${p.weekday} ${p.day} ${p.month} ${p.y}, ${p.time} CAT`;
}

/** "Mon 2 Nov 2026" */
export function dayDate(iso: string) {
  const p = parts(iso);
  return `${p.weekday} ${p.day} ${p.month} ${p.y}`;
}

/** Whole days between SAMPLE_TODAY and the deadline's day. */
export function daysLeft(iso: string) {
  return Math.round((parts(iso).utc - parts(SAMPLE_TODAY).utc) / 86_400_000);
}

/** Days and hours until the deadline, counted from noon on SAMPLE_TODAY. */
export function timeLeft(iso: string) {
  const p = parts(iso);
  const [hh, mm] = p.time.split(":").map(Number);
  const deadline = p.utc + hh * 3_600_000 + mm * 60_000;
  const now = parts(SAMPLE_TODAY).utc + 12 * 3_600_000;
  const hours = Math.max(0, Math.floor((deadline - now) / 3_600_000));
  return { days: Math.floor(hours / 24), hours: hours % 24 };
}

export function addDays(iso: string, n: number, time?: string) {
  const p = parts(iso);
  const d = new Date(p.utc + n * 86_400_000);
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${time ?? p.time}`;
}
