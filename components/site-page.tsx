import type { ReactNode } from "react";
import { SiteFooter, SiteHeader, type NavItem } from "@/components/umucyo";

/** Public page frame: government banner (required on every page), header, content, footer. */
export function SitePage({
  active,
  children,
}: {
  active?: NavItem;
  children: ReactNode;
}) {
  return (
    <div className="uc pg">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      {/* <GovBanner /> */}
      <SiteHeader active={active} />
      {children}
      <SiteFooter />
    </div>
  );
}
