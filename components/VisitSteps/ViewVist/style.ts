import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0D0D0D",
  },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B6E27",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  editText: {
    color: "#fff",
    marginRight: 6,
    fontWeight: "600",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
    color: "#0D0D0D",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    color: "#0D0D0D",
    flex: 1,
  },

  value: {
    fontSize: 14,
    color: "#707070",
    flex: 1,
    textAlign: "right",
  },

  section: {
    marginTop: 12,
  },

  bullet: {
    fontSize: 14,
    color: "#707070",
    marginBottom: 4,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderTopWidth: 1,

    borderColor: "#E5E5E5",
  },

  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  footerText: {
    fontSize: 14,
    color: "#0D0D0D",
  },

  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B6E27",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  nextText: {
    color: "#FFFFFF",
    marginRight: 6,
    fontWeight: "600",
  },
});
