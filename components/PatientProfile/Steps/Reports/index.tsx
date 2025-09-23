import { Icons } from "@/assets/svgs";
import Button from "@/components/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import StepItem from "../../StepItem";
import { styles } from "./style";

const Reports = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text style={styles.desc}>
        {t("Upload reports here with a short voice note for your patient.")}
      </Text>
      <Button
        title={t("Upload report")}
        icon={<Icons.upload />}
        textStyle={styles.textStyle}
        style={styles.buttonContainer}
      />
      <View style={styles.documentContainer}>
        <StepItem title={"Document name"} icon={<Icons.pdf />} />
      </View>
    </View>
  );
};

export default Reports;
