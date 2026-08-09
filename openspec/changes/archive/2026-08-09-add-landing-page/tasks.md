# Tasks: add-landing-page

## 1. Design tokens

- [x] 1.1 Replace `src/styles/design-tokens.json` with the game-tracker-derived token set (bg/text/ui/brand groups, typography scale, spacing, radius, transitions, shadows) plus `color.ws.*` and `color.gd.*` gradient/accent tokens per design.md decision 2
- [x] 1.2 Run `npm run build:tokens` and update existing variable references in `src/index.css` / `src/App.css` to the new token names (dark base styles on `body`)

## 2. Game registry

- [x] 2.1 Create `src/lib/games.ts` with the `Game` interface and `GAMES` array: `ws` (Weiss Schwarz, Bushiroad, `/weiss-schwarz`, `bg-ws-sel`) and `gd` (Gundam Card Game, Bandai Namco, `/gundam`, `bg-gd-sel`), lazy `Page` fields, `coverImage: null`
- [x] 2.2 Unit test: registry contains both games with expected ids, paths, and required fields

## 3. Placeholder game pages

- [x] 3.1 Create `src/pages/weiss-schwarz/WsPage.tsx` and `src/pages/gundam/GdPage.tsx` rendering the game name as heading

## 4. Landing page

- [x] 4.1 Add `selection-card*` styles to `src/index.css` and `bg-ws-sel` / `bg-gd-sel` gradient classes (port from game-tracker: hover lift, staggered fade-in with `n+5` cap, overlay, body layout)
- [x] 4.2 Create `src/pages/SelectionPage.tsx` + `SelectionPage.css`: hero (gradient-clipped title, subtitle) and registry-driven card grid; cards are `<button>`s that navigate via `useNavigate`
- [x] 4.3 Image handling: skip `<img>` when `coverImage` is null; hide on load error so the gradient header carries the card (no external fallback)
- [x] 4.4 Unit tests: renders hero + one card per registry entry with name/publisher/description; card activation navigates; keyboard focusable; missing-image path renders functional card
- [x] 4.5 Storybook story for SelectionPage (default grid; a11y addon passes)

## 5. Routing

- [x] 5.1 Rewire `src/App.tsx`: `/` renders SelectionPage, registry-mapped lazy routes in `<Suspense>`; remove scaffold placeholder Home
- [x] 5.2 Update `src/App.test.tsx` and `tests/smoke.spec.ts` for the new landing heading; add e2e: click each card, assert navigation to `/weiss-schwarz` and `/gundam`; direct URL access renders game page

## 6. Verify

- [x] 6.1 `npm run lint`, `npm run test`, `npm run build`, `npx playwright test --project=chromium` all pass
- [x] 6.2 `npx openspec validate --all` passes
