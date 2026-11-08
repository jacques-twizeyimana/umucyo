"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, StatusBadge, type BadgeStatus } from "@/components/umucyo";

type Tab = "drafts" | "submitted" | "results";
type Bid = {
  ref: string;
  title: string;
  entity: string;
  price: string;
  badge: BadgeStatus;
  badgeLabel: string;
  at: number;
  nextLabel: string;
  next: string;
  cta: string;
  ctaHref: string;
  primary?: boolean;
  secondary?: string;
  secHref?: string;
};

const STAGES = ["Draft", "Submitted", "Opened", "Evaluation", "Decision"];

const DATA: Record<Tab, Bid[]> = {
  drafts: [
    { ref: "RW-RUB-2026-0211", title: "Website redesign and hosting for Rubavu District", entity: "Rubavu District", price: "RWF 11,800,000", badge: "neutral", badgeLabel: "Draft · 4 of 6 ready", at: 0, nextLabel: "Submission closes", next: "Mon 23 Nov, 16:00 · 15 days", cta: "Continue bid", ctaHref: "/dashboard/bids/prepare", primary: true },
    { ref: "RW-KGL-2026-0311", title: "Design of a mobile app for city bus timetables", entity: "City of Kigali", price: "Not set yet", badge: "amended", badgeLabel: "Draft · tender amended", at: 0, nextLabel: "Submission closes", next: "Tue 8 Dec, 10:00 · 30 days", cta: "Review changes", ctaHref: "/tenders/RW-KGL-2026-0311" },
  ],
  submitted: [
    { ref: "RW-KGL-2026-0266", title: "Data platform for municipal permits", entity: "City of Kigali", price: "RWF 97,200,000", badge: "neutral", badgeLabel: "Under evaluation", at: 3, nextLabel: "Decision expected", next: "By Mon 30 Nov", cta: "Track bid", ctaHref: "/dashboard/bids/submitted", secondary: "Opening report", secHref: "/dashboard/bids/submitted" },
    { ref: "RW-NYA-2026-0018", title: "Survey tablets and data collection app", entity: "Nyagatare District", price: "RWF 21,400,000", badge: "neutral", badgeLabel: "Opened", at: 2, nextLabel: "Opening report published", next: "Thu 5 Nov · 6 bids", cta: "Track bid", ctaHref: "/dashboard/bids/submitted", secondary: "See opening report", secHref: "/dashboard/bids/submitted" },
    { ref: "RW-HUY-2026-0066", title: "Digital records system for the district archive", entity: "Huye District", price: "RWF 38,900,000", badge: "open", badgeLabel: "Submitted · editable", at: 1, nextLabel: "Deadline and opening", next: "Fri 13 Nov, 10:00", cta: "View or edit bid", ctaHref: "/dashboard/bids/submitted", secondary: "Withdraw bid", secHref: "/dashboard/bids/submitted#change" },
  ],
  results: [
    { ref: "RW-KAY-2026-0081", title: "Fibre connection for the district hospital", entity: "Kayonza District", price: "RWF 9,800,000", badge: "awarded", badgeLabel: "You won", at: 5, nextLabel: "Next step", next: "Sign the contract by Fri 20 Nov", cta: "Open contract", ctaHref: "/dashboard/bids/submitted", primary: true },
    { ref: "RW-RWA-2026-0090", title: "District staff ICT training (3 cohorts)", entity: "Rwamagana District", price: "RWF 14,500,000", badge: "closed", badgeLabel: "Not awarded", at: 5, nextLabel: "Awarded to", next: "Inzira Learning · RWF 13,900,000", cta: "See evaluation", ctaHref: "/dashboard/bids/submitted", secondary: "Request a review", secHref: "/legal-framework#f5" },
  ],
};

const TABS: [Tab, string][] = [
  ["drafts", "Drafts"],
  ["submitted", "Submitted"],
  ["results", "Results"],
];

export function BidsList() {
  const [tab, setTab] = useState<Tab>("submitted");
  return (
    <>
      <nav className="app-tabs" aria-label="Bid status">
        {TABS.map(([key, label]) => (
          <a
            key={key}
            href="#bids"
            aria-current={tab === key ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setTab(key);
            }}
          >
            {label} <span className="n">{DATA[key].length}</span>
          </a>
        ))}
      </nav>

      <div id="bids" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {DATA[tab].map((b) => (
          <article key={b.ref} className="app-panel bid-card">
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 8 }}>
                <StatusBadge status={b.badge}>{b.badgeLabel}</StatusBadge>
                <span className="uc-ref">{b.ref}</span>
              </div>
              <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 19, lineHeight: "25px", fontWeight: 600 }}>
                <Link href={b.ctaHref} style={{ color: "var(--ink)", textDecoration: "none" }}>
                  {b.title}
                </Link>
              </h2>
              <p style={{ margin: "4px 0 16px", fontSize: 14, color: "var(--ink-muted)" }}>
                {b.entity} · Your price <strong style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{b.price}</strong>
              </p>
              <div className="app-pipe" aria-label={`Stage: ${STAGES[b.at] ?? "Decision"}`}>
                {STAGES.map((s, i) => (
                  <div key={s} className={i < b.at ? "done" : i === b.at ? "now" : undefined}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
            <div className="bid-card-side">
              <p style={{ margin: 0, fontSize: 13, color: "var(--ink-muted)" }}>
                {b.nextLabel}
                <br />
                <strong style={{ color: "var(--ink)", fontSize: 15 }}>{b.next}</strong>
              </p>
              <Button variant={b.primary ? "primary" : "secondary"} size="sm" href={b.ctaHref}>
                {b.cta}
              </Button>
              {b.secondary ? (
                <Link href={b.secHref ?? "#"} style={{ fontSize: 14, fontWeight: 600 }}>
                  {b.secondary}
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
