/* Sample data. All tenders, companies and figures are illustrative — Umucyo redesign concept. */
import { addDays, cardDate, daysLeft, fullDate } from "./dates";
import type { TenderStatus } from "@/components/umucyo/status";

export const CATEGORIES = ["Goods", "Works", "Consultancy services", "Non-consultancy services"] as const;
export type Category = (typeof CATEGORIES)[number];

export const PROVINCES = [
  "City of Kigali",
  "Northern Province",
  "Southern Province",
  "Eastern Province",
  "Western Province",
  "Nationwide",
] as const;
export type Province = (typeof PROVINCES)[number];

export const METHODS = ["Open national", "Open international", "Request for quotations", "Restricted"] as const;

export const VALUE_BANDS = ["Any value", "Under RWF 20M", "RWF 20M – 200M", "Over RWF 200M"] as const;
export type ValueBand = (typeof VALUE_BANDS)[number];

export type TenderRecord = {
  ref: string;
  title: string;
  entity: string;
  category: Category;
  method: string;
  budget: string;
  /** Upper bound of the estimate in RWF millions; null when not published. */
  budgetMax: number | null;
  location: string;
  province: Province;
  /** Deadline in Kigali time, ISO without offset. */
  deadline: string;
  amended?: boolean;
  siteVisit?: boolean;
  jvAllowed?: boolean;
  bidSecurity?: boolean;
  tags?: string[];
  need?: string;
  who?: string;
  valueLong?: string;
};

