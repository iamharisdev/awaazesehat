import AppInput from "@/components/AppInput";
import RadioButton from "@/components/RadioButton";
import DatePicker from "@/components/DatePicker";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { styles } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateEmr } from "@/features/patientSlice";
import {
  getWeeksAndDays,
  parseWeeksAndDays,
} from "@/utils/helperFunction";

import StepItems from "../StepItems";
import CounterField from "@/components/CounterField";
import { Text } from "react-native";

const VIEW_FIELDS = [
  { key: "lastMenstruationDate", label: "LMP", type: "date", section: "patient" },
  { key: "pregnancyMonths", label: "Pregnancy Month", type: "text", section: "patient" },
  { key: "gestationalAge", label: "Gestational Age", type: "text", section: "patient" },
  { key: "firstPregnancy", label: "First Pregnancy", type: "radio", section: "currentPregnancy" },
  { key: "totalPreviousPregnancies", label: "Total previous pregnancies", type: "number", section: "patient" },
  { key: "livingChildren", label: "Living children", type: "number", section: "patient" },
  { key: "miscarriageCount", label: "Miscarriages", type: "number", section: "patient" },
  { key: "miscarriages", label: "Miscarriages detail", type: "text", section: "patient" },
  { key: "stillbirthCount", label: "Stillbirths", type: "number", section: "patient" },
  { key: "neonatalDeathCount", label: "Neonatal deaths", type: "number", section: "patient" },
  { key: "pretermBirths", label: "Pre-term births", type: "number", section: "patient" },
  { key: "address", label: "Area of residence", type: "text", section: "patient" },
  { key: "education", label: "Education", type: "text", section: "patient" },
  { key: "occupation", label: "Occupation", type: "text", section: "patient" },
  { key: "durationOfMarriage", label: "Marriage duration", type: "text", section: "currentPregnancy" },
  { key: "isHusbandCousin", label: "Husband cousin", type: "text", section: "patient" },
];

interface Props {
  title: string;
  editable?: boolean;
  errors?: Record<string, string>;
}

