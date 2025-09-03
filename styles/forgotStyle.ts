import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToWp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white.w2,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  heading: {
    fontFamily: "Medium",
    fontWeight: 500,
    fontSize: normalizeFont(23),
    color: colors.black.b05,
    marginVertical: hp(1),
  },
  headingLight: {
    fontFamily: "Regular",
    fontWeight: 500,
    fontSize: normalizeFont(14),
    color: colors.black.b40,
    marginBottom: hp(3),
  },
  footerText: {
    color: colors.black.b05,
    fontFamily: "Regular",
    fontWeight: 500,
    fontSize: normalizeFont(13),
    textAlign: "center",
    marginBottom: hp(3),
  },
  underLineText: {
    textDecorationLine: "underline",
    fontFamily: "Medium",
    fontWeight: 400,
  },
  btnViewStyle: { marginBottom: hp(2),  width: wp(90)},

  footerView: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: hp(2), // keeps a little spacing from bottom
    alignItems: "center",
  },
});
