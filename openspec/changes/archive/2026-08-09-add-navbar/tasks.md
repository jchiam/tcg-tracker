# Tasks: add-navbar

## 1. Assets

- [x] 1.1 Copy `brand-logo.webp` from `../game-tracker/public/` to `public/`
- [x] 1.2 Source official Weiss Schwarz logo (media-kit zip already fetched) and an official Gundam Card Game logo/emblem image; transform each to a square ~96px WebP at `public/assets/icons/ws-icon.webp` and `public/assets/icons/gd-icon.webp`; record source URLs for the commit message

## 2. Registry

- [x] 2.1 Add required `icon: string` field to `Game` interface and both entries; extend registry unit test to assert icon paths

## 3. Components

- [x] 3.1 Port `Navbar.tsx` + `Navbar.css` (brand logo + name linking to `/`; no auth section); render in `App.tsx` above `<Routes>`
- [x] 3.2 Port `GameSwitcher.tsx` + `GameSwitcher.css` (hidden on `/`, current-game trigger, dropdown list with icons + active indicator, Back to Selection, click-outside close)
- [x] 3.3 Unit tests: navbar renders brand link on `/` and game routes; switcher hidden on `/`, lists games, navigates on select, closes on outside click
- [x] 3.4 Storybook stories for Navbar and GameSwitcher

## 4. Integration

- [x] 4.1 Adjust page spacing under navbar if needed (`SelectionPage.css` / `App.css`)
- [x] 4.2 E2e: from `/weiss-schwarz` switch to `/gundam` via switcher; brand link returns home; switcher absent on `/`

## 5. Verify

- [x] 5.1 `npm run lint`, `npm run test`, `npm run build`, `npx playwright test --project=chromium`, `npx openspec validate --all` all pass; visual check
