import { Icons } from "@/assets/svgs";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

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
