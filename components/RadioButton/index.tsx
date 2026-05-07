import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./style";

interface Option {
  label: string;
  value: string;
}

interface RadioButtonProps {
  label?: string;
  options?: any;
  value?: string|null;
  onChange?: (val: string) => void;
  error?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  options = [],
  value,
  onChange,
  error,
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.title}>{label}</Text>}
    <View style={styles.optionsWrapper}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt}
          onPress={() => onChange && onChange(opt)}
          style={styles.option}
        >
          <View
            style={[styles.circle, value === opt && styles.circleSelected]}
          />
          <Text style={styles.label}>{opt}</Text>
        </TouchableOpacity>
      ))}
    </View>
    {error ? (
      <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>{error}</Text>
    ) : null}
  </View>
);

export default RadioButton;
