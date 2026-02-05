import React from "react";
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

const DELIVERY_OPTIONS = ["Normal delivery", "C-section"];
const CONTRACTION_OPTIONS = ["Spontaneous", "Induced"];

const CONDITIONS = [
  { name: "Diabetes", value: "Diabetes" },
  { name: "High blood pressure", value: "High blood pressure" },
  { name: "Anemia", value: "Anemia" },
];

const RecordObstetricHistory = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const history = useAppSelector((s) => s.patient.emr.obsHistory) ?? {};

  const livingChildren: any =
    Number(useAppSelector((s) => s.patient.emr?.patient?.living_children)) || 0;

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "obstetricHistory", key, value }));
  };

  return (
    <ScrollView>
      <StepItems title={t("Record Obstetric History")}>
        {/* Previous pregnancy conditions */}
        <AppMultiSelect
          label={t("Health condition in previous pregnancy")}
          options={CONDITIONS}
          value={history?.previousPregnancyConditions}
          onChange={(items) =>
            updateField(
              "previousPregnancyConditions",
              items.map((i) => i.name),
            )
          }
        />

        <AppInput
          label={t("Any complications in previous pregnancy")}
          inputProps={{
            value: history?.previousPregnancyComplications || "",
            onChangeText: (text) =>
              updateField("previousPregnancyComplications", text),
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
                    value: history?.birthDuration || "",
                    onChangeText: (text) => updateField("birthDuration", text),
                  }}
                />
              </>
            )}

            {history.birthMethod === "C-section" && (
              <AppInput
                label={t("Reason for C-section")}
                inputProps={{
                  value: history?.operationReason || "",
                  onChangeText: (text) => updateField("operationReason", text),
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
                value: history?.fullTermBirth || "",
                onChangeText: (text) => updateField("fullTermBirth", text),
              }}
            />

            <AppInput
              label={t("Place of delivery")}
              inputProps={{
                value: history?.birthPlace || "",
                onChangeText: (text) => updateField("birthPlace", text),
              }}
            />

            <AppInput
              label={t("Birth weight of the child")}
              inputProps={{
                value: history?.birthWeight || "",
                onChangeText: (text) => updateField("birthWeight", text),
              }}
            />

            <TextAreaWithMic
              label={t("Any complications after birth for mother or child?")}
              value={history?.childHealthStatus || ""}
              onChange={(text) => updateField("childHealthStatus", text)}
              placeholder="Enter findings here..."
              onAudioSave={(text) => updateField("childHealthStatus", text)} // updates value when audio is converted
              height={120} // multi-line textarea
            />
          </>
        )}

        {/* Multiple children flow */}
        {livingChildren > 1 && (
          <>
            <TextAreaWithMic
              label={t("Were all children delivered normally or by C-section?")}
              value={history?.childrenBirthMethods || ""}
              onChange={(text) => updateField("childrenBirthMethods", text)}
              placeholder="Enter findings here..."
              onAudioSave={(text) => updateField("childrenBirthMethods", text)} // updates value when audio is converted
              height={120} // multi-line textarea
            />

            <TextAreaWithMic
              label="For children delivered normally, were contractions spontaneous or induced, and what was the duration of labor for each child? For children delivered by C-section, enter reason for C-section?"
              value={history?.childrenBirthDetails || ""}
              onChange={(text) => updateField("childrenBirthDetails", text)}
              placeholder="Enter findings here..."
              onAudioSave={(text) => updateField("childrenBirthDetails", text)} // updates value when audio is converted
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
              placeholder="Enter findings here..."
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
      </StepItems>
    </ScrollView>
  );
};

export default RecordObstetricHistory;
