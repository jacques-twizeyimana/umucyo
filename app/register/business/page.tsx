import type { Metadata } from "next";
import { StepActions, StepForm } from "@/components/register/parts";
import { RegLayout, Req } from "@/components/register/shell";
import { Icon, Select } from "@/components/umucyo";

export const metadata: Metadata = { title: "Register — business details" };

const STRUCTURES = [
  "Private company limited by shares (Ltd)",
  "Public limited company (PLC)",
  "Company limited by guarantee",
  "Sole proprietorship",
  "Partnership",
  "Cooperative",
  "Branch of a foreign company",
  "Other",
];

export default function BusinessDetailsPage() {
  return (
    <RegLayout
      type="business"
      step={2}
      title="Business details"
      lead="Use the details exactly as they appear on your RDB registration and RRA records."
    >
      <StepForm next="/register/business/documents">
        <div className="ob-card">
          <div className="ob-grid">
            <div className="uc-field span2">
              <label className="uc-label" htmlFor="legal">
                Legal name
                <Req />
              </label>
              <input id="legal" className="uc-input" defaultValue="Ikaze Digital Ltd" required autoComplete="organization" />
              <span className="ob-hint">As registered with RDB, including “Ltd”, “PLC” or “Cooperative”.</span>
            </div>
            <div className="uc-field span2">
              <label className="uc-label" htmlFor="dba">
                Business name (doing business as)
              </label>
              <input id="dba" className="uc-input" defaultValue="Ikaze Labs" />
              <span className="ob-hint">Optional. The name customers know you by, if different.</span>
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="tin">
                TIN (Tax Identification Number)
                <Req />
              </label>
              <input
                id="tin"
                className="uc-input"
                defaultValue="108 452 931"
                inputMode="numeric"
                required
                style={{ fontFamily: "var(--font-mono)" }}
              />
              <span className="ob-verified">
                <Icon name="check-circle" size={16} />
                Matches RRA record: Ikaze Digital Ltd
              </span>
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="struct">
                Legal structure
                <Req />
              </label>
              <Select id="struct" label="Legal structure" options={STRUCTURES} />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="regdate">
                Date of incorporation
              </label>
              <input id="regdate" className="uc-input" defaultValue="14/03/2023" placeholder="DD/MM/YYYY" />
              <span className="ob-hint">DD/MM/YYYY, from your RDB certificate.</span>
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="sector">
                Main business activity
              </label>
              <input id="sector" className="uc-input" defaultValue="Software development and IT services" />
            </div>

            <p className="ob-section span2">Registered address</p>
            <div className="uc-field">
              <label className="uc-label" htmlFor="prov">
                Province / City
                <Req />
              </label>
              <Select
                id="prov"
                label="Province / City"
                options={["City of Kigali", "Northern Province", "Southern Province", "Eastern Province", "Western Province"]}
              />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="dist">
                District
                <Req />
              </label>
              <Select id="dist" label="District" options={["Gasabo", "Kicukiro", "Nyarugenge"]} />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="sect">
                Sector
                <Req />
              </label>
              <input id="sect" className="uc-input" defaultValue="Kimihurura" required />
            </div>
            <div className="uc-field">
              <label className="uc-label" htmlFor="cell">
                Cell
              </label>
              <input id="cell" className="uc-input" defaultValue="Rugando" />
            </div>
            <div className="uc-field span2">
              <label className="uc-label" htmlFor="street">
                Street address
              </label>
              <input id="street" className="uc-input" defaultValue="KG 7 Ave, Building 12, 2nd floor" autoComplete="street-address" />
              <span className="ob-hint">Street number and building, if you have one. A P.O. box alone is not enough.</span>
            </div>
          </div>
        </div>
        <StepActions back="/register" nextLabel="Continue to documents" />
      </StepForm>
    </RegLayout>
  );
}
