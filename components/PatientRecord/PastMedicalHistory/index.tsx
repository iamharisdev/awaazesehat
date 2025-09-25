import DropDownPicker from "@/components/DropDownPicker";
import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";
import { updatePatientRecord } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import OpenBottomSheet from "@/components/OpenBottomSheet";
import BottomSheet from "@/components/BottomSheet";
import SelectionPopup from "@/components/SelectionPopup";
import { healthCondition } from "@/utils/Json";

const PastMedicalHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);

  const pastMedicalHistory = useAppSelector(
    (state) => state.patient.patientRecord.pastMedicalHistory ?? {}
  );

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "pastMedicalHistory", key, value }));
    sheetRef.current.close();
  };

  const openSheet = () => {
    sheetRef.current?.open();
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
      <OpenBottomSheet
        label={t("Any medical condition?")}
        value={pastMedicalHistory.medicalCondition || ""}
        onPress={() => openSheet()}
      />

      <BottomSheet ref={sheetRef} sheetHeight={400}>
        <SelectionPopup
          title={t("Any health condition?")}
          data={healthCondition}
          multiSelect={true}
          sheetHeight={400}
          value={pastMedicalHistory.medicalCondition}
          onSave={(val) => updateField("medicalCondition", val)}
          onCrossPress={() => sheetRef.current?.close()}
        />
      </BottomSheet>
    </StepItems>
  );
};

export default PastMedicalHistory;
