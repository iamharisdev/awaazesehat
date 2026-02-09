import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    gap: 12, // same as space-y-3
  },
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
