import React, { useState } from "react";
import { Text, View } from "react-native";

import AppInput from "@/components/AppInput";
import AppMultiSelect from "@/components/AppMultiSelect";
import DatePicker from "@/components/DatePicker";
import TextAreaWithMic from "@/components/TextAreaWithMic";
import { updateVisit } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "./style";

const DEFAULT_LABS = [
  { name: "Ultrasound scan" },
  { name: "CBC" },
  { name: "Anti HCV" },
  { name: "Blood Test" },
  { name: "Blood glucose random" },
  { name: "Urine culture (MSU)" },
  { name: "HB1AC (Glycosylated Hb)" },
  { name: "Urine analysis" },
  { name: "Rubella antibody status" },
];

const toItems = (arr?: string[]) => arr?.map((v) => ({ name: v })) || [];

const TreatmentPlan: React.FC<{ errors?: Record<string, string> }> = ({ errors = {} }) => {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.patient.visit.proposedPlan);

  const editable = false;
  // const editable = visit?.createdAt !== visit?.updatedAt;

  const [labsData, setLabsData] = useState(DEFAULT_LABS);

  const updateField = (key: string, value: any) => {
    dispatch(updateVisit({ step: "proposedPlan", key, value }));
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Treatment Plan</Text>

      {/* Diagnosis */}
      <AppInput
        label="Diagnosis in pregnancy?"
        inputProps={{
          placeholder: "Enter",
          value: fields?.diagnosisPregnency || "",
          editable: !editable,
          onChangeText: (text: string) =>
            updateField("diagnosisPregnency", text),
        }}
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

      {/* Lab Tests MultiSelect */}
      <AppMultiSelect
        label="Advised lab tests & scans"
        options={labsData}
        value={fields?.advisedLabTests}
        onChange={(items) =>
          updateField("advisedLabTests", items.map((i) => i.name).join(","))
        }
      />

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
