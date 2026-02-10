import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import AppInput from "@/components/AppInput";
import StepItems from "../StepItems";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "./style";

const GYN_VIEW_FIELDS = [
  {
    key: "familyPlanningMethod",
    label: "Previous family planning methods",
  },
  {
    key: "menstrualRegularity",
    label: "Menstrual regularity before pregnancy",
  },
  {
    key: "papSmearResult",
    label: "Pap smear findings (if previously done)",
  },
];

interface Props {
  title:string;
  editable?: boolean;
}

const GynecologicalHistory =({ title,editable = true }:Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const gynecological =
    useAppSelector((state) => state?.patient?.emr?.gynecologicalHistory) ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "gynecologicalHistory", key, value }));
  };

  /* ---------------- View Mode ---------------- */
  const renderViewMode = () => {
    const hasAnyValue = GYN_VIEW_FIELDS.some((f) => {
      const v = (gynecological as any)[f.key];
      return v !== null && v !== undefined && v !== "";
    });

    if (!hasAnyValue) {
      return (
        <Text style={styles.emptyText}>
          {t("No gynecological history data available.")}
        </Text>
      );
    }

    return (
      <View style={styles.viewContainer}>
        {GYN_VIEW_FIELDS?.map((field) => {
          const value = (gynecological as any)[field.key];
          if (!value) return null;

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
    <>
      <AppInput
        label={t("Previous family planning methods")}
        inputProps={{
          placeholder: t("Enter"),
          value: gynecological?.familyPlanningMethod || "",
          onChangeText: (text) => updateField("familyPlanningMethod", text),
        }}
      />

      <AppInput
        label={t("Menstrual regularity before pregnancy")}
        inputProps={{
          placeholder: t("Enter"),
          value: gynecological?.menstrualRegularity || "",
          onChangeText: (text) => updateField("menstrualRegularity", text),
        }}
      />

      <AppInput
        label={t("Pap smear findings (if previously done)")}
        inputProps={{
          placeolder: t("Enter"),
          value: gynecological?.papSmearResult || "",
          onChangeText: (text) => updateField("papSmearResult", text),
        }}
      />
    </>
  );

  return (
    <StepItems title={title}>
      {editable ? renderEditMode() : renderViewMode()}
    </StepItems>
  );
};

export default GynecologicalHistory;
