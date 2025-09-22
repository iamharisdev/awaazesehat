import { Icons } from "@/assets/svgs";
import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

interface StepItemProps {
  title: string;
  completed?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
}

const StepItem: React.FC<StepItemProps> = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      {icon ? icon : <View style={styles.circle} />}
      <Text style={styles.title}>{title}</Text>
      <Icons.arrowRight />
    </TouchableOpacity>
  );
};


export default StepItem