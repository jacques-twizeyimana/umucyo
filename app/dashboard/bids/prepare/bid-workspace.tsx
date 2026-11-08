"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, DocumentChecklist, Icon, StatusBadge } from "@/components/umucyo";
import type { RequiredDoc } from "@/lib/data";

const DECLS = [
  "The information and documents in this bid are true and complete.",
  "Ikaze Digital Ltd has no conflict of interest with Rubavu District or its staff in this tender.",
  "Ikaze Digital Ltd is not debarred or suspended from public procurement.",
];

export function BidWorkspace() {
  const router = useRouter();
  const [up, setUp] = useState({ tech: false, form: false });
  const [price, setPrice] = useState("11,800,000");
  const [weeks, setWeeks] = useState("10");
  const [pin, setPin] = useState("");
  const [decl, setDecl] = useState([true, false, false]);
  const [saved, setSaved] = useState(false);

  const docs: RequiredDoc[] = [
    { name: "Certificate of incorporation (RDB)", note: "From your profile", format: "PDF · 1.2 MB", done: true },
    { name: "Tax clearance certificate 2025/26", note: "From your profile · valid until 30 Jun 2027", format: "PDF · 0.9 MB", done: true },
    { name: "Social security clearance", note: "From your profile", format: "PDF · 0.4 MB", done: true },
    { name: "Portfolio: 2 similar websites delivered", note: "Links and client references", format: "PDF · 3.1 MB", done: true },
    { name: "Technical proposal", note: "Approach, team, timeline. Max 15 pages.", format: up.tech ? "PDF · 2.4 MB · just now" : "PDF · max 10 MB", template: "Outline", done: up.tech },
    { name: "Signed quotation form", note: "Use the form in Section IV, signed and stamped.", format: up.form ? "PDF · 0.3 MB · just now" : "PDF · max 10 MB", template: "Form", done: up.form },
  ];
  const docsDone = docs.filter((d) => d.done).length;
  const priceOk = price.replace(/[^0-9]/g, "").length >= 4;
  const weeksOk = Number(weeks) > 0 && Number(weeks) <= 12;
  const declOk = decl.every(Boolean);
  const pinOk = pin.length >= 4;

  const checks = [
    { label: "Documents", meta: `${docsDone}/6`, ok: docsDone === 6 },
    { label: "Price and delivery", meta: priceOk && weeksOk ? "set" : "—", ok: priceOk && weeksOk },
    { label: "Declarations", meta: `${decl.filter(Boolean).length}/3`, ok: declOk },
    { label: "Certificate PIN", meta: pinOk ? "entered" : "—", ok: pinOk },
  ];
  const left = checks.filter((c) => !c.ok).length;
  const ready = left === 0;

  const formatPrice = (v: string) => {
    const digits = v.replace(/[^0-9]/g, "");
    return digits ? Number(digits).toLocaleString("en-US") : "";
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
      <div style={{ flex: "999 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
        <section className="app-panel" aria-labelledby="s1">
          <div className="app-panel-h">
            <h2 id="s1">1 · Documents</h2>
            <span className="uc-ref">{docsDone} of 6 ready</span>
          </div>
          <p style={{ margin: "-4px 0 16px", fontSize: 14, color: "var(--ink-muted)" }}>
            We attached the documents already in your profile. Upload the rest — each must be PDF, max 10 MB.
          </p>
          <DocumentChecklist items={docs} />
          {!up.tech || !up.form ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
              {!up.tech ? (
                <Button size="sm" icon="download" onClick={() => setUp({ ...up, tech: true })}>
                  Upload technical proposal
                </Button>
              ) : null}
              {!up.form ? (
                <Button size="sm" icon="download" onClick={() => setUp({ ...up, form: true })}>
                  Upload quotation form
                </Button>
              ) : null}
            </div>
          ) : null}
        </section>

        <section className="app-panel" aria-labelledby="s2">
          <div className="app-panel-h">
            <h2 id="s2">2 · Price and delivery</h2>
          </div>
          <div className="ob-grid">
            <div className="uc-field">
              <label className="uc-label" htmlFor="price">
                Total bid price (RWF)<span className="ob-req" aria-hidden="true">*</span>
              </label>
              <input
                id="price"
                className="uc-input"
                inputMode="numeric"
                value={price}
                onChange={(e) => setPrice(formatPrice(e.target.value))}
                placeholder="e.g. 11,800,000"
                style={{ fontFamily: "var(--font-mono)", fontSize: 18 }}
              />
              <span className="ob-hint">Including VAT and every cost in the price schedule.</span>
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="weeks">
                Delivery time (weeks)<span className="ob-req" aria-hidden="true">*</span>
              </label>
              <input
                id="weeks"
                className="uc-input"
                inputMode="numeric"
                value={weeks}
                onChange={(e) => setWeeks(e.target.value.replace(/[^0-9]/g, ""))}
                aria-invalid={!weeksOk}
                style={{ fontFamily: "var(--font-mono)", fontSize: 18 }}
              />
              <span className="ob-hint" style={weeksOk ? undefined : { color: "var(--danger)" }}>
                The tender asks for 12 weeks or less.
              </span>
            </div>
            <div className="uc-field span2">
              <span className="uc-label">Bid validity</span>
              <span style={{ fontSize: 15 }}>
                90 days from the submission deadline, until <strong>Sun 21 Feb 2027</strong> — set by the tender.
              </span>
            </div>
          </div>
        </section>

        <section className="app-panel" aria-labelledby="s3">
          <div className="app-panel-h">
            <h2 id="s3">3 · Declarations</h2>
          </div>
          {DECLS.map((text, i) => (
            <label key={i} className="pg-check" style={{ alignItems: "flex-start", padding: "8px 0" }}>
              <input
                type="checkbox"
                checked={decl[i]}
                onChange={() => setDecl(decl.map((v, k) => (k === i ? !v : v)))}
                style={{ marginTop: 2 }}
              />
              <span>{text}</span>
            </label>
          ))}
        </section>

        <section className="app-panel" aria-labelledby="s4">
          <div className="app-panel-h">
            <h2 id="s4">4 · Sign with your digital certificate</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              alignItems: "center",
              padding: 16,
              borderRadius: "var(--radius-md)",
              background: "var(--surface-sunk)",
              marginBottom: 16,
            }}
          >
            <span className="pg-tile-icon">
              <Icon name="lock" size={22} />
            </span>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>Aline Uwase · CEO, Ikaze Digital Ltd</p>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: "var(--ink-muted)" }}>Certificate valid until 14 Mar 2027</p>
            </div>
            <StatusBadge status="open">Valid</StatusBadge>
          </div>
          <div className="uc-field" style={{ maxWidth: 320 }}>
            <label className="uc-label" htmlFor="pin">
              Certificate PIN
            </label>
            <input
              id="pin"
              className="uc-input"
              type="password"
              inputMode="numeric"
              autoComplete="off"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter your PIN"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.3em" }}
            />
          </div>
        </section>
      </div>

      <aside aria-labelledby="ready-h" className="app-sticky" style={{ flex: "1 1 300px", maxWidth: 360, position: "sticky", top: 92 }}>
        <div className="uc-panel">
          <div className="uc-panel-head uc-on-navy">
            <span className="uc-deadline-label">Submission closes</span>
            <p className="uc-panel-date">Mon 23 Nov 2026, 16:00 CAT</p>
            <div className="uc-panel-count" role="timer" aria-label="15 days 3 hours left">
              <div>
                <span className="uc-panel-fig">15</span>
                <span className="uc-panel-unit">days</span>
              </div>
              <div>
                <span className="uc-panel-fig">03</span>
                <span className="uc-panel-unit">hours</span>
              </div>
            </div>
          </div>
          <div className="uc-panel-body">
            <h2 id="ready-h" style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>
              Ready to submit?
            </h2>
            <ul style={{ listStyle: "none", margin: "0 0 12px", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {checks.map((c) => (
                <li key={c.label} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14 }}>
                  <span className={`chk ${c.ok ? "chk-ok" : "chk-no"}`} aria-hidden="true">
                    {c.ok ? "✓" : ""}
                  </span>
                  <span style={{ flex: 1 }}>
                    {c.label}
                    <span className="uc-sr">{c.ok ? " — done" : " — to do"}</span>
                  </span>
                  <span style={{ font: "600 12px/1 var(--font-mono)", color: "var(--ink-muted)" }}>{c.meta}</span>
                </li>
              ))}
            </ul>
            {ready ? (
              <Button variant="primary" size="lg" full iconRight="arrow-right" href="/dashboard/bids/submitted?celebrate">
                Sign and submit bid
              </Button>
            ) : (
              <>
                <Button variant="primary" size="lg" full disabled>
                  Sign and submit bid
                </Button>
                <p className="ob-hint" style={{ margin: "4px 0 0", textAlign: "center" }} aria-live="polite">
                  {left === 1 ? "1 step left" : `${left} steps left`}
                </p>
              </>
            )}
            <Button
              variant="ghost"
              full
              onClick={() => {
                setSaved(true);
                router.push("/dashboard/bids");
              }}
            >
              {saved ? "Saved" : "Save draft and exit"}
            </Button>
          </div>
          <div className="uc-panel-foot">
            <Icon name="info" size={18} />
            <span>Your bid is encrypted until the opening. You can replace or withdraw it until the deadline. Help: call 3131.</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
