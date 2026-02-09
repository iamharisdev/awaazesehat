import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "./style";

const SURGICAL_HISTORY_VIEW_FIELDS = [
  {
    key: "surgicalHistory",
    label: "Past surgeries (if any done)",
    type: "text",
  },
];

interface Props {
  title: string;
  editable?: boolean;
}

const SurgicalHistory = ({ title, editable = true }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const history = useAppSelector((state) => state.patient.emr?.surgicalHistory);

  const surgicalHistory = history ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "surgicalHistory", key, value }));
  };

  /* ---------------- View Mode ---------------- */
  const renderViewMode = () => {
    const hasAnyValue = SURGICAL_HISTORY_VIEW_FIELDS.some((f) => {
      const v = (surgicalHistory as any)[f.key];
      return v !== null && v !== undefined && v !== "" && v?.length !== 0;
    });

    if (!hasAnyValue) {
      return (
        <Text style={styles.emptyText}>
          {t("No surgical history data available.")}
        </Text>
      );
    }

    return (
      <View style={styles.viewContainer}>
        {SURGICAL_HISTORY_VIEW_FIELDS.map((field) => {
          const value = (surgicalHistory as any)[field.key];
          if (!value || value.length === 0) return null;

          return (
            <View key={field.key} style={styles.viewRow}>
              <Text style={styles.viewLabel}>{field.label}:</Text>
              <Text style={styles.viewValue}>{value}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  /* ---------------- Edit Mode ---------------- */
  const renderEditMode = () => (
    <View style={styles.formContainer}>
      <AppInput
        label={t("Past surgeries (if any done)")}
        inputProps={{
          placeholder: t("Enter in detail"),
          value: surgicalHistory?.surgicalHistory || "",
          onChangeText: (text) => updateField("surgicalHistory", text),
        }}
      />
    </View>
  );

  return (
    <StepItems title={title}>
      {editable ? renderEditMode() : renderViewMode()}
    </StepItems>
  );
};

export default SurgicalHistory;
