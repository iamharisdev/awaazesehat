import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppLoader,
  Emr,
  FollowUpQuestion,
  KeyboardAvoidingWrapper,
  PatientHeader,
  PatientInfoCard,
  Visit,
  Reports,
} from "@/components";
import { TabSwitcher } from "@/components/PatientProfile/TabSwitcher";
import { useListEMRsQuery } from "@/services/modules/emr";
import { useAppSelector } from "@/store";
import { styles } from "@/styles/patientDetailStyle";
import { Symptoms, tabSwitcher } from "@/utils/Json";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function PatientDetail() {
  const { t } = useTranslation();
  const router = useRouter();

  const patientState: any = useAppSelector((state) => state.patient);

  // Safe extraction
  const phoneNumber = patientState.currentPatient?.phoneNumber;
  const patient = patientState.emr?.patient;
  const obs = patientState?.emr?.obsHistory;

  // Fetch EMRs
  const { data, isLoading, isFetching, error } = useListEMRsQuery(
    { phoneNumber: phoneNumber! },
    {
      skip: !phoneNumber,
      refetchOnMountOrArgChange: true,
    },
  );

  const [tab, setTab] = useState(0);
  const restCount = Symptoms.length - 3;

  const tabRendering = () => {
    switch (tab) {
      case 0:
        return <Emr />;
      case 1:
        return <Visit />;
      // return <FollowUpQuestion />;
      case 2:
        return <Reports />;
      case 3:
        return <Visit />;
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingWrapper>
      {/* App Header */}
      <AppHeader title={t("Patient profile")} leftIcon={<Icons.left />} />

      <View style={styles.subContainer}>
        {/* Patient Info - default values while API loading */}
        <PatientHeader
          name={patient?.name || "N/A"}
          age={`${patient?.age}y/o` || "N/A"}
          phone={phoneNumber || "N/A"}
          cnic={patient?.cnic || "N/A"}
        />

        <PatientInfoCard
          ga={patient?.gestationalAge || "--"}
          gpa={obs?.gravidaPara || "--"}
        />

        {/* Tabs */}
        <TabSwitcher tabs={tabSwitcher} activeIndex={tab} onChange={setTab} />
        <View style={styles.cardStyle}>{tabRendering()}</View>

        {/* Full screen loader */}
        {(isLoading || isFetching) && <AppLoader fullScreen size="large" />}
      </View>
    </KeyboardAvoidingWrapper>
  );
}
