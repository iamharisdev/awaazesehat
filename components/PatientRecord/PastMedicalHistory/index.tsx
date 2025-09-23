import { DropDownPicker, StepItems } from "@/components";
import AppInput from "@/components/AppInput";
import { updatePatientRecord } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";


const PastMedicalHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Get current state from Redux
  const pastMedicalHistory = useAppSelector(
    (state) => state.patient.patientRecord.pastMedicalHistory || {}
  );

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "pastMedicalHistory", key, value }));
  };

  return (
    <StepItems title={t("Past Medical history")}>
      <AppInput
        label={t("Current medication")}
        inputProps={{
          value: pastMedicalHistory.currentMedication || "",
          onChangeText: (text) => updateField("currentMedication", text),
        }}
      />

      <DropDownPicker
        label={t("Any medical condition?")}
        value={pastMedicalHistory.medicalCondition || ""}
        onChange={(val) => updateField("medicalCondition", val)}
      />
    </StepItems>
  );
};

export default PastMedicalHistory;
