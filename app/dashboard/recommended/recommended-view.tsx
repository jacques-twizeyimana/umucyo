"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button, Chip, Icon, KeyDates, StatusBadge } from "@/components/umucyo";
import { tenderStatus } from "@/lib/data";
import { RECOMMENDATIONS, dueLabel } from "@/lib/dashboard";
import { addDays, daysLeft, fullDate } from "@/lib/dates";

type Sort = "Best match" | "Deadline soonest" | "Newest";

export function RecommendedView() {
  const [sort, setSort] = useState<Sort>("Best match");
  const [onlyNew, setOnlyNew] = useState(false);
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [watched, setWatched] = useState<Set<string>>(new Set());
  const [selRef, setSelRef] = useState(RECOMMENDATIONS[0].tender.ref);

  const items = useMemo(() => {
    const list = RECOMMENDATIONS.filter((r) => !hidden.has(r.tender.ref) && (!onlyNew || r.isNew));
    if (sort === "Deadline soonest") return [...list].sort((a, b) => a.tender.deadline.localeCompare(b.tender.deadline));
    if (sort === "Newest") return [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew));
    return [...list].sort((a, b) => b.why.length - a.why.length);
  }, [sort, onlyNew, hidden]);

  const sel = items.find((r) => r.tender.ref === selRef) ?? items[0];
  const newCount = RECOMMENDATIONS.filter((r) => r.isNew).length;

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
        <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>Sort:</span>
        {(["Best match", "Deadline soonest", "Newest"] as Sort[]).map((s) => (
          <Chip key={s} selected={sort === s} onClick={() => setSort(s)}>
            {s}
          </Chip>
        ))}
        <span aria-hidden="true" style={{ width: 1, height: 24, background: "var(--line)", margin: "0 4px" }} />
        <Chip selected={onlyNew} count={newCount} onClick={() => setOnlyNew(!onlyNew)}>
          New since yesterday
        </Chip>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
        <ul
          aria-label="Matching tenders"
          style={{ listStyle: "none", margin: 0, padding: 0, flex: "1 1 380px", maxWidth: 480, display: "flex", flexDirection: "column", gap: 10 }}
        >
          {items.map((r) => {
            const t = r.tender;
            const due = dueLabel(t);
            const current = sel?.tender.ref === t.ref;
            return (
              <li key={t.ref}>
                <button type="button" className="app-pick" aria-current={current ? "true" : undefined} onClick={() => setSelRef(t.ref)}>
                  <span style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center" }}>
                    <span className="uc-ref">{t.ref}</span>
                    {r.isNew ? <span className="uc-badge app-new">New</span> : null}
                  </span>
                  <span style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 17, lineHeight: "23px", fontWeight: 600, margin: "6px 0 4px" }}>
                    {t.title}
                  </span>
                  <span style={{ display: "block", fontSize: 14, color: "var(--ink-muted)" }}>
                    {t.entity} · {t.budget}
                  </span>
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginTop: 10 }}>
                    <span className="app-match">Matches {r.why.length} preferences</span>
                    <span className={due.days <= 7 ? "app-due app-due-soon" : "app-due"}>{due.label}</span>
                  </span>
                </button>
              </li>
            );
          })}
          {items.length === 0 ? (
            <li className="uc-muted" style={{ padding: 16 }}>
              No matches with these filters.
            </li>
          ) : (
            <li style={{ padding: "12px 0", textAlign: "center" }}>
              <Link href="/tenders?q=ICT" style={{ fontWeight: 600, fontSize: 14 }}>
                Show 17 more
              </Link>
            </li>
          )}
        </ul>

        {sel ? (
          <article
            className="app-panel app-sticky"
            aria-labelledby="det-h"
            aria-live="polite"
            style={{ flex: "999 1 460px", minWidth: 0, position: "sticky", top: 92, padding: 28, display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <StatusBadge status={tenderStatus(sel.tender)} />
              <span className="uc-ref">{sel.tender.ref}</span>
            </div>
            <div>
              <h2 id="det-h" style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 26, lineHeight: "32px", fontWeight: 700, letterSpacing: "-0.015em" }}>
                {sel.tender.title}
              </h2>
              <p style={{ margin: "8px 0 0", color: "var(--ink-muted)" }}>
                {sel.tender.entity} · {sel.tender.category} · {sel.tender.method}
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <Button variant="primary" iconRight="arrow-right" href="/dashboard/bids/prepare">
                Start a bid
              </Button>
              <button
                type="button"
                className="uc-btn uc-btn-secondary"
                aria-pressed={watched.has(sel.tender.ref)}
                onClick={() => {
                  const n = new Set(watched);
                  if (n.has(sel.tender.ref)) n.delete(sel.tender.ref);
                  else n.add(sel.tender.ref);
                  setWatched(n);
                }}
              >
                <Icon name="bookmark" size={18} />
                {watched.has(sel.tender.ref) ? "Watching" : "Watch"}
              </button>
              <Button variant="ghost" href={`/tenders/${sel.tender.ref}`}>
                Open full tender
              </Button>
            </div>
            <dl className="uc-summary-grid" style={{ marginTop: 0 }}>
              <div>
                <dt>What they need</dt>
                <dd>{sel.tender.need}</dd>
              </div>
              <div>
                <dt>Who can bid</dt>
                <dd>{sel.tender.who}</dd>
              </div>
              <div>
                <dt>Estimated value</dt>
                <dd>{sel.tender.valueLong}</dd>
              </div>
            </dl>
            <div style={{ padding: 16, borderRadius: "var(--radius-md)", background: "var(--navy-soft)" }}>
              <p style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 15 }}>Why you’re seeing this</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {sel.why.map((w) => (
                  <span key={w} className="app-match" style={{ background: "var(--surface-raised)" }}>
                    ✓ {w}
                  </span>
                ))}
              </div>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--ink-muted)" }}>
                Your documents cover {sel.docsReady} of the {sel.docsTotal} required.{" "}
                <Link href="/dashboard/bids/prepare">See what’s missing</Link>
              </p>
            </div>
            <div>
              <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 700 }}>Key dates</h3>
              <KeyDates
                items={[
                  { label: "Published", when: "Mon 2 Nov 2026", kind: "done" },
                  {
                    label: "Clarification questions close",
                    when: fullDate(addDays(sel.tender.deadline, -4, "17:00")),
                    kind: daysLeft(addDays(sel.tender.deadline, -4)) >= 0 ? "next" : "done",
                    action: "Ask a question",
                    actionIcon: "question",
                    href: `/tenders/${sel.tender.ref}#qa`,
                  },
                  { label: "Submission deadline", when: fullDate(sel.tender.deadline), kind: "deadline", action: "Add to calendar" },
                ]}
              />
            </div>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid var(--line)", fontSize: 14 }}
            >
              <span className="uc-muted">Not a fit?</span>
              <button type="button" className="uc-btn uc-btn-link" onClick={() => setHidden(new Set(hidden).add(sel.tender.ref))}>
                Hide tenders like this
              </button>
            </div>
          </article>
        ) : null}
      </div>
    </>
  );
}
