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

type Props = {
  label?: string;
  inputProps?: TextInputProps;
  isPassword?: boolean;
};

const AppInput: React.FC<Props> = ({
  label,
  inputProps,
  isPassword = false,
}) => {
  const [secure, setSecure] = useState(isPassword);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput {...inputProps} secureTextEntry={secure} style={styles.inputStyle}/>
        {isPassword && (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Ionicons
              name={secure ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppInput;
