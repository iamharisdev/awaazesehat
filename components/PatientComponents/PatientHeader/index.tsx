import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/utils/colors";

interface PatientHeaderProps {
  name: string;
  age: string;
  phone: string;
  cnic: string;
}

export const PatientHeader: React.FC<PatientHeaderProps> = ({
  name,
  age,
  phone,
  cnic,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{`${name} - ${age}`}</Text>
      <Text style={styles.sub}>{`${phone} · ${cnic}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.black.b100,
  },
  sub: {
    fontSize: 13,
    color: colors.black.b60,
    marginTop: 2,
  },
});
