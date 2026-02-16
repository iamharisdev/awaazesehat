import { useAppSelector } from "@/store";
import React, { useEffect, useMemo } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { styles } from "./style";
import { useDispatch } from "react-redux";
import { updateVisit } from "@/features/patientSlice";
import { FileUpload } from "@/components";

const Diagnostics: React.FC = () => {
  const dispatch = useDispatch();
  const diagnostics = useAppSelector(
    (s) => s.patient.visit.diagnostics.diagnostics,
  );
  const diagnosticsArray = useAppSelector((s) => {
    const d = s.patient.visit.diagnostics;
    if (!d) return [];
    if (Array.isArray(d)) return d;
    if (Array.isArray(d.diagnostics)) return d.diagnostics;
    return [];
  });

  const diagnosticsCount = useAppSelector((s) => {
    const d = s.patient.visit.diagnostics;
    if (!d) return 0;
    if (Array.isArray(d)) return d.length;
    return Array.isArray(d.diagnostics) ? d.diagnostics.length : 0;
  });

  const patientId = useAppSelector((s) => s.patient?.currentPatient?.id);

  const editable = false;

  // const {
  //   mutate: getAdvisedTests,
  //   data,
  //   status,
  // } = useGetAdvisedTestsMutation();

  // const { mutate: uploadPatientFile, isPending: isUploading } =
  //   useUploadPatientFileMutation();

  // ✅ Fetch advised tests once
  // useEffect(() => {
  //   if (!patientId) return;
  //   if (diagnosticsCount > 0) return;

  //   getAdvisedTests(patientId, {
  //     onSuccess: (res) => {
  //       const advisedTests = res?.advisedTests || [];

  //       Store.setState((draft: any) => {
  //         const hasExisting =
  //           draft.visitSteps?.diagnostics &&
  //           Array.isArray(draft.visitSteps.diagnostics?.diagnostics) &&
  //           draft.visitSteps.diagnostics.diagnostics.length > 0;

  //         if (!hasExisting) {
  //           draft.visitSteps.diagnostics = {
  //             diagnostics: advisedTests.map((test: any) => ({
  //               name:
  //                 test?.testname ??
  //                 test?.testName ??
  //                 test?.name ??
  //                 String(test ?? ""),
  //               uri: "",
  //             })),
  //           };
  //         }
  //       });
  //     },
  //   });
  // }, [patientId, diagnosticsCount]);

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
  const handleFileUpload = (name: string, file: any) => {
    if (!file || !patientId) return;

    uploadPatientFile(
      {
        patientId,
        file,
        description: `${name} Report`,
      },
      {
        onSuccess: (res) => {
          updateDiagnostic(name, res);
        },
      },
    );
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
      {/* {isUploading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Uploading report...</Text>
        </View>
      )} */}

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
                // disabled={editable || isUploading}
                // onFilesChange={(files: any[]) => {
                //   const fileItem = files?.[0];
                //   if (!fileItem) return;

                //   if (fileItem?.isLocal && fileItem?.file) {
                //     handleFileUpload(test.name, fileItem.file);
                //   }
                // }}
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
