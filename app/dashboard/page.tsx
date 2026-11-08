import type { Metadata } from "next";
import Link from "next/link";
import { AppShell, PageHead } from "@/components/dashboard/shell";
import { WatchButton } from "@/components/dashboard/watch-button";
import { Button, Deadline, Notice } from "@/components/umucyo";
import { RECOMMENDATIONS, dueLabel } from "@/lib/dashboard";

export const metadata: Metadata = { title: "Dashboard" };

const DUE = [
  { title: "Supply of 30 interactive classroom screens", what: "Watching · submission deadline", when: "Thu 10:00", urgent: true, href: "/tenders/RW-MUS-2026-0150" },
  { title: "Website redesign for Rubavu District", what: "Your draft · questions close", when: "Fri 17:00", urgent: true, href: "/dashboard/bids/prepare" },
  { title: "Network cabling for 14 sector offices", what: "Watching · site visit", when: "Sat 09:00", urgent: false, href: "/tenders/RW-HUY-2026-0061" },
];

export default function DashboardOverview() {
  const recs = ["RW-RUB-2026-0211", "RW-KGL-2026-0311", "RW-NGO-2026-0034", "RW-NYA-2026-0027"].map(
    (ref) => RECOMMENDATIONS.find((r) => r.tender.ref === ref)!,
  );
  return (
    <AppShell active="overview">
      <PageHead
        title="Good afternoon, Aline"
        sub={
          <>
            Ikaze Digital Ltd · <strong style={{ color: "var(--ink)" }}>4 new tenders</strong> match you since yesterday
          </>
        }
        action={
          <Button variant="primary" iconRight="arrow-right" href="/dashboard/recommended">
            See my matches
          </Button>
        }
      />

      <Notice tone="amended" title="A tender you watch was amended" action="See what changed" href="/tenders/RW-KGL-2026-0311">
        “Design of a mobile app for city bus timetables” — the deadline moved to Tue 8 Dec 2026, and a new requirement was added
        to Section III.
      </Notice>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))", gap: 16 }}>
        <Link className="app-stat" href="/dashboard/recommended">
          <span>New matches</span>
          <b>12</b>
          <span>this week</span>
        </Link>
        <Link className="app-stat" href="/dashboard/watchlist">
          <span>Watching</span>
          <b>6</b>
          <span>2 close this week</span>
        </Link>
        <Link className="app-stat" href="/dashboard/bids">
          <span>Bids in progress</span>
          <b>2</b>
          <span>drafts</span>
        </Link>
        <Link className="app-stat" href="/dashboard/bids">
          <span>Submitted</span>
          <b>3</b>
          <span>1 decision published</span>
        </Link>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
        <section className="app-panel" aria-labelledby="rec-h" style={{ flex: "999 1 520px", minWidth: 0 }}>
          <div className="app-panel-h">
            <h2 id="rec-h">Recommended for you</h2>
            <Link href="/dashboard/recommended" style={{ fontSize: 14, fontWeight: 600 }}>
              View all 23
            </Link>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {recs.map((r) => {
              const t = r.tender;
              const due = dueLabel(t);
              return (
                <li key={t.ref} className="app-row" style={{ alignItems: "start" }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      {r.isNew ? <span className="uc-badge app-new">New</span> : null}
                      <span className="uc-ref">{t.ref}</span>
                    </div>
                    <Link
                      href={`/tenders/${t.ref}`}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: 17,
                        lineHeight: "23px",
                        fontWeight: 600,
                        color: "var(--ink)",
                        textDecoration: "none",
                      }}
                    >
                      {t.title}
                    </Link>
                    <p style={{ margin: "4px 0 8px", fontSize: 14, color: "var(--ink-muted)" }}>
                      {t.entity} · {t.budget}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {r.why.map((w) => (
                        <span key={w} className="app-match">
                          ✓ {w}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                    <Deadline date={due.card} iso={t.deadline} daysLeft={due.days} label="Deadline" />
                    <WatchButton initial={t.ref === "RW-KGL-2026-0311"} title={t.title} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
          <section className="app-panel" aria-labelledby="dl-h">
            <div className="app-panel-h">
              <h2 id="dl-h">Due this week</h2>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {DUE.map((d) => (
                <li key={d.title} className="app-row">
                  <div style={{ minWidth: 0 }}>
                    <Link href={d.href} style={{ fontWeight: 600, fontSize: 15, color: "var(--ink)", textDecoration: "none" }}>
                      {d.title}
                    </Link>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--ink-muted)" }}>{d.what}</p>
                  </div>
                  <span className={d.urgent ? "app-due app-due-soon" : "app-due"} style={{ padding: "6px 10px" }}>
                    {d.when}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="app-panel" aria-labelledby="bd-h">
            <div className="app-panel-h">
              <h2 id="bd-h">Your bids</h2>
              <Link href="/dashboard/bids" style={{ fontSize: 14, fontWeight: 600 }}>
                All bids
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15 }}>Data platform for municipal permits</p>
                <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--ink-muted)" }}>City of Kigali · Under evaluation</p>
                <div className="app-pipe" aria-label="Stage: Evaluation">
                  <div className="done">Submitted</div>
                  <div className="done">Opened</div>
                  <div className="now">Evaluation</div>
                  <div>Decision</div>
                  <div>Contract</div>
                </div>
              </div>
              <div>
                <p style={{ margin: "0 0 4px", fontWeight: 600, fontSize: 15 }}>
                  <Link href="/dashboard/bids/prepare" style={{ color: "var(--ink)", textDecoration: "none" }}>
                    Website redesign for Rubavu District
                  </Link>
                </p>
                <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--ink-muted)" }}>Draft · 4 of 6 documents ready</p>
                <div className="app-progress" role="progressbar" aria-valuenow={66} aria-valuemin={0} aria-valuemax={100} aria-label="Draft progress">
                  <span style={{ width: "66%" }} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
