import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/utils/colors";
import { styles } from "./style";

interface PatientInfoCardProps {
  ga: string;
  gpa: string;
}

const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ ga, gpa }) => {
  return (
    <View style={styles.row}>
      <View style={[styles.card, { backgroundColor: colors.green.g90 }]}>
        <Text style={styles.label}>Gestational Age</Text>
        <Text style={styles.value}>{ga}</Text>
      </View>
      <View style={[styles.card, { backgroundColor: colors.green.g90 }]}>
        <Text style={styles.label}>Gravida Para Abortion</Text>
        <Text style={styles.value}>{gpa}</Text>
      </View>
    </View>
  );
};

export default PatientInfoCard
