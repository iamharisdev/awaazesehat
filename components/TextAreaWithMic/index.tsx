import { useAudioToTextMutation } from "@/services/modules/patient";
import { useAudioRecording } from "@/utils/audioRecorder"; // new hook replacing expo-av functionality
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "./style";

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onAudioSave?: (text: string) => void;
  height?: number;
  disabled?: boolean;
}

const TextAreaWithMic: React.FC<Props> = ({
  label = "Physical examination findings?",
  placeholder = "Enter here",
  value,
  onChange,
  onAudioSave,
  height = 120,
  disabled = false,
}) => {
  const [audioToText, { isLoading: isPending }] = useAudioToTextMutation();

  // use custom hook which wraps expo-audio functionality
  const {
    recorder,
    recorderState,
    startRecording: hookStartRecording,
    stopRecording: hookStopRecording,
  } = useAudioRecording();

  const isRecording = recorderState.isRecording;

  const isSingleLine = height <= 50;

  /* 🎤 Start recording */
  // wrapper that delegates to hook
  const startRecording = async () => {
    if (disabled) return;
    try {
      await hookStartRecording();
    } catch (err) {
      Alert.alert("Error", "Failed to start recording");
    }
  };

  /* ⏹ Stop recording */
  const stopRecording = async () => {
    try {
      await hookStopRecording();

      const uri = recorder.uri;
      if (!uri) return;

      const file = { uri, type: "audio/m4a", name: "recording.m4a" };

      // 🔹 Call RTK Query endpoint
      const result = await audioToText({ file }).unwrap();

      if (result?.text) {
        const newText = value ? `${value} ${result.text}` : result.text;
        onAudioSave?.(newText);
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to convert audio to text");
    }
  };

  return (
    <View style={[styles.container, disabled && styles.disabled]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputWrapper}>
        <TextInput
          value={value ?? ""}
          placeholder={placeholder}
          editable={!disabled}
          multiline={!isSingleLine}
          style={[styles.input, { height }, !isSingleLine && styles.textarea]}
          placeholderTextColor="#707070"
          onChangeText={(text) => !disabled && onChange?.(text)}
        />

        {/* 🎤 Mic button */}
        <Pressable
          onPress={isRecording ? stopRecording : startRecording}
          style={[styles.micButton, isRecording && styles.micRecording]}
          disabled={disabled}
        >
          {isRecording ? (
            <Icon name="square" size={20} />
          ) : (
            <Icon name="mic" size={20} />
          )}
        </Pressable>

        {/* ⏳ Loader overlay */}
        {isPending && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="small" color="#0B6E27" />
            <Text style={styles.loaderText}>Processing...</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default TextAreaWithMic;
