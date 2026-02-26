import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppLoader,
  Emr,
  KeyboardAvoidingWrapper,
  Notes,
  PatientHeader,
  Reports,
  Visit,
} from "@/components";
import { TabSwitcher } from "@/components/PatientProfile/TabSwitcher";
import { useListEMRsQuery } from "@/services/modules/emr";
import { useAppSelector } from "@/store";
import { styles } from "@/styles/patientDetailStyle";
import { colors } from "@/utils/colors";
import { tabSwitcher } from "@/utils/Json";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function PatientDetail() {
  const { t } = useTranslation();



  const patientState: any = useAppSelector((state) => state.patient);
  const tab: any = useAppSelector((state) => state.patient.tab);

  const patient = patientState?.currentPatient;
 

  // Fetch EMRs
  const { data, isLoading, isFetching, error } = useListEMRsQuery(
    { phoneNumber: patient?.phoneNumber! },
    {
      skip: !patient?.phoneNumber,
      refetchOnMountOrArgChange: true,
    },
  );



  const tabRendering = () => {
    switch (tab) {
      case 0:
        return <Emr />;
      case 1:
        return <Visit />;

      case 2:
        return <Reports />;
      case 3:
        return <Notes />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white.w2 }}>
      {/* App Header */}
      <AppHeader title={t("Patient profile")} leftIcon={<Icons.left />} />

      <View style={styles.subContainer}>
        {/* Patient Info - default values while API loading */}
        <PatientHeader />

        {/* Tabs */}
        <TabSwitcher tabs={tabSwitcher} activeIndex={tab} />

        <View style={styles.cardStyle}>
          <KeyboardAvoidingWrapper scrollEnable>
            {tabRendering()}
          </KeyboardAvoidingWrapper>
        </View>

        {/* Full screen loader */}
        {(isLoading || isFetching) && <AppLoader fullScreen size="large" />}
      </View>
    </View>
  );
}
