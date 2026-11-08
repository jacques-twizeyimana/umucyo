"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { CATEGORIES, PROVINCES } from "@/lib/data";
import { Button, cx } from "./button";
import { Icon } from "./icon";
import { Select } from "./blocks";

const CATEGORY_OPTIONS = ["All categories", ...CATEGORIES] as const;
const LOCATION_OPTIONS = ["All of Rwanda", ...PROVINCES.filter((p) => p !== "Nationwide")] as const;

export function SearchBar({
  query = "",
  category = "All categories",
  location = "All of Rwanda",
  placeholder = "What can you supply? e.g. laptops, road works, audit",
  cta = "Search tenders",
  variant = "full",
  onNavy,
  onSearch,
}: {
  query?: string;
  category?: string;
  location?: string;
  placeholder?: string;
  cta?: string;
  variant?: "full" | "compact";
  onNavy?: boolean;
  /** When given, handles the search instead of navigating to /tenders. */
  onSearch?: (v: { q: string; cat: string; loc: string }) => void;
}) {
  const router = useRouter();
  const id = useId();
  const compact = variant === "compact";
  const [q, setQ] = useState(query);
  const [cat, setCat] = useState(category);
  const [loc, setLoc] = useState(location);

  return (
    <form
      className={cx("uc-search", compact && "uc-search-compact")}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSearch) return onSearch({ q, cat, loc });
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        if (cat !== "All categories") params.set("cat", cat);
        if (loc !== "All of Rwanda") params.set("loc", loc);
        const s = params.toString();
        router.push(s ? `/tenders?${s}` : "/tenders");
      }}
    >
      <div className="uc-search-kw">
        <Icon name="search" size={20} />
        <label className="uc-sr" htmlFor={`${id}-q`}>
          Search tenders
        </label>
        <input
          id={`${id}-q`}
          className="uc-input"
          type="search"
          placeholder={placeholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {compact ? null : (
        <Select id={`${id}-cat`} label="Category" hideLabel options={CATEGORY_OPTIONS} value={cat} onChange={setCat} />
      )}
      {compact ? null : (
        <Select id={`${id}-loc`} label="Location" hideLabel options={LOCATION_OPTIONS} value={loc} onChange={setLoc} />
      )}
      <Button variant={onNavy ? "accent" : "primary"} size="lg" type="submit" icon="search">
        {cta}
      </Button>
    </form>
  );
}
