"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Breadcrumbs, Button, Chip, Notice, SearchBar, Select, TenderCard } from "@/components/umucyo";
import {
  CATEGORIES,
  METHODS,
  PROVINCES,
  TENDERS,
  VALUE_BANDS,
  matchesQuery,
  matchesValueBand,
  toCard,
  type Category,
  type Province,
  type TenderRecord,
  type ValueBand,
} from "@/lib/data";
import { daysLeft } from "@/lib/dates";

const SORTS = ["Deadline: soonest first", "Newest first", "Value: highest first"] as const;
const PAGE_SIZE = 8;

type Req = "noSecurity" | "siteVisit" | "jv";
const REQS: [Req, string][] = [
  ["noSecurity", "No bid security required"],
  ["siteVisit", "Has a site visit"],
  ["jv", "Joint ventures allowed"],
];

const isClosing = (t: TenderRecord) => daysLeft(t.deadline) <= 7;

function toggle<T>(set: Set<T>, v: T) {
  const n = new Set(set);
  if (n.has(v)) n.delete(v);
  else n.add(v);
  return n;
}

/** Remounts the filters whenever the URL query changes (a new search resets the filter state). */
export function TenderSearch() {
  const params = useSearchParams();
  return <TenderSearchInner key={params.toString()} />;
}

