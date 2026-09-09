# Functional V1 verification — 2026-09-09

## Verified commands

- `npm run lint`: exit 0, no warnings/errors.
- `npm test`: 5 files, 13 tests passed. Covers planner Unicode serialization without Node Buffer, duplicate identities, bounded import notes, catalog provenance, tracker mode boundary, tracker JSON and malformed input.
- `npm run typecheck`: exit 0.
- `npm run build`: exit 0 with Next.js 15.5.25; static export generated 15 build entries, including all requested page families.
- `node scripts/check-export.mjs`: exit 0; ten HTML page routes, JSON-LD VideoGame/FAQPage/ItemList/BreadcrumbList, English document language, no fake weapon or assumed domain, preview robots policy.
- `node scripts/browser-smoke.cjs`: exit 0 using bundled Playwright and installed Microsoft Edge. Local static preview at http://127.0.0.1:3000.

## Browser observations

- Named build with Unicode, weapon note and strategy text survives reload.
- Share link opens a preview without replacing the saved collection.
- Valid import restores the collection; malformed import retains it and displays an error.
- Tracker checks survive reload and remain checked after the simulated launch instant; boss-progress UI appears.
- Weapon text filter works.
- Nine representative routes return HTTP 200; mobile viewport 390 × 844 has no horizontal overflow; no browser page errors.
- Desktop 1440 × 1000 and mobile homepage screenshots visually reviewed. Text, navigation, actions and reliability section remain readable. Temporary screenshots are in ignored work/.

The initial browser script used a capitalized accessible label while the actual label text was lowercase (CSS provides capitalization). The selector was corrected; the final complete run passed.

## Scope and limitations

- Local preview only; no site published and no external analytics/Search Console account configured.
- The current catalog contains two sourced weapon-system overviews and one independently reported demo encounter. Individual item stats, exact slot counts, final locations and rewards are not claimed.
- Planner fields are free-text player notes, not a compatibility checker.
- Production URL and verification/beacon IDs are build-time settings. Preview intentionally excludes indexing; production-domain mode was not deployed or verified against a live search engine.
- Post-launch mode is tested by a simulated clock. It does not independently detect actual game availability.
- Storage denial/corrupt-backup recovery messaging is implemented but was not separately exercised in the browser smoke run.
- Node.js on this workstation is v25.2.1; README recommends Node 22 LTS for deployment. Cloudflare itself was not deployed during this verification.

## Review against the brief

Implemented routes, local combination records, JSON backups, share previews, dual reliability dimensions, source references, countdown, automatic tracker transition, history preservation, filters, interlinks, SEO markup, preview indexing controls and Cloudflare static-export preparation.

The earlier claim that the initial skeleton already delivered full planner/tracker functionality was too broad. This iteration supplied those missing behaviors and removed misleading placeholder data.
