import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Breadcrumbs, GovBanner, Icon, Logo, StatusBadge, type IconName } from "@/components/umucyo";
import { DashSearch } from "./dash-search";

export type DashSection = "overview" | "recommended" | "watchlist" | "bids" | "preferences" | "profile" | "documents";

const NAV: [DashSection, string, IconName, string, number | null][] = [
  ["overview", "Overview", "globe", "/dashboard", null],
  ["recommended", "Recommended", "search", "/dashboard/recommended", 23],
  ["watchlist", "Watchlist", "bookmark", "/dashboard/watchlist", 6],
  ["bids", "My bids", "file", "/dashboard/bids", 5],
  ["preferences", "Alerts & preferences", "clock", "/dashboard/preferences", null],
  ["profile", "Business profile", "building", "/register/business", null],
  ["documents", "Documents", "shield", "/register/business/documents", null],
];

function AppNav({ active }: { active: DashSection }) {
  return (
    <aside className="app-nav" aria-label="Dashboard">
      <div style={{ padding: "0 8px" }}>
        <Logo size={36} subtitle="Supplier dashboard" />
      </div>
      <nav aria-label="Dashboard sections">
        <ul>
          {NAV.map(([key, label, icon, href, count]) => (
            <li key={key}>
              <Link href={href} className="app-nav-link" aria-current={key === active ? "page" : undefined}>
                <Icon name={icon} size={20} />
                <span style={{ flex: 1 }}>{label}</span>
                {count != null ? (
                  <span className="app-nav-count">
                    {count}
                    <span className="uc-sr"> items</span>
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="app-nav-foot" style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ padding: 14, border: "1px solid var(--line)", borderRadius: "var(--radius-md)", background: "var(--surface-sunk)" }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: 14 }}>Ikaze Digital Ltd</p>
          <p style={{ margin: "2px 0 10px", fontSize: 13, color: "var(--ink-muted)" }}>Aline Uwase · CEO</p>
          <StatusBadge status="open">Verified supplier</StatusBadge>
        </div>
        <a
          href="tel:3131"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            borderRadius: "var(--radius-sm)",
            color: "var(--ink)",
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          <Icon name="phone" size={18} />
          Help: call <strong style={{ fontFamily: "var(--font-mono)" }}>3131</strong>
        </a>
      </div>
    </aside>
  );
}

function TopBar({ crumbs, right }: { crumbs?: { label: string; href?: string }[]; right?: ReactNode }) {
  return (
    <div className="app-top">
      {crumbs ? <Breadcrumbs items={crumbs} /> : <DashSearch />}
      <div style={{ marginLeft: "auto", display: "flex", gap: 12, alignItems: "center" }}>
        {right}
        {crumbs ? null : (
          <Link href="/dashboard/preferences" className="uc-btn uc-btn-ghost uc-iconbtn app-bell" aria-label="Notifications, 4 new">
            <Icon name="bell" size={22} />
            <span className="app-bell-dot" aria-hidden="true">
              4
            </span>
          </Link>
        )}
        <span className="app-avatar" role="img" aria-label="Aline Uwase">
          AU
        </span>
      </div>
    </div>
  );
}

/** Supplier dashboard frame: government banner, sidebar, top bar and body. */
export function AppShell({
  active,
  crumbs,
  topRight,
  bodyStyle,
  children,
}: {
  active: DashSection;
  crumbs?: { label: string; href?: string }[];
  topRight?: ReactNode;
  bodyStyle?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className="uc pg" style={{ background: "var(--surface-sunk)", minHeight: "100vh" }}>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <GovBanner />
      <div className="app">
        <AppNav active={active} />
        <div className="app-main">
          <TopBar crumbs={crumbs} right={topRight} />
          <main id="main" className="app-body" style={bodyStyle}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export function PageHead({ title, sub, action }: { title: string; sub?: ReactNode; action?: ReactNode }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
      <div>
        <h1 className="app-h1">{title}</h1>
        {sub ? <p style={{ margin: "6px 0 0", color: "var(--ink-muted)" }}>{sub}</p> : null}
      </div>
      {action}
    </div>
  );
}
