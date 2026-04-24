import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppLoader,
  Emr,
  Notes,
  Overview,
  PatientHeader,
  Reports,
  Visit,
} from "@/components";
import { TabSwitcher } from "@/components/PatientProfile/TabSwitcher";
import { useListEMRsQuery } from "@/services/modules/emr";
import { useAppSelector } from "@/store";
import { tabSwitcher } from "@/utils/Json";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

export default function PatientDetail() {
  const { t } = useTranslation();

  const patientState: any = useAppSelector((state) => state.patient);
  const tab: any = useAppSelector((state) => state.patient.tab);

  const patient = patientState?.currentPatient;

  // Fetch EMRs
  const { isLoading, isFetching } = useListEMRsQuery(
    { patientId: patient?.id! },
    {
      skip: !patient?.id,
      refetchOnMountOrArgChange: true,
    },
  );

  const tabRendering = () => {
    switch (tab) {
      case 0:
        return <Overview />;
      case 1:
        return <Emr />;
      case 2:
        return <Visit />;
      case 3:
        return <Reports />;
      case 4:
        return <Notes />;
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white-2">
      {/* App Header */}
      <AppHeader title={t("Patient profile")} leftIcon={<Icons.left />} />

      <ScrollView
        className="flex-1 px-3"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8"
      >
        {/* Patient Header Card */}
        <PatientHeader />

        {/* Tabs */}
        <TabSwitcher tabs={tabSwitcher} activeIndex={tab} />

        {/* Tab Content */}
        <View className="bg-white-1 border border-black-80 rounded-xl py-6 px-3 mt-4">
          {tabRendering()}
        </View>

        {/* Full screen loader */}
        {(isLoading || isFetching) && <AppLoader fullScreen size="large" />}
      </ScrollView>
    </View>
  );
}
