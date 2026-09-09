# Phantom Blade Zero Tools Design Specification

## Goal

Build an English, useful-first tools and reference site for Phantom Blade Zero. The first release is a Cloudflare-friendly Next.js application whose build planner and launch tracker are the primary product, with sourced weapon, boss, and guide pages supporting discovery without publishing unverified claims.

## Product boundaries

- Routes: `/`, `/builds`, `/weapons`, `/weapons/[slug]`, `/bosses`, `/bosses/[slug]`, `/tracker`, `/guides`, `/about`.
- Build Planner V1 stores named player combinations locally, imports/exports validated JSON, and encodes a shareable read-only URL. It does not rank builds or claim a best build.
- Tracker uses a verified release date of 2026-10-29 (PlayStation listing and PlayStation Blog) and shows a countdown plus an officially confirmed checklist before launch. After launch it exposes progress/boss tracking while retaining the checklist history.
- Every data record includes `sourceUrl`, `sourceTitle`, and `lastUpdated`; `sourceType` (`Official` or `Community`) and `stage` (`Pre-release` or `Verified`) are independent labels.
- No official logo, screenshots, or artwork are shipped. Visual identity uses dark charcoal, muted gold, and jade accents.

## Architecture

Next.js App Router with TypeScript and Tailwind CSS. Static data lives in typed modules so each game's schema can evolve independently; generic cards, filters, breadcrumbs, reliability legend, metadata, and tracker primitives are reusable. Client-only behavior is limited to planner persistence/import/export/share decoding and tracker progress controls.

## Data model

```ts
type Reliability = { sourceType: 'Official' | 'Community'; stage: 'Pre-release' | 'Verified'; sourceUrl: string; sourceTitle: string; lastUpdated: string }
type Weapon = Reliability & { slug: string; name: string; summary: string; category: string; notes: string[] }
type Boss = Reliability & { slug: string; name: string; summary: string; status: 'Confirmed' | 'Unconfirmed'; notes: string[] }
type Build = { id: string; name: string; weapon?: string; secondary?: string; accessory?: string; notes?: string }
```

Initial records are deliberately few and sourced: only publicly confirmed details are included. Unknown slots are represented as `null`, not invented game data.

## UX and SEO

The shell provides responsive navigation, skip link, dark wuxia styling, and a Data Reliability Legend on home and listing pages. Substantive detail pages display source title, link, and update date. JSON-LD covers VideoGame, ItemList, FAQPage, and BreadcrumbList where applicable. `sitemap.ts`, `robots.ts`, OpenGraph metadata, Search Console verification placeholder, and optional Cloudflare Web Analytics script hook are included.

## Acceptance criteria

1. `npm run build` succeeds without network-only dependencies.
2. Unit tests cover reliability validation, planner JSON validation/round-trip, share encoding/decoding, and tracker mode/date logic.
3. Planner survives reload through localStorage and rejects malformed/oversized JSON.
4. All listed routes render useful content and detail pages link back to tools/listings.
5. No page presents an algorithmic “best build” or unsourced weapon/boss facts.

## Self-review

- Requirements coverage: routes, visual direction, planner boundaries, dual reliability labels, source fields, verified date, tracker transition/history, SEO, Cloudflare readiness, and non-empty-page rule are all represented above.
- Risk controls: date is cited to PlayStation; speculative data is omitted; browser APIs are isolated behind client components; JSON is schema-checked before persistence.
- Deliberate V1 omissions: authentication, server database, community submissions, ranking, combat calculations, and official media assets.
