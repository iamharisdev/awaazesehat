import DropDownPicker from "@/components/DropDownPicker";
import StepItems from "../StepItems";
import RadioButton from "@/components/RadioButton";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";

const FamilyHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Get state from Redux
  const fHistory = useAppSelector((state) => state.patient.emr.familyHistory);

  const history = fHistory ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "familyHistory", key, value }));
  };

  return (
    <StepItems title={t("Family history")}>
      <DropDownPicker
        label={t("Family history of chronic diseases?")}
        value={history.chronicDiseases || ""}
        onChange={(val) => updateField("chronicDiseases", val)}
      />

      <RadioButton
        label={t("Family history of twins?")}
        options={[t("Yes"), t("No")]}
        value={history.twins || ""}
        onChange={(val) => updateField("twins", val)}
      />
    </StepItems>
  );
};

export default FamilyHistory;
