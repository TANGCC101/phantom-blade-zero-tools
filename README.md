# Phantom Blade Zero Tools

Multilingual game tools and SEO reference website for Phantom Blade Zero.

## Project status

Local V1 implementation: browser-saved build notes, share previews, validated JSON backups, launch/progress tracker, sourced reference pages, filters and SEO metadata. The site is deployed at https://phantom-blade-zero-tools.pages.dev/. Current content is a selective pre-release reference, not a complete item or boss database.

Canonical project directory: `E:\Ai项目\Phantom Blade Zero Tools`.

## Folder organization

| Folder | Responsibility |
| --- | --- |
| `app/` | Next.js App Router pages, layouts and metadata routes |
| `src/` | Reusable components, game-specific data and tool logic |
| `public/` | Assets served directly by the website |
| `docs/superpowers/specs/` | Approved design specifications and self-review |
| `docs/superpowers/plans/` | Detailed TDD implementation plans |
| `docs/research/` | Source research and factual verification |
| `docs/decisions/` | Architecture and product decision records |
| `docs/verification/` | Test evidence and release checks |
| `assets/references/` | Reference material; not automatically published |
| `assets/originals/` | Original asset working files |
| `tests/` | Automated tests |
| `scripts/` | Project maintenance and validation scripts |
| `work/` | Temporary files, scratch work and logs; ignored by Git |
| `outputs/` | Packaged deliverables; ignored by Git |

Keep configuration and package manifests in the project root. Generated dependencies and build output belong in their standard tool-managed folders, not in source or documentation directories. Keep credentials out of documentation and version control.

## Run locally

The header offers 15 display languages: English, 简体中文, 繁體中文, 日本語, 한국어, Français, Deutsch, Español, Español (LATAM), Português (BR), Português (PT), Русский, Italiano, ไทย and Tiếng Việt. First visits match supported browser languages, including traditional Chinese and regional Spanish/Portuguese; unsupported languages fall back to English. Manual choice is stored as `pbz.language.v1`. Navigation, tools, messages and reference content switch together. Player-authored build names/notes and JSON backup fields are unchanged. English static metadata and existing URLs are retained; this is a display-language preference, not a locale-specific SEO route tree. Dictionaries live in `src/lib/locales/`; native-speaker editorial review is still recommended before launch.

The CSS-only theme uses ink black, fog gray, bone white and dark crimson inspired by the visual presentation of the official website, with restrained old-gold highlights. These are interpreted colors, not an official brand specification; no official artwork is republished.

Use Node.js 22 LTS or newer. Install the locked dependencies with `npm ci`.

- `npm run dev`: development server.
- `npm test`: domain and regression tests.
- `npm run lint`: ESLint.
- `npm run typecheck`: TypeScript checks.
- `npm run build`: exports static pages to `out/`.
- `npm start`: serves the static export on http://127.0.0.1:3000.

## Guides and editorial maintenance

Six English guides live under `/guides/[slug]/`, with Chinese hub summaries. Article bodies explicitly retain English language markup when the display language changes. Edit `src/lib/guides.ts` for reviewed content, sources, dates and related links. Update editorial dates only when content changes, not on every build. The configured sitemap now contains 16 substantive URLs.

`node scripts/check-export.mjs` validates all exported public pages, metadata, structured data, internal links and sitemap alignment. Run it with the same `NEXT_PUBLIC_SITE_URL` used to build.

## Cloudflare Pages preparation

Use build command `npm run build`, output directory `out`, and Node.js 22. No Worker adapter or database is needed for V1.

Before a production build, configure `NEXT_PUBLIC_SITE_URL` with the actual HTTPS origin. Without it, preview builds use noindex/disallow and omit sitemap URLs. No domain is assumed to belong to this project.

Optional build variables: `GOOGLE_SITE_VERIFICATION` for Search Console and `CLOUDFLARE_WEB_ANALYTICS_TOKEN` for the public analytics beacon ID. Variable names are in `.env.example`; local values belong in ignored `.env.local`. Never put private API credentials in these variables.

Submit `/sitemap.xml` to Search Console after deploying to the confirmed domain. Date/source changes require rebuilding the static site.

## Browser verification

`node scripts/browser-smoke.cjs` runs against the local preview with Playwright and installed Microsoft Edge. Install Playwright in your test environment or point `PBZ_PLAYWRIGHT_MODULE` at its module directory. `PBZ_TEST_URL` and `PBZ_BROWSER_CHANNEL` can override the local URL and browser channel.

The script creates isolated browser storage, checks saves/reloads, share previews, valid/invalid imports, tracker transition/history, filters, routes, and mobile overflow. Screenshots go to ignored `work/`.

See `docs/PROJECT-BRIEF.md` for the approved requirements carried over from the conversation.
