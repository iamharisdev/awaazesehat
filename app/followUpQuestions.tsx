// screens/FollowUpQuestions.tsx
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  BottomSheet,
  GenericPopup,
  KeyboardAvoidingWrapper,
  Question1,
  Question2,
  Question3,
  Question4,
  Question5,
  StepProgressBar,
} from "@/components";
import { setFollowUpSteps } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "@/styles/patientProfileStyle";
import { t } from "i18next";

const stepScreens = [
  { key: "Question1", component: <Question1 /> },
  { key: "Question2", component: <Question2 /> },
  { key: "Question3", component: <Question3 /> },
  { key: "Question4", component: <Question4 /> },
  { key: "Question5", component: <Question5 /> },
];

export default function FollowUpQuestions() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sheetRef = useRef(null);
  const { followUpSteps } = useAppSelector((state) => state.patient);

  const totalSteps = stepScreens.length;

  const onPressNext = () => {
    if (followUpSteps < totalSteps - 1) {
      dispatch(setFollowUpSteps(followUpSteps + 1));
    } else {
      sheetRef?.current?.open();
    }
  };

  const onPressLeft = () => {
    if (followUpSteps === 0) {
      router.back();
      return;
    }
    dispatch(setFollowUpSteps(followUpSteps - 1));
  };

  const onPressRight = () => {
    router.back();
  };

  return (
    <View style={styles.flex}>
      <AppHeader
        leftIcon={<Icons.left />}
        title={t("Follow-up questions")}
        rightIcon={<Icons.cross />}
        onLeftPress={onPressLeft}
        onRightPress={onPressRight}
      />
      <KeyboardAvoidingWrapper>
        {stepScreens[followUpSteps]?.component}
      </KeyboardAvoidingWrapper>

      <View style={styles.footerContainer}>
        <StepProgressBar totalSteps={totalSteps} currentStep={followUpSteps} />
        <View style={styles.subContainer}>
          <Text style={styles.stepText}>
            {t("Question {{current}} of {{total}}", {
              current: followUpSteps + 1,
              total: totalSteps,
            })}
          </Text>
          <TouchableOpacity style={styles.buttonStyle} onPress={onPressNext}>
            <Text style={styles.buttonText}>
              {followUpSteps < 4 ? t("Save & Next") : t("Save questions")}
            </Text>
            {followUpSteps < 4 && <Icons.whiteArrow marginLeft={10} />}
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet ref={sheetRef} sheetHeight={300}>
        <GenericPopup
          title={t("Follow-up questions completed")}
          description={t(
            "All follow-up questions for this patient have been answered. You can now review or upload reports before proceeding to the visit details."
          )}
          btnTitle1={t("Go to Reports")}
          icon={<Icons.patientRecord />}
          onCrossPress={() => sheetRef?.current.close()}
        />
      </BottomSheet>
    </View>
  );
}
