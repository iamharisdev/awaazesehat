// app/_layout.tsx
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../store";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }} edges={["top", "bottom"]}>
            <StatusBar style="dark" translucent />
            <Stack screenOptions={{ headerShown: false }} >
              <Stack.Screen name="(auth)" />
              <Stack.Screen name="(home)" />
            </Stack>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
