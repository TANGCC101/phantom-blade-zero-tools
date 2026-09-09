# English / Simplified Chinese — 2026-09-09

User direction: retain the current dark/gold/jade presentation and add language choice. Game-inspired visual direction remains in place; this change does not replace the theme.

## Delivered

- Global English / 简体中文 selector in the header.
- Browser-language default with explicit preference persisted in localStorage; restricted storage still permits switching for the current page session.
- Translated navigation, home, planner, tracker, catalog details, filters, reliability labels, guides, about, status messages and confirmation prompts.
- Chinese and English catalog search; underlying filter values and JSON schemas remain language independent.
- No translation of player-authored build names or notes.
- HTML language updates after hydration. English static metadata/JSON-LD and existing route structure remain unchanged.

## Evidence

- ESLint and TypeScript: passed.
- Unit tests: 17 passed across 6 files.
- Static build: passed.
- Export verification: passed.
- Existing browser smoke suite: passed with explicit en-US locale.
- Language browser suite: passed — Chinese default, manual English override, reload/navigation persistence, all page families, unchanged saved build JSON, source filter and 390px layout.
- Visually reviewed Chinese mobile homepage. Current theme retained and language control is visible.
- No browser page errors in either final smoke run.

The browser suites run against the local static preview. Refresh an already-open tab to load the rebuilt assets. No deployment was performed.
