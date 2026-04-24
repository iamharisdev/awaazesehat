import { Icons } from "@/assets/svgs";
import {
  AppHeader,
  AppInput,
  BottomSheet,
  Button,
  GenericPopup,
  KeyboardAvoidingWrapper,
  PasswordChangePopup,
} from "@/components";
import { passwordValidation } from "@/schemas/validations";
import { useResetPasswordMutation } from "@/services/modules/auth";
import { styles } from "@/styles/createPasswordStyle";
import { enableNotifications } from "@/utils/notification";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Formik } from "formik";
import { useRef } from "react";
import type { NotificationSheetRef } from "@/components/PasswordChangePopup";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const CreatePassword = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const notificationRef = useRef<NotificationSheetRef>(null);
  const passwordRef = useRef<NotificationSheetRef>(null);

  const { check, email, otp } = useLocalSearchParams<{
    check: string;
    email: string;
    otp: string;
  }>();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const AllowNotification = async () => {
    const token = await enableNotifications();
    console.log("✅ Notifications enabled, token:", token);
    notificationRef.current?.close();
  };

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} />
      <Formik
        initialValues={{ password: "" }}
        validationSchema={passwordValidation}
        onSubmit={async ({ password }) => {
          if (check === "login") {
            try {
              await resetPassword({
                email,
                otp,
                newPassword: password,
              }).unwrap();
              passwordRef?.current?.open();
            } catch (_e) {}
          } else {
            notificationRef?.current?.open();
          }
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
                  disabled={!password || isLoading}
                  title={check == "signup" ? t("Register") : t("Set password")}
                  style={styles.btnViewStyle}
                  btnProps={{
                    onPress: () => handleSubmit(),
                  }}
                />
              </View>
            </View>

            <PasswordChangePopup
              ref={passwordRef}
              onClose={() => router.replace("/login")}
            />

            <BottomSheet ref={notificationRef} sheetHeight={350}>
              <GenericPopup
                title={t("Turn on notifications")}
                description={t(
                  "Enable notifications to receive timely patient alerts, follow-up reminders, and important updates directly on your device."
                )}
                btnTitle1={t("Allow notifications")}
                btnTitle2={t("Not now")}
                icon={<Icons.notification />}
                onCrossPress={() => notificationRef.current?.close()}
                openPress={AllowNotification}
                closePress={() => notificationRef.current?.close()}
              />
            </BottomSheet>
          </>
        )}
      </Formik>
    </KeyboardAvoidingWrapper>
  );
};

export default CreatePassword;
