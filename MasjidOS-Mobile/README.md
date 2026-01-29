# MasjidOS Mobile

React Native (Expo) wrapper for the MasjidOS web application.

## Features

- 📱 Native app wrapper for iOS and Android
- 🔄 Pull-to-refresh
- ⬅️ Android back button support
- 🎨 MasjidOS branding

## Quick Start

```bash
# Install dependencies
npm install

# Run on iOS Simulator
npm run ios

# Run on Android Emulator
npm run android

# Run in web browser
npm run web
```

## Build for Production

```bash
# Build APK (Android)
npx eas build --platform android --profile preview

# Build IPA (iOS)
npx eas build --platform ios --profile preview
```

## Configuration

The app loads `https://masjid-os.vercel.app` by default.

To change the URL, edit `App.tsx`:

```typescript
const APP_URL = 'https://your-custom-url.com';
```

## Tech Stack

- Expo SDK 54
- React Native WebView
- TypeScript
