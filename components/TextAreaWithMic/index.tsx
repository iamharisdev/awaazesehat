import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import styles from "./style";
import { useAudioToTextMutation } from "@/services/modules/patient";

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

  const recordingRef = useRef<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const isSingleLine = height <= 50;

  /* 🎤 Start recording */
  const startRecording = async () => {
    if (disabled) return;

    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required", "Microphone access is needed.");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      await recording.startAsync();

      recordingRef.current = recording;
      setIsRecording(true);
    } catch (err) {
      Alert.alert("Error", "Failed to start recording");
    }
  };

  /* ⏹ Stop recording */
  const stopRecording = async () => {
    try {
      const recording = recordingRef.current;
      if (!recording) return;

      await recording.stopAndUnloadAsync();
      setIsRecording(false);

      const uri = recording.getURI();
      if (!uri) return;

      const file = { uri, type: "audio/m4a", name: "recording.m4a" };

      // 🔹 Call RTK Query endpoint
      const result = await audioToText({ file: file }).unwrap();

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
          <Text style={styles.micIcon}>{isRecording ? "■" : "🎤"}</Text>
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
