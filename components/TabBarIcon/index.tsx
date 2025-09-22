import React from "react";
import { View } from "react-native";
import { MakeStyles } from "./style";

interface TabBarIconProps {
  focused: boolean;
  children: React.ReactNode;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ focused, children }) => {
  const styles = MakeStyles(focused);
  return <View style={styles.container}>{children}</View>;
};

export default TabBarIcon;
