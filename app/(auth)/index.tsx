import { Icons } from "@/assets/svgs";
import { Button } from "@/components";
import { setIsStatus } from "@/features/userSlice";
import { useAppDispatch } from "@/store";
import { styles } from "@/styles/startupStyle";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, Text, View } from "react-native";

const Index = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const route = useRouter();

  const pathname = usePathname();

  const switchToAuth = async () => {
    dispatch(setIsStatus("auth"));
    route.push("login");
  };

  useEffect(() => {
    if (pathname == "/") {
      dispatch(setIsStatus("startup"));
    }
  }, [pathname]);

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
          {" "}
          {t("Welcome! Your partner in better patient guidance and care")}
        </Text>
        <View style={styles.flex}>
          <Text style={styles.footerText}>
            {t("By Signing up, you agree to Awaaz-e-Sehat’s")}{" "}
            <Text style={styles.underLineText}>{t("Terms of Services")}</Text>{" "}
            {t("and")}{" "}
            <Text style={styles.underLineText}> {t("Privacy Policy")}</Text>
          </Text>

          <Button
            title={t("Create an account")}
            btnProps={{ onPress: switchToAuth }}
            style={styles.btn1ViewStyle}
            textStyle={styles.btn1TextStyle}
          />
          <Button
            title={t("Log in")}
            style={styles.btn2ViewStyle}
            textStyle={[styles.btn1TextStyle, styles.btn2TextStyle]}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Index;
