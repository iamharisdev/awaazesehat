import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToWp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    paddingHorizontal: wp(5),
  },
  logo: {
    flex: 0.6,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: hp(3),
  },

  headingText: {
    flex: 0.1,
    color: colors.white,
    fontFamily: "Medium",
    fontWeight: 500,
    fontSize: normalizeFont(19),
    textAlign: "center",
    marginBottom: hp(2),
    width: wp(pxToWp(299)),
    alignSelf: "center",
  },

  footerText: {
    color: colors.white,
    fontFamily: "Regular",
    fontWeight: 500,
    fontSize: normalizeFont(13),
    textAlign: "center",
    marginBottom: hp(2),
    marginHorizontal: wp(3),
  },
  underLineText: {
    textDecorationLine: "underline",
    fontFamily: "Medium",
    fontWeight: 400,
  },
  btn1TextStyle: {
    color: colors.green.g20,
  },
  btn2TextStyle: {
    color: colors.white,
  },
  btn1ViewStyle: { backgroundColor: colors.white, marginBottom: hp(2) },
  btn2ViewStyle: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.white,
  },
});
