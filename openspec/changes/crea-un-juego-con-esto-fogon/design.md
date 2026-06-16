# Design: crea-un-juego-con-esto-fogon (Fogón)

## Technical Approach

Branching narrative game "Fogón" — a Vite+React SPA consuming an Express API that serves story scenes and manages session state. Story content is a JSON scene graph with flag-based conditions. The same SPA build powers both GitHub Pages (web) and a Capacitor-wrapped Android APK. Monorepo with npm workspaces.

**Key constraint**: the API is required at runtime for session persistence. The web deploy needs a hosted API (or embedded fallback). **Decision: embed story JSON in the client build** and run Express as a dev/standalone server only, so the GitHub Pages SPA is fully self-contained. For Capacitor, the Express server runs embedded via a bundled lightweight approach.

Wait — re-reading the specs: the API serves story data AND manages sessions. For GitHub Pages (static hosting), there is no server. **Revised approach**: story JSON is bundled with the client at build time. Session state is persisted to `localStorage` instead of a remote API. The Express API remains for development and for a future optional multiplayer/cloud-save mode, but the primary playable artifact (web + APK) is serverless.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Story served via API vs bundled JSON | API enables live updates; bundled JSON enables static hosting with zero servers | **Bundled JSON** — story is imported at build time. API endpoint is available for dev mode only |
| Session on server API vs localStorage | Server enables cloud sync; localStorage is simpler and works offline | **localStorage** — game state is ephemeral per device, matching the rollback plan |
| React Router (BrowserRouter) vs HashRouter | BrowserRouter needs server 404 fallback; HashRouter works everywhere with zero config | **HashRouter** — works on GitHub Pages and Capacitor without redirect rules |
| Redux / Zustand vs React Context | Redux overkill for linear scene state; Context + useReducer fits the graph traversal pattern | **React Context + useReducer** — single `GameState` reducer covers scene, flags, UI phase |
| Typewriter via CSS animation vs JS interval | CSS `@keyframes` steps is performant but rigid; JS interval handles per-char reveal + tap-to-skip | **JS interval** — per-character reveal with skip and variable timing per mood |
| Capacitor v3 vs v6 | v6 is current LTS, wider Android API coverage | **Capacitor v6** — latest stable, better WebView support |

## Data Flow

```
┌──────────────┐     GET /api/story/:id      ┌──────────────┐
│   Express    │  ◄───────────────────────    │   React      │
│   API (dev)  │  ──────── JSON scene ──────► │   SPA        │
│              │                              │              │
│  story.json  │     (dev only, story is      │  Context     │
│  sessions{}  │      bundled in prod)         │  useReducer  │
└──────────────┘                              │              │
                                              │  SceneView   │
Player ──► Choice ──► evaluate ──►           │  ChoiceList  │
         conditions     save to localStorage  │  Typewriter  │
                                              └──────┬───────┘
                                                     │
                                           ┌──────────▼────────┐
                                           │  localStorage      │
                                           │  fogon_session: {  │
                                           │    currentScene,   │
                                           │    flags,          │
                                           │    timestamp       │
                                           │  }                 │
                                           └───────────────────┘
```

## Folder Layout

```
fogon/
├── package.json              # Workspace root
├── capacitor.config.ts       # Capacitor config (webDir: client/dist)
├── .github/workflows/
│   └── deploy.yml            # CI: build web + Pages deploy + optional APK
├── story/
│   └── fogon-chapter-1.json  # Scene graph (canonical source)
├── client/                   # Vite + React SPA
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── game/
│       │   ├── GameContext.tsx     # useReducer: scene, flags, phase
│       │   ├── narrativeEngine.ts  # eval conditions, traverse
│       │   ├── typewriter.ts      # char-by-char reveal
│       │   └── storage.ts         # localStorage read/write
│       ├── scenes/
│       │   ├── SceneView.tsx       # render scene text + mood
│       │   ├── ChoiceList.tsx      # filter + render choices
│       │   └── Epilogue.tsx        # terminal scene + restart
│       ├── ui/
│       │   ├── TypewriterText.tsx  # char-by-char with skip
│       │   ├── SaveToast.tsx       # "Guardando..." indicator
│       │   └── FireParticles.tsx   # CSS particle background
│       ├── theme.css               # dark palette, fire glow
│       └── types.ts                # Scene, Choice, GameState
└── server/                   # Express API (dev mode only)
    ├── package.json
    └── src/
        ├── index.ts
        ├── routes/
        │   └── story.ts
        └── data/
            └── story.ts      # re-exports bundled JSON
```

## Interfaces / Contracts

```typescript
// client/src/types.ts
interface Scene {
  id: string;
  title: string;
  body: string;
  mood: 'ominous' | 'curious' | 'calm' | 'urgent';
  choices: Choice[];
}

interface Choice {
  target: string;
  preview: string;
  requires?: Record<string, boolean>;
  sets?: Record<string, boolean>;
}

interface GameState {
  currentScene: string;
  flags: Record<string, boolean>;
  phase: 'loading' | 'revealing' | 'choosing' | 'epilogue';
  history: string[];  // visited scene IDs
}
```

## CI Pipeline

```
push to main
  │
  ├── job: build-web
  │   ├── actions/checkout
  │   ├── actions/setup-node
  │   ├── npm ci
  │   ├── npm run build (Vite → client/dist/)
  │   ├── actions/upload-pages-artifact
  │   └── actions/deploy-pages ──► https://{owner}.github.io/fogon/
  │
  └── job: build-apk (optional, continue-on-error)
      ├── actions/setup-java (Android SDK)
      ├── npx cap sync
      ├── ./gradlew assembleDebug
      └── actions/upload-artifact (fogon.apk, 7-day retention)
```

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | `narrativeEngine.ts` — traversal, conditions, flag eval | Vitest: mock scene graph, assert transitions and hidden/visible choices |
| Unit | `typewriter.ts` — char interval, skip, completion | Vitest: fake timers, assert callback sequence |
| Unit | `storage.ts` — localStorage save/load/clear | Vitest: mock Storage API, assert round-trip fidelity |
| Unit | API routes — GET scene, POST/GET/PUT session | Vitest + supertest: in-memory store, assert status + body |
| Integration | Full choice flow: render → click → transition | Vitest + React Testing Library: render SceneView, click choice, assert new scene renders |
| E2E | Browser: new game → make choices → reload → session restored | Playwright on dev server |

## Migration / Rollout

No migration required — greenfield project. First playable chapter delivered as chained PR #1 (story + engine + UI), then PR #2 (CI + deploy), then PR #3 (Capacitor APK).

## Open Questions

- [ ] Dev API server: keep as a standalone process or embed a lightweight Express-in-worker for local dev?
- [ ] Story JSON schema versioning — add a `$schema` or `version` field for forward compat?
- [ ] Capacitor splash screen / app icon — use a placeholder for now?
