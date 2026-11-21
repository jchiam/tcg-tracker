## MODIFIED Requirements

### Requirement: Per-user profile row with owner-scoped RLS

The app SHALL use the shared JonZone Supabase project's `public.user_profiles` table, keyed by the Supabase auth user id stored as TEXT, with row-level security enabled and owner-scoped policies. Profile rows SHALL be provisioned server-side by the shared project's `on_auth_user_created` sign-up trigger; the app SHALL NOT create or upsert profile rows. App tables SHALL live in the `tcg` schema, reference `public.user_profiles(id)`, and scope their policies by `(select auth.uid())::text`. Schema changes SHALL be made as migrations in the `jonzone-supabase` repo, not in this repo.

#### Scenario: Own row accessible

- **WHEN** an authenticated user reads their `user_profiles` row
- **THEN** the operation succeeds

#### Scenario: Foreign rows invisible

- **WHEN** an authenticated user queries `user_profiles`
- **THEN** rows belonging to other users are neither returned nor writable

#### Scenario: Profile exists after sign-up

- **WHEN** a user signs in for the first time
- **THEN** their `user_profiles` row already exists without any write from the app
