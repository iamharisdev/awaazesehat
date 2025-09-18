import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "@/utils/colors";
import { StepItem } from "../StepItem";

const StepsList = () => {
  return (
    <View>
      <Text style={styles.progress}>0/9 Steps completed</Text>
      <Text style={styles.desc}>
        Review and verify patient details. Add missing information as needed.
      </Text>

      <StepItem title="Add patient profile" />
      <StepItem title="Record obstetric history" />
      <StepItem title="Record gynecological history" />
      <StepItem title="Review past medical history" />
    </View>
  );
};


export default StepsList

const styles = StyleSheet.create({
  progress: {
    fontSize: 13,
    color: colors.black.b70,
    backgroundColor: colors.black.b10,
    padding: 6,
    borderRadius: 4,
    marginHorizontal: 12,
    marginTop: 12,
  },
  desc: {
    fontSize: 13,
    color: colors.black.b70,
    marginHorizontal: 12,
    marginVertical: 6,
  },
});
