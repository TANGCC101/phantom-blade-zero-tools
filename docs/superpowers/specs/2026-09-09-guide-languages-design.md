# Full guide reading languages

User request: selecting any of the existing 15 languages must translate the articles for visitors. This supersedes the earlier English-body/Chinese-summary limitation.

Translate all six articles: titles, descriptions, scope limits, section headings and full paragraphs, source titles/category labels, navigation and related cards. Preserve identifiers, URLs, review dates, facts, counts and uncertainty. The 15 existing locale codes and language preference continue unchanged.

Keep English static HTML, metadata, canonical URLs, sitemap and fallback content. Load only the selected guide dictionary on demand in client components; no remote translation service, accounts or new locale URLs. While a language loads, label fallback content as English. Guard against stale async responses on rapid switching. Missing/failed dictionaries fall back safely to complete English content.

The guide hub and related cards use the same translated strings as details. Remove obsolete English-only notices and Chinese-only summary blocks. Article lang matches its actual visible language; sources retain original destination URLs. Guide breadcrumbs use translated visible and structured-data names together.

Validation: translation completeness for all 15 dictionaries, preserve numeric facts/paragraph boundaries, independent review of source fidelity, English SSR/export checks, actual language switches on article/hub/related cards when browser testing is available, persistence and rapid-switch behavior. Run existing tests, lint, typecheck, build and export check. Follow the established main/Pages release workflow.

Self-review: no redesign of the selector or tools; frontend translation is not a multilingual SEO URL expansion. Source check dates are not refreshed merely because translations are added.
