import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/utils/colors";

interface TabSwitcherProps {
  tabs: string[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeIndex,
  onChange,
}) => {
  return (
    <View style={styles.row}>
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.tab, activeIndex === i && styles.active]}
          onPress={() => onChange(i)}
        >
          <Text
            style={[
              styles.label,
              activeIndex === i && { color: colors.green.g80, fontWeight: "600" },
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.black.b20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  active: {
    borderBottomWidth: 2,
    borderColor: colors.green.g80,
  },
  label: {
    fontSize: 14,
    color: colors.black.b60,
  },
});
