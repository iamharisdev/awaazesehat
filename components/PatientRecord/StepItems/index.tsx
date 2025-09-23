// components/StepItem.tsx
import { colors } from "@/utils/colors";
import React from "react";
import { View, Text } from "react-native";

interface StepItemProps {
  title: string;
  children?: React.ReactNode;
}

const StepItem: React.FC<StepItemProps> = ({ title, children }) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          marginBottom: 12,
          fontFamily: "Medium",
          color: colors.black.b05,
        }}
      >
        {title}
      </Text>
      <View>{children}</View>
    </View>
  );
};

export default StepItem;
