import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface RiskItemProps {
  icon?: React.ReactNode;   // optional, you can pass SVG/Icons
  title: string;
  badge: string;
  badgeType: "critical" | "mild" | "normal";
  description: string;
  showDivider?: boolean;
}

const RiskItem: React.FC<RiskItemProps> = ({ icon, title, badge, badgeType, description, showDivider }) => {
  return (
    <View>
      <View style={styles.row}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          {icon}
        </View>

        {/* Text content */}
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <View style={[styles.badge, styles[badgeType]]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        </View>

        {/* Description / time */}
        <Text style={styles.desc}>{description}</Text>
      </View>

      {/* Divider */}
      {showDivider && <View style={styles.divider} />}
    </View>
  );
};

export default RiskItem;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconContainer: {
    width: 20,
    alignItems: "center",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
    color: "#fff",
  },
  critical: { backgroundColor: "#D9534F" },
  mild: { backgroundColor: "#F0AD4E" },
  normal: { backgroundColor: "#5CB85C" },
  desc: {
    fontSize: 12,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 20,
  },
});
