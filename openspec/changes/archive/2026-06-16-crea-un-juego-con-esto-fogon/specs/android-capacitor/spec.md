# Android Capacitor Specification

## Purpose

Capacitor wrapper that packages the built Vite SPA into an Android APK for sideloading.

## Requirements

### Requirement: Capacitor Init

The project MUST include a `capacitor.config.ts` pointing the web build output to the Android platform.

#### Scenario: Configuration present

- GIVEN a `capacitor.config.ts` at project root
- WHEN inspected
- THEN `webDir` SHALL point to the Vite build output directory
- AND `appId` SHALL be set to `com.fogon.game`
- AND `appName` SHALL be `Fogón`

### Requirement: Build Script

The root `package.json` SHALL provide a `build:apk` script that runs the Vite build, syncs Capacitor, and produces a debug APK.

#### Scenario: APK produced

- GIVEN Android SDK is available
- WHEN `npm run build:apk` executes
- THEN `npx cap sync` SHALL copy the web build to `android/`
- AND `./gradlew assembleDebug` SHALL produce an APK at `android/app/build/outputs/apk/debug/`
- AND the build process SHALL exit with code 0 on success

#### Scenario: Android SDK missing

- GIVEN no Android SDK is installed
- WHEN `npm run build:apk` runs
- THEN the script SHALL exit with a clear error message suggesting SDK installation steps

### Requirement: Deep Link Fallback

The Capacitor app SHALL use hash-based routing so that deep links work without a server-side redirect.

#### Scenario: App resume restores scene

- GIVEN the user was at scene `fogon-004`
- WHEN the app is backgrounded and resumed
- THEN the UI SHALL restore the last saved scene from the API
