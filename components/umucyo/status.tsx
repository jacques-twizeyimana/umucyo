import type { ReactNode } from "react";
import { cx } from "./button";
import { Icon, type IconName } from "./icon";

export type TenderStatus = "open" | "closing" | "amended" | "closed" | "awarded" | "cancelled";
export type BadgeStatus = TenderStatus | "neutral";

const STATUS: Record<BadgeStatus, { icon: IconName | null; text: string }> = {
  open: { icon: "dot", text: "Open" },
  closing: { icon: "clock", text: "Closing soon" },
  closed: { icon: "lock", text: "Closed" },
  awarded: { icon: "award", text: "Awarded" },
  cancelled: { icon: "x-circle", text: "Cancelled" },
  amended: { icon: "edit", text: "Amended" },
  neutral: { icon: null, text: "" },
};

/** Status always comes with a word and an icon — never colour alone. */
export function StatusBadge({ status = "neutral", children }: { status?: BadgeStatus; children?: ReactNode }) {
  const s = STATUS[status] ?? STATUS.neutral;
  return (
    <span className={cx("uc-badge", `uc-badge-${status}`)}>
      {s.icon ? <Icon name={s.icon} size={14} strokeWidth={2} /> : null}
      {children ?? s.text}
    </span>
  );
}

export function Countdown({ daysLeft }: { daysLeft?: number }) {
  if (daysLeft == null) return null;
  const cls = daysLeft < 0 ? "uc-countdown-over" : daysLeft <= 7 ? "uc-countdown-soon" : "";
  const text =
    daysLeft < 0 ? "Closed" : daysLeft === 0 ? "Closes today" : daysLeft === 1 ? "1 day left" : `${daysLeft} days left`;
  return (
    <span className={cx("uc-countdown", cls)}>
      <Icon name="clock" size={13} strokeWidth={2.2} />
      {text}
    </span>
  );
}

/** Deadlines are always an absolute date and time; the countdown is extra information. */
export function Deadline({
  date,
  iso,
  daysLeft,
  label = "Submission deadline",
}: {
  date: string;
  iso?: string;
  daysLeft?: number;
  label?: string;
}) {
  return (
    <div className="uc-deadline">
      <span className="uc-deadline-label">{label}</span>
      <time className="uc-deadline-date" dateTime={iso}>
        {date}
      </time>
      <Countdown daysLeft={daysLeft} />
    </div>
  );
}

export function Chip({
  selected,
  count,
  onClick,
  children,
}: {
  selected?: boolean;
  count?: number;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" className="uc-chip" aria-pressed={selected ? "true" : "false"} onClick={onClick}>
      {selected ? <Icon name="check" size={16} strokeWidth={2} /> : null}
      {children}
      {count != null ? <span className="uc-chip-count">{count}</span> : null}
    </button>
  );
}
