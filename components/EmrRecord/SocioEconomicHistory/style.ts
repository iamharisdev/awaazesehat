import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  /* ---------- Containers ---------- */

  formContainer: {
    width: "100%",
    gap: 16,
  },

  viewContainer: {
    width: "100%",
    gap: 12,
    paddingVertical: 4,
  },

  /* ---------- View Mode Rows ---------- */

  viewRow: {
    flexDirection: "row",
    minHeight: 28,
    alignItems: "flex-start",
  },

  viewLabel: {
    width: "50%",
    fontSize: 14,
    fontWeight: "400",
    color: "#0D0D0D",
  },

  viewValue: {
    width: "50%",
    fontSize: 14,
    fontWeight: "400",
    color: "#707070",
  },

  /* ---------- Empty State ---------- */

  emptyText: {
    fontSize: 13,
    color: "#9CA3AF", // gray-400
    fontStyle: "italic",
    paddingVertical: 6,
  },
});
