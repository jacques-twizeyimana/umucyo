import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SitePage } from "@/components/site-page";
import {
  ActionPanel,
  Breadcrumbs,
  Button,
  DocumentChecklist,
  Icon,
  KeyDates,
  Notice,
  StatusBadge,
  TenderCard,
} from "@/components/umucyo";
import {
  TENDERS,
  getTender,
  getTenderDetail,
  tenderStatus,
  toCard,
} from "@/lib/data";
import { timeLeft } from "@/lib/dates";

export function generateStaticParams() {
  return TENDERS.map((t) => ({ ref: t.ref }));
}

export async function generateMetadata({
  params,
}: PageProps<"/tenders/[ref]">): Promise<Metadata> {
  const { ref } = await params;
  const t = getTender(ref);
  if (!t) return { title: "Tender not found" };
  return {
    title: `${t.title} (${t.ref})`,
    description: `${t.entity} · ${t.category} · ${t.budget}`,
  };
}

/** The site chrome is the shared App Shell; everything that depends on the URL streams in behind Suspense. */
export default function TenderPage({ params }: PageProps<"/tenders/[ref]">) {
  return (
    <SitePage active="Find tenders">
      <Suspense fallback={<TenderSkeleton />}>
        <TenderContent params={params} />
      </Suspense>
    </SitePage>
  );
}

function TenderSkeleton() {
  return (
    <div
      className="uc-container"
      aria-busy="true"
      aria-label="Loading tender"
      style={{ padding: "48px 32px", minHeight: 900 }}
    >
      <div
        style={{
          height: 20,
          width: 260,
          borderRadius: 6,
          background: "var(--surface-sunk)",
        }}
      />
      <div
        style={{
          height: 44,
          width: "min(720px, 100%)",
          borderRadius: 8,
          background: "var(--surface-sunk)",
          marginTop: 32,
        }}
      />
      <div
        style={{
          height: 120,
          width: "min(720px, 100%)",
          borderRadius: 12,
          background: "var(--surface-sunk)",
          marginTop: 24,
        }}
      />
    </div>
  );
}

