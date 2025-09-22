import { Icons } from "@/assets/svgs";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

interface PatientCardProps {
  name: string;
  ga: string;
  onPress?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ name, ga, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.ga}>GA: {ga}</Text>
      </View>
      <Icons.arrowRight/>
    </TouchableOpacity>
  );
};


export default PatientCard

