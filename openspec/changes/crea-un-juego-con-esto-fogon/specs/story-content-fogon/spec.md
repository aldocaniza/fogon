# Story Content: Fogón Specification

## Purpose

First chapter of "Fogón": the player wakes at 3am to a crackling fire and mutters unknown archaic words. JSON scene graph with at least 2 distinct branches and 5–8 beats.

## Requirements

### Requirement: Scene Graph Schema

Every scene MUST have fields: `id`, `title`, `body` (narrative text), `mood` (atmospheric cue), and `choices[]`. Each choice MUST have `target`, `preview` (button label), optional `requires` (flag condition), and optional `sets` (flag mutations).

#### Scenario: Valid scene structure

- GIVEN the story JSON for scene `fogon-001`
- THEN the object SHALL contain `id`, `title`, `body`, `mood`, and `choices`
- AND `choices` SHALL be a non-empty array

#### Scenario: Choice with condition

- GIVEN a choice object
- THEN `target` SHALL reference an existing scene ID
- AND `preview` SHALL be a non-empty string
- AND `requires` SHALL be an object or absent
- AND `sets` SHALL be an object or absent

### Requirement: Opening Scene

The opening scene SHALL establish the 3am fire, the archaic muttering, and offer the player a meaningful first choice.

#### Scenario: Game start

- GIVEN the player starts a new game
- WHEN the opening scene `fogon-001` renders
- THEN the body SHALL describe the fire and the archaic words
- AND the player SHALL have at least 2 choices (e.g., investigate the fire / try to remember the words)

### Requirement: Branching Minimum

The chapter SHALL have at least 2 distinct terminal endings reachable through different choice paths.

#### Scenario: Two distinct endings

- GIVEN the player always picks choice path A
- WHEN they reach a terminal scene
- THEN the epilogue text SHALL differ from path B's epilogue
- AND path A SHALL set flag `ending_a: true` while path B sets `ending_b: true`
