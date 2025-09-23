import { colors } from "@/utils/colors";
import { normalizeFont } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  title: {
    fontFamily: "Regular",
    fontWeight: 400,
    fontSize: 14,
    color: colors.black.b05,
    marginBottom: 12,
  },
  optionsWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    marginBottom: 8,
    flex: 1,
  },
  circle: {
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colors.black.b70,
    marginRight: 6,
  },
  circleSelected: {
    borderWidth: 6,
    borderColor: colors.green.g20,
  },
  label: {
    fontSize: 16,
    fontFamily: "Regular",
    fontWeight: 400,
    color: colors.black.b05,
  },
});
