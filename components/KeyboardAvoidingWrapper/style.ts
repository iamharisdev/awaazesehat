import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Allow the wrapper to expand to fill its parent (card) so ScrollView can scroll
  container: { flex: 1 },
  contentContainerStyle: { flexGrow: 1 },
  // subContainer uses flex to take available space inside ScrollView
  subContainer: { flex: 1, backgroundColor: "transparent" },
});
