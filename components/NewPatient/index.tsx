import { Formik } from "formik";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { newPatientSchema } from "@/schemas/schema";
import { newPatientValidation } from "@/schemas/validations";
import {
  useCreatePatientMutation,
  useUpdatePatientMutation,
} from "@/services/modules/patient";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  errorMessage,
  formatCNIC,
  onlyDigits,
} from "@/utils/helperFunction";
import AppInput from "../AppInput";
import Button from "../Button";
import { styles } from "./style";
import { hp } from "@/utils/responsive";
import { t } from "i18next";
import KeyboardAvoidingWrapper from "../KeyboardAvoidingWrapper";
import { setCurrentPatient } from "@/features/patientSlice";
import AppLoader from "../AppLoader";

interface Props {
  ref?: any;
}

export interface PatientFormValues {
  name: string;
  husbandName: string;
  cnic: string;
  age: string;
  phoneNumber: string;
}

const NewPatient = ({ ref }: Props) => {
  const dispatch = useAppDispatch();

  const [
    createPatient,
    {
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      data: createData,
      error: createError,
    },
  ] = useCreatePatientMutation();

  const [
    updatePatient,
    {
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: updateData,
      error: updateError,
    },
  ] = useUpdatePatientMutation();

  const patient = useAppSelector((state) => state.patient.currentPatient);

  const isLoading = isCreateLoading || isUpdateLoading;
  const apiError: any = createError || updateError;
  const responseData = createData || updateData;

  const handleSubmit = async (values: any) => {
    const cleanPhone = "+92" + values.phoneNumber;

    const payload = {
      ...values,
      phoneNumber: cleanPhone,
    };

    let res: any;

    if (patient?.id) {
      res = await updatePatient({
        id: patient.id,
        ...payload,
      });
    } else {
      res = await createPatient(payload);
    }

    if (res?.data) {
      ref?.current?.close();
    }
  };

  return (
    <KeyboardAvoidingWrapper containerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconWrapper}>
          <Icon name="person" size={30} color="#000" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{t("Add new patient")}</Text>
          <Text style={styles.subtitle}>
            {t(
              " Record patient vitals, examination findings, prescriptions, and general advice.",
            )}
          </Text>
        </View>

        <Icon
          name="close"
          size={24}
          color="#666"
          onPress={() => ref?.current?.close()}
        />
      </View>
      {/* ⏳ Loader */}
      {isLoading && <AppLoader fullScreen size="small" />}

      <Formik<PatientFormValues>
        initialValues={newPatientSchema(patient)}
        validationSchema={newPatientValidation}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          handleChange,
          handleSubmit,
          values: { name, husbandName, cnic, age, phoneNumber },
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <AppInput
              label={t("Patient Name")}
              inputProps={{
                value: name,
                onChangeText: handleChange("name"),
              }}
              touched
              error={errors.name}
            />

            <AppInput
              label={t("Husband Name")}
              inputProps={{
                value: husbandName,
                onChangeText: handleChange("husbandName"),
              }}
              touched
              error={errors.husbandName}
            />

            <AppInput
              label={t("CNIC")}
              inputProps={{
                placeholder: "00000-0000000-0",
                value: cnic,
                keyboardType: "numeric",
                maxLength: 15,
                onChangeText: (text: string) =>
                  setFieldValue("cnic", formatCNIC(text)),
              }}
              touched
              error={errors.cnic}
            />

            <AppInput
              label={t("Age")}
              inputProps={{
                value: age,
                keyboardType: "numeric",
                maxLength: 2,
                onChangeText: (text: string) =>
                  setFieldValue("age", onlyDigits(text)),
              }}
              touched
              error={errors.age}
            />

            <View style={{ marginBottom: 12 }}>
              <Text style={{ fontSize: 14, color: "#0D0D0D", marginBottom: 4 }}>
                {t("Patient Phone Number")}
              </Text>

              <View style={styles.phoneWrapper}>
                {/* Country code */}
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>+92</Text>
                </View>

                {/* Number input */}
                <View style={styles.flex}>
                  <AppInput
                    inputProps={{
                      value: phoneNumber,
                      keyboardType: "numeric",
                      maxLength: 10,
                      onChangeText: (text: string) =>
                        setFieldValue(
                          "phoneNumber",
                          onlyDigits(text).slice(0, 10),
                        ),
                      placeholder: "0000000000",
                    }}
                    inputStyle={{ borderWidth: 0 }}
                    containerStyle={{ marginBottom: hp(0) }}
                  />
                </View>
              </View>

              {touched.phoneNumber &&
                typeof errors.phoneNumber === "string" && (
                  <Text style={styles.error}>{errors.phoneNumber}</Text>
                )}
            </View>
            {apiError && (
              <Text style={styles.error}>{apiError?.data?.error}</Text>
            )}
            <Button
              title={isLoading ? t("Creating...") : t("Create Patient")}
              disabled={isLoading}
              style={styles.btn}
              btnProps={{
                onPress: handleSubmit as any,
              }}
            />
          </>
        )}
      </Formik>
    </KeyboardAvoidingWrapper>
  );
};

export default NewPatient;
