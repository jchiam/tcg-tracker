# Tasks: move-to-shared-supabase

## 1. Repo cleanup

- [x] 1.1 Remove `supabase/migrations/20260812000000_add_user_profiles.sql` and the `supabase/` directory
- [x] 1.2 Remove the `db:link` / `db:push` scripts from `package.json`
- [x] 1.3 Point `vercel.json` CSP `connect-src` at `https://dbbdryylhkpwznhbsxuv.supabase.co`

## 2. Docs

- [x] 2.1 Update `CLAUDE.md` (Supabase client bullet) and `README.md` (structure) for the shared project and the `tcg` schema
- [x] 2.2 Update the `auth` spec: shared `public.user_profiles`, trigger-provisioned rows, `tcg` schema
