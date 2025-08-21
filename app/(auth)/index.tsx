import React from "react";
import { I18nManager, ImageBackground, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "@/components";
import { styles } from "@/styles/startupStyle";
import { Icons } from "@/assets/svgs";
import { useTranslation } from "react-i18next";
import * as Updates from "expo-updates";

const Index = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const switchLanguage = async () => {
    const newLang = i18n.language === "en" ? "ur" : "en";
    await i18n.changeLanguage(newLang);

    // if (newLang === "ur") {
    //   I18nManager.forceRTL(true);
    // } else {
    //   I18nManager.forceRTL(false);
    // }

    // await Updates.reloadAsync(); // reload app to apply RTL layout
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
        <Text style={styles.headingText}>{t("welcome")}</Text>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.footerText}>
            By Signing up, you agree to Awaaz-e-Sehat’s{" "}
            <Text style={styles.underLineText}>Terms of Services</Text> and{" "}
            <Text style={styles.underLineText}> Privacy Policy</Text>
          </Text>

          <Button
            title="Hello"
            btnProps={{ onPress: () => switchLanguage() }}
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
