import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./style";
import BottomSheet from "../BottomSheet";
import { Icons } from "@/assets/svgs";
import { enableNotifications } from "@/utils/functions";
import Button from "../Button";
import { useTranslation } from "react-i18next";

export type NotificationSheetRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  onAllow?: () => void;
  onClose?: () => void;
};

const NotificationPopup = forwardRef<NotificationSheetRef, Props>(
  ({ onAllow, onClose }, ref) => {
    const sheetRef = useRef(null);
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.open(),
      close: () => sheetRef.current?.close(),
    }));

    return (
      <BottomSheet ref={sheetRef} sheetHeight={350}>
        <View style={styles.flex}>
          <Text style={styles.title}>{t("Turn on notifications")}</Text>
          <Button
            style={styles.closeButton}
            icon={<Icons.cross />}
            btnProps={{
              onPress: async () => {
                sheetRef.current?.close();
                onClose?.();
              },
            }}
          />
        </View>

        <View style={styles.iconWrapper}>
          <Icons.notification />
        </View>

        <Text style={styles.description}>
          {t(
            "Enable notifications to receive timely patient alerts, follow-up reminders, and important updates directly on your device."
          )}
        </Text>

        <Button
          title={t("Allow notifications")}
          style={styles.primaryBtn}
          btnProps={{
            onPress: async () => {
              const token = await enableNotifications();
              console.log("✅ Notifications enabled, token:", token);
              onAllow?.();
              sheetRef.current?.close();
            },
          }}
        />

        <Button
          title={t("Not now")}
          style={styles.linkButton}
          textStyle={styles.link}
          btnProps={{
            onPress: async () => {
              onClose?.();
              sheetRef.current?.close();
            },
          }}
        />
      </BottomSheet>
    );
  }
);

export default NotificationPopup;
