# Changelog

## 1.0.0 (2026-06-16)

### Features
- **narrative-engine**: scene graph traversal with conditional branching and flag-based state
- **game-ui-react**: typewriter text reveal, choice selection, scene transitions, fire particle effect
- **game-api-express**: dev server with story endpoints and static file serving
- **story-content-fogon**: initial chapter JSON with branching beats based on the Fogón narrative
- **android-capacitor**: Capacitor wrapper for Android APK builds
- **deploy-github-pages**: CI pipeline building and deploying to GitHub Pages

### Architecture
- Monorepo with npm workspaces (client + server)
- Serverless production mode: story content bundled at build time, state persisted to localStorage
- HashRouter for SPA compatibility with Capacitor WebView
