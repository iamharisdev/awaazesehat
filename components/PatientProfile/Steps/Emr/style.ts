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
  documentContainer:{
    marginTop:hp(2)
  }
});
