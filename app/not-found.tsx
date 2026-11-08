import { SitePage } from "@/components/site-page";
import { Button } from "@/components/umucyo";

export default function NotFound() {
  return (
    <SitePage>
      <main id="main" className="uc-container" style={{ padding: "96px 32px", maxWidth: 720 }}>
        <p className="uc-eyebrow">Page not found</p>
        <h1 className="uc-h1">We couldn’t find that page.</h1>
        <p className="uc-lead" style={{ margin: "16px 0 32px" }}>
          The tender may have been withdrawn, or the link may be wrong. Search all open tenders, or call 3131 for help.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <Button variant="primary" size="lg" icon="search" href="/tenders">
            Find tenders
          </Button>
          <Button size="lg" href="/">
            Go to the homepage
          </Button>
        </div>
      </main>
    </SitePage>
  );
}
