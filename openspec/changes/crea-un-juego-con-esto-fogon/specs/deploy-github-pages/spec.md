# Deploy: GitHub Pages Specification

## Purpose

GitHub Actions workflow that builds the Vite SPA and deploys to GitHub Pages on push to `main`. Also verifies the Android APK build compiles.

## Requirements

### Requirement: CI Workflow

The repository SHALL contain `.github/workflows/deploy.yml` triggered on `push` to `main` and manual `workflow_dispatch`.

#### Scenario: Push to main triggers deploy

- GIVEN a push to the `main` branch
- WHEN the workflow starts
- THEN it SHALL checkout the repo, install dependencies, and run `npm run build`

#### Scenario: Web deploy to Pages

- GIVEN the Vite build succeeds
- WHEN the `actions/deploy-pages` action runs
- THEN the SPA SHALL be live at `https://{owner}.github.io/fogon/`
- AND the deploy SHALL use hash routing to handle SPA 404 fallback

### Requirement: Artifact Caching

The workflow SHALL cache `node_modules` between runs to speed up subsequent builds.

#### Scenario: Cache hit speeds build

- GIVEN the `package-lock.json` has not changed
- WHEN the workflow runs
- THEN the `actions/cache` step SHALL restore `node_modules`
- AND `npm ci` SHALL complete in under 30 seconds

### Requirement: Optional APK Build Step

The workflow SHALL include a job that runs `npm run build:apk` and uploads the APK as a build artifact (allowed to fail gracefully if SDK is absent).

#### Scenario: APK build uploads artifact

- GIVEN the Android SDK is available in the runner
- WHEN the APK job runs
- THEN it SHALL produce `fogon.apk`
- AND the `actions/upload-artifact` step SHALL save it with retention of 7 days

#### Scenario: SDK unavailable (soft fail)

- GIVEN no Android SDK is configured in the runner
- WHEN the APK job runs
- THEN the job SHALL log a warning
- AND SHALL NOT fail the overall workflow
