import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/utils/colors";
import { styles } from "./style";

interface PatientHeaderProps {
  name: string;
  age: string;
  phone: string;
  cnic: string;
}

 const PatientHeader: React.FC<PatientHeaderProps> = ({
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

export default PatientHeader

