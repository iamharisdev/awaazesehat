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
    marginVertical: hp(2),
  },
  headingLight: {
    fontFamily: "Regular",
    fontWeight: 500,
    fontSize: normalizeFont(14),
    color: colors.black.b40,
    marginBottom: hp(5),
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
  footerView: { position: "absolute", bottom: 10, alignSelf: "center" },
  btnViewStyle: { marginBottom: hp(2), width: wp(pxToWp(380)) },
});
