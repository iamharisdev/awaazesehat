// screens/PatientSteps.tsx
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { Icons } from "@/assets/svgs";
import {
  AddPatientProfile,
  AppHeader,
  BottomSheet,
  CurrentPregnancy,
  FamilyHistory,
  GenericPopup,
  GynecologicalHistory,
  KeyboardAvoidingWrapper,
  PastMedicalHistory,
  PersonalHistory,
  RecordObstetricHistory,
  SocioEconomicHistory,
  StepProgressBar,
  SurgicalHistory,
} from "@/components";
import { styles } from "@/styles/patientProfileStyle";
import { useAppDispatch, useAppSelector } from "@/store";
import { setPatientRecordSteps } from "@/features/patientSlice";
import { t } from "i18next";

const stepScreens = [
  { key: "Patient Profile", component: <AddPatientProfile /> },
  { key: "Obstetric History", component: <RecordObstetricHistory /> },
  { key: "Gynecological History", component: <GynecologicalHistory /> },
  { key: "Past Medical History", component: <PastMedicalHistory /> },
  { key: "Surgical History", component: <SurgicalHistory /> },
  { key: "Current Pregnancy", component: <CurrentPregnancy /> },
  { key: "Family History", component: <FamilyHistory /> },
  { key: "Personal History", component: <PersonalHistory /> },
  { key: "Socioeconomic History", component: <SocioEconomicHistory /> },
];

export default function PatientSteps() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sheetRef = useRef(null);
  const { patientRecordSteps } = useAppSelector((state) => state.patient);

  const totalSteps = stepScreens.length;

  const onPressNext = () => {
    if (patientRecordSteps < totalSteps - 1) {
      dispatch(setPatientRecordSteps(patientRecordSteps + 1));
    } else {
      sheetRef?.current?.open();
    }
  };

  const onPressLeft = () => {
    if (patientRecordSteps === 0) {
      router.back();
      return;
    }
    dispatch(setPatientRecordSteps(patientRecordSteps - 1));
  };

  const onPressRight = () => {
    router.back();
  };

  return (
    <View style={styles.flex}>
      <KeyboardAvoidingWrapper>
        <AppHeader
          leftIcon={<Icons.left />}
          title={t("Patient Record")}
          rightIcon={<Icons.cross />}
          onLeftPress={onPressLeft}
          onRightPress={onPressRight}
        />
        {stepScreens[patientRecordSteps]?.component}
      </KeyboardAvoidingWrapper>

      <View style={styles.footerContainer}>
        <StepProgressBar
          totalSteps={totalSteps}
          currentStep={patientRecordSteps}
        />
        <View style={styles.subContainer}>
          <Text style={styles.stepText}>
            {t("Step {{current}} of {{total}}", {
              current: patientRecordSteps + 1,
              total: totalSteps,
            })}
          </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={onPressNext}>
            <Text style={styles.buttonText}>
              {patientRecordSteps < 8
                ? t("Save & Next")
                : t("Save patient record")}
            </Text>
            {patientRecordSteps < 8 && <Icons.whiteArrow marginLeft={10} />}
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet ref={sheetRef} sheetHeight={350}>
        <GenericPopup
          title={t("Patient record completed")}
          description={t(
            "Patient record is complete! Next, let’s review a few follow-up questions to fill in any gaps that has been left during patient record."
          )}
          btnTitle1={t("Start follow-up questions")}
          btnTitle2={t("Skip questions")}
          icon={<Icons.patientRecord/>}
          onCrossPress={() => sheetRef?.current.close()}
          closePress={() => sheetRef?.current.close()}
        />
      </BottomSheet>
    </View>
  );
}
