# Tasks: add-selection-card-art

## 1. Acquire assets

- [x] 1.1 Download the Weiss Schwarz card back PNG from the media kit (https://en.ws-tcg.com/mediakit/) to `public/assets/weiss-schwarz/cover.png` — byte-exact, no re-encode; note the exact source URL in the commit message
- [x] 1.2 Download an official Gundam Card Game key visual from https://www.gundam-gcg.com/ to `public/assets/gundam/cover.<original-ext>` — byte-exact; note the exact source URL in the commit message

## 2. Wire into registry and page

- [x] 2.1 Set `coverImage` on both entries in `src/lib/games.ts` to the new asset paths
- [x] 2.2 Add attribution footer to `SelectionPage.tsx` (`©Bushiroad ©SOTSU・SUNRISE ©BANDAI`) rendered unconditionally under the grid; style `.selection-attribution` in `SelectionPage.css` (dim, xs, centered)

## 3. Tests

- [x] 3.1 Invert the "renders no img elements" test: assert both cards render `img.game-cover-image` with the registry `coverImage` src
- [x] 3.2 Add attribution tests: footer visible on `/`; still present in the fallback (failed-image) test

## 4. Web optimization (added 2026-08-09, user decision: optimize both)

- [x] 4.1 Convert both covers to WebP sized for the 2x-DPR card header (≤ ~1000 px long edge): `cover.png` → `weiss-schwarz/cover.webp`, `cover.jpg` → `gundam/cover.webp`; remove the originals from `public/assets/`
- [x] 4.2 Update registry `coverImage` paths to the `.webp` files

## 5. Verify

- [x] 5.1 `npm run lint`, `npm run test`, `npm run build`, `npx playwright test --project=chromium` pass; landing page visually checked with both covers
- [x] 5.2 `npx openspec validate --all` passes
- [x] 5.3 Re-verify after optimization: covers render, all checks pass
