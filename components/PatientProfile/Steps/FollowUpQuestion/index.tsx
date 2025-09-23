import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { styles } from "./style";
import { useTranslation } from "react-i18next";
import { Icons } from "@/assets/svgs";

const FollowUpQuestion = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text style={styles.progress}>{t("0/5 completed")}</Text>
      <Text style={styles.desc}>
        {t(
          "Follow-up questions help fill gaps in the patient’s record, capture ongoing concerns, and ensure you will have a complete picture before the visit."
        )}
      </Text>

      <TouchableOpacity style={styles.row}>
        <Text style={styles.textStyle}>{t("Start now")}</Text>
        <Icons.rightArrow/>
      </TouchableOpacity>
    </View>
  );
};

export default FollowUpQuestion;
