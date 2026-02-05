import { Icons } from "@/assets/svgs";
import { AppLoader, KeyboardAvoidingWrapper, PatientCard } from "@/components";
import { SearchInput } from "@/components/SearchInput";
import { setCurrentPatient, setEmr } from "@/features/patientSlice";
import { useListPatientsQuery } from "@/services/modules/patient";
import { useAppDispatch } from "@/store";
import { styles } from "@/styles/homeScreenStyle";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import { useDispatch } from "react-redux";

/* ✅ Define patient type (matches API) */
interface Patient {
  id: string;
  name: string;
  phoneNumber: string;
  cnic?: string;
  voiceNotes?: string[];
}

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPatients, setAllPatients] = useState<Patient[]>([]);

  // // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only update if debouncedSearch is different
      if (debouncedSearch !== searchText) {
        setDebouncedSearch(searchText);
        setCurrentPage(1); // Reset page
        setAllPatients([]); // Clear old results
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchText]);

  // Fetch patients
  const { data, isLoading, isFetching, error }: any = useListPatientsQuery(
    {
      searchKey: debouncedSearch,
      page: currentPage,
      pageSize: 20,
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

  const onEndReachedCalledDuringMomentum = useRef(true);

  const handleLoadMore = () => {
    const totalPages = data?.pagination?.totalPages ?? 1;
    const current = data?.pagination?.currentPage ?? 1;

    if (!onEndReachedCalledDuringMomentum.current) {
      if (current < totalPages && !isFetching) {
        setCurrentPage(current + 1);
      }
      onEndReachedCalledDuringMomentum.current = true;
    }
  };
  const PatientCardMemo = React.memo(PatientCard);
  return (
    <View style={styles.container}>
      {/* 🔍 Search */}
      <SearchInput
        placeholder={t("Search for patient CNIC, number or name")}
        value={searchText}
        onChangeText={setSearchText}
      />

      {/* ⏳ Loader */}
      {(isLoading || isFetching) && <AppLoader fullScreen size="small" />}

      {/* 📋 Patients list */}
      <FlatList<Patient>
        data={allPatients}
        keyExtractor={(item, index) => `${item.id}+${index}`}
        contentContainerStyle={{ paddingBottom: 40 }}
        initialNumToRender={10} // render only first 10 items
        maxToRenderPerBatch={10} // render 10 items per batch
        windowSize={5} // number of batches kept in memory
        removeClippedSubviews={true}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentum.current = false;
        }}
        renderItem={({ item }) => (
          <PatientCardMemo
            name={item.name}
            ga={item.phoneNumber}
            onPress={() => {
              dispatch(setCurrentPatient(item));
              dispatch(setEmr(null));
              router.push({
                pathname: "patientDetails",
                params: { id: item.id },
              });
            }}
          />
        )}
        ListEmptyComponent={
          !isLoading && !isFetching ? (
            <View style={styles.subContainer}>
              <Icons.fillSearch />
              <Text style={styles.headingStyle}>
                {t("Let’s find your first patient")}
              </Text>
              <Text style={styles.headingLight}>
                {t(
                  "Enter a patient’s CNIC or number to view their details and medical history.",
                )}
              </Text>
            </View>
          ) : null
        }
      />

      {/* ❌ Error */}
      {error && (
        <Text style={{ color: "red", textAlign: "center" }}>
          {t("Something went wrong. Please try again.")}
        </Text>
      )}
    </View>
  );
};

export default Index;
