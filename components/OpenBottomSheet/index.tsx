import { Icons } from "@/assets/svgs";
import { colors } from "@/utils/colors";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../DropDownPicker/style";

interface Props {
  label?: string;
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  right?: React.ReactNode;
  error?: string;
  touched?: boolean;
  onPress?: () => void;
}

const OpenBottomSheet = ({
  label,
  value,
  disabled,
  placeholder = "Select",
  onPress,
}: Props) => {

  const displayValue = Array.isArray(value) ? value.join(", ") : value;

  return (
    <View style={[styles.container]}>
      {label && <Text style={styles.title}>{label}</Text>}

      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.inputContainer]}
      >
        <Text
          style={[
            styles.inputStyle,
            { color: !displayValue && colors.black.b70 },
          ]}
          numberOfLines={1}
        >
          {displayValue || placeholder}
        </Text>
        <Icons.downArrow />
      </TouchableOpacity>
    </View>
  );
};

export default OpenBottomSheet;
