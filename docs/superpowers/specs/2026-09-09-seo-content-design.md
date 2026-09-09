# Steady SEO and content accumulation

Approved direction: docs/handoff/2026-09-09-launch-and-seo-handoff.md, continued explicitly by the user on 2026-09-09.

## Scope

Extend the existing static site with six substantive English guides: combat overview, Phantom Edges, planner usage, reliability, reading boss reports, and progress tracking. Preserve deployment architecture, all 15 language choices, and tool behavior. Provide Chinese guide titles and summaries as an entry point; mark English article bodies with lang=en. Do not imply fully translated articles.

Each guide has a stable slug, unique title/description, editorial date, source titles/URLs/check dates, explicit pre-release limits, useful sections and contextual links. Tool documentation cites project implementation at an immutable Git revision and is labeled Project documentation, never Official game information. Game claims remain Official/Community and Pre-release; no invented equipment or tactics.

## SEO

Use the existing metadata helper for every page. Normalize canonical, Open Graph, sitemap and structured-data links to trailing-slash HTTPS URLs. Validate the configured origin; absent configuration preserves noindex and an empty sitemap. Domain changes flow through the existing environment variable without hardcoded production URLs. Editorial dates are manually maintained, not refreshed on every build.

Retain FAQPage only on the hub with matching visible questions, ItemList on actual listings, BreadcrumbList beside visible breadcrumbs, and VideoGame on the homepage with visible supporting facts. Remove a scheduled future launch from datePublished. Add hub/article navigation and contextual guide links from related tools and references.

## Acceptance

Six statically rendered articles, all linked from the hub and included in sitemap. Each has meaningful source-backed or implementation-backed content, source dates and related links. Production export verifies unique metadata, canonical/OG agreement, local link targets, dates and structured-data/visible-content agreement; preview stays non-indexable. Run all five checks specified in the handoff. Release through existing GitHub/Pages workflow if credentials are available; record external access limitations honestly.

## Self-review

Scope matches the approved handoff. No new backend, memberships, asset reuse, locale routes, unverified stats or duplicate functionality. FAQ markup is semantic annotation, not a promise of search-result enhancements. Chinese entry summaries do not misrepresent article language.
