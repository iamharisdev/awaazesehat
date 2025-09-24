import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Icons } from "@/assets/svgs";
import { styles } from "./style";

interface Props {
  title: string;
  value?: number; // optional controlled value
  onChange?: (newValue: number) => void;
  min?: number;
  max?: number;
}

const CounterField: React.FC<Props> = ({
  title,
  value,
  onChange,
  min = 0,
  max = 99,
}) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(value ?? min);

  // keep internal state in sync if parent controls the value
  useEffect(() => {
    if (value !== undefined && value !== count) {
      setCount(value);
    }
  }, [value]);

  const updateValue = (newValue: number) => {
    setCount(newValue);
    onChange?.(newValue); // notify parent
  };

  const handleDecrease = () => {
    if (count > min) updateValue(count - 1);
  };

  const handleIncrease = () => {
    if (count < max) updateValue(count + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t(title)}</Text>

      <View style={styles.subContainer}>
        <TouchableOpacity
          style={[styles.button, styles.leftButton]}
          onPress={handleDecrease}
        >
          <Icons.mins />
        </TouchableOpacity>

        <View style={styles.valueBox}>
          <Text style={styles.valueText}>{count}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.rightButton]}
          onPress={handleIncrease}
        >
          <Icons.blackPlus />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CounterField;
