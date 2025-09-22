import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToWp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },

  subContainer: {
    flex:1,
    justifyContent:'center',
    alignSelf: "center",
    alignItems:'center'
  },

  headingStyle: {
    fontFamily: "Medium",
    fontWeight: 500,
    fontSize: normalizeFont(16),
    color: colors.black.b05,
    marginVertical: hp(1),
    textAlign:'center'
  },
  headingLight: {
    fontFamily: "Regular",
    fontWeight: 400,
    fontSize: normalizeFont(16),
    color: colors.black.b40,
    marginBottom: hp(3),
    textAlign:'center'
  },
});
