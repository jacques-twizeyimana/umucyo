"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Button, Notice, StatusBadge } from "@/components/umucyo";

export function OtpInput({ label, value, onChange, disabled }: { label: string; value: string[]; onChange?: (v: string[]) => void; disabled?: boolean }) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);
  return (
    <div className="ob-otp" role="group" aria-label={label}>
      {value.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className={d ? "filled" : undefined}
          value={d}
          aria-label={`Digit ${i + 1}`}
          inputMode="numeric"
          autoComplete={i === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          onChange={(e) => {
            const ch = e.target.value.replace(/\D/g, "").slice(-1);
            const next = [...value];
            next[i] = ch;
            onChange?.(next);
            if (ch && i < value.length - 1) refs.current[i + 1]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
          }}
          onPaste={(e) => {
            const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, value.length).split("");
            if (!digits.length) return;
            e.preventDefault();
            const next = [...value];
            digits.forEach((dd, k) => (next[k] = dd));
            onChange?.(next);
            refs.current[Math.min(digits.length, value.length - 1)]?.focus();
          }}
        />
      ))}
    </div>
  );
}

export function VerifyStep({ email, phone, back }: { email: string; phone: string; back: string }) {
  const [code, setCode] = useState(["2", "7", "5", "3", "", ""]);
  const [phoneDone, setPhoneDone] = useState(false);
  const complete = code.every(Boolean);

  return (
    <>
      <section className="ob-card" aria-labelledby="ve-h" style={{ gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <h2 id="ve-h" style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
              Email
            </h2>
            <p style={{ margin: "2px 0 0", fontFamily: "var(--font-mono)", fontSize: 14, overflowWrap: "anywhere" }}>{email}</p>
          </div>
          <StatusBadge status="open">Verified</StatusBadge>
        </div>
        <OtpInput label="Email code" value={["4", "8", "1", "9", "0", "6"]} disabled />
      </section>

      <section className="ob-card" aria-labelledby="vp-h" style={{ gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
          <div>
            <h2 id="vp-h" style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
              Phone (SMS)
            </h2>
            <p style={{ margin: "2px 0 0", fontFamily: "var(--font-mono)", fontSize: 14 }}>
              {phone} ·{" "}
              <Link href={back} style={{ fontFamily: "var(--font-sans)" }}>
                Change
              </Link>
            </p>
          </div>
          <span aria-live="polite">
            {phoneDone ? <StatusBadge status="open">Verified</StatusBadge> : <StatusBadge status="closing">Waiting for code</StatusBadge>}
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <OtpInput label="SMS code" value={code} onChange={setCode} disabled={phoneDone} />
          {phoneDone ? null : (
            <Button variant="secondary" onClick={() => setPhoneDone(true)} disabled={!complete}>
              Verify code
            </Button>
          )}
        </div>
        <p className="ob-hint" style={{ margin: 0 }}>
          {phoneDone ? (
            "Phone verified."
          ) : (
            <>
              Didn’t get it? <span style={{ fontFamily: "var(--font-mono)" }}>Resend in 0:42</span> · <a href="#">Call me with the code instead</a>
              {complete ? null : " · Enter the last 2 digits to continue."}
            </>
          )}
        </p>
      </section>

      <Notice tone="info" title="Never share these codes">
        RPPA staff will never ask you for a verification code, by phone or by email.
      </Notice>

      <div className="ob-actions">
        <Button variant="ghost" icon="arrow-left" href={back}>
          Back
        </Button>
        {phoneDone ? (
          <Button variant="primary" size="lg" iconRight="arrow-right" href="/register/done">
            Create my account
          </Button>
        ) : (
          <Button variant="primary" size="lg" disabled>
            Create my account
          </Button>
        )}
      </div>
    </>
  );
}
