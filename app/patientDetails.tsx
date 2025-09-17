import React, { useState } from "react";
import { PatientHeader } from "@/components/PatientComponents/PatientHeader";
import { PatientInfoCard } from "@/components/PatientComponents/PatientInfoCard";
import RiskList, { RiskItem } from "@/components/PatientComponents/RiskList";
import { TabSwitcher } from "@/components/PatientComponents/TabSwitcher";
import { StepsList } from "@/components/PatientComponents/StepsList";
import { Icons } from "@/assets/svgs";
import { AppHeader, KeyboardAvoidingWrapper } from "@/components";
import { View } from "react-native";
import { styles } from "@/styles/patientDetailStyle";


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

       <RiskList />

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
