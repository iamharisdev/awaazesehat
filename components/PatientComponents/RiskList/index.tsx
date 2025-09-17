import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import RiskItem from "../RiskItem";


const riskData = [
  { title: "Bleeding", badge: "Critical", badgeType: "critical", description: "10h ago" },
  { title: "High blood pressure", badge: "Mild", badgeType: "mild", description: "from start" },
  { title: "Back pain", badge: "Normal", badgeType: "normal", description: "since 1st trimester" },
];

const RiskList: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      {riskData.map((item, index) => (
        <RiskItem
          key={index}
          title={item.title}
          badge={item.badge}
          badgeType={item.badgeType as "critical" | "mild" | "normal"}
          description={item.description}
          showDivider={index !== riskData.length - 1}
        />
      ))}

      {/* Expand more */}
      {!expanded && (
        <TouchableOpacity onPress={() => setExpanded(true)} style={styles.moreWrapper}>
          <Text style={styles.moreText}>4 more red flags</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RiskList;

const styles = StyleSheet.create({
  moreWrapper: {
    paddingVertical: 8,
  },
  moreText: {
    fontSize: 14,
    color: "#007BFF",
    marginLeft: 20,
  },
});
