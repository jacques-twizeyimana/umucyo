import type { Metadata } from "next";
import { PasswordField, StepActions, StepForm } from "@/components/register/parts";
import { RegLayout, Req } from "@/components/register/shell";
import { Select } from "@/components/umucyo";
import { Representative } from "./representative";

export const metadata: Metadata = { title: "Register — contact & representative" };

export default function BusinessContactPage() {
  return (
    <RegLayout
      type="business"
      step={4}
      title="Contact & representative"
      lead="Where we send alerts and receipts, and who can sign bids for Ikaze Digital Ltd."
    >
      <StepForm next="/register/business/verify">
        <section className="ob-card" aria-labelledby="c-h">
          <h2 id="c-h" style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 650 }}>
            Business contact
          </h2>
          <div className="ob-grid">
            <div className="uc-field">
              <label className="uc-label" htmlFor="bemail">
                Business email
                <Req />
              </label>
              <input id="bemail" className="uc-input" type="email" defaultValue="tenders@ikazelabs.rw" required autoComplete="email" />
              <span className="ob-hint">This is your sign-in. We send a code to verify it.</span>
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="bphone">
                Business phone
                <Req />
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                <span
                  className="uc-input"
                  aria-hidden="true"
                  style={{
                    width: 84,
                    flex: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "var(--surface-sunk)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  +250
                </span>
                <input
                  id="bphone"
                  className="uc-input"
                  type="tel"
                  defaultValue="788 000 412"
                  required
                  aria-describedby="bphone-hint"
                  style={{ fontFamily: "var(--font-mono)" }}
                />
              </div>
              <span id="bphone-hint" className="ob-hint">
                Rwanda (+250). We send a code by SMS to verify it.
              </span>
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="web">
                Website
              </label>
              <input id="web" className="uc-input" defaultValue="ikazelabs.rw" autoComplete="url" />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="lang">
                Preferred language
              </label>
              <Select id="lang" label="Preferred language" options={["English", "Kinyarwanda", "Français"]} />
            </div>
            <PasswordField
              id="pw"
              label={
                <>
                  Create a password
                  <Req />
                </>
              }
            />
          </div>
        </section>

        <Representative />

        <StepActions back="/register/business/documents" nextLabel="Send verification codes" />
      </StepForm>
    </RegLayout>
  );
}
