import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppShell } from "@/components/dashboard/shell";
import { Button, KeyDates, Notice, StatusBadge } from "@/components/umucyo";
import type { KeyDateItem } from "@/lib/data";

export const metadata: Metadata = { title: "Bid submitted" };

const DATES: KeyDateItem[] = [
  { label: "Bid submitted", when: "Sun 8 Nov 2026 · 19:04 CAT", note: "Receipt RW-RUB-2026-0211-B004", kind: "done" },
  {
    label: "Clarification questions close",
    when: "Fri 13 Nov 2026 · 17:00 CAT",
    note: "Answers may lead to an amendment. We’ll alert you.",
    kind: "next",
    action: "Read Q&A",
    actionIcon: "question",
    href: "/tenders/RW-RUB-2026-0211#qa",
  },
  { label: "Submission deadline", when: "Mon 23 Nov 2026 · 16:00 CAT", note: "Last moment to replace or withdraw your bid.", kind: "deadline", action: "Add to calendar" },
  { label: "Bid opening", when: "Mon 23 Nov 2026 · 16:30 CAT", note: "Bidder names and prices are read out. The opening report appears here." },
  { label: "Evaluation", when: "Expected late Nov – early Dec 2026", note: "The buyer checks completeness, qualification and price." },
  { label: "Award decision", when: "Every bidder is notified", note: "If you disagree with the decision, you can request a review." },
];

const RECEIPT: [string, ReactNode][] = [
  ["Receipt number", <span key="r" className="uc-ref" style={{ color: "var(--ink)", fontSize: 15 }}>RW-RUB-2026-0211-B004</span>],
  ["Tender", <Link key="t" href="/tenders/RW-RUB-2026-0211">Website redesign and hosting for Rubavu District</Link>],
  ["Bidder", "Ikaze Digital Ltd · signed by Aline Uwase, CEO"],
  ["Contents", "6 documents · 8.6 MB · price sealed"],
  ["Submitted", "Sun 8 Nov 2026, 19:04:12 CAT"],
];

export default function BidSubmittedPage() {
  return (
    <AppShell
      active="bids"
      crumbs={[{ label: "My bids", href: "/dashboard/bids" }, { label: "Submitted", href: "/dashboard/bids" }, { label: "Rubavu website" }]}
      bodyStyle={{ maxWidth: 1120 }}
    >
      <section className="uc-on-navy receipt-hero" aria-labelledby="ok-h">
        <div aria-hidden="true" className="receipt-ring" />
        <div aria-hidden="true" className="receipt-sun" />
        <div style={{ position: "relative", maxWidth: 640 }}>
          <p className="uc-eyebrow" style={{ color: "var(--on-navy-muted)" }}>
            Bid submitted · Sun 8 Nov 2026, 19:04 CAT
          </p>
          <h1 id="ok-h" className="receipt-title">
            Your bid is in. Nice work.
          </h1>
          <p style={{ margin: "12px 0 24px", fontSize: 16, lineHeight: "25px", color: "var(--on-navy-muted)" }}>
            It is sealed and encrypted until the opening on Mon 23 Nov at 16:30. Nobody — including Rubavu District — can see it
            before then.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Button variant="accent" icon="download">
              Download receipt (PDF)
            </Button>
            <Button variant="inverse" icon="calendar">
              Add dates to calendar
            </Button>
          </div>
        </div>
      </section>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
        <section className="app-panel" aria-labelledby="tr-h" style={{ flex: "999 1 480px", minWidth: 0 }}>
          <div className="app-panel-h" style={{ flexWrap: "wrap" }}>
            <h2 id="tr-h">Track this bid</h2>
            <StatusBadge status="open">Submitted · editable</StatusBadge>
          </div>
          <KeyDates items={DATES} />
        </section>

        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
          <section className="app-panel" aria-labelledby="rc-h">
            <div className="app-panel-h">
              <h2 id="rc-h">Receipt</h2>
            </div>
            <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
              {RECEIPT.map(([dt, dd]) => (
                <div key={dt}>
                  <dt style={{ color: "var(--ink-muted)", fontWeight: 600, fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    {dt}
                  </dt>
                  <dd style={{ margin: "2px 0 0" }}>{dd}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="change" className="app-panel" aria-labelledby="ch-h">
            <div className="app-panel-h">
              <h2 id="ch-h">Need to change it?</h2>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 14, lineHeight: "21px", color: "var(--ink-muted)" }}>
              Until Mon 23 Nov, 16:00 you can replace your bid with a new version or withdraw it. After the deadline it is locked.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Button size="sm" href="/dashboard/bids/prepare">
                Replace bid
              </Button>
              <Button variant="ghost" size="sm" className="btn-danger-text">
                Withdraw bid
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Notice tone="info" title="We’ll keep you posted" action="Notification settings" href="/dashboard/preferences">
        You’ll get an email and an SMS when the opening report is published, if the tender is amended, and when the award
        decision is made.
      </Notice>
    </AppShell>
  );
}
