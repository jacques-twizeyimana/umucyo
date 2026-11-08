import type { Metadata } from "next";
import { AppShell, PageHead } from "@/components/dashboard/shell";
import { Button, Notice } from "@/components/umucyo";
import { WatchlistTable } from "./watchlist-table";

export const metadata: Metadata = { title: "Watchlist" };

export default function WatchlistPage() {
  return (
    <AppShell active="watchlist">
      <PageHead
        title="Watchlist"
        sub="Tenders you’re following. We tell you about every amendment, answer and deadline."
        action={
          <Button icon="clock" href="/dashboard/preferences">
            Reminder settings
          </Button>
        }
      />
      <WatchlistTable />
      <Notice tone="info" title="Watch from anywhere">
        Tap “Watch” on any tender card, search result or tender page. Watched tenders also feed your deadline reminders.
      </Notice>
    </AppShell>
  );
}
