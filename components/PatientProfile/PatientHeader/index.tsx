import { View, Text, ActivityIndicator } from "react-native";
import { useAppSelector } from "@/store";
import {
  getUpdatedGestationalAge,
  getWeeksAndDays,
} from "@/utils/helperFunction";
import { useGetPatientProfileOverviewQuery } from "@/services/modules/dashboard";
import type { PatientProfileOverviewVitals } from "@/services/modules/dashboard";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const PatientHeader = () => {
  const patient = useAppSelector((s) => s.patient.currentPatient);
  const { emr } = useAppSelector((s) => s.patient);

  const { data: overview, isLoading } = useGetPatientProfileOverviewQuery(
    { patientId: patient?.id },
    { skip: !patient?.id },
  );

  // Gestational age from local state
  const ga =
    emr?.patient?.gestationalAge ||
    patient?.gestationalAge ||
    getWeeksAndDays(
      patient?.lastMenstruationDate || emr?.patient?.lastMenstruationDate,
    );
  const gestationalAge = getUpdatedGestationalAge(
    ga,
    patient?.updatedAt,
    "short",
  );

  // Parse GPA string like "G1P0A0"
  const gpaStr = overview?.gravidaPara || emr?.obsHistory?.gravidaPara || "";
  const gpaMatch = gpaStr?.match?.(/G(\d+)P(\d+)A(\d+)/);
  const gpa = gpaMatch
    ? { g: gpaMatch[1], p: gpaMatch[2], a: gpaMatch[3] }
    : null;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "--";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const daysRemaining = (dateStr?: string) => {
    if (!dateStr) return null;
    const diff = Math.ceil(
      (new Date(dateStr).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? `${diff} days remaining` : null;
  };

  const daysAgo = (dateStr?: string) => {
    if (!dateStr) return null;
    const diff = Math.ceil(
      (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? `${diff} days ago` : null;
  };

  if (isLoading) {
    return (
      <View className="items-center justify-center py-8">
        <ActivityIndicator size="large" color="#0B6E27" />
      </View>
    );
  }

  return (
    <View className="bg-white-1 border border-black-80 rounded-xl overflow-hidden">
      {/* Header: Name + GA badge */}
      <View className="p-4 border-b border-black-80">
        <View className="flex-row items-start justify-between">
          {/* Left: Avatar + Info */}
          <View className="flex-row items-center flex-1 mr-3">
            <View className="w-12 h-12 bg-green-90 rounded-full items-center justify-center mr-3">
              <MaterialIcon name="person" size={24} color="#0B6E27" />
            </View>
            <View className="flex-1">
              <Text className="font-medium text-lg text-black-05">
                {overview?.name || patient?.name || "--"}
              </Text>
              <View className="flex-row flex-wrap items-center mt-1">
                <Text className="font-regular text-xs text-black-40">
                  <Text className="font-medium text-black-05">
                    {overview?.age || patient?.age || "--"}
                  </Text>{" "}
                  years
                </Text>
                <Text className="text-black-40 mx-2">•</Text>
                <Text className="font-regular text-xs text-black-40">
                  Blood:{" "}
                  <Text className="font-medium text-black-05">
                    {overview?.bloodGroup || "--"}
                  </Text>
                </Text>
                {gpa && (
                  <>
                    <Text className="text-black-40 mx-2">•</Text>
                    <View className="bg-black-90 px-2 py-0.5 rounded">
                      <Text className="font-medium text-xs text-black-05">
                        G{gpa.g}P{gpa.p}A{gpa.a}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>

          {/* Right: GA Badge */}
          <View className="bg-green-90 border border-green-20 px-4 py-2 rounded-lg">
            <Text className="font-regular text-[10px] text-black-40">
              Gestational Age
            </Text>
            <Text className="font-medium text-base text-green-20">
              {gestationalAge}
            </Text>
          </View>
        </View>
      </View>

      {/* Body: Timeline + Clinical */}
      <View className="p-4">
        {/* Pregnancy Timeline */}
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <MaterialIcon name="event" size={16} color="#0B6E27" />
            <Text className="font-medium text-sm text-black-05 ml-2">
              Pregnancy Timeline
            </Text>
          </View>
          <View className="flex-row gap-2">
            <TimelineItem
              label="LMP"
              date={formatDate(overview?.lmp)}
            />
            <TimelineItem
              label="EDD"
              date={formatDate(overview?.expectedDeliveryDate)}
              subtext={daysRemaining(overview?.expectedDeliveryDate)}
            />
            <TimelineItem
              label="Last Ultrasound"
              date={formatDate(overview?.lastUltrasoundDate)}
              subtext={daysAgo(overview?.lastUltrasoundDate)}
            />
          </View>
        </View>

        {/* Clinical Status */}
        <View className="mb-4">
          <View className="flex-row items-center mb-3">
            <MaterialIcon name="monitor-heart" size={16} color="#0B6E27" />
            <Text className="font-medium text-sm text-black-05 ml-2">
              Clinical Status
            </Text>
          </View>

          {/* Medications */}
          {overview?.medications ? (
            <View className="bg-black-90 border border-black-80 rounded-lg p-3 mb-2">
              <View className="flex-row items-center mb-2">
                <MaterialIcon name="medication" size={14} color="#0B6E27" />
                <Text className="font-medium text-xs text-black-05 ml-2">
                  Current Medications
                </Text>
              </View>
              <Text className="font-regular text-sm text-black-05">
                <Text className="text-green-20">• </Text>
                {overview.medications}
              </Text>
            </View>
          ) : null}

          {/* Diagnoses */}
          {overview?.presentingComplaint ? (
            <View className="bg-orange-90 border border-orange-80 rounded-lg p-3">
              <View className="flex-row items-center mb-2">
                <MaterialIcon name="warning" size={14} color="#E7702C" />
                <Text className="font-medium text-xs text-black-05 ml-2">
                  Active Diagnoses
                </Text>
              </View>
              <Text className="font-regular text-sm text-black-05">
                <Text className="text-orange-40">• </Text>
                {overview.presentingComplaint}
              </Text>
            </View>
          ) : null}
        </View>

        {/* Vitals */}
        {overview?.vitals && <VitalsSection vitals={overview.vitals} formatDate={formatDate} />}
      </View>
    </View>
  );
};

// --- Timeline Item ---
function TimelineItem({
  label,
  date,
  subtext,
}: {
  label: string;
  date: string;
  subtext?: string | null;
}) {
  return (
    <View className="flex-1 bg-white-1 border border-black-80 rounded-lg p-3">
      <Text className="font-regular text-[10px] text-black-40 mb-1">
        {label}
      </Text>
      <Text className="font-medium text-xs text-black-05">{date}</Text>
      {subtext ? (
        <Text className="font-regular text-[10px] text-black-40 mt-1">
          {subtext}
        </Text>
      ) : null}
    </View>
  );
}

// --- Vitals Section ---
function VitalsSection({
  vitals,
  formatDate,
}: {
  vitals: PatientProfileOverviewVitals;
  formatDate: (d?: string) => string;
}) {
  return (
    <View className="border-t border-black-80 pt-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <MaterialIcon name="favorite" size={16} color="#0B6E27" />
          <Text className="font-medium text-sm text-black-05 ml-2">
            Latest Vitals
          </Text>
        </View>
        {vitals.visitDate ? (
          <View className="bg-black-90 border border-black-80 rounded px-2 py-1">
            <Text className="font-regular text-[10px] text-black-40">
              {formatDate(vitals.visitDate)}
            </Text>
          </View>
        ) : null}
      </View>

      <View className="flex-row flex-wrap gap-2">
        <VitalCard
          label="BP"
          value={vitals.bloodPressure || "--"}
          unit="mmHg"
        />
        <VitalCard
          label="Pulse"
          value={vitals.pulseRate || "--"}
          unit="bpm"
        />
        <VitalCard
          label="Weight"
          value={vitals.weight || "--"}
          unit="kg"
        />
        <VitalCard
          label="Temp"
          value={vitals.temperature || "--"}
          unit="°F"
        />
        <VitalCard
          label="Resp"
          value={vitals.respiratoryRate || "--"}
          unit="/min"
        />
      </View>
    </View>
  );
}

// --- Vital Card ---
function VitalCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <View className="bg-black-90 border border-black-80 rounded-lg p-3 min-w-[70px]">
      <Text className="font-regular text-[10px] text-black-40 mb-1">
        {label}
      </Text>
      <Text className="font-medium text-sm text-green-20">
        {value}
        <Text className="font-regular text-[10px] text-black-40"> {unit}</Text>
      </Text>
    </View>
  );
}

export default PatientHeader;
