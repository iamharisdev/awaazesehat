import { colors } from "@/utils/colors";
import { hp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  buttonContainer: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#0B6E27",
    backgroundColor: "#EEF6F0",
  },
  desc: {
    fontSize: 14,
    color: colors.black.b40,

    marginBottom: 12,
    fontFamily: "Regular",
    fontWeight: "400",
  },

  textStyle: {
    fontWeight: "600",
    fontFamily: "Bold",
    fontSize: 14,
    color: colors.green.g20,
    marginHorizontal: wp(3),
  },
  documentContainer: {
    marginTop: hp(2),
  },
  footerContainer: {
    justifyContent: "flex-end",
    // flex:1,
     marginBottom:hp(20)
   
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  stepText: {
    fontSize: 14,
    fontFamily: "Regular",
    fontWeight: 400,
    color: colors.black.b40,
  },
  buttonStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.green.g20,
    height: hp(5),
    maxWidth: wp(50),
    padding: 10,
    borderRadius: wp(3),
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Bold",
    fontWeight: 600,
    color: colors.white.w1,
  },
});
