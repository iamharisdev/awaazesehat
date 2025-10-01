// hooks/useAudioRecording.ts
import { useState, useEffect, useCallback } from "react";
import {
  useAudioRecorder,
  useAudioRecorderState,
  RecordingPresets,
  AudioModule,
  setAudioModeAsync,
} from "expo-audio";

export const useAudioRecording = () => {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const state = useAudioRecorderState(recorder);

  const [uri, setUri] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        console.warn("Microphone permission denied");
        return;
      }

      await setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);


  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isRecording]);

  const startRecording = useCallback(async () => {
    setUri(null); // reset previous recording
    await recorder.prepareToRecordAsync();
    recorder.record();
     setRecordingTime(0);
  }, [recorder]);

  const stopRecording = useCallback(async () => {
    await recorder.stop();
    if (recorder.uri) {
      setUri(recorder.uri);
    }
  }, [recorder]);

  const toggleRecording = useCallback(async () => {
    if (state.isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  }, [state.isRecording, startRecording, stopRecording]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return {
    recorder,
    recorderState: state,
    uri,
    recordingTime,
    startRecording,
    stopRecording,
    toggleRecording,
    formatTime,
  };
};
