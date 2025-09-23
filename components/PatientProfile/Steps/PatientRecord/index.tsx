import React from "react";
import { Text, View } from "react-native";

import { styles } from "./style";
import { useTranslation } from "react-i18next";
import { steps } from "@/utils/Json";
import StepItem from "../../StepItem";
import { useRouter } from "expo-router";

const PatientRecord = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <View>
      <Text style={styles.progress}>{t("0/9 Steps completed")}</Text>
      <Text style={styles.desc}>
        {t(
          "Review and verify patient details. Add missing information as needed."
        )}
      </Text>

      {steps.map((title, index) => (
        <StepItem
          key={index}
          title={t(title)}
          onPress={() => router.push("/patientProfile")}
        />
      ))}
    </View>
  );
};

export default PatientRecord;
