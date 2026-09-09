# SEO and guides implementation plan

> Execute inline using superpowers:executing-plans, test-driven-development and verification-before-completion. The handoff already authorizes this direction.

**Goal:** Publish six useful guides and complete technical SEO for the existing static site.
**Architecture:** Typed editorial records feed a static guide hub/detail route; shared SEO helpers keep all public URL representations consistent.
**Tech stack:** Existing Next.js 15, React, TypeScript, Vitest and static export; no new dependency.
**Spec:** docs/superpowers/specs/2026-09-09-seo-content-design.md

## Constraints

Preserve Cloudflare Pages, 15 language choices and planner/tracker behavior. English articles with Chinese entry summaries. Every game claim has provenance and pre-release limits. No build-time date inflation.

## Tasks

- [x] Add regression tests in tests/seo.test.ts for canonical trailing slashes, replacement origins, noindex previews and guide sitemap dates. Run `npm test -- tests/seo.test.ts` before implementation; canonical normalization must fail first.
- [x] Add typed `guides` records in src/lib/guides.ts with `slug`, `title`, `description`, `lastUpdated`, `sources`, `sections`, `related`, Chinese entry fields and limitations. Add tests/guides.test.ts for unique slugs, sourced content, existing internal links and static route coverage.
- [x] Complete src/lib/seo.ts and app/sitemap.ts; route records carry editorial dates. Example acceptance: `expect(pageMetadata('Guide','/guides','Read guides').alternates?.canonical).toBe('https://example.org/guides/')` under a configured origin.
- [x] Add app/guides/[slug]/page.tsx with generateStaticParams, metadata, visible breadcrumbs, contents, source list and related links; retain FAQ on app/guides/page.tsx and add visible guide cards plus ItemList.
- [x] Complete metadata on app/builds/page.tsx and app/tracker/page.tsx; improve distinct list descriptions. Add src/components/RelatedGuides.tsx for contextual entry points from home, tools, reference pages and about. Align homepage VideoGame markup with visible facts.
- [x] Extend scripts/check-export.mjs to discover exported routes and check all canonical URLs, OG fields, article content, source dates, linked local pages, sitemap and schema. Run npm test, npm run lint, npm run typecheck, npm run build and node scripts/check-export.mjs with production configuration; also verify preview configuration.
- [x] Review diff, document evidence in docs/verification/, update README and handoff. Commit/push through existing main workflow and verify live delivery.
- [ ] Inspect authenticated Google/Bing properties and perform visual browser QA after browser access is restored. Public delivery is confirmed; search indexing is not yet checked.

## Execution notes

Both production and preview builds and export checks passed. Canonical/sitemap regressions were observed failing first; origin-validation and content-link tests were added afterward. Tests for prose were deliberately omitted. Independent review completed; its checker-origin issue was reproduced, fixed and verified. Commit 1e0ee1d was pushed through the existing main/Pages workflow and all 16 live pages were checked. Authenticated search-console and visual checks remain blocked by the unavailable browser connection; they are pending rather than inferred from HTTP status.
