# Proposal: move-to-shared-supabase

## Why

The app's own Supabase project (`pnaziqesqkixwlhrkhbp`) has been deleted. tcg-tracker now runs on the shared JonZone Supabase project (`dbbdryylhkpwznhbsxuv`, `game-tracker-db`), which game-tracker and toy-tracker also use. Its schema is owned by the separate `jonzone-supabase` repo, which already provides `public.user_profiles`. That repo's `on_auth_user_created` trigger provisions profile rows at sign-up, so the lazy-upsert rule in the `auth` spec no longer holds.

## What Changes

- Remove `supabase/` (the `user_profiles` migration and local CLI state) and the `db:link` / `db:push` scripts. Migrations now go in `jonzone-supabase` as `<timestamp>_tcg_<change>.sql`.
- Point the production CSP `connect-src` at the shared project origin.
- **MODIFIED** `auth` → "Per-user profile row with owner-scoped RLS": the profile table is the shared `public.user_profiles`. Rows are provisioned by the sign-up trigger, never by the app. App tables live in the `tcg` schema and scope RLS by `(select auth.uid())::text`.
- Update `CLAUDE.md` and `README.md` to describe the shared project.

## Impact

- Code: none. The app does not yet query any table.
- Config: `vercel.json` CSP; `package.json` scripts.
- Ops, outside this repo: the GitHub `VITE_SUPABASE_URL` secret, the Vercel env vars and the shared project's Auth redirect URLs must all point at, or admit, the shared project.
