import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";

import StepItems from "../StepItems";
import CounterField from "@/components/CounterField";
import RadioButton from "@/components/RadioButton";
import AppInput from "@/components/AppInput";

import AppMultiSelect from "@/components/AppMultiSelect";

import { useAppDispatch, useAppSelector } from "@/store";
import { updateEmr } from "@/features/patientSlice";
import TextAreaWithMic from "@/components/TextAreaWithMic";
import { Text } from "react-native";
import { styles } from "./style";
import { calculateGPA } from "@/utils/helperFunction";

const DELIVERY_OPTIONS = ["Normal delivery", "C-section"];
const CONTRACTION_OPTIONS = ["Spontaneous", "Induced"];

const CONDITIONS = [
  { name: "Diabetes", value: "Diabetes" },
  { name: "High blood pressure", value: "High blood pressure" },
  { name: "Anemia", value: "Anemia" },
];

const OBS_VIEW_FIELDS = [
  {
    key: "previousPregnancyConditions",
    label: "Health condition in previous pregnancy",
    type: "list",
  },
  {
    key: "previousPregnancycomplications",
    label: "Any complications in previous pregnancy",
    type: "text",
  },
  { key: "birthMethod", label: "Mode of delivery", type: "radio" },

  // Normal delivery conditional
  {
    key: "contractions",
    label: "Type of contractions",
    type: "radio",
    dependsOn: { key: "birthMethod", value: "Normal delivery" },
  },
  {
    key: "birthDuration",
    label: "Duration of labor",
    type: "text",
    dependsOn: { key: "birthMethod", value: "Normal delivery" },
  },

  // C-section conditional
  {
    key: "operationReason",
    label: "Reason for C-section",
    type: "text",
    dependsOn: { key: "birthMethod", value: "C-section" },
  },

  // Child info
  {
    key: "childAge",
    label: "Age of the child",
    type: "number",
    dependsOn: { key: "livingChildren", min: 1, max: 1 },
  },
  {
    key: "childGender",
    label: "Sex of the child",
    type: "radio",
    dependsOn: { key: "livingChildren", min: 1, max: 1 },
  },
  {
    key: "fullTermBirth",
    label: "Was the child born full-term?",
    type: "text",
    dependsOn: { key: "livingChildren", min: 1, max: 1 },
  },
  {
    key: "birthPlace",
    label: "Place of delivery",
    type: "text",
    dependsOn: { key: "livingChildren", min: 1, max: 1 },
  },
  {
    key: "birthWeight",
    label: "Birth weight of the child (IBs)",
    type: "text",
    dependsOn: { key: "livingChildren", min: 1, max: 1 },
  },
  {
    key: "childHealthStatus",
    label: "Any complications after birth for mother or child?",
    type: "text",
    dependsOn: { key: "livingChildren", min: 1, max: 1 },
  },
  {
    key: "childSchoolStatus",
    label: "Child Health. Goes to school?",
    type: "text",
    dependsOn: { key: "livingChildren", min: 1, max: 1 },
  },

  // Multiple children conditional
  {
    key: "childrenBirthMethods",
    label: "Were all children delivered normally or C-section?",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "childrenBirthDetails",
    label: "Labor duration and C-section reasons for each child",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "oldestChildAge",
    label: "Age of the eldest child",
    type: "number",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "childrenAges",
    label: "Age of other children",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "childrenGenders",
    label: "Number of boys and girls",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "childrenFullTerm",
    label: "Were all children full-term?",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "childrenBirthPlaces",
    label: "Place of delivery for each child",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "childrenBirthWeights",
    label: "Birth weight of each child",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "childrenHealthStatus",
    label: "Current health status of all children",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
  {
    key: "childrenSchoolStatus",
    label: "Do all children attend school?",
    type: "text",
    dependsOn: { key: "livingChildren", min: 2 },
  },
];

const RecordObstetricHistory = ({ title, editable = true }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const history = useAppSelector((s) => s.patient.emr.obsHistory) ?? {};
  const patient = useAppSelector((s) => s.patient?.emr?.patient) ?? {};

  const livingChildren: any = Number(patient?.living_children) || 0;

  useEffect(() => {
    let gpa = calculateGPA({
      prev: Number(patient?.total_pregnancies),
      miscarriages: Number(patient?.miscarriageCount),
    });

    updateField("gravidaPara", gpa);
  }, []);

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "obsHistory", key, value }));
  };

  const renderViewMode = () => {
    if (!history) {
      return (
        <Text style={{ color: "#707070", fontStyle: "italic" }}>
          No data available.
        </Text>
      );
    }

    return (
      <View style={{ gap: 8 }}>
        {OBS_VIEW_FIELDS?.map((field) => {
          const value = (history as any)[field.key];
          if (!value) return null;

          // dependsOn: birthMethod
          if (field.dependsOn?.key === "birthMethod") {
            if (history.birthMethod !== field.dependsOn.value) return null;
          }

          // dependsOn: livingChildren
          if (field.dependsOn?.key === "livingChildren") {
            const { min, max } = field.dependsOn;
            if (min && livingChildren < min) return null;
            if (max && livingChildren > max) return null;
          }

          let displayValue = value;

          if (field.type === "list") {
            displayValue = value.split(",").join(", ");
          }

          if (field.type === "radio") {
            if (value === "true") displayValue = "Yes";
            if (value === "false") displayValue = "No";
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
  return (
    <StepItems title={title}>
      {editable ? (
        <>
          {/* Previous pregnancy conditions */}
          <AppMultiSelect
            label={t("Health condition in previous pregnancy")}
            options={CONDITIONS}
            value={history?.previousPregnancyConditions}
            onChange={(items) => {
              updateField(
                "previousPregnancyConditions",
                items.map((i) => i.name).join(","),
              );
            }}
          />

          <AppInput
            label={t(
              "Any complications in previous pregnancy (e.g., blood transfusion or other issues)",
            )}
            inputProps={{
              placeholder: "Enter",
              value: history?.previousPregnancycomplications || "",
              onChangeText: (text) =>
                updateField("previousPregnancycomplications", text),
            }}
          />

          {/* Single child flow */}
          {livingChildren == 1 && (
            <>
              <RadioButton
                label={t("Mode of delivery")}
                options={DELIVERY_OPTIONS}
                value={history?.birthMethod || ""}
                onChange={(val) => updateField("birthMethod", val)}
              />
              {history.birthMethod === "Normal delivery" && (
                <>
                  <RadioButton
                    label={t("Type of contractions")}
                    options={CONTRACTION_OPTIONS}
                    value={history?.contractions || ""}
                    onChange={(val) => updateField("contractions", val)}
                  />

                  <AppInput
                    label={t("Duration of labor")}
                    inputProps={{
                      placeholder: "Enter",
                      value: history?.birthDuration || "",
                      onChangeText: (text) =>
                        updateField("birthDuration", text),
                    }}
                  />
                </>
              )}
              {history.birthMethod === "C-section" && (
                <AppInput
                  label={t("Reason for C-section")}
                  inputProps={{
                    placeholder: "Enter",
                    value: history?.operationReason || "",
                    onChangeText: (text) =>
                      updateField("operationReason", text),
                  }}
                />
              )}
              <CounterField
                title={t("Age of the child")}
                value={Number(history?.childAge) || 0}
                onChange={(v) => updateField("childAge", v)}
              />
              <RadioButton
                label={t("Sex of the child")}
                options={[t("Male"), t("Female")]}
                value={history?.childGender || ""}
                onChange={(val) => updateField("childGender", val)}
              />
              <AppInput
                label={t("Was the child born full-term?")}
                inputProps={{
                  placeholder: "Enter",
                  value: history?.fullTermBirth || "",
                  onChangeText: (text) => updateField("fullTermBirth", text),
                }}
              />
              <AppInput
                label={t("Place of delivery")}
                inputProps={{
                  placeholder: "Enter",
                  value: history?.birthPlace || "",
                  onChangeText: (text) => updateField("birthPlace", text),
                }}
              />
              <AppInput
                label={t("Birth weight of the child (IBs)")}
                inputProps={{
                  placeholder: "Enter",
                  value: history?.birthWeight || "",
                  onChangeText: (text) => updateField("birthWeight", text),
                }}
              />
              <TextAreaWithMic
                label={t("Any complications after birth for mother or child?")}
                value={history?.childHealthStatus || ""}
                onChange={(text) => updateField("childHealthStatus", text)}
                placeholder="Enter"
                onAudioSave={(text) => updateField("childHealthStatus", text)}
                height={120}
              />
              <TextAreaWithMic
                label={t(
                  "Child Health. Specify if the child goes to school or not?",
                )}
                value={history?.childSchoolStatus || ""}
                onChange={(text) => updateField("childSchoolStatus", text)}
                placeholder="Enter"
                onAudioSave={(text) => updateField("childSchoolStatus", text)}
                height={120}
              />
            </>
          )}

          {/* Multiple children flow */}
          {livingChildren > 1 && (
            <>
              <TextAreaWithMic
                label={t(
                  "Were all children delivered normally or by C-section?",
                )}
                value={history?.childrenBirthMethods || ""}
                onChange={(text) => updateField("childrenBirthMethods", text)}
                placeholder="Enter the mode of delivery"
                onAudioSave={(text) =>
                  updateField("childrenBirthMethods", text)
                } // updates value when audio is converted
                height={120} // multi-line textarea
              />

              <TextAreaWithMic
                label="For children delivered normally, were contractions spontaneous or induced, and what was the duration of labor for each child? For children delivered by C-section, enter reason for C-section?"
                value={history?.childrenBirthDetails || ""}
                onChange={(text) => updateField("childrenBirthDetails", text)}
                placeholder="Specify for each child"
                onAudioSave={(text) =>
                  updateField("childrenBirthDetails", text)
                } // updates value when audio is converted
                height={120} // multi-line textarea
              />

              <CounterField
                title={t("Age of the eldest child")}
                value={Number(history?.oldestChildAge) || 0}
                onChange={(v) => updateField("oldestChildAge", v)}
              />

              <TextAreaWithMic
                label={t("Ages of the other children")}
                value={history?.childrenAges || ""}
                placeholder={`e.g.,"Child 2: 6 yrs, Child 3: 3yrs"`}
                onChange={(text) => updateField("childrenAges", text)} // updates value when typing
                onAudioSave={(text) => updateField("childrenAges", text)} // updates value when audio is converted
                height={120} // multi-line textarea
              />
              <TextAreaWithMic
                label="Number of boys and girls among her children"
                placeholder={`e.g.,"2 boys, 1 girls"`}
                value={history?.childrenGenders || ""}
                onChange={(val) => updateField("childrenGenders", val)}
                onAudioSave={(e) => updateField("childrenGenders", e)}
              />
              <TextAreaWithMic
                label="Were all her children born full-term?"
                placeholder={`e.g.,"2 boys, 1 girls"`}
                value={history?.childrenFullTerm || ""}
                onChange={(val) => updateField("childrenFullTerm", val)}
                onAudioSave={(e) => updateField("childrenFullTerm", e)}
              />
              <TextAreaWithMic
                label="Place of delivery for each child"
                placeholder={`e.g.,"Child 1: Hospital, Child 2: Home"`}
                value={history?.childrenBirthPlaces || ""}
                onChange={(val) => updateField("childrenBirthPlaces", val)}
                onAudioSave={(e) => updateField("childrenBirthPlaces", e)}
              />
              <TextAreaWithMic
                label="Birth weight of each child"
                placeholder={`e.g.,"Child 1: 3.2kg, Child 2: 2.8kg"`}
                value={history?.childrenBirthWeights || ""}
                onChange={(val) => updateField("childrenBirthWeights", val)}
                onAudioSave={(e) => updateField("childrenBirthWeights", e)}
              />
              <TextAreaWithMic
                label="Current health status of all her children"
                placeholder="Enter"
                value={history?.childrenHealthStatus || ""}
                onChange={(val) => updateField("childrenHealthStatus", val)}
                onAudioSave={(e) => updateField("childrenHealthStatus", e)}
              />
              <TextAreaWithMic
                label="Do all her children attend school?"
                placeholder="Enter"
                value={history?.childrenSchoolStatus || ""}
                onChange={(val) => updateField("childrenSchoolStatus", val)}
                onAudioSave={(e) => updateField("childrenSchoolStatus", e)}
              />
            </>
          )}
        </>
      ) : (
        renderViewMode()
      )}
    </StepItems>
  );
};

export default RecordObstetricHistory;
