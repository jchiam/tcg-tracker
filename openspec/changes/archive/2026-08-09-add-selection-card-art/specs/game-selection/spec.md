## ADDED Requirements

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
