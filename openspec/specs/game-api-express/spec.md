# Game API (Express) Specification

## Purpose

Express.js API serving story scene data and managing player session state (current scene, flags) with in-memory store.

## Requirements

### Requirement: Story Data Endpoint

The system MUST serve scene definitions by ID from the story JSON.

#### Scenario: Existing scene

- GIVEN scene `fogon-003` exists in the story data
- WHEN the client sends `GET /api/story/fogon-003`
- THEN the response SHALL return `200` with the full scene object: `{id, title, body, mood, choices[]}`

#### Scenario: Unknown scene

- GIVEN a non-existent scene ID `fogon-999`
- WHEN the client sends `GET /api/story/fogon-999`
- THEN the response SHALL return `404` with `{error: "scene not found"}`

### Requirement: Session Create

The system MUST create a new game session with a unique ID and initial flags.

#### Scenario: New session

- WHEN the client sends `POST /api/session`
- THEN the response SHALL return `201` with `{sessionId, currentScene: "fogon-001", flags: {}}`

### Requirement: Session Read and Update

The system MUST read and update session state (current scene + flags).

#### Scenario: Save progress

- GIVEN an existing session `abc-123` with `currentScene: "fogon-002"`
- WHEN the client sends `PUT /api/session/abc-123` with body `{currentScene: "fogon-004", flags: {has_key: true}}`
- THEN the response SHALL return `200`
- AND subsequent `GET /api/session/abc-123` SHALL return the updated state

#### Scenario: Session not found

- WHEN the client sends `GET /api/session/unknown-id`
- THEN the response SHALL return `404` with `{error: "session not found"}`

### Requirement: CORS

The system MUST accept requests from the Vite dev server origin and the GitHub Pages production origin.

#### Scenario: Dev server origin allowed

- WHEN a request arrives from `http://localhost:5173`
- THEN the response SHALL include `Access-Control-Allow-Origin: http://localhost:5173`
