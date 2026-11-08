"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Button, Icon } from "@/components/umucyo";

/** A form that runs native validation, then moves to the next onboarding step. */
export function StepForm({ next, children }: { next: string; children: ReactNode }) {
  const router = useRouter();
  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 24 }}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(next);
      }}
    >
      {children}
    </form>
  );
}

export function StepActions({ back, nextLabel }: { back: string; nextLabel: string }) {
  return (
    <div className="ob-actions">
      <Button variant="ghost" icon="arrow-left" href={back}>
        Back
      </Button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
        <span className="ob-hint">Saved just now</span>
        <Button variant="primary" size="lg" type="submit" iconRight="arrow-right">
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}

/** Password field with a live strength hint (12+ characters, not a common password). */
export function PasswordField({ id, label }: { id: string; label: ReactNode }) {
  const [pw, setPw] = useState("");
  const common = ["password", "123456789012", "qwertyuiopas", "umucyo123456"];
  const strong = pw.length >= 12 && !common.includes(pw.toLowerCase());
  return (
    <div className="uc-field span2">
      <label className="uc-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="uc-input"
        type="password"
        autoComplete="new-password"
        minLength={12}
        required
        placeholder="12 characters or more"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        aria-describedby={`${id}-hint`}
      />
      {strong ? (
        <span id={`${id}-hint`} className="ob-verified">
          <Icon name="check-circle" size={16} />
          Strong: 12+ characters, not a common password
        </span>
      ) : (
        <span id={`${id}-hint`} className="ob-hint">
          {pw.length ? `${12 - Math.min(pw.length, 12)} more characters needed` : "Use 12 characters or more. A short sentence works well."}
        </span>
      )}
    </div>
  );
}

/** An uploaded file row, or a drop zone that turns into one when a file is chosen. */
export function FileUpload({
  id,
  initial,
  accept = ".pdf,.jpg,.jpeg,.png",
}: {
  id: string;
  initial?: { name: string; meta: string };
  accept?: string;
}) {
  const [file, setFile] = useState<{ name: string; meta: string } | null>(initial ?? null);
  if (file) {
    return (
      <div className="ob-file">
        <span className="pg-tile-icon" style={{ width: 40, height: 40, flex: "none" }}>
          <Icon name="file" size={20} />
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontWeight: 600, fontSize: 15, overflowWrap: "anywhere" }}>{file.name}</p>
          <p className="uc-ref" style={{ margin: 0 }}>
            {file.meta}
          </p>
        </div>
        <span className="ob-verified pg-hide-sm">
          <Icon name="check-circle" size={16} />
          Uploaded
        </span>
        <Button variant="ghost" size="sm" onClick={() => setFile(null)} aria-label={`Replace ${file.name}`}>
          Replace
        </Button>
      </div>
    );
  }
  return (
    <label className="ob-drop" htmlFor={id} style={{ cursor: "pointer" }}>
      <span className="pg-tile-icon" style={{ flex: "none" }}>
        <Icon name="download" size={22} />
      </span>
      <span style={{ flex: 1 }}>
        <strong style={{ display: "block", fontSize: 15 }}>Drag your file here, or choose a file</strong>
        <span className="ob-hint">PDF, JPG or PNG · max 10 MB</span>
      </span>
      <span className="uc-btn uc-btn-secondary uc-btn-sm pg-hide-sm">Choose file</span>
      <input
        id={id}
        type="file"
        className="uc-sr"
        accept={accept}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          const ext = f.name.split(".").pop()?.toUpperCase() ?? "FILE";
          setFile({ name: f.name, meta: `${ext} · ${(f.size / 1_048_576).toFixed(1)} MB · uploaded just now` });
        }}
      />
    </label>
  );
}

export function TermsHint() {
  return (
    <p className="ob-hint" style={{ margin: 0 }}>
      By continuing you accept the <Link href="/terms">Terms of use</Link> and confirm you have read the{" "}
      <Link href="/privacy">Privacy policy</Link>.
    </p>
  );
}
