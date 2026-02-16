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

  item: {
    marginBottom: 14,
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 8,
    fontSize: 13,
    color: "#555",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  emptyText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
});
