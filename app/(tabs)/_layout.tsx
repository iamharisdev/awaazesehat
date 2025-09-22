import { Icons } from "@/assets/svgs";
import { TabBarIcon } from "@/components";
import { styles } from "@/styles/bottomTabStyle";
import { colors } from "@/utils/colors";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  const { t } = useTranslation();


  const tabConfig = [
    { name: "index", title: t("Home"), icon: <Icons.home /> },
    { name: "search", title: t("Search"), icon: <Icons.search /> },
    { name: "patients", title: t("Patients"), icon: <Icons.patients /> },
    { name: "activity", title: t("Activity"), icon: <Icons.activity /> },
  ];

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
      {tabConfig.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused}>{tab.icon}</TabBarIcon>
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
