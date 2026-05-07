import React from "react";
import { Text, View } from "react-native";

import AppInput from "@/components/AppInput";
import DatePicker from "@/components/DatePicker";
import TextAreaWithMic from "@/components/TextAreaWithMic";
import PregnancyDiagnosisDropdown from "@/components/PregnancyDiagnosisDropdown";
import DiagnosticTestsDropdown from "@/components/DiagnosticTestsDropdown";
import { setVisitAdvisedTests, updateVisit } from "@/features/patientSlice";
import type {
  AdvisedTest,
  DiagnosticTest,
  PregnancyDiagnosis,
} from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "./style";

const TreatmentPlan: React.FC<{ errors?: Record<string, string> }> = ({
  errors = {},
}) => {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.patient.visit.proposedPlan);
  const advisedTests = useAppSelector(
    (state) => state.patient.visit.advisedTests ?? [],
  );

  const editable = false;

  const updateField = (key: string, value: any) => {
    dispatch(updateVisit({ step: "proposedPlan", key, value }));
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const handleAdvisedTestsChange = (items: DiagnosticTest[]) => {
    const merged: AdvisedTest[] = items.map((it) => {
      const existing = advisedTests.find((a) => a.id === it.id);
      if (existing) return existing;
      return {
        id: it.id,
        testName: it.testName,
        testType: it.testType,
        status: "not_submitted",
        reports: [],
      };
    });
    dispatch(setVisitAdvisedTests(merged));
  };

  const dropdownValue: DiagnosticTest[] = advisedTests.map((a) => ({
    id: a.id,
    testName: a.testName,
    testType: a.testType,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treatment Plan</Text>

      {/* Diagnosis */}
      <PregnancyDiagnosisDropdown
        label="Diagnosis in pregnancy?"
        value={
          Array.isArray(fields?.diagnosisPregnancy)
            ? (fields?.diagnosisPregnancy as PregnancyDiagnosis[])
            : []
        }
        disabled={editable}
        onChange={(items) => updateField("diagnosisPregnancy", items)}
      />

      {/* Advised Tests (Lab + Scans) — paginated dropdown */}
      <DiagnosticTestsDropdown
        label="Advised lab tests & scans"
        value={dropdownValue}
        disabled={editable}
        onChange={handleAdvisedTestsChange}
      />

      {/* General Plan */}
      <TextAreaWithMic
        label="General plan & advice"
        value={fields?.generalPlan || ""}
        placeholder="Enter details..."
        onChange={(val: string) => updateField("generalPlan", val)}
        onAudioSave={(val: string) => updateField("generalPlan", val)}
      />
      {errors.generalPlan && (
        <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
          {errors.generalPlan}
        </Text>
      )}

      {/* Medications */}
      <AppInput
        label="Advised medications"
        error={errors.medication}
        touched={!!errors.medication}
        inputProps={{
          placeholder: "Medicine name - how many times a day? - for how long?",
          value: fields?.medication || "",
          editable: !editable,
          onChangeText: (text: string) => updateField("medication", text),
        }}
      />

      {/* Doctor Notes */}
      <TextAreaWithMic
        label="Doctor's Note"
        value={fields?.doctorNotes || ""}
        placeholder="Add any risk factors or specific concerns..."
        onChange={(val: string) => updateField("doctorNotes", val)}
        onAudioSave={(val: string) => updateField("doctorNotes", val)}
      />

      {/* Follow-up Date */}
      <DatePicker
        label="Next Follow-up date"
        value={
          fields?.nextFollowUpTiming
            ? new Date(fields.nextFollowUpTiming)
            : tomorrow
        }
        onChange={(date) => updateField("nextFollowUpTiming", date)}
        minDate={tomorrow}
      />
    </View>
  );
};

export default TreatmentPlan;
