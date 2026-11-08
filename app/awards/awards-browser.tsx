"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Notice, StatusBadge } from "@/components/umucyo";
import { Icon } from "@/components/umucyo/icon";
import { AWARDS, CATEGORIES, TENDERS } from "@/lib/data";

const TABS = ["Awarded contracts", "Procurement plans", "Bid opening reports"] as const;
type Tab = (typeof TABS)[number];
const ENTITIES = ["All entities", ...Array.from(new Set(AWARDS.map((a) => a.entity))).sort()];

function Field({ id, label, options, value, onChange }: { id: string; label: string; options: readonly string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="uc-field">
      <label className="uc-label" htmlFor={id}>
        {label}
      </label>
      <div className="uc-select-wrap">
        <select id={id} className="uc-select" value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <Icon name="chevron-down" size={18} />
      </div>
    </div>
  );
}

export function AwardsBrowser() {
  const [tab, setTab] = useState<Tab>("Awarded contracts");
  const [q, setQ] = useState("");
  const [entity, setEntity] = useState("All entities");
  const [cat, setCat] = useState("All categories");
  const [year, setYear] = useState("2026/27");

  const rows = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return AWARDS.filter((a) => {
      const hay = `${a.title} ${a.winner} ${a.ref} ${a.entity}`.toLowerCase();
      return (
        words.every((w) => hay.includes(w)) &&
        (entity === "All entities" || a.entity === entity) &&
        (cat === "All categories" || a.category === cat) &&
        year === "2026/27"
      );
    });
  }, [q, entity, cat, year]);

  return (
    <>
      <nav aria-label="Plans and awards sections" className="uc-container" style={{ display: "flex", gap: 4, overflowX: "auto", marginTop: -48 }}>
        {TABS.map((t) => (
          <button key={t} type="button" className="aw-tab" aria-current={tab === t ? "page" : undefined} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </nav>

      <div className="uc-container" style={{ paddingTop: 32, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
        {tab === "Awarded contracts" ? (
          <>
            <form
              role="search"
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, alignItems: "end" }}
            >
              <div className="uc-field aw-q">
                <label className="uc-label" htmlFor="aw-q">
                  Search contracts or companies
                </label>
                <input
                  id="aw-q"
                  className="uc-input"
                  type="search"
                  placeholder="e.g. road, Kivu Ridge, laptops"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <Field id="aw-ent" label="Procuring entity" options={ENTITIES} value={entity} onChange={setEntity} />
              <Field id="aw-cat" label="Category" options={["All categories", ...CATEGORIES]} value={cat} onChange={setCat} />
              <Field id="aw-yr" label="Fiscal year" options={["2026/27", "2025/26", "2024/25"]} value={year} onChange={setYear} />
            </form>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <p style={{ margin: 0, color: "var(--ink-muted)" }} aria-live="polite">
                <strong style={{ color: "var(--ink)", fontFamily: "var(--font-display)", fontSize: 20 }}>
                  {rows.length === AWARDS.length ? "2,316 contracts" : `${rows.length} ${rows.length === 1 ? "contract" : "contracts"}`}
                </strong>{" "}
                awarded in {year} {year === "2026/27" ? "so far" : ""}
              </p>
              <p className="uc-muted" style={{ margin: 0, fontSize: 14 }}>
                Sorted by award date, newest first
              </p>
            </div>

            {rows.length ? (
              <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-md)", overflowX: "auto", background: "var(--surface-raised)" }}>
                <table className="pg-table" style={{ minWidth: 1080 }}>
                  <caption className="uc-sr">Awarded contracts, newest first</caption>
                  <thead>
                    <tr>
                      <th scope="col">Contract</th>
                      <th scope="col">Procuring entity</th>
                      <th scope="col">Awarded to</th>
                      <th scope="col">Method</th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        Bids
                      </th>
                      <th scope="col" style={{ textAlign: "right" }}>
                        Contract value
                      </th>
                      <th scope="col">Awarded</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.ref}>
                        <td style={{ maxWidth: 320 }}>
                          <span style={{ fontWeight: 600, color: "var(--ink)" }}>{r.title}</span>
                          <div className="uc-ref">{r.ref}</div>
                        </td>
                        <td>{r.entity}</td>
                        <td>{r.winner}</td>
                        <td>{r.method}</td>
                        <td className="num">{r.bids}</td>
                        <td className="num">{r.value}</td>
                        <td style={{ whiteSpace: "nowrap" }}>{r.date}</td>
                        <td>
                          <StatusBadge status="awarded">{r.status}</StatusBadge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Notice tone="info" title={year === "2026/27" ? "No awards match these filters" : `Awards for ${year} are in the open data archive`}>
                {year === "2026/27"
                  ? "Try another search term, entity or category."
                  : "This concept shows 2026/27 only. Earlier fiscal years are available as CSV and JSON downloads."}
              </Notice>
            )}
          </>
        ) : tab === "Procurement plans" ? (
          <section aria-labelledby="plans-h" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h2 id="plans-h" className="uc-h2" style={{ margin: 0 }}>
              What public entities plan to buy in 2026/27
            </h2>
            <p className="uc-lead" style={{ margin: 0, maxWidth: 720 }}>
              Each entity publishes its annual procurement plan. Planned tenders appear here before they are published, so
              you can prepare early.
            </p>
            <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-md)", overflowX: "auto", background: "var(--surface-raised)" }}>
              <table className="pg-table" style={{ minWidth: 760 }}>
                <caption className="uc-sr">Planned and published tenders</caption>
                <thead>
                  <tr>
                    <th scope="col">Item</th>
                    <th scope="col">Procuring entity</th>
                    <th scope="col">Category</th>
                    <th scope="col">Method</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {TENDERS.slice(0, 8).map((t) => (
                    <tr key={t.ref}>
                      <td style={{ maxWidth: 340 }}>
                        <Link href={`/tenders/${t.ref}`} style={{ fontWeight: 600, color: "var(--ink)" }}>
                          {t.title}
                        </Link>
                        <div className="uc-ref">{t.ref}</div>
                      </td>
                      <td>{t.entity}</td>
                      <td>{t.category}</td>
                      <td>{t.method}</td>
                      <td>
                        <StatusBadge status="open">Published</StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <Notice tone="info" title="Bid opening reports are published on each tender page">
            Right after a submission deadline, the opening report lists every bidder and the price read out at opening. Open a
            closed tender to see its report.
          </Notice>
        )}

        <div id="data" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24, marginTop: 16 }}>
          <Notice tone="info" title="About this data" action="Read the data dictionary" href="/legal-framework#f4">
            Award decisions are published by each procuring entity. Values are in Rwandan francs, including taxes, as stated
            in the award decision.
          </Notice>
          <Notice tone="amended" title="See a problem in a contract?" action="Report fraud or corruption" href="/legal-framework#f5">
            Report suspected collusion, bribery or bid-rigging. You can report anonymously.
          </Notice>
        </div>
      </div>
    </>
  );
}
