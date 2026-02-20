import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0D0D0D",
  },
  subtitle: {
    fontSize: 14,
    color: "#707070",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#F2F2F2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  bold: {
    fontWeight: "600",
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: "#0D0D0D",
    marginBottom: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  printBtn: {
    backgroundColor: "#0B6E27",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  printText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
  },
  closeBtn: {
    backgroundColor: "#E0E0E0",
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  closeText: {
    textAlign: "center",
    fontWeight: "600",
  },
});