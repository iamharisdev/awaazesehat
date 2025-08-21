import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { styles } from "@/styles/login";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const Login = () => {
  const { t } = useTranslation();
  const [isEmail, setIsEmail] = useState("");
  return (
    <KeyboardAvoidingWrapper>
      <AppHeader
        leftIcon={true}
        rightIcon={true}
        onLeftPress={() => console.log("Back pressed")}
        onRightPress={() => console.log("Close pressed")}
      />
      <View style={styles.subContainer}>
        <Text style={styles.heading}>{t("Create account with email")}</Text>
        <Text style={styles.headingLight}>
          {t(
            "We will be sending you an OTP on this email, it helps us keep your account secure."
          )}
        </Text>
        <AppInput
          label={t("Your email *")}
          inputProps={{
            value: isEmail,
            onChangeText: setIsEmail,
            placeholder: "Enter",
          }}
        />
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            {t("By Signing up, you agree to Awaaz-e-Sehat’s")}{" "}
            <Text style={styles.underLineText}>{t("Terms of Services")}</Text>{" "}
            {t("and")}{" "}
            <Text style={styles.underLineText}> {t("Privacy Policy")}</Text>
          </Text>
          <Button
            disabled={isEmail ? false : true}
            title={t("Send code")}
            style={styles.btnViewStyle}
          />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;
