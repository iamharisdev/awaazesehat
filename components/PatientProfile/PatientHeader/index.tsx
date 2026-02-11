import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { useAppSelector } from "@/store";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { colors } from "@/utils/colors";
import {
  getUpdatedGestationalAge,
  getWeeksAndDays,
} from "@/utils/helperFunction";

const PatientHeader = () => {
  const patient = useAppSelector((s) => s.patient.currentPatient);
  const { emr } = useAppSelector((s) => s.patient);

  let ga =
    emr?.patient?.gestationalAge ||
    patient?.gestationalAge ||
    getWeeksAndDays(
      patient?.lastMenstruationDate || emr?.patient?.lastMenstruationDate,
    );
  let updatedAt = patient?.updatedAt;

  const gestationalAge = getUpdatedGestationalAge(ga, updatedAt, "short");

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.name}>{patient?.name}</Text>
        {/* <MaterialIcon name="edit" size={18} color="#0B6E27" /> */}
      </View>

      <Text style={styles.sub}>
        Husband name:{" "}
        <Text style={styles.value}>{patient?.husbandName || "-"}</Text>
        {"    "}Age: <Text style={styles.value}>{patient?.age || "-"}</Text>
      </Text>

      <Text style={styles.sub}>
        Phone: <Text style={styles.value}>{patient?.phoneNumber || "-"}</Text>
        {"    "}CNIC: <Text style={styles.value}>{patient?.cnic || "-"}</Text>
      </Text>
      <View style={styles.row}>
        <View style={[styles.card, { backgroundColor: colors.green.g90 }]}>
          <Text style={styles.label}>Gestational Age</Text>
          <Text style={styles.value}>{gestationalAge}</Text>
        </View>
        <View style={[styles.card, { backgroundColor: colors.green.g90 }]}>
          <Text style={styles.label}>Gravida Para Abortion</Text>
          <Text style={styles.value}>
            {" "}
            {emr?.obsHistory?.gravidaPara || "--"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PatientHeader;
