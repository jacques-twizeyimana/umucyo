import type { Metadata } from "next";
import Link from "next/link";
import { RegShell } from "@/components/register/shell";
import { Icon, type IconName } from "@/components/umucyo";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Umucyo supplier account to track your bids, watched tenders and alerts.",
};

const WAITING: { icon: IconName; title: string; text: string }[] = [
  { icon: "file", title: "Your bids and receipts", text: "Drafts, submitted bids and every stage from opening to decision." },
  { icon: "bookmark", title: "Tenders you watch", text: "Amendments, new answers and site visits, as soon as they’re published." },
  { icon: "clock", title: "Alerts and deadlines", text: "New matches for what you sell, and reminders before each deadline." },
];

export default function SignInPage() {
  return (
    <RegShell
      headerRight={
        <p style={{ margin: 0, fontSize: 15 }}>
          New to Umucyo?{" "}
          <Link href="/register" style={{ fontWeight: 600 }}>
            Register
          </Link>
        </p>
      }
    >
      <main id="main" className="uc-container si-shell">
        <SignInForm />

        <aside className="uc-on-navy si-aside" aria-labelledby="si-aside-h">
          <div aria-hidden="true" className="si-aside-sun" />
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <p className="uc-eyebrow" style={{ color: "var(--on-navy-muted)" }}>
                Waiting for you
              </p>
              <h2 id="si-aside-h" className="si-aside-title">
                Pick up where you left off.
              </h2>
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 18 }}>
              {WAITING.map((w) => (
                <li key={w.title} style={{ display: "grid", gridTemplateColumns: "40px 1fr", gap: 14, alignItems: "start" }}>
                  <span className="si-aside-icon">
                    <Icon name={w.icon} size={20} />
                  </span>
                  <span>
                    <strong style={{ display: "block", fontSize: 16, lineHeight: "22px" }}>{w.title}</strong>
                    <span style={{ fontSize: 14, lineHeight: "21px", color: "var(--on-navy-muted)" }}>{w.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="si-aside-foot">
              <Icon name="lock" size={18} />
              <span>
                Submitting a bid also needs a valid digital certificate from govca.rw to sign it.{" "}
                <Link href="/how-to-bid#journey">How to get one</Link>
              </span>
            </p>
            <a className="uc-footer-call" href="tel:3131" style={{ alignSelf: "flex-start", marginTop: 0 }}>
              <Icon name="phone" size={16} />
              Can’t sign in? Call <strong>3131</strong>
            </a>
          </div>
        </aside>
      </main>
    </RegShell>
  );
}
