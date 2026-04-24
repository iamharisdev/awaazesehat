import { ActivityIndicator, Modal, View, StyleSheet } from "react-native";
import { useAppSelector } from "@/store";

const GlobalLoader = () => {
  const isLoading = useAppSelector((state: any) => {
    const queries = Object.values(state.api?.queries ?? {});
    const mutations = Object.values(state.api?.mutations ?? {});
    return (
      queries.some((q: any) => q?.status === "pending") ||
      mutations.some((m: any) => m?.status === "pending")
    );
  });

  if (!isLoading) return null;

  return (
    <Modal transparent animationType="none" visible={isLoading}>
      <View style={styles.overlay}>
        <View style={styles.box}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GlobalLoader;
