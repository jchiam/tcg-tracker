# Design: add-navbar

## Context

Ports game-tracker's `Navbar` + `GameSwitcher` (see `../game-tracker/src/components/`) into a repo that has no auth and no per-game icons. game-tracker's navbar takes `userEmail`/`onSignIn`/`onSignOut` props and renders an auth section; its switcher reads `GAMES` and self-hides on `/` via `useLocation`.

## Goals / Non-Goals

**Goals:**

- Same interaction grammar as game-tracker (brand home link, self-hiding switcher, click-outside close) so the two apps feel identical to use.
- Registry-driven: game #3 needs only a registry entry + icon file.

**Non-Goals:**

- Auth section (navbar-first decision, 2026-08-09); the `.nav-auth` slot arrives with the future auth change.
- Mobile hamburger/responsive nav beyond what game-tracker has.

## Decisions

### 1. Navbar is propless for now

game-tracker's `NavbarProps` exist solely for auth. Port the markup without props; the future auth change adds them alongside the session hook. Avoids dead parameters (same reasoning as the registry's dropped auth fields in `add-landing-page`).

### 2. Icons: official imagery, transformed, self-hosted

Per user decision (2026-08-09): source per-game images online from official material and transform to icons — square crop, small size (~96px, displayed ~24–32px), WebP. Candidates: Weiss Schwarz logo (already obtained in the media-kit zip during `add-selection-card-art`) and the Gundam Card Game emblem/logo from the official site. Same risk-accepted, comply-on-request posture recorded in `add-selection-card-art`; transformation is already an accepted deviation for Bushiroad material. Files: `public/assets/icons/ws-icon.webp`, `public/assets/icons/gd-icon.webp`. Source URLs recorded in the commit message, matching the cover-art convention.

### 3. Registry `icon` is required, not nullable

Unlike `coverImage` (nullable, page degrades to gradient), the switcher trigger needs an icon to be legible; a missing icon has no graceful fallback slot. Field is `icon: string`, populated in the same change that ships the assets.

### 4. Component and CSS layout mirror game-tracker

`src/components/Navbar.tsx` + `Navbar.css`, `src/components/GameSwitcher.tsx` + `GameSwitcher.css`, colocated tests and stories. Navbar renders in `App.tsx` above `<Routes>` inside the router context (switcher uses `useLocation`). Sticky positioning and glass styling come from the ported CSS consuming existing tokens; no new tokens expected.

## Risks / Trade-offs

- [Transformed official logos raise the same licensing exposure as covers] → Already-accepted posture; icons are additionally nominative (identifying the game), the weakest-risk use in the app. Swap to text monograms is a small follow-up if ever needed.
- [Switcher dropdown is the app's first stateful popover; click-outside via document listener can fight future modals] → Contained: same pattern game-tracker ships; revisit only if a popover library ever lands.

## Open Questions

_None._
