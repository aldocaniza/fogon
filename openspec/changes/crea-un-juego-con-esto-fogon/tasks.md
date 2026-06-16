# Tasks: crea-un-juego-con-esto-fogon (Fogón)

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: Medium

## Review Workload Forecast
- Estimated changed lines: 620‑750
- 400-line budget risk: Medium
- Chained PRs recommended: Yes
- Delivery strategy: force-chained
- Decision needed before apply: No
- Suggested work‑unit PR split: PR 1 (foundation), PR 2 (core engine & UI), PR 3 (CI & deployment), PR 4 (testing & docs)

## Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Monorepo setup, tooling, basic project structure | PR 1 | Creates workspace, Vite+React client, Express server packages |
| 2 | Core game engine, context, UI components, story JSON integration | PR 2 | Depends on Unit 1 |
| 3 | CI pipeline, GitHub Actions, Capacitor config | PR 3 | Depends on Units 1‑2 |
| 4 | Comprehensive test suite, documentation, final polishing | PR 4 | Depends on Units 1‑3 |

## Phase 1: Foundation / Infrastructure
- [x] 1.1 Create monorepo root `package.json` with npm workspaces for `client` and `server`
- [x] 1.2 Scaffold Vite+React app in `client/` (typescript, vite config)
- [x] 1.3 Scaffold minimal Express server in `server/` (typescript, basic start script)
- [x] 1.4 Add shared ESLint/Prettier config at repo root
- [x] 1.5 Configure TypeScript `tsconfig.json` for base and project references
- [x] 1.6 Install core dependencies (react, react‑dom, vite, express, types)
- [x] 1.7 Add `capacitor.config.ts` placeholder and install Capacitor v6 packages

**Est. changed lines:** 120‑150
**Dependencies:** none
**Work‑unit:** PR 1

## Phase 2: Core Implementation
- [x] 2.1 Define `client/src/types.ts` with `Scene`, `Choice`, `GameState` interfaces
- [x] 2.2 Implement `GameContext.tsx` (React Context + useReducer) for global state
- [x] 2.3 Build `narrativeEngine.ts` – condition evaluation, flag handling, scene traversal
- [x] 2.4 Implement `typewriter.ts` – character‑by‑character reveal with skip logic
- [x] 2.5 Implement `storage.ts` – persist/restore `GameState` to `localStorage`
- [x] 2.6 Create UI components: `SceneView.tsx`, `ChoiceList.tsx`, `Epilogue.tsx`, `TypewriterText.tsx`
- [ ] 2.7 Add visual assets: `theme.css`, `FireParticles.tsx`
- [ ] 2.8 Place initial story JSON `story/fogon-chapter-1.json`
- [ ] 2.9 Wire client entry `main.tsx` and `App.tsx` to use `HashRouter` and `GameContext`
- [ ] 2.10 Adjust Express dev server to serve static `client/dist` and provide `/api/story/:id` endpoint for dev mode only

**Est. changed lines:** 250‑300
**Dependencies:** Phase 1 completion
**Work‑unit:** PR 2 (depends on PR 1)

## Phase 3: CI / Deployment & Capacitor
- [ ] 3.1 Add GitHub Actions workflow `.github/workflows/deploy.yml` (build web, upload pages artifact)
- [ ] 3.2 Add optional job `build-apk` (Capacitor sync, Gradle build, upload artifact)
- [ ] 3.3 Configure Vite `base` for GitHub Pages (`/fogon/`)
- [ ] 3.4 Add Capacitor Android platform, update `capacitor.config.ts` (`webDir: client/dist`)
- [ ] 3.5 Create `README.md` deployment section with usage instructions

**Est. changed lines:** 80‑110
**Dependencies:** Phase 2
**Work‑unit:** PR 3 (depends on PR 2)

## Phase 4: Testing & Documentation
- [ ] 4.1 Write unit tests for `narrativeEngine.ts` (Vitest, mock scene graph)
- [ ] 4.2 Write unit tests for `typewriter.ts` (fake timers)
- [ ] 4.3 Write unit tests for `storage.ts` (mock Storage API)
- [ ] 4.4 Write API route tests for Express dev server (supertest)
- [ ] 4.5 Add integration test: render `SceneView`, simulate choice click, assert scene change
- [ ] 4.6 Add Playwright E2E test: start dev server, play through first two scenes, reload, verify state restored
- [ ] 4.7 Update `docs/README.md` with architecture diagram and contribution guide
- [ ] 4.8 Add `CHANGELOG.md` entry for initial release

**Est. changed lines:** 100‑130
**Dependencies:** Phases 1‑3
**Work‑unit:** PR 4 (depends on PR 3)

## Phase 5: Cleanup & Polishing (optional but included in PR 4)
- [ ] 5.1 Remove any placeholder code/comments from scaffolding
- [ ] 5.2 Ensure lint passes, run `npm run lint -- --fix`
- [ ] 5.3 Verify build size < 2 MB (gzip)

**Est. changed lines:** 20‑30
**Dependencies:** PR 4
**Work‑unit:** PR 4
