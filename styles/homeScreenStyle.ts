import { colors } from "@/utils/colors";
import { hp, normalizeFont, pxToWp, wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(5),
  },

  subContainer: {
    height: wp(200),
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },

  headingStyle: {
    fontFamily: "Medium",
    fontWeight: 500,
    fontSize: normalizeFont(16),
    color: colors.black.b05,
    marginVertical: hp(1),
    textAlign: "center",
  },
  headingLight: {
    fontFamily: "Regular",
    fontWeight: 400,
    fontSize: normalizeFont(16),
    color: colors.black.b40,
    marginBottom: hp(3),
    textAlign: "center",
  },
  fabContainer: {
    position: "absolute",
    bottom: 30,
    right: 20,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor:colors.green.g20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
