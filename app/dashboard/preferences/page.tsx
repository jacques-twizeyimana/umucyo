import type { Metadata } from "next";
import { AppShell, PageHead } from "@/components/dashboard/shell";
import { PreferencesForm } from "./preferences-form";

export const metadata: Metadata = { title: "Alerts & preferences" };

export default function PreferencesPage() {
  return (
    <AppShell active="preferences">
      <PageHead
        title="Alerts & preferences"
        sub="Tell us what you sell and how often you want to hear about it. We only alert you about tenders you can act on."
      />
      <PreferencesForm />
    </AppShell>
  );
}
