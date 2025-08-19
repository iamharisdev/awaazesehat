import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Login' }} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="forgot" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="otp" options={{ title: 'Verify OTP' }} />
    </Stack>
  );
}
