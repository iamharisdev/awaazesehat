import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Activity = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.comingSoonText}>Coming Soon</Text>
    </View>
  );
};

export default Activity;

const styles = StyleSheet.create({
  comingSoonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
