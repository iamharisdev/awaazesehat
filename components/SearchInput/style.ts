import { colors } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white.w2,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: colors.black.b80,
    marginTop:10
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: colors.black.b40,
    fontSize:16,
    fontFamily: "Regular",
  },
});
