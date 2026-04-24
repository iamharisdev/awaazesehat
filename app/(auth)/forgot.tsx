import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  Button,
  KeyboardAvoidingWrapper,
} from "@/components";
import { SignupValidation } from "@/schemas/validations";
import { useForgotPasswordMutation } from "@/services/modules/auth";
import { styles } from "@/styles/forgotStyle";
import { ROUTES } from "@/utils/routes";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} />
      <Formik
        initialValues={{ email: "" }}
        validationSchema={SignupValidation}
        onSubmit={async ({ email }) => {
          try {
            await forgotPassword({ email }).unwrap();
            router.push({
              pathname: ROUTES.verifyOtp,
              params: { email, check: "login" },
            });
          } catch (_e) {}
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
              <Text style={styles.heading}>{t("Reset your password")}</Text>
              <Text style={styles.headingLight}>
                {t(
                  "Enter the email address you signed up with. We will send you an OTP to reset password."
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
                <Button
                  disabled={!email || isLoading}
                  title={t("Reset password")}
                  style={styles.btnViewStyle}
                  btnProps={{
                    onPress: () => handleSubmit(),
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

export default ForgotPassword;