function TenderSearchInner() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const q = params.get("q") ?? "";
  const catParam = params.get("cat");
  const locParam = params.get("loc");
  const statusParam = params.get("status");
  const valueParam = params.get("value") as ValueBand | null;

  const [status, setStatus] = useState({
    open: statusParam !== "closing",
    closing: true,
  });
  const [cats, setCats] = useState<Set<Category>>(
    () => new Set(catParam && CATEGORIES.includes(catParam as Category) ? [catParam as Category] : CATEGORIES),
  );
  const [locs, setLocs] = useState<Set<Province>>(
    () => new Set(locParam && PROVINCES.includes(locParam as Province) ? [locParam as Province] : []),
  );
  const [methods, setMethods] = useState<Set<string>>(new Set());
  const [value, setValue] = useState<ValueBand>(valueParam && VALUE_BANDS.includes(valueParam) ? valueParam : "Any value");
  const [reqs, setReqs] = useState<Set<Req>>(new Set());
  const [sort, setSort] = useState<(typeof SORTS)[number]>(SORTS[0]);
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const base = useMemo(() => TENDERS.filter((t) => matchesQuery(t, q)), [q]);

  const results = useMemo(() => {
    const list = base.filter((t) => {
      const okStatus = (isClosing(t) && status.closing) || (!isClosing(t) && status.open);
      const okCat = cats.has(t.category);
      const okLoc = locs.size === 0 || locs.has(t.province);
      const okMethod = methods.size === 0 || methods.has(t.method);
      const okReq =
        (!reqs.has("noSecurity") || !t.bidSecurity) &&
        (!reqs.has("siteVisit") || !!t.siteVisit) &&
        (!reqs.has("jv") || !!t.jvAllowed);
      return okStatus && okCat && okLoc && okMethod && okReq && matchesValueBand(t, value);
    });
    const sorted = [...list];
    if (sort === "Deadline: soonest first") sorted.sort((a, b) => a.deadline.localeCompare(b.deadline));
    if (sort === "Newest first") sorted.reverse();
    if (sort === "Value: highest first") sorted.sort((a, b) => (b.budgetMax ?? -1) - (a.budgetMax ?? -1));
    return sorted;
  }, [base, status, cats, locs, methods, reqs, value, sort]);

  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = results.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const countBy = <K,>(key: (t: TenderRecord) => K, v: K) => base.filter((t) => key(t) === v).length;

  const clearAll = () => {
    setStatus({ open: true, closing: true });
    setCats(new Set(CATEGORIES));
    setLocs(new Set());
    setMethods(new Set());
    setValue("Any value");
    setReqs(new Set());
    setPage(1);
  };

  const removeQuery = () => {
    const n = new URLSearchParams(params.toString());
    n.delete("q");
    const s = n.toString();
    router.push(s ? `${pathname}?${s}` : pathname);
  };

  const active: { label: string; remove: () => void }[] = [
    ...(cats.size < CATEGORIES.length
      ? [...cats].map((c) => ({ label: c, remove: () => setCats(toggle(cats, c)) }))
      : []),
    ...[...locs].map((l) => ({ label: l, remove: () => setLocs(toggle(locs, l)) })),
    ...[...methods].map((m) => ({ label: m, remove: () => setMethods(toggle(methods, m)) })),
    ...(value !== "Any value" ? [{ label: value, remove: () => setValue("Any value") }] : []),
    ...(!status.open ? [{ label: "Closing within 7 days", remove: () => setStatus({ open: true, closing: true }) }] : []),
    ...[...reqs].map((r) => ({ label: REQS.find((x) => x[0] === r)![1], remove: () => setReqs(toggle(reqs, r)) })),
  ];

  const resetPage = <A extends unknown[]>(fn: (...a: A) => void) => (...a: A) => {
    fn(...a);
    setPage(1);
  };

  return (
    <>
      {/* Page head */}
      <section style={{ background: "var(--surface-sunk)", borderBottom: "1px solid var(--line)", padding: "24px 0 32px" }}>
        <div className="uc-container" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Find tenders" }]} />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
            <div>
              <h1 className="uc-h1">Find tenders</h1>
              <p className="uc-lead" style={{ marginTop: 8 }}>
                Search everything public entities in Rwanda are buying right now.
              </p>
            </div>
            <Link href="/spending">Looking for past contracts? See where the money went</Link>
          </div>
          <SearchBar key={`${q}|${catParam}|${locParam}`} query={q} category={catParam ?? undefined} location={locParam ?? undefined} />
        </div>
      </section>

      {/* Body: filters + results */}
      <div
        className="uc-container pg-search-body"
      >
        <aside aria-label="Filters" className="pg-filters" data-open={filtersOpen}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 650 }}>Filters</h2>
            <button type="button" className="uc-btn uc-btn-link" onClick={clearAll}>
              Clear all
            </button>
          </div>
          <button
            type="button"
            className="pg-filters-toggle"
            aria-expanded={filtersOpen}
            aria-controls="filters-body"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <span>{filtersOpen ? "Hide filters" : "Show filters"}</span>
            {active.length ? <span className="n">{active.length} active</span> : null}
          </button>
          <div id="filters-body" className="pg-filters-body">

          <fieldset className="pg-fieldset">
            <legend>Status</legend>
            <label className="pg-check">
              <input type="checkbox" checked={status.open} onChange={resetPage(() => setStatus({ ...status, open: !status.open }))} />
              <span>Open</span>
              <span className="c">{base.filter((t) => !isClosing(t)).length}</span>
            </label>
            <label className="pg-check">
              <input
                type="checkbox"
                checked={status.closing}
                onChange={resetPage(() => setStatus({ ...status, closing: !status.closing }))}
              />
              <span>Closing within 7 days</span>
              <span className="c">{base.filter(isClosing).length}</span>
            </label>
          </fieldset>

          <fieldset className="pg-fieldset">
            <legend>Category</legend>
            {CATEGORIES.map((c) => (
              <label key={c} className="pg-check">
                <input type="checkbox" checked={cats.has(c)} onChange={resetPage(() => setCats(toggle(cats, c)))} />
                <span>{c}</span>
                <span className="c">{countBy((t) => t.category, c)}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="pg-fieldset">
            <legend>Location</legend>
            {PROVINCES.map((p) => (
              <label key={p} className="pg-check">
                <input type="checkbox" checked={locs.has(p)} onChange={resetPage(() => setLocs(toggle(locs, p)))} />
                <span>{p}</span>
                <span className="c">{countBy((t) => t.province, p)}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="pg-fieldset">
            <legend>Procurement method</legend>
            {METHODS.map((m) => (
              <label key={m} className="pg-check">
                <input type="checkbox" checked={methods.has(m)} onChange={resetPage(() => setMethods(toggle(methods, m)))} />
                <span>{m}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="pg-fieldset">
            <legend>Estimated value</legend>
            {VALUE_BANDS.map((v) => (
              <label key={v} className="pg-check">
                <input type="radio" name="val" checked={value === v} onChange={resetPage(() => setValue(v))} />
                <span>{v}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="pg-fieldset" style={{ borderBottom: 0 }}>
            <legend>Requirements</legend>
            {REQS.map(([k, label]) => (
              <label key={k} className="pg-check">
                <input type="checkbox" checked={reqs.has(k)} onChange={resetPage(() => setReqs(toggle(reqs, k)))} />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          </div>
        </aside>

        <section
          aria-labelledby="results-title"
          style={{ flex: "999 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
            <h2 id="results-title" aria-live="polite" style={{ margin: 0, fontSize: 16, fontWeight: 500, color: "var(--ink-muted)" }}>
              <strong style={{ color: "var(--ink)", fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 650 }}>
                {results.length === 1 ? "1 tender" : `${results.length} tenders`}
              </strong>{" "}
              {q ? `match “${q}”` : "match your filters"}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <label htmlFor="sort" style={{ font: "600 13px/16px var(--font-sans)" }}>
                Sort by
              </label>
              <Select
                id="sort"
                label="Sort by"
                options={SORTS}
                value={sort}
                onChange={(v) => setSort(v as (typeof SORTS)[number])}
                style={{ width: 220 }}
              />
              <Button variant="secondary" icon="bookmark" href="/dashboard/preferences">
                Save search &amp; get alerts
              </Button>
            </div>
          </div>

          {q || active.length ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>Active (select to remove):</span>
              {q ? (
                <Chip selected onClick={removeQuery}>
                  “{q}”
                </Chip>
              ) : null}
              {active.map((c) => (
                <Chip key={c.label} selected onClick={resetPage(c.remove)}>
                  {c.label}
                </Chip>
              ))}
            </div>
          ) : null}

          {shown.length ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: 20 }}>
              {shown.map((t) => (
                <TenderCard key={t.ref} tender={toCard(t)} />
              ))}
            </div>
          ) : (
            <Notice tone="info" title="No tenders match these filters">
              Remove a filter, or save this search to be alerted when a matching tender is published.
            </Notice>
          )}

          {pages > 1 ? (
            <nav aria-label="Pagination" className="pg-pager" style={{ marginTop: 16 }}>
              <a
                href="#results-title"
                aria-label="Previous page"
                aria-disabled={current === 1}
                onClick={() => setPage(Math.max(1, current - 1))}
              >
                ←
              </a>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <a key={n} href="#results-title" aria-current={n === current ? "page" : undefined} onClick={() => setPage(n)}>
                  {n}
                </a>
              ))}
              <a
                href="#results-title"
                aria-label="Next page"
                aria-disabled={current === pages}
                onClick={() => setPage(Math.min(pages, current + 1))}
              >
                →
              </a>
            </nav>
          ) : null}

          <div style={{ marginTop: 16 }}>
            <Notice tone="info" title="Building something with this data?" action="Open data & API" href="/spending#data">
              Every tender and award is available as open data. Download the results of any search as CSV or JSON.
            </Notice>
          </div>
        </section>
      </div>
    </>
  );
}
