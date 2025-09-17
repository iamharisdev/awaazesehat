import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { styles } from "@/styles/signupStyle";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const Signup = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [email, setEmail] = useState("");

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />}  />
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
            value: email,
            onChangeText: setEmail,
            placeholder: t("Enter Email"),
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
            disabled={!email}
            title={t("Send code")}
            style={styles.btnViewStyle}
            btnProps={{
              onPress: () =>
                router.push({
                  pathname: ROUTES.verifyOtp,
                  params: { email,check:"signup" },
                }),
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default Signup;
