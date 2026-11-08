import type { Metadata } from "next";
import { SitePage } from "@/components/site-page";
import { Breadcrumbs, Button } from "@/components/umucyo";
import { AwardsBrowser } from "./awards-browser";

export const metadata: Metadata = {
  title: "Plans & awards",
  description:
    "Every contract awarded through Umucyo: what was bought, who won, how many bids there were and the contract value.",
};

export default function AwardsPage() {
  return (
    <SitePage active="Plans & awards">
      <main id="main">
        <section style={{ background: "var(--surface-sunk)", borderBottom: "1px solid var(--line)", padding: "24px 0 80px" }}>
          <div className="uc-container">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Plans & awards" }, { label: "Awarded contracts" }]} />
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginTop: 24 }}>
              <div style={{ maxWidth: 720 }}>
                <p className="uc-eyebrow">Follow the money</p>
                <h1 className="uc-h1">Where public money goes</h1>
                <p className="uc-lead" style={{ marginTop: 12 }}>
                  Every contract awarded through Umucyo: what was bought, who won, how many bids there were and the contract
                  value. Free to search, download and reuse.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <Button variant="secondary" icon="download">
                  CSV
                </Button>
                <Button variant="secondary" icon="download">
                  JSON
                </Button>
                <Button variant="ghost" iconRight="external" href="#data">
                  API docs
                </Button>
              </div>
            </div>
          </div>
        </section>
        <AwardsBrowser />
      </main>
    </SitePage>
  );
}
