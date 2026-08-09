# Design: add-landing-page

## Context

The scaffold renders a static placeholder in `src/App.tsx`. This is the first feature change; there is no existing page, registry, or meaningful token set. The design language is inherited from the sibling `../game-tracker` project, whose landing page (SelectionPage) is the direct reference:

- **Tokens** (`design-tokens.json`, DTCG `$value`/`$type` format): dark base `#0e1014`, warm parchment text (`#e9e4d8` / `#b3ad9e`), gold brand primary `#d4af37` with glow/muted variants, translucent surfaces (`rgba(26,30,38,0.7)` + backdrop blur), hairline borders `rgba(255,255,255,0.1)`, per-game `selStart`/`selMid` gradient endpoint pairs fading to `#0a0a1a`.
- **SelectionPage pattern**: centered hero with gradient-clipped title (white → brand gold), subtitle in secondary text, `auto-fit minmax(360px, 1fr)` card grid capped at 1400px, cards as `<button>` with 320px gradient header, cover image (`object-fit` with graceful fallback), dark overlay, body row with game name + publisher badge + description. Hover: lift + gold border + glow; entrance: staggered `fade-in-up` per `nth-child` with `n+5` saturation cap.
- **CSP constraint** (documented in game-tracker's CSS and carried into this repo's `vercel.json`): card art must be self-hosted; external image origins are blocked in production. game-tracker's `ui-avatars.com` onError fallback is NOT carried over — it violates this repo's stricter CSP.

Current scaffold tokens are a small flat set (`color.primary` etc.) with light-mode values; the landing page needs the full dark Temper-style system.

## Goals / Non-Goals

**Goals:**

- Reproduce game-tracker's selection-card look and interaction on token-driven CSS, adapted to TCG branding.
- Registry-driven page: adding TCG #3 later means one registry entry + one gradient token pair + one CSS class.
- Ship without cover art: gradient headers alone must look finished; art drops into `public/assets/` later.

**Non-Goals:**

- Auth gating (game-tracker's session/sign-in flow) — cards navigate directly.
- Real game pages — routes render minimal placeholders.
- GameSwitcher navbar, Supabase wiring, light mode.

## Decisions

### 1. Registry shape: game-tracker's `Game` interface, minus auth/icon fields

`src/lib/games.ts` exports `interface Game` and `const GAMES: Game[]`. Fields: `id`, `name`, `path`, `publisher`, `description`, `coverImage` (nullable), `bgClass`, `accent`, lazy `Page`. Differences from game-tracker: `publisher` instead of `developer` (TCG domain term); `coverImage: string | null` instead of always-set (ships without art); no `icon` (no GameSwitcher yet); page props carry no session (no auth).

Game ids: `ws` (Weiss Schwarz), `gd` (Gundam Card Game) — short ids used for token names, CSS classes, and future table prefixes, same convention as game-tracker's `hsr`/`r1999`.

_Alternative considered_: copying game-tracker's interface verbatim including auth props — rejected; dead parameters until an auth change exists, and specs forbid inventing behavior.

### 2. Token expansion: adopt game-tracker's structural tokens wholesale, re-skin brand for TCG

Replace the scaffold's starter `design-tokens.json` with game-tracker's structure (bg/text/ui/brand color groups, typography scale, spacing scale, radius, transitions, shadows) keeping the Temper neutrals so the two apps feel like siblings. Per-game gradient pairs:

- `color.ws.selStart` `#1a1a22` / `selMid` `#3a3a48` — monochrome silver/charcoal for Weiss Schwarz's white-and-black (Weiß/Schwarz) duality; accent `#c0c0cc`.
- `color.gd.selStart` `#0a1a2e` / `selMid` `#1e4a6e` — steel blue for Gundam's mecha/federation branding; accent `#4a9fd8`.

Existing `src/index.css` / `App.css` variable references (`--color-primary` etc.) are updated to the new token names in the same change.

_Alternative considered_: keeping the scaffold's flat token names and mapping game-tracker values onto them — rejected; diverging token vocabulary between sibling projects makes every future port harder.

### 3. Card CSS lives in `src/index.css`, page shell CSS in `SelectionPage.css`

Mirror game-tracker's split exactly (`selection-card*` classes global in `index.css`, hero/grid in colocated `SelectionPage.css`) so diffs against the reference stay readable. `bgClass` values `bg-ws-sel` / `bg-gd-sel` follow the `bg-<id>-sel` convention.

### 4. Image fallback: hide on error, gradient carries the card

`onError` sets a state flag (or hides the img) so the gradient header shows through — no external avatar fallback (CSP). `coverImage: null` skips rendering the `<img>` entirely. This satisfies the "degrades gracefully" requirement with one code path.

### 5. Routing: routes built from the registry, lazy pages, Suspense fallback

`App.tsx` maps `GAMES` to `<Route>` elements plus the `/` landing route, wrapping lazy pages in `<Suspense>`. Placeholder pages live at `src/pages/weiss-schwarz/WsPage.tsx` and `src/pages/gundam/GdPage.tsx` following game-tracker's `pages/<route-name>/` layout.

## Risks / Trade-offs

- [Gradient-only cards look flatter than game-tracker's art-backed cards] → Accepted for first cut; token pairs chosen for contrast, and hero/hover polish carries the page until art is sourced. Official art licensing is deliberately dodged by shipping without it.
- [Token vocabulary replacement churns the scaffold's CSS] → Scaffold CSS surface is 3 small files; churn is contained to this change.
- [Two placeholder pages invite scope creep] → Placeholders are name-only by spec; game features are separate changes.

## Open Questions

- Cover art sourcing (self-shot photos of physical cards vs. licensed promo art) — deferred; page ships art-less and `coverImage` is nullable.
