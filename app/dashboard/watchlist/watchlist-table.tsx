"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Deadline, StatusBadge } from "@/components/umucyo";
import { getTender } from "@/lib/data";
import { WATCHLIST } from "@/lib/dashboard";
import { cardDate, daysLeft } from "@/lib/dates";

type Tab = "Open" | "Closed" | "Awarded";

export function WatchlistTable() {
  const [removed, setRemoved] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<Tab>("Open");
  const rows = WATCHLIST.filter((r) => !removed.has(r.ref));
  const counts: Record<Tab, number> = { Open: rows.length, Closed: 4, Awarded: 2 };

  return (
    <>
      <nav className="app-tabs" aria-label="Watchlist filter">
        {(["Open", "Closed", "Awarded"] as Tab[]).map((t) => (
          <a
            key={t}
            href="#watch-table"
            aria-current={tab === t ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setTab(t);
            }}
          >
            {t} <span className="n">{counts[t]}</span>
          </a>
        ))}
      </nav>

      {tab === "Open" ? (
        <div id="watch-table" className="app-panel" style={{ padding: 0, overflowX: "auto" }}>
          <table className="pg-table" style={{ minWidth: 940 }}>
            <caption className="uc-sr">Watched open tenders</caption>
            <thead>
              <tr>
                <th scope="col">Tender</th>
                <th scope="col">Updates</th>
                <th scope="col">Deadline</th>
                <th scope="col">Your bid</th>
                <th scope="col">
                  <span className="uc-sr">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const t = getTender(r.ref)!;
                return (
                  <tr key={r.ref}>
                    <td style={{ maxWidth: 340 }}>
                      <Link href={`/tenders/${t.ref}`} style={{ fontWeight: 600, color: "var(--ink)", fontSize: 15 }}>
                        {t.title}
                      </Link>
                      <div style={{ fontSize: 13, color: "var(--ink-muted)", marginTop: 2 }}>
                        {t.entity} ·{" "}
                        <span className="uc-ref" style={{ fontSize: 12 }}>
                          {t.ref}
                        </span>
                      </div>
                    </td>
                    <td>
                      {r.update ? (
                        <>
                          <StatusBadge status={r.updStatus}>{r.update}</StatusBadge>
                          <div style={{ fontSize: 12, color: "var(--ink-muted)", marginTop: 4 }}>{r.updWhen}</div>
                        </>
                      ) : (
                        <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>No changes</span>
                      )}
                    </td>
                    <td>
                      <Deadline date={cardDate(t.deadline)} iso={t.deadline} daysLeft={daysLeft(t.deadline)} label="Closes" />
                    </td>
                    <td style={{ minWidth: 150 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{r.bid}</span>
                      {r.pct > 0 ? (
                        <div
                          className="app-progress"
                          style={{ marginTop: 8, width: 120 }}
                          role="progressbar"
                          aria-valuenow={r.pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label="Bid progress"
                        >
                          <span style={{ width: `${r.pct}%` }} />
                        </div>
                      ) : null}
                    </td>
                    <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                      <Button variant="secondary" size="sm" href="/dashboard/bids/prepare">
                        {r.cta}
                      </Button>{" "}
                      <button
                        type="button"
                        className="uc-btn uc-btn-ghost uc-btn-sm"
                        onClick={() => setRemoved(new Set(removed).add(r.ref))}
                      >
                        Unwatch<span className="uc-sr">: {t.title}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", color: "var(--ink-muted)" }}>
                    You are not watching any open tenders. <Link href="/tenders">Find tenders</Link>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      ) : (
        <div id="watch-table" className="app-panel" style={{ color: "var(--ink-muted)" }}>
          {tab === "Closed"
            ? "4 tenders you watched have closed. Their opening reports and decisions will appear here."
            : "2 tenders you watched have been awarded. See who won and for how much."}{" "}
          <Link href="/spending">See where the money went</Link>
        </div>
      )}
    </>
  );
}
