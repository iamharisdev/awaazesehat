import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "@/utils/colors";

interface RiskTagProps {
  label: string;
  type: "critical" | "mild" | "normal";
}

export const RiskTag: React.FC<RiskTagProps> = ({ label, type }) => {
  const bg =
    type === "critical"
      ? colors.red.r10
      : type === "mild"
      ? colors.orange.o10
      : colors.green.g10;

  const textColor =
    type === "critical"
      ? colors.red.r80
      : type === "mild"
      ? colors.orange.o80
      : colors.green.g80;

  return (
    <View style={[styles.tag, { backgroundColor: bg }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
  },
});
