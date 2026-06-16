# Game UI (React) Specification

## Purpose

Atmospheric narrative UI: rendered story text, choice buttons, fade transitions, and a dark fire-lit theme. Delivered as a Vite + React SPA.

## Requirements

### Requirement: Narrative Display

The system MUST render scene text (title, body, mood) with a slow typewriter reveal and markdown support for emphasis.

#### Scenario: Typewriter reveal

- GIVEN scene text "The fire crackles"
- WHEN the scene loads
- THEN characters SHALL appear one-by-one over 1.5 s
- AND the user SHALL NOT see the full text until reveal completes

#### Scenario: Skip to full text

- GIVEN the typewriter animation is playing
- WHEN the player taps anywhere
- THEN the animation SHALL instantly complete
- AND the full scene text SHALL be displayed

### Requirement: Choice Buttons

The system MUST render each available choice as a distinct clickable button with hover glow effect.

#### Scenario: Choices appear after text reveal

- GIVEN the typewriter animation has finished
- THEN SHALL render one button per available choice
- AND each button SHALL show the choice preview text

#### Scenario: No choices (epilogue)

- GIVEN a terminal scene
- WHEN the scene renders
- THEN SHALL show a "Volver a empezar" (Restart) button instead of choices

### Requirement: Atmospheric Theme

The system SHALL use a dark palette with amber/ember accent colors and a subtle fire-particle background animation.

#### Scenario: Default theme applied

- GIVEN the app loads
- THEN the background SHALL be near-black (`#0a0806`)
- AND the text accent SHALL be amber (`#e8923f`)
- AND a CSS keyframe fire-glow animation SHALL run on the header

### Requirement: Session Save Indicator

The system SHALL save the current scene and flags to the API after each choice.

#### Scenario: Auto-save after choice

- GIVEN the player selects a choice
- WHEN the transition animation starts
- THEN the UI SHALL POST the updated session state to the API
- AND SHALL display a brief "Guardando..." toast
