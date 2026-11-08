"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./button";
import { Logo } from "./logo";

export type NavItem = "Find tenders" | "Plans & awards" | "For suppliers" | "For public entities" | "Help";

const NAV: [NavItem, string][] = [
  ["Find tenders", "/tenders"],
  ["Plans & awards", "/awards"],
  ["For suppliers", "/how-to-bid"],
  ["For public entities", "/legal-framework"],
  ["Help", "/how-to-bid#faq"],
];

export function SiteHeader({ active }: { active?: NavItem }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="uc-header">
      <div className="uc-container uc-header-in">
        <Logo />
        <nav className="uc-nav" aria-label="Main">
          {NAV.map(([label, href]) => (
            <Link key={label} href={href} aria-current={label === active ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="uc-header-actions">
          <Button variant="ghost" size="sm" icon="lock" href="/dashboard">
            Sign in
          </Button>
          <Button variant="secondary" size="sm" href="/register">
            Register your business
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            icon={open ? "x" : "menu"}
            className="uc-menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          />
        </div>
      </div>
      <nav id="mobile-nav" className="uc-mobile-nav" data-open={open} aria-label="Main (mobile)">
        <ul>
          {NAV.map(([label, href]) => (
            <li key={label}>
              <Link href={href} aria-current={label === active ? "page" : undefined} onClick={() => setOpen(false)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ padding: "0 20px 20px" }}>
          <Button variant="secondary" href="/register">
            Register your business
          </Button>
        </div>
      </nav>
    </header>
  );
}
