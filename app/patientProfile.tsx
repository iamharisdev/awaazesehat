// screens/PatientSteps.tsx
import React, { useState } from "react";
import { View, Button, Text, TouchableOpacity } from "react-native";

import {
  AddPatientProfile,
  AppHeader,
  AppInput,
  KeyboardAvoidingWrapper,
  RadioButton,
  StepItems,
  StepProgressBar,
} from "@/components";
import { Icons } from "@/assets/svgs";
import { hp, wp } from "@/utils/responsive";
import { colors } from "@/utils/colors";
import { styles } from "@/styles/patientProfileStyle";

const steps = [
  "Patient Profile",
  "Obstetric History",
  "Gynecological History",
  "Past Medical History",
  "Surgical History",
  "Current Pregnancy",
  "Family History",
  "Personal History",
  "Socioeconomic History",
];

export default function PatientSteps() {
  const [step, setStep] = useState(0);

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader
        leftIcon={<Icons.left />}
        title="Patient Record"
        rightIcon={<Icons.cross />}
      />
      {step === 0 && <AddPatientProfile />}
      <View style={styles.footerContainer}>
        <StepProgressBar totalSteps={9} currentStep={7} />
        <View style={styles.subContainer}>
          <Text style={styles.stepText}>Step 1 of 9</Text>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Save & Next</Text>
            <Icons.arrowRight stroke={colors.white.w1} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
}
