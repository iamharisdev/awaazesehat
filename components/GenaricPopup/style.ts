import { colors } from "@/utils/colors";
import { hp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom:hp(3)
  },
  closeButton: {
    backgroundColor: "transparent",
    height: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  title: {
    fontFamily: "Medium",
    color: colors.black.b05,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "right",
    width: wp(70),
  },

  iconWrapper: {
    alignItems: "center",
    marginBottom: 16,
  },
  icon: { width: wp(6), height: hp(6) },

  description: {
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.black.b40,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  primaryBtn: {
    backgroundColor: colors.green.g20, // dark green
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  linkButton: {
    backgroundColor: "transparent",
  },

  link: {
    color: colors?.green?.g20,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
