import type { Metadata } from "next";
import Link from "next/link";
import { SitePage } from "@/components/site-page";
import { LegalLayout } from "@/components/umucyo";

export const metadata: Metadata = { title: "Legal framework & mandate" };

const TOC = [
  { id: "f1", label: "Why Umucyo exists" },
  { id: "f2", label: "Who runs it" },
  { id: "f3", label: "Laws that apply" },
  { id: "f4", label: "What is published" },
  { id: "f5", label: "Complaints & review" },
  { id: "f6", label: "Contact" },
];

const SUMMARY = [
  "Umucyo is the Government of Rwanda’s official system for public procurement. Public entities publish their tenders here, and bidders submit their bids here.",
  "The Rwanda Public Procurement Authority (RPPA) runs it.",
  "The rules come from the public procurement law and its regulations. Your personal data is protected by Rwanda’s data protection law.",
  "If you think a procurement decision was wrong, the law gives you a right to ask for a review.",
];

const INSTRUMENTS: [string, string][] = [
  ["Constitution of the Republic of Rwanda of 2003, revised in 2015", "The right to privacy (Article 23) and the framework for public finance"],
  ["Law N° 031/2022 of 21/11/2022 governing public procurement", "Methods, publication, bidding, evaluation, award, contracts, review and sanctions"],
  [
    "Ministerial Order n° 001/23/10/TC establishing regulations governing public procurement (O.G. n° Special of 10/10/2023)",
    "Detailed procedures: thresholds, timelines, documents",
  ],
  ["RPPA standard bidding documents and guidelines", "The tender documents published on Umucyo"],
  [
    "Law N° 058/2021 of 13/10/2021 relating to the protection of personal data and privacy",
    "How personal data on Umucyo is processed; supervised by the National Cyber Security Authority (NCSA)",
  ],
  [
    "Law on electronic messages, electronic signatures and electronic transactions [verify number and date]",
    "The legal value of electronic bids and digital signatures",
  ],
  ["Law relating to access to information [verify number and date]", "The public’s right to information held by public bodies"],
  ["Law on prevention and punishment of cyber crimes [verify number and date]", "Unauthorised access to and misuse of the system"],
];

export default function LegalFrameworkPage() {
  return (
    <SitePage active="For public entities">
      <main id="main">
        <LegalLayout
          eyebrow="Legal · Transparency"
          title="Legal framework & mandate"
          updated="8 Nov 2026"
          version="v1.0-draft"
          crumbs={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Legal framework & mandate" }]}
          toc={TOC}
          summary={SUMMARY}
        >
          <p className="pg-legal-note">
            Draft for review by RPPA legal counsel. Citations were checked against public sources in November 2026. Items marked
            [verify] must be confirmed against the Official Gazette before publication. Parliament has asked for the 2022
            procurement law to be revised, so check this page against any amendment.
          </p>

          <h2 id="f1">Why Umucyo exists</h2>
          <p>
            Public procurement in Rwanda is governed by{" "}
            <strong>Law N° 031/2022 of 21/11/2022 governing public procurement</strong> (Official Gazette n° Special of
            22/11/2022), which replaced Law N° 62/2018 of 25/08/2018. The law requires public procurement to be carried out
            through the electronic procurement system, with exceptions only where it allows them [verify article]. Umucyo is that
            system.
          </p>
          <p>
            The law rests on the fundamental principles of public procurement, including transparency, competition, economy,
            efficiency, fairness and accountability [verify wording]. Publishing every tender, date, document, clarification and
            award openly is how this portal puts those principles into practice.
          </p>

          <h2 id="f2">Who runs it</h2>
          <ul>
            <li>
              <strong>Rwanda Public Procurement Authority (RPPA)</strong> operates Umucyo, issues standard bidding documents and
              guidelines, and oversees how the law is applied. Its organisation and functioning are governed by Presidential Order
              n° 052/01 of 02/08/2023 [verify title].
            </li>
            <li>
              <strong>Procuring entities</strong> — ministries, agencies, districts and other public bodies covered by the law —
              publish their plans, tenders, amendments, clarifications and award decisions here, and are responsible for what
              they publish.
            </li>
            <li>
              <strong>Bidders</strong> register, hold a valid digital certificate (issued through govca.rw) and submit bids only
              through Umucyo.
            </li>
          </ul>

          <h2 id="f3">Laws and regulations that apply</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Instrument</th>
                <th scope="col">What it covers here</th>
              </tr>
            </thead>
            <tbody>
              {INSTRUMENTS.map(([i, c]) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{c}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 id="f4">What is published, and why</h2>
          <p>To make procurement transparent, the law and RPPA’s rules require some information to be public. On Umucyo this includes:</p>
          <ul>
            <li>annual procurement plans;</li>
            <li>
              tender notices, tender documents, amendments and clarifications (questions are published without the name of the
              person who asked);
            </li>
            <li>bid opening reports, including bidder names and bid prices read at opening [verify fields];</li>
            <li>award decisions and contract values;</li>
            <li>the lists of debarred and suspended companies.</li>
          </ul>
          <p>
            The <Link href="/privacy">Privacy policy</Link> explains how personal data within this information is handled.
          </p>

          <h2 id="f5">Your right to complain and request a review</h2>
          <h3>About a procurement decision</h3>
          <p>
            A bidder who believes a decision breached the law can apply for review, first to the procuring entity and then to the
            independent review body set up under the procurement law, within the deadlines the law sets [verify bodies and time
            limits]. Start from “Request a review” on the tender page.
          </p>
          <h3>About fraud or corruption</h3>
          <p>
            Report suspected collusion, bribery, conflicts of interest or bid-rigging through “Report fraud or corruption”. You
            can report anonymously.
          </p>
          <h3>About your personal data</h3>
          <p>Contact RPPA’s data protection officer. If you are not satisfied, you can complain to NCSA.</p>

          <h2 id="f6">Contact</h2>
          <p>
            Rwanda Public Procurement Authority · Umucyo call centre <strong>3131</strong> (toll-free) · International{" "}
            <strong>+250 788 123 100</strong>.
          </p>
        </LegalLayout>
      </main>
    </SitePage>
  );
}
