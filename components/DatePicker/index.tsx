import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { styles } from "./style";
import { Icons } from "@/assets/svgs";
interface Props {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  error?: string;
}

const DatePicker: React.FC<Props> = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Select date",
  error,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (event?.type === "dismissed") return;
    if (selectedDate) {
      onChange?.(selectedDate);
    }
  };

  const openPicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: value || new Date(),
        mode: "date",
        display: "calendar",
        minimumDate: minDate,
        maximumDate: maxDate,
        onChange: handleChange,
      });
    } else {
      setShowPicker(true);
    }
  };

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TouchableOpacity style={styles.input} onPress={openPicker}>
        <Text
          style={[
            styles.inputText,
            !value && { color: "#9A9A9A" },
          ]}
        >
          {value ? value.toLocaleDateString("en-GB") : placeholder}
        </Text>
        <Icons.calender />
      </TouchableOpacity>
      {error ? (
        <Text style={{ color: "red", fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      ) : null}

      {Platform.OS === "ios" && showPicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      )}
    </View>
  );
};

export default DatePicker;
