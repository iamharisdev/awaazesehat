import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 8,
  },

  disabled: {
    opacity: 0.6,
  },

  label: {
    fontSize: 14,
    color: "#0D0D0D",
    marginBottom: 4,
  },

  inputWrapper: {
    position: "relative",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    paddingRight: 48,
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },

  textarea: {
    textAlignVertical: "top",
  },

  micButton: {
    position: "absolute",
    right: 8,
    bottom: 0,
    transform: [{ translateY: -12 }],
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#0D0D0D",
    backgroundColor: "#FFFFFF",
  },

  micRecording: {
    backgroundColor: "#FEE2E2",
  },

  micIcon: {
    fontSize: 16,
  },

  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  loaderText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#374151",
  },
});
