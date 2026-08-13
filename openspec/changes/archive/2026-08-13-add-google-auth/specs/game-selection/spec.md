## MODIFIED Requirements

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
