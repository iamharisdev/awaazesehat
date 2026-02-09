import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import StepItems from "../StepItems";
import { Text, View } from "react-native";
import { styles } from "./style";

const VIEW_FIELDS = [
  {
    key: "hospitalAccompaniment",
    label: "Attendants to the hospital",
    type: "text",
  },
];

interface Props {
  title: string;
  editable?: boolean;
}

const SocioEconomicHistory = ({ title, editable = true }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // Access existing data from Redux
  const socioEconomicHistor =
    useAppSelector((state) => state.patient.emr.socioEconomicHistory) ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "socioEconomicHistory", key, value }));
  };

  /* ---------------- View Mode ---------------- */
  const renderViewMode = () => {
    const hasAnyValue = VIEW_FIELDS.some((f) => {
      const v = (socioEconomicHistor as any)[f.key];
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
        {socioEconomicHistor.map((field: any) => {
          const value = (socioEconomicHistor as any)[field.key];
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
    <AppInput
      label={t("Attendants to the hospital")}
      inputProps={{
        value: socioEconomicHistor?.hospitalAccompaniment || "",
        onChangeText: (text) => updateField("hospitalAccompaniment", text),
      }}
    />
  );

  return (
    <StepItems title={title}>
      {editable ? renderEditMode() : renderViewMode()}
    </StepItems>
  );
};

export default SocioEconomicHistory;
