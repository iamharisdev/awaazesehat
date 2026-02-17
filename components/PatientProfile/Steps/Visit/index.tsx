import React, { useRef } from "react";
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

const stepScreens = [
  { key: "Vitials", component: PatientVital },
  { key: "Examination", component: PhysicalExamination },
  { key: "Diagnostics", component: Diagnostics },
  { key: "Treatment Plan", component: TreatmentPlan },
];

const Visit = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);

  const {
    visitSteps,
    visit,
    currentPatient: { id },
  } = useAppSelector((s) => s.patient);

  const [createVisit] = useCreateVisitMutation();
  const [updateVisit] = useUpdateVisitMutation();

  const totalSteps = stepScreens.length;
  const editable = visit.createdAt;

  const handleApi = async () => {
    let test = visit?.proposedPlan?.advisedLabTests
      ? visit.proposedPlan.advisedLabTests.split(",")
      : [];
    let body = {
      patientId: id ?? null,
      visitDate: new Date().toISOString(),
      vitals: visit?.vitals,
      examination: visit?.examination,
      diagnostics: visit?.diagnostics,
      proposedPlan: {
        ...visit?.proposedPlan,
        advisedLabTests: test,
      },
    };
    let res;

    console.log("editable:=>  ",editable);
    if (editable) {
      let payload = { ...body, visitId: visit.id };
      res = await updateVisit(payload);
    } else {
      res = await createVisit(body);
    }

    if (res.data) {
      sheetRef?.current.close();
    }
  };

  const onPressNext = () => {
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

  const CurrentStepComponent = stepScreens[visitSteps]?.component;

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
          <CurrentStepComponent title={stepScreens[visitSteps]?.key} />
        </KeyboardAvoidingWrapper>
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
