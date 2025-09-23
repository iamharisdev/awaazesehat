import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  Emr,
  FollowUpQuestion,
  KeyboardAvoidingWrapper,
  PatientHeader,
  PatientInfoCard,
  PatientRecord,
  Reports,
  SymptomItem,
} from "@/components";
import { TabSwitcher } from "@/components/PatientProfile/TabSwitcher";
import { styles } from "@/styles/patientDetailStyle";
import { Symptoms, tabSwitcher } from "@/utils/Json";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

export default function PatientDetail() {
  const [tab, setTab] = useState(0);
  const { t } = useTranslation();
  const router = useRouter();

  const restCount = Symptoms.length - 3;

  const tabRendering = () => {
    switch (tab) {
      case 0:
        return <PatientRecord />;
      case 1:
        return <FollowUpQuestion />;
      case 2:
        return <Reports />;
      case 3:
        return <Emr />;
      default:
        break;
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader title={t("Patient profile")} leftIcon={<Icons.left />} />
      <View style={styles.subContainer}>
        <PatientHeader
          name="Fatima Ahmed"
          age="25y/o"
          phone="0334-2233667"
          cnic="341011-2344889"
        />

        <PatientInfoCard ga="32 weeks, 4 days" edd="15 Dec 2025" />

        <View style={{ marginTop: 20 }}>
          {Symptoms.slice(0, 3).map((item, index) => (
            <SymptomItem
              key={index.toString()}
              {...item}
              showConnector={index !== Symptoms.length - 1}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.moreContainer}
          onPress={() => router.push("redFlag")}
        >
          <Icons.circlePlus />
          <Text style={styles.moreTextStyle}>
            {restCount + " " + t("more red flags")}
          </Text>
        </TouchableOpacity>

        <TabSwitcher tabs={tabSwitcher} activeIndex={tab} onChange={setTab} />
        <View style={styles.cardStyle}>{tabRendering()}</View>
      </View>
    </KeyboardAvoidingWrapper>
  );
}
