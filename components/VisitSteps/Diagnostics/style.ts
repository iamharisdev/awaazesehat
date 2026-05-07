import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    padding: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#0D0D0D",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 24,
  },
  testCard: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    gap: 8,
  },
  testHeader: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  testName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0D0D0D",
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  labBadge: {
    backgroundColor: "#EFF6FF",
  },
  imagingBadge: {
    backgroundColor: "#FAF5FF",
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: "500",
  },
  labBadgeText: {
    color: "#1D4ED8",
  },
  imagingBadgeText: {
    color: "#7E22CE",
  },
  submittedBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#ECFDF5",
    marginLeft: "auto",
  },
  submittedBadgeText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#047857",
  },
  reportLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingLeft: 22,
  },
  reportLinkText: {
    fontSize: 12,
    color: "#0B6E27",
    textDecorationLine: "underline",
    flex: 1,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#0B6E27",
    alignSelf: "flex-start",
    marginLeft: 22,
  },
  uploadBtnDisabled: {
    opacity: 0.5,
    borderColor: "#BDBDBD",
  },
  uploadBtnText: {
    fontSize: 12,
    color: "#0B6E27",
    fontWeight: "500",
  },
});
