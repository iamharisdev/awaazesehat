import React from "react";
import { View, Text } from "react-native";
import StepItems from "../StepItems";
import AppInput from "@/components/AppInput";

import { useAppSelector, useAppDispatch } from "@/store";
import { updateEmr } from "@/features/patientSlice";
import AppMultiSelect, { Item } from "@/components/AppMultiSelect";
import { styles } from "./style";

const DEFAULT_DIET_OPTIONS: Item[] = [
  { name: "Fruits" },
  { name: "Vegetables" },
  { name: "Meat" },
  { name: "Eggs" },
  { name: "Milk" },
];

const VIEW_FIELDS = [
  { key: "allergyStatus", label: "Any allergies", type: "text" },
  { key: "substanceUse", label: "Any substance use", type: "text" },
  {
    key: "relationshipQuality",
    label: "Family and marital relationships status",
    type: "text",
  },
  { key: "sleepIssues", label: "Sleep quality", type: "text" },
  { key: "hungerIssues", label: "Appetite", type: "text" },
  { key: "diet", label: "Dietary habits", type: "multiSelect" },
];

const FIELDS = [
  {
    key: "livingSituation",
    label: "Living situation & household size",
    type: "text",
  },
  {
    key: "financialSituation",
    label: "Husband occupation and expense management",
    type: "text",
  },
  {
    key: "monthlyIncome",
    label: "Approximate monthly household income",
    type: "text",
  },
];

const onlyDigits = (value: string) => value.replace(/\D/g, "");

interface Props {
  title: string;
  editable?: boolean;
}

const PersonalHistory = ({ title, editable = true }: Props) => {
  const dispatch = useAppDispatch();

  const personalHistory =
    useAppSelector((state) => state.patient.emr.personalHistory) ?? {};
  const socioEconomicHistory =
    useAppSelector((state) => state.patient.emr.socioEconomicHistory) ?? {};

  const updatePersonalField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "personalHistory", key, value }));
  };

  const updateSocioField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "socioEconomicHistory", key, value }));
  };

  /* ---------------- View Mode ---------------- */
  const renderViewMode = () => {
    const hasAnyValue = VIEW_FIELDS.some((f) => {
      const v = (personalHistory as any)[f.key];
      return v !== null && v !== undefined && v !== "" && v?.length !== 0;
    });

    if (!hasAnyValue) {
      return (
        <Text style={styles.emptyText}>
          No personal history data available.
        </Text>
      );
    }

    const renderSection = (
      fields: typeof VIEW_FIELDS | typeof FIELDS,
      data: any,
    ) =>
      fields?.map((field) => {
        const value = data?.[field.key];
        if (!value) return null;

        let displayValue = value;
        if (field.type === "multiSelect" || field.type === "list") {
          displayValue = value.split(",").join(", ");
        }

        return (
          <View
            key={field.key}
            style={styles.viewRow}
          >
            <Text style={styles.viewLabel}>
              {field.label}:
            </Text>
            <Text style={styles.viewValue}>{displayValue}</Text>
          </View>
        );
      });

    if (!personalHistory && !socioEconomicHistory) {
      return (
        <Text style={styles.emptyText}>
          No data available.
        </Text>
      );
    }

    return (
      <View>
        {renderSection(VIEW_FIELDS, personalHistory)}
        {renderSection(FIELDS, socioEconomicHistory)}
      </View>
    );
  };

  /* ---------------- Edit Mode ---------------- */
  const renderEditMode = () => (
    <View>
      <AppInput
        label="Any allergies"
        inputProps={{
          placeholder: "Enter",
          value: personalHistory?.allergyStatus || "",
          onChangeText: (text) => updatePersonalField("allergyStatus", text),
        }}
      />

      <AppInput
        label="Any substance use"
        inputProps={{
          placeholder:
            "Specify if patient or her husband smokes or uses other substances",
          value: personalHistory?.substanceUse || "",
          onChangeText: (text) => updatePersonalField("substanceUse", text),
        }}
      />

      <AppInput
        label="Family and marital relationships status"
        inputProps={{
          placeholder: "Enter",
          value: personalHistory?.relationshipQuality || "",
          onChangeText: (text) =>
            updatePersonalField("relationshipQuality", text),
        }}
      />

      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <AppInput
            label="Sleep quality"
            inputProps={{
              placeholder: "Enter",
              value: personalHistory?.sleepIssues || "",
              onChangeText: (text) => updatePersonalField("sleepIssues", text),
            }}
          />
        </View>

        <View style={{ flex: 1 }}>
          <AppInput
            label="Appetite"
            inputProps={{
              placeholder: "Enter",
              value: personalHistory?.hungerIssues || "",
              onChangeText: (text) => updatePersonalField("hungerIssues", text),
            }}
          />
        </View>
      </View>

      <AppMultiSelect
        label="Dietary habits"
        options={DEFAULT_DIET_OPTIONS}
        value={personalHistory?.diet}
        editable={editable}
        onChange={(items) =>
          updatePersonalField("diet", items.map((i) => i.name).join(","))
        }
      />

      <AppInput
        label="Living situation & household size"
        inputProps={{
          placeholder: "Specify if the patient lives with in-laws or not",
          value: socioEconomicHistory?.livingSituation || "",
          onChangeText: (text) => updateSocioField("livingSituation", text),
        }}
      />

      <AppInput
        label="Husband occupation and expense management"
        inputProps={{
          placeholder: "Enter",
          value: socioEconomicHistory?.financialSituation || "",
          onChangeText: (text) => updateSocioField("financialSituation", text),
        }}
      />

      <AppInput
        label="Approximate monthly household income"
        inputProps={{
          placeholder: "Enter",
          keyboardType:"numeric",
          value: socioEconomicHistory?.monthlyIncome || "",
          onChangeText: (text) =>
            updateSocioField("monthlyIncome", onlyDigits(text)),
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

export default PersonalHistory;
