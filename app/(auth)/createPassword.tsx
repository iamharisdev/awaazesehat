import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
  NotificationSheet,
  PasswordChangeSheet,
} from "@/components";
import { passwordValidation } from "@/schemas/authValidation";
import { styles } from "@/styles/createPasswordStyle";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const CreatePassword = () => {
  const { t } = useTranslation();
  const sheetRef = useRef(null);
  const ref = useRef(null);

  const { check } = useLocalSearchParams<{
    check: string;
  }>();

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} />
      <Formik
        initialValues={{ password: "" }}
        validationSchema={passwordValidation}
        onSubmit={(values) => {
          check == "signup" ? sheetRef?.current?.open() : ref?.current?.open(),
            console.log(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          errors,
          touched,
          handleSubmit,
          values: { password },
        }) => (
          <>
            <View style={styles.subContainer}>
              <Text style={styles.heading}>
                {check == "signup"
                  ? t("Create your password")
                  : t("Set new password")}
              </Text>
              <Text style={styles.headingLight}>
                {check == "signup"
                  ? t(
                      "Your password should be 9 characters, containing a letter and a number"
                    )
                  : t(
                      "Your old password has been reset, set a new password now"
                    )}
              </Text>
              <AppInput
                label={t("Your Password")}
                inputProps={{
                  placeholder: "********",
                  value: password,
                  onChangeText: handleChange("password"),
                  onBlur: handleBlur("password"),
                }}
                error={errors.password}
                touched={touched.password}
                password
              />
              <View style={styles.footerView}>
                <Button
                  disabled={!password}
                  title={check == "signup" ? t("Register") : t("Set password")}
                  style={styles.btnViewStyle}
                  btnProps={{
                    onPress: () => handleSubmit(),
                  }}
                />
              </View>
            </View>

            <NotificationSheet
              ref={sheetRef}
              onAllow={() => console.log("✅ Notifications allowed")}
              onClose={() => console.log("❌ Closed")}
            />
            <PasswordChangeSheet
              ref={ref}
              onAllow={() => console.log("✅ Notifications allowed")}
              onClose={() => console.log("❌ Closed")}
            />
          </>
        )}
      </Formik>
    </KeyboardAvoidingWrapper>
  );
};

export default CreatePassword;
