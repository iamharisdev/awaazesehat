// components/ReusableButton.tsx
import { hp, normalizeFont, pxToHp } from "@/utils/responsive";
import { Spacing } from "@/utils/spacing";
import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  StyleProp,
} from "react-native";

interface CustomButtonProps {
  title: string;
  style?: ViewStyle;
  textStyle?: StyleProp<TextStyle>;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  btnProps?: TouchableOpacityProps;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  style,
  textStyle,
  disabled = false,
  variant = "primary",
  btnProps,
  leftComponent,
  rightComponent,
}) => {
  return (
    <TouchableOpacity
      {...btnProps}
      style={[
        styles.button,
        variant === "primary" ? styles.primaryButton : styles.secondaryButton,
        disabled &&
          (variant === "primary"
            ? styles.primaryDisabled
            : styles.secondaryDisabled),
        { justifyContent: leftComponent ? "space-between" : "center" },
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {leftComponent}
      <Text
        style={[
          styles.buttonText,
          variant === "primary" ? styles.primaryText : styles.secondaryText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
      {rightComponent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: hp(pxToHp(48)),
    flexDirection: "row",
    paddingVertical: Spacing.SmallMedium,
    paddingHorizontal: Spacing.Medium2,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: "#10B981",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#10B981",
  },
  // ✅ Disabled states with custom colors
  primaryDisabled: {
    backgroundColor: "#0B6E27",
  },
  secondaryDisabled: {
    backgroundColor: "#A2D7B1",
    borderColor: "#A2D7B1",
  },
  buttonText: {
    fontSize: normalizeFont(15),
    fontFamily:'Medium',
    fontWeight: "600",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#10B981",
  },
  disabledText: {
    color: "#FFFFFF", // keep readable text on disabled
  },
});

export default CustomButton;
