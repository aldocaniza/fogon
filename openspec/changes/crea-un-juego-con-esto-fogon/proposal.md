# Proposal: crea-un-juego-con-esto-fogon

## Intent

Branching narrative game "Fogón" — player wakes at 3am to a crackling fire and mutters unknown archaic words. Delivered as React web app + Android APK (Capacitor) + web on GitHub Pages.

## Scope

### In Scope
- Branching narrative engine (choice-based, state persistence)
- Web UI (React) + backend API (Express/Node)
- First chapter (5–8 branching beats)
- Save/resume across sessions
- Capacitor Android APK build
- GitHub Pages deployment (GitHub Actions)

### Out of Scope
- Multiplayer, audio/SFX, voice acting
- Analytics, leaderboards, achievements
- Accounts, auth, iOS, Play Store publishing

## Capabilities

### New Capabilities
- `narrative-engine`: traversal, choices, flags, branching logic
- `game-ui-react`: narrative UI, transitions, atmospheric theming
- `game-api-express`: story data, state CRUD, session mgmt
- `story-content-fogon`: scenes, choices, flags (JSON)
- `android-capacitor`: Capacitor wrapper for APK build
- `deploy-github-pages`: Actions workflow for web deploy

### Modified Capabilities
- None (greenfield)

## Approach

React (Vite) + Express. Story as JSON scene graph with conditions & transitions.
- **Web**: Static build → GitHub Pages via Actions
- **Mobile**: Capacitor wraps web build → signed APK
- **CI**: Single pipeline builds web + APK on push

## Affected Areas

| Area | Impact | |
|------|--------|-|
| `fogon/client/` | New | React frontend |
| `fogon/server/` | New | Express API, state store |
| `fogon/story/` | New | JSON scene content |
| `fogon/mobile/` | New | Capacitor + Android config |
| `fogon/.github/` | New | Deploy workflows |
| `fogon/package.json` | New | Workspace root |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Narrative scope creep | Medium | Cap chapter at 5–8 beats |
| Capacitor plugin conflicts | Low | Pin versions, smoke-test APK |
| Pages SPA routing | Low | Hash router or 404 fallback |

## Rollback Plan

- Git revert on chained PR branch
- Session state ephemeral — no migration
- APK sideloaded; revert = install previous version

## Dependencies

- Node 18+, npm/yarn
- Capacitor CLI, Android SDK
- GitHub account (Pages)

## Success Criteria

- [ ] Player starts game, reads opening, makes a choice
- [ ] At least 2 distinct story branches reachable
- [ ] State persists across page reload
- [ ] First chapter playable start-to-end
- [ ] `npm run build:apk` produces a working `.apk`
- [ ] Web version live at `https://{user}.github.io/fogon/`
