import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  topContainer: {
    alignItems: "center",

    padding: 16,
  },

  centeredEmpty: {
    alignItems: "center",
    justifyContent: "center",
    height: 120,
  },

  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#707070",
    marginBottom: 12,
  },

  addButton: {
    backgroundColor: "#0B6E27",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: "flex-start",
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 6,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#444",
  },

  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },

  listContainer: {
    marginTop: 10,
  },

  visitCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },

  visitTitle: {
    fontSize: 16,
    color: "#0D0D0D",
  },

  visitDate: {
    fontSize: 13,
    color: "#8A8A8A",
    marginTop: 4,
  },
});
