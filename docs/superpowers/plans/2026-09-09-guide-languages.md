# Full guide language implementation plan

**Goal:** Read all six guides in any of the 15 existing display languages.
**Spec:** docs/superpowers/specs/2026-09-09-guide-languages-design.md
**Architecture:** Source-English keyed dictionaries loaded on demand; guide presentation components consume existing LanguageProvider. English SSR and page metadata remain server-owned.

- [x] Translate every source string from src/lib/guide-locales/en.json into the other 14 locales, grouped into independent files. Preserve all facts and paragraph content; do not summarize.
- [x] Add failing tests for full locale coverage and loading/fallback behavior. Run the targeted tests before wiring the feature.
- [x] Implement src/lib/guide-i18n.ts and a client reading hook; keep fast switches safe by checking the active locale before rendering loaded text.
- [x] Add GuideArticle and GuideCards client components, localize RelatedGuides, simplify server routes to retain metadata and static params, and remove obsolete English-only notices.
- [x] Verify every dictionary key and numeric facts; run all existing checks and browser language switching where available. Review translation accuracy and async behavior.
- [x] Update README/handoff/verification, push through the existing release process, verify the actual public bundle and pages. Record any unperformed browser checks explicitly.
