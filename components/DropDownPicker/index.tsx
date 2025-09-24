import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { styles } from "./style";
import { colors } from "@/utils/colors";
import { Icons } from "@/assets/svgs";

interface Item {
  name: string;
  [key: string]: any;
}

interface Props {
  label?: string;
  data?: Item[];
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  right?: React.ReactNode;
  error?: string;
  touched?: boolean;
  multiSelect?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  onChange?: (item: Item | Item[]) => void;
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
  multiSelect = false,
  containerStyle,
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );
  const [isOpen, setIsOpen] = useState(false);
  const showError = touched && error;

  const flatListRef = useRef<FlatList<Item>>(null);

  // sync with external value
  useEffect(() => {
    if (multiSelect) {
      setSelected(Array.isArray(value) ? value : []);
    } else {
      setSelected(value ? [value as string] : []);
    }
  }, [value, multiSelect]);

  // auto scroll when dropdown opens
  useEffect(() => {
    if (isOpen && selected.length > 0) {
      const index = data.findIndex((d) => d.name === selected[0]);
      if (index >= 0) {
        setTimeout(() => {
          flatListRef.current?.scrollToIndex({ index, animated: true });
        }, 100);
      }
    }
  }, [isOpen, selected, data]);

  const handleSelect = (item: Item) => {
    if (multiSelect) {
      setSelected((prev) => {
        const exists = prev.includes(item.name);
        const updated = exists
          ? prev.filter((v) => v !== item.name)
          : [...prev, item.name];
        onChange?.(data.filter((d) => updated.includes(d.name)));
        return updated;
      });
    } else {
      setSelected([item.name]);
      setIsOpen(false);
      onChange?.(item);
    }
  };

  const displayText =
    multiSelect && selected.length > 0
      ? selected.join(", ")
      : selected[0] || placeholder;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.title}>{label}</Text>}

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
            { color: selected.length ? colors.black.b10 : colors.black.b70 },
          ]}
          numberOfLines={1}
        >
          {displayText}
        </Text>
        <Icons.downArrow />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {data.length === 0 ? (
            <Text style={styles.noRecordText}>No record found</Text>
          ) : (
            <FlatList
              ref={flatListRef}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled
              renderItem={({ item }) => {
                const isSelected = selected.includes(item.name);
                return (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={[
                      styles.itemRow,
                      isSelected && { backgroundColor: colors.green.g90 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        isSelected && {
                          color: colors.black.b05,
                          fontWeight: "bold",
                        },
                      ]}
                    >
                      {item.name}
                    </Text>
                    {isSelected &&
                      (right ?? (
                        <Icons.tick />
                      ))}
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default DropDownPicker;
