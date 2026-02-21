# 🛍️ E-Commerce App

A cross-platform mobile e-commerce application built with **React Native** and **Expo**, supporting both Android and iOS. The app features product listing, product details, voice search, offline-first data handling, and a native splash screen.

---

## 📱 Features

### Core Requirements

- ✅ **Product Listing Screen** — Browse all products in a clean 2-column grid layout
- ✅ **Product Detail Screen** — View full product info including image, description, rating, and price
- ✅ **Search by Name or Category** — Real-time filtering as you type
- ✅ **Cross-platform** — Runs on both Android and iOS

### Plus Points

- ✅ **E2E Testing** — Maestro test suite covering product list and detail flow
- ✅ **Offline-First** — Products cached with AsyncStorage; app works without internet
- ✅ **Splash Screen** — Native splash screen configured for both Android and iOS
- ✅ **Voice Search** — Tap the mic icon to search by voice using `expo-speech-recognition`

---

## 🛠️ Tech Stack

| Technology              | Purpose                         |
| ----------------------- | ------------------------------- |
| React Native 0.76       | Cross-platform mobile framework |
| Expo SDK 54             | Development platform            |
| TypeScript              | Type safety                     |
| React Navigation        | Screen navigation               |
| AsyncStorage            | Offline caching                 |
| NetInfo                 | Network connectivity detection  |
| expo-speech-recognition | Voice search                    |
| expo-splash-screen      | Native splash screen            |
| Maestro                 | E2E testing                     |

---

## 📂 Project Structure

```
e-commerce/
├── assets/
│   ├── fonts/                  # Inter font files
│   ├── splash-icon.png         # Splash screen image
│   ├── icon.png                # App icon
│   └── adaptive-icon.png       # Android adaptive icon
├── src/
│   ├── components/
│   │   ├── CustomHeader.tsx    # Search bar with voice input
│   │   └── ProductCard.tsx     # Product grid card
│   ├── hooks/
│   │   └── useProductHooks.ts  # Products data + offline logic
│   ├── navigation/
│   │   └── AppNavigator.tsx    # Stack navigator
│   ├── screens/
│   │   ├── Splash/
│   │   │   └── SplashScreen.tsx
│   │   ├── Home/
│   │   │   └── ProductListScreen.tsx
│   │   └── Details/
│   │       ├── ProductDetailsScreen.tsx
│   │       └── productDetailsScreenStyle.ts
│   ├── service/
│   │   └── productService.ts   # API calls
│   └── types/
│       └── product.ts          # TypeScript interfaces
├── App.tsx
├── app.json
├── package.json
└── .maestro/                   # E2E test flows
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20+
- Expo CLI
- Xcode (for iOS)
- Android Studio (for Android)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/e-commerce.git
cd e-commerce

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Device/Simulator

```bash
# iOS (requires Mac + Xcode)
npx expo run:ios

# Android
npx expo run:android
```

> ⚠️ Use `npx expo run:ios` / `npx expo run:android` instead of Expo Go to see the native splash screen and voice search working correctly.

---

## 🧪 E2E Testing

Tests are written with [Maestro](https://maestro.mobile.dev).

### Install Maestro

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

### Run Tests

```bash
maestro test .maestro/flow.yaml
```

### Test Coverage

- ✅ App launches successfully
- ✅ Product list screen renders
- ✅ Tapping a product navigates to detail screen
- ✅ "ADD TO CART" button is visible on detail screen

---

## 📶 Offline-First Approach

- On first launch, products are fetched from the API and cached locally using `AsyncStorage`
- On subsequent launches, cached data loads instantly while a fresh fetch happens in the background
- If the device is offline, cached data is displayed with an offline banner
- Pull-to-refresh triggers a new API call when back online

---

## 🎤 Voice Search

- Tap the microphone icon in the search bar
- Grant microphone and speech recognition permissions when prompted
- Speak a product name or category
- The search bar auto-fills with your spoken query

> ⚠️ Voice search requires a **real physical device** — it does not work on simulators/emulators due to lack of microphone hardware.

---

## 🖼️ Splash Screen

Native splash screen is configured for both platforms via `expo-splash-screen` plugin in `app.json`. A JS-based animated splash screen with loading dots is also included for use during development with Expo Go.

---

## 📦 Key Dependencies

```json
{
  "expo": "~54.0.33",
  "react-native": "0.76.9",
  "react": "18.3.1",
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-native-community/netinfo": "11.4.1",
  "expo-speech-recognition": "latest",
  "expo-splash-screen": "~31.0.13"
}
```

---

## 🔑 API

Products are fetched from [Fake Store API](https://fakestoreapi.com).

```
GET https://fakestoreapi.com/products
```

---

## 👨‍💻 Author

**Biswa** — [@biswa4414](https://github.com/biswa4414)
