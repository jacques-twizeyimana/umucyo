"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { OtpInput } from "@/components/register/verify";
import { Button, Icon, Notice } from "@/components/umucyo";

type Step = "credentials" | "code" | "reset" | "reset-sent";

const EMPTY_CODE = ["", "", "", "", "", ""];

/** "+250 788 000 412" → "+250 ••• ••• 412"; emails keep their first letter and domain. */
function mask(id: string) {
  const v = id.trim();
  if (v.includes("@")) {
    const [name, domain] = v.split("@");
    return `${name.slice(0, 1)}${"•".repeat(Math.max(2, name.length - 1))}@${domain}`;
  }
  const digits = v.replace(/\D/g, "");
  return `+250 ••• ••• ${digits.slice(-3) || "412"}`;
}

const isPhone = (v: string) => /^[+\d][\d\s-]{6,}$/.test(v.trim());

export function SignInForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("credentials");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ id?: string; pw?: string }>({});
  const [code, setCode] = useState(EMPTY_CODE);
  const [resent, setResent] = useState(false);
  const [busy, setBusy] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new heading when the step changes, so screen readers announce it.
  useEffect(() => {
    if (step !== "credentials") headingRef.current?.focus();
  }, [step]);

  const validId = (v: string) => /\S+@\S+\.\S+/.test(v.trim()) || isPhone(v);

  const submitCredentials = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!id.trim()) next.id = "Enter the email or phone number you registered with.";
    else if (!validId(id)) next.id = "Enter a valid email address, or a phone number such as +250 788 000 412.";
    if (!pw) next.pw = "Enter your password.";
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(next.id ? "si-id" : "si-pw")?.focus();
      return;
    }
    setCode(EMPTY_CODE);
    setResent(false);
    setStep("code");
  };

  const submitCode = (e: FormEvent) => {
    e.preventDefault();
    if (!code.every(Boolean)) return;
    setBusy(true);
    router.push("/dashboard");
  };

  const submitReset = (e: FormEvent) => {
    e.preventDefault();
    if (!validId(id)) {
      setErrors({ id: "Enter a valid email address or phone number." });
      document.getElementById("rs-id")?.focus();
      return;
    }
    setErrors({});
    setStep("reset-sent");
  };

  const heading = (text: string) => (
    <h1 ref={headingRef} tabIndex={-1} className="uc-h1 si-title">
      {text}
    </h1>
  );

  if (step === "code") {
    const complete = code.every(Boolean);
    return (
      <form className="ob-card si-card" onSubmit={submitCode} noValidate>
        <div>
          <p className="uc-eyebrow">Step 2 of 2 · Verify it’s you</p>
          {heading("Enter your 6-digit code")}
          <p className="uc-lead si-lead">
            We sent a code by SMS to the phone on your account,{" "}
            <strong style={{ color: "var(--ink)", fontFamily: "var(--font-mono)" }}>{isPhone(id) ? mask(id) : "+250 ••• ••• 412"}</strong>. It
            expires after 10 minutes.
          </p>
        </div>
        <OtpInput label="Verification code" value={code} onChange={setCode} />
        <p className="ob-hint" style={{ margin: 0 }} aria-live="polite">
          {resent ? (
            "We sent a new code."
          ) : (
            <>
              Didn’t get it?{" "}
              <button type="button" className="uc-btn uc-btn-link" style={{ fontSize: 13 }} onClick={() => setResent(true)}>
                Send a new code
              </button>{" "}
              · <a href="tel:3131">Call 3131</a>
            </>
          )}
        </p>
        <Button variant="primary" size="lg" full type="submit" iconRight="arrow-right" disabled={!complete || busy}>
          {busy ? "Signing you in…" : "Verify and sign in"}
        </Button>
        <Notice tone="info" title="Never share this code">
          RPPA staff will never ask you for a verification code, by phone or by email.
        </Notice>
        <button type="button" className="uc-btn uc-btn-ghost" onClick={() => setStep("credentials")}>
          <Icon name="arrow-left" size={18} />
          Use a different account
        </button>
      </form>
    );
  }

  if (step === "reset" || step === "reset-sent") {
    return (
      <form className="ob-card si-card" onSubmit={submitReset} noValidate>
        <div>
          <p className="uc-eyebrow">Account recovery</p>
          {heading(step === "reset" ? "Reset your password" : "Check your email or phone")}
          <p className="uc-lead si-lead">
            {step === "reset"
              ? "Enter the email or phone number on your account. We’ll send you a link to choose a new password."
              : `If an account exists for ${id.trim()}, we sent a reset link. It expires after 30 minutes.`}
          </p>
        </div>
        {step === "reset" ? (
          <>
            <div className="uc-field">
              <label className="uc-label" htmlFor="rs-id">
                Email or phone number
              </label>
              <input
                id="rs-id"
                className="uc-input"
                autoComplete="username"
                value={id}
                onChange={(e) => setId(e.target.value)}
                aria-invalid={!!errors.id}
                aria-describedby={errors.id ? "rs-id-err" : undefined}
              />
              {errors.id ? (
                <span id="rs-id-err" className="si-error">
                  <Icon name="alert" size={16} />
                  {errors.id}
                </span>
              ) : null}
            </div>
            <Button variant="primary" size="lg" full type="submit">
              Send reset link
            </Button>
          </>
        ) : (
          <Notice tone="success" title="Reset link sent">
            Didn’t receive it within a few minutes? Check your spam folder, or call 3131 and we’ll help you get back in.
          </Notice>
        )}
        <button type="button" className="uc-btn uc-btn-ghost" onClick={() => setStep("credentials")}>
          <Icon name="arrow-left" size={18} />
          Back to sign in
        </button>
      </form>
    );
  }

  return (
    <form className="ob-card si-card" onSubmit={submitCredentials} noValidate>
      <div>
        <p className="uc-eyebrow">Supplier account</p>
        <h1 className="uc-h1 si-title">Sign in to Umucyo</h1>
        <p className="uc-lead si-lead">Track your bids, the tenders you watch and your alerts.</p>
      </div>

      {errors.id || errors.pw ? (
        <Notice tone="danger" title="Check the highlighted fields">
          {[errors.id, errors.pw].filter(Boolean).join(" ")}
        </Notice>
      ) : null}

      <div className="uc-field">
        <label className="uc-label" htmlFor="si-id">
          Email or phone number
        </label>
        <input
          id="si-id"
          className="uc-input"
          autoComplete="username"
          inputMode="email"
          placeholder="e.g. tenders@company.rw"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            if (errors.id) setErrors({ ...errors, id: undefined });
          }}
          aria-invalid={!!errors.id}
          aria-describedby={errors.id ? "si-id-err" : undefined}
        />
        {errors.id ? (
          <span id="si-id-err" className="si-error">
            <Icon name="alert" size={16} />
            {errors.id}
          </span>
        ) : null}
      </div>

      <div className="uc-field">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <label className="uc-label" htmlFor="si-pw">
            Password
          </label>
          <button
            type="button"
            className="uc-btn uc-btn-link"
            style={{ fontSize: 14 }}
            onClick={() => {
              setErrors({});
              setStep("reset");
            }}
          >
            Forgot your password?
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <input
            id="si-pw"
            className="uc-input"
            type={showPw ? "text" : "password"}
            autoComplete="current-password"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value);
              if (errors.pw) setErrors({ ...errors, pw: undefined });
            }}
            aria-invalid={!!errors.pw}
            aria-describedby={errors.pw ? "si-pw-err" : undefined}
            style={{ paddingRight: 84 }}
          />
          <button
            type="button"
            className="uc-btn uc-btn-ghost uc-btn-sm si-reveal"
            aria-pressed={showPw}
            aria-controls="si-pw"
            onClick={() => setShowPw(!showPw)}
          >
            {showPw ? "Hide" : "Show"}
            <span className="uc-sr"> password</span>
          </button>
        </div>
        {errors.pw ? (
          <span id="si-pw-err" className="si-error">
            <Icon name="alert" size={16} />
            {errors.pw}
          </span>
        ) : null}
      </div>

      <label className="pg-check">
        <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
        <span>Keep me signed in on this device for 30 days</span>
      </label>

      <Button variant="primary" size="lg" full type="submit" iconRight="arrow-right">
        Sign in
      </Button>

      <p style={{ margin: 0, paddingTop: 16, borderTop: "1px solid var(--line)", fontSize: 15, textAlign: "center" }}>
        New to Umucyo?{" "}
        <Link href="/register" style={{ fontWeight: 600 }}>
          Create your supplier account
        </Link>
      </p>
    </form>
  );
}
