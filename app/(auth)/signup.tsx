import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { Formik } from "formik";
import { styles } from "@/styles/signupStyle";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { SignupValidation } from "@/schemas/authValidation";

const Signup = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} />
      <Formik
        initialValues={{email:""}}
        validationSchema={SignupValidation}
        onSubmit={({ email }) => {
          router.push({
            pathname: "/otp",
            params: { email, check: "signup" },
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          errors,
          touched,
          handleSubmit,
          values: { email },
        }) => (
          <>
            <View style={styles.subContainer}>
              <Text style={styles.heading}>
                {t("Create account with email")}
              </Text>
              <Text style={styles.headingLight}>
                {t(
                  "We will be sending you an OTP on this email, it helps us keep your account secure."
                )}
              </Text>
              <AppInput
                label={t("Your email *")}
                inputProps={{
                  placeholder: t("Enter Email"),
                  value: email,
                  onChangeText: handleChange("email"),
                  onBlur: handleBlur("email"),
                }}
                error={errors.email}
                touched={touched.email}
              />
              <View style={styles.footerView}>
                <Text style={styles.footerText}>
                  {t("By Signing up, you agree to Awaaz-e-Sehat’s")}{" "}
                  <Text style={styles.underLineText}>
                    {t("Terms of Services")}
                  </Text>{" "}
                  {t("and")}{" "}
                  <Text style={styles.underLineText}>
                    {" "}
                    {t("Privacy Policy")}
                  </Text>
                </Text>
                <Button
                  disabled={!email}
                  title={t("Send code")}
                  style={styles.btnViewStyle}
                  btnProps={{
                    onPress: () => {
                      handleSubmit();
                    },
                  }}
                />
              </View>
            </View>
          </>
        )}
      </Formik>
    </KeyboardAvoidingWrapper>
  );
};

export default Signup;
