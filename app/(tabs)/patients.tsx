import { Icons } from "@/assets/svgs";
import { AppLoader, BottomSheet, NewPatient } from "@/components";
import { SearchInput } from "@/components/SearchInput";
import { setCurrentPatient, setEmr } from "@/features/patientSlice";
import { useListPatientsQuery } from "@/services/modules/patient";
import { useAppDispatch } from "@/store";
import { useRouter } from "expo-router";
import { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Patient {
  id: string;
  name: string;
  age?: number;
  phoneNumber: string;
  cnic?: string;
  gestationalAge?: string;
  gravidaPara?: string;
  nextVisit?: string;
}

// Column widths for the table
const COL = {
  patient: 180,
  ga: 140,
  gp: 130,
  nextVisit: 140,
} as const;
const TABLE_WIDTH = COL.patient + COL.ga + COL.gp + COL.nextVisit;

export default function Patients() {
  const sheetRef = useRef<any>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPatients, setAllPatients] = useState<Patient[]>([]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (debouncedSearch !== searchText) {
        setDebouncedSearch(searchText);
        setCurrentPage(1);
        setAllPatients([]);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  // Fetch patients
  const { data, isLoading, isFetching, error }: any = useListPatientsQuery(
    {
      search: debouncedSearch,
      page: currentPage,
      limit: 50,
    },
    {
      skip: debouncedSearch.length > 0 && debouncedSearch.length < 3,
    },
  );

  // Append new patients
  useEffect(() => {
    if (data?.data?.length) {
      setAllPatients((prev) =>
        currentPage === 1 ? data.data : [...prev, ...data.data],
      );
    }
  }, [data?.data]);

  const handleLoadMore = () => {
    const totalPages = data?.pagination?.totalPages ?? 1;
    const current = data?.pagination?.currentPage ?? 1;
    if (current < totalPages && !isFetching) {
      setCurrentPage(current + 1);
    }
  };

  const handleSelectPatient = (item: Patient) => {
    dispatch(setCurrentPatient(item));
    dispatch(setEmr(null));
    router.push({
      pathname: "patientDetails",
      params: { id: item.id },
    });
  };

  return (
    <View className="flex-1 px-4 bg-white-2">
      {/* Header */}
      <View className="mb-3">
        <Text className="font-bold text-xl text-black-05">
          {t("List of all patients")}
        </Text>
        <Text className="font-regular text-xs text-black-50 mt-1">
          {t("Search by name, CNIC or phone number.")}
        </Text>
      </View>

      {/* Search */}
      <SearchInput
        placeholder={t("Search for patient CNIC, number or name")}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* Loader */}
      {(isLoading || isFetching) && <AppLoader fullScreen size="large" />}

      {/* Table */}
      {allPatients.length > 0 ? (
        <View className="flex-1 bg-white-1 border border-black-80 rounded-xl mt-3 overflow-hidden">
          {/* Horizontal scroll for the table */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20, width: TABLE_WIDTH }}
              showsVerticalScrollIndicator={false}
              onScroll={({ nativeEvent }) => {
                const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                const isCloseToBottom =
                  layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
                if (isCloseToBottom) handleLoadMore();
              }}
              scrollEventThrottle={400}
            >
              {/* Table Header */}
              <TableHeader />

              {/* Table Rows */}
              {allPatients.map((item, index) => (
                <PatientRow
                  key={`${item.id}-${index}`}
                  patient={item}
                  onPress={() => handleSelectPatient(item)}
                />
              ))}
            </ScrollView>
          </ScrollView>
        </View>
      ) : !isLoading && !isFetching ? (
        <View className="flex-1 items-center justify-center">
          <Icons.fillSearch />
          <Text className="font-medium text-base text-black-05 mt-3 text-center">
            {t("Let's find your first patient")}
          </Text>
          <Text className="font-regular text-base text-black-40 mt-1 text-center px-8">
            {t(
              "Enter a patient's CNIC or number to view their details and medical history.",
            )}
          </Text>
        </View>
      ) : null}

      {/* FAB */}
      <View className="absolute bottom-8 right-5">
        <TouchableOpacity
          className="w-[60px] h-[60px] rounded-full bg-green-20 items-center justify-center shadow-lg"
          activeOpacity={0.7}
          onPress={() => {
            dispatch(setCurrentPatient(null));
            sheetRef?.current.open();
          }}
        >
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <BottomSheet ref={sheetRef} sheetHeight={1000}>
        <NewPatient ref={sheetRef} />
      </BottomSheet>

      {/* Error */}
      {error && (
        <Text className="font-regular text-sm text-red-40 text-center mt-2">
          {t("Something went wrong. Please try again.")}
        </Text>
      )}
    </View>
  );
}

// --- Table Header ---
function TableHeader() {
  return (
    <View className="flex-row bg-black-90 border-b border-black-80 py-3">
      <View style={{ width: COL.patient }} className="px-4">
        <Text className="font-medium text-sm text-black-05">Patient</Text>
      </View>
      <View style={{ width: COL.ga }} className="px-4">
        <Text className="font-medium text-sm text-black-05">
          Gestational Age
        </Text>
      </View>
      <View style={{ width: COL.gp }} className="px-4">
        <Text className="font-medium text-sm text-black-05">
          Gravida / Para
        </Text>
      </View>
      <View style={{ width: COL.nextVisit }} className="px-4">
        <Text className="font-medium text-sm text-black-05">Next Visit</Text>
      </View>
    </View>
  );
}

// --- Patient Row ---
const PatientRow = memo(function PatientRow({
  patient,
  onPress,
}: {
  patient: Patient;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="flex-row border-b border-black-90 py-4 active:bg-black-90"
      activeOpacity={0.7}
      onPress={onPress}
    >
      {/* Patient Name & Age */}
      <View style={{ width: COL.patient }} className="px-4 justify-center">
        <Text className="font-medium text-sm text-black-05" numberOfLines={1}>
          {patient.name}
        </Text>
        {patient.age ? (
          <Text className="font-regular text-xs text-black-40 mt-0.5">
            {patient.age} years
          </Text>
        ) : null}
      </View>

      {/* Gestational Age */}
      <View style={{ width: COL.ga }} className="px-4 justify-center">
        {patient.gestationalAge ? (
          <View className="bg-black-90 self-start px-3 py-1 rounded-md">
            <Text className="font-medium text-sm text-black-05">
              {patient.gestationalAge}
            </Text>
          </View>
        ) : (
          <Text className="font-regular text-sm text-black-40">--</Text>
        )}
      </View>

      {/* Gravida / Para */}
      <View style={{ width: COL.gp }} className="px-4 justify-center">
        <Text className="font-regular text-sm text-black-05">
          {patient.gravidaPara || "--"}
        </Text>
      </View>

      {/* Next Visit */}
      <View style={{ width: COL.nextVisit }} className="px-4 justify-center">
        <Text className="font-regular text-sm text-black-20">
          {patient.nextVisit || "--"}
        </Text>
      </View>
    </TouchableOpacity>
  );
});
