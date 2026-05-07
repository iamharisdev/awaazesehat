import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useAppDispatch, useAppSelector } from "@/store";

import AppLoader from "@/components/AppLoader";
import Button from "@/components/Button";
import {
  setActiveVisit,
  setViewVisit,
  setVisit,
  setVisitSteps,
} from "@/features/patientSlice";
import type { AdvisedTest } from "@/features/patientSlice";
import {
  useLazyVisitDetailQuery,
  useListVisitsQuery,
} from "@/services/modules/visit";
import { Ionicons } from "@expo/vector-icons";
import ViewVisit from "../ViewVist";
import { styles } from "./style";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")} ${date.toLocaleString(
    "en-GB",
    { month: "short" },
  )} ${date.getFullYear()}`;
};

interface Props {
  ref?: any;
  onAdvisedTestsLoad?: (tests: AdvisedTest[]) => void;
  onNextVisitNumberChange?: (n: number) => void;
  onModeChange?: (mode: "create" | "edit") => void;
}

const VisitList = ({
  ref,
  onAdvisedTestsLoad,
  onNextVisitNumberChange,
  onModeChange,
}: Props) => {
  const dispatch = useAppDispatch();

  const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null);
  const [visitNumber, setVisitNumber] = useState<number>(1);
  const [currentVisitIndex, setCurrentVisitIndex] = useState<number>(0);

  const patient = useAppSelector((state) => state.patient.currentPatient);
  const viewVisit = useAppSelector((s) => s.patient.viewVisit);
  const currentVisit = useAppSelector((s) => s.patient.visit);

  const patientId = patient?.id;
  const { data: visitsData, status } = useListVisitsQuery(
    { id: patientId! },
    { skip: !patientId, refetchOnMountOrArgChange: true },
  );

  const [triggerGetVisitDetail] = useLazyVisitDetailQuery();

  const visitIds: string[] = visitsData?.map((v: any) => v.id) || [];

  // Whenever the visit list changes, propagate next visit number
  useEffect(() => {
    if (!visitsData) return;
    const max = visitsData.reduce(
      (acc: number, v: any) =>
        typeof v?.visitNumber === "number" && v.visitNumber > acc
          ? v.visitNumber
          : acc,
      0,
    );
    onNextVisitNumberChange?.(max + 1);
  }, [visitsData, onNextVisitNumberChange]);

  // When entering edit mode, seed advisedTests from store
  const handleEditPress = () => {
    const advised = (currentVisit as any)?.advisedTests as
      | AdvisedTest[]
      | undefined;
    onAdvisedTestsLoad?.(advised ?? []);
    onModeChange?.("edit");
    dispatch(setVisitSteps(0));
    dispatch(setViewVisit(false));
    ref?.current?.open();
  };

  const handleVisitClick = (visit: any, index: number) => {
    setLoadingDetailId(visit.id);
    setVisitNumber(visit.visitNumber);
    setCurrentVisitIndex(index);
    const id = visit?.id;
    triggerGetVisitDetail({ id })
      .unwrap()
      .then(() => {
        dispatch(setViewVisit(true));
        setLoadingDetailId(null);
      })
      .catch((err) => {
        console.error("Error fetching visit detail:", err);
        setLoadingDetailId(null);
      });
  };

  const handleAddPress = () => {
    dispatch(setVisit({}));
    dispatch(setVisitSteps(0));
    dispatch(setActiveVisit(true));
    onAdvisedTestsLoad?.([]); // reset; LabTests will fetch not-submitted
    onModeChange?.("create");
    ref?.current?.open();
  };

  if (viewVisit) {
    return (
      <ViewVisit
        onClose={() => dispatch(setViewVisit(false))}
        visitNumber={visitNumber}
        visitIds={visitIds}
        currentIndex={currentVisitIndex}
        onNextVisit={() => {
          const nextIndex = currentVisitIndex + 1;
          if (visitsData && nextIndex < visitIds.length) {
            handleVisitClick(visitsData[nextIndex], nextIndex);
          }
        }}
        editAble={handleEditPress}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={[(visitsData?.length ?? 0) === 0 && styles.centeredEmpty]}>
        <Text style={styles.description}>
          {(visitsData?.length ?? 0) > 0
            ? "For every visit, record patient vitals, examination findings, prescriptions, and general plan & advice."
            : "During each visit, note the patient’s vitals, record your examination, review her reports, and share prescriptions with your care plan and advice."}
        </Text>

        <Button
          title="Add Visit"
          btnProps={{
            onPress: handleAddPress,
          }}
          icon={<Ionicons name="add" size={20} color="#FFFFFF" />}
        />
      </View>

      {status === "pending" && (
        <View style={styles.loadingOverlay}>
          <AppLoader />
        </View>
      )}

      {visitsData && (
        <FlatList
          data={visitsData}
          keyExtractor={(item) => item.id}
          nestedScrollEnabled
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.visitCard}
              onPress={() => handleVisitClick(item, index)}
            >
              <View>
                <Text style={styles.visitTitle}>Visit {item.visitNumber}</Text>
                <Text style={styles.visitDate}>
                  Date: {formatDate(item.visitDate)}
                </Text>
              </View>

              {loadingDetailId === item.id ? (
                <ActivityIndicator size="small" color="#999" />
              ) : (
                <Ionicons name="chevron-forward" size={22} color="#0D0D0D" />
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default VisitList;
