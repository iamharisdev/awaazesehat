import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { styles } from "@/styles/forgotStyle";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} />
      <View style={styles.subContainer}>
        <Text style={styles.heading}>{t("Reset your password")}</Text>
        <Text style={styles.headingLight}>
          {t(
            "Enter the email address you signed up with. We will send you an OTP to reset password."
          )}
        </Text>
        <AppInput
          label={t("Your email *")}
          inputProps={{
            value: email,
            onChangeText: setEmail,
            placeholder: t("Enter Email"),
          }}
        />
        <View style={styles.footerView}>
          <Button
            disabled={!email}
            title={t("Reset password")}
            style={styles.btnViewStyle}
            btnProps={{
              onPress: () =>
                router.push({
                  pathname: "/otp",
                  params: { email, check: "login" },
                }),
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default ForgotPassword;
