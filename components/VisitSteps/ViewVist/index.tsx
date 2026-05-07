import React, { useState } from "react";
import { Linking, Pressable, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppSelector } from "@/store";
import { styles } from "./style";

import Prescription from "../Prescription";
import { EXAMINATION_FIELDS } from "../examinationFields";
import type { AdvisedTest, AdvisedTestReport } from "@/features/patientSlice";

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
    const createdAtRaw =
      visit?.createdAt ||
      (visit?.vitals as any)?.createdAt ||
      (visit as any)?.visitDate;
    if (!createdAtRaw) return false;
    const createdAt = new Date(createdAtRaw).getTime();
    if (isNaN(createdAt)) return false;
    const now = new Date().getTime();
    return now - createdAt < 24 * 60 * 60 * 1000;
  };

  const examination = visit?.examination;

  const hasAnyExaminationField = examination
    ? EXAMINATION_FIELDS.some(({ key }) => {
        const value = (examination as any)[key];
        return show(value);
      })
    : false;

  const advisedTests: AdvisedTest[] = (visit as any)?.advisedTests ?? [];
  const hasAdvisedTests = Array.isArray(advisedTests) && advisedTests.length > 0;
  const legacyDiagnostics =
    visit?.diagnostics?.diagnostics &&
    Array.isArray(visit.diagnostics.diagnostics)
      ? visit.diagnostics.diagnostics
      : [];

  const medication = visit?.proposedPlan?.medication;

  const renderTypeIcon = (type?: string) => {
    const isImaging = type === "imaging";
    return (
      <Ionicons
        name={isImaging ? "image-outline" : "flask-outline"}
        size={16}
        color={isImaging ? "#9333EA" : "#2563EB"}
      />
    );
  };

  const renderReport = (report: AdvisedTestReport) => {
    const summaryLines = report.summary
      ? report.summary.split("\n").filter((l) => l.trim())
      : [];
    return (
      <View key={report.id} style={{ paddingLeft: 22, gap: 4 }}>
        <Pressable
          onPress={() => report.fileUrl && Linking.openURL(report.fileUrl)}
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <Ionicons name="document-text-outline" size={14} color="#0B6E27" />
          <Text
            style={{
              color: "#0B6E27",
              textDecorationLine: "underline",
              fontSize: 13,
            }}
            numberOfLines={1}
          >
            {report.fileName}
          </Text>
        </Pressable>
        {summaryLines.map((line, i) => (
          <Text key={i} style={styles.bullet}>
            • {line.trim()}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
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

      {/* VITALS */}
      {visit?.vitals && (
        <>
          {[
            { key: "visitDate", label: "Visit date", isDate: true },
            { key: "presentingComplaint", label: "Presenting complaint" },
            { key: "bloodPressure", label: "Blood pressure (mmHg)" },
            { key: "pulseRate", label: "Pulse rate (bpm)" },
            { key: "temperature", label: "Temperature (°C)" },
            {
              key: "respiratoryRate",
              label: "Respiratory rate (breaths/min)",
            },
            { key: "weight", label: "Weight (kg)" },
          ].map(({ key, label, isDate }) => {
            const value = (visit.vitals as any)?.[key];
            if (!show(value)) return null;
            return (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>
                  {isDate
                    ? new Date(value as string).toLocaleDateString("en-GB")
                    : String(value)}
                </Text>
              </View>
            );
          })}
        </>
      )}

      <Text style={styles.sectionTitle}>General physical examination</Text>

      {!hasAnyExaminationField && visit?.examination?.physicalFindings && (
        <Text style={styles.value}>{visit.examination.physicalFindings}</Text>
      )}

      {visit?.examination &&
        EXAMINATION_FIELDS.map(({ key, label }) => {
          const value = (visit.examination as any)?.[key];

          if (!show(value)) return null;

          return (
            <View key={key} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{String(value)}</Text>
            </View>
          );
        })}

      {/* Tests & Reports — prefer advisedTests, fallback to legacy diagnostics */}
      {hasAdvisedTests && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tests & Reports</Text>
          {advisedTests.map((test) => (
            <View
              key={test.id}
              style={{
                borderWidth: 1,
                borderColor: "#E0E0E0",
                borderRadius: 8,
                padding: 10,
                marginBottom: 10,
                gap: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 6,
                }}
              >
                {renderTypeIcon(test.testType)}
                <Text
                  style={{ fontSize: 14, fontWeight: "500", color: "#0D0D0D", flex: 1 }}
                  numberOfLines={2}
                >
                  {test.testName}
                </Text>
                <View
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                    backgroundColor:
                      test.testType === "imaging" ? "#FAF5FF" : "#EFF6FF",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      color: test.testType === "imaging" ? "#7E22CE" : "#1D4ED8",
                    }}
                  >
                    {test.testType === "imaging" ? "Imaging" : "Lab"}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 4,
                    backgroundColor:
                      test.status === "submitted" ? "#ECFDF5" : "#F2F2F2",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      color: test.status === "submitted" ? "#047857" : "#707070",
                    }}
                  >
                    {test.status === "submitted" ? "Submitted" : "Pending"}
                  </Text>
                </View>
              </View>
              {test.reports && test.reports.length > 0 ? (
                test.reports.map(renderReport)
              ) : (
                <Text
                  style={{
                    fontSize: 12,
                    color: "#707070",
                    fontStyle: "italic",
                    paddingLeft: 22,
                  }}
                >
                  No report uploaded.
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {!hasAdvisedTests &&
        legacyDiagnostics.length > 0 &&
        legacyDiagnostics.map((item: any, index: number) =>
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

      {medication && medication.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advised medications</Text>
          <Text style={styles.value}>{medication}</Text>
        </View>
      )}

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
