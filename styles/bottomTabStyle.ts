import { colors } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.white.w2,
    borderTopWidth: 1,
    height: 60,
    elevation: 5,
  },
  tabBarLabelStyle: {
    fontSize: 12,
    fontFamily: "Medium",
    fontWeight: "500",
    color: colors.black.b40,
  },
});
