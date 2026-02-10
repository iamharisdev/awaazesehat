import { colors } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Medium",
    color: colors.black.b05,
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: "#8A8A8A",
    fontFamily: "Regular",
    marginTop: 2,
  },
  value: {
    color: "#0D0D0D",
  },
  row: {
    flexDirection: "row",

    gap: 12,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontSize: 12,
    color: colors.black.b40,
    fontFamily: "Regular",
  },
});
