# Fogón — Architecture Overview

## Project Structure

```
fogon/
├── client/                  # React SPA (Vite)
│   ├── src/
│   │   ├── game/            # Core game logic
│   │   │   ├── GameContext.tsx   # Global state (useReducer)
│   │   │   ├── narrativeEngine.ts  # Scene traversal & conditions
│   │   │   ├── storage.ts        # localStorage persistence
│   │   │   └── typewriter.ts     # Character-by-character reveal
│   │   ├── scenes/          # UI components
│   │   │   ├── SceneView.tsx
│   │   │   ├── ChoiceList.tsx
│   │   │   └── Epilogue.tsx
│   │   ├── ui/              # Reusable UI primitives
│   │   │   ├── TypewriterText.tsx
│   │   │   └── FireParticles.tsx
│   │   ├── theme.css        # Global styles & dark theme
│   │   ├── types.ts         # Shared type definitions
│   │   └── main.tsx         # Entry point (HashRouter)
│   └── vite.config.ts
├── server/                  # Express dev server
│   └── src/index.ts         # API & static file serving
├── story/                   # Narrative JSON files
├── .github/workflows/       # CI/CD pipeline
├── capacitor.config.ts      # Capacitor Android config
├── docs/                    # Documentation
└── openspec/                # SDD artifacts
```

## Data Flow

```
[React SPA] ──reads──> story/fogon-chapter-1.json (bundled at build)
     │
     ├── [GameContext] ──manages──> GameState (currentScene, flags, history)
     │
     ├── [narrativeEngine] ──> evaluates conditions, returns visible choices
     │
     ├── [storage] ──persists──> localStorage (fogon_session key)
     │
     └── [UI] ──renders──> SceneView → TypewriterText → ChoiceList
```

## Build & Deploy

| Target | Command | Output |
|--------|---------|--------|
| Web (dev) | `npm run dev` | `http://localhost:5173` |
| Web (build) | `npm run build` | `client/dist/` |
| Android APK | `npx cap sync && npx cap open android` | `android/app/build/outputs/apk/` |
| GitHub Pages | Push to `main` → CI auto-deploys | `https://aldocaniza.github.io/fogon/` |

## Conventions

- **State**: Single source of truth via `GameContext` + `useReducer`. No server dependency in production.
- **Routing**: `HashRouter` for compatibility with both Capacitor WebView and GitHub Pages.
- **Story content**: JSON files in `story/` with `Scene[]` array. Each scene has `id`, `title`, `body`, `mood`, and `choices[]`.
- **Flags**: Boolean key-value store driving conditional branching via `requires` / `sets` on choices.

## Contributing

1. Create a feature branch from `main`.
2. Make changes following existing patterns.
3. Run `npm run lint` and `npm run build` before pushing.
4. Open a PR with a descriptive title referencing the change.
