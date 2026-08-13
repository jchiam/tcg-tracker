# Design: add-google-auth

## Approach

Straight port of game-tracker's auth, keeping architectural parity between the sibling apps.

- **No auth context/provider.** `useAuth()` runs once in `App`; `session`/`isAuthLoading` and callbacks flow down as props. At this app's size, prop-drilling three props beats a context layer, and it matches game-tracker so patterns transfer.
- **No router-level guards.** Every route mounts; each game page decides what to render (`isAuthLoading` → "Checking authentication...", `!session` → `AuthGate`, else content). Keeps routing dumb and lets each page pick its gated/ungated split later (e.g. public deck sharing).
- **OAuth redirect returns to intent.** `signInWithGoogle(redirectTo?)` appends the path to `window.location.origin`. Game pages pass `() => signInWithGoogle(game.path)` — a deliberate deviation from game-tracker, which passes the raw callback into `onClick` and would leak the MouseEvent into `redirectTo`.
- **Identity keying.** `session.user.id` (auth UUID as TEXT) is the `user_profiles.id`; rows are upserted lazily on first write, not by signup trigger. RLS uses `id = auth.uid()::text` (cast needed: TEXT column vs UUID function). Future per-game tables reference `profile_id` and repeat the pattern.
- **Supabase client** already existed (`src/lib/supabase.ts`, singleton, 10s fetch timeout, `persistSession`/`autoRefreshToken`/`detectSessionInUrl`); no changes needed.

## Testing

- `useAuth` unit-tested with `vi.mock('@/lib/supabase')` — no MSW needed since the module boundary is mocked; also keeps `createClient('')` from ever running in CI where env vars are absent.
- E2e stays signed-out-only (no OAuth automation): asserts badges, auth gates on direct URL, and switcher/brand navigation by URL.
