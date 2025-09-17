import { Icons } from "@/assets/svgs";
import { AppHeader, Button, KeyboardAvoidingWrapper } from "@/components";
import { styles } from "@/styles/otpStyle";
import { ROUTES } from "@/utils/routes";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const Otp = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { email, check } = useLocalSearchParams<{
    email: string;
    check: string;
  }>();

  const [value, setValue] = useState("");
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => interval && clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    setTimer(59);
  };

  return (
    <KeyboardAvoidingWrapper>
      <AppHeader leftIcon={<Icons.left />} />

      <View style={styles.subContainer}>
        <Text style={styles.heading}>
          {check == "signup" ? t("We just sent you a code") : t("Enter OTP")}
        </Text>
        <Text style={styles.headingLight}>
          {check == "signup"
            ? t("You will receive a mail with a verification pin at ")
            : t("We sent you an email at ")}
          <Text style={styles.email}>{email}</Text>
          {check == "login" && t("with 6 digit OTP, enter it below.")}
        </Text>

        <CodeField
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              <Text style={[styles.cellText, styles.email]}>
                {symbol ? symbol : isFocused ? <Cursor /> : null}
              </Text>
            </View>
          )}
        />

        {timer > 0 ? (
          <Text style={[styles.headingLight, styles.center]}>
            {t("Resend code in 00:")}{String(timer).padStart(2, "0")}
          </Text>
        ) : (
          <Text style={[styles.headingLight, styles.center]}>
            {t("Didn’t receive code? ")}
            <Text style={styles.email} onPress={handleResend}>
              {t("Resend code")}
            </Text>
          </Text>
        )}
      </View>
      <View style={styles.absolute}>
        <Button
          disabled={!value}
          title={t("Continue")}
          style={styles.btnViewStyle}
          btnProps={{
            onPress: () =>
              router.push({
                pathname: ROUTES.createPassword,
                params: { check },
              }),
          }}
        />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default Otp;
