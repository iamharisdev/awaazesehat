import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToHp, pxToWp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  heading: {
    fontFamily: "Medium",
    fontWeight: 500,
    fontSize: normalizeFont(23),
    color: colors.black.b05,
    marginVertical: hp(2),
  },
  headingLight: {
    fontFamily: "Regular",
    fontWeight: 500,
    fontSize: normalizeFont(14),
    color: colors.black.b40,
    marginBottom: hp(5),
  },
  center:{alignSelf:'center'},

  email: {
    fontFamily: "Medium",
    color: colors.black.b10,
  },
  codeFieldRoot: { marginVertical: hp(3) },
  cell: {
    width: wp(pxToWp(56)),
    height: hp(pxToHp(56)),
    borderWidth: 1,
    borderColor: colors.black.b80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white.w1,
  },
  cellText: {
    fontSize: normalizeFont(16),
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },

  btnViewStyle: { marginBottom: hp(2), width: wp(pxToWp(380)) },

  absolute: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: hp(2), // keeps a little spacing from bottom
    alignItems: "center",
  },
});
