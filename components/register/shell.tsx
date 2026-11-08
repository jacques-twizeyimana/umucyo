import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/umucyo";

const BUSINESS_STEPS: [string, string][] = [
  ["Account type", "Business or individual"],
  ["Business details", "Legal name, TIN, structure, address"],
  ["Documents", "RDB registration, tax clearance"],
  ["Contact & representative", "Who we contact, who signs"],
  ["Verify", "Codes sent to your email and phone"],
  ["Done", "Start browsing tenders"],
];

const INDIVIDUAL_STEPS: [string, string][] = [
  ["Account type", "Business or individual"],
  ["Your details", "Names, TIN, tax clearance, contact"],
  ["Verify", "Codes sent to your email and phone"],
  ["Done", "Start browsing tenders"],
];

export function OnbSteps({
  type = "business",
  step,
}: {
  type?: "business" | "individual";
  step: number;
}) {
  const defs = type === "individual" ? INDIVIDUAL_STEPS : BUSINESS_STEPS;
  return (
    <nav
      aria-label="Registration steps"
      style={{ width: "100%", maxWidth: 300 }}
    >
      <p
        style={{
          margin: "0 0 4px",
          font: "600 13px/16px var(--font-sans)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--ink-muted)",
        }}
      >
        {type === "individual"
          ? "Register as an individual"
          : "Register your business"}
      </p>
      <p
        style={{ margin: "0 0 24px", fontSize: 14, color: "var(--ink-muted)" }}
      >
        Step {step} of {defs.length} · about {type === "individual" ? 5 : 10}{" "}
        minutes
      </p>
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {defs.map(([label, hint], i) => {
          const n = i + 1;
          const done = n < step;
          const now = n === step;
          return (
            <li
              key={label}
              aria-current={now ? "step" : undefined}
              style={{
                display: "grid",
                gridTemplateColumns: "32px 1fr",
                gap: 14,
                position: "relative",
                paddingBottom: 24,
              }}
            >
              <span
                aria-hidden="true"
                className={`ob-dot ${done ? "ob-dot-done" : now ? "ob-dot-now" : "ob-dot-todo"}`}
              >
                {done ? "✓" : n}
              </span>
              <span style={{ paddingTop: 5 }}>
                <span
                  style={{
                    display: "block",
                    fontSize: 15,
                    lineHeight: "22px",
                    fontWeight: now ? 700 : 500,
                    color: now || done ? "var(--ink)" : "var(--ink-muted)",
                  }}
                >
                  {label}
                  {done ? <span className="uc-sr"> (completed)</span> : null}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    lineHeight: "18px",
                    color: "var(--ink-muted)",
                    marginTop: 2,
                  }}
                >
                  {hint}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
      <div
        style={{
          marginTop: 8,
          padding: 16,
          borderRadius: "var(--radius-md)",
          background: "var(--surface-sunk)",
          fontSize: 14,
          lineHeight: "20px",
          color: "var(--ink-muted)",
        }}
      >
        <strong
          style={{ color: "var(--ink)", display: "block", marginBottom: 4 }}
        >
          Your progress is saved
        </strong>
        Come back any time with the link we email you. Stuck? Call{" "}
        <strong style={{ color: "var(--ink)" }}>3131</strong>.
      </div>
    </nav>
  );
}

/** Registration frame: government banner, a slim header and the sunk page ground. */
export function RegShell({
  signedInAs,
  headerRight,
  children,
}: {
  signedInAs?: string;
  /** Replaces the default "Already registered? Sign in" line. */
  headerRight?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className="uc pg"
      style={{ background: "var(--surface-sunk)", minHeight: "100vh" }}
    >
      {/* <GovBanner /> */}
      <header
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          className="uc-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            minHeight: 72,
          }}
        >
          <Logo />
          {headerRight ? (
            headerRight
          ) : signedInAs ? (
            <p style={{ margin: 0, fontSize: 15 }}>
              Signed in as <strong>{signedInAs}</strong>
            </p>
          ) : (
            <p style={{ margin: 0, fontSize: 15 }}>
              Already registered?{" "}
              <Link href="/sign-in" style={{ fontWeight: 600 }}>
                Sign in
              </Link>
            </p>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}

/** Two-column onboarding layout: steps on the side, the form in the main column. */
export function RegLayout({
  type,
  step,
  title,
  lead,
  children,
}: {
  type: "business" | "individual";
  step: number;
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <RegShell>
      <main id="main" className="uc-container ob-shell">
        <div className="ob-side">
          <OnbSteps type={type} step={step} />
        </div>
        <div
          className="ob-main"
          style={{ display: "flex", flexDirection: "column", gap: 24 }}
        >
          <div>
            <h1 className="uc-h1">{title}</h1>
            <p className="uc-lead" style={{ marginTop: 8 }}>
              {lead}
            </p>
          </div>
          {children}
        </div>
      </main>
    </RegShell>
  );
}

export function Req() {
  return (
    <>
      <span className="ob-req" aria-hidden="true">
        *
      </span>
      <span className="uc-sr"> (required)</span>
    </>
  );
}
