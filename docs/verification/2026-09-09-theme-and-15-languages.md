# Theme and 15-language verification — 2026-09-09

## Scope

- Replaced broad jade accents with an ink-black, fog-gray, bone-white and dark-crimson CSS theme; retained restrained old-gold emphasis.
- Visual reference: https://pbz.s-game.com/en-US/ (official website inspected in browser). Palette values are an interpretation of its presentation, not an official brand-token specification. No official artwork or logos were copied.
- Added all 15 languages in the requested screenshot, in the same order, including separate Latin American Spanish and Brazilian/European Portuguese options.
- Each dictionary contains 135 keys. Confirmation placeholders and countdown units are localized. Player-authored names/notes remain unchanged.
- Browser-language matching supports traditional Chinese and regional Spanish/Portuguese; explicit choices persist. Static metadata and URLs remain English, without locale SEO routes.

## Evidence

- `npm test`: 45 tests passed across 6 files, including dictionary coverage, placeholders, locale resolution and countdown formatting.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed; static export generated.
- `node scripts/check-export.mjs`: passed (ten HTML routes, four JSON-LD types, provenance and preview indexing checks).
- Live browser: all 15 options selected in turn; document language and home heading changed correspondingly. No desktop horizontal overflow detected.
- Selected simplified Chinese survived a reload.
- An unsaved Chinese/English build-name draft remained intact after switching to German. No build was saved or deleted during this check.
- At 390 × 844, German planner and simplified-Chinese home displayed without horizontal overflow. Desktop Chinese theme also visually inspected. Viewport override reset afterward.
- Local preview returned HTTP 200; left on the simplified-Chinese homepage.

## Limitations

Translations have full key coverage but have not received native-speaker editorial review. Browser checks sample content and layout, not linguistic accuracy of every sentence. The language control is a native accessible select; popup appearance varies by operating system. No production deployment was performed.
