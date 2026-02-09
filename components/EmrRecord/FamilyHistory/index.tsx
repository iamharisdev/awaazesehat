import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import StepItems from "../StepItems";

import { useAppDispatch, useAppSelector } from "@/store";
import { updateEmr } from "@/features/patientSlice";
import { styles } from "./style";
import AppMultiSelect, { Item } from "@/components/AppMultiSelect";

const FAMILY_HISTORY_VIEW_FIELDS = [
  {
    key: "familyMedicalConditions",
    label: "Family history of chronic diseases",
    type: "list",
  },
];

const DEFAULT_OPTIONS: Item[] = [
  { name: "Diabetes" },
  { name: "High blood pressure" },
  { name: "Hepatitis" },
];

interface Props {
  title: string;
  editable?: boolean;
}

const FamilyHistory = ({ title, editable = true }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const history = useAppSelector((state) => state.patient.emr.familyHistory);
  const familyHistory = history ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "familyHistory", key, value }));
  };

  /* ---------------- View Mode ---------------- */
  const renderViewMode = () => {
    const hasAnyValue = FAMILY_HISTORY_VIEW_FIELDS.some((f) => {
      const v = (familyHistory as any)[f.key];
      return v !== null && v !== undefined && v !== "" && v?.length !== 0;
    });

    if (!hasAnyValue) {
      return (
        <Text style={styles.emptyText}>
          {t("No family history data available.")}
        </Text>
      );
    }

    return (
      <View style={styles.viewContainer}>
        {FAMILY_HISTORY_VIEW_FIELDS.map((field) => {
          const value = (familyHistory as any)[field.key];
          if (!value || value.length === 0) return null;

          let displayValue = value;
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
    <AppMultiSelect
      label={t("Family history of chronic diseases")}
      addMore="diseases"
      options={DEFAULT_OPTIONS}
      value={familyHistory?.familyMedicalConditions || ""}
      editable={editable}
      onChange={(items) => {
        updateField(
          "familyMedicalConditions",
          items.map((i) => i.name).join(","),
        );
      }}
    />
  );

  return (
    <StepItems title={title}>
      {editable ? renderEditMode() : renderViewMode()}
    </StepItems>
  );
};

export default FamilyHistory;
