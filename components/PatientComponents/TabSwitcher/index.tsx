import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

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
          <Text style={[styles.label, activeIndex === i && styles.activeStyle]}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
