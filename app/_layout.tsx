// app/_layout.tsx
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { colors } from "@/utils/colors";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import { styles } from "@/styles/rootStyle";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
              <StatusBar style="dark" translucent />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(home)" />
              </Stack>
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
