import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToWp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    paddingHorizontal: wp(3),
  },
  moreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: wp(2.5),
    marginBottom: hp(1),
  },
  moreTextStyle: {
    color: colors.black.b40,
    fontFamily: "Medium",
    fontWeight: "500",
    fontSize: 12,
    marginLeft: wp(3),
  },
});
