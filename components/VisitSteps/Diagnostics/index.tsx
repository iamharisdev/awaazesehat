import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";

import AppLoader from "@/components/AppLoader";
import {
  useLazyLabTestsQuery,
  useUploadPatientFileMutation,
} from "@/services/modules/visit";
import { useAppSelector } from "@/store";
import type { AdvisedTest, AdvisedTestReport } from "@/features/patientSlice";
import { styles } from "./style";

interface Props {
  tests?: AdvisedTest[];
  setTests: React.Dispatch<React.SetStateAction<AdvisedTest[]>>;
  isEdit?: boolean;
}

const LabTests: React.FC<Props> = ({
  tests = [],
  setTests,
  isEdit = false,
}) => {
  const patientId = useAppSelector((s) => s.patient?.currentPatient?.id);

  const [getNotSubmittedTests, { isFetching }] = useLazyLabTestsQuery();
  const [uploadPatientFile] = useUploadPatientFileMutation();

  const [uploadingId, setUploadingId] = useState<string | null>(null);

  // Fetch not-submitted advised tests every time the screen is opened in create mode
  useEffect(() => {
    if (isEdit) return;
    if (!patientId) return;

    (async () => {
      try {
        const res = await getNotSubmittedTests({ patientId }).unwrap();
        const list = res?.advisedTests || [];
        setTests(
          list.map((t: any) => ({
            id: t.id,
            testName: t.testName,
            testType: t.testType,
            status: t.status,
            createdAt: "",
            reports: [],
          })),
        );
      } catch {
        // silent
      }
    })();
  }, [patientId, isEdit]);

  const pickFile = async (testId: string, testName: string) => {
    if (!patientId) return;

    const result = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/jpeg", "image/png", "image/jpg"],
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;
    const asset = result.assets?.[0];
    if (!asset) return;

    const file = {
      uri: asset.uri,
      name: asset.name,
      mimeType: asset.mimeType,
    };

    setUploadingId(testId);
    try {
      const res = await uploadPatientFile({
        patientId,
        file,
        description: `${testName} Report`,
        advisedTestId: testId,
      }).unwrap();

      const newReport: AdvisedTestReport = {
        id: res?.id,
        fileName: res?.fileName,
        fileType: res?.fileType,
        fileUrl: res?.fileUrl,
        summary: res?.summary,
        createdAt: res?.createdAt,
        updatedAt: res?.updatedAt,
      };

      setTests((prev) =>
        prev.map((t) =>
          t.id === testId
            ? { ...t, status: "submitted", reports: [...(t.reports ?? []), newReport] }
            : t,
        ),
      );
    } catch {
      // error already toasted via service onQueryStarted
    } finally {
      setUploadingId(null);
    }
  };

  const renderTypeBadge = (type?: string) => {
    const isImaging = type === "imaging";
    return (
      <View
        style={[
          styles.typeBadge,
          isImaging ? styles.imagingBadge : styles.labBadge,
        ]}
      >
        <Text
          style={[
            styles.typeBadgeText,
            isImaging ? styles.imagingBadgeText : styles.labBadgeText,
          ]}
        >
          {isImaging ? "Imaging" : "Lab"}
        </Text>
      </View>
    );
  };

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

  if (isFetching && tests.length === 0) {
    return <AppLoader fullScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Patient Lab Tests</Text>

        {tests.length === 0 ? (
          <Text style={styles.emptyText}>No lab tests available.</Text>
        ) : (
          tests.map((test) => {
            const isUploading = uploadingId === test.id;
            const reports = test.reports ?? [];
            const latestReport: AdvisedTestReport | undefined =
              reports[reports.length - 1];

            return (
              <View key={test.id} style={styles.testCard}>
                <View style={styles.testHeader}>
                  {renderTypeIcon(test.testType)}
                  <Text style={styles.testName} numberOfLines={2}>
                    {test.testName}
                  </Text>
                  {renderTypeBadge(test.testType)}
                  {test.status === "submitted" && (
                    <View style={styles.submittedBadge}>
                      <Text style={styles.submittedBadgeText}>Submitted</Text>
                    </View>
                  )}
                </View>

                {latestReport && (
                  <Pressable
                    onPress={() =>
                      latestReport.fileUrl &&
                      Linking.openURL(latestReport.fileUrl)
                    }
                    style={styles.reportLink}
                  >
                    <Ionicons
                      name="document-text-outline"
                      size={14}
                      color="#0B6E27"
                    />
                    <Text style={styles.reportLinkText} numberOfLines={1}>
                      {latestReport.fileName}
                    </Text>
                  </Pressable>
                )}

                <TouchableOpacity
                  onPress={() => pickFile(test.id, test.testName)}
                  disabled={isUploading}
                  style={[
                    styles.uploadBtn,
                    isUploading && styles.uploadBtnDisabled,
                  ]}
                >
                  {isUploading ? (
                    <ActivityIndicator size="small" color="#0B6E27" />
                  ) : (
                    <Ionicons
                      name="cloud-upload-outline"
                      size={14}
                      color="#0B6E27"
                    />
                  )}
                  <Text style={styles.uploadBtnText}>
                    {isUploading
                      ? "Uploading..."
                      : latestReport
                        ? "Replace report"
                        : "Upload report"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default LabTests;
