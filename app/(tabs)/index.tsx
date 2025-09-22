import { Icons } from "@/assets/svgs";
import { KeyboardAvoidingWrapper, PatientCard } from "@/components";
import { SearchInput } from "@/components/SearchInput";
import { styles } from "@/styles/homeScreenStyle";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        <SearchInput
          placeholder={t("Search for patient CNIC, number or name")}
        />
        <PatientCard
          name="Fatima Ahmed"
          ga="GA-WA"
          onPress={() => router.push("patientDetails")}
        />
        <View style={styles.subContainer}>
          <Icons.fillSearch />
          <Text style={styles.headingStyle}>
            {t("Let’s find your first patient")}
          </Text>
          <Text style={styles.headingLight}>
            {t(
              "Enter a patient’s CNIC or number to view their details and medical history."
            )}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default Index;
