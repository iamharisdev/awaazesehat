import React from "react";
import { styles } from "./style";
import { Text, View } from "react-native";
import { colors } from "@/utils/colors";

type Status = "Critical" | "Mild" | "Normal";
interface Props {
  icon?: any;
  title?: string;
  status?: Status;
  time?: string;
  inactive?: boolean;
  showConnector?: boolean;
}

const SymptomItem = ({
  icon,
  title,
  status,
  time,
  inactive = false,
  showConnector = true,
}: Props) => {
  const badgeColor =
    status === "Critical"
      ? colors.red.r70
      : status === "Mild"
      ? colors.orange.o70
      : colors.green.g70;

  const badgeTitleColor =
    status === "Critical"
      ? colors.red.r40
      : status === "Mild"
      ? colors.orange.o40
      : colors.green.g40;

  const badgeBgColor =
    status === "Critical"
      ? colors.red.r90
      : status === "Mild"
      ? colors.orange.o90
      : colors.green.g90;

  return (
    <View style={styles.row}>
      <View style={styles.timeline}>
        <Text style={styles.icon}>{icon}</Text>
        {showConnector && <View style={styles.connector} />}
      </View>

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.title, inactive && styles.inactiveTitle]}>
              {title}
            </Text>
            <View
              style={[
                styles.badge,
                { borderColor: badgeColor, backgroundColor: badgeBgColor },
              ]}
            >
              <Text style={[styles.badgeText, { color: badgeTitleColor }]}>
                {status}
              </Text>
            </View>
          </View>
          <Text style={[styles.time, inactive && styles.inactiveTime]}>
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SymptomItem;
