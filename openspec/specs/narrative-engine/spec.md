# Narrative Engine Specification

## Purpose

Branching scene graph engine that renders story nodes, evaluates choices against game flags, and transitions between scenes based on player decisions.

## Requirements

### Requirement: Scene Traversal

The system MUST traverse a directed scene graph where each scene has one or more outgoing choices leading to the next scene.

#### Scenario: Basic scene progression

- GIVEN a player at scene `fogon-001`
- WHEN the player selects choice `A`
- THEN the engine transitions to scene `fogon-002`
- AND the choice flag `chose_archaic_word` is set to `true`

#### Scenario: Terminal scene (no choices)

- GIVEN a player at scene `fogon-010`
- WHEN the scene has zero outgoing choices
- THEN the engine SHALL render the epilogue
- AND SHALL NOT offer any choice buttons

### Requirement: Conditional Branching

The engine MUST evaluate `requires` conditions (flag-based) and `sets` mutations on each choice before allowing traversal.

#### Scenario: Condition met

- GIVEN flag `has_torch` is `true` and scene has choice requiring `has_torch`
- WHEN the engine renders choices
- THEN the choice SHALL be visible and selectable

#### Scenario: Condition not met

- GIVEN flag `has_torch` is `false`
- WHEN the engine renders choices
- THEN the choice requiring `has_torch` SHALL be hidden

### Requirement: Flag Persistence

The engine MUST maintain a mutable flag dictionary per session, persisted via the API.

#### Scenario: Flag accumulates across scenes

- GIVEN session flags `{found_key: true}`
- WHEN the player reaches scene `fogon-005`
- THEN the engine SHALL load current flags into the scene context
- AND SHALL evaluate all choice conditions against the merged flag state

#### Scenario: Empty flags

- GIVEN a new session with no flags set
- WHEN the engine evaluates a choice requiring `has_artifact`
- THEN the choice SHALL be hidden
