import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import AppMultiSelect from "@/components/AppMultiSelect";
import { updateEmr } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import StepItems from "../StepItems";
import { styles } from "./styles";

/* -----------------------------
   Field configs (same as web)
------------------------------ */

const CURRENT_PREGNANCY_FIELDS = [
  {
    key: "pregnancyDetectionMethod",
    label: "How was this pregnancy confirmed?",
  },
  {
    key: "earlyPregnancySymptoms",
    label: "Early pregnancy symptoms",
    type: "list",
  },
  { key: "earlyUltrasound", label: "Early ultrasound findings (if conducted)" },
  { key: "folicAcid", label: "Folic acid intake" },
  {
    key: "bloodUrineTests",
    label: "Blood and urine tests results (if conducted)",
  },
  { key: "currentProblems", label: "Current symptoms", type: "list" },
  { key: "otherConcerns", label: "Additional pregnancy concerns" },
];

const TRIMESTER_FIELDS = [
  { key: "fetusMovement", label: "Experienced any fetal movements" },
  { key: "scanResults", label: "Anomaly scan results (if conducted)" },
  { key: "checkupVisits", label: "Regular antenatal checkups" },
  { key: "sugarTestResult", label: "Glucose screening results (if conducted)" },
  {
    key: "bloodPressureResult",
    label: "Blood pressure monitoring (if conducted)",
  },
  { key: "recentUltrasound", label: "Most recent ultrasound (if conducted)" },
];

/* -----------------------------
   Default symptoms
------------------------------ */

const DEFAULT_SYMPTOMS: any = [
  { name: "Fever" },
  { name: "Headache or blurred vision" },
  { name: "Nausea or vomiting" },
  { name: "Vaginal bleeding" },
  { name: "Difficulty breathing" },
  { name: "Dirty or foul-smelling discharge" },
  { name: "Painful urination" },
  { name: "Lower abdominal or leg pain" },
];

/* -----------------------------
   Main component
------------------------------ */

interface Props {
  title: string;
  editable?: boolean;
}

const CurrentPregnancy = ({ title, editable = true }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentPregnancy = useAppSelector(
    (state) => state.patient.emr.currentPregnancy,
  );

  const trimester = useAppSelector((state) => state.patient.emr.trimester);

  const updateCurrentPregnancy = (key: string, value: any) => {
    dispatch(updateEmr({ step: "currentPregnancy", key, value }));
  };

  const updateTrimester = (key: string, value: any) => {
    dispatch(updateEmr({ step: "trimester", key, value }));
  };

  /* -----------------------------
     VIEW MODE
  ------------------------------ */

  const renderViewMode = () => {
    if (!currentPregnancy && !trimester) {
      return (
        <p className="text-sm text-gray-500 italic">
          No pregnancy data available.
        </p>
      );
    }

 
const renderSection = (fields: any[], data: any) =>
  fields?.map((field) => {
    const value = data?.[field.key];

    if (value === null || value === undefined || value === "") return null;

    let displayValue = value;
    if (field.type === "list") {
      displayValue = value.split(",").join(", ");
    }

    return (
      <View key={field.key} style={styles.viewRow}>
        <Text style={styles.viewLabel}>
          {field.label}:
        </Text>
        <Text style={styles.viewValue}>
          {displayValue}
        </Text>
      </View>
    );
  });

return (
  <View style={styles.container}>
    {renderSection(CURRENT_PREGNANCY_FIELDS, currentPregnancy)}
    {renderSection(TRIMESTER_FIELDS, trimester)}
  </View>
);
  }

  

  return (
    <StepItems title={title}>
      {editable ? (
        <>
          <AppInput
            label={t("How was this pregnancy confirmed?")}
            inputProps={{
              value: currentPregnancy?.pregnancyDetectionMethod || "",
              onChangeText: (text) =>
                updateCurrentPregnancy("pregnancyDetectionMethod", text),
            }}
          />

          <AppMultiSelect
            label={t("Early pregnancy symptoms")}
            options={DEFAULT_SYMPTOMS}
            value={currentPregnancy?.earlyPregnancySymptoms || ""}
            onChange={(val) =>
              updateCurrentPregnancy(
                "earlyPregnancySymptoms",
                val.map((i) => i.name).join(","),
              )
            }
          />

          <AppInput
            label={t("Early ultrasound findings (if conducted)")}
            inputProps={{
              placeholder: "Enter Result",
              value: currentPregnancy?.earlyUltrasound || "",
              onChangeText: (text) =>
                updateCurrentPregnancy("earlyUltrasound", text),
            }}
          />

          <RadioButton
            label={t("Folic acid intake")}
            options={[t("Before pregnancy"), t("After pregnancy"), t("None")]}
            value={currentPregnancy?.folicAcid || ""}
            onChange={(val) => updateCurrentPregnancy("folicAcid", val)}
          />

          <AppInput
            label={t("Blood and urine tests results (if conducted)")}
            inputProps={{
              placeholder: "Enter in detail if other tests were conducted too",
              value: currentPregnancy?.bloodUrineTests || "",
              onChangeText: (text) =>
                updateCurrentPregnancy("bloodUrineTests", text),
            }}
          />

          <AppMultiSelect
            label={t("Current symptoms")}
            options={DEFAULT_SYMPTOMS}
            value={currentPregnancy?.currentProblems || ""}
            onChange={(val) =>
              updateCurrentPregnancy(
                "currentProblems",
                val.map((i) => i.name).join(","),
              )
            }
          />

          <AppInput
            label={t("Experienced any fetal movements")}
            inputProps={{
              placeholder: "Enter detail about baby movements",
              value: trimester?.fetusMovement || "",
              onChangeText: (text) => updateTrimester("fetusMovement", text),
            }}
          />

          <AppInput
            label={t("Anomaly scan results (if conducted)")}
            inputProps={{
              placeholder: "Enter detail if baby reported as normal",
              value: trimester?.scanResults || "",
              onChangeText: (text) => updateTrimester("scanResults", text),
            }}
          />

          <AppInput
            label={t("Regular antenatal checkups")}
            inputProps={{
              placeholder: "How many visits has she completed so far?",
              value: trimester?.checkupVisits || "",
              onChangeText: (text) => updateTrimester("checkupVisits", text),
            }}
          />

          <AppInput
            label={t("Glucose screening results (if conducted)")}
            inputProps={{
              placeholder: "Enter results and any related medications",
              value: trimester?.sugarTestResult || "",
              onChangeText: (text) => updateTrimester("sugarTestResult", text),
            }}
          />

          <AppInput
            label={t("Blood pressure monitoring (if conducted)")}
            inputProps={{
              placeholder: "Enter results and any related medications",
              value: trimester?.bloodPressureResult || "",
              onChangeText: (text) =>
                updateTrimester("bloodPressureResult", text),
            }}
          />

          <AppInput
            label={t("Most recent ultrasound (if conducted)")}
            inputProps={{
              placeholder: "Enter findings",
              value: trimester?.recentUltrasound || "",
              onChangeText: (text) => updateTrimester("recentUltrasound", text),
            }}
          />

          <AppInput
            label={t("Additional pregnancy concerns")}
            inputProps={{
              placeholder: "Enter",
              value: currentPregnancy?.otherConcerns || "",
              onChangeText: (text) =>
                updateCurrentPregnancy("otherConcerns", text),
            }}
          />
        </>
      ) : (
        renderViewMode()
      )}
    </StepItems>
  );
};

export default CurrentPregnancy;
