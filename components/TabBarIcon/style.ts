import { colors } from "@/utils/colors";
import { hp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const MakeStyles = (focused: boolean) =>
  StyleSheet.create({
  container: {
    backgroundColor: focused ? colors.green.g80 : "transparent",
    width: wp(15),
    height:hp(3.5),
    borderRadius: wp(10),
    alignItems: "center",
    justifyContent: "center",
   
  },
});
