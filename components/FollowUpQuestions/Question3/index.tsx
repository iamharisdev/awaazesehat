import { Icons } from "@/assets/svgs";
import AppInput from "@/components/AppInput";
import Button from "@/components/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { styles } from "../style";

const Question3 = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {t(
          "Are you currently taking any medications, supplements, or treatments that your doctor should know about?"
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

export default Question3;
