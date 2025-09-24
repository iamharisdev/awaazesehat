import { colors } from "@/utils/colors";
import { hp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(3),
  },
  closeButton: {
    backgroundColor: "transparent",
    height: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  title: {
    fontFamily: "Medium",
    color: colors.black.b05,
    fontSize: 20,
    fontWeight: "600",
    textAlign: "right",
    width: wp(70),
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: colors.black.b05,
  },
  saveBtn: {
    marginTop: 12,
    backgroundColor: colors.green.g90,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: {
    color: colors.white.w1,
    fontWeight: "bold",
  },
  multiSelect: {
    borderWidth: 1,
    borderColor: colors.black.b70,
    borderRadius: 4,
    padding: 5,
  },
});
