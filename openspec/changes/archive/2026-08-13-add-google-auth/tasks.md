# Tasks: add-google-auth

## 1. Auth core

- [x] 1.1 Port `src/hooks/useAuth.ts` from game-tracker (session load, auth-state subscription, `signInWithGoogle(redirectTo?)`, `signOut`) + unit tests (mocked supabase module)
- [x] 1.2 Port `AuthGate` component with Card Zone copy, standalone CSS, unit test, Storybook story

## 2. UI integration

- [x] 2.1 `App.tsx`: call `useAuth()` once; pass email/callbacks to Navbar, session props to SelectionPage and game pages (game pages get `onSignIn` bound to their own path)
- [x] 2.2 Navbar: auth section (email + Sign Out when signed in, Sign In with Google otherwise) + CSS, tests, stories
- [x] 2.3 `games.ts`: add `GamePageProps` and type `Page` with it; `WsPage`/`GdPage` render auth-loading → `AuthGate` → content ladder
- [x] 2.4 SelectionPage: "Requires Login" badges when signed out; signed-out card activation starts OAuth with the game path; auth-loading message; tests + stories
- [x] 2.5 Shared button chrome: `.btn` (index.css), `.primary-action`/`.secondary-action` (App.css), badge styles

## 3. Backend & deploy

- [x] 3.1 Migration `20260812000000_add_user_profiles.sql`: `user_profiles` table, RLS enabled, four owner-scoped policies (`auth.uid()::text`); pushed to remote
- [x] 3.2 `vercel.json` CSP: `accounts.google.com` in script/connect/frame-src, `*.googleusercontent.com` in img-src
- [x] 3.3 Google Cloud OAuth client created; Supabase Google provider + redirect URLs configured

## 4. Verify

- [x] 4.1 Rewrite `tests/smoke.spec.ts` for signed-out reality (badges, auth gate on direct URL, URL-based switcher asserts)
- [x] 4.2 `npm run lint`, `npm run test` (36 passing), `npm run build`, `npx playwright test --project=chromium` (5 passing) all green; manual Google sign-in round-trip verified locally
