"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Breadcrumbs, Notice, StatusBadge } from "@/components/umucyo";
import { Icon } from "@/components/umucyo/icon";
import { AWARDS, CATEGORIES, type AwardRow } from "@/lib/data";

type View = "contracts" | "suppliers" | "entities";

const VIEWS: [View, string][] = [
  ["contracts", "Contract history"],
  ["suppliers", "Supplier directory"],
  ["entities", "Public entity directory"],
];

const rwf = (n: number) => `RWF ${Math.round(n).toLocaleString("en-US")}`;
const amount = (a: AwardRow) => Number(a.value.replace(/[^0-9]/g, ""));
/** Few competing bids is a common red flag worth a closer look. */
const LOW_COMPETITION = 3;

function words(q: string) {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

function SelectField({
  id,
  label,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
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

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="app-stat" style={{ background: "var(--surface-raised)" }}>
      <span>{label}</span>
      <b style={{ fontSize: 24, lineHeight: "30px", overflowWrap: "anywhere" }}>{value}</b>
      {note ? <span>{note}</span> : null}
    </div>
  );
}

/* ---------------- Contract history ---------------- */
function ContractHistory({ initialQuery, initialEntity }: { initialQuery: string; initialEntity: string }) {
  const entities = useMemo(() => ["All entities", ...Array.from(new Set(AWARDS.map((a) => a.entity))).sort()], []);
  const [q, setQ] = useState(initialQuery);
  const [entity, setEntity] = useState(entities.includes(initialEntity) ? initialEntity : "All entities");
  const [cat, setCat] = useState("All categories");
  const [year, setYear] = useState("2026/27");
  const [lowOnly, setLowOnly] = useState(false);

  const rows = useMemo(() => {
    const w = words(q);
    return AWARDS.filter((a) => {
      const hay = `${a.title} ${a.winner} ${a.ref} ${a.entity}`.toLowerCase();
      return (
        w.every((x) => hay.includes(x)) &&
        (entity === "All entities" || a.entity === entity) &&
        (cat === "All categories" || a.category === cat) &&
        (!lowOnly || a.bids <= LOW_COMPETITION) &&
        year === "2026/27"
      );
    });
  }, [q, entity, cat, lowOnly, year]);

  const total = rows.reduce((s, a) => s + amount(a), 0);
  const avgBids = rows.length ? rows.reduce((s, a) => s + a.bids, 0) / rows.length : 0;
  const low = rows.filter((a) => a.bids <= LOW_COMPETITION).length;

  return (
    <>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, alignItems: "end" }}
      >
        <div className="uc-field aw-q">
          <label className="uc-label" htmlFor="sp-q">
            Search contracts, companies or references
          </label>
          <input
            id="sp-q"
            className="uc-input"
            type="search"
            placeholder="e.g. road, Kivu Ridge, RW-GSB-2026-0071"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <SelectField id="sp-ent" label="Public entity" options={entities} value={entity} onChange={setEntity} />
        <SelectField id="sp-cat" label="Category" options={["All categories", ...CATEGORIES]} value={cat} onChange={setCat} />
        <SelectField id="sp-yr" label="Fiscal year" options={["2026/27", "2025/26", "2024/25"]} value={year} onChange={setYear} />
      </form>

      <label className="pg-check" style={{ width: "fit-content" }}>
        <input type="checkbox" checked={lowOnly} onChange={() => setLowOnly(!lowOnly)} />
        <span>Only contracts with {LOW_COMPETITION} bids or fewer</span>
      </label>

      <div aria-live="polite" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: 16 }}>
        <Stat label="Contracts" value={String(rows.length)} note={`awarded in ${year}`} />
        <Stat label="Total contract value" value={rwf(total)} note="including taxes" />
        <Stat label="Average bids per contract" value={avgBids.toFixed(1)} note="higher means more competition" />
        <Stat label="Low competition" value={String(low)} note={`contracts with ${LOW_COMPETITION} bids or fewer`} />
      </div>

      {rows.length ? (
        <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-md)", overflowX: "auto", background: "var(--surface-raised)" }}>
          <table className="pg-table" style={{ minWidth: 1080 }}>
            <caption className="uc-sr">Contracts awarded, newest first</caption>
            <thead>
              <tr>
                <th scope="col">Contract</th>
                <th scope="col">Public entity</th>
                <th scope="col">Supplier</th>
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
                  <td>
                    <Link href={`/spending?view=contracts&entity=${encodeURIComponent(r.entity)}`}>{r.entity}</Link>
                  </td>
                  <td>
                    <Link href={`/spending?view=contracts&q=${encodeURIComponent(r.winner)}`}>{r.winner}</Link>
                  </td>
                  <td>{r.method}</td>
                  <td className="num">
                    {r.bids}
                    {r.bids <= LOW_COMPETITION ? (
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-muted)" }}>few bids</div>
                    ) : null}
                  </td>
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
        <Notice tone="info" title={year === "2026/27" ? "No contracts match these filters" : `Contracts for ${year} are in the open data archive`}>
          {year === "2026/27"
            ? "Try another search term, entity or category."
            : "This concept shows 2026/27 only. Earlier fiscal years are available as CSV and JSON downloads."}
        </Notice>
      )}
    </>
  );
}

/* ---------------- Directories ---------------- */
type DirRow = { name: string; contracts: number; total: number; avgBids: number; latest: string; related: string[] };

function groupBy(key: "winner" | "entity", other: "winner" | "entity"): DirRow[] {
  const map = new Map<string, AwardRow[]>();
  for (const a of AWARDS) map.set(a[key], [...(map.get(a[key]) ?? []), a]);
  return [...map.entries()]
    .map(([name, list]) => ({
      name,
      contracts: list.length,
      total: list.reduce((s, a) => s + amount(a), 0),
      avgBids: list.reduce((s, a) => s + a.bids, 0) / list.length,
      latest: list[0].date,
      related: Array.from(new Set(list.map((a) => a[other]))),
    }))
    .sort((a, b) => b.total - a.total);
}

