import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/store";
import { styles } from "./style";

import Prescription from "../Prescription";
import { EXAMINATION_FIELDS } from "../examinationFields";



interface Props {
  onClose: () => void;
  visitNumber: number;
  visitIds: string[];
  currentIndex: number;
  onNextVisit: () => void;
  editAble: () => void;
}

const ViewVisit: React.FC<Props> = ({
  onClose,
  visitNumber,
  visitIds,
  currentIndex,
  onNextVisit,
  editAble,
}) => {
  const visit = useAppSelector((s) => s.patient.visit);
  const [showPrescription, setShowPrescription] = useState(false);

  const show = (v: any) => v !== null && v !== undefined && v !== "";

  const isEditable = (): boolean => {
    if (!visit?.createdAt) return false;
    const createdAt = new Date(visit.createdAt).getTime();
    const now = new Date().getTime();
    return now - createdAt < 24 * 60 * 60 * 1000;
  };

  const examination = visit?.examination;

  const hasAnyExaminationField = examination
    ? EXAMINATION_FIELDS.some(({ key }) => {
        const value = examination[key];
        return show(value);
      })
    : false;

  const medication = visit?.proposedPlan?.medication;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Visit {visitNumber}</Text>

          {isEditable() && (
            <TouchableOpacity style={styles.editButton} onPress={editAble}>
              <Text style={styles.editText}>Edit</Text>
              <Ionicons name="create-outline" size={16} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={22} />
        </TouchableOpacity>
      </View>

      {/* CONTENT */}

      {/* VITALS */}
      {visit?.vitals &&
        Object.entries(visit.vitals)
          .filter(([key]) => !["id", "visitId"].includes(key))
          .map(([key, value]) =>
            show(value) ? (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{key}</Text>
                <Text style={styles.value}>
                  {key === "visitDate"
                    ? new Date(value as string).toLocaleDateString("en-GB")
                    : String(value)}
                </Text>
              </View>
            ) : null,
          )}

      <Text style={styles.sectionTitle}>General physical examination</Text>

      {!hasAnyExaminationField && visit?.examination?.physicalFindings && (
        <Text style={styles.value}>{visit.examination.physicalFindings}</Text>
      )}

      {visit?.examination &&
        EXAMINATION_FIELDS.map(({ key, label }) => {
          const value = visit.examination?.[key];

          if (!show(value)) return null;

          return (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{String(value)}</Text>
            </View>
          );
        })}

      {/* Diagnostics */}
      {visit?.diagnostics?.diagnostics?.length > 0 &&
        visit.diagnostics.diagnostics.map((item: any, index: number) =>
          item.summary ? (
            <View key={index} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {item.name} report summary
              </Text>
              {item.summary.split("\n").map((line: string, i: number) => (
                <Text key={i} style={styles.bullet}>
                  • {line}
                </Text>
              ))}
            </View>
          ) : null,
        )}

      {/* Medications */}

      {medication && medication.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advised medications</Text>
          <Text style={styles.value}>{medication}</Text>
        </View>
      )}

      {/* FOOTER */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => setShowPrescription(true)}
        >
          <Ionicons name="download-outline" size={18} />
          <Text style={styles.footerText}>Download prescription</Text>
        </TouchableOpacity>

        {currentIndex < visitIds.length - 1 && (
          <TouchableOpacity style={styles.nextButton} onPress={onNextVisit}>
            <Text style={styles.nextText}>View next visit</Text>
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <Prescription
        visible={showPrescription}
        onClose={() => setShowPrescription(false)}
        visitNumber={visitNumber}
      />
    </View>
  );
};

export default ViewVisit;
