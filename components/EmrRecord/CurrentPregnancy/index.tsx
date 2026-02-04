import DropDownPicker from "@/components/DropDownPicker";
import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { useTranslation } from "react-i18next";
import BottomSheet from "@/components/BottomSheet";
import SelectionPopup from "@/components/SelectionPopup";

const CurrentPregnancy = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Select slice from Redux
  const cPregnancy = useAppSelector(
    (state) => state.patient.emr.currentPregnancy,
  );

  const pregnancy = cPregnancy ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "currentPregnancy", key, value }));
  };

  return (
    <StepItems title={t("Current Pregnancy")}>
      <AppInput
        label={t("Mode of conception")}
        inputProps={{
          value: pregnancy.modeOfConception || "",
          onChangeText: (text) => updateField("modeOfConception", text),
        }}
      />

      <RadioButton
        label={t("Planned pregnancy?")}
        options={[t("Yes"), t("No")]}
        value={pregnancy.plannedPregnancy || ""}
        onChange={(val) => updateField("plannedPregnancy", val)}
      />

      <AppInput
        label={t("How this pregnancy was confirmed?")}
        inputProps={{
          value: pregnancy.confirmation || "",
          onChangeText: (text) => updateField("confirmation", text),
        }}
      />

      <RadioButton
        label={t("Early urine test done?")}
        options={[t("Yes"), t("No")]}
        value={pregnancy.urineTest || ""}
        onChange={(val) => updateField("urineTest", val)}
      />

      <RadioButton
        label={t("Early ultrasound done?")}
        options={[t("Yes"), t("No")]}
        value={pregnancy.ultrasound || ""}
        onChange={(val) => updateField("ultrasound", val)}
      />

      <RadioButton
        label={t("Folic acid intake?")}
        options={[t("Before pregnancy"), t("After pregnancy")]}
        value={pregnancy.folicAcid || ""}
        onChange={(val) => updateField("folicAcid", val)}
      />

      <DropDownPicker
        label={t("Symptoms experienced?")}
        value={pregnancy.symptoms || ""}
        onChange={(val) => updateField("symptoms", val)}
      />
    </StepItems>
  );
};

export default CurrentPregnancy;
