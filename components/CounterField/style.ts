import { colors } from "@/utils/colors";
import { hp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1),
  },
  title: { fontFamily: "Regular", fontSize: 14, color: colors.black.b05 },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.black.b80,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: colors.white.w1,
  },
  button: {
    backgroundColor: colors.white.w1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  leftButton: {
    borderRightWidth: 1,
    borderColor: colors.black.b80,
  },
  rightButton: {
    borderLeftWidth: 1,
    borderColor: colors.black.b80,
  },
  valueBox: {
    minWidth: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white.w1,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black.b10,
  },
});
