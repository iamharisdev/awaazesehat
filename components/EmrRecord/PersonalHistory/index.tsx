import DropDownPicker from "@/components/DropDownPicker";
import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";

const PersonalHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Get current state from Redux
  const pHistory = useAppSelector((state) => state.patient.emr.personalHistory);

  const history = pHistory ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "personalHistory", key, value }));
  };

  return (
    <StepItems title={t("Personal history")}>
      <AppInput
        label={t("Any allergies?")}
        inputProps={{
          value: history.allergies || "",
          onChangeText: (text) => updateField("allergies", text),
        }}
      />

      <AppInput
        label={t("Any substance use?")}
        inputProps={{
          value: history.substanceUse || "",
          onChangeText: (text) => updateField("substanceUse", text),
        }}
      />

      <DropDownPicker
        label={t("Domestic situation?")}
        value={history.domesticSituation || ""}
        onChange={(val) => updateField("domesticSituation", val)}
      />

      <RadioButton
        label={t("Sleep quality?")}
        options={[t("Good"), t("Bad")]}
        value={history.sleepQuality || ""}
        onChange={(val) => updateField("sleepQuality", val)}
      />

      <RadioButton
        label={t("Appetite status?")}
        options={[t("Good"), t("Bad")]}
        value={history.appetiteStatus || ""}
        onChange={(val) => updateField("appetiteStatus", val)}
      />

      <DropDownPicker
        label={t("Dietary habits?")}
        value={history.dietaryHabits || ""}
        onChange={(val) => updateField("dietaryHabits", val)}
      />
    </StepItems>
  );
};

export default PersonalHistory;
