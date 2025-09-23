import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RadioButton from "@/components/RadioButton";
import AppInput from "@/components/AppInput";
import { StepItems } from "@/components";

const AddPatientProfile = () => {
  return (
    <View>
      <StepItems title="Add Patient Profile">
        <AppInput label="Name" inputProps={{}} />
        <AppInput label="Age" inputProps={{}} />

        <RadioButton
          label="Marital Status"
          options={[
            { label: "Married", value: "married" },
            { label: "Single", value: "single" },
          ]}
        />
      </StepItems>
    </View>
  );
};

export default AddPatientProfile;

const styles = StyleSheet.create({});
