import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import BottomSheet from "@/components/BottomSheet";
import StepProgressBar from "@/components/StepProgressBar";
import {
  Diagnostics,
  Examination,
  PatientVital,
  TreatmentPlan,
  VisitList,
} from "@/components/VisitSteps";
import { setVisitSteps } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useTranslation } from "react-i18next";
import { Icons } from "@/assets/svgs";
import { styles } from "./style";
import AppHeader from "@/components/AppHeader";
import KeyboardAvoidingWrapper from "@/components/KeyboardAvoidingWrapper";

const stepScreens = [
  { key: "Vitials", component: PatientVital },
  { key: "Examination", component: Examination },
  { key: "Diagnostics", component: Diagnostics },
  { key: "Treatment Plan", component: TreatmentPlan },
];

const Visit = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);
  const totalSteps = stepScreens.length;

  const { visitSteps } = useAppSelector((s) => s.patient);

  const onPressNext = () => {
    if (visitSteps < totalSteps - 1) {
      dispatch(setVisitSteps(visitSteps + 1));
    } else {
      sheetRef?.current?.open();
    }
  };

  const onPressLeft = () => {
    if (visitSteps === 0) {
      return;
    }
    dispatch(setVisitSteps(visitSteps - 1));
  };

  const onPressRight = () => {};

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
