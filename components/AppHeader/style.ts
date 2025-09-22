import { colors } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  title:{
    fontFamily:"Medium",
    fontWeight:"500",
    fontSize:18,
    color:colors.black.b05
  },
  btnStyle: {
    backgroundColor: colors.white.w1,
    borderColor: colors.black.b80,
    borderWidth: 1,
  },
  space: { width: 35 },
});
