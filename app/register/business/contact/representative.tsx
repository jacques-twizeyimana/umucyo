"use client";

import { useState } from "react";
import { Req } from "@/components/register/shell";
import { FileUpload } from "@/components/register/parts";
import { Select } from "@/components/umucyo";

const ROLES = ["CEO", "Owner", "President"] as const;

export function Representative() {
  const [role, setRole] = useState<(typeof ROLES)[number]>("CEO");
  const [onBehalf, setOnBehalf] = useState(false);
  return (
    <section className="ob-card" aria-labelledby="r-h">
      <div>
        <h2 id="r-h" style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 650 }}>
          Representative
        </h2>
        <p className="ob-hint" style={{ margin: "4px 0 0", fontSize: 14 }}>
          The person legally responsible for the business. Bids are signed in their name.
        </p>
      </div>
      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend className="uc-label" style={{ marginBottom: 8 }}>
          Role
          <Req />
        </legend>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {ROLES.map((r) => (
            <label key={r} className="uc-chip" aria-pressed={role === r ? "true" : "false"} style={{ padding: "0 20px" }}>
              <input type="radio" name="role" className="uc-sr" checked={role === r} onChange={() => setRole(r)} />
              {r}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="ob-grid">
        <div className="uc-field">
          <label className="uc-label" htmlFor="rfirst">
            First name
            <Req />
          </label>
          <input id="rfirst" className="uc-input" defaultValue="Aline" required autoComplete="given-name" />
        </div>
        <div className="uc-field">
          <label className="uc-label" htmlFor="rlast">
            Last name
            <Req />
          </label>
          <input id="rlast" className="uc-input" defaultValue="Uwase" required autoComplete="family-name" />
        </div>
        <div className="uc-field">
          <label className="uc-label" htmlFor="rid">
            National ID or passport number
            <Req />
          </label>
          <input id="rid" className="uc-input" defaultValue="1 1996 8 0012345 0 12" required style={{ fontFamily: "var(--font-mono)" }} />
        </div>
        <div className="uc-field">
          <label className="uc-label" htmlFor="rnat">
            Nationality
          </label>
          <Select id="rnat" label="Nationality" options={["Rwandan", "Other"]} />
        </div>
        <div className="uc-field">
          <label className="uc-label" htmlFor="remail">
            Email
            <Req />
          </label>
          <input id="remail" className="uc-input" type="email" defaultValue="aline@ikazelabs.rw" required autoComplete="email" />
        </div>
        <div className="uc-field">
          <label className="uc-label" htmlFor="rphone">
            Mobile phone
            <Req />
          </label>
          <input
            id="rphone"
            className="uc-input"
            type="tel"
            defaultValue="+250 788 000 977"
            required
            autoComplete="tel"
            style={{ fontFamily: "var(--font-mono)" }}
          />
        </div>
      </div>

      <label className="pg-check" style={{ alignItems: "flex-start", paddingTop: 8, borderTop: "1px solid var(--line)" }}>
        <input type="checkbox" checked={onBehalf} onChange={() => setOnBehalf(!onBehalf)} style={{ marginTop: 2 }} />
        <span>
          I am registering on behalf of the representative
          <br />
          <span className="ob-hint">For example, an operations manager setting up the account.</span>
        </span>
      </label>
      {onBehalf ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, borderRadius: "var(--radius-md)", background: "var(--sun-soft)" }}>
          <strong style={{ fontSize: 15 }}>Upload a signed authorisation letter</strong>
          <span className="ob-hint" style={{ color: "var(--ink)" }}>
            Signed by {role === "CEO" ? "the CEO," : role === "Owner" ? "the owner," : "the president,"} Aline Uwase, naming you as
            the person allowed to manage this account.
          </span>
          <FileUpload id="authletter" />
          <a href="#" style={{ fontSize: 14 }}>
            Download a letter template
          </a>
        </div>
      ) : null}
    </section>
  );
}