function Directory({ kind }: { kind: "suppliers" | "entities" }) {
  const [q, setQ] = useState("");
  const all = useMemo(() => (kind === "suppliers" ? groupBy("winner", "entity") : groupBy("entity", "winner")), [kind]);
  const rows = all.filter((r) => words(q).every((w) => r.name.toLowerCase().includes(w)));
  const isSup = kind === "suppliers";

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
        <div className="uc-field" style={{ flex: "1 1 320px", maxWidth: 480 }}>
          <label className="uc-label" htmlFor="dir-q">
            {isSup ? "Find a supplier" : "Find a public entity"}
          </label>
          <input
            id="dir-q"
            className="uc-input"
            type="search"
            placeholder={isSup ? "e.g. Kivu Ridge" : "e.g. Rubavu District"}
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <p className="uc-muted" style={{ margin: 0, fontSize: 14, maxWidth: 520 }}>
          {isSup
            ? "Every company paid through a public contract, ranked by total contract value. Select one to see each contract it won."
            : "Every public body that awarded contracts, ranked by total contract value. Select one to see what it bought and from whom."}
        </p>
      </div>

      {rows.length ? (
        <div style={{ border: "1px solid var(--line)", borderRadius: "var(--radius-md)", overflowX: "auto", background: "var(--surface-raised)" }}>
          <table className="pg-table" style={{ minWidth: 860 }}>
            <caption className="uc-sr">{isSup ? "Suppliers ranked by total contract value" : "Public entities ranked by total contract value"}</caption>
            <thead>
              <tr>
                <th scope="col">{isSup ? "Supplier" : "Public entity"}</th>
                <th scope="col" style={{ textAlign: "right" }}>
                  {isSup ? "Contracts won" : "Contracts awarded"}
                </th>
                <th scope="col" style={{ textAlign: "right" }}>
                  Total value
                </th>
                <th scope="col" style={{ textAlign: "right" }}>
                  Avg bids
                </th>
                <th scope="col">{isSup ? "Paid by" : "Suppliers paid"}</th>
                <th scope="col">Latest award</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name}>
                  <td>
                    <Link
                      href={`/spending?view=contracts&${isSup ? "q" : "entity"}=${encodeURIComponent(r.name)}`}
                      style={{ fontWeight: 600, color: "var(--ink)" }}
                    >
                      {r.name}
                    </Link>
                  </td>
                  <td className="num">{r.contracts}</td>
                  <td className="num">{rwf(r.total)}</td>
                  <td className="num">{r.avgBids.toFixed(1)}</td>
                  <td>{r.related.join(", ")}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{r.latest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Notice tone="info" title={isSup ? "No supplier matches that name" : "No public entity matches that name"}>
          Check the spelling, or search the contract history instead.
        </Notice>
      )}
    </>
  );
}

/* ---------------- Page body ---------------- */
export function SpendingRecord() {
  const params = useSearchParams();
  const raw = params.get("view");
  const view: View = raw === "suppliers" || raw === "entities" ? raw : "contracts";
  const label = VIEWS.find((v) => v[0] === view)![1];

  return (
    <>
      <section style={{ background: "var(--surface-sunk)", borderBottom: "1px solid var(--line)", padding: "24px 0 0" }}>
        <div className="uc-container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Where the money went", href: "/spending" }, { label }]} />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginTop: 24 }}>
            <div style={{ maxWidth: 760 }}>
              <p className="uc-eyebrow">Public spending record</p>
              <h1 className="uc-h1">Where the money went</h1>
              <p className="uc-lead" style={{ marginTop: 12 }}>
                The full history of contracts paid for with public money: what was bought, which public body bought it, which
                company was paid, how many bids competed and what it cost. Follow any supplier or public entity across
                contracts, and download everything to check it yourself.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <button type="button" className="uc-btn uc-btn-secondary">
                <Icon name="download" size={18} />
                CSV
              </button>
              <button type="button" className="uc-btn uc-btn-secondary">
                <Icon name="download" size={18} />
                JSON
              </button>
              <a href="#data" className="uc-btn uc-btn-ghost">
                API docs
                <Icon name="external" size={18} />
              </a>
            </div>
          </div>
          <nav aria-label="Spending record views" style={{ display: "flex", gap: 4, marginTop: 32, overflowX: "auto" }}>
            {VIEWS.map(([key, text]) => (
              <Link
                key={key}
                href={key === "contracts" ? "/spending" : `/spending?view=${key}`}
                scroll={false}
                className="aw-tab"
                aria-current={view === key ? "page" : undefined}
              >
                {text}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="uc-container" style={{ paddingTop: 32, paddingBottom: 64, display: "flex", flexDirection: "column", gap: 24 }}>
        {view === "contracts" ? (
          <ContractHistory
            key={params.toString()}
            initialQuery={params.get("q") ?? ""}
            initialEntity={params.get("entity") ?? "All entities"}
          />
        ) : (
          <Directory key={view} kind={view} />
        )}

        <div id="data" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24, marginTop: 16 }}>
          <Notice tone="info" title="About this data" action="Read the data dictionary" href="/legal-framework#f4">
            Award decisions are published by each public entity. Values are in Rwandan francs, including taxes, as stated in
            the award decision. Every record is free to download and reuse.
          </Notice>
          <Notice tone="info" title="See a problem in a contract?" action="Report fraud or corruption" href="/legal-framework#f5">
            Report suspected collusion, bribery or bid-rigging. You can report anonymously.
          </Notice>
        </div>
      </div>
    </>
  );
}
