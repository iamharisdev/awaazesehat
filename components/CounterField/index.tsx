import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Icons } from "@/assets/svgs";
import { styles } from "./style";

interface Props {
  title: string;
  value?: number | string;          // ✅ string bhi accept
  onChange?: (newValue: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;               // ✅ added
}

const CounterField: React.FC<Props> = ({
  title,
  value,
  onChange,
  min = 0,
  max = 99,
  disabled = false,
}) => {
  const { t } = useTranslation();

  // ✅ parse string → number safely
  const parseValue = (val?: number | string) => {
    if (val === undefined || val === null) return min;
    const parsed =
      typeof val === "string" ? parseInt(val, 10) : val;
    return isNaN(parsed) ? min : parsed;
  };

  const [count, setCount] = useState<number>(parseValue(value));

  // ✅ sync with parent value
  useEffect(() => {
    const parsed = parseValue(value);
    if (parsed !== count) {
      setCount(parsed);
    }
  }, [value]);

  const updateValue = (newValue: number) => {
    setCount(newValue);
    onChange?.(newValue);
  };

  const handleDecrease = () => {
    if (disabled) return;
    if (count > min) {
      updateValue(count - 1);
    }
  };

  const handleIncrease = () => {
    if (disabled) return;
    if (count < max) {
      updateValue(count + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          disabled && styles.disabledText, // 👈 optional if exists
        ]}
      >
        {t(title)}
      </Text>

      <View style={styles.subContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.leftButton,
            disabled && styles.disabledButton, // 👈 optional
          ]}
          onPress={handleDecrease}
          disabled={disabled}
        >
          <Icons.mins />
        </TouchableOpacity>

        <View style={styles.valueBox}>
          <Text
            style={[
              styles.valueText,
              disabled && styles.disabledText,
            ]}
          >
            {count}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            styles.rightButton,
            disabled && styles.disabledButton,
          ]}
          onPress={handleIncrease}
          disabled={disabled}
        >
          <Icons.blackPlus />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CounterField;
