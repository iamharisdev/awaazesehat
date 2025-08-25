import { colors } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const MakeStyles = (check: string) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: check == "auth" ? colors.white.w2 : colors.green.g20,
    },
  });
