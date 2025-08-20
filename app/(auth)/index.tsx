import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "@/components";
import { hp, normalizeFont, pxToHp, pxToWp, wp } from "@/utils/responsive";
import { colors } from "@/utils/colors";
import { Icons } from "@/assets/svgs";

const Login = () => {
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
        <View style={{ flex: 0.3 }}>
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

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  logo: {
    flex: 0.6,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: hp(3),
  },

  headingText: {
    flex: 0.1,
    color: colors.white,
    fontFamily: "Medium",
    fontWeight: 500,
    fontSize: normalizeFont(19),
    textAlign: "center",
    marginBottom: hp(2),
    width: wp(pxToWp(299)),
    alignSelf: "center",
  },

  footerText: {
    color: colors.white,
    fontFamily: "Regular",
    fontWeight: 500,
    fontSize: normalizeFont(13),
    textAlign: "center",
    marginBottom: hp(2),
    marginHorizontal: wp(3),
  },
  underLineText: {
    textDecorationLine: "underline",
    fontFamily: "Medium",
    fontWeight: 400,
  },
  btn1TextStyle: {
    color: colors.green.g20,
  },
  btn2TextStyle: {
    color: colors.white,
  },
  btn1ViewStyle: { backgroundColor: colors.white, marginBottom: hp(2) },
  btn2ViewStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.white,
  },
});
