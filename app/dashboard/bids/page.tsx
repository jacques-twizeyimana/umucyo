import type { Metadata } from "next";
import { AppShell, PageHead } from "@/components/dashboard/shell";
import { BidsList } from "./bids-list";

export const metadata: Metadata = { title: "My bids" };

export default function BidsPage() {
  return (
    <AppShell active="bids">
      <PageHead
        title="My bids"
        sub="Every bid from first draft to final decision. Submitted bids stay editable until the deadline."
      />
      <BidsList />
    </AppShell>
  );
}
