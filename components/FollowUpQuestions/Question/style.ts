import { colors } from "@/utils/colors";
import { hp, pxToHp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { paddingHorizontal: wp(3) },
  title: {
    fontFamily: "Regular",
    fontWeight: "400",
    fontSize: 14,
    color: colors.black.b05,
    lineHeight: hp(2.5),
  },
  input: { height: hp(20) },
  buttonContainer: {
    backgroundColor: colors.white.w1,
    borderColor: colors.black.b80,
    borderWidth:1,
    flexDirection: "row-reverse",
    height: hp(pxToHp(48)),
  },
  buttonTitle: { color: colors.black.b05, marginRight: wp(3) },
});
