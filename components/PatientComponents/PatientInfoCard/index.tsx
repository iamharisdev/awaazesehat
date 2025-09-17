import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/utils/colors";

interface PatientInfoCardProps {
  ga: string;
  edd: string;
}

export const PatientInfoCard: React.FC<PatientInfoCardProps> = ({ ga, edd }) => {
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

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontSize: 12,
    color: colors.black.b60,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
    color: colors.black.b10,
  },
});
