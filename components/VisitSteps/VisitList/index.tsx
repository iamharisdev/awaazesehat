import React, { useState } from "react";
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
  updateVisit,
} from "@/features/patientSlice";
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
}
const VisitList = ({ ref }: Props) => {
  const dispatch = useAppDispatch();

  const [loadingDetailId, setLoadingDetailId] = useState<string | null>(null);
  const [visitNumber, setVisitNumber] = useState<number>(1);
  const [currentVisitIndex, setCurrentVisitIndex] = useState<number>(0);

  const patient = useAppSelector((state) => state.patient.currentPatient);
  const viewVisit = useAppSelector((s) => s.patient.viewVisit);

  // Fetch EMRs
  // List visits query
  const patientId = patient?.id;
  const { data: visitsData, status } = useListVisitsQuery(
    { id: patientId! },
    { skip: !patientId, refetchOnMountOrArgChange: true },
  );

  // Lazy trigger for visit detail
  const [triggerGetVisitDetail] = useLazyVisitDetailQuery();

  const visitIds: string[] = visitsData?.map((v: any) => v.id) || [];

  const handleVisitClick = (visit: any, index: number) => {
    setLoadingDetailId(visit.id);
    setVisitNumber(visit.visitNumber);
    setCurrentVisitIndex(index);
    setLoadingDetailId(visit.id); // optional loading state
    const id = visit?.id;
    triggerGetVisitDetail({ id })
      .unwrap() // unwrap promise to get data or throw error
      .then((data) => {
        dispatch(setViewVisit(true)); // optional: UI flag
        setLoadingDetailId(null); // stop loading
      })
      .catch((err) => {
        console.error("Error fetching visit detail:", err);
        setLoadingDetailId(null);
      });
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
          if (nextIndex < visitIds.length) {
            handleVisitClick(visitsData[nextIndex], nextIndex);
          }
        }}
        editAble={() => {
          dispatch(setVisitSteps(0));
          dispatch(setViewVisit(false));
          ref?.current?.open();
          // dispatch(setActiveVisit(true));
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Description + Add Button */}
      <View style={[visitsData?.length === 0 && styles.centeredEmpty]}>
        <Text style={styles.description}>
          {visitsData?.length > 0
            ? "For every visit, record patient vitals, examination findings, prescriptions, and general plan & advice."
            : "During each visit, note the patient’s vitals, record your examination, review her reports, and share prescriptions with your care plan and advice."}
        </Text>

        <Button
          title="Add Visit"
          btnProps={{
            onPress: () => {
              dispatch(setVisit({}));
              dispatch(setVisitSteps(0));
              dispatch(setActiveVisit(true));
              ref?.current?.open();
            },
          }}
          icon={<Ionicons name="add" size={20} color="#FFFFFF" />}
        />
      </View>

      {/* Loading Overlay */}
      {status === "pending" && (
        <View style={styles.loadingOverlay}>
          <AppLoader />
        </View>
      )}

      {/* Visit List */}
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
