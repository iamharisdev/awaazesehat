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
    fontWeight: "400",
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
    justifyContent: "space-between",
  },
  inputStyle: {
    fontSize: normalizeFont(14),
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: colors.black.b80,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: hp(20),
    backgroundColor: colors.white.w1,
    position: "absolute",
    top: "100%", // directly below the field
    left: 0,
    right: 0,
    zIndex: 999, // ensures it stays above other UI
    elevation: 5, // Android shadow
  },
  noRecordText: {
    alignSelf: "center",
    color: colors.black.b70,
    marginVertical: hp(2),
  },
  itemRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
  },
  itemText: {
    color: colors.black.b10,
    fontSize: normalizeFont(14),
  },
  errorText: {
    marginTop: 4,
    color: colors.red.r40,
    fontSize: 12,
  },
});
