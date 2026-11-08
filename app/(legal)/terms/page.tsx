import type { Metadata } from "next";
import Link from "next/link";
import { SitePage } from "@/components/site-page";
import { LegalLayout } from "@/components/umucyo";

export const metadata: Metadata = { title: "Terms of use" };

const TOC = [
  { id: "t1", label: "About these terms" },
  { id: "t2", label: "Who can use Umucyo" },
  { id: "t3", label: "Account & certificate" },
  { id: "t4", label: "Published information" },
  { id: "t5", label: "Submitting bids" },
  { id: "t6", label: "Prohibited conduct" },
  { id: "t7", label: "Availability" },
  { id: "t8", label: "Open data & IP" },
  { id: "t9", label: "Liability" },
  { id: "t10", label: "Disputes & governing law" },
  { id: "t11", label: "Changes" },
  { id: "t12", label: "Contact" },
];

const SUMMARY = [
  "Anyone can search tenders without an account. To bid, you need to register and hold a valid digital certificate.",
  "Your bid is legally binding once you sign and submit it. Check it before you press submit.",
  "Deadlines are enforced by the system in Kigali time (CAT). Late bids cannot be submitted.",
  "The tender as published on Umucyo, including its amendments, is the official version.",
  "No fraud, collusion, fake documents or attempts to break in. Breaking these rules can lead to debarment and prosecution.",
];

export default function TermsPage() {
  return (
    <SitePage>
      <main id="main">
        <LegalLayout
          title="Terms of use"
          updated="8 Nov 2026"
          version="v1.0-draft"
          crumbs={[{ label: "Home", href: "/" }, { label: "Legal" }, { label: "Terms of use" }]}
          toc={TOC}
          summary={SUMMARY}
        >
          <p className="pg-legal-note">
            Draft for review by RPPA legal counsel. Items in [brackets] are decisions for RPPA. This text is not legal advice.
          </p>

          <h2 id="t1">1. About these terms</h2>
          <p>
            These terms govern your use of Umucyo, the e-procurement system of the Government of Rwanda, operated by the Rwanda
            Public Procurement Authority (“RPPA”, “we”).
          </p>
          <p>
            By registering or submitting anything through Umucyo, you accept these terms. The public procurement law and the
            tender documents for each procurement also apply. If they conflict with these terms, the law and the tender
            documents prevail.
          </p>
          <p>These terms are available in Kinyarwanda, English and French. [Decide which version prevails in case of conflict.]</p>

          <h2 id="t2">2. Who can use Umucyo</h2>
          <ul>
            <li>Anyone may browse and search published information without an account.</li>
            <li>
              To bid, you must register as a bidder — a company, an individual, or a joint venture through its lead member — and
              keep your details up to date.
            </li>
            <li>Public entity users are given access by their institution and RPPA, and act on behalf of that institution.</li>
          </ul>

          <h2 id="t3">3. Your account and digital certificate</h2>
          <p>
            You are responsible for everything done with your account and digital certificate. Keep your credentials and
            certificate private, and tell us immediately through 3131 or the help centre if you suspect someone else is using
            them.
          </p>
          <p>
            Digital certificates are issued through govca.rw. Make sure yours is valid before the deadline of any tender you
            intend to bid on.
          </p>

          <h2 id="t4">4. Information published on Umucyo</h2>
          <p>
            Procuring entities are responsible for the accuracy of the tenders, amendments, clarifications and decisions they
            publish. The version of a tender published on Umucyo, with all its amendments, is the authoritative version.
          </p>
          <p>Turn on alerts for tenders you follow. You are responsible for reading amendments published before the deadline.</p>

          <h2 id="t5">5. Submitting bids</h2>
          <ul>
            <li>A bid is submitted when Umucyo issues a submission receipt with a reference and time stamp. Keep the receipt.</li>
            <li>
              Deadlines are recorded by the system clock in Central Africa Time (CAT, UTC+2). The system will not accept a bid
              after the deadline. Slow connections and large uploads are not grounds for an extension.
            </li>
            <li>You may modify or withdraw a bid before the deadline as the tender documents allow.</li>
            <li>Bids are encrypted and cannot be opened by anyone before the opening time [verify technical description].</li>
            <li>By submitting a bid you confirm that its content is true and that you are entitled to submit it.</li>
          </ul>

          <h2 id="t6">6. Prohibited conduct</h2>
          <p>You must not:</p>
          <ul>
            <li>submit false, forged or misleading information or documents;</li>
            <li>engage in corrupt, fraudulent, collusive, coercive or obstructive practices;</li>
            <li>try to access information or accounts you are not authorised to see;</li>
            <li>interfere with the system’s operation, security or availability, or upload malicious files;</li>
            <li>scrape the portal in a way that degrades the service. Use the open data downloads and API instead.</li>
          </ul>
          <p>
            Breaches may lead to suspension of your account, rejection of bids, debarment under the procurement law and referral
            for prosecution.
          </p>

          <h2 id="t7">7. Availability</h2>
          <p>
            We aim to keep Umucyo available at all times and publish planned maintenance on the Service status page in advance.
            If a system failure prevents submissions close to a deadline, RPPA will publish what happens to the affected
            deadlines [state the rule].
          </p>

          <h2 id="t8">8. Open data and intellectual property</h2>
          <p>
            Published procurement information — plans, notices, awards, contract values — is public information. You may reuse
            it with attribution to RPPA under [name the open licence].
          </p>
          <p>
            Documents you submit remain yours. You give RPPA and the procuring entity the right to use them for the procurement
            and for the records, audit and publication the law requires. The Umucyo name, mark and portal design may not be used
            in a way that suggests official endorsement.
          </p>

          <h2 id="t9">9. Liability</h2>
          <p>
            Umucyo is provided to carry out public procurement under the law. To the extent the law allows, RPPA is not liable
            for losses caused by your equipment, your connection, or your failure to submit in time. Nothing in these terms
            limits rights you have under the law.
          </p>

          <h2 id="t10">10. Disputes and governing law</h2>
          <p>
            These terms are governed by the laws of the Republic of Rwanda. Complaints about procurement decisions follow the
            review procedure in the public procurement law (see <Link href="/legal-framework">Legal framework &amp; mandate</Link>
            ). Other disputes go to the competent Rwandan courts.
          </p>

          <h2 id="t11">11. Changes</h2>
          <p>
            We may update these terms. We will publish the new version with its date, and tell registered users about
            significant changes before they apply.
          </p>

          <h2 id="t12">12. Contact</h2>
          <p>
            Umucyo call centre <strong>3131</strong> (toll-free) · International <strong>+250 788 123 100</strong> · Help centre
            on this portal.
          </p>
        </LegalLayout>
      </main>
    </SitePage>
  );
}
