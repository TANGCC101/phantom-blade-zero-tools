# Phantom Blade Zero Tools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a tested first version of the English Phantom Blade Zero tools/reference site.

**Architecture:** Next.js App Router, typed static data, Tailwind UI, and small client islands for planner persistence and tracker controls. Shared SEO, reliability, list/detail, and navigation components keep page content useful and consistent.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-09-08-phantom-blade-zero-tools-design.md`

**Execution update (2026-09-09):** The original compact checklist below records intended work, not proof of completion. Functional implementation and measured results now live in `docs/verification/2026-09-09-functional-v1.md`; schema, source-stage and deployment clarifications are in `docs/decisions/2026-09-09-v1-completion.md`. Read those alongside this plan. The initial implementation did not demonstrate the claimed red/green workflow; the decision record corrects that history.

## Global Constraints

- English user-facing copy.
- Do not publish unsourced facts, official logos, or official artwork.
- Every game record requires `sourceUrl`, `sourceTitle`, and `lastUpdated` plus independent `sourceType` and `stage`.
- Build Planner V1 has no ranking or scoring.
- Verified release date is 2026-10-29 from PlayStation sources.
- Cloudflare-compatible static/server rendering; no required database or Node-only runtime API.

### Task 1: Scaffold and typed domain data

**Files:** create `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `tailwind.config.ts`, `app/globals.css`, `src/lib/types.ts`, `src/lib/data.ts`, `vitest.config.ts`, `tests/data.test.ts`.

- [ ] Write failing tests for reliability validation and the sourced release date.
- [ ] Run `npm test -- tests/data.test.ts` and observe missing modules/failure.
- [ ] Add minimal typed records and validation helpers.
- [ ] Run the focused test and then the full test command.

### Task 2: Planner domain and client island

**Files:** create `src/lib/planner.ts`, `src/components/BuildPlanner.tsx`, `tests/planner.test.ts`.

- [ ] Test JSON round-trip, malformed payload rejection, and share URL encode/decode.
- [ ] Run tests red.
- [ ] Implement bounded schemas and localStorage-safe client behavior.
- [ ] Run planner tests green.

### Task 3: Shared shell and SEO primitives

**Files:** create `app/layout.tsx`, `src/components/SiteHeader.tsx`, `src/components/ReliabilityLegend.tsx`, `src/components/Breadcrumbs.tsx`, `src/components/SourceNote.tsx`, `src/components/EntityCard.tsx`, `src/lib/seo.ts`.

- [ ] Add component tests for labels and source fields.
- [ ] Implement dark wuxia shell, metadata helpers, JSON-LD helpers, and responsive styles.
- [ ] Run tests and typecheck.

### Task 4: Pages, tracker, and route metadata

**Files:** create `app/page.tsx`, `app/builds/page.tsx`, `app/weapons/page.tsx`, `app/weapons/[slug]/page.tsx`, `app/bosses/page.tsx`, `app/bosses/[slug]/page.tsx`, `app/tracker/page.tsx`, `app/guides/page.tsx`, `app/about/page.tsx`, `src/components/Tracker.tsx`, `app/sitemap.ts`, `app/robots.ts`, `public/site.webmanifest`.

- [ ] Test tracker mode and checklist state around the release date.
- [ ] Implement pages with meaningful links and sourced records; use `generateStaticParams` for details.
- [ ] Run tests, lint, typecheck, and production build.

### Task 5: Verification evidence

**Files:** create `docs/verification/2026-09-08-v1-checks.md`.

- [ ] Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`.
- [ ] Record exact results and manual route checklist in the evidence file.
- [ ] Re-read the spec and plan and list any intentionally deferred work.
