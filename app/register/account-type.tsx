"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Icon, type IconName } from "@/components/umucyo";

type Kind = "business" | "individual";

const CHOICES: { key: Kind; icon: IconName; title: string; desc: string; needs: string[] }[] = [
  {
    key: "business",
    icon: "building",
    title: "A business",
    desc: "A company, cooperative, partnership or other registered entity. Your representative signs bids on its behalf.",
    needs: [
      "Legal name and trading name",
      "TIN and legal structure",
      "RDB registration documents",
      "Tax clearance for the last fiscal year",
      "Representative’s details (CEO, owner or president)",
    ],
  },
  {
    key: "individual",
    icon: "check-circle",
    title: "An individual",
    desc: "A consultant, freelancer or sole trader bidding in your own name, where the tender allows it.",
    needs: ["Your names as on your ID", "Your TIN", "Tax clearance for the last fiscal year", "Your email and phone number"],
  },
];

export function AccountTypeChooser() {
  const [kind, setKind] = useState<Kind>("business");
  return (
    <>
      <fieldset style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
        <legend className="uc-sr">Account type</legend>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: 20 }}>
          {CHOICES.map((c) => (
            <label key={c.key} className="ob-choice" data-checked={String(kind === c.key)}>
              <input type="radio" name="acct" className="uc-sr" checked={kind === c.key} onChange={() => setKind(c.key)} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span className="pg-tile-icon">
                  <Icon name={c.icon} size={22} />
                </span>
                <span aria-hidden="true" className="ob-radio" />
              </div>
              <div>
                <h2 style={{ margin: "0 0 4px", fontFamily: "var(--font-display)", fontSize: 22, lineHeight: "28px", fontWeight: 650 }}>
                  {c.title}
                </h2>
                <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 15, lineHeight: "22px" }}>{c.desc}</p>
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}>
                <p
                  style={{
                    margin: "0 0 8px",
                    font: "600 12px/16px var(--font-sans)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--ink-muted)",
                  }}
                >
                  Have ready
                </p>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: "22px" }}>
                  {c.needs.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="uc-notice uc-notice-info" role="status">
        <Icon name="info" size={22} />
        <div>
          <p className="uc-notice-title">We verify your email and phone</p>
          <div className="uc-notice-body">
            At the end, we send a 6-digit code to each. Use an email and a phone number you can reach right now.
          </div>
        </div>
      </div>

      <div className="ob-actions">
        <Link href="/">Cancel</Link>
        <Button
          variant="primary"
          size="lg"
          iconRight="arrow-right"
          href={kind === "business" ? "/register/business" : "/register/individual"}
        >
          Continue as {kind === "business" ? "a business" : "an individual"}
        </Button>
      </div>
    </>
  );
}
