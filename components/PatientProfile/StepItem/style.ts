import { colors } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.black.b90,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.black.b40,

    backgroundColor: colors.black.b90,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: colors.black.b05,
    fontFamily: "Regular",
    fontWeight: "400",
    marginLeft: 10,
  },
});
