// screens/FollowUpQuestions.tsx
import { useRouter } from "expo-router";
import React, { useRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { t } from "i18next";

import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  BottomSheet,
  GenericPopup,
  KeyboardAvoidingWrapper,
  Question,
  StepProgressBar,
} from "@/components";
import { setFollowUpSteps } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "@/styles/patientProfileStyle";
import { followUpQuestions } from "@/utils/Json";

export default function FollowUpQuestions() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const sheetRef = useRef<any>(null);
  const { followUpSteps } = useAppSelector((state) => state.patient);

  const totalSteps = followUpQuestions.length;

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

  const currentQuestion = followUpQuestions[followUpSteps];

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
        {currentQuestion && (
          <Question question={currentQuestion.question} index={followUpSteps} />
        )}
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
              {followUpSteps < totalSteps - 1
                ? t("Save & Next")
                : t("Save questions")}
            </Text>
            {followUpSteps < totalSteps - 1 && (
              <Icons.whiteArrow marginLeft={10} />
            )}
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
