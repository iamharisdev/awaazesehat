import { Icons } from "@/assets/svgs";
import { useAppSelector } from "@/store";
import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { styles } from "./style";

interface StepItemProps {
  index: number;
  title: string;
  completed?: boolean;
  icon?: ReactNode;
  onPress?: () => void;
}

const StepItem: React.FC<StepItemProps> = ({ index, title, icon, onPress }) => {
  const { emr }: { emr: any } = useAppSelector((s) => s.patient);

  const showStartHere = () => index === 0 && !emr.createdAt;



  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      {emr?.createdAt ? (
        // ✅ Green circle with tick
        <View style={[styles.circle, styles.greenCircle]}>
          <Icon name="check" size={12} color="white" />
        </View>
      ) : (
        <View style={styles.circle} />
      )}
      <Text style={styles.title}>{title}</Text>
      {showStartHere() ? (
        <Text style={styles.startBtn}>Start here</Text>
      ) : (
        <Icons.arrowRight />
      )}
    </TouchableOpacity>
  );
};

export default StepItem;
