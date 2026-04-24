import { Icons } from "@/assets/svgs";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import BottomSheet from "../BottomSheet";
import Button from "../Button";
import { styles } from "./style";

export type NotificationSheetRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  onClose?: () => void;
};

const PasswordChangePopup = forwardRef<NotificationSheetRef, Props>(
  ({ onClose }, ref) => {
    const sheetRef = useRef<{ open: () => void; close: () => void }>(null);
    const { t } = useTranslation();

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.open(),
      close: () => sheetRef.current?.close(),
    }));

    return (
      <BottomSheet ref={sheetRef} sheetHeight={260}>
        <View style={styles.flex}>
          <Text style={styles.title}>{t("Password changed")}</Text>
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
          <Icons.mobile />
        </View>

        <Text style={styles.description}>
          {t("Your password has been changed successfully.")}
        </Text>

        <Button
          title={t("Back to log in")}
          style={styles.primaryBtn}
          btnProps={{ onPress: () => { sheetRef.current?.close(); onClose?.(); } }}
        />
      </BottomSheet>
    );
  }
);

export default PasswordChangePopup;
