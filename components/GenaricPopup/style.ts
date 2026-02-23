import { colors } from "@/utils/colors";
import { hp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    paddingHorizontal: 20,
  },
  flex: {
    alignItems: "center",
    marginVertical: hp(3),
  },
  closeButton: {
    backgroundColor: "transparent",
    position: "absolute",
    top: -25,
    right: -10,
    zIndex: 1,
  },

  title: {
    fontFamily: "Medium",
    color: colors.black.b05,
    fontSize: 20,
    fontWeight: "600",

    textAlign: "center",
    width: wp(80),
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
    borderWidth: 1,
    borderColor: colors.black.b80,
  },

  link: {
    color: colors.black.b05,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  
  },
});
