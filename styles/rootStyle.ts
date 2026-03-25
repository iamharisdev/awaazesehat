import { colors } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const MakeStyles = (check: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        check === "startup" ? colors.green.g20 : colors.white.w1,
    },
  });
