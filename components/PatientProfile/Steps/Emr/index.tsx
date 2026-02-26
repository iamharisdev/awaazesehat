import React from "react";
import { Text, View } from "react-native";

import { styles } from "./style";
import { useTranslation } from "react-i18next";
import { steps } from "@/utils/Json";
import StepItem from "../../StepItem";
import { useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store";
import { setEmrSteps } from "@/features/patientSlice";

const Emr = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { emr }: { emr: any } = useAppSelector((s) => s.patient);

  const stepsCompleted = emr?.createdAt ? steps.length : 0;

  let statusMessage =
    "Add all patient details here. Once saved you will be able to edit it once.";
  if (emr?.createdAt) {
    statusMessage = emr?.isEditable
      ? "You have added the patient details. You can edit the EMR once."
      : "The EMR is no longer editable.";
  }
  return (
    <View>
      {/* Steps completed badge */}
      <View style={styles.stepsBadge}>
        <Text style={styles.stepsText}>
          {stepsCompleted}/{steps.length} Steps completed
        </Text>
      </View>

      {/* Status message */}
      <Text style={styles.statusText}>{statusMessage}</Text>

      {steps.map((title, index) => (
        <StepItem
          index={index}
          key={index}
          title={t(title)}
          onPress={() => {
            dispatch(setEmrSteps(index));
            router.push("/patientProfile");
          }}
        />
      ))}
    </View>
  );
};

export default Emr;
