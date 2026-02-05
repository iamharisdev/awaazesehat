import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, FlatList, TextInput } from "react-native";
import styles from "./style";

export interface Item {
  name: string;
  __addMore?: boolean;
}

interface Props {
  label: string;
  addMore?: string;
  options: Item[];
  value?: string; // comma separated
  editable?: boolean;
  onChange: (items: Item[]) => void;
}

const AppMultiSelect: React.FC<Props> = ({
  label,
  addMore = "",
  options: defaultOptions,
  value,
  editable = true,
  onChange,
}) => {
  const ADD_MORE_ITEM: Item = {
    name: `+ Add more ${addMore}`,
    __addMore: true,
  };

  const [options, setOptions] = useState<Item[]>(defaultOptions);
  const [selected, setSelected] = useState<Item[]>(
    value ? value.split(",").map((n) => ({ name: n })) : [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [newValue, setNewValue] = useState("");

  const listWithAddMore = [...options, ADD_MORE_ITEM];

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const toggleDropdown = () => {
    if (editable) setIsOpen((p) => !p);
  };

  const handleSelect = (item: Item) => {
    if (!editable) return;

    if (item.__addMore) {
      setIsMore(true);
      setIsOpen(false);
      return;
    }

    const exists = selected.some((s) => s.name === item.name);

    const updated = exists
      ? selected.filter((s) => s.name !== item.name)
      : [...selected, item];

    setSelected(updated);
  };

  const handleAddMoreSubmit = () => {
    const val = newValue.trim();
    if (!val) return;

    const exists = options.some(
      (o) => o.name.toLowerCase() === val.toLowerCase(),
    );

    if (!exists) {
      const item = { name: val };
      setOptions((p) => [...p, item]);
      setSelected((p) => [...p, item]);
    }

    setNewValue("");
    setIsMore(false);
  };

  const handleRemoveTag = (index: number) => {
    setSelected((p) => p.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.wrapper}>
      {/* Dropdown */}
      <View style={styles.flex}>
        <Text style={styles.label}>{label}</Text>

        <Pressable
          style={[
            styles.dropdown,
            !editable && styles.disabled,
            isOpen && styles.openDropdown,
          ]}
          onPress={toggleDropdown}
        >
          {selected.length > 0 ? (
            <View style={styles.tagWrap}>
              {selected.map((item, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{item.name}</Text>
                  <Pressable
                    onPress={() => handleRemoveTag(index)}
                    disabled={!editable}
                  >
                    <Text style={styles.tagRemove}>×</Text>
                  </Pressable>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.placeholder}>Select</Text>
          )}

          <Text style={styles.chevron}>⌄</Text>
        </Pressable>

        {isOpen && (
          <View style={styles.menu}>
            <FlatList
              data={listWithAddMore}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => {
                const isSelected = selected.some((s) => s.name === item.name);

                return (
                  <Pressable
                    onPress={() => handleSelect(item)}
                    style={[styles.option, item.__addMore && styles.addMore]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        item.__addMore && styles.addMoreText,
                      ]}
                    >
                      {item.__addMore ? `+ Add more ${addMore}` : item.name}
                    </Text>

                    {!item.__addMore && (
                      <View
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected,
                        ]}
                      >
                        {isSelected && <Text style={styles.check}>✓</Text>}
                      </View>
                    )}
                  </Pressable>
                );
              }}
            />
          </View>
        )}
      </View>

      {/* Add more input */}
      {isMore && (
        <View style={styles.flex}>
          <Text style={styles.label}>Add more</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter"
            value={newValue}
            autoFocus
            onChangeText={setNewValue}
            onSubmitEditing={handleAddMoreSubmit}
            returnKeyType="done"
          />
        </View>
      )}
    </View>
  );
};

export default AppMultiSelect;
