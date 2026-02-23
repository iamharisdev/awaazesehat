import { useAppSelector } from "@/store";
import React from "react";
import { Text, View } from "react-native";

import AppLoader from "@/components/AppLoader";
import { useGetDoctorNotesQuery } from "@/services/modules/report";
import { useTranslation } from "react-i18next";
import { styles } from "./style";

interface Note {
  content: string;
}

interface NoteItem {
  title: string;
  notes: Note[];
}

const Notes: React.FC = () => {
  const { t } = useTranslation();
  const currentPatient = useAppSelector(
    (state) => state.patient.currentPatient,
  );
  const patientId = currentPatient?.id;

  const { data, isLoading, error } = useGetDoctorNotesQuery(
    { id: patientId },
    { skip: !patientId },
  );

  // Loading State
  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingOverlay}>
          <AppLoader fullScreen />
          <Text style={styles.loadingText}>{t("Loading doctor notes")}</Text>
        </View>
      </View>
    );
  }

  // Empty State
  if (!data || data.length === 0) {
    return (
      <Text style={styles.emptyStateDescription}>
        {t(
          "All the risk factors you've noted, along with any specific conditions shared by the patient, will be displayed here.",
        )}
      </Text>
    );
  }

  // Notes List
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {t(
          "All the risk factors you've noted, along with any specific conditions shared by the patient, are displayed here.",
        )}
      </Text>

      <View style={styles.notesListContainer}>
        {data?.map((item: NoteItem, sectionIdx: number) => (
          <View key={sectionIdx} style={styles.noteSection}>
            {/* Section Title */}
            <Text style={styles.noteSectionTitle}>
              {item.title} {t("notes")}
            </Text>

            {/* Notes Card */}
            <View style={styles.noteCard}>
              {item.notes.map((note: Note, noteIdx: number) => (
                <Text
                  key={noteIdx}
                  style={[
                    styles.noteText,
                    noteIdx !== item.notes.length - 1 &&
                      styles.noteTextWithSpacing,
                  ]}
                >
                  {note.content}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Notes;
