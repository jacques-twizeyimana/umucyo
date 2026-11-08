import type { Metadata } from "next";
import { FileUpload, PasswordField, StepActions, StepForm } from "@/components/register/parts";
import { RegLayout, Req } from "@/components/register/shell";
import { Icon, Select } from "@/components/umucyo";

export const metadata: Metadata = { title: "Register — individual" };

export default function IndividualDetailsPage() {
  return (
    <RegLayout
      type="individual"
      step={2}
      title="Your details"
      lead="You will bid in your own name. Use your names exactly as they appear on your ID and RRA records."
    >
      <StepForm next="/register/individual/verify">
        <section className="ob-card" aria-labelledby="who-h">
          <h2 id="who-h" style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 650 }}>
            Who you are
          </h2>
          <div className="ob-grid">
            <div className="uc-field">
              <label className="uc-label" htmlFor="ifirst">
                First name
                <Req />
              </label>
              <input id="ifirst" className="uc-input" defaultValue="Eric" required autoComplete="given-name" />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="ilast">
                Last name
                <Req />
              </label>
              <input id="ilast" className="uc-input" defaultValue="Mugisha" required autoComplete="family-name" />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="iother">
                Other names
              </label>
              <input id="iother" className="uc-input" placeholder="If any" />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="iid">
                National ID or passport number
                <Req />
              </label>
              <input id="iid" className="uc-input" defaultValue="1 1999 8 0045678 1 09" required style={{ fontFamily: "var(--font-mono)" }} />
            </div>
            <div className="uc-field span2">
              <label className="uc-label" htmlFor="itin">
                TIN (Tax Identification Number)
                <Req />
              </label>
              <input
                id="itin"
                className="uc-input"
                defaultValue="121 907 344"
                inputMode="numeric"
                required
                style={{ fontFamily: "var(--font-mono)", maxWidth: 320 }}
              />
              <span className="ob-verified">
                <Icon name="check-circle" size={16} />
                Matches RRA record: Eric Mugisha
              </span>
            </div>
          </div>
        </section>

        <section className="ob-card" aria-labelledby="tax-h" style={{ gap: 16 }}>
          <div>
            <h2 id="tax-h" style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 650 }}>
              Tax clearance — fiscal year 2025/26
              <Req />
            </h2>
            <p className="ob-hint" style={{ margin: "4px 0 0", fontSize: 14 }}>
              Your RRA tax clearance certificate for the last fiscal year. PDF, JPG or PNG, up to 10 MB.
            </p>
          </div>
          <FileUpload id="itax" initial={{ name: "Tax_clearance_2025-26.pdf", meta: "PDF · 0.8 MB · uploaded just now" }} />
          <div className="ob-grid">
            <div className="uc-field">
              <label className="uc-label" htmlFor="itaxno">
                Certificate number
              </label>
              <input id="itaxno" className="uc-input" defaultValue="TCC/2026/0193377" style={{ fontFamily: "var(--font-mono)" }} />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="itaxexp">
                Valid until
                <Req />
              </label>
              <input id="itaxexp" className="uc-input" defaultValue="30/06/2027" required placeholder="DD/MM/YYYY" />
              <span className="ob-hint">We remind you 30 days before it expires.</span>
            </div>
          </div>
        </section>

        <section className="ob-card" aria-labelledby="ct-h">
          <h2 id="ct-h" style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 650 }}>
            Contact and sign-in
          </h2>
          <div className="ob-grid">
            <div className="uc-field">
              <label className="uc-label" htmlFor="iemail">
                Email
                <Req />
              </label>
              <input id="iemail" className="uc-input" type="email" defaultValue="eric.mugisha@gmail.com" required autoComplete="email" />
              <span className="ob-hint">Your sign-in. We send a code to verify it.</span>
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="iphone">
                Mobile phone
                <Req />
              </label>
              <input
                id="iphone"
                className="uc-input"
                type="tel"
                defaultValue="+250 722 000 318"
                required
                autoComplete="tel"
                style={{ fontFamily: "var(--font-mono)" }}
              />
              <span className="ob-hint">We send a code by SMS to verify it.</span>
            </div>
            <div className="uc-field span2">
              <label className="uc-label" htmlFor="idistrict">
                District you live in
              </label>
              <Select id="idistrict" label="District you live in" options={["Huye", "Gasabo", "Musanze"]} style={{ maxWidth: 320 }} />
            </div>
            <PasswordField
              id="ipw"
              label={
                <>
                  Create a password
                  <Req />
                </>
              }
            />
          </div>
        </section>

        <StepActions back="/register" nextLabel="Send verification codes" />
      </StepForm>
    </RegLayout>
  );
}
