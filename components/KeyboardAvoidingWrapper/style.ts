import { colors } from "@/utils/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Allow the wrapper to expand to fill its parent (card) so ScrollView can scroll
  container: { flex: 1 },
  contentContainerStyle: { flexGrow: 1 },
   subContainer: { flex: 1, backgroundColor: colors.white.w2 },
});
