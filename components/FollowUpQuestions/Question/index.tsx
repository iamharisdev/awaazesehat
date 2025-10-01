// Question.tsx
import AppInput from "@/components/AppInput";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { styles } from "./style";
import RecordingPlayerCard from "@/components/RecordingPlayerCard";
import { useAudioRecording } from "@/utils/audioRecorder";
import Button from "@/components/Button";
import { Icons } from "@/assets/svgs";

interface Props {
  question: string;
  index: number;
}

const Question = ({ question }: Props) => {
  const { t } = useTranslation();
  const { uri, recordingTime, recorderState, toggleRecording, formatTime } =
    useAudioRecording();

  const handleRecord = async () => {
    await toggleRecording();
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
          recorderState.isRecording ? t("Stop Recording") : t("Record Answer")
        }
        btnProps={{ onPress: handleRecord }}
      />
      {recorderState.isRecording && (
        <Text style={styles.timeText}>{formatTime(recordingTime)}</Text>
      )}
      {uri && <RecordingPlayerCard uri={uri} />}
    </View>
  );
};

export default Question;