export const TENDERS: TenderRecord[] = [
  {
    ref: "RW-KAY-2026-0088",
    title: "Supply of 640 laptops for district TVET schools",
    entity: "Kayonza District",
    category: "Goods",
    method: "Open international",
    budget: "Not published",
    budgetMax: null,
    location: "Nationwide delivery",
    province: "Nationwide",
    deadline: "2026-11-11T14:00",
    bidSecurity: true,
    tags: ["ICT", "laptops", "computers", "education"],
  },
  {
    ref: "RW-MUS-2026-0142",
    title: "Construction of a 12-classroom block at GS Kinigi",
    entity: "Musanze District",
    category: "Works",
    method: "Open national",
    budget: "RWF 180–220M",
    budgetMax: 220,
    location: "Kinigi, Musanze",
    province: "Northern Province",
    deadline: "2026-11-20T10:00",
    amended: true,
    siteVisit: true,
    jvAllowed: true,
    bidSecurity: true,
    tags: ["construction", "school", "building", "classroom"],
    need: "A two-storey block of 12 classrooms, toilets and a rainwater tank, built in 9 months.",
    who: "Registered building contractors, category B or above. Joint ventures allowed.",
    valueLong: "RWF 180–220 million. Bid security RWF 3,000,000.",
  },
  {
    ref: "RW-KGL-2026-0311",
    title: "Design of a mobile app for city bus timetables",
    entity: "City of Kigali",
    category: "Consultancy services",
    method: "Quality and cost based",
    budget: "RWF 35–50M",
    budgetMax: 50,
    location: "Kigali",
    province: "City of Kigali",
    deadline: "2026-12-08T10:00",
    amended: true,
    bidSecurity: true,
    tags: ["ICT", "software", "mobile app", "design", "transport"],
    need: "Research, design and build an Android and iOS app showing live bus times.",
    who: "Registered firms with a lead designer and 2 mobile developers.",
    valueLong: "RWF 35–50 million. Bid security RWF 700,000.",
  },
  {
    ref: "RW-HUY-2026-0057",
    title: "Catering services for district health centres (2027)",
    entity: "Huye District",
    category: "Non-consultancy services",
    method: "Open national",
    budget: "RWF 60–75M",
    budgetMax: 75,
    location: "Huye",
    province: "Southern Province",
    deadline: "2026-11-26T10:00",
    bidSecurity: true,
    tags: ["catering", "food", "health"],
  },
  {
    ref: "RW-NYA-2026-0019",
    title: "Audio post-production for health radio spots",
    entity: "Nyagatare District",
    category: "Consultancy services",
    method: "Request for quotations",
    budget: "RWF 8–12M",
    budgetMax: 12,
    location: "Nyagatare",
    province: "Eastern Province",
    deadline: "2026-11-13T16:00",
    tags: ["media", "audio", "radio", "health"],
  },
  {
    ref: "RW-RUB-2026-0204",
    title: "Solar mini-grid maintenance, Rubavu sector offices",
    entity: "Rubavu District",
    category: "Works",
    method: "Open national",
    budget: "RWF 22–30M",
    budgetMax: 30,
    location: "Rubavu",
    province: "Western Province",
    deadline: "2026-12-04T10:00",
    bidSecurity: true,
    tags: ["solar", "energy", "maintenance"],
  },
  {
    ref: "RW-HUY-2026-0061",
    title: "Network cabling and Wi-Fi for 14 sector offices",
    entity: "Huye District",
    category: "Works",
    method: "Open national",
    budget: "RWF 48–60M",
    budgetMax: 60,
    location: "Huye",
    province: "Southern Province",
    deadline: "2026-11-27T10:00",
    siteVisit: true,
    bidSecurity: true,
    tags: ["ICT", "network", "Wi-Fi", "cabling"],
  },
  {
    ref: "RW-MUS-2026-0150",
    title: "Supply of 30 interactive classroom screens",
    entity: "Musanze District",
    category: "Goods",
    method: "Open national",
    budget: "RWF 70–85M",
    budgetMax: 85,
    location: "Musanze",
    province: "Northern Province",
    deadline: "2026-11-12T10:00",
    bidSecurity: true,
    tags: ["ICT", "screens", "education"],
  },
  {
    ref: "RW-RUB-2026-0211",
    title: "Website redesign and hosting for Rubavu District",
    entity: "Rubavu District",
    category: "Consultancy services",
    method: "Request for quotations",
    budget: "RWF 9–14M",
    budgetMax: 14,
    location: "Rubavu",
    province: "Western Province",
    deadline: "2026-11-23T16:00",
    tags: ["ICT", "website", "software", "hosting"],
    need: "A new bilingual district website with a content system, hosting for 2 years and staff training.",
    who: "Registered companies or individuals with 2+ similar websites delivered.",
    valueLong: "RWF 9–14 million. No bid security.",
  },
  {
    ref: "RW-NGO-2026-0034",
    title: "IT helpdesk and device maintenance (12 months)",
    entity: "Ngoma District",
    category: "Non-consultancy services",
    method: "Open national",
    budget: "RWF 18–24M",
    budgetMax: 24,
    location: "Ngoma",
    province: "Eastern Province",
    deadline: "2026-12-02T10:00",
    bidSecurity: true,
    tags: ["ICT", "helpdesk", "maintenance", "IT support"],
    need: "On-site helpdesk for 180 staff and maintenance of laptops, printers and network.",
    who: "Registered IT service companies with 2 certified technicians.",
    valueLong: "RWF 18–24 million. Bid security RWF 400,000.",
  },
  {
    ref: "RW-GAT-2026-0222",
    title: "Supply of biometric attendance devices",
    entity: "Gatsibo District",
    category: "Goods",
    method: "Request for quotations",
    budget: "Under RWF 10M",
    budgetMax: 10,
    location: "Gatsibo",
    province: "Eastern Province",
    deadline: "2026-11-12T12:00",
    tags: ["ICT", "biometric", "devices"],
    need: "40 biometric attendance terminals with installation and one year of support.",
    who: "Registered suppliers of IT equipment.",
    valueLong: "Under RWF 10 million.",
  },
  {
    ref: "RW-NYA-2026-0027",
    title: "Data analysis for the district household survey",
    entity: "Nyagatare District",
    category: "Consultancy services",
    method: "Quality based selection",
    budget: "RWF 25–32M",
    budgetMax: 32,
    location: "Nyagatare",
    province: "Eastern Province",
    deadline: "2026-12-11T10:00",
    tags: ["ICT", "data", "statistics", "survey"],
    need: "Clean and analyse survey data for 4,000 households and write the district report.",
    who: "Firms or individual consultants with a statistician on the team.",
    valueLong: "RWF 25–32 million.",
  },
  {
    ref: "RW-KIC-2026-0046",
    title: "Cloud backup storage, 3-year licence",
    entity: "Kicukiro District",
    category: "Goods",
    method: "Open national",
    budget: "RWF 30–38M",
    budgetMax: 38,
    location: "Kigali",
    province: "City of Kigali",
    deadline: "2026-11-30T10:00",
    bidSecurity: true,
    tags: ["ICT", "cloud", "storage", "backup"],
    need: "20 TB of backup storage hosted in Rwanda, with restore support.",
    who: "Registered providers with data hosted in Rwanda.",
    valueLong: "RWF 30–38 million. Bid security RWF 600,000.",
  },
  {
    ref: "RW-RWA-2026-0102",
    title: "Solar power for 6 remote health posts",
    entity: "Rwamagana District",
    category: "Works",
    method: "Open national",
    budget: "RWF 95–120M",
    budgetMax: 120,
    location: "Rwamagana",
    province: "Eastern Province",
    deadline: "2026-12-03T10:00",
    bidSecurity: true,
    tags: ["solar", "energy", "health"],
  },
];

