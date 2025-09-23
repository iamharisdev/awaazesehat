import { DropDownPicker, StepItems } from "@/components";
import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import { updatePatientRecord } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";


const PersonalHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Get current state from Redux
  const personalHistory = useAppSelector(
    (state) => state.patient.patientRecord.personalHistory || {}
  );

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "personalHistory", key, value }));
  };

  return (
    <StepItems title={t("Personal history")}>
      <AppInput
        label={t("Any allergies?")}
        inputProps={{
          value: personalHistory.allergies || "",
          onChangeText: (text) => updateField("allergies", text),
        }}
      />

      <AppInput
        label={t("Any substance use?")}
        inputProps={{
          value: personalHistory.substanceUse || "",
          onChangeText: (text) => updateField("substanceUse", text),
        }}
      />

      <DropDownPicker
        label={t("Domestic situation?")}
        value={personalHistory.domesticSituation || ""}
        onChange={(val) => updateField("domesticSituation", val)}
      />

      <RadioButton
        label={t("Sleep quality?")}
        options={[t("Good"), t("Bad")]}
        value={personalHistory.sleepQuality || ""}
        onChange={(val) => updateField("sleepQuality", val)}
      />

      <RadioButton
        label={t("Appetite status?")}
        options={[t("Good"), t("Bad")]}
        value={personalHistory.appetiteStatus || ""}
        onChange={(val) => updateField("appetiteStatus", val)}
      />

      <DropDownPicker
        label={t("Dietary habits?")}
        value={personalHistory.dietaryHabits || ""}
        onChange={(val) => updateField("dietaryHabits", val)}
      />
    </StepItems>
  );
};

export default PersonalHistory;
