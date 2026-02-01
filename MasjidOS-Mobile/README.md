# MasjidOS Mobile

The official mobile companion app for MasjidOS, built with React Native and Expo. This app allows mosque administrators and treasurers to manage operations on the go.

## 📱 Features

- **Native Authentication**: Secure login integration with the MasjidOS backend.
- **Dashboard Overview**: View real-time donation totals and upcoming events.
- **Financial Management**:
    - View comprehensive transaction lists.
    - Filter transactions by Income or Expense.
    - **Add Transactions**: Record new income or expenses directly from the app.
- **Donation Insights**: View detailed donor lists and anonymous contributions.
- **Activity Monitoring**: Stay updated with a list of upcoming mosque activities and events.
- **Cross-Platform**: Optimized for both iOS and Android.

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54 (React Native 0.81)
- **Language**: TypeScript
- **Navigation**: React Navigation (Bottom Tabs & Native Stack)
- **State/API**: Axios, React Hooks
- **Icons**: Lucide React Native
- **Storage**: Expo Secure Store

## 🏁 Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm
- [Expo Go](https://expo.dev/client) app installed on your physical device, or an Android/iOS emulator.

### Installation

1.  **Navigate to the mobile directory:**
    ```bash
    cd MasjidOS-Mobile
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```

4.  **Run on Device/Emulator:**
    -   **Physical Device:** Scan the QR code with the Expo Go app.
    -   **iOS Simulator:** Press `i` in the terminal.
    -   **Android Emulator:** Press `a` in the terminal.

## 🧪 Testing

We use Jest and React Native Testing Library for unit and integration testing.

```bash
# Run all tests
npm test

# Run tests with coverage
npx jest --coverage
```

## 📦 Build for Production

```bash
# Build APK (Android)
npx eas build --platform android --profile preview

# Build IPA (iOS)
npx eas build --platform ios --profile preview
```