import type { Metadata } from "next";
import { AppShell } from "@/components/dashboard/shell";
import { Button, StatusBadge } from "@/components/umucyo";
import { BidWorkspace } from "./bid-workspace";

export const metadata: Metadata = { title: "Prepare your bid" };

export default function PrepareBidPage() {
  return (
    <AppShell
      active="bids"
      crumbs={[{ label: "My bids", href: "/dashboard/bids" }, { label: "Drafts", href: "/dashboard/bids" }, { label: "Rubavu website" }]}
      topRight={<span className="ob-hint pg-hide-sm">Draft saved 2 minutes ago</span>}
    >
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <StatusBadge status="neutral">Draft bid</StatusBadge>
            <span className="uc-ref">RW-RUB-2026-0211</span>
          </div>
          <h1 className="app-h1">Website redesign and hosting for Rubavu District</h1>
          <p style={{ margin: "6px 0 0", color: "var(--ink-muted)" }}>
            Rubavu District · Request for quotations · Bidding as Ikaze Digital Ltd
          </p>
        </div>
        <Button variant="ghost" icon="external" href="/tenders/RW-RUB-2026-0211">
          Open tender
        </Button>
      </div>
      <BidWorkspace />
    </AppShell>
  );
}
