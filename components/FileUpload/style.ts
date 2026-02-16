import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#0D0D0D",
  },

  uploadButton: {
    borderWidth: 1,
    borderColor: "#0B6E27",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
  },

  disabled: {
    opacity: 0.5,
  },

  uploadText: {
    color: "#0B6E27",
    fontWeight: "600",
  },

  fileList: {
    marginTop: 12,
  },

  fileCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },

  fileInfo: {
    flexDirection: "row",
    gap: 12,
  },

  icon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  fileName: {
    fontSize: 14,
    fontWeight: "500",
  },

  fileSize: {
    fontSize: 12,
    color: "#777",
  },

  deleteText: {
    color: "#C62828",
    fontWeight: "500",
  },

  summaryBox: {
    marginTop: 8,
  },

  summaryText: {
    fontSize: 13,
    marginBottom: 4,
  },
});
