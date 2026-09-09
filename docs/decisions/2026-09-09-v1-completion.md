# V1 implementation decisions

This note supersedes ambiguous details in the original design and compact plan.

- The release instant is 2026-10-29T02:00:00.000Z, based on the US PlayStation Store; countdown copy identifies its scope.
- Current planner fields are free-text player notes corresponding to weapon, secondary and accessory concepts. They are not claims about exact equipable slots. Individual item selection awaits a sourced item catalog.
- Every published record is Pre-release. Verified will mean checked against the released game, not merely backed by an official announcement.
- System-level weapon pages are explicitly labeled as overviews. Removed fake individual weapon and unsupported boss classification.
- Cloudflare delivery uses Next static export to out/. Dynamic detail routes have finite static parameters.
- No production domain is assumed. NEXT_PUBLIC_SITE_URL configures canonical metadata and sitemap; unset previews use noindex/disallow and an empty sitemap.
- Shared builds use a browser-compatible Unicode-safe URL fragment. Opening a link previews a build without overwriting local records. Saving a copy is explicit.
- Imports replace local collections after confirmation. Validation failures and storage-write errors retain the current in-memory collection.
- Build backups support 100 entries, bounded strings, unique IDs, schema version 1 and a 1 MB input limit. Tracker backups have a separate schema and preserve pre-release history.
- Original tests were added in the same change as implementation; earlier documentation incorrectly claimed they were written first. The new planner regression tests were observed failing before the fix. Tracker tests initially failed on the missing module and then passed after implementation.
