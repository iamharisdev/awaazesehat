import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

// import { useDeletePatientFileMutation } from "@/mutations/use-file-delete";
import { useAppDispatch, useAppSelector } from "@/store";
import { styles } from "./style";
import { updateVisit } from "@/features/patientSlice";

export interface FileItem {
  name: string;
  size: number;
  uri: string;
  isLocal?: boolean;
  file?: any;
  id?: string;
}

interface Props {
  id?: string;
  title: string;
  fileUri?: string;
  summary?: string;
  documents?: { url: string; id: string }[];
  onFilesChange?: (files: FileItem[]) => void;
  mode?: "single" | "multiple";
  disabled?: boolean;
}

const FileUploadSection: React.FC<Props> = ({
  id,
  title,
  fileUri,
  documents = [],
  summary = "",
  onFilesChange,
  mode = "multiple",
  disabled = false,
}) => {
  const dispatch = useAppDispatch();
  const diagnostic = useAppSelector(
    (s) => s.patient.visit.diagnostics.diagnostics,
  );

  const [files, setFiles] = useState<FileItem[]>([]);
  const [localSummary, setLocalSummary] = useState(summary);
  const [loading, setLoading] = useState(false);

//   const deleteMutation = useDeletePatientFileMutation();

  const isUploadDisabled = disabled || (mode === "single" && files.length >= 1);

  // Sync API files
  useEffect(() => {
    const remoteFiles: FileItem[] = documents.map((doc) => ({
      name: getFileNameFromUrl(doc.url),
      size: 0,
      uri: doc.url,
      isLocal: false,
      id: doc.id,
    }));

    setFiles((prev) => {
      const localFiles = prev.filter((f) => f.isLocal);
      return mergeFiles(remoteFiles, localFiles, mode);
    });
  }, [documents]);

  useEffect(() => {
    setLocalSummary(summary);
  }, [summary]);

  // ✅ Pick document
  const handlePickFile = async () => {
    if (disabled) return;

    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];

    const newFile: FileItem = {
      name: file.name,
      size: file.size || 0,
      uri: file.uri,
      isLocal: true,
      file,
    };

    const updated = mergeFiles(files, [newFile], mode);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  // ✅ Remove file
  const handleRemoveFile = async (file: FileItem) => {
    if (disabled || loading) return;

    setLoading(true);

    try {
      if (file.id) {
        await deleteMutation.mutateAsync({
          fileId: file.id,
        });
      }

      const updated = files.filter((f) => f.uri !== file.uri);

      setFiles(updated);
      onFilesChange?.(updated);

      const diagList = diagnostic || [];

      const updatedDiagnostics = diagList.map((d: any) => {
        if (d.uri === fileUri) {
          return { ...d, uri: "" };
        }
        return d;
      });

      dispatch(
        updateVisit({
          step: "diagnostics",
          key: "diagnostics",
          value: updatedDiagnostics,
        }),
      );

      if (updated.length === 0) {
        setLocalSummary("");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to delete file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      {/* Upload Button */}
      {(!files.length || mode === "multiple") && (
        <TouchableOpacity
          onPress={handlePickFile}
          disabled={isUploadDisabled}
          style={[styles.uploadButton, isUploadDisabled && styles.disabled]}
        >
          <Text style={styles.uploadText}>
            {files.length ? "Replace file" : "Upload report"}
          </Text>
        </TouchableOpacity>
      )}

      {/* File List */}
      {files.length > 0 && (
        <View style={styles.fileList}>
          {files.map((file) => (
            <View key={file.uri} style={styles.fileCard}>
              <View style={styles.fileInfo}>
                {/* <Image
                  source={require("@/assets/pdf.png")}
                  style={styles.icon}
                /> */}

                <View>
                  <Text style={styles.fileName}>{file.name}</Text>

                  <Text style={styles.fileSize}>
                    {file.size
                      ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                      : "From API"}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                // onPress={() => handleRemoveFile(file)}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" />
                ) : (
                  <Text style={styles.deleteText}>Delete</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Summary */}
      {localSummary ? (
        <View style={styles.summaryBox}>
          {localSummary.split("\n").map((line, i) => (
            <Text key={i} style={styles.summaryText}>
              • {line}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default FileUploadSection;

// ===== Helpers =====

const getFileNameFromUrl = (url: string) => {
  try {
    return decodeURIComponent(url.split("/").pop() || "Document");
  } catch {
    return "Document";
  }
};

const mergeFiles = (
  a: FileItem[],
  b: FileItem[],
  mode: "single" | "multiple",
) => {
  if (mode === "single") {
    if (b.length > 0) return [b[b.length - 1]];
    return a.length ? [a[0]] : [];
  }

  const map = new Map<string, FileItem>();
  [...a, ...b].forEach((f) => map.set(f.uri, f));

  return Array.from(map.values());
};
