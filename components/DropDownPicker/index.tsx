import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { colors } from "@/utils/colors";
import { Icons } from "@/assets/svgs";

interface Item {
  name?: string;
  [key: string]: any;
}

interface Props {
  label?: string;
  data?: Item[];
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  right?: React.ReactNode;
  error?: string;
  touched?: boolean;
  onChange?: (item: Item) => void;
}

const DropDownPicker: React.FC<Props> = ({
  label,
  data = [],
  value,
  placeholder = "Select",
  disabled = false,
  right,
  error,
  touched,
  onChange,
}) => {
  const [isSelected, setIsSelected] = useState<string | undefined>(value);
  const [isOpen, setIsOpen] = useState(false);
  const showError = touched && error;

  useEffect(() => {
    setIsSelected(value);
  }, [value]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.title}>{label}</Text>}

      {/* Input-like clickable field */}
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setIsOpen(!isOpen)}
        style={[
          styles.inputContainer,
          showError && { borderColor: colors.red.r40 },
          {
            borderBottomLeftRadius: isOpen ? 0 : 8,
            borderBottomRightRadius: isOpen ? 0 : 8,
          },
        ]}
      >
        <Text
          style={[
            styles.inputStyle,
            {
              color: isSelected ? colors.black.b10 : colors.black.b70,
            },
          ]}
        >
          {isSelected || placeholder}
        </Text>
        <Icons.downArrow />
      </TouchableOpacity>

      {/* Dropdown list */}
      {isOpen && (
        <View style={[styles.dropdown]}>
          {data.length === 0 ? (
            <Text style={styles.noRecordText}>No record found</Text>
          ) : (
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="always"
            >
              {data.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setIsOpen(false);
                      setIsSelected(item.name);
                    }}
                    style={styles.itemRow}
                  >
                    <Text style={styles.itemText}>{item.name}</Text>
                    {right}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>
      )}

      {/* {showError && <Text style={styles.errorText}>{error}</Text>} */}
    </View>
  );
};

export default DropDownPicker;
