import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import { updatePatientRecord } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";


const SocioEconomicHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Access existing data from Redux
  const socioEconomicHistory = useAppSelector(
    (state) => state.patient.patientRecord.socioEconomicHistory ?? {}
  );

  const {patientRecord} = useAppSelector(state=>state.patient)

  console.log(patientRecord)

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "socioEconomicHistory", key, value }));
  };

  return (
    <StepItems title={t("Socio-economic history")}>
      <AppInput
        label={t("Household size?")}
        inputProps={{
          value: socioEconomicHistory.householdSize || "",
          onChangeText: (text) => updateField("householdSize", text),
        }}
      />

      <AppInput
        label={t("Husband occupation")}
        inputProps={{
          value: socioEconomicHistory.husbandOccupation || "",
          onChangeText: (text) => updateField("husbandOccupation", text),
        }}
      />

      <RadioButton
        label={t("Living arrangement?")}
        options={[t("With in-laws"), t("Separate")]}
        value={socioEconomicHistory.livingArrangement || ""}
        onChange={(val) => updateField("livingArrangement", val)}
      />

      <AppInput
        label={t("Approximate household monthly income")}
        inputProps={{
          value: socioEconomicHistory.householdIncome || "",
          onChangeText: (text) => updateField("householdIncome", text),
        }}
      />
    </StepItems>
  );
};

export default SocioEconomicHistory;
