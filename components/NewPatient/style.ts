import { colors } from "@/utils/colors";
import { hp, pxToHp } from "@/utils/responsive";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  flex: { flex: 1 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 12,
    marginBottom: 20,
  },

  iconWrapper: {
    backgroundColor: "#F2F2F2",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },

  subtitle: {
    fontSize: 13,
    color: "#707070",
    marginTop: 2,
  },

  phoneWrapper: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.black.b80,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },
  codeBox: {
    backgroundColor: "#F2F2F2",
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    height: hp(pxToHp(48)),
    borderTopLeftRadius:8,
    borderBottomLeftRadius:8
  },
  codeText: {
    fontSize: 14,
    color: "#000",
  },

  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
  },
  btn: {
    marginTop: 20,
  },
});
