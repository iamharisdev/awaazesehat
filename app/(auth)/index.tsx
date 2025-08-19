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
    
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
