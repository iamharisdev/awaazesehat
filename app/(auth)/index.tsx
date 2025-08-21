import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "@/components";
import { styles } from "@/styles/startupStyle";
import { Icons } from "@/assets/svgs";

const Index = () => {
  const dispatch = useDispatch();
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/pngs/backgroundImage.png")}
    >
      <View style={styles.subContainer}>
        <View style={styles.logo}>
          <Icons.Logo />
        </View>
        <Text style={styles.headingText}>
          {" Welcome! \n Your partner in better patient guidance and care"}
        </Text>
        <View style={styles.flex}>
          <Text style={styles.footerText}>
            By Signing up, you agree to Awaaz-e-Sehat’s{" "}
            <Text style={styles.underLineText}>Terms of Services</Text> and{" "}
            <Text style={styles.underLineText}> Privacy Policy</Text>
          </Text>

          <Button
            title="Hello"
            btnProps={{ onPress: () => console.log("hello") }}
            style={styles.btn1ViewStyle}
            textStyle={styles.btn1TextStyle}
          />
          <Button
            title="Hello"
            btnProps={{ onPress: () => console.log("hello") }}
            style={styles.btn2ViewStyle}
            textStyle={[styles.btn1TextStyle, styles.btn2TextStyle]}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Index;
