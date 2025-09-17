import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@/utils/colors";
import { Icons } from "@/assets/svgs";

interface StepItemProps {
  title: string;
  completed?: boolean;
  onPress?: () => void;
}

export const StepItem: React.FC<StepItemProps> = ({ title, completed, onPress }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={styles.circle} />
      <Text style={styles.title}>{title}</Text>
      <Icons.arrowRight />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.black.b10,
    paddingHorizontal: 12,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black.b40,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: colors.black.b100,
  },
});
