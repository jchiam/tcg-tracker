# Proposal: add-selection-card-art

## Why

The landing page shipped art-less (gradient headers only) because art sourcing was an open question in `add-landing-page`. That question is now resolved: official publisher assets for both games, self-hosted per the CSP constraint. Cover art makes the two selection cards recognizable at a glance and finishes the page visually.

## What Changes

- Add self-hosted cover images to `public/assets/`:
  - **Weiss Schwarz**: official card back image from the [WS Product Media Kit](https://en.ws-tcg.com/mediakit/) — permitted for non-commercial fan sites under Bushiroad's Fan Content policy. Served web-optimized (WebP re-encode + downscale), a knowing deviation from the kit's no-alteration condition; risk-accepted with a comply-on-request posture (user decision, 2026-08-09).
  - **Gundam Card Game**: official key visual from [gundam-gcg.com](https://www.gundam-gcg.com/) — no fan-asset carve-out exists; risk-accepted for a personal non-commercial fan site with a comply-on-request posture. Also served web-optimized.
- Set `coverImage` on both registry entries (was `null`).
- Add a licensing attribution footer to the landing page: `©Bushiroad ©SOTSU・SUNRISE ©BANDAI` — attribution is a condition of the Bushiroad license and standard practice for Gundam material.
- No layout or interaction changes; the existing image-fallback path (hide on error, gradient carries the card) stays as-is.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `game-selection`: Selection cards gain cover art requirements (self-hosted official assets, unmodified files) and the landing page gains a copyright attribution requirement.

## Impact

- New: two image files under `public/assets/weiss-schwarz/` and `public/assets/gundam/`.
- Modified: `src/lib/games.ts` (two `coverImage` values), `src/pages/SelectionPage.tsx` + CSS (attribution footer), affected unit tests (the "no img elements" test inverts), Storybook story unchanged.
- No dependency, routing, or token changes. CSP already permits self-origin images.
