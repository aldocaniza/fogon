# Fogón: Branching Narrative Game

A branching narrative game where players wake up at 3 AM to a crackling fire and make choices that shape their story.

## Deployment

### Web

The web version of Fogón is deployed to GitHub Pages. To play:

1. **Build the web app**:
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   - Push your changes to the `main` branch. The GitHub Actions workflow will automatically build and deploy the app to:
     [https://{user}.github.io/fogon/](https://{user}.github.io/fogon/)

### Android APK

To build the Android APK:

1. **Sync Capacitor**:
   ```bash
   cd client
   npx cap sync android
   ```

2. **Build the APK**:
   ```bash
   cd client/android
   ./gradlew assembleDebug
   ```

3. **Locate the APK**:
   The APK will be generated at:
   `client/android/app/build/outputs/apk/debug/app-debug.apk`

4. **Install the APK**:
   - Transfer the APK to your Android device and install it.

### Usage

- Play the game in the browser or via the APK.
- Make choices to shape your story.
- Your progress is saved locally.

---