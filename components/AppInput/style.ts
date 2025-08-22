import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToHp, wp } from "@/utils/responsive";
import { Spacing } from "@/utils/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2),
  },
  title: {
    fontFamily: "Regular",
    fontWeight: 400,
    fontSize: normalizeFont(13),
    color: colors.black.b05,
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: colors.white.w1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.black.b80,
    borderRadius: 8,
    paddingHorizontal: Spacing.SmallMedium,
    height: hp(pxToHp(48)),
  },
  inputStyle:{
    width:wp(78),
  }
});
