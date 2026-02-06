import React from "react";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import DropDownPicker from "@/components/DropDownPicker";
import StepItems from "../StepItems";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateEmr } from "@/features/patientSlice";
import AppMultiSelect from "@/components/AppMultiSelect";

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
   View row component
------------------------------ */

const ViewRow = ({ label, value }: { label: string; value: string }) => {
  if (!value) return null;

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 14, color: "#0D0D0D" }}>{label}</Text>
      <Text style={{ fontSize: 14, color: "#707070", marginTop: 2 }}>
        {value}
      </Text>
    </View>
  );
};

/* -----------------------------
   Render view helper
------------------------------ */

const renderView = (fields: any[], data: Record<string, any>, t: any) => {
  return fields.map((field) => {
    let value = data?.[field.key];

    if (!value) return null;

    if (field.type === "list") {
      value = value
        .split(",")
        .map((v: string) => v.trim())
        .join(", ");
    }

    return <ViewRow key={field.key} label={t(field.label)} value={value} />;
  });
};

/* -----------------------------
   Main component
------------------------------ */

interface Props {
  editable?: boolean;
}

const CurrentPregnancy: React.FC<Props> = ({ editable = true }) => {
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

  if (!editable) {
    return (
      <StepItems title={t("Current Pregnancy")}>
        {!currentPregnancy && !trimester ? (
          <Text style={{ color: "#999", fontStyle: "italic" }}>
            {t("No pregnancy data available")}
          </Text>
        ) : (
          <>
            {renderView(CURRENT_PREGNANCY_FIELDS, currentPregnancy, t)}
            {renderView(TRIMESTER_FIELDS, trimester, t)}
          </>
        )}
      </StepItems>
    );
  }

  /* -----------------------------
     EDIT MODE
  ------------------------------ */

  return (
    <StepItems title={t("Current Pregnancy")}>
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
          updateCurrentPregnancy("earlyPregnancySymptoms", val)
        }
      />

      <AppInput
        label={t("Early ultrasound findings (if conducted)")}
        inputProps={{
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
          value: currentPregnancy?.bloodUrineTests || "",
          onChangeText: (text) =>
            updateCurrentPregnancy("bloodUrineTests", text),
        }}
      />

      <AppMultiSelect
        label={t("Current symptoms")}
        options={DEFAULT_SYMPTOMS}
        value={currentPregnancy?.currentProblems || ""}
        onChange={(val) => updateCurrentPregnancy("currentProblems", val)}
      />

      <AppInput
        label={t("Experienced any fetal movements")}
        inputProps={{
          value: trimester?.fetusMovement || "",
          onChangeText: (text) => updateTrimester("fetusMovement", text),
        }}
      />

      <AppInput
        label={t("Anomaly scan results (if conducted)")}
        inputProps={{
          value: trimester?.scanResults || "",
          onChangeText: (text) => updateTrimester("scanResults", text),
        }}
      />

      <AppInput
        label={t("Regular antenatal checkups")}
        inputProps={{
          value: trimester?.checkupVisits || "",
          onChangeText: (text) => updateTrimester("checkupVisits", text),
        }}
      />

      <AppInput
        label={t("Glucose screening results (if conducted)")}
        inputProps={{
          value: trimester?.sugarTestResult || "",
          onChangeText: (text) => updateTrimester("sugarTestResult", text),
        }}
      />

      <AppInput
        label={t("Blood pressure monitoring (if conducted)")}
        inputProps={{
          value: trimester?.bloodPressureResult || "",
          onChangeText: (text) => updateTrimester("bloodPressureResult", text),
        }}
      />

      <AppInput
        label={t("Most recent ultrasound (if conducted)")}
        inputProps={{
          value: trimester?.recentUltrasound || "",
          onChangeText: (text) => updateTrimester("recentUltrasound", text),
        }}
      />

      <AppInput
        label={t("Additional pregnancy concerns")}
        inputProps={{
          value: currentPregnancy?.otherConcerns || "",
          onChangeText: (text) => updateCurrentPregnancy("otherConcerns", text),
        }}
      />
    </StepItems>
  );
};

export default CurrentPregnancy;
