import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { styles } from "./style";

type Props = {
  children: React.ReactNode;
  scrollEnable?: boolean;
  containerStyle?: any;
};

const KeyboardAvoidingWrapper: React.FC<Props> = ({
  children,
  scrollEnable = true,
  containerStyle,
}) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={"padding"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={scrollEnable}
        >
          <View style={[styles.subContainer, containerStyle]}>{children}</View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;
