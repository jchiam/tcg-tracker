# Proposal: add-google-auth

## Why

Game pages will hold per-user collection and deck data, which needs an identity to key on and row-level security to isolate. game-tracker already solved this with Supabase Google OAuth (single `useAuth` hook, prop-drilled session, in-page auth gates, `user_profiles` + `auth.uid()`-scoped RLS); this app ports that mechanism, filling the navbar's reserved auth slot from the add-navbar change.

Note: this change is retroactive — the port was implemented and verified first, and these artifacts document it.

## What Changes

- Add a `useAuth` hook (Supabase `getSession` + `onAuthStateChange`): exposes `session`, `isAuthLoading`, `signInWithGoogle(redirectTo?)`, `signOut`. Called once in `App` and prop-drilled.
- Add an `AuthGate` sign-in call-to-action; game pages render a ladder of auth-loading message → `AuthGate` when signed out → game content.
- Navbar right side gains auth controls: signed out shows "Sign In with Google"; signed in shows the user's email and "Sign Out".
- Landing page: cards show a "Requires Login" badge when signed out, and activating a card while signed out starts Google OAuth that returns to that game's route; signed in navigates directly.
- Supabase migration: `user_profiles (id TEXT PRIMARY KEY, updated_at)` with owner-scoped RLS (`auth.uid()::text`), the key future per-game tables reference.
- `vercel.json` CSP: allow `https://accounts.google.com` (script/connect/frame) and `https://*.googleusercontent.com` (img).
- Routes stay unguarded at the router level — gating is in-page, matching game-tracker.

Out of scope: email/password or other providers, profile UI, any per-game data tables.

## Capabilities

### New Capabilities

- `auth`: Google sign-in, session lifecycle, in-page auth gating, and the per-user profile/RLS foundation.

### Modified Capabilities

- `app-shell`: navbar now carries auth controls (drops the "no auth controls" clause).
- `game-selection`: card activation and direct URL access are auth-aware.

## Impact

- New: `src/hooks/useAuth.ts` (+test), `src/components/AuthGate.tsx` (+CSS/test/story), `supabase/migrations/20260812000000_add_user_profiles.sql`.
- Modified: `App.tsx`, `Navbar.tsx` (+CSS/tests/stories), `SelectionPage.tsx` (+tests/stories), `WsPage.tsx`, `GdPage.tsx`, `games.ts` (`GamePageProps`), shared button CSS (`index.css`, `App.css`), `vercel.json`, `tests/smoke.spec.ts`.
- External setup: Google OAuth client in Google Cloud Console, provider + URL config in Supabase dashboard.
