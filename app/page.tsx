import Link from "next/link";
import { SitePage } from "@/components/site-page";
import {
  Button,
  Icon,
  Notice,
  SearchBar,
  Steps,
  TenderCard,
  type IconName,
} from "@/components/umucyo";
import { AWARDS, CATEGORIES, FIRST_BID_STEPS, cardsFor } from "@/lib/data";
import { HeroChips } from "./hero-chips";

const CATEGORY_TILES: {
  name: (typeof CATEGORIES)[number];
  icon: IconName;
  desc: string;
  count: string;
}[] = [
  {
    name: "Goods",
    icon: "file",
    count: "412",
    desc: "Equipment, supplies, vehicles, IT hardware and medical consumables.",
  },
  {
    name: "Works",
    icon: "building",
    count: "318",
    desc: "Buildings, roads, water, energy and maintenance works.",
  },
  {
    name: "Consultancy services",
    icon: "edit",
    count: "297",
    desc: "Studies, design, supervision, audit, software and advisory.",
  },
  {
    name: "Non-consultancy services",
    icon: "check-circle",
    count: "257",
    desc: "Cleaning, catering, security, transport and events.",
  },
];

const CLOSING_SOON = [
  "RW-KAY-2026-0088",
  "RW-MUS-2026-0142",
  "RW-KGL-2026-0311",
  "RW-HUY-2026-0057",
  "RW-NYA-2026-0019",
  "RW-RUB-2026-0204",
];

export default function Home() {
  const tenders = cardsFor(CLOSING_SOON);
  return (
    <SitePage active="Find tenders">
      <main id="main">
        {/* Hero */}
        <section className="uc-hero uc-on-navy" aria-labelledby="hero-title">
          <div className="uc-hero-ring2" aria-hidden="true" />
          <div className="uc-hero-ring" aria-hidden="true" />
          <div className="uc-hero-sun" aria-hidden="true" />
          <div className="uc-container uc-hero-in">
            <p
              className="uc-eyebrow"
              style={{ color: "var(--on-navy-muted)", margin: "0 0 16px" }}
            >
              1,284 open tenders right now
            </p>
            <h1 id="hero-title" className="uc-hero-title">
              Rwanda is building. <em>Supply what it needs.</em>
            </h1>
            <p className="uc-hero-sub">
              Every public tender in Rwanda, in one place — written plainly,
              with every date, document and site visit up front. Search free,
              bid online, and see every award.
            </p>
            <SearchBar />
            <HeroChips />
          </div>
        </section>

        {/* Browse by category */}
        <section className="uc-section" aria-labelledby="cat-title">
          <div className="uc-container">
            <div className="uc-section-head">
              <div>
                <p className="uc-eyebrow">Browse by what you do</p>
                <h2 id="cat-title" className="uc-h2" style={{ margin: 0 }}>
                  Four kinds of public work
                </h2>
              </div>
              <Button href="/tenders">Advanced search</Button>
            </div>
            <div
              className="pg-grid-4"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: 24,
              }}
            >
              {CATEGORY_TILES.map((cat) => (
                <Link
                  key={cat.name}
                  className="pg-tile"
                  href={`/tenders?cat=${encodeURIComponent(cat.name)}`}
                >
                  <span className="pg-tile-icon">
                    <Icon name={cat.icon} size={22} />
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 21,
                      lineHeight: "26px",
                      fontWeight: 650,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {cat.name}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      lineHeight: "22px",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {cat.desc}
                  </span>
                  <span
                    style={{
                      marginTop: "auto",
                      paddingTop: 12,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderTop: "1px solid var(--line)",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    <span>{cat.count} open</span>
                    <Icon name="arrow-right" size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Closing soon */}
        <section
          className="uc-section uc-section-sunk"
          aria-labelledby="soon-title"
        >
          <div className="uc-container">
            <div className="uc-section-head">
              <div>
                <p className="uc-eyebrow">Closing soon</p>
                <h2 id="soon-title" className="uc-h2" style={{ margin: 0 }}>
                  Tenders you can still bid on
                </h2>
              </div>
              <Button href="/tenders" iconRight="arrow-right">
                See all 1,284 tenders
              </Button>
            </div>
            <div className="uc-grid-3">
              {tenders.map((t) => (
                <TenderCard key={t.ref} tender={t} />
              ))}
            </div>
          </div>
        </section>

        {/* First bid */}
        <section className="uc-section" aria-labelledby="steps-title">
          <div className="uc-container">
            <div className="uc-section-head">
              <div>
                <p className="uc-eyebrow">New to public tenders?</p>
                <h2 id="steps-title" className="uc-h2" style={{ margin: 0 }}>
                  From zero to your first bid in four steps
                </h2>
              </div>
              <Link href="/how-to-bid">Read the full bidding guide</Link>
            </div>
            <Steps items={FIRST_BID_STEPS} />
          </div>
        </section>

        {/* Follow the money */}
        <section
          className="uc-section uc-section-sunk"
          aria-labelledby="money-title"
        >
          <div className="uc-container">
            <div className="uc-section-head">
              <div>
                <p className="uc-eyebrow">Follow the money</p>
                <h2
                  id="money-title"
                  className="uc-h2"
                  style={{ margin: "0 0 8px" }}
                >
                  Recently awarded contracts
                </h2>
                <p className="uc-lead" style={{ maxWidth: 640 }}>
                  Every award decision is published: which company was paid, for
                  how much, and how many bids competed. Follow any supplier or
                  public entity, and download it all as open data.
                </p>
              </div>
              <Button href="/spending" iconRight="arrow-right">
                See where the money went
              </Button>
            </div>
            <div
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-md)",
                overflowX: "auto",
              }}
            >
              <table className="pg-table">
                <caption className="uc-sr">Recently awarded contracts</caption>
                <thead>
                  <tr>
                    <th scope="col">Contract</th>
                    <th scope="col">Procuring entity</th>
                    <th scope="col">Awarded to</th>
                    <th scope="col" style={{ textAlign: "right" }}>
                      Contract value
                    </th>
                    <th scope="col">Awarded</th>
                  </tr>
                </thead>
                <tbody>
                  {AWARDS.slice(0, 4).map((a) => (
                    <tr key={a.ref}>
                      <td>
                        <Link
                          href={`/spending?q=${encodeURIComponent(a.ref)}`}
                          style={{ fontWeight: 600, color: "var(--ink)" }}
                        >
                          {a.title}
                        </Link>
                        <div className="uc-ref">{a.ref}</div>
                      </td>
                      <td>{a.entity}</td>
                      <td>{a.winner}</td>
                      <td className="num">{a.value}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{a.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Help + integrity */}
        <section className="uc-section" aria-label="Help and integrity">
          <div
            className="uc-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            <Notice
              tone="info"
              title="Stuck? Talk to a person."
              action="Open the help centre"
              href="/how-to-bid#faq"
            >
              Call the toll-free line 3131, or +250 788 123 100 from abroad. Ask
              in Kinyarwanda, English or French.
            </Notice>
            <Notice
              tone="info"
              title="Spotted something wrong?"
              action="Report fraud or corruption"
              href="/legal-framework#f5"
            >
              Report suspected collusion, bribery or bid-rigging. You can report
              anonymously.
            </Notice>
          </div>
        </section>
      </main>
    </SitePage>
  );
}
