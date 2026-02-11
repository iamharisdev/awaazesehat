// screens/PatientSteps.tsx
import React, { useEffect, useRef, useState } from "react";
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
import { setEmrSteps } from "@/features/patientSlice";
import { t } from "i18next";
import {
  useCreateEmrMutation,
  useUpdateEmrMutation,
} from "@/services/modules/emr";

const stepScreens = [
  { key: "Patient Profile", component: AddPatientProfile },
  { key: "Obstetric History", component: RecordObstetricHistory },
  { key: "Current Pregnancy", component: CurrentPregnancy },
  { key: "Gynecological History", component: GynecologicalHistory },
  { key: "Past Medical History", component: PastMedicalHistory },
  { key: "Surgical History", component: SurgicalHistory },
  { key: "Family History", component: FamilyHistory },
  { key: "Personal History", component: PersonalHistory },
  { key: "Socio-economic History", component: SocioEconomicHistory },
];

const getSteps = (emr: any) => {
  if (emr?.patient?.firstPregnancy === "true") {
    return stepScreens.filter((_, i) => i !== 1);
  }
  return stepScreens;
};

export default function PatientProfile() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sheetRef = useRef(null);
  const { emrSteps, emr, currentPatient } = useAppSelector(
    (state) => state.patient,
  );

  const [createEmr] = useCreateEmrMutation();
  const [updateEmr] = useUpdateEmrMutation();

  const [steps, setSteps] = useState(getSteps(emr));
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = stepScreens.length;

  const onPressNext = () => {
    if (emrSteps < totalSteps - 1) {
      dispatch(setEmrSteps(emrSteps + 1));
    } else {
      apiCall();
    }
  };

  const onPressLeft = () => {
    if (emrSteps === 0) {
      router.back();
      return;
    }
    dispatch(setEmrSteps(emrSteps - 1));
  };

  const onPressRight = () => {
    router.back();
  };

 useEffect(() => {
  setSteps(getSteps(emr));
}, [emr?.patient?.firstPregnancy]);


  const CurrentStepComponent = steps[emrSteps]?.component;
  const check =
    !emr?.createdAt || emr?.createdAt == emr?.updatedAt ? true : false;

  const apiCall = async () => {
    setIsLoading(true); // 🌀 start loader

    const updatedPayload = {
      ...emr,
      patient: {
        ...emr?.patient,
        name: currentPatient?.name,
        age: currentPatient?.age,
        cnic: currentPatient?.cnic,
        gestationalAge:
          currentPatient?.gestationalAge ?? emr?.patient?.gestationalAge,
        phoneNumber: currentPatient?.phoneNumber || currentPatient?.phone,
        husbandName: currentPatient?.husbandName,
      },
      patientId: currentPatient?.id,
      phone: currentPatient?.phoneNumber,
    };

    try {
      // 🔄 UPDATE EMR
      if (emr?.createdAt && emr?.createdAt === emr?.updatedAt) {
        const { patient, ...restPayload } = updatedPayload;

        const payload = {
          ...restPayload,
          emrId: emr?.id,
        };

        const res = await updateEmr(payload).unwrap();

        console.log("✅ EMR updated successfully:", res);
        sheetRef?.current?.open();
      }
      // ➕ CREATE EMR
      else {
        const res = await createEmr(updatedPayload).unwrap();

        console.log("✅ EMR created successfully:", res);
      }
    } catch (err: any) {
      console.error("❌ EMR API error:", err);
    } finally {
      setIsLoading(false); // 🛑 stop loader
    }
  };


  return (
    <View style={styles.flex}>
      <AppHeader
        leftIcon={<Icons.left />}
        title={t("Patient Record")}
        rightIcon={<Icons.cross />}
        onLeftPress={onPressLeft}
        onRightPress={onPressRight}
      />
      <KeyboardAvoidingWrapper>
        <CurrentStepComponent title={steps[emrSteps]?.key} editable={check} />
      </KeyboardAvoidingWrapper>

      <View style={styles.footerContainer}>
        <StepProgressBar totalSteps={totalSteps} currentStep={emrSteps} />
        <View style={styles.subContainer}>
          <Text style={styles.stepText}>
            {t("Step {{current}} of {{total}}", {
              current: emrSteps + 1,
              total: totalSteps,
            })}
          </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={onPressNext}>
            <Text style={styles.buttonText}>
              {emrSteps < 8 ? t("Save & Next") : t("Save patient record")}
            </Text>
            {emrSteps < 8 && <Icons.whiteArrow marginLeft={10} />}
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet ref={sheetRef} sheetHeight={350}>
        <GenericPopup
          title={t("Patient record completed")}
          description={t(
            "Patient record is complete! Next, let’s review a few follow-up questions to fill in any gaps that has been left during patient record.",
          )}
          btnTitle1={t("Start follow-up questions")}
          btnTitle2={t("Skip questions")}
          // icon={<Icons.emr />}
          onCrossPress={() => sheetRef?.current.close()}
          closePress={() => sheetRef?.current.close()}
        />
      </BottomSheet>
    </View>
  );
}
