# Proposal: add-landing-page

## Why

TCG Tracker currently renders a placeholder page. The app's purpose is to track collections and deck builds across multiple trading card games, so the first user-facing feature is a landing page where the user selects which TCG to work in — mirroring the game-selection landing page of the sibling game-tracker project, whose design language (dark "Temper" palette, staggered selection-card grid, token-driven styling) this app inherits.

## What Changes

- Add a game registry (`src/lib/games.ts`) as the single source of truth for supported TCGs, seeded with two entries:
  - **Weiss Schwarz** (Bushiroad) — 50-card decks, character/event/climax card types.
  - **Gundam Card Game** (Bandai Namco, launched July 2025) — 50-card main deck + 10-card resource deck, unit/pilot/command/base card types.
- Add a landing page (`src/pages/SelectionPage.tsx`) that renders one selection card per registry entry in a responsive grid, following game-tracker's selection-card design (gradient header, hover lift, staggered fade-in, title/publisher/description body).
- Extend the design token set with game-tracker's structural tokens the landing page consumes (surface/text/border colors, typography scale, spacing, radii, transitions, shadows) plus per-game accent gradient tokens for the two TCGs.
- Wire routing: `/` renders the landing page; each card navigates to the game's route (`/weiss-schwarz`, `/gundam`), which renders a placeholder page until game-specific features arrive.
- Game art: self-hosted assets only (`public/assets/`) with per-game gradient fallbacks — external hotlinking is blocked by the CSP in `vercel.json` (same constraint game-tracker documents). Cover images ship as optional; cards must render correctly without them.

Out of scope: authentication, Supabase data, collection/deck features. Cards navigate directly without a login gate (game-tracker's auth flow is a later change).

## Capabilities

### New Capabilities

- `game-selection`: The landing page and game registry — what games are listed, how a game is selected, and how each selection card presents a game.

### Modified Capabilities

_None (first feature change; no existing specs)._

## Impact

- New: `src/lib/games.ts`, `src/pages/SelectionPage.tsx` + CSS, placeholder game pages, selection-card styles.
- Modified: `src/App.tsx` (routes), `src/styles/design-tokens.json` (token set expands substantially; regenerated `tokens.css`), `src/index.css` (card styles), `src/App.css`.
- No new dependencies, no schema/API changes.
- Storybook: stories for the selection card grid; unit tests for registry and page; e2e smoke test updates (landing page heading changes from scaffold placeholder).
