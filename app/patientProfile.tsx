// screens/PatientSteps.tsx
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import RBSheet from "react-native-raw-bottom-sheet";

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
import { setEmrSteps, setTab } from "@/features/patientSlice";
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
  const sheetRef = useRef<any>(null);
  const { emrSteps, emr, currentPatient } = useAppSelector(
    (state) => state.patient,
  );

  const [createEmr] = useCreateEmrMutation();
  const [updateEmr] = useUpdateEmrMutation();

  const [steps, setSteps] = useState(getSteps(emr));
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = steps.length;
  const check = !emr?.createdAt
    ? "create"
    : emr?.isEditable
      ? "update"
      : "none";

  const [showCompletionSheet, setShowCompletionSheet] = useState(false);

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

  useEffect(() => {
    if (showCompletionSheet) {
      sheetRef?.current?.open();
    }
  }, [showCompletionSheet]);

  const CurrentStepComponent = steps[emrSteps]?.component;

  const apiCall = async () => {
    setIsLoading(true); // 🌀 start loader

    const updatedPayload = {
      ...emr,
      patient: {
        ...emr?.patient,
        name: currentPatient?.name,
        age: currentPatient?.age,
        cnic: currentPatient?.cnic,
        phoneNumber: currentPatient?.phoneNumber || currentPatient?.phone,
        husbandName: currentPatient?.husbandName,
      },
      patientId: currentPatient?.id,
      phone: currentPatient?.phoneNumber,
      visit: 1,
    };

    try {
      if (check === "create") {
        // ➕ CREATE EMR
        const res = await createEmr(updatedPayload).unwrap();
        if (res?.emrId) {
          onPressRight();
        }
      } else if (check === "update") {
        // 🔄 UPDATE EMR
        const { patient, ...restPayload } = updatedPayload;

        const payload = {
          ...restPayload,
          emrId: emr?.id,
        };

        const res = await updateEmr(payload).unwrap();

        setShowCompletionSheet(true);
      } else {
        // No API call needed
        setShowCompletionSheet(true);
      }
    } catch (err: any) {
      console.error("❌ EMR API error:", err);
    } finally {
      setIsLoading(false); // 🛑 stop loader
    }
  };

  const onClose = () => {
    setShowCompletionSheet(false);
    router.back();
  };
  const goToVisit = () => {
    onClose();
    dispatch(setTab(1));
  };

  const isLastStep = emrSteps === totalSteps - 1;

  // Calculate button label
  let buttonLabel: string =
    check === "create" || check === "update"
      ? isLastStep
        ? "Save Patient Record"
        : "Save & Next"
      : isLastStep
        ? "Complete"
        : "Next";

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
        <CurrentStepComponent
          title={steps[emrSteps]?.key}
          editable={check === "create" || check === "update"}
        />
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
            <Text style={styles.buttonText}>{buttonLabel}</Text>
            {!isLastStep && <Icons.whiteArrow style={{ marginLeft: 10 }} />}
          </TouchableOpacity>
        </View>
      </View>
      {showCompletionSheet && (
        <BottomSheet ref={sheetRef} sheetHeight={350}>
          <GenericPopup
            title={t("EMR Completed")}
            description={t(
              "Next you can note patient vitals, physical examination and give them advise them accordingly.",
            )}
            btnTitle1={t("Add Visit")}
            btnTitle2={t("Cancel")}
            icon={<Icons.emr />}
            openPress={goToVisit}
            onCrossPress={onClose}
            closePress={onClose}
          />
        </BottomSheet>
      )}
    </View>
  );
}
