import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { styles } from "@/styles/loginStyle";
import {  useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const router=useRouter()
  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />}/>
      <View style={styles.subContainer}>
        <Text style={styles.heading}>{t("Log in")}</Text>
       
        <AppInput
          label={t("Your email *")}
          inputProps={{
            value: email,
            onChangeText: setEmail,
            placeholder: t("Enter Email"),
          }}
        />
         <AppInput
          label={t("Your Password *")}
          inputProps={{
            value: email,
            onChangeText: setEmail,
            placeholder: "*********",
          }}
        />
        <Text style={styles.forgot} onPress={()=>router.push('forgot')}>{t("Forgot password?")}</Text>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            {t("By Signing up, you agree to Awaaz-e-Sehat’s")}{" "}
            <Text style={styles.underLineText}>{t("Terms of Services")}</Text>{" "}
            {t("and")}{" "}
            <Text style={styles.underLineText}> {t("Privacy Policy")}</Text>
          </Text>
          <Button
            disabled={!email}
            title={t("Log in")}
            style={styles.btnViewStyle}
          />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default Login;
