"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Chip } from "@/components/umucyo";

const CHIPS: [string, string][] = [
  ["Closing this week", "/tenders?status=closing"],
  ["ICT & digital", "/tenders?q=ICT"],
  ["Works", "/tenders?cat=Works"],
  ["Consultancy", "/tenders?cat=Consultancy+services"],
  ["Small contracts", "/tenders?value=Under+RWF+20M"],
];

export function HeroChips() {
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="uc-hero-chips">
      <span>Popular:</span>
      {CHIPS.map(([label, href]) => (
        <Chip
          key={label}
          selected={picked === label}
          onClick={() => {
            setPicked(label);
            router.push(href);
          }}
        >
          {label}
        </Chip>
      ))}
    </div>
  );
}
