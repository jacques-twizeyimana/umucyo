import type { Metadata } from "next";
import Link from "next/link";
import { RegShell } from "@/components/register/shell";
import { Button, Icon, StatusBadge, type BadgeStatus, type IconName } from "@/components/umucyo";

export const metadata: Metadata = { title: "Account created" };

const STATUS: { title: string; note: string; icon: IconName; tone: "ok" | "wait" | "todo"; badge: BadgeStatus; label: string }[] = [
  { title: "Email verified", note: "tenders@ikazelabs.rw", icon: "check", tone: "ok", badge: "open", label: "Done" },
  { title: "Phone verified", note: "+250 788 000 412", icon: "check", tone: "ok", badge: "open", label: "Done" },
  { title: "Documents", note: "RDB registration and tax clearance 2025/26 are being checked by RPPA.", icon: "clock", tone: "wait", badge: "neutral", label: "In review" },
  { title: "Digital certificate", note: "Needed to sign bids. Apply at govca.rw.", icon: "lock", tone: "todo", badge: "closed", label: "Not yet" },
  { title: "Tender alerts", note: "Tell us what you sell to get matching tenders.", icon: "bookmark", tone: "todo", badge: "closed", label: "Not set" },
];

const NEXT: { href: string; icon: IconName; title: string; text: string }[] = [
  { href: "/dashboard/preferences", icon: "bookmark", title: "Tell us what you sell", text: "Pick categories, places and values. We alert you when matching tenders appear." },
  { href: "/dashboard/recommended", icon: "search", title: "See 23 tenders that fit you", text: "Based on your business activity: software and IT services, Kigali." },
  { href: "/how-to-bid#journey", icon: "lock", title: "Get your digital certificate", text: "Apply at govca.rw for Aline Uwase. You need it to sign and submit bids." },
];

export default function RegisterDonePage() {
  return (
    <RegShell signedInAs="tenders@ikazelabs.rw">
      <main
        id="main"
        className="uc-container"
        style={{ paddingTop: 48, paddingBottom: 72, display: "flex", flexDirection: "column", gap: 32, maxWidth: 960 }}
      >
        <section className="uc-on-navy done-hero">
          <div aria-hidden="true" className="done-hero-sun" />
          <div style={{ position: "relative", maxWidth: 560 }}>
            <p className="uc-eyebrow" style={{ color: "var(--on-navy-muted)" }}>
              Account created
            </p>
            <h1 className="done-title">Welcome, Ikaze Labs. You’re in.</h1>
            <p style={{ margin: "16px 0 28px", fontSize: 17, lineHeight: "26px", color: "var(--on-navy-muted)" }}>
              You can browse, watch tenders and set alerts right now. Bidding unlocks once RPPA has checked your documents —
              we’ll email and text you.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button variant="accent" size="lg" href="/dashboard/preferences">
                Set up my tender alerts
              </Button>
              <Button variant="inverse" size="lg" href="/dashboard">
                Go to my dashboard
              </Button>
            </div>
          </div>
        </section>

        <section className="app-panel" aria-labelledby="st-h">
          <div className="app-panel-h" style={{ flexWrap: "wrap" }}>
            <h2 id="st-h">Your account status</h2>
            <span className="uc-ref">Supplier ID SUP-2026-048213</span>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {STATUS.map((s) => (
              <li key={s.title} className="app-row">
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span className={`st-disc st-${s.tone}`}>
                    <Icon name={s.icon} size={20} />
                  </span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>{s.title}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 14, color: "var(--ink-muted)" }}>{s.note}</p>
                  </div>
                </div>
                <StatusBadge status={s.badge}>{s.label}</StatusBadge>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="next-h">
          <h2 id="next-h" className="uc-h2">
            While you wait
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: 20 }}>
            {NEXT.map((n) => (
              <Link key={n.title} className="pg-tile" href={n.href}>
                <span className="pg-tile-icon">
                  <Icon name={n.icon} size={22} />
                </span>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: 19 }}>{n.title}</strong>
                <span style={{ fontSize: 15, color: "var(--ink-muted)" }}>{n.text}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </RegShell>
  );
}
