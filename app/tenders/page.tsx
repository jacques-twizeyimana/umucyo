import type { Metadata } from "next";
import { Suspense } from "react";
import { SitePage } from "@/components/site-page";
import { TenderSearch } from "./tender-search";

export const metadata: Metadata = {
  title: "Find tenders",
  description: "Search everything public entities in Rwanda are buying right now.",
};

export default function TendersPage() {
  return (
    <SitePage active="Find tenders">
      <main id="main">
        <Suspense fallback={<div className="uc-container" style={{ minHeight: 800 }} aria-busy="true" />}>
          <TenderSearch />
        </Suspense>
      </main>
    </SitePage>
  );
}
