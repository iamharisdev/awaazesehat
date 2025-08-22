import { Icons } from "@/assets/svgs";
import { AppHeader, Button, KeyboardAvoidingWrapper } from "@/components";
import { styles } from "@/styles/otpStyle";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

const Otp = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

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
      <AppHeader leftIcon={<Icons.left />} rightIcon={<Icons.cross />} />

      <View style={styles.subContainer}>
        <Text style={styles.heading}>{t("We just sent you a code")}</Text>
        <Text style={styles.headingLight}>
          {t("You will receive a mail with a verification pin at ")}
          <Text style={styles.email}>{email}</Text>
        </Text>

        <CodeField
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
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
            {t("Resend code in ")} {String(timer).padStart(2, "0")}s
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
            onPress: () => router.push("/createPassword"),
          }}
        />
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default Otp;
