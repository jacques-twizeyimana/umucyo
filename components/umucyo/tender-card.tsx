"use client";

import Link from "next/link";
import { useState } from "react";
import type { TenderCardData } from "@/lib/data";
import { Button } from "./button";
import { Icon } from "./icon";
import { Deadline, StatusBadge } from "./status";

export function TenderCard({ tender: t }: { tender: TenderCardData }) {
  const [saved, setSaved] = useState(!!t.saved);
  const status = t.status ?? (t.daysLeft != null && t.daysLeft <= 7 ? "closing" : "open");
  const meta = (
    [
      ["Category", t.category],
      ["Method", t.method],
      ["Estimated value", t.budget],
      ["Location", t.location],
    ] as const
  ).filter((m) => !!m[1]);
  const href = t.href ?? "#";
  return (
    <article className="uc-card uc-tender">
      <div className="uc-tender-top">
        <StatusBadge status={status} />
        <span className="uc-tender-ref">
          <span className="uc-ref">{t.ref}</span>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            icon="bookmark"
            aria-label={saved ? `Saved: ${t.title}` : `Save tender: ${t.title}`}
            aria-pressed={saved ? "true" : "false"}
            onClick={() => setSaved((s) => !s)}
          />
        </span>
      </div>
      <h3 className="uc-tender-title">
        <Link href={href}>{t.title}</Link>
      </h3>
      <p className="uc-tender-entity">
        <Icon name="building" size={16} />
        {t.entity}
      </p>
      {meta.length ? (
        <dl className="uc-meta">
          {meta.map((m) => (
            <div key={m[0]}>
              <dt>{m[0]}</dt>
              <dd>{m[1]}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <div className="uc-tender-foot">
        <Deadline
          date={t.deadline}
          iso={t.deadlineIso}
          daysLeft={t.daysLeft}
          label={status === "awarded" ? "Awarded on" : "Deadline"}
        />
        <div className="uc-tender-actions">
          <Button variant="secondary" size="sm" iconRight="arrow-right" href={href}>
            {status === "awarded" ? "See award" : "View tender"}
            <span className="uc-sr">: {t.title}</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
