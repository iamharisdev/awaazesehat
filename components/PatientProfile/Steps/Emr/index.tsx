import { Icons } from "@/assets/svgs";
import Button from "@/components/Button";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

import { useTranslation } from "react-i18next";

const Emr = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text style={styles.desc}>
        {t(
          "Add visit details, prescriptions, and advice — all stored safely in the patient’s EMR."
        )}
      </Text>
      <Button
        title={t("Add Visit")}
        icon={<Icons.plus />}
        textStyle={styles.textStyle}
        style={styles.buttonContainer}
      />
    </View>
  );
};

export default Emr;
