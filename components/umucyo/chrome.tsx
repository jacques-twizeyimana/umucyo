import type { ReactNode } from "react";
import { Breadcrumbs } from "./blocks";
import { SmartLink } from "./button";
import { Icon } from "./icon";
import { Logo } from "./logo";

/* ---------------- Flag of Rwanda (drawn, so it renders on every platform) ---------------- */
function Flag() {
  const rays = Array.from({ length: 24 }, (_, i) => {
    const a = (i * Math.PI) / 12;
    const r1 = 2.1;
    const r2 = 3.4;
    const x = 22.5;
    const y = 4.6;
    const w = Math.PI / 24;
    return `M${x + r1 * Math.cos(a - w)} ${y + r1 * Math.sin(a - w)}L${x + r2 * Math.cos(a)} ${y + r2 * Math.sin(a)}L${x + r1 * Math.cos(a + w)} ${y + r1 * Math.sin(a + w)}Z`;
  }).join("");
  return (
    <span className="uc-gov-flag" role="img" aria-label="Flag of Rwanda">
      <svg width="24" height="16" viewBox="0 0 30 20" aria-hidden="true">
        <rect width="30" height="10" fill="#00a1de" />
        <rect y="10" width="30" height="5" fill="#fad201" />
        <rect y="15" width="30" height="5" fill="#20603d" />
        <path d={rays} fill="#e5be01" />
        <circle cx="22.5" cy="4.6" r="1.9" fill="#00a1de" />
        <circle cx="22.5" cy="4.6" r="1.5" fill="#e5be01" />
      </svg>
    </span>
  );
}

/* ---------------- GovBanner ---------------- */
export function GovBanner({ lang = "EN" }: { lang?: "RW" | "EN" | "FR" }) {
  const langs: [string, string][] = [
    ["RW", "Kinyarwanda"],
    ["EN", "English"],
    ["FR", "Français"],
  ];
  return (
    <div className="uc-gov">
      <div className="uc-container uc-gov-in">
        <div className="uc-gov-id">
          <Flag />
          <span>An official website of the Government of Rwanda</span>
          <SmartLink href="/legal-framework">Here’s how you know</SmartLink>
        </div>
        <div className="uc-gov-langs" role="group" aria-label="Language">
          {langs.map(([code, name]) => (
            <a
              key={code}
              href="#"
              lang={code.toLowerCase()}
              aria-current={code === lang ? "true" : undefined}
            >
              {name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- SiteFooter ---------------- */
const FOOTER: { title: string; links: [string, string][] }[] = [
  {
    title: "Find work",
    links: [
      ["Search tenders", "/tenders"],
      ["Closing this week", "/tenders?status=closing"],
      // ["Save a search & get alerts", "/dashboard/preferences"],
    ],
  },
  {
    title: "Where the money went",
    links: [
      ["Contract history", "/spending"],
      ["Supplier directory", "/spending?view=suppliers"],
      ["Public entity directory", "/spending?view=entities"],
      ["Open data & API", "/spending#data"],
    ],
  },
  {
    title: "Get started",
    links: [
      ["Register your business", "/register"],
      [
        "Get a digital certificate",
        "https://www.govca.rw/apply/searchIndvdlProductList.sg",
      ],
      ["How to bid", "/how-to-bid"],
      // ["Guides & training", "/how-to-bid#glossary"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Help centre", "/how-to-bid#faq"],
      ["Report fraud or corruption", "/legal-framework#f5"],
      // ["Request a review", "/legal-framework#f5"],
      ["Service status", "/terms#t7"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms of use", "/terms"],
      ["Privacy policy", "/privacy"],
      // ["Cookie settings", "/privacy#p2"],
      ["Legal framework & mandate", "/legal-framework"],
      // ["Accessibility", "/terms#t2"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="uc-footer uc-on-navy">
      <div className="uc-container">
        <div className="uc-footer-grid">
          <div>
            <Logo />
            <p className="uc-footer-help">
              The official portal for public tenders in Rwanda, operated by the
              Rwanda Public Procurement Authority (RPPA).
            </p>
            <a className="uc-footer-call" href="tel:3131">
              <Icon name="phone" size={16} />
              Toll-free help <strong>3131</strong>
            </a>
          </div>
          {FOOTER.map((col) => (
            <div key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <SmartLink href={href}>{label}</SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="uc-footer-base">
          <span>
            © 2026 Rwanda Public Procurement Authority · Governed by Law N°
            031/2022 of 21/11/2022 governing public procurement
          </span>
          <span className="uc-concept">Redesign concept · sample data</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- LegalLayout ---------------- */
export function LegalLayout({
  title,
  eyebrow = "Legal",
  updated,
  version,
  crumbs,
  toc,
  summary,
  children,
}: {
  title: string;
  eyebrow?: string;
  updated?: string;
  version?: string;
  crumbs?: { label: string; href?: string }[];
  toc: { id: string; label: string }[];
  summary?: string[];
  children: ReactNode;
}) {
  return (
    <div className="uc-container uc-legal">
      <nav className="uc-legal-toc" aria-label="On this page">
        <p className="uc-eyebrow">On this page</p>
        <ol>
          {toc.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} aria-current={i === 0 ? "true" : undefined}>
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <article>
        <header className="uc-legal-head">
          {crumbs ? (
            <div style={{ marginBottom: 16 }}>
              <Breadcrumbs items={crumbs} />
            </div>
          ) : null}
          <p className="uc-eyebrow">{eyebrow}</p>
          <h1 className="uc-h1">{title}</h1>
          <div className="uc-legal-meta">
            {updated ? (
              <span>
                Last updated{" "}
                <strong style={{ color: "var(--ink)" }}>{updated}</strong>
              </span>
            ) : null}
            {version ? <span className="uc-ref">{version}</span> : null}
            <a href="#">Download PDF</a>
            <a href="#" lang="rw">
              Soma mu Kinyarwanda
            </a>
            <a href="#" lang="fr">
              Lire en français
            </a>
          </div>
        </header>
        {summary ? (
          <section className="uc-legal-summary" aria-label="Summary">
            <h2>In plain words</h2>
            <ul>
              {summary.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        ) : null}
        <div className="uc-legal-body">{children}</div>
      </article>
    </div>
  );
}
