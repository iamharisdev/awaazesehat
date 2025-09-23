import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/utils/colors";
import { styles } from "./style";

interface PatientInfoCardProps {
  ga: string;
  edd: string;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ ga, edd }) => {
  return (
    <View style={styles.row}>
      <View style={[styles.card, { backgroundColor: colors.green.g90 }]}>
        <Text style={styles.label}>Gestational Age</Text>
        <Text style={styles.value}>{ga}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.green.g90 }]}>
        <Text style={styles.label}>Estimated Delivery Date</Text>
        <Text style={styles.value}>{edd}</Text>
      </View>
    </View>
  );
};

export default PatientInfoCard
