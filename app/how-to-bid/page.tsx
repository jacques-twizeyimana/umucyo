import type { Metadata } from "next";
import Link from "next/link";
import { SitePage } from "@/components/site-page";
import { Breadcrumbs, Button, Icon, Steps } from "@/components/umucyo";

export const metadata: Metadata = {
  title: "How to bid",
  description: "Your first public tender in Rwanda, step by step — what to have ready, the full journey, a glossary and answers to common questions.",
};

const READY = [
  { title: "RDB company code and TIN", note: "Or your national ID if you bid as an individual." },
  { title: "An email and a phone number", note: "Alerts, receipts and answers go here." },
  { title: "A digital certificate", note: "Apply at govca.rw. Allow time before your first deadline." },
  { title: "Tax and social security clearance", note: "Most tenders ask for valid certificates." },
  { title: "A bank or insurer for bid security", note: "Only when the tender asks for one." },
];

const STEPS = [
  { title: "Register your business", text: "Have your RDB company code and TIN ready. Individuals can register too.", link: "Register →", href: "/register" },
  { title: "Get a digital certificate", text: "Apply at govca.rw. It lets you sign and submit bids online securely.", link: "How to apply →", href: "#journey" },
  { title: "Follow tenders you can deliver", text: "Save searches and get alerts when a matching tender is published or amended.", link: "Set up alerts →", href: "/tenders" },
  { title: "Bid before the deadline", text: "Upload every required document. You get a receipt the moment your bid lands.", link: "See a tender →", href: "/tenders/RW-MUS-2026-0142" },
];

const JOURNEY = [
  { n: "01", title: "Register on Umucyo", text: "Create your account, add your business details and the categories you work in. You only do this once.", tip: "Pick categories carefully — they decide which alerts you get." },
  { n: "02", title: "Get your digital certificate", text: "The certificate is your electronic signature. Without a valid one you cannot sign or submit a bid.", tip: "Check its expiry date before every deadline." },
  { n: "03", title: "Find and read the tender", text: "Every tender page starts with what they need, who can bid and the estimated value. Then read the key dates and the list of documents.", tip: "Go to the site visit if there is one. It answers questions the documents don’t." },
  { n: "04", title: "Prepare your bid", text: "Collect every required document, fill in the forms and price the bill of quantities exactly as provided. Ask questions before the clarification deadline.", tip: "Answers to anyone’s questions are published to everyone. Read them." },
  { n: "05", title: "Submit before the deadline", text: "Upload, sign with your certificate and submit. You get a receipt with a time stamp. You can replace or withdraw your bid until the deadline.", tip: "Submit a day early. The system closes at the exact minute." },
  { n: "06", title: "After the deadline", text: "Bids are opened and the opening report is published. The evaluation follows, then the award decision. Every bidder is notified.", tip: "Not happy with a decision? You have a legal right to request a review." },
];

const GLOSSARY = [
  { term: "Bid security", def: "A guarantee from a bank or insurer that you will honour your bid. It is returned after the award, unless you withdraw improperly." },
  { term: "Bill of quantities (BoQ)", def: "The list of items and quantities in a works tender. You fill in the prices; you don’t change the items." },
  { term: "Non-responsive bid", def: "A bid that does not meet a basic requirement, such as a missing document. It is rejected before prices are compared." },
  { term: "Request for quotations (RFQ)", def: "A simpler method used for smaller purchases, with fewer documents and shorter timelines." },
  { term: "Open competition", def: "Any qualified bidder may take part. National competitions are for the Rwandan market; international ones are open to foreign bidders too." },
  { term: "Pre-bid meeting", def: "A meeting where the buyer explains the tender and answers questions. Minutes are published to all bidders." },
  { term: "Joint venture (JV)", def: "Two or more companies bidding together under a written agreement, sharing responsibility for the contract." },
  { term: "Evaluated price", def: "Your price after corrections and any adjustments set out in the tender document. It is what gets compared." },
  { term: "Clarification", def: "A question to the buyer about the tender. The question and answer are shared with every bidder, without your name." },
  { term: "Amendment", def: "An official change to a published tender, such as a new deadline or corrected quantities. Always dated and listed on the tender page." },
];

const FAQ = [
  { q: "Can I bid as an individual, not a company?", a: "Yes, where the tender allows it. Register as an individual bidder. Some tenders require a registered company or a specific professional licence. The “Who can bid” line on each tender tells you." },
  { q: "My business is new. Can I still win anything?", a: "Start with tenders whose requirements you can meet today. Smaller purchases by request for quotations usually ask for less experience. Joint ventures with established firms are another route." },
  { q: "What happens if my upload fails close to the deadline?", a: "The system enforces the deadline to the minute and late bids cannot be submitted. Upload early, check your receipt, and call 3131 straight away if something goes wrong." },
  { q: "Can I change my bid after I submit it?", a: "Yes, until the deadline. You can replace or withdraw it as the tender documents allow. After the deadline, bids are locked." },
  { q: "How will I know if I won?", a: "Every bidder is notified of the award decision, and the decision is published on the tender page and in Where the money went." },
  { q: "What if I think a decision was unfair?", a: "The public procurement law gives bidders the right to request a review, within strict deadlines. Use “Request a review” on the tender page or read the Legal framework page." },
];

