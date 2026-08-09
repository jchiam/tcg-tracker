# Tasks: rebrand-jonzone-card-zone

## 1. Rename user-visible labels

- [x] 1.1 `SelectionPage.tsx` hero heading → "The JonZone Card Zone"
- [x] 1.2 `index.html` `<title>` → "The JonZone Card Zone"
- [x] 1.3 Update heading assertions in `App.test.tsx`, `SelectionPage.test.tsx`, `tests/smoke.spec.ts`

## 2. Rename internal identifiers

- [x] 2.1 `package.json` name → `jonzone-card-zone`; refresh `package-lock.json` (`npm install --package-lock-only`)
- [x] 2.2 Update titles/references in `README.md`, `CLAUDE.md`, and `design-tokens.json` `$description`

## 3. Verify

- [x] 3.1 `npm run lint`, `npm run test`, `npm run build`, `npx playwright test --project=chromium`, `npx openspec validate --all` all pass
