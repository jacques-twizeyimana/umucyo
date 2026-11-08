"use client";

import { useState } from "react";
import { Icon } from "@/components/umucyo";

export function WatchButton({ initial = false, size = "sm", title }: { initial?: boolean; size?: "sm" | "md"; title: string }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      type="button"
      className={`uc-btn ${size === "sm" ? "uc-btn-sm " : ""}${on ? "uc-btn-secondary" : "uc-btn-ghost"}`}
      aria-pressed={on}
      onClick={() => setOn(!on)}
    >
      <Icon name="bookmark" size={size === "sm" ? 16 : 18} />
      {on ? "Watching" : "Watch"}
      <span className="uc-sr">: {title}</span>
    </button>
  );
}
