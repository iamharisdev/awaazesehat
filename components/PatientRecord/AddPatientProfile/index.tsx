import { DropDownPicker, StepItems } from "@/components";
import AppInput from "@/components/AppInput";
import DatePicker from "@/components/DatePicker";
import RadioButton from "@/components/RadioButton";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { styles } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import { updatePatientRecord } from "@/features/patientSlice";


const AddPatientProfile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const profile = useAppSelector((state) => state.patient.patientRecord.profile || {});

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "profile", key, value }));
  };

  return (
    <StepItems title={t("Add Patient Profile")}>
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <DatePicker
            label={t("LMP")}
            value={profile.lmpDate || new Date()}
            onChange={(date) => updateField("lmpDate", date)}
          />
        </View>
        <View style={styles.flexItem}>
          <AppInput
            label={t("Pregnancy month")}
            inputProps={{
              value: profile.pregnancyMonth || "",
              onChangeText: (text) => updateField("pregnancyMonth", text),
            }}
          />
        </View>
      </View>

      <RadioButton
        label={t("First Pregnancy?")}
        options={[t("Yes"), t("No")]}
        value={profile.firstPregnancy || ""}
        onChange={(val) => updateField("firstPregnancy", val)}
      />

      <RadioButton
        label={t("Patient occupation?")}
        options={[t("Working Woman"), t("HouseWife")]}
        value={profile.occupation || ""}
        onChange={(val) => updateField("occupation", val)}
      />

      <AppInput
        label={t("Duration of marriage")}
        inputProps={{
          value: profile.marriageDuration || "",
          onChangeText: (text) => updateField("marriageDuration", text),
        }}
      />

      <View style={styles.row}>
        <View style={styles.flexItem}>
          <DropDownPicker
            label={t("Patient’s blood group")}
            value={profile.patientBloodGroup || "A+"}
            onChange={(val) => updateField("patientBloodGroup", val)}
          />
        </View>
        <View style={styles.flexItem}>
          <DropDownPicker
            label={t("Husband’s blood group")}
            value={profile.husbandBloodGroup || "B+"}
            onChange={(val) => updateField("husbandBloodGroup", val)}
          />
        </View>
      </View>

      <AppInput
        label={t("Husband’s phone number")}
        inputProps={{
          value: profile.husbandPhone || "",
          onChangeText: (text) => updateField("husbandPhone", text),
        }}
      />

      <AppInput
        label={t("Area/locality of residence")}
        inputProps={{
          value: profile.residence || "",
          onChangeText: (text) => updateField("residence", text),
        }}
      />
    </StepItems>
  );
};

export default AddPatientProfile;
