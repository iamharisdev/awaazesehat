import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Icons } from "@/assets/svgs";
import AppHeader from "@/components/AppHeader";
import BottomSheet from "@/components/BottomSheet";
import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingWrapper";
import StepProgressBar from "@/components/StepProgressBar";
import {
  Diagnostics,
  PhysicalExamination,
  PatientVital,
  TreatmentPlan,
  VisitList,
} from "@/components/VisitSteps";
import { setVisitSteps } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useTranslation } from "react-i18next";
import { styles } from "./style";
import {
  useCreateVisitMutation,
  useUpdateVisitMutation,
} from "@/services/modules/visit";
import AppLoader from "@/components/AppLoader";
import {
  validateVitals,
  validateExamination,
  validateTreatmentPlan,
} from "@/utils/visitValidator";

const Visit = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);

  const {
    visitSteps,
    visit,
    currentPatient: { id },
  } = useAppSelector((s) => s.patient);

  const [createVisit, { isLoading: createLoading }] = useCreateVisitMutation();
  const [updateVisit, { isLoading: updateLoading }] = useUpdateVisitMutation();
  const isLoading = createLoading || updateLoading;

  const [vitalsErrors, setVitalsErrors] = useState<Record<string, string>>({});
  const [examinationErrors, setExaminationErrors] = useState<Record<string, string>>({});
  const [treatmentErrors, setTreatmentErrors] = useState<Record<string, string>>({});
  const [examinationType, setExaminationType] = useState<string>("Structured Fields");

  const stepScreens = [
    { key: "Vitials", component: <PatientVital errors={vitalsErrors} /> },
    { key: "Examination", component: <PhysicalExamination errors={examinationErrors} onTypeChange={setExaminationType} /> },
    { key: "Diagnostics", component: <Diagnostics /> },
    { key: "Treatment Plan", component: <TreatmentPlan errors={treatmentErrors} /> },
  ];

  const totalSteps = stepScreens.length;
  const editable = visit.createdAt;

  const handleApi = async () => {
    const advisedLabTests = visit?.proposedPlan?.advisedLabTests
      ? visit.proposedPlan.advisedLabTests.split(",").filter(Boolean)
      : [];

    const bulkBody = {
      visit: {
        patientId: id ?? null,
        visitDate: new Date().toISOString(),
      },
      vitals: visit?.vitals,
      examination: visit?.examination,
      proposedPlan: {
        ...visit?.proposedPlan,
        advisedLabTests,
      },
    };

    let res;

    if (editable) {
      res = await updateVisit({ visitId: visit.id, ...bulkBody });
    } else {
      res = await createVisit(bulkBody);
    }

    if (res.data) {
      sheetRef?.current.close();
    }
  };

  const onPressNext = () => {
    // Step 0: Validate vitals
    if (visitSteps === 0) {
      const errors = validateVitals(visit?.vitals);
      setVitalsErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    // Step 1: Validate examination
    if (visitSteps === 1) {
      const errors = validateExamination(visit?.examination, examinationType);
      setExaminationErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    // Step 3: Validate treatment plan
    if (visitSteps === 3) {
      const errors = validateTreatmentPlan(visit?.proposedPlan);
      setTreatmentErrors(errors);
      if (Object.keys(errors).length > 0) return;
    }

    if (visitSteps < totalSteps - 1) {
      dispatch(setVisitSteps(visitSteps + 1));
    } else {
      handleApi();
    }
  };

  const onPressLeft = () => {
    if (visitSteps === 0) {
      sheetRef?.current.close();
      return;
    }
    dispatch(setVisitSteps(visitSteps - 1));
  };

  const onPressRight = () => {
    sheetRef?.current.close();
  };

  return (
    <View>
      <VisitList ref={sheetRef} />

      <BottomSheet ref={sheetRef} sheetHeight={1000}>
        {/* header */}
        <AppHeader
          leftIcon={<Icons.left />}
          title={t("Visit")}
          rightIcon={<Icons.cross />}
          onLeftPress={onPressLeft}
          onRightPress={onPressRight}
        />
        {/* main */}
        <KeyboardAvoidingWrapper>
          {stepScreens[visitSteps]?.component}
        </KeyboardAvoidingWrapper>
        {isLoading && <AppLoader fullScreen />}
        {/* footer */}
        <View style={styles.footerContainer}>
          <StepProgressBar totalSteps={totalSteps} currentStep={visitSteps} />
          <View style={styles.subContainer}>
            <Text style={styles.stepText}>
              {t("Visit {{current}} of {{total}}", {
                current: visitSteps + 1,
                total: totalSteps,
              })}
            </Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={onPressNext}>
              <Text style={styles.buttonText}>
                {visitSteps < totalSteps - 1
                  ? t("Save & Next")
                  : t("Save questions")}
              </Text>
              {visitSteps < totalSteps - 1 && (
                <Icons.whiteArrow marginLeft={10} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Visit;
