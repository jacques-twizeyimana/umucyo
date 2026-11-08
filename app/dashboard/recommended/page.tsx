import type { Metadata } from "next";
import { AppShell, PageHead } from "@/components/dashboard/shell";
import { Button } from "@/components/umucyo";
import { RecommendedView } from "./recommended-view";

export const metadata: Metadata = { title: "Recommended for you" };

export default function RecommendedPage() {
  return (
    <AppShell active="recommended" bodyStyle={{ maxWidth: "none" }}>
      <PageHead
        title="Recommended for you"
        sub={
          <>
            <strong style={{ color: "var(--ink)" }}>23 open tenders</strong> match your preferences: ICT &amp; digital, Data &amp;
            analytics · Kigali + nationwide · under RWF 50M
          </>
        }
        action={<Button href="/dashboard/preferences">Edit preferences</Button>}
      />
      <RecommendedView />
    </AppShell>
  );
}
