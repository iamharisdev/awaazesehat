// app/_layout.tsx
import i18n from "@/i18n";
import { MakeStyles } from "@/styles/rootStyle";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store, useAppSelector } from "../store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RootLayoutContent />
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutContent() {
  const {statusBar} = useAppSelector((state) => state.user);


  const [loaded] = useFonts({
    Regular: require("../assets/fonts/Roboto-Regular.ttf"),
    Medium: require("../assets/fonts/Roboto-Medium.ttf"),
    Bold: require("../assets/fonts/Roboto-Bold.ttf"),
    Italic: require("../assets/fonts/Roboto-Italic.ttf"),
    BoldItalic: require("../assets/fonts/Roboto-BoldItalic.ttf"),
    Black: require("../assets/fonts/Roboto-Black.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const styles = MakeStyles(statusBar);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <StatusBar style="dark" translucent />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(home)" />
      </Stack>
    </SafeAreaView>
  );
}
