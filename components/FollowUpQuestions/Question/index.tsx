import React, { useEffect, useState } from "react";
import { Icons } from "@/assets/svgs";
import AppInput from "@/components/AppInput";
import Button from "@/components/Button";
import {
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { styles } from "./style";

interface Props {
  question: string;
  index: number;
}

const Question = ({ question, index }: Props) => {
  const { t } = useTranslation();

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const player = useAudioPlayer(recordedUri ?? undefined);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      allowsRecording: true,
    });
  }, []);

  const startRecording = async () => {
    try {
      await audioRecorder.prepareToRecordAsync();
      audioRecorder.record();
    } catch (e) {
      console.warn("Recording error:", e);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorder.stop();
      if (audioRecorder.uri) {
        setRecordedUri(audioRecorder.uri);
        console.log("Recorded URI:", audioRecorder.uri);
      }
    } catch (e) {
      console.warn("Stop recording error:", e);
    }
  };

  const playRecording = async () => {
    if (!recordedUri) return;
    try {
      setIsPlaying(true);
      player.play();
      setIsPlaying(false);
    } catch (e) {
      console.warn("Playback error:", e);
      setIsPlaying(false);
    }
  };

  const stopPlayback = async () => {
    try {
      await player.seekTo(0);
      setIsPlaying(false);
    } catch (e) {
      console.warn("Stop playback error:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{question}</Text>

      <AppInput
        inputProps={{
          placeholder: t("Enter your answer here"),
        }}
        inputStyle={styles.input}
      />

      <Button
        style={styles.buttonContainer}
        textStyle={styles.buttonTitle}
        icon={<Icons.mic />}
        title={
          recorderState.isRecording ? "Stop Recording" : t("Record answer")
        }
        btnProps={{
          onPress: recorderState.isRecording ? stopRecording : startRecording,
        }}
      />
    </View>
  );
};

export default Question;
