import DropDownPicker from "@/components/DropDownPicker";
import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import { updatePatientRecord } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";
import BottomSheet from "@/components/BottomSheet";
import SelectionPopup from "@/components/SelectionPopup";


const CurrentPregnancy = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Select slice from Redux
  const currentPregnancy = useAppSelector(
    (state) => state.patient.patientRecord.currentPregnancy ?? {}
  );

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "currentPregnancy", key, value }));
  };

  return (
    <StepItems title={t("Current Pregnancy")}>
      <AppInput
        label={t("Mode of conception")}
        inputProps={{
          value: currentPregnancy.modeOfConception || "",
          onChangeText: (text) => updateField("modeOfConception", text),
        }}
      />

   

      <RadioButton
        label={t("Planned pregnancy?")}
        options={[t("Yes"), t("No")]}
        value={currentPregnancy.plannedPregnancy || ""}
        onChange={(val) => updateField("plannedPregnancy", val)}
      />

      <AppInput
        label={t("How this pregnancy was confirmed?")}
        inputProps={{
          value: currentPregnancy.confirmation || "",
          onChangeText: (text) => updateField("confirmation", text),
        }}
      />

      <RadioButton
        label={t("Early urine test done?")}
        options={[t("Yes"), t("No")]}
        value={currentPregnancy.urineTest || ""}
        onChange={(val) => updateField("urineTest", val)}
      />

      <RadioButton
        label={t("Early ultrasound done?")}
        options={[t("Yes"), t("No")]}
        value={currentPregnancy.ultrasound || ""}
        onChange={(val) => updateField("ultrasound", val)}
      />

      <RadioButton
        label={t("Folic acid intake?")}
        options={[t("Before pregnancy"), t("After pregnancy")]}
        value={currentPregnancy.folicAcid || ""}
        onChange={(val) => updateField("folicAcid", val)}
      />

         <DropDownPicker
        label={t("Symptoms experienced?")}
        value={currentPregnancy.symptoms || ""}
        onChange={(val) => updateField("symptoms", val)}
      />
       

    </StepItems>
  );
};

export default CurrentPregnancy;
