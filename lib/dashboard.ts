/* Sample supplier data for the dashboard: Ikaze Digital Ltd, signed in as Aline Uwase. */
import { getTender, type TenderRecord } from "./data";
import { cardDate, daysLeft } from "./dates";

export type Recommendation = {
  tender: TenderRecord;
  isNew: boolean;
  why: string[];
  docsReady: number;
  docsTotal: number;
};

const REC_DEFS: [string, boolean, string[], number, number][] = [
  ["RW-RUB-2026-0211", true, ["ICT & digital", "Under RWF 20M", "Individuals and SMEs can bid"], 4, 6],
  ["RW-GAT-2026-0222", true, ["ICT & digital", "Under RWF 20M"], 3, 5],
  ["RW-NGO-2026-0034", true, ["ICT & digital", "Under RWF 50M"], 4, 7],
  ["RW-KGL-2026-0311", false, ["ICT & digital", "Kigali", "Consultancy"], 5, 8],
  ["RW-NYA-2026-0027", false, ["Data & analytics", "Consultancy"], 4, 6],
  ["RW-KIC-2026-0046", false, ["ICT & digital", "Kigali"], 4, 6],
];

export const RECOMMENDATIONS: Recommendation[] = REC_DEFS.map(([ref, isNew, why, docsReady, docsTotal]) => ({
  tender: getTender(ref)!,
  isNew,
  why,
  docsReady,
  docsTotal,
}));

export function dueLabel(t: TenderRecord) {
  const d = daysLeft(t.deadline);
  return { days: d, label: d === 1 ? "1 day left" : `${d} days left`, card: cardDate(t.deadline) };
}

export type WatchRow = {
  ref: string;
  update?: string;
  updStatus?: "neutral" | "amended" | "closing";
  updWhen?: string;
  bid: string;
  pct: number;
  cta: string;
};

export const WATCHLIST: WatchRow[] = [
  { ref: "RW-MUS-2026-0150", update: "2 new answers", updStatus: "neutral", updWhen: "Today, 09:40", bid: "Not started", pct: 0, cta: "Start bid" },
  { ref: "RW-RUB-2026-0211", bid: "Draft · 4 of 6 ready", pct: 66, cta: "Continue bid" },
  { ref: "RW-KGL-2026-0311", update: "Amended", updStatus: "amended", updWhen: "Yesterday · deadline moved", bid: "Draft · 2 of 8 ready", pct: 25, cta: "Continue bid" },
  { ref: "RW-HUY-2026-0061", update: "Site visit Sat", updStatus: "closing", updWhen: "Sat 14 Nov · 09:00", bid: "Not started", pct: 0, cta: "Start bid" },
  { ref: "RW-NGO-2026-0034", bid: "Not started", pct: 0, cta: "Start bid" },
  { ref: "RW-KIC-2026-0046", bid: "Not started", pct: 0, cta: "Start bid" },
];
