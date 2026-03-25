import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useGetPatientOverviewQuery } from "@/services/modules/dashboard";
import type { TrimesterData } from "@/services/modules/dashboard";

const STAT_CARDS = [
  {
    key: "totalPatients",
    label: "Total Active Patients",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: "👥",
  },
  {
    key: "scheduledFollowupAppointments",
    label: "Scheduled Follow-ups Today",
    iconBg: "bg-green-90",
    iconColor: "text-green-30",
    icon: "📅",
  },
  {
    key: "highRiskPregnancy",
    label: "High-Risk Pregnancies",
    iconBg: "bg-red-90",
    iconColor: "text-red-30",
    icon: "⚠️",
  },
  {
    key: "patientsInThirdTrimester",
    label: "Patients in 3rd Trimester",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: "📈",
  },
  {
    key: "missedAncVisits",
    label: "Missed ANC Visits",
    iconBg: "bg-orange-90",
    iconColor: "text-orange-30",
    icon: "❌",
  },
  {
    key: "expectedDeliveriesThisMonth",
    label: "Expected Deliveries This Month",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: "👶",
  },
] as const;

const TRIMESTER_CONFIG = [
  { key: "firstTrimester", label: "1st Trimester", color: "#3b82f6", bg: "bg-blue-500" },
  { key: "secondTrimester", label: "2nd Trimester", color: "#8b5cf6", bg: "bg-purple-500" },
  { key: "thirdTrimester", label: "3rd Trimester", color: "#0B6E27", bg: "bg-green-20" },
] as const;

export default function DashboardScreen() {
  const { data, isLoading, isFetching, refetch } = useGetPatientOverviewQuery();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white-2">
        <ActivityIndicator size="large" color="#0B6E27" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white-2"
      contentContainerClassName="px-4 pt-4 pb-8"
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
          tintColor="#0B6E27"
          colors={["#0B6E27"]}
        />
      }
    >
      {/* Header */}
      <Text className="font-bold text-xl text-black-05 mb-4">Dashboard</Text>

      {/* Stat Cards Grid - 2 columns */}
      <View className="flex-row flex-wrap justify-between">
        {STAT_CARDS.map((card) => {
          const value = data?.[card.key as keyof typeof data];
          return (
            <StatCard
              key={card.key}
              icon={card.icon}
              iconBg={card.iconBg}
              value={String(value ?? "0")}
              label={card.label}
            />
          );
        })}
      </View>

      {/* Pregnancy Distribution */}
      {data?.trimesterDistribution && (
        <View className="bg-white-1 border border-black-80 rounded-xl mt-4 p-4">
          <Text className="font-medium text-base text-black-05 mb-4">
            Pregnancy Distribution
          </Text>

          {/* Bar Chart */}
          <TrimesterChart distribution={data.trimesterDistribution} />
        </View>
      )}
    </ScrollView>
  );
}

// --- Stat Card ---
function StatCard({
  icon,
  iconBg,
  value,
  label,
}: {
  icon: string;
  iconBg: string;
  value: string;
  label: string;
}) {
  return (
    <View className="w-[48%] bg-white-1 border border-black-80 rounded-xl p-4 mb-3">
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-2">
          <Text className="font-medium text-2xl text-black-05 mb-1">
            {value}
          </Text>
          <Text className="font-regular text-xs text-black-40 leading-4">
            {label}
          </Text>
        </View>
        <View className={`${iconBg} p-2 rounded-lg`}>
          <Text className="text-lg">{icon}</Text>
        </View>
      </View>
    </View>
  );
}

// --- Trimester Distribution Chart ---
function TrimesterChart({
  distribution,
}: {
  distribution: {
    firstTrimester: TrimesterData;
    secondTrimester: TrimesterData;
    thirdTrimester: TrimesterData;
  };
}) {
  const total =
    distribution.firstTrimester.count +
    distribution.secondTrimester.count +
    distribution.thirdTrimester.count;

  return (
    <View>
      {/* Stacked Bar */}
      {total > 0 && (
        <View className="flex-row h-6 rounded-full overflow-hidden mb-4">
          {TRIMESTER_CONFIG.map((t) => {
            const count = distribution[t.key].count;
            const pct = total > 0 ? (count / total) * 100 : 0;
            if (pct === 0) return null;
            return (
              <View
                key={t.key}
                style={{ width: `${pct}%`, backgroundColor: t.color }}
                className="h-full"
              />
            );
          })}
        </View>
      )}

      {/* Legend */}
      {TRIMESTER_CONFIG.map((t) => {
        const item = distribution[t.key];
        return (
          <View key={t.key} className="flex-row items-center justify-between py-2 border-b border-black-90">
            <View className="flex-row items-center">
              <View
                style={{ backgroundColor: t.color }}
                className="w-3 h-3 rounded-full mr-3"
              />
              <Text className="font-regular text-sm text-black-20">
                {t.label}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Text className="font-medium text-sm text-black-05 mr-2">
                {item.count}
              </Text>
              <Text className="font-regular text-xs text-black-40">
                ({item.percentage}%)
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
