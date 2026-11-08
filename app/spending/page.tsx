import type { Metadata } from "next";
import { Suspense } from "react";
import { SitePage } from "@/components/site-page";
import { SpendingRecord } from "./spending-record";

export const metadata: Metadata = {
  title: "Where the money went",
  description:
    "The public spending record: every contract paid for with public money, which public body bought it, which company was paid, how many bids competed and what it cost.",
};

export default function SpendingPage() {
  return (
    <SitePage>
      <main id="main">
        <Suspense fallback={<div className="uc-container" style={{ minHeight: 900 }} aria-busy="true" />}>
          <SpendingRecord />
        </Suspense>
      </main>
    </SitePage>
  );
}
