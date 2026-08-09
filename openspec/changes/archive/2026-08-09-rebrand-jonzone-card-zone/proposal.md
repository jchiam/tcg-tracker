# Proposal: rebrand-jonzone-card-zone

## Why

The app carries the placeholder name "TCG Tracker". The sibling game-tracker project brands as "The JonZone Tracker"; this app joins the JonZone family as **"The JonZone Card Zone"** (user decision, 2026-08-09).

## What Changes

- Rename all label surfaces from "TCG Tracker" to "The JonZone Card Zone":
  - Hero heading on the landing page (`SelectionPage.tsx`)
  - Browser tab title (`index.html`)
  - Tests asserting the heading (`App.test.tsx`, `SelectionPage.test.tsx`, `tests/smoke.spec.ts`)
- Rename internal identifiers for consistency:
  - `package.json` name → `jonzone-card-zone` (mirrors game-tracker's `jonzone-tracker`)
  - Doc titles/references (`README.md`, `CLAUDE.md`, `design-tokens.json` `$description`)
- Subtitle copy unchanged.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

_None — the `game-selection` spec requires "a hero heading identifying the app" without pinning the literal string; this is a label-only change. `skip_specs: true` is set in `.openspec.yaml`._

## Impact

- Modified: `SelectionPage.tsx`, `index.html`, `package.json` (+lock via install or manual), `README.md`, `CLAUDE.md`, `design-tokens.json`, three test files.
- No behavior, routing, styling, or dependency changes.
