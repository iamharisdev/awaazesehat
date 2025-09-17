import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { Formik } from "formik";
import { styles } from "@/styles/loginStyle";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { LoginValidation } from "@/schemas/authValidation";
import { loginSchema } from "@/schemas/schema";

const Login = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} />
      <Formik
        initialValues={loginSchema()}
        validationSchema={LoginValidation}
        onSubmit={(values) => console.log(values)}
      >
        {({
          handleChange,
          handleBlur,
          errors,
          touched,
          handleSubmit,
          values: { email, password },
        }) => (
          <>
            <View style={styles.subContainer}>
              <Text style={styles.heading}>{t("Log in")}</Text>

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
              <AppInput
                label={t("Your Password *")}
                inputProps={{
                  placeholder: "*********",
                  value: password,
                  onChangeText: handleChange("password"),
                  onBlur: handleBlur("password"),
                }}
                error={errors.password}
                touched={touched.password}
              />
              <Text style={styles.forgot} onPress={() => router.push("forgot")}>
                {t("Forgot password?")}
              </Text>
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
                  title={t("Log in")}
                  style={styles.btnViewStyle}
                  btnProps={{
                    onPress:()=>handleSubmit()
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

export default Login;