async function TenderContent({
  params,
}: {
  params: PageProps<"/tenders/[ref]">["params"];
}) {
  const { ref } = await params;
  const t = getTender(ref);
  if (!t) notFound();
  const d = getTenderDetail(t);
  const status = tenderStatus(t);
  const left = timeLeft(t.deadline);
  const similar = TENDERS.filter(
    (x) => x.ref !== t.ref && x.category === t.category,
  ).slice(0, 3);

  return (
    <>
      <div className="uc-container">
        <div style={{ paddingTop: 24 }}>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Find tenders", href: "/tenders" },
              {
                label: t.category,
                href: `/tenders?cat=${encodeURIComponent(t.category)}`,
              },
              { label: t.ref },
            ]}
          />
        </div>

        <div className="uc-detail">
          <main id="main">
            {/* Title block */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <StatusBadge status={status === "amended" ? "open" : status} />
              {t.amended ? <StatusBadge status="amended" /> : null}
              <span className="uc-ref">{t.ref}</span>
            </div>
            <h1 className="uc-h1">{t.title}</h1>
            <p
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                margin: "12px 0 0",
                fontSize: 15,
                lineHeight: "22px",
                color: "var(--ink-muted)",
              }}
            >
              <Icon name="building" size={18} />
              <span>
                <a href="#about">{t.entity}</a> · {d.summaryLine}
              </span>
            </p>

            <div className="uc-bid-bar">
              <p>
                <strong>
                  {left.days}d {left.hours}h left to submit
                </strong>
                Submit through Umucyo only
              </p>
              <Button variant="primary" iconRight="arrow-right" href="/dashboard/bids/prepare">
                Start your bid
              </Button>
            </div>

            <dl className="uc-summary-grid">
              <div>
                <dt>What they need</dt>
                <dd>{d.need}</dd>
              </div>
              <div>
                <dt>Who can bid</dt>
                <dd>{d.who}</dd>
              </div>
              <div>
                <dt>Estimated value</dt>
                <dd>{d.valueLong}</dd>
              </div>
            </dl>

            {d.amendment ? (
              <div style={{ marginTop: 24 }}>
                <Notice
                  tone="amended"
                  title={d.amendment.title}
                  action="See what changed"
                  href="#files"
                >
                  {d.amendment.body}
                </Notice>
              </div>
            ) : null}

            <nav
              aria-label="On this page"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 20px",
                margin: "32px 0 0",
                padding: "14px 0",
                borderTop: "1px solid var(--line)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <a href="#dates">Key dates</a>
              {d.siteVisit ? <a href="#visit">Site visit</a> : null}
              <a href="#docs">What to submit</a>
              <a href="#files">Tender documents</a>
              <a href="#eval">Evaluation</a>
              <a href="#qa">Questions</a>
              <a href="#about">About the buyer</a>
            </nav>

            <section
              id="dates"
              className="uc-detail-block"
              aria-labelledby="dates-h"
            >
              <h2 id="dates-h" className="uc-h2">
                Key dates
              </h2>
              <p
                className="uc-muted"
                style={{ margin: "-8px 0 20px", fontSize: 15 }}
              >
                All times are Kigali time (CAT, UTC+2).
              </p>
              <KeyDates items={d.dates} />
            </section>

            {d.siteVisit ? (
              <section
                id="visit"
                className="uc-detail-block"
                aria-labelledby="visit-h"
              >
                <h2 id="visit-h" className="uc-h2">
                  Site visit
                </h2>
                <div className="uc-card uc-visit">
                  <div>
                    <p className="uc-date-label">{d.siteVisit.place}</p>
                    <p className="uc-date-when">{d.siteVisit.when}</p>
                    <p className="uc-date-note">{d.siteVisit.note}</p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon="pin"
                      href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(d.siteVisit.place)}`}
                    >
                      Open in maps
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon="calendar"
                      href="/register"
                    >
                      Register for visit
                    </Button>
                  </div>
                </div>
              </section>
            ) : null}

            <section
              id="docs"
              className="uc-detail-block"
              aria-labelledby="docs-h"
            >
              <h2 id="docs-h" className="uc-h2">
                What you must submit
              </h2>
              <p className="uc-muted" style={{ margin: "-4px 0 16px" }}>
                Upload every required document before the deadline. A missing
                document can make your bid non-responsive.
              </p>
              <DocumentChecklist items={d.docs} />
            </section>

            <section
              id="files"
              className="uc-detail-block"
              aria-labelledby="files-h"
            >
              <h2 id="files-h" className="uc-h2">
                Tender documents
              </h2>
              <div
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                }}
              >
                {d.files.map((f) => (
                  <div
                    key={f.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "14px 20px",
                      borderBottom: "1px solid var(--line)",
                      background: "var(--surface-raised)",
                    }}
                  >
                    <span
                      className="pg-tile-icon"
                      style={{ width: 40, height: 40, flex: "none" }}
                    >
                      <Icon name="file" size={20} />
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>
                        {f.name}
                      </p>
                      <p className="uc-ref" style={{ margin: 0 }}>
                        {f.meta}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="download"
                      aria-label={`Download ${f.name}`}
                    >
                      <span className="pg-hide-sm">Download</span>
                    </Button>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 12,
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 20px",
                    background: "var(--surface-sunk)",
                    fontSize: 14,
                    color: "var(--ink-muted)",
                  }}
                >
                  <span>{d.filesTotal} in total</span>
                  <Button variant="secondary" size="sm" icon="download">
                    Download all (.zip)
                  </Button>
                </div>
              </div>
            </section>

            <section
              id="eval"
              className="uc-detail-block"
              aria-labelledby="eval-h"
            >
              <h2 id="eval-h" className="uc-h2">
                How bids are evaluated
              </h2>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  lineHeight: "24px",
                }}
              >
                {d.evaluation.map((e) => (
                  <li key={e.title}>
                    <strong>{e.title}</strong> {e.text}
                  </li>
                ))}
              </ol>
              <p
                className="uc-muted"
                style={{ margin: "16px 0 0", fontSize: 15 }}
              >
                The evaluation report and award decision are published on this
                page. Bidders who disagree can{" "}
                <Link href="/legal-framework#f5">request a review</Link>.
              </p>
            </section>

            <section id="qa" className="uc-detail-block" aria-labelledby="qa-h">
              <h2 id="qa-h" className="uc-h2">
                Questions &amp; answers ({d.qa.length})
              </h2>
              {d.qa.length ? (
                d.qa.map((q) => (
                  <div key={q.q} className="uc-qa">
                    <p className="uc-qa-q">{q.q}</p>
                    <p className="uc-qa-a">{q.a}</p>
                  </div>
                ))
              ) : (
                <p className="uc-muted" style={{ margin: 0 }}>
                  No questions yet. Questions and answers are published here for
                  every bidder, without the name of the person who asked.
                </p>
              )}
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <Button variant="secondary" icon="question" href="/register">
                  Ask a question
                </Button>
                <span className="uc-muted" style={{ fontSize: 14 }}>
                  Questions close {d.questionsClose}. Answers are published to
                  every bidder.
                </span>
              </div>
            </section>

            <section
              id="about"
              className="uc-detail-block"
              aria-labelledby="about-h"
            >
              <h2 id="about-h" className="uc-h2">
                About the buyer
              </h2>
              <dl className="pg-dl">
                <dt>Procuring entity</dt>
                <dd>{t.entity}</dd>
                <dt>Procurement plan</dt>
                <dd>{d.about.plan}</dd>
                <dt>Funding source</dt>
                <dd>{d.about.funding}</dd>
                <dt>Past awards</dt>
                <dd>
                  <Link
                    href={`/spending?entity=${encodeURIComponent(t.entity)}`}
                  >
                    {d.about.pastAwards}
                  </Link>
                </dd>
              </dl>
            </section>
          </main>

          <div className="uc-detail-aside">
            <ActionPanel
              days={left.days}
              hours={left.hours}
              downloadLabel={
                d.files.length === 1
                  ? "Download tender document"
                  : "Download all documents"
              }
              downloadMeta={
                d.files.length === 1 ? d.filesTotal : `${d.filesTotal} .zip`
              }
            />
          </div>
        </div>
      </div>

      {similar.length ? (
        <section
          className="uc-section uc-section-sunk"
          aria-labelledby="similar-h"
        >
          <div className="uc-container">
            <div className="uc-section-head">
              <h2 id="similar-h" className="uc-h2" style={{ margin: 0 }}>
                Similar tenders
              </h2>
              <Link href={`/tenders?cat=${encodeURIComponent(t.category)}`}>
                See all {t.category} tenders
              </Link>
            </div>
            <div className="uc-grid-3">
              {similar.map((s) => (
                <TenderCard key={s.ref} tender={toCard(s)} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
