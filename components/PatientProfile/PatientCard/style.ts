import { colors } from "@/utils/colors";
import { hp, normalizeFont } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.white.w1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black.b80,
    marginVertical: 6,
  },
  textContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: normalizeFont(16),
    fontWeight: "600",
    color: colors.black.b05,
    marginBottom: 2,
    fontFamily: "Medium",
  },
  ga: {
    fontFamily: "Regular",
    fontWeight:"400",
    fontSize: 14,
    color: colors.black.b50,
  },
});
