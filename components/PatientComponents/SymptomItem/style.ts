import { colors } from "@/utils/colors";
import { hp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    height: hp(6),
    marginBottom: -2,
  },
  timeline: {
    alignItems: "center",
    width: 30,
  },
  icon: {
    fontSize: 18,
  },
  connector: {
    position: "absolute",
    top: 24,
    bottom: 0,
    width: 1,
    backgroundColor: colors.black.b80,
  },
  content: {
    flex: 1,
    paddingBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontFamily: "Regular",
    fontWeight: "400",
    color: colors.black.b05,
    marginRight: wp(5),
  },
  inactiveTitle: {
    color: colors.red.r20,
    textDecorationLine: "line-through",
  },
  badge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Medium",
  },
  time: {
    marginTop: 4,
    color: colors.red.r50,
    fontSize: 13,
  },
  inactiveTime: {
    color: colors.black.b05,
  },
});
