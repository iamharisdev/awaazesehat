import { colors } from "@/utils/colors";
import { hp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  progress: {
    fontSize: 14,
    color: colors.black.b40,
    backgroundColor: colors.black.b90,
    padding: 6,
    borderRadius: 6,
    width: wp(38),
    borderWidth: 1,
    borderColor: colors.black.b70,
    fontFamily: "Medium",
    fontWeight: "500",
  },
  desc: {
    fontSize: 14,
    color: colors.black.b40,
    marginVertical: 6,
    fontFamily: "Regular",
    fontWeight: "400",
  },
});
