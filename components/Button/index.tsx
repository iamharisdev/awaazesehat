// components/ReusableButton.tsx
import React, { ReactNode } from "react";
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { styles } from "./style";
import { colors } from "@/utils/colors";

interface CustomButtonProps {
  title?: string;
  style?: ViewStyle;
  textStyle?: StyleProp<TextStyle>;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  btnProps?: TouchableOpacityProps;
  icon?: ReactNode;
}

const Button: React.FC<CustomButtonProps> = ({
  title,
  style,
  textStyle,
  disabled = false,
  btnProps,
  icon,
}) => {
  return (
    <TouchableOpacity
      {...btnProps}
      style={[
        styles.button,
        {
          justifyContent:  "center",
          backgroundColor: disabled ? colors.green.g70 : colors.green.g20,
        },
        style,
      ]}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon}
      {title && <Text style={[styles.buttonText, textStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;
