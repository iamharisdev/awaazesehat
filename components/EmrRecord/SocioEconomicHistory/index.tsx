import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import StepItems from "../StepItems";

const SocioEconomicHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);

  // Access existing data from Redux
  const socioHistory = useAppSelector(
    (state) => state.patient.emr.socioEconomicHistory,
  );

  const history = socioHistory ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "socioEconomicHistory", key, value }));
  };

  return (
    <StepItems title={t("Socio-economic history")}>
      <AppInput
        label={t("Household size?")}
        inputProps={{
          value: history.householdSize || "",
          onChangeText: (text) => updateField("householdSize", text),
        }}
      />

      <AppInput
        label={t("Husband occupation")}
        inputProps={{
          value: history.husbandOccupation || "",
          onChangeText: (text) => updateField("husbandOccupation", text),
        }}
      />

      <RadioButton
        label={t("Living arrangement?")}
        options={[t("With in-laws"), t("Separate")]}
        value={history.livingArrangement || ""}
        onChange={(val) => updateField("livingArrangement", val)}
      />

      <AppInput
        label={t("Approximate household monthly income")}
        inputProps={{
          value: history.householdIncome || "",
          onChangeText: (text) => updateField("householdIncome", text),
        }}
      />
    </StepItems>
  );
};

export default SocioEconomicHistory;
