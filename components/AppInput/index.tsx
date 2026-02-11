// components/AppInput.tsx
import { Icons } from "@/assets/svgs";
import React, { useState } from "react";
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./style";

type Props = {
  label?: string;
  inputProps?: TextInputProps;
  password?: boolean; // controls secure text
  error?: string;
  touched?: boolean;
  inputStyle?: any;
  containerStyle?:any;
};

const AppInput: React.FC<Props> = ({
  label,
  inputProps,
  password = false,
  inputStyle,
  containerStyle,
  error,
  touched,
}) => {
  const [securePassword, setSecurePassword] = useState(password);
  const showError = touched && error;

  // Display *** if securePassword is true
  const displayValue =
    securePassword && inputProps?.value
      ? "*".repeat(inputProps.value.length)
      : inputProps?.value;

  return (
    <View style={[styles.container,containerStyle]}>
      {label && <Text style={styles.title}>{label}</Text>}
      <View style={[styles.inputContainer, inputStyle]}>
        <TextInput
          placeholder="Enter"
          placeholderTextColor="#707070"
          {...inputProps}
          value={displayValue}
          style={[styles.inputStyle, inputStyle]}
          secureTextEntry={false} // don't rely on secureTextEntry since we handle ***
        />
        {password && (
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
            {securePassword ? <Icons.eyeOff /> : <Icons.eye />}
          </TouchableOpacity>
        )}
      </View>
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AppInput;
