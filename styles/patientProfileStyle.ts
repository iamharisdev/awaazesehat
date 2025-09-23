import { colors } from "@/utils/colors";
import { hp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex:{ flex: 1 },
  footerContainer: { justifyContent: "flex-end" },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  stepText: {
    fontSize: 14,
    fontFamily: "Regular",
    fontWeight: 400,
    color: colors.black.b40,
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.green.g20,
    height: hp(5),
    width: wp(33),
    padding: 10,
    borderRadius: wp(3),
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Bold",
    fontWeight: 600,
    color: colors.white.w1,
  },
});