/** Shape the TenderCard expects. */
export type TenderCardData = {
  ref: string;
  title: string;
  entity: string;
  category?: string;
  method?: string;
  budget?: string;
  location?: string;
  deadline: string;
  deadlineIso?: string;
  daysLeft?: number;
  status?: TenderStatus;
  href?: string;
  saved?: boolean;
};

export function tenderStatus(t: TenderRecord): TenderStatus {
  const d = daysLeft(t.deadline);
  if (d < 0) return "closed";
  if (d <= 7) return "closing";
  return t.amended ? "amended" : "open";
}

export function toCard(t: TenderRecord): TenderCardData {
  return {
    ref: t.ref,
    title: t.title,
    entity: t.entity,
    category: t.category,
    method: t.method,
    budget: t.budget,
    location: t.location,
    deadline: cardDate(t.deadline),
    deadlineIso: t.deadline,
    daysLeft: daysLeft(t.deadline),
    status: tenderStatus(t),
    href: `/tenders/${t.ref}`,
  };
}

export function getTender(ref: string) {
  return TENDERS.find((t) => t.ref === ref);
}

export function cardsFor(refs: string[]) {
  return refs.map((r) => getTender(r)).filter((t): t is TenderRecord => !!t).map(toCard);
}

export function matchesValueBand(t: TenderRecord, band: ValueBand) {
  if (band === "Any value") return true;
  if (t.budgetMax == null) return false;
  if (band === "Under RWF 20M") return t.budgetMax <= 20;
  if (band === "RWF 20M – 200M") return t.budgetMax > 20 && t.budgetMax <= 200;
  return t.budgetMax > 200;
}

