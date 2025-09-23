// components/RadioGroup.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

interface Option {
  label: string;
  value: string;
}

interface RadioButtonProps {
  label?: string;
  options?: Option[];
  value?: string;
  onChange?: (val: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <View style={styles.container}>
    <Text style={{ fontSize: 14, marginBottom: 6 }}>{label}</Text>
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onChange(opt.value)}
          style={{ flexDirection: "row", alignItems: "center", marginRight: 16 }}
        >
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              borderWidth: 1,
              borderColor: "#333",
              marginRight: 6,
              backgroundColor: value === opt.value ? "green" : "white",
            }}
          />
          <Text>{opt.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);


export default RadioButton