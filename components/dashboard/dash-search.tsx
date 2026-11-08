"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/umucyo";

export function DashSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form
      role="search"
      className="app-search"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(q.trim() ? `/tenders?q=${encodeURIComponent(q.trim())}` : "/tenders");
      }}
    >
      <Icon name="search" size={18} />
      <label htmlFor="dash-q" className="uc-sr">
        Search tenders
      </label>
      <input
        id="dash-q"
        className="uc-input"
        type="search"
        placeholder="Search tenders, entities or reference numbers"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
}
