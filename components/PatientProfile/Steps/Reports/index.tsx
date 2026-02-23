import { useGetAllReportsQuery } from "@/services/modules/report";
import { useAppSelector } from "@/store";
import React from "react";
import {
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useTranslation } from "react-i18next";
import AppLoader from "../../../AppLoader";
import { styles } from "./style";

interface Report {
  name: string;
  uri: string;
  createdAt?: string;
}

interface ReportSection {
  title: string;
  reports: Report[];
}

const Reports: React.FC = () => {
  const { t } = useTranslation();
  const currentPatient = useAppSelector(
    (state) => state.patient.currentPatient,
  );
  const patientId = currentPatient?.id;

  const { data, isLoading, error } = useGetAllReportsQuery(
    { id: patientId },
    { skip: !patientId },
  );

  const handleOpenReport = (uri: string) => {
    Linking.openURL(uri).catch((err) =>
      console.error("Error opening report:", err),
    );
  };

  // Loading Overlay
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingOverlay}>
          <AppLoader fullScreen />
          <Text style={styles.loadingText}>{t("Loading reports")}</Text>
        </View>
      </View>
    );
  }

  // Error State
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{t("Failed to load reports")}</Text>
        </View>
      </View>
    );
  }

  // Success State
  if (data) {
    const hasReports = data && data.length > 0;

    return (
      <View style={styles.container}>
        {/* Header Text */}
        {hasReports ? (
          <Text style={styles.headerText}>
            {t(
              "Upload new reports or review existing ones. Attach a short voice note for the patient, to explain findings or next steps.",
            )}
          </Text>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>
              {t("No reports has been uploaded yet")}
            </Text>
            <Text style={styles.emptyStateDescription}>
              {t(
                "You will be able to view patients lab tests & reports here. You can upload reports on patients behalf while recording a visit.",
              )}
            </Text>
          </View>
        )}

        {/* Sections */}
        <View style={styles.sectionsContainer}>
          {data?.map((section: ReportSection, sectionIdx: number) => (
            <View key={sectionIdx} style={styles.section}>
              {/* Section Title */}
              <Text style={styles.sectionTitle}>{section.title}</Text>

              {/* Reports Grid */}
              <View style={styles.reportsGrid}>
                {section.reports.map((report: Report, reportIdx: number) => (
                  <TouchableOpacity
                    key={reportIdx}
                    style={styles.reportCard}
                    onPress={() => handleOpenReport(report.uri)}
                    activeOpacity={0.7}
                  >
                    {/* PDF Icon Placeholder */}
                    <View style={styles.iconContainer}>
                      <Text style={styles.pdfIcon}>📄</Text>
                    </View>

                    {/* Report Info */}
                    <View style={styles.reportInfo}>
                      <Text style={styles.reportName} numberOfLines={1}>
                        {report.name}
                      </Text>

                      {report.createdAt && (
                        <Text style={styles.reportDate}>
                          {report.createdAt}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    );
  }

  return null;
};

export default Reports;
