import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLazyListPregnancyDiagnosesQuery } from "@/services/modules/pregnancyDiagnoses";
import type { PregnancyDiagnosis } from "@/features/patientSlice";
import { styles } from "./style";

const LIMIT = 20;

interface Props {
  label?: string;
  value: PregnancyDiagnosis[];
  onChange: (items: PregnancyDiagnosis[]) => void;
  disabled?: boolean;
  error?: string;
}

const PregnancyDiagnosisDropdown: React.FC<Props> = ({
  label = "Diagnosis in pregnancy?",
  value,
  onChange,
  disabled = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState<PregnancyDiagnosis[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [trigger, { isFetching }] = useLazyListPregnancyDiagnosesQuery();

  const fetchOptions = async (q: string, pg: number, append: boolean) => {
    try {
      const res = await trigger({ page: pg, limit: LIMIT, search: q }).unwrap();
      const list: PregnancyDiagnosis[] = res?.data ?? [];
      const total: number = res?.total ?? list.length;
      setOptions((prev) => (append ? [...prev, ...list] : list));
      setPage(pg);
      setHasMore(pg * LIMIT < total);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchOptions(search, 1, false);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, isOpen]);

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen((p) => !p);
  };

  const isSelected = (id: string) => value.some((v) => v.id === id);

  const handleSelect = (item: PregnancyDiagnosis) => {
    if (isSelected(item.id)) {
      onChange(value.filter((v) => v.id !== item.id));
    } else {
      onChange([...value, item]);
    }
  };

  const handleRemove = (id: string) => {
    onChange(value.filter((v) => v.id !== id));
  };

  const loadMore = () => {
    if (hasMore && !isFetching) {
      fetchOptions(search, page + 1, true);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={[
          styles.dropdown,
          disabled && styles.disabled,
          isOpen && styles.openDropdown,
          !!error && styles.errorBorder,
        ]}
        onPress={toggleDropdown}
      >
        {value.length > 0 ? (
          <View style={styles.tagWrap}>
            {value.map((item) => (
              <View key={item.id} style={styles.tag}>
                <Text style={styles.tagText}>
                  {item.icdCode ? `${item.icdCode} - ` : ""}
                  {item.name}
                </Text>
                <Pressable
                  onPress={() => handleRemove(item.id)}
                  disabled={disabled}
                  hitSlop={6}
                >
                  <Text style={styles.tagRemove}>×</Text>
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.placeholder}>Search diagnosis...</Text>
        )}
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={16}
          color="#8A8A8A"
        />
      </Pressable>

      {isOpen && (
        <View style={styles.menu}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={14} color="#8A8A8A" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search diagnosis..."
              placeholderTextColor="#8A8A8A"
              value={search}
              onChangeText={setSearch}
              autoFocus
            />
          </View>

          {isFetching && options.length === 0 ? (
            <View style={styles.loadingBox}>
              <ActivityIndicator size="small" color="#0B6E27" />
            </View>
          ) : options.length === 0 ? (
            <Text style={styles.empty}>No results</Text>
          ) : (
            <FlatList
              data={options}
              keyExtractor={(it) => it.id}
              nestedScrollEnabled
              keyboardShouldPersistTaps="handled"
              onEndReached={loadMore}
              onEndReachedThreshold={0.3}
              renderItem={({ item }) => {
                const selected = isSelected(item.id);
                return (
                  <Pressable
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.optionText} numberOfLines={2}>
                      {item.icdCode ? (
                        <Text style={styles.code}>{item.icdCode} </Text>
                      ) : null}
                      {item.name}
                    </Text>
                    <View
                      style={[
                        styles.checkbox,
                        selected && styles.checkboxSelected,
                      ]}
                    >
                      {selected && <Text style={styles.check}>✓</Text>}
                    </View>
                  </Pressable>
                );
              }}
              ListFooterComponent={
                isFetching && options.length > 0 ? (
                  <View style={styles.loadingBox}>
                    <ActivityIndicator size="small" color="#0B6E27" />
                  </View>
                ) : null
              }
            />
          )}
        </View>
      )}

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PregnancyDiagnosisDropdown;
