import { Icons } from "@/assets/svgs";
import { TabBarIcon } from "@/components";
import { styles } from "@/styles/bottomTabStyle";
import { colors } from "@/utils/colors";
import { tabConfig } from "@/utils/Json";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarButton: (props) => (
          <TouchableOpacity activeOpacity={0} {...props} />
        ),
        tabBarActiveTintColor: colors.green.g80,
        tabBarInactiveTintColor: colors.black.b40,
      }}
      backBehavior="history"
    >
      {tabConfig.map((tab) => {
        const icon = Icons[tab.icon];
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: t(tab.title),
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused}>{icon()}</TabBarIcon>
              ),
            }}
          />
        );
      })}
    </Tabs>
  );
}
