# Umucyo — public procurement portal (redesign concept)

A Next.js implementation of the Umucyo website design: Rwanda's online public procurement portal, built from the
Umucyo design system (navy, white and sun yellow; Bricolage Grotesque, Instrument Sans and JetBrains Mono).

> All tenders, companies and figures are sample data. Legal texts are drafts for RPPA legal review and keep their
> `[verify]` markers.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What's here

| Area | Routes |
| --- | --- |
| Public site | `/` home · `/tenders` search with filters · `/tenders/[ref]` tender detail · `/how-to-bid` · `/spending` where the money went (contract history, supplier and entity directories) |
| Legal | `/terms` · `/privacy` · `/legal-framework` |
| Supplier onboarding | `/register` → `/register/business` → `/documents` → `/contact` → `/verify` → `/register/done`, or `/register/individual` → `/verify` |
| Supplier dashboard | `/dashboard` · `/recommended` · `/watchlist` · `/bids` · `/bids/prepare` · `/bids/submitted` · `/preferences` |

## Structure

- `app/styles/tokens.css` — design tokens (colours, spacing, radii, type families).
- `app/styles/components.css` — component styles from the design system bundle.
- `app/styles/site.css` — page layouts (onboarding, dashboard, tables, legal) from the design canvas.
- `app/globals.css` — imports the three files above, plus responsive and accessibility additions.
- `components/umucyo/` — the design-system components as React: `Icon`, `Logo`, `Button`, `StatusBadge`, `Chip`,
  `SearchBar`, `Deadline`, `TenderCard`, `KeyDates`, `DocumentChecklist`, `ActionPanel`, `Notice`, `Steps`,
  `Breadcrumbs`, `GovBanner`, `SiteHeader`, `SiteFooter`, `LegalLayout`.
- `components/register/`, `components/dashboard/` — onboarding and dashboard shells.
- `lib/data.ts`, `lib/dashboard.ts` — sample tenders, awards and supplier data. `lib/dates.ts` formats dates in
  Kigali time and anchors countdowns to `SAMPLE_TODAY`.

There is no backend yet: forms validate and move between steps, and state lives in the page.
