# Approved project brief

Recorded: 2026-09-08. This is a requirements handoff, not the completed design specification or implementation plan.

- English Phantom Blade Zero tools and SEO website, built with Next.js, TypeScript and Tailwind; Cloudflare deployment friendly.
- Tools form the core; useful database entity pages support SEO.
- Dark wuxia visual direction: black/dark gray, muted gold and jade green. Do not directly use official logos or artwork.
- Routes: `/`, `/builds`, `/weapons`, `/weapons/[slug]`, `/bosses`, `/bosses/[slug]`, `/tracker`, `/guides`, `/about`.
- Build Planner V1 supports player combinations, naming, local saving, JSON import/export and shareable URLs. No unverified best-build ranking or scoring algorithm.
- Reliability has two independent dimensions: source `Official` / `Community`, and stage `Pre-release` / `Verified`. Every data record requires `sourceUrl`, `sourceTitle`, `lastUpdated`.
- Before launch, Tracker provides a launch countdown and officially confirmed checklist. After launch, it switches to progress/boss tracking and preserves pre-release history. Verify the actual launch date against authoritative sources before implementing the countdown.
- Local persistence uses localStorage with JSON import/export.
- Show the Data Reliability Legend on the homepage and listing pages.
- Include applicable Schema.org VideoGame, FAQPage, ItemList and BreadcrumbList markup, sitemap, robots, OpenGraph metadata, Search Console preparation and Cloudflare Web Analytics preparation.
- Reuse scaffolding, SEO and generic list/detail/filter/tracker components; allow a separate data schema for each game.
- Avoid empty entity pages created solely to increase indexable page count. Include sources and updated dates on substantive data pages.
- Workflow: approved design → written specification and self-review → detailed TDD plan → implementation and verification.

## Workspace decision

The user requested `E:\Ai项目\Phantom Blade Zero Tools` as the canonical project directory. Perform subsequent project work there. No application code existed at the time of directory setup.
