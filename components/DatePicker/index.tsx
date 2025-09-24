import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { styles } from "./style";
import { Icons } from "@/assets/svgs";

interface Props {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

const DatePicker: React.FC<Props> = ({ label, value=new Date(), onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.inputText}>
          {value.toLocaleDateString("en-GB")}
        </Text>
      <Icons.calender/>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value}
          mode="date"
          display="calendar"
          onChange={handleChange}
       
          
        />
      )}
    </View>
  );
};



export default DatePicker;