export default function HowToBidPage() {
  return (
    <SitePage active="For suppliers">
      <main id="main">
        {/* Intro */}
        <section style={{ padding: "64px 0 56px", borderBottom: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
          <div className="uc-container" style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
            <div style={{ flex: "999 1 560px", minWidth: 0 }}>
              <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "For suppliers" }, { label: "How to bid" }]} />
              <p className="uc-eyebrow" style={{ marginTop: 32 }}>
                For suppliers
              </p>
              <h1 className="htb-title">
                Your first public tender, <span className="hl">step by step.</span>
              </h1>
              <p className="uc-lead" style={{ marginTop: 20, maxWidth: 600 }}>
                The government buys everything from laptops to roads to app design. If your business can deliver, you can
                compete. Here is everything you need, in plain words.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
                <Button variant="primary" size="lg" iconRight="arrow-right" href="/register">
                  Register your business
                </Button>
                <Button size="lg" href="/tenders">
                  Find a tender to bid on
                </Button>
              </div>
            </div>
            <aside
              aria-labelledby="ready-h"
              style={{ flex: "1 1 340px", maxWidth: 420, background: "var(--surface-sunk)", borderRadius: "var(--radius-lg)", padding: 28 }}
            >
              <h2 id="ready-h" style={{ margin: "0 0 16px", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 650 }}>
                Have these ready
              </h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {READY.map((r) => (
                  <li key={r.title} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 12, alignItems: "start" }}>
                    <span style={{ color: "var(--open)", paddingTop: 1 }}>
                      <Icon name="check-circle" size={22} />
                    </span>
                    <span>
                      <strong style={{ display: "block", fontSize: 15, lineHeight: "22px" }}>{r.title}</strong>
                      <span style={{ fontSize: 14, lineHeight: "20px", color: "var(--ink-muted)" }}>{r.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Steps overview */}
        <section className="uc-section" aria-labelledby="overview-h">
          <div className="uc-container">
            <h2 id="overview-h" className="uc-h2" style={{ marginBottom: 32 }}>
              The short version
            </h2>
            <Steps items={STEPS} />
          </div>
        </section>

        {/* Detailed walkthrough */}
        <section id="journey" className="uc-section uc-section-sunk" aria-labelledby="walk-h">
          <div className="uc-container">
            <p className="uc-eyebrow">The full journey</p>
            <h2 id="walk-h" className="uc-h2" style={{ marginBottom: 32 }}>
              From registration to contract
            </h2>
            <ol
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
                gap: 20,
              }}
            >
              {JOURNEY.map((j) => (
                <li key={j.n} className="uc-card" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span
                    style={{
                      font: "600 13px/16px var(--font-mono)",
                      color: "var(--ink-muted)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span style={{ width: 32, height: 4, background: "var(--sun)", borderRadius: 2 }} />
                    {j.n}
                  </span>
                  <h3 className="uc-h3">{j.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: "23px", color: "var(--ink-muted)" }}>{j.text}</p>
                  <p style={{ margin: "auto 0 0", paddingTop: 8, fontSize: 14, lineHeight: "20px" }}>
                    <strong>Tip:</strong> {j.tip}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Glossary */}
        <section id="glossary" className="uc-section" aria-labelledby="gloss-h">
          <div className="uc-container">
            <div className="uc-section-head">
              <div>
                <p className="uc-eyebrow">Procurement words, decoded</p>
                <h2 id="gloss-h" className="uc-h2" style={{ margin: 0 }}>
                  Glossary
                </h2>
              </div>
            </div>
            <dl className="pg-gloss">
              {GLOSSARY.map((g) => (
                <div key={g.term}>
                  <dt>{g.term}</dt>
                  <dd>{g.def}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="uc-section uc-section-sunk" aria-labelledby="faq-h">
          <div className="uc-container" style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
            <div style={{ flex: "1 1 280px", maxWidth: 360 }}>
              <p className="uc-eyebrow">FAQ</p>
              <h2 id="faq-h" className="uc-h2">
                Questions first-time bidders ask
              </h2>
              <p className="uc-muted" style={{ margin: 0 }}>
                Can’t find yours? Call <a href="tel:3131">3131</a> or read the <Link href="/terms">Terms of use</Link>.
              </p>
            </div>
            <div className="pg-faq" style={{ flex: "999 1 560px", minWidth: 0 }}>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Help band */}
        <section className="uc-on-navy" style={{ background: "var(--navy)", color: "var(--on-navy)", padding: "56px 0" }}>
          <div
            className="uc-container"
            style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ maxWidth: 640 }}>
              <h2
                style={{
                  margin: "0 0 8px",
                  fontFamily: "var(--font-display)",
                  fontSize: 30,
                  lineHeight: "36px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Need a hand? Talk to a person.
              </h2>
              <p style={{ margin: 0, color: "var(--on-navy-muted)", fontSize: 17, lineHeight: "26px" }}>
                Call the toll-free line 3131, or take a free course on RPPA’s eLearning platform before your first bid.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Button variant="accent" size="lg" href="tel:3131">
                Call 3131
              </Button>
              <Button variant="inverse" size="lg" iconRight="external" href="https://www.rppa.gov.rw">
                Free courses
              </Button>
            </div>
          </div>
        </section>
      </main>
    </SitePage>
  );
}
