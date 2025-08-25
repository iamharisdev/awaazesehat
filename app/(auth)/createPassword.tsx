import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { styles } from "@/styles/createPasswordStyle";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const CreatePassword = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} rightIcon={<Icons.cross />} />
      <View style={styles.subContainer}>
        <Text style={styles.heading}>{t("Create your password")}</Text>
        <Text style={styles.headingLight}>
          {t(
            "Your password should be 9 characters, containing a letter and a number"
          )}
        </Text>
        <AppInput
          label={t("Your Password")}
          inputProps={{
            value: password,
            onChangeText: setPassword,
            placeholder: "********",
          }}
          password
        />
        <View style={styles.footerView}>
          <Button
            disabled={!password}
            title={t("Register")}
            style={styles.btnViewStyle}
           
          />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default CreatePassword;
