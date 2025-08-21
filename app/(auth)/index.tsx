import { Icons } from "@/assets/svgs";
import { Button } from "@/components";
import { styles } from "@/styles/startupStyle";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ImageBackground,
  Text,
  View
} from "react-native";
import { useDispatch } from "react-redux";

const Index = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const switchLanguage = async () => {
    const newLang = i18n.language === "en" ? "ur" : "en";
    await i18n.changeLanguage(newLang);
  };

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
            btnProps={{ onPress: () => switchLanguage() }}
            style={styles.btn1ViewStyle}
            textStyle={styles.btn1TextStyle}
          />
          <Button
            title={t("Log in")}
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
