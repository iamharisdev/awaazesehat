import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from "react-native";

import { colors } from "@/utils/colors";
import { Icons } from "@/assets/svgs";
import { hp, wp } from "@/utils/responsive";
import Button from "../Button";
import { styles } from "./style";
import KeyboardAvoidingWrapper from "../KeyboardAvoidingWrapper";
import { useTranslation } from "react-i18next";

const { height } = Dimensions.get("window");

interface Item {
  name: string;
}

interface Props {
  title?: string;
  data: Item[];
  value?: string | string[];
  multiSelect?: boolean;
  onSave?: (val: string | string[]) => void;
  onCrossPress?: () => void;
  sheetHeight?: number;
}

const SelectionPopup: React.FC<Props> = ({
  title,
  data,
  value,
  multiSelect = false,
  onSave,
  onCrossPress,
  sheetHeight = height * 0.5,
}) => {
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  const listRef = useRef<FlatList<Item>>(null);
  const { t } = useTranslation();

  // Scroll to first selected item when open
  useEffect(() => {
    if (selected.length > 0) {
      const firstIndex = data.findIndex((d) => d.name === selected[0]);
      if (firstIndex >= 0) {
        setTimeout(() => {
          listRef.current?.scrollToIndex({
            index: firstIndex,
            animated: true,
          });
        }, 200);
      }
    }
  }, [selected, data]);

  const toggleSelect = (item: Item) => {
    if (multiSelect) {
      setSelected((prev) =>
        prev.includes(item.name)
          ? prev.filter((v) => v !== item.name)
          : [...prev, item.name]
      );
    } else {
      setSelected([item.name]);
      onSave?.(item.name);
    }
  };

  const handleSave = () => {
    onSave?.(multiSelect ? selected : selected[0]);
  };

  const renderItem = ({ item }: { item: Item }) => {
    const isSelected = selected.includes(item.name);
    return (
      <TouchableOpacity
        onPress={() => toggleSelect(item)}
        style={[
          styles.itemRow,
          !multiSelect && isSelected && { backgroundColor: colors.green.g90 },
        ]}
      >
        <Text
          style={[
            styles.itemText,
            isSelected && { fontWeight: "bold", color: colors.green.g10 },
          ]}
        >
          {item.name}
        </Text>

        {multiSelect ? (
          <View
            style={[
              styles.multiSelect,
              {
                backgroundColor: isSelected ? colors.green.g20 : "transparent",
              },
            ]}
          >
            <Icons.whiteTick />
          </View>
        ) : (
          isSelected && <Icons.tick />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.flex}>
        {title && <Text style={styles.title}>{title}</Text>}
        <Button
          style={styles.closeButton}
          icon={<Icons.cross />}
          btnProps={{
            onPress: onCrossPress,
          }}
        />
      </View>
      <View style={{ height: sheetHeight - 120 }}>
        <FlatList
          // ref={listRef}
          data={data}
          keyExtractor={(item) => item.name}
          nestedScrollEnabled
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {multiSelect && (
        <Button
          title={t("Save")}
          btnProps={{
            onPress: handleSave,
          }}
        />
      )}
    </View>
  );
};

export default SelectionPopup;
