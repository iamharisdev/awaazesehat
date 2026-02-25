import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  comingSoonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
