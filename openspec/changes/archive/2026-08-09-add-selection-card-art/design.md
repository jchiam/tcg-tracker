# Design: add-selection-card-art

## Context

See `proposal.md` for licensing research. Constraints shaping the approach:

- **Bushiroad no-alteration condition**: the media kit forbids changes to image data. Originally honored via byte-exact serving; superseded by an explicit user decision (2026-08-09) to web-optimize both covers, accepting the deviation under the same comply-on-request posture as the Gundam asset. Originals are re-obtainable from the source URLs recorded in tasks.md if unmodified serving is ever needed again.
- **CSP**: only self-origin images load in production; assets must live in `public/assets/`.
- **Existing fallback path**: `GameCard` already hides a failed image and lets the gradient carry the card; cover art plugs into the built slot (`coverImage` field, `.game-cover-image` styles).

## Goals / Non-Goals

**Goals:**

- Both cards carry recognizable official art with legally required attribution.
- Zero behavior change beyond images appearing and a footer line.

**Non-Goals:**

- Per-set WS product visuals (would add per-set copyright lines; card back keeps attribution to one line).
- Image optimization pipeline (forbidden for WS asset; skipped for Gundam for consistency).
- Per-card attribution badges — one page-level footer covers both licenses.

## Decisions

### 1. Asset choice: WS card back, Gundam key visual

WS card back is brand-generic → attribution stays `©Bushiroad` only, no set-specific studio copyrights. Gundam uses a key visual from the official site with the standard `©SOTSU・SUNRISE ©BANDAI` line. Files land at `public/assets/weiss-schwarz/cover.png` and `public/assets/gundam/cover.<original-ext>` (extension preserved from source).

### 2. Manual asset acquisition, documented in tasks

Assets are downloaded by hand from the publisher pages (media kit requires navigating product sections; key visual URL is not stable API). Tasks record source URLs next to each file so provenance is auditable. No build-time fetching.

### 3. Attribution as landing-page footer

Single `<footer class="selection-attribution">` under the grid in `SelectionPage.tsx`, styled dim/small (`--color-text-dim`, `--typography-font-size-xs`). Rendered unconditionally — satisfies "survives image failure" by construction. Not in the card body: attribution belongs to the page, not to interactive elements.

### 4. Test inversion

`SelectionPage.test.tsx`'s "renders no img elements" test asserted the art-less state; it inverts to assert both covers render with correct `src`. The fallback test (`SelectionPage.fallback.test.tsx`) already mocks a failing image and stays as the guard for the degradation requirement.

## Risks / Trade-offs

- [Bandai has no fan-asset permission; could object] → Comply-on-request: asset swap back to `coverImage: null` is a one-line revert per game, page degrades gracefully by design.
- [Unoptimized PNG may be large (card back ~600px, likely <500 KB)] → Acceptable; two images, lazy-loaded by the browser below the fold is unnecessary at this size. Revisit only if Lighthouse flags it.
- [Media kit asset URLs may change] → Files are vendored into the repo; source URLs documented in tasks for re-acquisition.
