import { colors } from "@/utils/colors";
import React from "react";
import { View } from "react-native";

interface StepProgressBarProps {
  totalSteps: number;
  currentStep: number; // starts from 0
}

const StepProgressBar: React.FC<StepProgressBarProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 12,
      }}
    >
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={{
            flex: 1,
            height: 12,
            marginHorizontal: 1,
            backgroundColor:
              index <= currentStep ? colors.green.g20 : colors.black.b80,
            borderRadius: 2,
          }}
        />
      ))}
    </View>
  );
};

export default StepProgressBar;
