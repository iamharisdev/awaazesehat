import { colors } from "@/utils/colors";
import { wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.black.b90,
  },
  startBtn: {
  
    backgroundColor: "#0B6E27",
    textAlign: "center",
    paddingVertical: 4,
    paddingHorizontal:8,
    borderRadius: 8,
    color: "white",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.black.b40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black.b90,
  },
  greenCircle: { backgroundColor: "#0B6E27", borderColor: "#0B6E27" },
  title: {
    flex: 1,
    fontSize: 14,
    color: colors.black.b05,
    fontFamily: "Regular",
    fontWeight: "400",
    marginLeft: 10,
  },
});
