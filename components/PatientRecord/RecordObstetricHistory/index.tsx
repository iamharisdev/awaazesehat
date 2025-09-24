

import CounterField from "@/components/CounterField";
import StepItems from "../StepItems";
import RadioButton from "@/components/RadioButton";
import { updatePatientRecord } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";


const RecordObstetricHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const obstetricHistory = useAppSelector(
    (state) => state.patient.patientRecord.obstetricHistory ?? {}
  );

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "obstetricHistory", key, value }));
  };

  return (
    <View>
      <StepItems title={t("Record Obstetric History")}>
        <CounterField
          title={t("Total no. of previous pregnancies")}
          value={obstetricHistory.totalPregnancies || 0}
          onChange={(v) => updateField("totalPregnancies", v)}
        />

        <CounterField
          title={t("No. of miscarriages")}
          value={obstetricHistory.miscarriages || 0}
          onChange={(v) => updateField("miscarriages", v)}
        />

        <RadioButton
          label={t("Child deaths after birth?")}
          options={[t("Yes"), t("No")]}
          value={obstetricHistory.childDeathsAfterBirth || ""}
          onChange={(val) => updateField("childDeathsAfterBirth", val)}
        />
      </StepItems>
    </View>
  );
};

export default RecordObstetricHistory;
