import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";

const SurgicalHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Access current surgical history data from Redux
  const history = useAppSelector((state) => state.patient.emr?.surgicalHistory);
  const surgicalHistory = history ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "surgicalHistory", key, value }));
  };

  return (
    <StepItems title={t("Surgical history")}>
      <AppInput
        label={t("Past Surgeries")}
        inputProps={{
          value: surgicalHistory.pastSurgeries || "",
          onChangeText: (text) => updateField("pastSurgeries", text),
        }}
      />
    </StepItems>
  );
};

export default SurgicalHistory;
