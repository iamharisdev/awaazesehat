
import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";

const GynecologicalHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Pull step data from Redux (default empty object if not present yet)
  const gynecological = useAppSelector(
    (state) => state.patient.emr.gynecologicalHistory 
  );

  const history = gynecological??{}

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "gynecologicalHistory", key, value }));
  };

  return (
    <StepItems title={t("Gynecological history")}>
      <RadioButton
        label={t("Have you ever had a miscarriage?")}
        options={[t("Yes"), t("No")]}
        value={history.miscarriage || ""}
        onChange={(val) => updateField("miscarriage", val)}
      />

      <AppInput
        label={t("Provide further details (e.g., months)")}
        inputProps={{
          value: history.details || "",
          onChangeText: (text) => updateField("details", text),
        }}
      />
    </StepItems>
  );
};

export default GynecologicalHistory;
