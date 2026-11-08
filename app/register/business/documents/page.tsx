import type { Metadata } from "next";
import { FileUpload, StepActions, StepForm } from "@/components/register/parts";
import { RegLayout, Req } from "@/components/register/shell";
import { Icon, Notice } from "@/components/umucyo";

export const metadata: Metadata = { title: "Register — documents" };

export default function BusinessDocumentsPage() {
  return (
    <RegLayout
      type="business"
      step={3}
      title="Documents"
      lead="Upload clear scans or photos. PDF, JPG or PNG, up to 10 MB each. You can reuse these in every bid."
    >
      <StepForm next="/register/business/contact">
        <div className="ob-card">
          {/* RDB */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
                RDB registration documents
                <Req />
              </h2>
              <p className="ob-hint" style={{ margin: "4px 0 0" }}>
                Your certificate of registration from the Rwanda Development Board. Add the company extract too if you have it.
              </p>
            </div>
            <FileUpload id="rdb" initial={{ name: "RDB_certificate_IkazeDigital.pdf", meta: "PDF · 1.2 MB · uploaded just now" }} />
            <div className="ob-file">
              <span className="pg-tile-icon" style={{ width: 40, height: 40, flex: "none" }}>
                <Icon name="file" size={20} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 15 }}>Company_extract_2026.pdf</p>
                <p className="uc-ref" style={{ margin: 0 }}>
                  Uploading · 64%
                </p>
                <div
                  className="app-progress"
                  style={{ marginTop: 8 }}
                  role="progressbar"
                  aria-valuenow={64}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Upload progress"
                >
                  <span style={{ width: "64%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Tax clearance */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
                Tax clearance certificate — fiscal year 2025/26
                <Req />
              </h2>
              <p className="ob-hint" style={{ margin: "4px 0 0" }}>
                Issued by the Rwanda Revenue Authority (RRA) for the last fiscal year (1 July 2025 – 30 June 2026).
              </p>
            </div>
            <FileUpload id="taxfile" />
            <div className="ob-grid">
              <div className="uc-field">
                <label className="uc-label" htmlFor="taxno">
                  Certificate number
                </label>
                <input id="taxno" className="uc-input" placeholder="As printed on the certificate" />
              </div>
              <div className="uc-field">
                <label className="uc-label" htmlFor="taxexp">
                  Valid until
                  <Req />
                </label>
                <input id="taxexp" className="uc-input" placeholder="DD/MM/YYYY" required pattern="\d{2}/\d{2}/\d{4}" />
                <span className="ob-hint">We remind you 30 days before it expires.</span>
              </div>
            </div>
          </div>

          {/* Optional */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingTop: 24, borderTop: "1px solid var(--line)" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
                Other licences and certificates <span style={{ fontWeight: 500, color: "var(--ink-muted)" }}>(optional)</span>
              </h2>
              <p className="ob-hint" style={{ margin: "4px 0 0" }}>
                Professional licences, contractor category, social security clearance. Many tenders ask for them, so adding them
                now saves time later.
              </p>
            </div>
            <FileUpload id="other" />
          </div>
        </div>

        <Notice tone="info" title="What happens to these documents">
          RPPA checks them before you can submit bids. You can browse, watch tenders and set alerts straight away.
        </Notice>

        <StepActions back="/register/business" nextLabel="Continue" />
      </StepForm>
    </RegLayout>
  );
}
