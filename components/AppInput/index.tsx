// components/AppInput.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { Icons } from "@/assets/svgs";

type Props = {
  label?: string;
  inputProps?: TextInputProps;
  password?: boolean;
  error?: string;
  touched?: boolean;
};

const AppInput: React.FC<Props> = ({
  label,
  inputProps,
  password = false,
  error,
  touched
}) => {
  const [securePassword, setSecurePassword] = useState(password);
  
  const showError = touched && error;


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          {...inputProps}
          secureTextEntry={securePassword}
          style={styles.inputStyle}
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