const AddPatientProfile = ({ title, editable = true, errors = {} }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const patient = useAppSelector((state) => state?.patient?.emr?.patient) ?? {};
  const currentPregnancy =
    useAppSelector((state) => state?.patient?.emr?.currentPregnancy) ?? {};

  const updatePatient = (key: string, value: any) => {
    dispatch(updateEmr({ step: "patient", key, value }));
  };

  const updateCurrentPregnancy = (key: string, value: any) => {
    dispatch(updateEmr({ step: "currentPregnancy", key, value }));
  };

  const firstPregnancyValue = (() => {
    const v = currentPregnancy?.firstPregnancy;
    if (v === true || v === "true" || v === "Yes") return "Yes";
    if (v === false || v === "false" || v === "No") return "No";
    return "";
  })();

  const lmpDate = patient?.lastMenstruationDate
    ? new Date(patient.lastMenstruationDate)
    : undefined;

  const { weeks: gaWeeks, days: gaDays } = parseWeeksAndDays(
    patient?.gestationalAge || "",
  );

  const onLmpChange = (date: Date) => {
    const iso = date.toISOString();
    const ga = getWeeksAndDays(date);
    updatePatient("lastMenstruationDate", iso);
    updatePatient("gestationalAge", ga);
  };

  const renderViewMode = () => {
    if (!patient && !currentPregnancy) {
      return (
        <Text style={{ color: "#707070", fontStyle: "italic" }}>
          No patient data available.
        </Text>
      );
    }

    return (
      <View style={{ gap: 8 }}>
        {VIEW_FIELDS?.map((field) => {
          const source: any =
            field.section === "currentPregnancy" ? currentPregnancy : patient;
          const value = source?.[field.key];
          if (value === undefined || value === null || value === "") return null;

          let displayValue: any = value;

          if (field.type === "date") {
            displayValue = new Date(value).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          }

          if (field.type === "radio") {
            if (value === true || value === "true" || value === "Yes")
              displayValue = "Yes";
            else if (value === false || value === "false" || value === "No")
              displayValue = "No";
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
          {/* LMP */}
          <DatePicker
            label={t("LMP (Last Menstrual Period)")}
            value={lmpDate}
            maxDate={new Date()}
            onChange={onLmpChange}
            error={errors.lastMenstruationDate}
          />

          {/* Weeks / Days (auto-calculated from LMP) */}
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <AppInput
                label={t("Weeks")}
                inputProps={{
                  placeholder: "Auto from LMP",
                  value: gaWeeks,
                  editable: false,
                }}
              />
            </View>
            <View style={styles.flexItem}>
              <AppInput
                label={t("Days")}
                inputProps={{
                  placeholder: "Auto from LMP",
                  value: gaDays,
                  editable: false,
                }}
              />
            </View>
          </View>

          {/* Pregnancy Month */}
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <AppInput
                label={t("Pregnancy Month")}
                inputProps={{
                  value: patient?.pregnancyMonths || "",
                  onChangeText: (text) => updatePatient("pregnancyMonths", text),
                }}
              />
            </View>
          </View>

          {/* First Pregnancy (stored in currentPregnancy) */}
          <RadioButton
            label={t("First Pregnancy?")}
            options={[t("Yes"), t("No")]}
            value={firstPregnancyValue}
            onChange={(val) => updateCurrentPregnancy("firstPregnancy", val)}
            error={errors.firstPregnancy}
          />

          {/* Conditional Fields when NOT first pregnancy */}
          {firstPregnancyValue === "No" && (
            <View>
              <CounterField
                title="Total number of previous pregnancies?"
                value={patient?.totalPreviousPregnancies}
                onChange={(val) =>
                  updatePatient("totalPreviousPregnancies", val)
                }
              />
              <CounterField
                title="Number of living children?"
                value={patient?.livingChildren}
                onChange={(val) => updatePatient("livingChildren", val)}
              />
              <CounterField
                title="Number of miscarriages?"
                value={patient?.miscarriageCount}
                onChange={(val) => updatePatient("miscarriageCount", val)}
              />
              <AppInput
                label={t("Miscarriages detail")}
                inputProps={{
                  value: patient?.miscarriages || "",
                  onChangeText: (text) => updatePatient("miscarriages", text),
                }}
              />
              <CounterField
                title="Total number of stillbirths?"
                value={patient?.stillbirthCount}
                onChange={(val) => updatePatient("stillbirthCount", val)}
              />
              <CounterField
                title="Total no. of neonatal deaths?"
                initialValue={patient?.neonatalDeathCount || 0}
                onChange={(val) => updatePatient("neonatalDeathCount", val)}
              />
              <CounterField
                title="Total number of pre-term births?"
                value={patient?.pretermBirths}
                onChange={(val) => updatePatient("pretermBirths", val)}
              />
            </View>
          )}

          <AppInput
            label={t("Area of residence")}
            inputProps={{
              value: patient?.address || "",
              onChangeText: (text) => updatePatient("address", text),
            }}
            touched
            error={errors.address}
          />

          <AppInput
            label="Patient education level"
            inputProps={{
              placeholder: "Enter",
              value: patient?.education || "",
              onChangeText: (text) => updatePatient("education", text),
            }}
          />

          <RadioButton
            label={t("Patient occupation?")}
            options={[t("Working Woman"), t("Housewife"), "Both"]}
            value={patient?.occupation || ""}
            onChange={(val) => updatePatient("occupation", val)}
          />

          {/* Marriage duration (stored in currentPregnancy) */}
          <AppInput
            label={t("Duration of marriage")}
            inputProps={{
              value: currentPregnancy?.durationOfMarriage || "",
              onChangeText: (text) =>
                updateCurrentPregnancy("durationOfMarriage", text),
            }}
            touched
            error={errors.durationOfMarriage}
          />

          <AppInput
            label="Is husband her cousin?"
            inputProps={{
              placeholder: "Enter",
              value: patient?.isHusbandCousin || "",
              onChangeText: (text) => updatePatient("isHusbandCousin", text),
            }}
            touched
            error={errors.isHusbandCousin}
          />
        </>
      ) : (
        renderViewMode()
      )}
    </StepItems>
  );
};

export default AddPatientProfile;
