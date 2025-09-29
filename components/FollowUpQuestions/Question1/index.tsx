import { Icons } from "@/assets/svgs";
import AppInput from "@/components/AppInput";
import Button from "@/components/Button";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { styles } from "../style";

const Question1 = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t(
          "Do you have any questions or worries about your delivery plan, such as normal delivery vs. C-section?"
        )}
      </Text>
      <AppInput
        inputProps={{
          placeholder: t("Enter your answer here"),
        }}
        inputStyle={styles.input}
      />
      <Button
        style={styles.buttonContainer}
        title={t("Record answer")}
        textStyle={styles.buttonTitle}
        icon={<Icons.mic />}
      />
    </View>
  );
};

export default Question1;
