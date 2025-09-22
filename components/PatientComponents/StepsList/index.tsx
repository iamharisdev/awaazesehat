import React from "react";
import { Text, View } from "react-native";
import { StepItem } from "../StepItem";
import { styles } from "./style";

const steps = [
  "Add patient profile",
  "Record obstetric history",
  "Record gynecological history",
  "Review past medical history",
];


const StepsList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.progress}>0/9 Steps completed</Text>
      <Text style={styles.desc}>
        Review and verify patient details. Add missing information as needed.
      </Text>

      {steps.map((title, index) => (
        <StepItem key={index} title={title} />
      ))}
    </View>
  );
};

export default StepsList;