export function matchesQuery(t: TenderRecord, q: string) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return true;
  const hay = [t.title, t.entity, t.category, t.ref, t.location, ...(t.tags ?? [])].join(" ").toLowerCase();
  // Match from the start of a word, so "ict" finds "ICT" but not "district".
  return words.every((w) => new RegExp(`(^|[^\\p{L}\\p{N}])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "u").test(hay));
}

/* ---------- Tender detail ---------- */

export type KeyDateItem = {
  label: string;
  when: string;
  iso?: string;
  note?: string;
  kind?: "done" | "next" | "upcoming" | "deadline";
  action?: string;
  actionIcon?: "calendar" | "question";
  href?: string;
};

export type RequiredDoc = {
  name: string;
  required?: boolean;
  note?: string;
  format?: string;
  template?: string;
  href?: string;
  done?: boolean;
};

export type TenderDetail = {
  published: string;
  summaryLine: string;
  need: string;
  who: string;
  valueLong: string;
  amendment?: { title: string; body: string };
  dates: KeyDateItem[];
  siteVisit?: { place: string; when: string; note: string };
  docs: RequiredDoc[];
  files: { name: string; meta: string }[];
  filesTotal: string;
  evaluation: { title: string; text: string }[];
  qa: { q: string; a: string }[];
  questionsClose: string;
  about: { plan: string; funding: string; pastAwards: string };
};

const MUS_0142: TenderDetail = {
  published: "Mon 2 Nov 2026",
  summaryLine: "Works · Open national competition · Published Mon 2 Nov 2026",
  need: "A two-storey block of 12 classrooms, toilets and a rainwater tank, built in 9 months.",
  who: "Registered building contractors, category B or above. Joint ventures allowed.",
  valueLong: "RWF 180–220 million. Bid security RWF 3,000,000.",
  amendment: {
    title: "Amendment 1 · Thu 5 Nov 2026",
    body: "The submission deadline moved from 18 Nov to 20 Nov 2026. Bill of quantities item 4.2 was corrected.",
  },
  dates: [
    { label: "Tender published", when: "Mon 2 Nov 2026", kind: "done" },
    {
      label: "Site visit (recommended)",
      when: "Thu 12 Nov 2026 · 10:00 CAT",
      note: "Meet at the GS Kinigi main gate. Bring your ID.",
      kind: "next",
      action: "Add to calendar",
    },
    { label: "Pre-bid meeting", when: "Fri 13 Nov 2026 · 14:00 CAT", note: "Online — link sent to registered bidders.", action: "Add to calendar" },
    { label: "Clarification questions close", when: "Mon 16 Nov 2026 · 17:00 CAT", action: "Ask a question", actionIcon: "question", href: "#qa" },
    {
      label: "Submission deadline",
      when: "Fri 20 Nov 2026 · 10:00 CAT",
      note: "The system closes automatically. Late bids cannot be submitted.",
      kind: "deadline",
      action: "Add to calendar",
    },
    { label: "Bid opening", when: "Fri 20 Nov 2026 · 10:30 CAT", note: "The opening report is published on this page." },
  ],
  siteVisit: {
    place: "GS Kinigi, Kinigi sector, Musanze",
    when: "Thu 12 Nov 2026 · 10:00–12:00 CAT · Meet at the main gate",
    note: "Recommended, not mandatory. Bring an ID. Register so the school expects you. Contact: District Engineer, via the questions channel below.",
  },
  docs: [
    { name: "Signed bid submission form", format: "PDF · max 10 MB", template: "Form" },
    { name: "Bid security", note: "RWF 3,000,000 bank guarantee, valid 120 days from the deadline.", format: "PDF scan of original", template: "Template" },
    { name: "Priced bill of quantities", note: "Use the Excel file provided. Do not change the item list.", format: "XLSX", template: "BoQ file" },
    { name: "Certificate of incorporation (RDB)", format: "PDF" },
    { name: "Tax clearance and social security certificates", format: "PDF" },
    { name: "Joint venture agreement", required: false, note: "Only if you bid as a joint venture.", format: "PDF", template: "Template" },
  ],
  files: [
    { name: "Tender document (Sections I–VIII)", meta: "PDF · 6.8 MB · updated 5 Nov 2026" },
    { name: "Bill of quantities", meta: "XLSX · 0.4 MB · updated 5 Nov 2026 (Amendment 1)" },
    { name: "Architectural and structural drawings", meta: "PDF · 4.6 MB" },
    { name: "Amendment 1 — comparison of changes", meta: "PDF · 0.2 MB · 5 Nov 2026" },
  ],
  filesTotal: "4 files · 12 MB",
  evaluation: [
    { title: "Completeness.", text: "Every required document is present, signed and valid." },
    { title: "Qualification.", text: "Similar works in the last 5 years, key staff, equipment and financial capacity, as set out in Section III." },
    { title: "Price.", text: "Among qualified bids, the lowest evaluated price wins." },
  ],
  qa: [
    {
      q: "Can a company registered outside Rwanda bid?",
      a: "Yes. It must register on Umucyo and hold a valid digital certificate before submitting. Answered Wed 4 Nov 2026.",
    },
    { q: "Is the site visit mandatory?", a: "No. It is recommended. Answered Wed 4 Nov 2026." },
    {
      q: "Can the bid security be an insurance bond?",
      a: "Yes, from an insurer approved to issue guarantees in Rwanda, using the template provided. Answered Fri 6 Nov 2026.",
    },
  ],
  questionsClose: "Mon 16 Nov 2026, 17:00 CAT",
  about: { plan: "2026/27 plan · item 47 of 112", funding: "Government budget", pastAwards: "38 contracts awarded in the last 12 months" },
};

/** Full detail exists for the showcase tender; other tenders get the standard structure from their record. */
export function getTenderDetail(t: TenderRecord): TenderDetail {
  if (t.ref === "RW-MUS-2026-0142") return MUS_0142;
  const questions = addDays(t.deadline, -4, "17:00");
  const opening = addDays(t.deadline, 0, `${t.deadline.slice(11, 13)}:30`);
  return {
    published: "Mon 2 Nov 2026",
    summaryLine: `${t.category} · ${t.method} · Published Mon 2 Nov 2026`,
    need: t.need ?? `${t.title}. The full scope is in the tender document.`,
    who: t.who ?? "Registered suppliers that meet the qualification criteria in Section III of the tender document.",
    valueLong: t.valueLong ?? (t.budgetMax == null ? "Not published." : `${t.budget.replace("M", " million")}.`),
    amendment: t.amended
      ? { title: "Amendment 1 · Sat 7 Nov 2026", body: "The submission deadline moved and a new requirement was added to Section III." }
      : undefined,
    dates: [
      { label: "Tender published", when: "Mon 2 Nov 2026", kind: "done" },
      {
        label: "Clarification questions close",
        when: fullDate(questions),
        kind: daysLeft(questions) >= 0 ? "next" : "done",
        action: "Ask a question",
        actionIcon: "question",
        href: "#qa",
      },
      {
        label: "Submission deadline",
        when: fullDate(t.deadline),
        note: "The system closes automatically. Late bids cannot be submitted.",
        kind: "deadline",
        action: "Add to calendar",
      },
      { label: "Bid opening", when: fullDate(opening), note: "The opening report is published on this page." },
    ],
    docs: [
      { name: "Signed bid submission form", format: "PDF · max 10 MB", template: "Form" },
      ...(t.bidSecurity
        ? [{ name: "Bid security", note: "Bank guarantee or approved insurance bond, using the template provided.", format: "PDF scan of original", template: "Template" }]
        : []),
      { name: "Certificate of incorporation (RDB)", format: "PDF" },
      { name: "Tax clearance and social security certificates", format: "PDF" },
    ],
    files: [{ name: "Tender document", meta: "PDF · 2.1 MB · 2 Nov 2026" }],
    filesTotal: "1 file · 2.1 MB",
    evaluation: [
      { title: "Completeness.", text: "Every required document is present, signed and valid." },
      { title: "Qualification.", text: "Experience, staff and capacity, as set out in Section III." },
      { title: "Price.", text: "Among qualified bids, the lowest evaluated price wins, unless the method weighs quality too." },
    ],
    qa: [],
    questionsClose: fullDate(questions).replace(" · ", ", "),
    about: { plan: "2026/27 procurement plan", funding: "Government budget", pastAwards: "See past awards" },
  };
}

/* ---------- Awards ---------- */

export type AwardRow = {
  ref: string;
  title: string;
  entity: string;
  category: Category;
  winner: string;
  method: string;
  bids: number;
  value: string;
  date: string;
  status: "Signed" | "Awarded";
};

export const AWARDS: AwardRow[] = [
  { ref: "RW-GSB-2026-0071", title: "Rehabilitation of Gisenyi–Busasamana feeder road (8.4 km)", entity: "Rubavu District", category: "Works", winner: "Kivu Ridge Construction Ltd", method: "Open national", bids: 7, value: "RWF 1,284,600,000", date: "4 Nov 2026", status: "Signed" },
  { ref: "RW-GAT-2026-0215", title: "Supply of 120 beds for district health centres", entity: "Gatsibo District", category: "Goods", winner: "Amahoro Medical Supplies Ltd", method: "Open national", bids: 5, value: "RWF 186,000,000", date: "3 Nov 2026", status: "Awarded" },
  { ref: "RW-KGL-2026-0266", title: "Data platform for municipal permits", entity: "City of Kigali", category: "Consultancy services", winner: "Ubuntu Data Systems Ltd", method: "Quality and cost based", bids: 9, value: "RWF 94,500,000", date: "30 Oct 2026", status: "Signed" },
  { ref: "RW-HUY-2026-0049", title: "Security services for district offices (2027)", entity: "Huye District", category: "Non-consultancy services", winner: "Intore Guard Services Ltd", method: "Open national", bids: 11, value: "RWF 41,280,000", date: "28 Oct 2026", status: "Signed" },
  { ref: "RW-MUS-2026-0131", title: "Supply of school furniture for 9 schools", entity: "Musanze District", category: "Goods", winner: "Virunga Woodcraft Ltd", method: "Open national", bids: 6, value: "RWF 212,700,000", date: "27 Oct 2026", status: "Awarded" },
  { ref: "RW-NYA-2026-0022", title: "Borehole drilling, 4 sites in Karama sector", entity: "Nyagatare District", category: "Works", winner: "Akagera Water Works Ltd", method: "Open national", bids: 4, value: "RWF 158,900,000", date: "24 Oct 2026", status: "Signed" },
  { ref: "RW-KIC-2026-0040", title: "Event management for the district open day", entity: "Kicukiro District", category: "Non-consultancy services", winner: "Imena Events", method: "Request for quotations", bids: 8, value: "RWF 6,450,000", date: "22 Oct 2026", status: "Signed" },
  { ref: "RW-RWA-2026-0094", title: "Audit of district accounts, FY 2025/26", entity: "Rwamagana District", category: "Consultancy services", winner: "Inzira Audit Partners", method: "Quality based selection", bids: 5, value: "RWF 28,000,000", date: "21 Oct 2026", status: "Signed" },
  { ref: "RW-NGO-2026-0029", title: "Supply of 18 motorcycles for sector staff", entity: "Ngoma District", category: "Goods", winner: "Rusizi Motors Ltd", method: "Open national", bids: 3, value: "RWF 61,200,000", date: "20 Oct 2026", status: "Awarded" },
  { ref: "RW-KAY-2026-0081", title: "Fibre connection for the district hospital", entity: "Kayonza District", category: "Works", winner: "Ikaze Networks Ltd", method: "Request for quotations", bids: 6, value: "RWF 9,800,000", date: "17 Oct 2026", status: "Signed" },
];

/* ---------- Shared content ---------- */

export const FIRST_BID_STEPS = [
  { title: "Register your business", text: "Have your RDB company code and TIN ready. Individuals can register too.", link: "Register →", href: "/register" },
  { title: "Get a digital certificate", text: "Apply at govca.rw. It lets you sign and submit bids online securely.", link: "How to apply →", href: "/how-to-bid#journey" },
  { title: "Follow tenders you can deliver", text: "Save searches and get alerts when a matching tender is published or amended.", link: "Set up alerts →", href: "/dashboard/preferences" },
  { title: "Bid before the deadline", text: "Upload every required document. You get a receipt the moment your bid lands.", link: "Bidding guide →", href: "/how-to-bid" },
];

export const HELP_PHONE = "3131";
export const HELP_PHONE_INTL = "+250 788 123 100";
