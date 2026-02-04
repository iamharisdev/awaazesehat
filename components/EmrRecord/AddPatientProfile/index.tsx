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

  const patientProfile = useAppSelector((state) => state.patient.emr.profile);

  const profile = patientProfile ?? {};

  const updateField = (key: string, value: any) => {
    dispatch(updateEmr({ step: "profile", key, value }));
  };

  const ga = profile?.lastMenstruationDate
    ? getWeeksAndDays(profile.lastMenstruationDate)
    : profile?.gestationalAge || "0 weeks, 0 days";

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
    <StepItems title={t("Add Patient Profile")}>
      {/* Row 1: LMP + Pregnancy Month */}
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <DatePicker
            label={t("LMP")}
            value={profile.lastMenstruationDate || new Date()}
            onChange={(date) => updateField("lastMenstruationDate", date)}
          />
        </View>
        <View style={styles.flexItem}>
          <AppInput
            label={t("Pregnancy Month")}
            inputProps={{
              value: profile.pregnancyMonth || "",
              onChangeText: (text) => updateField("pregnancyMonth", text),
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
        value={profile.firstPregnancy === "true" ? "Yes" : "No"}
        onChange={(val) =>
          updateField("firstPregnancy", val === "Yes" ? "true" : "false")
        }
      />

      {/* Conditional Fields */}
      {profile?.firstPregnancy === "false" && (
        <View>
          {/* Previous pregnancies */}
          <CounterField
            title="Total number of previous pregnancies?"
            value={profile.total_pregnancies}
            onChange={(val) => updateField("total_pregnancies", val)}
          />
          <CounterField
            title="Number of living children?"
            value={profile.living_children}
            onChange={(val) => updateField("living_children", val)}
          />
          <CounterField
            title="Number of miscarriages?"
            value={profile.miscarriageCount}
            onChange={(val) => updateField("miscarriageCount", val)}
          />
          <AppInput
            label={t("Miscarriages detail")}
            inputProps={{
              value: profile.miscarriages || "",
              onChangeText: (text) => updateField("miscarriages", text),
            }}
          />
          <CounterField
            title="Total number of stillbirths?"
            value={profile.stillbirthCount}
            onChange={(val) => updateField("stillbirthCount", val)}
          />
          <CounterField
            title="Total number of pre-term births?"
            value={profile.pretermBirths}
            onChange={(val) => updateField("pretermBirths", val)}
          />
        </View>
      )}
      <AppInput
        label={t("Area of residence")}
        inputProps={{
          value: profile.location || "",
          onChangeText: (text) => updateField("location", text),
        }}
      />

      <AppInput
        label="Patient education level"
        inputProps={{
          placeholder: "Enter",
          value: profile?.education || "",
          onChange: (text) => updateField("education", text),
        }}
      />

      <RadioButton
        label={t("Patient occupation?")}
        options={[t("Working Woman"), t("HouseWife"), "Both"]}
        value={profile.occupation || ""}
        onChange={(val) => updateField("occupation", val)}
      />

      {/* Marriage duration */}
      <AppInput
        label={t("Duration of marriage")}
        inputProps={{
          value: profile.married_years || "",
          onChangeText: (text) => updateField("married_years", text),
        }}
      />
      <AppInput
        label="Is husband her cousin?"
        inputProps={{
          placeholder: "Enter",
          value: profile?.husbandRelation || "",
          onChange: (text) => updateField("husbandRelation", text),
        }}
      />
    </StepItems>
  );
};

export default AddPatientProfile;
