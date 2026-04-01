import AppInput from "@/components/AppInput";
import DatePicker from "@/components/DatePicker";
import { updateVisit } from "@/features/patientSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

const AddPatientVitals: React.FC<{ errors?: Record<string, string> }> = ({ errors = {} }) => {
  const dispatch = useAppDispatch();
  const vitals = useAppSelector((s) => s.patient.visit.vitals);

  const editable = false;
  // const editable = visit?.createdAt !== visit?.updatedAt;

  const updateField = (key: string, value: any) => {
    dispatch(
      updateVisit({
        step: "vitals",
        key,
        value,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Patient Vitals</Text>

      {/* Visit Date */}
      <DatePicker
        label="Visit Date"
        value={vitals?.visitDate ? new Date(vitals.visitDate) : new Date()}
        onChange={(date) => updateField("visitDate", date)}
        maxDate={new Date()}
      />

      {/* Presenting Complaint */}
      <AppInput
        label="Presenting complaint"
        error={errors.presentingComplaint}
        touched={!!errors.presentingComplaint}
        inputProps={{
          placeholder: "Enter about complications they are facing now...",
          value: vitals?.presentingComplaint || "",
          editable: !editable,
          onChangeText: (text: string) =>
            updateField("presentingComplaint", text),
        }}
      />

      {/* Row 1 */}
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <AppInput
            label="Blood pressure (mmHg)"
            inputProps={{
              placeholder: "e.g. 120/80",
              value: vitals?.bloodPressure || "",
              editable: !editable,
              keyboardType: "numeric",
              onChangeText: (text: string) => {
                let digits = text.replace(/\D/g, "").slice(0, 6);
                if (digits.length > 3) {
                  digits = digits.slice(0, 3) + "/" + digits.slice(3);
                }
                updateField("bloodPressure", digits);
              },
            }}
          />
        </View>

        <View style={styles.halfWidth}>
          <AppInput
            label="Pulse rate (bpm)"
            inputProps={{
              placeholder: "Enter",
              value: vitals?.pulseRate || "",
              editable: !editable,
              keyboardType: "numeric",
              onChangeText: (text: string) => updateField("pulseRate", text),
            }}
          />
        </View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <AppInput
            label="Temperature (°C)"
            inputProps={{
              placeholder: "Enter",
              value: vitals?.temperature || "",
              editable: !editable,
              keyboardType: "numeric",
              onChangeText: (text: string) => updateField("temperature", text),
            }}
          />
        </View>

        <View style={styles.halfWidth}>
          <AppInput
            label="Respiratory rate"
            inputProps={{
              placeholder: "Enter",
              value: vitals?.respiratoryRate || "",
              editable: !editable,
              keyboardType: "numeric",
              onChangeText: (text: string) =>
                updateField("respiratoryRate", text),
            }}
          />
        </View>
      </View>

      {/* Weight */}
      <AppInput
        label="Weight (kg)"
        inputProps={{
          placeholder: "Enter",
          value: vitals?.weight || "",
          editable: !editable,
          keyboardType: "numeric",
          onChangeText: (text: string) => updateField("weight", text),
        }}
      />
    </View>
  );
};

export default AddPatientVitals;
