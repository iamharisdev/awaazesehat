import React from "react";
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useAppSelector } from "@/store";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { EXAMINATION_FIELDS } from "../examinationFields";
import { styles } from "./style";


interface Props {
  visible: boolean;
  onClose: () => void;
  visitNumber: number;
}

const Prescription: React.FC<Props> = ({
  visible,
  onClose,
  visitNumber,
}) => {
  const visit = useAppSelector((s) => s.patient.visit);
  const patient = useAppSelector((s) => s.patient.currentPatient);

  const show = (v: any) => v !== null && v !== undefined && v !== "";

  /* =========================
        PDF GENERATION
  ========================== */
  const handlePrint = async () => {
    const vitals = visit?.vitals || {};
    const exam = visit?.examination || {};
    const plan = visit?.proposedPlan || {};

    const examHtml = EXAMINATION_FIELDS.map(({ key, label }) =>
      show(exam[key])
        ? `<p><b>${label}:</b> ${exam[key]}</p>`
        : ""
    ).join("");

    const diagnosticsHtml =
      visit?.diagnostics?.diagnostics?.map(
        (item: any) => `
        <div>
          <p><b>${item.name} report summary</b></p>
          <ul>
            ${
              item.summary
                ? item.summary
                    .split("\n")
                    .map((line: string) => `<li>${line}</li>`)
                    .join("")
                : ""
            }
          </ul>
        </div>
      `
      ).join("") || "";

    const html = `
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h2>Prof. Fozia Umber Qureshi</h2>
          <p>Consultant obstetrician & gynaecologist infertility specialist</p>
          <hr/>

          <h3>Visit Info</h3>
          <p><b>Visit No:</b> ${visitNumber}</p>
          ${
            plan?.nextFollowUpTiming
              ? `<p><b>Next Follow-up:</b> ${new Date(
                  plan.nextFollowUpTiming
                ).toLocaleDateString("en-GB")}</p>`
              : ""
          }

          <h3>Patient Info</h3>
          <p><b>Name:</b> ${patient?.name || ""}</p>
          <p><b>CNIC:</b> ${patient?.cnic || ""}</p>
          <p><b>Phone:</b> ${patient?.phoneNumber || ""}</p>
          <p><b>Husband:</b> ${patient?.husbandName || ""}</p>
          <p><b>Age:</b> ${patient?.age || ""}</p>

          <hr/>
          <h3>Vitals</h3>
          <p><b>Visit Date:</b> ${
            vitals.visitDate
              ? new Date(vitals.visitDate).toLocaleDateString("en-GB")
              : ""
          }</p>
          <p><b>Presenting Complaint:</b> ${vitals.presentingComplaint || ""}</p>
          <p><b>Blood Pressure:</b> ${vitals.bloodPressure || ""}</p>
          <p><b>Pulse:</b> ${vitals.pulseRate || ""}</p>
          <p><b>Temperature:</b> ${vitals.temperature || ""}</p>
          <p><b>Respiratory Rate:</b> ${vitals.respiratoryRate || ""}</p>
          <p><b>Weight:</b> ${vitals.weight || ""}</p>

          <hr/>
          <h3>Examination</h3>
          ${examHtml}

          ${
            plan?.diagnosisPregnency
              ? `<hr/><h3>Diagnosis Pregnancy</h3><p>${plan.diagnosisPregnency}</p>`
              : ""
          }

          ${
            plan?.generalPlan
              ? `<hr/><h3>General Plan & Advice</h3><p>${plan.generalPlan}</p>`
              : ""
          }

          ${
            diagnosticsHtml
              ? `<hr/><h3>Diagnostics</h3>${diagnosticsHtml}`
              : ""
          }

          ${
            plan?.medication
              ? `<hr/><h3>Advised Medications</h3><p>${plan.medication}</p>`
              : ""
          }
        </body>
      </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

 
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* HEADER */}
          <Text style={styles.doctorName}>
            Prof. Fozia Umber Qureshi
          </Text>
          <Text style={styles.subtitle}>
            Consultant obstetrician & gynaecologist infertility specialist
          </Text>

          {/* VISIT & PATIENT INFO */}
          <View style={styles.card}>
            <Text style={styles.bold}>Visit no. {visitNumber}</Text>

            {show(visit?.proposedPlan?.nextFollowUpTiming) && (
              <Text style={styles.text}>
                Next Follow-up:{" "}
                {new Date(
                  visit!.proposedPlan!.nextFollowUpTiming!
                ).toLocaleDateString("en-GB")}
              </Text>
            )}

            <Text style={styles.text}>Patient: {patient?.name}</Text>
            <Text style={styles.text}>CNIC: {patient?.cnic}</Text>
            <Text style={styles.text}>Phone: {patient?.phoneNumber}</Text>
            <Text style={styles.text}>
              Husband: {patient?.husbandName}
            </Text>
            <Text style={styles.text}>Age: {patient?.age}</Text>
          </View>

          {/* VITALS */}
          {visit?.vitals && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Vitals</Text>

    {Object.entries(visit.vitals)
      .filter(([key]) => key !== "id" && key !== "visitId") // remove unwanted keys
      .sort(([a], [b]) => (a === "visitDate" ? -1 : b === "visitDate" ? 1 : 0)) // visitDate on top
      .map(([key, value]) => {
        if (!show(value)) return null;

        // Format label (camelCase -> Proper Case)
        const formattedLabel = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());

        // Format date if visitDate
        const formattedValue =
          key === "visitDate" && value
            ? new Date(value as string).toLocaleDateString("en-GB") // dd/mm/yyyy
            : (value as string);

        return (
          <Text key={key} style={styles.text}>
            {formattedLabel}: {formattedValue}
          </Text>
        );
      })}
  </View>
)}

          {/* EXAMINATION */}
          {visit?.examination && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Examination</Text>
              {EXAMINATION_FIELDS.map(
                ({ key, label }) =>
                  show(visit.examination[key]) && (
                    <Text key={key} style={styles.text}>
                      {label}: {visit.examination[key]}
                    </Text>
                  )
              )}
            </View>
          )}

          {/* DIAGNOSIS */}
          {show(visit?.proposedPlan?.diagnosisPregnency) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Diagnosis Pregnancy
              </Text>
              <Text style={styles.text}>
                {visit.proposedPlan.diagnosisPregnency}
              </Text>
            </View>
          )}

          {/* GENERAL PLAN */}
          {show(visit?.proposedPlan?.generalPlan) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                General Plan & Advice
              </Text>
              <Text style={styles.text}>
                {visit.proposedPlan.generalPlan}
              </Text>
            </View>
          )}

          {/* DIAGNOSTICS */}
          {visit?.diagnostics?.diagnostics?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Diagnostics</Text>
              {visit.diagnostics.diagnostics.map(
                (item: any, index: number) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={styles.bold}>
                      {item.name} report summary
                    </Text>
                    {item.summary
                      ?.split("\n")
                      .map((line: string, i: number) => (
                        <Text key={i} style={styles.text}>
                          • {line}
                        </Text>
                      ))}
                  </View>
                )
              )}
            </View>
          )}

          {/* MEDICATION */}
          {show(visit?.proposedPlan?.medication) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Advised Medications
              </Text>
              <Text style={styles.text}>
                {visit.proposedPlan.medication}
              </Text>
            </View>
          )}
        </ScrollView>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.printBtn}
            onPress={handlePrint}
          >
            <Text style={styles.printText}>
              Print / Share PDF
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.closeBtn}
            onPress={onClose}
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Prescription;