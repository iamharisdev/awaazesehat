import React, { useState } from "react";
import { TabSwitcher } from "@/components/PatientComponents/TabSwitcher";
import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  KeyboardAvoidingWrapper,
  PatientHeader,
  PatientInfoCard,
  StepsList,
  SymptomItem,
} from "@/components";
import { View } from "react-native";
import { styles } from "@/styles/patientDetailStyle";

const data = [
  { icon: "🩸", title: "Bleeding", status: "Critical", time: "10h ago" },
  {
    icon: "🧡",
    title: "High blood pressure",
    status: "Mild",
    time: "from start",
  },
  {
    icon: "🌿",
    title: "Back pain",
    status: "Normal",
    time: "since 1st trimester",
  },
  { icon: "🩺", title: "Anemia", status: "Mild", time: "since 1st week" },
];

export default function PatientDetail() {
  const [tab, setTab] = useState(0);

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

        <View style={{marginTop:20}}>
          {data.map((item, index) => (
            <SymptomItem
              key={index.toString()}
              {...item}
              showConnector={index !== data.length - 1}
            />
          ))}
        </View>

        <TabSwitcher
          tabs={["Patient record", "Follow-up questions", "Reports", "EMR"]}
          activeIndex={tab}
          onChange={setTab}
        />

        {tab === 0 && <StepsList />}
      </View>
    </KeyboardAvoidingWrapper>
  );
}
