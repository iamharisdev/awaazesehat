import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { styles } from "@/styles/createPasswordStyle";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const CreatePassword = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { check } = useLocalSearchParams<{
    check: string;
  }>();

  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} />
      <View style={styles.subContainer}>
        <Text style={styles.heading}>
          {check == "signup"
            ? t("Create your password")
            : t("Set new password")}
        </Text>
        <Text style={styles.headingLight}>
          {check == "signup"
            ? t(
                "Your password should be 9 characters, containing a letter and a number"
              )
            : t("Your old password has been reset, set a new password now")}
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
            title={check == "signup" ? t("Register") : t("Set password")}
            style={styles.btnViewStyle}
          />
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default CreatePassword;
