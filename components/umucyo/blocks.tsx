import type { CSSProperties, ReactNode } from "react";
import type { KeyDateItem, RequiredDoc } from "@/lib/data";
import { Button, cx, SmartLink } from "./button";
import { Icon, type IconName } from "./icon";

/* ---------------- KeyDates ---------------- */
export function KeyDates({ items }: { items: KeyDateItem[] }) {
  return (
    <ol className="uc-dates">
      {items.map((it, i) => {
        const kind = it.kind ?? "upcoming";
        const icon: IconName | null =
          kind === "done" ? "check" : kind === "deadline" ? "lock" : kind === "next" ? "arrow-right" : null;
        return (
          <li key={i} className={cx("uc-date", `uc-date-${kind}`)}>
            <span className="uc-date-dot" aria-hidden="true">
              {icon ? <Icon name={icon} size={14} strokeWidth={2.4} /> : null}
            </span>
            <div className="uc-date-body">
              <p className="uc-date-label">
                {it.label}
                {kind === "done" ? <span className="uc-sr"> (passed)</span> : null}
              </p>
              <p className="uc-date-when">
                <time dateTime={it.iso}>{it.when}</time>
              </p>
              {it.note ? <p className="uc-date-note">{it.note}</p> : null}
            </div>
            <div className="uc-date-action">
              {it.action ? (
                <Button variant="ghost" size="sm" icon={it.actionIcon ?? "calendar"} href={it.href ?? "#"}>
                  {it.action}
                </Button>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- DocumentChecklist ---------------- */
export function DocumentChecklist({ items }: { items: RequiredDoc[] }) {
  return (
    <ul className="uc-docs">
      {items.map((d, i) => (
        <li key={i} className={cx("uc-doc", d.done && "uc-doc-done")}>
          <span className="uc-doc-box" aria-hidden="true">
            {d.done ? <Icon name="check" size={14} strokeWidth={2.6} /> : null}
          </span>
          <div>
            <p className="uc-doc-name">
              {d.name}
              {d.done ? <span className="uc-sr"> (ready)</span> : null}
              <span className={cx("uc-badge", d.required === false ? "uc-badge-neutral" : "uc-badge-awarded")}>
                {d.required === false ? "If applicable" : "Required"}
              </span>
            </p>
            {d.note ? <p className="uc-doc-note">{d.note}</p> : null}
            {d.format ? <div className="uc-doc-format uc-ref">{d.format}</div> : null}
          </div>
          {d.template ? (
            <Button variant="link" href={d.href ?? "#"} icon="download">
              {d.template}
            </Button>
          ) : (
            <span />
          )}
        </li>
      ))}
    </ul>
  );
}

/* ---------------- ActionPanel ---------------- */
export function ActionPanel({
  deadline,
  days,
  hours,
  label = "Submission closes",
  cta = "Start your bid",
  ctaHref = "/dashboard/bids/prepare",
  downloadLabel = "Download tender documents",
  footnote = "Bids are accepted only through Umucyo. The system closes submission automatically at the deadline (Kigali time, CAT). Help: call 3131.",
}: {
  deadline: string;
  days?: number;
  hours?: number;
  label?: string;
  cta?: string;
  ctaHref?: string;
  downloadLabel?: string;
  footnote?: string;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <aside className="uc-panel" aria-label="Bid actions">
      <div className="uc-panel-head uc-on-navy">
        <span className="uc-deadline-label">{label}</span>
        <p className="uc-panel-date">{deadline}</p>
        {days != null ? (
          <div className="uc-panel-count" role="timer" aria-label={`${days} days ${hours ?? 0} hours left`}>
            <div>
              <span className="uc-panel-fig">{pad(days)}</span>
              <span className="uc-panel-unit">days</span>
            </div>
            <div>
              <span className="uc-panel-fig">{pad(hours ?? 0)}</span>
              <span className="uc-panel-unit">hours</span>
            </div>
          </div>
        ) : null}
      </div>
      <div className="uc-panel-body">
        <Button variant="primary" size="lg" full iconRight="arrow-right" href={ctaHref}>
          {cta}
        </Button>
        <Button variant="secondary" full icon="download" href="#files">
          {downloadLabel}
        </Button>
        <ul className="uc-panel-list">
          <li>
            <Button variant="ghost" size="sm" icon="question" href="#qa">
              Ask a clarification question
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="sm" icon="calendar" href="#dates">
              Add all dates to my calendar
            </Button>
          </li>
          <li>
            <Button variant="ghost" size="sm" icon="bookmark" href="/dashboard/watchlist">
              Save and get amendment alerts
            </Button>
          </li>
        </ul>
      </div>
      <div className="uc-panel-foot">
        <Icon name="info" size={18} />
        <span>{footnote}</span>
      </div>
    </aside>
  );
}

/* ---------------- Notice ---------------- */
const NOTICE_ICON: Record<string, IconName> = { info: "info", amended: "edit", success: "check-circle", danger: "alert" };

export function Notice({
  tone = "info",
  title,
  children,
  action,
  href = "#",
}: {
  tone?: "info" | "amended" | "success" | "danger";
  title?: string;
  children?: ReactNode;
  action?: string;
  href?: string;
}) {
  return (
    <div className={cx("uc-notice", `uc-notice-${tone}`)} role={tone === "danger" ? "alert" : "status"}>
      <Icon name={NOTICE_ICON[tone]} size={22} />
      <div>
        {title ? <p className="uc-notice-title">{title}</p> : null}
        {children ? <div className="uc-notice-body">{children}</div> : null}
        {action ? (
          <div className="uc-notice-action">
            <Button variant="link" href={href}>
              {action}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* ---------------- Steps ---------------- */
export function Steps({ items }: { items: { title: string; text: string; link?: string; href?: string }[] }) {
  return (
    <ol className="uc-steps">
      {items.map((s, i) => (
        <li key={i} className="uc-step">
          <h3 className="uc-step-title">{s.title}</h3>
          <p className="uc-step-text">{s.text}</p>
          {s.link ? (
            <SmartLink className="uc-step-link" href={s.href ?? "#"}>
              {s.link}
            </SmartLink>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

/* ---------------- Breadcrumbs ---------------- */
export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="uc-crumbs">
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i}>
              {last ? (
                <span aria-current="page">{it.label}</span>
              ) : it.href ? (
                <SmartLink href={it.href}>{it.label}</SmartLink>
              ) : (
                <span>{it.label}</span>
              )}
              {last ? null : <Icon name="chevron-right" size={14} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ---------------- Select (styled native select) ---------------- */
export function Select({
  id,
  label,
  options,
  value,
  defaultValue,
  onChange,
  hideLabel,
  style,
}: {
  id: string;
  label: string;
  options: readonly string[];
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  hideLabel?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className="uc-select-wrap" style={style}>
      <select
        id={id}
        className="uc-select"
        aria-label={hideLabel ? label : undefined}
        value={value}
        defaultValue={value === undefined ? defaultValue : undefined}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Icon name="chevron-down" size={18} />
    </div>
  );
}
