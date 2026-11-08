import type { Metadata } from "next";
import { SitePage } from "@/components/site-page";
import { LegalLayout } from "@/components/umucyo";

export const metadata: Metadata = { title: "Privacy policy" };

const TOC = [
  { id: "p1", label: "Who is responsible" },
  { id: "p2", label: "What we collect" },
  { id: "p3", label: "Why we use it" },
  { id: "p4", label: "What is made public" },
  { id: "p5", label: "Who we share it with" },
  { id: "p6", label: "Where it is stored" },
  { id: "p7", label: "How long we keep it" },
  { id: "p8", label: "Your rights" },
  { id: "p9", label: "Security" },
  { id: "p10", label: "Complaints" },
  { id: "p11", label: "Changes" },
];

const SUMMARY = [
  "RPPA uses your data to run public procurement on Umucyo: registration, bidding, evaluation, contracts and the records the law requires.",
  "Some information is public by law: tender notices, bidder names at opening, award decisions and contract values.",
  "Your data is stored in Rwanda.",
  "You can ask to see, correct or object to how your data is used. If you are not satisfied, you can complain to NCSA.",
];

const PURPOSES: [string, string][] = [
  ["Registering bidders and running procurement procedures", "Legal obligation and public-interest tasks under the public procurement law"],
  ["Publishing information that must be public (section 4)", "Legal obligation"],
  ["Security, fraud prevention and audit", "Legal obligation and legitimate interest in protecting the system"],
  ["Alerts and newsletters you sign up for", "Your consent, which you can withdraw at any time"],
  ["Anonymous usage analytics", "Your consent (Cookie settings)"],
];

export default function PrivacyPage() {
  return (
    <SitePage>
      <main id="main">
        <LegalLayout
          title="Privacy policy"
          updated="8 Nov 2026"
          version="v1.0-draft"
          crumbs={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Privacy policy" }]}
          toc={TOC}
          summary={SUMMARY}
        >
          <p className="pg-legal-note">
            Draft for review by RPPA legal counsel and the data protection officer, written against Law N° 058/2021 of
            13/10/2021 relating to the protection of personal data and privacy. Items in [brackets] are decisions for RPPA.
          </p>

          <h2 id="p1">1. Who is responsible</h2>
          <p>
            The <strong>Rwanda Public Procurement Authority (RPPA)</strong> is the data controller for personal data processed on
            Umucyo. Each procuring entity is also responsible for the data in the bids it receives and evaluates. Data protection
            officer: [name / role], [email], RPPA, Kigali.
          </p>

          <h2 id="p2">2. What we collect</h2>
          <ul>
            <li>
              <strong>Account data:</strong> name, email, phone number, role, language preference.
            </li>
            <li>
              <strong>Business data:</strong> company name, RDB company code, TIN, address and, where a tender requires it,
              information about owners, directors, key staff and beneficial owners.
            </li>
            <li>
              <strong>Bid data:</strong> documents you upload, prices, and the time stamp of every submission, modification and
              withdrawal.
            </li>
            <li>
              <strong>Certificate data:</strong> details of the digital certificate you use to sign.
            </li>
            <li>
              <strong>Technical data:</strong> log records (IP address, device, time of access) kept for security and audit.
            </li>
            <li>
              <strong>Cookies:</strong> only those needed for sign-in and security, unless you agree to anonymous analytics in
              Cookie settings.
            </li>
          </ul>

          <h2 id="p3">3. Why we use it</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Purpose</th>
                <th scope="col">Legal basis</th>
              </tr>
            </thead>
            <tbody>
              {PURPOSES.map(([p, b]) => (
                <tr key={p}>
                  <td>{p}</td>
                  <td>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>We do not sell personal data, and we do not use it for advertising.</p>

          <h2 id="p4">4. What is made public</h2>
          <p>
            To make public spending transparent, some information is published on Umucyo and in its open data: procurement
            plans, tender notices, bid opening reports (including bidder names and prices read at opening), award decisions,
            winning bidders, contract values and the lists of debarred and suspended companies [verify fields against the law].
            Contact details of individuals in your bid are not published.
          </p>

          <h2 id="p5">5. Who we share it with</h2>
          <p>
            Only as the law requires or permits: procuring entities and their evaluation committees for the tenders you bid on;
            review bodies handling complaints; the Office of the Auditor General and other oversight bodies; law enforcement
            when legally required; and the technical providers who host and maintain Umucyo under contract, as data processors.
          </p>

          <h2 id="p6">6. Where it is stored</h2>
          <p>
            Personal data is stored on servers in Rwanda. It is not transferred outside Rwanda unless the conditions of the data
            protection law are met, including authorisation from the National Cyber Security Authority (NCSA) where the law
            requires it.
          </p>

          <h2 id="p7">7. How long we keep it</h2>
          <p>
            Procurement records are kept for [X] years after the procurement ends, as required for audit [cite retention rule].
            Account data is kept while your account is active and for [X] years afterwards. Log data is kept for [X] months.
          </p>

          <h2 id="p8">8. Your rights</h2>
          <p>Under Law N° 058/2021 you have the right, among others, to:</p>
          <ul>
            <li>be informed about how your data is processed;</li>
            <li>get access to your personal data;</li>
            <li>have inaccurate data corrected;</li>
            <li>
              object to processing, and ask for erasure or restriction where the law allows (records the procurement law requires
              us to keep cannot be erased);
            </li>
            <li>withdraw consent at any time where processing is based on consent;</li>
            <li>
              not be subject to a decision based solely on automated processing that significantly affects you. No bid is
              accepted or rejected by automated processing alone, except that the system will not accept a submission after the
              deadline.
            </li>
          </ul>
          <p>To exercise these rights, contact the data protection officer. We will reply within [X] days.</p>

          <h2 id="p9">9. Security</h2>
          <p>
            Bids are encrypted until opening, and access is logged and restricted by role. If a personal data breach occurs, we
            will notify NCSA within the time the law requires (48 hours) and inform affected people where required.
          </p>

          <h2 id="p10">10. Complaints</h2>
          <p>
            If you are not satisfied with our answer, you can complain to the <strong>National Cyber Security Authority (NCSA)</strong>,
            the supervisory authority under Law N° 058/2021.
          </p>

          <h2 id="p11">11. Changes</h2>
          <p>We will publish any update here with its date, and tell registered users about significant changes.</p>
        </LegalLayout>
      </main>
    </SitePage>
  );
}
