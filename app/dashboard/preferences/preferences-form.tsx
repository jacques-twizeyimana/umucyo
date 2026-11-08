"use client";

import { useState, type KeyboardEvent } from "react";
import { Chip, Icon } from "@/components/umucyo";

type Mode = "instant" | "batch" | "daily" | "weekly";

const MODES: [Mode, string, string][] = [
  ["instant", "As soon as a match is published", "One alert per tender. Best if you bid on everything that fits."],
  ["batch", "When several matches have built up", "Fewer, fuller alerts. Choose how many new matches to wait for."],
  ["daily", "Daily digest at 08:00", "One message each morning with every new match."],
  ["weekly", "Weekly digest on Monday at 08:00", "A summary of the week’s matches."],
];

const MAX_OPTS = ["10", "20", "50", "200", "1000"];

function useFlags<K extends string>(init: Record<K, boolean>, touch: () => void) {
  const [state, setState] = useState(init);
  const flip = (k: K) => {
    setState((s) => ({ ...s, [k]: !s[k] }));
    touch();
  };
  return [state, flip] as const;
}

function Toggle({ title, note, on, onChange, disabled }: { title: string; note: string; on: boolean; onChange?: () => void; disabled?: boolean }) {
  return (
    <label className="app-toggle">
      <span>
        <strong style={{ display: "block", fontSize: 15 }}>{title}</strong>
        <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>{note}</span>
      </span>
      <span className="app-switch">
        <input type="checkbox" role="switch" checked={on} onChange={onChange} disabled={disabled} aria-label={title} />
        <span />
      </span>
    </label>
  );
}

