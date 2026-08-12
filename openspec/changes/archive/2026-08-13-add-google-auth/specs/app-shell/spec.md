## MODIFIED Requirements

### Requirement: Persistent navbar with brand link

The system SHALL render a navbar on every route, containing the brand mark and app name "The JonZone Card Zone" as a link to `/`, and an auth section on the right (per the `auth` capability).

#### Scenario: Navbar on landing page

- **WHEN** the user visits `/`
- **THEN** the navbar is visible with the brand link

#### Scenario: Navbar on game pages

- **WHEN** the user visits `/weiss-schwarz` or `/gundam`
- **THEN** the navbar is visible and clicking the brand returns to `/`
