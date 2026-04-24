import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import StepItems from "../StepItems";

import AppMultiSelect from "@/components/AppMultiSelect";
import TextAreaWithMic from "@/components/TextAreaWithMic";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "./style";

const MEDICAL_CONDITIONS = [
  { name: "Diabetes" },
  { name: "High Blood Pressure" },
  { name: "Asthma" },
  { name: "Tuberculosis (TB)" },
  { name: "Hepatitis" },
  { name: "Jaundice" },
  { name: "Heart disease" },
  { name: "Kidney disease" },
];

const MEDICAL_HISTORY_VIEW_FIELDS = [
  {
    key: "medicalConditions",
    label: "Any health conditions",
    type: "list",
  },
  {
    key: "currentMedications",
    label: "Any current medications",
    type: "text",
  },
];

interface Props {
  title: string;
  editable?: boolean;
}

const PastMedicalHistory = ({ title, editable = true }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);

  const medicalHistory =
    useAppSelector((state) => state.patient.emr.medicalHistory) ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "medicalHistory", key, value }));
    sheetRef.current?.close();
  };

  /* ---------------- View Mode ---------------- */
  const renderViewMode = () => {
    const hasAnyValue = MEDICAL_HISTORY_VIEW_FIELDS?.some((f) => {
      const v = (medicalHistory as any)[f.key];
      return v !== null && v !== undefined && v !== "" && v?.length !== 0;
    });

    if (!hasAnyValue) {
      return (
        <Text style={styles.emptyText}>
          {t("No medical history data available.")}
        </Text>
      );
    }

    return (
      <View style={styles.viewContainer}>
        {MEDICAL_HISTORY_VIEW_FIELDS?.map((field) => {
          const value = (medicalHistory as any)[field.key];
          if (!value || value.length === 0) return null;

          let displayValue = value;

          // Format multi-select values
          if (field.type === "list") {
            displayValue = Array.isArray(value) ? value.join(", ") : value;
          }

          return (
            <View key={field.key} style={styles.viewRow}>
              <Text style={styles.viewLabel}>{field.label}:</Text>
              <Text style={styles.viewValue}>{displayValue}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  /* ---------------- Edit Mode ---------------- */
  const renderEditMode = () => (
    <View style={styles.formContainer}>
      <AppMultiSelect
        label={t("Any health conditions")}
        options={MEDICAL_CONDITIONS}
        value={medicalHistory?.medicalConditions}
        onChange={(val) =>
          updateField("medicalConditions", val.map((i) => i.name).join(","))
        }
      />
      <TextAreaWithMic
        label={t("Any current medications")}
        value={medicalHistory?.currentMedications || ""}
        onChange={(text) => updateField("currentMedications", text)}
        placeholder="Enter findings here..."
        onAudioSave={(text) => updateField("currentMedications", text)} // updates value when audio is converted
        height={120} // multi-line textarea
      />
    </View>
  );

  return (
    <StepItems title={title}>
      {editable ? renderEditMode() : renderViewMode()}
    </StepItems>
  );
};

export default PastMedicalHistory;
