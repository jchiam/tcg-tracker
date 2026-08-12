## Purpose

Lets the user pick which trading card game to work in. Defines the game registry (which TCGs the app supports) and the landing page that presents them as selectable cards.

## Requirements

### Requirement: Game registry lists supported TCGs

The system SHALL maintain a registry of supported trading card games as the single source of truth for the landing page and routing. The initial registry SHALL contain exactly two games: Weiss Schwarz (publisher Bushiroad) and Gundam Card Game (publisher Bandai Namco). Each registry entry SHALL provide a stable id, display name, route path, publisher, and a one-line description of what the user tracks for that game.

#### Scenario: Registry drives the landing page

- **WHEN** the landing page renders
- **THEN** it shows one selection card per registry entry, in registry order, with no hard-coded game list in the page itself

#### Scenario: Initial games present

- **WHEN** the registry is loaded
- **THEN** it contains Weiss Schwarz with route `/weiss-schwarz` and Gundam Card Game with route `/gundam`

### Requirement: Landing page presents selectable game cards

The landing page at `/` SHALL show a hero heading identifying the app and a grid of game selection cards. Each card SHALL display the game's name, publisher badge, and description, with a visually distinct per-game header treatment following the established selection-card design language (gradient header, hover emphasis, staggered entrance).

#### Scenario: Landing page renders both games

- **WHEN** the user visits `/`
- **THEN** the page shows a hero heading and one card each for Weiss Schwarz and Gundam Card Game, each showing name, publisher, and description

#### Scenario: Cards are keyboard accessible

- **WHEN** the user tabs through the landing page
- **THEN** each game card is focusable and activatable via keyboard (rendered as a button or link, not a bare div)

### Requirement: Selecting a game navigates to its page

Activating a game card while signed in SHALL navigate to that game's route without a full page reload. Activating a card while signed out SHALL start Google sign-in that returns to that game's route. While signed out, each card SHALL display a "Requires Login" badge. Each game route SHALL render a page scoped to that game; until game-specific features exist, a placeholder page showing the game's name satisfies this.

#### Scenario: Navigate to Weiss Schwarz

- **WHEN** a signed-in user activates the Weiss Schwarz card
- **THEN** the app navigates to `/weiss-schwarz` and shows the Weiss Schwarz page

#### Scenario: Navigate to Gundam Card Game

- **WHEN** a signed-in user activates the Gundam Card Game card
- **THEN** the app navigates to `/gundam` and shows the Gundam Card Game page

#### Scenario: Signed-out activation starts sign-in

- **WHEN** a signed-out user activates a game card
- **THEN** Google sign-in starts with a redirect back to that game's route, and no in-app navigation occurs

#### Scenario: Requires Login badges

- **WHEN** a signed-out user views the landing page
- **THEN** every game card shows a "Requires Login" badge; signed in, no badge appears

#### Scenario: Direct URL access

- **WHEN** the user opens `/weiss-schwarz` or `/gundam` directly
- **THEN** the app renders on that path (SPA rewrite), showing game content when signed in or the auth gate when signed out

### Requirement: Game art degrades gracefully

Game card artwork SHALL be served from the app's own origin only. When a cover image is missing or fails to load, the card SHALL still render its per-game gradient header, name, publisher, and description, and remain selectable.

#### Scenario: Missing cover image

- **WHEN** a registry entry has no cover image or its image fails to load
- **THEN** the card renders with its gradient header only and remains fully functional

#### Scenario: No external image origins

- **WHEN** the landing page loads in production
- **THEN** no image requests are made to origins outside the deployed app (Content Security Policy compliant)

### Requirement: Selection cards display official cover art

Each selection card SHALL display a self-hosted cover image sourced from the game's publisher: the official Weiss Schwarz card back from the Bushiroad media kit, and an official Gundam Card Game key visual. Cover assets SHALL be web-optimized (WebP, sized for the card header at 2x DPR) with content unaltered beyond encoding and scaling — no cropping, recoloring, or compositing.

#### Scenario: Cards render cover art

- **WHEN** the landing page loads
- **THEN** both the Weiss Schwarz and Gundam Card Game cards show their cover image over the gradient header

#### Scenario: Assets are optimized

- **WHEN** a cover asset is served
- **THEN** it is WebP-encoded and no larger than needed for the 2x-DPR card header (≤ ~1000 px on the long edge)

### Requirement: Landing page shows licensing attribution

The landing page SHALL display a copyright attribution notice crediting `©Bushiroad` and `©SOTSU・SUNRISE ©BANDAI`, visible without interaction. Attribution SHALL appear on every render of the landing page, including when cover images fail to load.

#### Scenario: Attribution visible

- **WHEN** the user visits `/`
- **THEN** a footer notice shows `©Bushiroad` and `©SOTSU・SUNRISE ©BANDAI`

#### Scenario: Attribution survives image failure

- **WHEN** cover images fail to load
- **THEN** the attribution notice is still rendered
