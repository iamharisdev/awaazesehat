import AppInput from "@/components/AppInput";
import DatePicker from "@/components/DatePicker";
import RadioButton from "@/components/RadioButton";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { styles } from "./style";
import { useAppDispatch, useAppSelector } from "@/store";
import { updatePatientRecord } from "@/features/patientSlice";
import StepItems from "../StepItems";
import { bloodGroup } from "@/utils/Json";
import BottomSheet from "@/components/BottomSheet";
import SelectionPopup from "@/components/SelectionPopup";
import OpenBottomSheet from "@/components/OpenBottomSheet";

type ActiveSheet = "patient" | "husband"  | null;

const AddPatientProfile = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);
  const [activeSheet, setActiveSheet] = useState<ActiveSheet>(null);

  const profile = useAppSelector(
    (state) => state.patient.patientRecord.profile ?? {}
  );

  const updateField = (key: string, value: any) => {
    dispatch(updatePatientRecord({ step: "profile", key, value }));
  };

  const openSheet = (type: ActiveSheet) => {
    setActiveSheet(type);
    sheetRef.current?.open();
  };

  const closeSheet = () => {
    setActiveSheet(null);
    sheetRef.current?.close();
  };

  const handleSave = (val: string | string[]) => {
    if (activeSheet === "patient") {
      updateField("patientBloodGroup", val);
    } else {
      updateField("husbandBloodGroup", val);
    }

    closeSheet();
  };

  return (
    <StepItems title={t("Add Patient Profile")}>
      {/* Row 1: LMP + Pregnancy month */}
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

      {/* Radios */}
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

      {/* Marriage duration */}
      <AppInput
        label={t("Duration of marriage")}
        inputProps={{
          value: profile.marriageDuration || "",
          onChangeText: (text) => updateField("marriageDuration", text),
        }}
      />

      {/* Row 2: Blood groups */}
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <OpenBottomSheet
            label={t("Patient’s blood group")}
            value={profile.patientBloodGroup}
            onPress={() => openSheet("patient")}
          />
        </View>
        <View style={styles.flexItem}>
          <OpenBottomSheet
            label={t("Husband’s blood group")}
            value={profile.husbandBloodGroup}
            onPress={() => openSheet("husband")}
          />
        </View>
      </View>

      {/* Husband phone */}
      <AppInput
        label={t("Husband’s phone number")}
        inputProps={{
          value: profile.husbandPhone || "",
          onChangeText: (text) => updateField("husbandPhone", text),
        }}
      />

      {/* Residence */}
      <AppInput
        label={t("Area/locality of residence")}
        inputProps={{
          value: profile.residence || "",
          onChangeText: (text) => updateField("residence", text),
        }}
      />

   
      <BottomSheet ref={sheetRef} sheetHeight={350}>
        {activeSheet && (
          <SelectionPopup
            title={t("Select Blood Group")}
            data={bloodGroup}
            value={
              activeSheet === "patient"
                ? profile.patientBloodGroup
                : profile.husbandBloodGroup
            }
            multiSelect={false}
            onSave={handleSave}
            onCrossPress={closeSheet}
          />
        )}
      </BottomSheet>
    </StepItems>
  );
};

export default AddPatientProfile;
