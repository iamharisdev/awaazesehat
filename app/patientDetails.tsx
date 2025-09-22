import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  KeyboardAvoidingWrapper,
  PatientHeader,
  PatientInfoCard,
  StepsList,
  SymptomItem,
} from "@/components";
import { TabSwitcher } from "@/components/PatientComponents/TabSwitcher";
import { styles } from "@/styles/patientDetailStyle";
import { Symptoms, tabSwitcher } from "@/utils/Json";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function PatientDetail() {
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader title="Patient profile" leftIcon={<Icons.left />} />
      <View style={styles.subContainer}>
        <PatientHeader
          name="Fatima Ahmed"
          age="25y/o"
          phone="0334-2233667"
          cnic="341011-2344889"
        />

        <PatientInfoCard ga="32 weeks, 4 days" edd="15 Dec 2025" />

        <View style={{ marginTop: 20 }}>
          {Symptoms.map((item, index) => (
            <SymptomItem
              key={index.toString()}
              {...item}
              showConnector={index !== Symptoms.length - 1}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.moreContainer}>
          <Icons.circlePlus />
          <Text style={styles.moreTextStyle}>{t("more red flags")}</Text>
        </TouchableOpacity>

        <TabSwitcher tabs={tabSwitcher} activeIndex={tab} onChange={setTab} />

        {tab === 0 && <StepsList />}
      </View>
    </KeyboardAvoidingWrapper>
  );
}
