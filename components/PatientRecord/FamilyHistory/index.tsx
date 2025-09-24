import DropDownPicker from "@/components/DropDownPicker";
import StepItems from "../StepItems";
import RadioButton from "@/components/RadioButton";
import { updatePatientRecord } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";


const FamilyHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Get state from Redux
  const familyHistory = useAppSelector(
    (state) => state.patient.patientRecord.familyHistory ?? {}
  );

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "familyHistory", key, value }));
  };

  return (
    <StepItems title={t("Family history")}>
      <DropDownPicker
        label={t("Family history of chronic diseases?")}
        value={familyHistory.chronicDiseases || ""}
        onChange={(val) => updateField("chronicDiseases", val)}
      />

      <RadioButton
        label={t("Family history of twins?")}
        options={[t("Yes"), t("No")]}
        value={familyHistory.twins || ""}
        onChange={(val) => updateField("twins", val)}
      />
    </StepItems>
  );
};

export default FamilyHistory;
