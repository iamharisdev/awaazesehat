import { colors } from "@/utils/colors";
import { wp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.black.b90,
    borderRadius: 12,
    shadowColor: colors.black.b05,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
  },
  playerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  seekContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
    alignItems:'center'
  },
  slider: {
    width: wp(60),
    height: 20,
  },

  timeText: {
    fontSize: 14,
    color: colors.black.b40,
    marginRight:10,
    width:wp(10)
  },
});