export function PreferencesForm() {
  const [saved, setSaved] = useState(false);
  const touch = () => setSaved(false);

  const [topics, flipTopic] = useFlags(
    {
      "ICT & digital": true,
      "Data & analytics": true,
      Training: false,
      Construction: false,
      "Health supplies": false,
      "Office supplies": false,
      Catering: false,
      "Security services": false,
      Transport: false,
      "Energy & solar": false,
    },
    touch,
  );
  const [places, flipPlace] = useFlags(
    {
      "City of Kigali": true,
      "Northern Province": false,
      "Southern Province": false,
      "Eastern Province": false,
      "Western Province": false,
      "Nationwide / remote delivery": true,
    },
    touch,
  );
  const [methods, flipMethod] = useFlags(
    { "Request for quotations": true, "Open national": true, "Open international": false },
    touch,
  );
  const [ch, flipCh] = useFlags({ email: true, sms: true }, touch);
  const [w, flipW] = useFlags({ amend: true, qa: true, open: true, award: true }, touch);
  const [rem, flipRem] = useFlags(
    { "7 days before": true, "3 days before": true, "24 hours before": true, "2 hours before": false },
    touch,
  );
  const [keywords, setKeywords] = useState(["website", "mobile app", "data platform", "laptops"]);
  const [kw, setKw] = useState("");
  const [max, setMax] = useState("50");
  const [mode, setMode] = useState<Mode>("batch");
  const [n, setN] = useState(3);
  const [urgent, setUrgent] = useState(true);

  const addKeyword = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && kw.trim()) {
      e.preventDefault();
      if (!keywords.includes(kw.trim())) setKeywords([...keywords, kw.trim()]);
      setKw("");
      touch();
    } else if (e.key === "Backspace" && !kw && keywords.length) {
      setKeywords(keywords.slice(0, -1));
      touch();
    }
  };

  const topicList = Object.entries(topics).filter(([, v]) => v).map(([k]) => k);
  const placeList = Object.entries(places).filter(([, v]) => v).map(([k]) => k);
  const chans = [ch.email ? "email" : null, ch.sms ? "text" : null].filter(Boolean);
  const how = chans.length ? `${chans.join(" and ")} you` : "notify you in the dashboard";
  const when =
    mode === "instant"
      ? "as soon as a tender matches"
      : mode === "batch"
        ? `when ${n} new tenders match`
        : mode === "daily"
          ? "every morning with new matches"
          : "every Monday with new matches";
  const value = max === "1000" ? "of any value" : `worth up to RWF ${max}M`;
  const what = `${topicList.length ? topicList.join(" or ") : "any topic"}, in ${placeList.length ? placeList.join(" or ") : "any location"}, ${value}`;
  const estimate =
    mode === "instant" ? 23 : mode === "batch" ? Math.ceil(23 / n) + (urgent ? 4 : 0) : mode === "daily" ? 19 : 4 + (urgent ? 4 : 0);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
      <div style={{ flex: "999 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* What you sell */}
        <section className="app-panel" aria-labelledby="sell-h" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="app-panel-h" style={{ margin: 0 }}>
            <h2 id="sell-h">1 · What you sell</h2>
          </div>
          <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
            <legend className="uc-label" style={{ marginBottom: 10 }}>
              Topics
            </legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Object.entries(topics).map(([k, v]) => (
                <Chip key={k} selected={v} onClick={() => flipTopic(k as keyof typeof topics)}>
                  {k}
                </Chip>
              ))}
            </div>
          </fieldset>
          <div className="uc-field">
            <label className="uc-label" htmlFor="kw">
              Keywords
            </label>
            <div
              className="uc-input"
              style={{ height: "auto", minHeight: 48, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", padding: "8px 12px" }}
            >
              {keywords.map((k) => (
                <button
                  key={k}
                  type="button"
                  className="app-match"
                  style={{ border: 0, cursor: "pointer" }}
                  onClick={() => {
                    setKeywords(keywords.filter((x) => x !== k));
                    touch();
                  }}
                  aria-label={`Remove keyword ${k}`}
                >
                  {k} <Icon name="x" size={12} strokeWidth={2.4} />
                </button>
              ))}
              <input
                id="kw"
                placeholder="Add a keyword"
                value={kw}
                onChange={(e) => setKw(e.target.value)}
                onKeyDown={addKeyword}
                aria-describedby="kw-hint"
                style={{ border: 0, outline: 0, font: "inherit", flex: 1, minWidth: 120, background: "transparent", color: "var(--ink)" }}
              />
            </div>
            <span id="kw-hint" className="ob-hint">
              Press Enter to add. We also look for these words in tender titles and documents.
            </span>
          </div>
          <div className="ob-grid">
            <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
              <legend className="uc-label" style={{ marginBottom: 6 }}>
                Where you can deliver
              </legend>
              {Object.entries(places).map(([k, v]) => (
                <label key={k} className="pg-check">
                  <input type="checkbox" checked={v} onChange={() => flipPlace(k as keyof typeof places)} />
                  <span>{k}</span>
                </label>
              ))}
            </fieldset>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="uc-field">
                <label className="uc-label" htmlFor="vmax">
                  Estimated value up to
                </label>
                <div className="uc-select-wrap">
                  <select
                    id="vmax"
                    className="uc-select"
                    value={max}
                    onChange={(e) => {
                      setMax(e.target.value);
                      touch();
                    }}
                  >
                    {MAX_OPTS.map((v) => (
                      <option key={v} value={v}>
                        {v === "1000" ? "Any value" : `RWF ${v} million`}
                      </option>
                    ))}
                  </select>
                  <Icon name="chevron-down" size={18} />
                </div>
              </div>
              <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
                <legend className="uc-label" style={{ marginBottom: 6 }}>
                  Procurement methods
                </legend>
                {Object.entries(methods).map(([k, v]) => (
                  <label key={k} className="pg-check">
                    <input type="checkbox" checked={v} onChange={() => flipMethod(k as keyof typeof methods)} />
                    <span>{k}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          </div>
        </section>

        {/* When */}
        <section className="app-panel" aria-labelledby="when-h" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="app-panel-h" style={{ margin: 0 }}>
            <h2 id="when-h">2 · When to notify me</h2>
          </div>
          <fieldset style={{ border: 0, margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
            <legend className="uc-sr">Alert timing</legend>
            {MODES.map(([key, title, note]) => (
              <div key={key} className="pref-mode" data-on={mode === key}>
                <input
                  id={`mode-${key}`}
                  type="radio"
                  name="mode"
                  checked={mode === key}
                  onChange={() => {
                    setMode(key);
                    touch();
                  }}
                  style={{ width: 20, height: 20, margin: "2px 0 0", accentColor: "var(--navy)", flex: "none" }}
                />
                <span style={{ flex: 1 }}>
                  <label htmlFor={`mode-${key}`} style={{ cursor: "pointer", display: "block" }}>
                    <strong style={{ display: "block", fontSize: 15 }}>{title}</strong>
                    <span style={{ fontSize: 14, color: "var(--ink-muted)" }}>{note}</span>
                  </label>
                  {mode === key && key === "batch" ? (
                    <span style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginTop: 12 }}>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>Notify me when</span>
                      <button
                        type="button"
                        className="uc-btn uc-btn-secondary uc-btn-sm uc-iconbtn"
                        onClick={() => {
                          setN(Math.max(2, n - 1));
                          touch();
                        }}
                        aria-label="Fewer"
                      >
                        −
                      </button>
                      <output
                        aria-live="polite"
                        style={{
                          minWidth: 44,
                          height: 36,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: 8,
                          background: "var(--navy)",
                          color: "var(--on-navy)",
                          font: "600 18px/1 var(--font-mono)",
                        }}
                      >
                        {n}
                      </output>
                      <button
                        type="button"
                        className="uc-btn uc-btn-secondary uc-btn-sm uc-iconbtn"
                        onClick={() => {
                          setN(Math.min(10, n + 1));
                          touch();
                        }}
                        aria-label="More"
                      >
                        +
                      </button>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>new tenders match</span>
                    </span>
                  ) : null}
                </span>
              </div>
            ))}
          </fieldset>
          <div style={{ borderTop: "1px solid var(--line)", paddingTop: 2 }}>
            <Toggle
              title="Don’t wait for urgent tenders"
              note="Alert me straight away when a match closes in 7 days or less."
              on={urgent}
              onChange={() => {
                setUrgent(!urgent);
                touch();
              }}
            />
          </div>
        </section>

        {/* Channels */}
        <section className="app-panel" aria-labelledby="ch-h">
          <div className="app-panel-h">
            <h2 id="ch-h">3 · How to reach me</h2>
          </div>
          <Toggle title="Email" note="tenders@ikazelabs.rw" on={ch.email} onChange={() => flipCh("email")} />
          <Toggle title="SMS" note="+250 788 000 412 · never between 21:00 and 07:00" on={ch.sms} onChange={() => flipCh("sms")} />
          <Toggle title="In the dashboard" note="Always on — the bell at the top of every page" on disabled />
        </section>

        {/* Watched */}
        <section className="app-panel" aria-labelledby="wt-h">
          <div className="app-panel-h">
            <h2 id="wt-h">4 · Tenders I watch and bid on</h2>
          </div>
          <Toggle title="Amendments" note="A watched tender’s dates, documents or requirements change" on={w.amend} onChange={() => flipW("amend")} />
          <Toggle title="Questions answered" note="The buyer publishes answers to clarification questions" on={w.qa} onChange={() => flipW("qa")} />
          <Toggle title="Bid opening report" note="Published right after the deadline" on={w.open} onChange={() => flipW("open")} />
          <Toggle title="Award decision" note="Who won, for how much — and whether it was you" on={w.award} onChange={() => flipW("award")} />
          <fieldset style={{ border: 0, margin: "12px 0 0", padding: "14px 0 0", borderTop: "1px solid var(--line)" }}>
            <legend className="uc-label" style={{ paddingTop: 14 }}>
              Deadline reminders
            </legend>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
              {Object.entries(rem).map(([k, v]) => (
                <Chip key={k} selected={v} onClick={() => flipRem(k as keyof typeof rem)}>
                  {k}
                </Chip>
              ))}
            </div>
          </fieldset>
        </section>
      </div>

      {/* Summary */}
      <aside
        aria-labelledby="sum-h"
        className="app-sticky"
        style={{ flex: "1 1 300px", maxWidth: 380, position: "sticky", top: 92, display: "flex", flexDirection: "column", gap: 16 }}
      >
        <div className="uc-on-navy" style={{ background: "var(--navy)", color: "var(--on-navy)", borderRadius: "var(--radius-lg)", padding: 24 }}>
          <h2
            id="sum-h"
            style={{
              margin: "0 0 12px",
              font: "600 13px/16px var(--font-sans)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--on-navy-muted)",
            }}
          >
            Your alert, in plain words
          </h2>
          <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 21, lineHeight: "29px", fontWeight: 600 }} aria-live="polite">
            We’ll {how} {when}: {what}.
          </p>
          <p
            style={{
              margin: "16px 0 0",
              paddingTop: 16,
              borderTop: "1px solid var(--navy-line)",
              fontSize: 14,
              lineHeight: "21px",
              color: "var(--on-navy-muted)",
            }}
          >
            Last month, these settings would have sent you about{" "}
            <strong style={{ color: "var(--sun)", fontFamily: "var(--font-mono)" }}>{estimate}</strong> alerts for 23 matching tenders.
          </p>
        </div>
        <button type="button" className="uc-btn uc-btn-primary uc-btn-lg uc-btn-full" onClick={() => setSaved(true)}>
          Save preferences
        </button>
        <p className="ob-hint" style={{ margin: 0, textAlign: "center" }} aria-live="polite">
          {saved ? "Saved. Your next alert follows these settings." : "Unsaved changes"}
        </p>
      </aside>
    </div>
  );
}
