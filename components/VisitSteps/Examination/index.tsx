import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import AppInput from "@/components/AppInput";
import AppMultiSelect from "@/components/AppMultiSelect";
import RadioButton from "@/components/RadioButton";
import TextAreaWithMic from "@/components/TextAreaWithMic";
import { updateVisit } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "./style";

const NORMAL_OPTIONS = [{ name: "Normal" }, { name: "Abnormal" }];

const Examination: React.FC = () => {
  const dispatch = useAppDispatch();
  const fields = useAppSelector((state) => state.patient.visit.examination);

  const editable = false;
  const [type, setType] = useState<
    "Structured Fields" | "Free Text / Voice Note"
  >("Structured Fields");

  const updateField = (key: string, value: any) => {
    dispatch(updateVisit({ step: "examination", key, value }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>General Physical Examination</Text>

      {/* Record Type */}
      <View style={styles.recordBox}>
        <Text style={styles.recordText}>
          How would you like to record the General physical examination?
        </Text>

        <RadioButton
          value={type}
          options={["Structured Fields", "Free Text / Voice Note"]}
          onChange={(val) => setType(val as any)}
        />
      </View>

      {type === "Structured Fields" && (
        <>
          {/* General */}
          <RadioButton
            label="Pallor?"
            value={fields?.pallor}
            options={["Present", "Absent"]}
            onChange={(val) => updateField("pallor", val)}
          />

          <RadioButton
            label="Koilonychia?"
            value={fields?.koilonychia}
            options={["Present", "Absent"]}
            onChange={(val) => updateField("koilonychia", val)}
          />

          <RadioButton
            label="Leukonychia?"
            value={fields?.leukonychia}
            options={["Present", "Absent"]}
            onChange={(val) => updateField("leukonychia", val)}
          />

          <RadioButton
            label="Clubbing?"
            value={fields?.clubbing}
            options={["Present", "Absent"]}
            onChange={(val) => updateField("clubbing", val)}
          />

          <RadioButton
            label="Bilateral pedal edema?"
            value={fields?.bilateralPedalEdema}
            options={["Present", "Absent"]}
            onChange={(val) => updateField("bilateralPedalEdema", val)}
          />

          {/* Spine */}
          <AppMultiSelect
            label="Spine"
            options={NORMAL_OPTIONS}
            value={fields?.spine}
            onChange={(items: any[]) => updateField("spine", items.map((i) => i.name).join(","))}
          />

          {fields?.spine === "Abnormal" && (
            <AppInput
              label="Reason of abnormal spine"
              inputProps={{
                placeholder: "Enter reason",
                value: fields?.abnormalSpine || "",
                onChangeText: (text: string) =>
                  updateField("abnormalSpine", text),
              }}
            />
          )}

          {/* Lymph Nodes */}
          <AppMultiSelect
            label="Lymph Nodes"
            options={NORMAL_OPTIONS}
            value={fields?.lymphNodes}
            onChange={(items: any[]) =>
              updateField("lymphNodes", items.map((i) => i.name).join(","))
            }
          />

          {/* Breast Examination */}
          <Text style={styles.sectionTitle}>Breast Examination</Text>

          <AppMultiSelect
            label="Size Comparison"
            options={NORMAL_OPTIONS}
            value={fields?.sizeComparison}
            onChange={(items: any[]) =>
              updateField("sizeComparison", items.map((i) => i.name).join(","))
            }
          />

          <RadioButton
            label="Nipple discharge?"
            value={fields?.nippleDischarge}
            options={["Present", "Absent"]}
            onChange={(val) => updateField("nippleDischarge", val)}
          />

          <RadioButton
            label="Swelling?"
            value={fields?.swelling}
            options={["Present", "Absent"]}
            onChange={(val) => updateField("swelling", val)}
          />

          <RadioButton
            label="Nipple deformity?"
            value={fields?.nippleDeformity}
            options={["Present", "Absent"]}
            onChange={(val) => updateField("nippleDeformity", val)}
          />

          {/* Per Abdominal */}
          <Text style={styles.sectionTitle}>Per Abdominal Examination</Text>

          <AppInput
            label="Shape of abdomen"
            inputProps={{
              placeholder: "Enter",
              value: fields?.shapeOfAbdomen || "",
              onChangeText: (text: string) =>
                updateField("shapeOfAbdomen", text),
            }}
          />

          <AppInput
            label="Umbilicus"
            inputProps={{
              placeholder: "Enter",
              value: fields?.umbilicus || "",
              onChangeText: (text: string) => updateField("umbilicus", text),
            }}
          />

          {/* Palpation Section */}
          <Text style={styles.sectionTitle}>Palpation</Text>

          <AppInput
            label="Fundal Height"
            inputProps={{
              placeholder: "Enter",
              value: fields?.fundalHeight || "",
              onChangeText: (text: string) => updateField("fundalHeight", text),
            }}
          />

          <AppInput
            label="Lie"
            inputProps={{
              placeholder: "Enter",
              value: fields?.lie || "",
              onChangeText: (text: string) => updateField("lie", text),
            }}
          />

          <AppInput
            label="Presentation"
            inputProps={{
              placeholder: "Enter",
              value: fields?.presentation || "",
              onChangeText: (text: string) => updateField("presentation", text),
            }}
          />

          <AppInput
            label="Estimated fetal weight"
            inputProps={{
              placeholder: "Enter",
              value: fields?.estimatedFetalWeight || "",
              onChangeText: (text: string) =>
                updateField("estimatedFetalWeight", text),
            }}
          />

          <AppInput
            label="Liquor"
            inputProps={{
              placeholder: "Enter",
              value: fields?.liquor || "",
              onChangeText: (text: string) => updateField("liquor", text),
            }}
          />

          <AppInput
            label="Scar tenderness"
            inputProps={{
              placeholder: "Enter",
              value: fields?.scarTenderness || "",
              onChangeText: (text: string) =>
                updateField("scarTenderness", text),
            }}
          />

          {/* Auscultation */}
          <Text style={styles.sectionTitle}>Auscultation</Text>

          <AppInput
            label="Fetal heart rate"
            inputProps={{
              placeholder: "Enter",
              value: fields?.fetalHeartRate || "",
              onChangeText: (text: string) =>
                updateField("fetalHeartRate", text),
            }}
          />

          {/* Speculum & Vaginal */}
          <TextAreaWithMic
            label="Per speculum examination"
            value={fields?.perSpeculumFindings || ""}
            height={150}
            onChange={(val: string) => updateField("perSpeculumFindings", val)}
            onAudioSave={(val: string) =>
              updateField("perSpeculumFindings", val)
            }
          />

          <TextAreaWithMic
            label="Per vaginal examination"
            value={fields?.perVaginalFindings || ""}
            height={150}
            onChange={(val: string) => updateField("perVaginalFindings", val)}
            onAudioSave={(val: string) =>
              updateField("perVaginalFindings", val)
            }
          />
        </>
      )}

      {type === "Free Text / Voice Note" && (
        <TextAreaWithMic
          height={150}
          placeholder="Write or record examination findings..."
          value={fields?.physicalFindings || ""}
          onChange={(val: string) => updateField("physicalFindings", val)}
          onAudioSave={(val: string) => updateField("physicalFindings", val)}
        />
      )}
    </ScrollView>
  );
};

export default Examination;
