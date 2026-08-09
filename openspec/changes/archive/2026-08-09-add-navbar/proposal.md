# Proposal: add-navbar

## Why

Game pages are dead ends: no way back to the landing page or across to the other game without editing the URL. game-tracker solves this with a persistent navbar (brand link home + GameSwitcher dropdown); this app ports that shell, minus auth (navbar-first decision, 2026-08-09 — auth arrives as a later change and slots into the navbar's reserved right side).

## What Changes

- Add a persistent `Navbar` rendered app-level above all routes: brand logo + "The JonZone Card Zone" linking to `/`. No auth section yet.
- Add a `GameSwitcher` dropdown in the navbar (ported from game-tracker): hidden on `/`, shows current game's icon, lists all registry games with icons and active indicator, "Back to Selection" footer link.
- Extend the game registry with an `icon` field; source per-game icon images online from official material and transform them (crop/resize/re-encode to small WebP) — same risk-accepted posture as the cover art.
- Copy the personal `brand-logo.webp` from game-tracker (user's own mark, no licensing concern).
- Landing page and game pages render below the navbar; placeholder game pages otherwise unchanged.

Out of scope: authentication (sign-in/out UI, session state), any game-page content.

## Capabilities

### New Capabilities

- `app-shell`: Persistent navigation chrome — the navbar, brand-home link, and cross-game switcher.

### Modified Capabilities

_None — `game-selection` requirements are untouched; the registry gains an `icon` field, which adds to, but does not change, the fields that spec mandates._

## Impact

- New: `src/components/Navbar.tsx` + CSS, `src/components/GameSwitcher.tsx` + CSS, tests, Storybook stories; `public/brand-logo.webp`; `public/assets/icons/ws-icon.webp`, `public/assets/icons/gd-icon.webp`.
- Modified: `src/App.tsx` (render navbar), `src/lib/games.ts` (`icon` field), possibly `SelectionPage.css` spacing under navbar.
- No new dependencies; CSP unaffected (self-hosted assets).
