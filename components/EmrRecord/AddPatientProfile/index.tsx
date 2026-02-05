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

const AddPatientProfile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const patient = useAppSelector((state) => state.patient.emr.patient) ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "patient", key, value }));
  };

  const ga = patient?.lastMenstruationDate
    ? getWeeksAndDays(patient.lastMenstruationDate)
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

  // 🔥 Update combined gestationalAge string
  useEffect(() => {
    if (formData.weeks !== "" || formData.days !== "") {
      const gestationalAge = `${formData.weeks} weeks, ${formData.days} days`;
      updateField("gestationalAge", gestationalAge);
    }
  }, [formData]);

  return (
    <StepItems title={t("Add Patient patient")}>
      {/* Row 1: LMP + Pregnancy Month */}
      <View style={styles.row}>
        <View style={styles.flexItem}>
          {/* <DatePicker
            label={t("LMP")}
            value={patient.lastMenstruationDate || new Date()}
            onChange={(date) => updateField("lastMenstruationDate", date)}
          /> */}
        </View>
        <View style={styles.flexItem}>
          <AppInput
            label={t("Pregnancy Month")}
            inputProps={{
              value: patient.pregnancyMonths || "",
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
              onChangeText: (text) =>
                setFormData((prev) => ({ ...prev, weeks: text })),
            }}
          />
        </View>
        <View style={styles.flexItem}>
          <AppInput
            label={t("Gestational age of days")}
            inputProps={{
              keyboardType: "numeric",
              value: formData.days,
              onChangeText: (text) =>
                setFormData((prev) => ({ ...prev, days: text })),
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
            value={patient.total_pregnancies}
            onChange={(val) => updateField("total_pregnancies", val)}
          />
          <CounterField
            title="Number of living children?"
            value={patient.living_children}
            onChange={(val) => updateField("living_children", val)}
          />
          <CounterField
            title="Number of miscarriages?"
            value={patient.miscarriageCount}
            onChange={(val) => updateField("miscarriageCount", val)}
          />
          <AppInput
            label={t("Miscarriages detail")}
            inputProps={{
              value: patient.miscarriages || "",
              onChangeText: (text) => updateField("miscarriages", text),
            }}
          />
          <CounterField
            title="Total number of stillbirths?"
            value={patient.stillbirthCount}
            onChange={(val) => updateField("stillbirthCount", val)}
          />
          <CounterField
            title="Total no. of neonatal deaths?"
            initialValue={patient?.neonatalDeathCount || 0}
            onChange={(val) => updateField("neonatalDeathCount", val)}
          />
          <CounterField
            title="Total number of pre-term births?"
            value={patient.pretermBirths}
            onChange={(val) => updateField("pretermBirths", val)}
          />
        </View>
      )}
      <AppInput
        label={t("Area of residence")}
        inputProps={{
          value: patient.location || "",
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
        value={patient.occupation || ""}
        onChange={(val) => updateField("occupation", val)}
      />

      {/* Marriage duration */}
      <AppInput
        label={t("Duration of marriage")}
        inputProps={{
          value: patient.married_years || "",
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
    </StepItems>
  );
};

export default AddPatientProfile;
