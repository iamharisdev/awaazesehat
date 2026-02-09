import AppInput from "@/components/AppInput";
import DatePicker from "@/components/DatePicker";
import RadioButton from "@/components/RadioButton";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { styles } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateEmr } from "@/features/patientSlice";

import StepItems from "../StepItems";
import { getWeeksAndDays, parseWeeksAndDays } from "@/utils/helperFunction";
import CounterField from "@/components/CounterField";
import { Text } from "react-native";

const VIEW_FIELDS = [
  { key: "lastMenstruationDate", label: "LMP", type: "date" },
  { key: "pregnancyMonths", label: "Pregnancy Month", type: "text" },
  { key: "gestationalAge", label: "Gestational Age", type: "text" },
  { key: "firstPregnancy", label: "First Pregnancy", type: "radio" },
  {
    key: "total_pregnancies",
    label: "Total previous pregnancies",
    type: "number",
  },
  { key: "living_children", label: "Living children", type: "number" },
  { key: "miscarriageCount", label: "Miscarriages", type: "number" },
  { key: "miscarriages", label: "Miscarriages detail", type: "text" },
  { key: "stillbirthCount", label: "Stillbirths", type: "number" },
  { key: "neonatalDeathCount", label: "Neonatal deaths", type: "number" },
  { key: "pretermBirths", label: "Pre-term births", type: "number" },
  { key: "location", label: "Area of residence", type: "text" },
  { key: "education", label: "Education", type: "text" },
  { key: "occupation", label: "Occupation", type: "text" },
  { key: "married_years", label: "Marriage duration", type: "text" },
  { key: "husbandRelation", label: "Husband cousin", type: "text" },
];

const AddPatientProfile = ({ title, editable = true }: any) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const patient = useAppSelector((state) => state?.patient?.emr?.patient) ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "patient", key, value }));
  };

  const ga = patient?.lastMenstruationDate
    ? getWeeksAndDays(patient?.lastMenstruationDate)
    : patient?.gestationalAge || "0 weeks, 0 days";

  const { weeks, days } = parseWeeksAndDays(ga);

  const [formData, setFormData] = useState({
    weeks: weeks || "",
    days: days || "",
  });

  // 🔁 Sync when LMP changes
  useEffect(() => {
    setFormData({
      weeks: weeks || "",
      days: days || "",
    });
  }, [weeks, days]);

  const handleWeeksChange = (text: string) => {
    setFormData((prev) => ({ ...prev, weeks: text }));
  };

  const handleDaysChange = (text: string) => {
    setFormData((prev) => ({ ...prev, days: text }));
  };

  useEffect(() => {
    if (formData.weeks === "" && formData.days === "") return;

    const gaString = `${formData.weeks} weeks, ${formData.days} days`;

    if (patient?.gestationalAge !== gaString) {
      updateField("gestationalAge", gaString);
    }
  }, [formData.weeks, formData.days]);

  const renderViewMode = () => {
    if (!patient) {
      return (
        <Text style={{ color: "#707070", fontStyle: "italic" }}>
          No patient data available.
        </Text>
      );
    }

    return (
      <View style={{ gap: 8 }}>
        {VIEW_FIELDS.map((field) => {
          const value = (patient as any)[field.key];
          if (!value) return null;

          let displayValue = value;

          if (field.type === "date") {
            displayValue = new Date(value).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
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
          {/* Row 1: LMP + Pregnancy Month */}
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <DatePicker
                label={t("LMP")}
                value={
                  patient?.lastMenstruationDate
                    ? new Date(patient.lastMenstruationDate)
                    : new Date()
                }
                onChange={(date) => updateField("lastMenstruationDate", date)}
              />
            </View>
            <View style={styles.flexItem}>
              <AppInput
                label={t("Pregnancy Month")}
                inputProps={{
                  value: patient?.pregnancyMonths || "",
                  onChangeText: (text) => updateField("pregnancyMonths", text),
                }}
              />
            </View>
          </View>

          {/* Row 2: Gestational Age */}
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <AppInput
                label={t("Gestational age of weeks")}
                inputProps={{
                  keyboardType: "numeric",
                  value: formData.weeks,
                  onChangeText: handleWeeksChange,
                }}
              />
            </View>
            <View style={styles.flexItem}>
              <AppInput
                label={t("Gestational age of days")}
                inputProps={{
                  keyboardType: "numeric",
                  value: formData.days,
                  onChangeText: handleDaysChange,
                }}
              />
            </View>
          </View>

          {/* First Pregnancy */}
          <RadioButton
            label={t("First Pregnancy?")}
            options={[t("Yes"), t("No")]}
            value={
              patient?.firstPregnancy === "true"
                ? "Yes"
                : patient?.firstPregnancy === "false"
                  ? "No"
                  : patient?.firstPregnancy
            }
            onChange={(val) =>
              updateField("firstPregnancy", val === "Yes" ? "true" : "false")
            }
          />

          {/* Conditional Fields */}
          {patient?.firstPregnancy === "false" && (
            <View>
              {/* Previous pregnancies */}
              <CounterField
                title="Total number of previous pregnancies?"
                value={patient?.total_pregnancies}
                onChange={(val) => updateField("total_pregnancies", val)}
              />
              <CounterField
                title="Number of living children?"
                value={patient?.living_children}
                onChange={(val) => updateField("living_children", val)}
              />
              <CounterField
                title="Number of miscarriages?"
                value={patient?.miscarriageCount}
                onChange={(val) => updateField("miscarriageCount", val)}
              />
              <AppInput
                label={t("Miscarriages detail")}
                inputProps={{
                  value: patient?.miscarriages || "",
                  onChangeText: (text) => updateField("miscarriages", text),
                }}
              />
              <CounterField
                title="Total number of stillbirths?"
                value={patient?.stillbirthCount}
                onChange={(val) => updateField("stillbirthCount", val)}
              />
              <CounterField
                title="Total no. of neonatal deaths?"
                initialValue={patient?.neonatalDeathCount || 0}
                onChange={(val) => updateField("neonatalDeathCount", val)}
              />
              <CounterField
                title="Total number of pre-term births?"
                value={patient?.pretermBirths}
                onChange={(val) => updateField("pretermBirths", val)}
              />
            </View>
          )}
          <AppInput
            label={t("Area of residence")}
            inputProps={{
              value: patient?.location || "",
              onChangeText: (text) => updateField("location", text),
            }}
          />

          <AppInput
            label="Patient education level"
            inputProps={{
              placeholder: "Enter",
              value: patient?.education || "",
              onChangeText: (text) => updateField("education", text),
            }}
          />

          <RadioButton
            label={t("Patient occupation?")}
            options={[t("Working Woman"), t("HouseWife"), "Both"]}
            value={patient?.occupation || ""}
            onChange={(val) => updateField("occupation", val)}
          />

          {/* Marriage duration */}
          <AppInput
            label={t("Duration of marriage")}
            inputProps={{
              value: patient?.married_years || "",
              onChangeText: (text) => updateField("married_years", text),
            }}
          />
          <AppInput
            label="Is husband her cousin?"
            inputProps={{
              placeholder: "Enter",
              value: patient?.husbandRelation || "",
              onChangeText: (text) => updateField("husbandRelation", text),
            }}
          />
        </>
      ) : (
        renderViewMode()
      )}
    </StepItems>
  );
};

export default AddPatientProfile;
