import { View, Text, ActivityIndicator } from "react-native";
import { useAppSelector } from "@/store";
import { useGetOverviewSummaryQuery } from "@/services/modules/dashboard";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export default function OverviewTab() {
  const patient = useAppSelector((s) => s.patient.currentPatient);

  const { data: summary, isLoading } = useGetOverviewSummaryQuery(
    { patientId: patient?.id },
    { skip: !patient?.id },
  );

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "--";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center py-12">
        <ActivityIndicator size="large" color="#0B6E27" />
      </View>
    );
  }

  return (
    <View>
      {/* EMR & Visits Summary */}
      <SummaryCard title="EMR & Visits Summary" icon="stethoscope">
        {/* AI Summary */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2">
            <View className="w-1 h-4 bg-green-20 rounded-full mr-2" />
            <Text className="font-medium text-sm text-black-05">
              AI Generated Summary
            </Text>
          </View>
          <Text className="font-regular text-sm text-black-05 leading-5">
            {summary?.emrSummary || "No summary available."}
          </Text>
        </View>

        {/* Visit Summary */}
        <View>
          <View className="flex-row items-center mb-3">
            <View className="w-1 h-4 bg-green-20 rounded-full mr-2" />
            <Text className="font-medium text-sm text-black-05">
              Visit Summary
            </Text>
          </View>

          <View className="bg-black-90 rounded-lg p-3">
            {/* Stats Row */}
            <View className="flex-row gap-2 mb-3">
              <MetricCard
                icon="event"
                iconColor="#2563EB"
                value={summary?.totalVisits || "0"}
                label="Total Visits"
              />
              <MetricCard
                icon="check-circle"
                iconColor="#16A34A"
                value={summary?.attendance || "--"}
                label="Attendance"
              />
              <MetricCard
                icon="error-outline"
                iconColor="#EA580C"
                value={summary?.missedVisits || "0"}
                label="Missed"
              />
            </View>

            {/* Last Visit */}
            <View className="flex-row items-center justify-between">
              <Text className="font-regular text-xs text-black-40">
                Last Visit:
              </Text>
              <Text className="font-regular text-sm text-black-05">
                {formatDate(summary?.latestVisitDate)}
              </Text>
            </View>
          </View>
        </View>
      </SummaryCard>
    </View>
  );
}

// --- Summary Card Wrapper ---
function SummaryCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <View className="bg-white-1 border border-black-80 rounded-xl overflow-hidden">
      <View className="flex-row items-center p-4 border-b border-black-80">
        <MaterialIcon name="medical-services" size={20} color="#0B6E27" />
        <Text className="font-medium text-base text-black-05 ml-2">
          {title}
        </Text>
      </View>
      <View className="p-4">{children}</View>
    </View>
  );
}

// --- Metric Card ---
function MetricCard({
  icon,
  iconColor,
  value,
  label,
}: {
  icon: string;
  iconColor: string;
  value: string;
  label: string;
}) {
  return (
    <View className="flex-1 bg-white-1 border border-black-80 rounded-lg p-3 items-center">
      <MaterialIcon name={icon} size={16} color={iconColor} />
      <Text className="font-medium text-lg text-black-05 mt-1">{value}</Text>
      <Text className="font-regular text-[10px] text-black-40">{label}</Text>
    </View>
  );
}
