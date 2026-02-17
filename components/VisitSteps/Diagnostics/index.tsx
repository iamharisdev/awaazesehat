import FileUpload from "@/components/FileUpload";
import { updateVisit } from "@/features/patientSlice";
import {
  useLazyLabTestsQuery,
  useUploadPatientFileMutation
} from "@/services/modules/visit";
import { useAppSelector } from "@/store";
import { createSelector } from "@reduxjs/toolkit";
import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { styles } from "./style";

const selectDiagnostics = createSelector(
  (state: any) => state.patient.visit.diagnostics,
  (d) => {
    if (!d) return [];
    if (Array.isArray(d)) return d;
    if (Array.isArray(d.diagnostics)) return d.diagnostics;
    return [];
  },
);

const selectDiagnosticsCount = createSelector(
  selectDiagnostics,
  (d) => d.length,
);

const Diagnostics: React.FC = () => {
  const dispatch = useDispatch();

  const diagnostics = useAppSelector(
    (s) => s.patient.visit.diagnostics.diagnostics,
  );
  const diagnosticsArray = useAppSelector(selectDiagnostics);
  const diagnosticsCount = useAppSelector(selectDiagnosticsCount);
  const patientId = useAppSelector((s) => s.patient?.currentPatient?.id);

  const editable = false;

  const [getAdvisedTests, { data, status }] = useLazyLabTestsQuery();
  const [uploadPatientFile, { isLoading: isUploading }] =
    useUploadPatientFileMutation();



  // ✅ Fetch advised tests once

  useEffect(() => {
    if (!patientId) return;
    if (diagnosticsCount > 0) return;

    const fetchAdvisedTests = async () => {
      try {
        const res = await getAdvisedTests({ patientId }).unwrap();
        const advisedTests = res?.advisedTests || [];
        const diagnostics = advisedTests.map((test: any) => ({
          name:
            test?.testname ??
            test?.testName ??
            test?.name ??
            String(test ?? ""),
          uri: "",
        }));

        dispatch(
          updateVisit({
            step: "diagnostics",
            key: "diagnostics",
            value: diagnostics,
          }),
        );
      } catch (error) {
        console.log("Failed to fetch advised tests:", error);
      }
    };

    fetchAdvisedTests();
  }, [patientId, diagnosticsCount]);

  // ✅ Merge store + API states
  const testList = useMemo(() => {
    if (diagnosticsArray?.length > 0) {
      return diagnosticsArray.map((d: any) => ({
        id: d?.id,
        name: d?.name ?? d?.testname ?? d?.testName ?? String(d ?? ""),
        uri: d?.uri ?? "",
        summary: d?.summary,
        files: d?.uri
          ? [
              {
                id: d?.id,
                name: d?.name,
                uri: d?.uri,
                summary: d?.summary ?? "",
              },
            ]
          : [],
      }));
    }

    const advised = data?.advisedTests || [];
    return advised.map((t: any) => ({
      name: t?.testname ?? t?.testName ?? t?.name ?? String(t ?? ""),
      uri: "",
      files: [],
    }));
  }, [diagnosticsArray, data]);

  // ✅ Update diagnostic in store after upload
  const updateDiagnostic = (name: string, res: any) => {
    const fileUrl = res?.fileUrl;

    const existingList: any = diagnostics ?? [];

    const index = existingList.findIndex((d: any) => d?.name === name);

    let updatedDiagnostics: any;

    if (index !== -1) {
      updatedDiagnostics = existingList.map((item: any, i: number) =>
        i === index
          ? {
              ...item,
              id: res?.id,
              uri: fileUrl,
              summary: res?.summary,
            }
          : item,
      );
    } else {
      updatedDiagnostics = [
        ...existingList,
        {
          id: res?.id,
          name,
          uri: fileUrl,
          summary: res?.summary,
        },
      ];
    }

    dispatch(
      updateVisit({
        step: "diagnostics",
        key: "diagnostics",
        value: updatedDiagnostics,
      }),
    );
  };

  // ✅ Upload handler (React Native version expects local file object)
  const handleFileUpload = async (name: string, file: any) => {
    if (!file || !patientId) return;

    try {
      const res = await uploadPatientFile({
        patientId,
        file,
        description: `${name} Report`,
      }).unwrap();

      updateDiagnostic(name, res);
    } catch (error) {
      console.log("Upload failed:", error);
    }
  };

  // ✅ Loading advised tests
  if (status === "pending") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="small" />
        <Text style={styles.loadingText}>Loading advised tests...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Overlay Loader */}
      {isUploading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Uploading report...</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Patient Lab Tests</Text>

        {testList?.length > 0 ? (
          testList.map((test: any, index: number) => (
            <View key={index} style={styles.item}>
              <FileUpload
                title={test?.name}
                mode="single"
                documents={test?.files || []}
                summary={test?.summary || ""}
                id={test?.id || null}
                fileUri={test?.uri}
                disabled={editable || isUploading}
                onFilesChange={(files: any[]) => {
                  const fileItem = files?.[0];
                  if (!fileItem) return;

                  if (fileItem?.isLocal && fileItem?.file) {
                    handleFileUpload(test.name, fileItem.file);
                  }
                }}
              />
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No lab tests available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Diagnostics;
