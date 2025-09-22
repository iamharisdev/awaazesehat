import React from "react";
import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Icons } from "@/assets/svgs";
import { colors } from "@/utils/colors";
import { styles } from "./style";

interface SearchInputProps extends TextInputProps {
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search....",
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Icons.search onPress={() => {}} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.black.b40}
        {...props}
      />
    </View>
  );
};
