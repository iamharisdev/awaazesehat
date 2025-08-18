import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";

import { router } from "expo-router";
import { setToken } from "../../features/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  return (
    <View>
      <Text>Login</Text>
      <Button title="Login" onPress={() => dispatch(setToken("demo-token"))} />
      <Button title="Go to Signup" onPress={() => router.push("/signup")} />
      <Button
        title="Forgot Password?"
        onPress={() => router.push("/forgot")}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
