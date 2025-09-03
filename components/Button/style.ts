import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToHp } from "@/utils/responsive";
import { Spacing } from "@/utils/spacing";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    height: hp(pxToHp(48)),
    flexDirection: "row",
    paddingVertical: Spacing.SmallMedium,
    paddingHorizontal: Spacing.Medium2,
    borderRadius: 8,
    alignItems: "center",
 
  },

  buttonText: {
    fontSize: normalizeFont(15),
    fontFamily:'Medium',
    fontWeight: "600",
    color:colors.white.w1
  },

});
