import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store";
import { setTab } from "@/features/patientSlice";

interface TabSwitcherProps {
  tabs: string[];
  activeIndex: number;
 
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({
  tabs,
  activeIndex,

}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  return (
    <View style={styles.row}>
      {tabs.map((tab, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.tab, activeIndex === i && styles.active]}
          onPress={() => {
            dispatch(setTab(i));
          }}
        >
          <Text style={[styles.label, activeIndex === i && styles.activeStyle]}>
            {t(tab)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
