# Awaaz-e-Sehat App

A React Native mobile application built with Expo for health and wellness management.

## 📱 About

Awaaz-e-Sehat (Voice of Health) is a mobile application designed to help users manage their health and wellness. Built with modern React Native and Expo technologies, it provides a cross-platform solution for iOS and Android devices.

## 🚀 Features

- Cross-platform mobile app (iOS & Android)
- Modern React Native architecture
- TypeScript support for better code quality
- Expo managed workflow for easy development and deployment

## 🛠️ Tech Stack

- **Framework**: React Native 0.79.5
- **Runtime**: Expo SDK 53
- **Language**: TypeScript 5.8.3
- **React**: 19.0.0
- **Build Tool**: Expo CLI

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd awaazesehat-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the Development Server

```bash
npm start
# or
yarn start
```

This will start the Expo development server and open the Expo DevTools in your browser.

### 4. Run on Device/Simulator

- **iOS Simulator**: Press `i` in the terminal or click "Run on iOS simulator" in Expo DevTools
- **Android Emulator**: Press `a` in the terminal or click "Run on Android device/emulator" in Expo DevTools
- **Physical Device**: Scan the QR code with the Expo Go app

## 📱 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Start the app on Android device/emulator
- `npm run ios` - Start the app on iOS simulator
- `npm run web` - Start the app in web browser

## 🏗️ Project Structure

```
awaazesehat-app/
├── App.tsx              # Main application component
├── index.ts             # Entry point
├── app.json             # Expo configuration
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── assets/              # App icons and splash screens
    ├── icon.png
    ├── adaptive-icon.png
    ├── splash-icon.png
    └── favicon.png
```

## 🔧 Configuration

The app is configured through `app.json` with the following key settings:

- **App Name**: Awaaz-e-Sehat
- **Version**: 1.0.0
- **Orientation**: Portrait
- **Platforms**: iOS, Android, Web
- **New Architecture**: Enabled

## 📱 Platform Support

- ✅ iOS (iPhone & iPad)
- ✅ Android (Phone & Tablet)
- ✅ Web (Progressive Web App)

## 🚀 Development

### Adding New Dependencies

```bash
npm install <package-name>
# or
yarn add <package-name>
```

### TypeScript

This project uses TypeScript for better type safety and developer experience. All new components and functions should be written in TypeScript.

### Code Style

- Use functional components with hooks
- Follow React Native best practices
- Maintain consistent naming conventions
- Add proper TypeScript types

## 📦 Building for Production

### Android APK

```bash
expo build:android
```

### iOS IPA

```bash
expo build:ios
```

### Web Build

```bash
expo build:web
```

## 🧪 Testing

To run tests (when implemented):

```bash
npm test
```

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please contact the development team.

## 🔄 Version History

- **v1.0.0** - Initial release with basic app structure

---

**Note**: This is a development version. Features and functionality may change as the project evolves.
