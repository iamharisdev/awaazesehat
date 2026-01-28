import { Icons } from "@/assets/svgs";
import { useAudioPlayback } from "@/utils/audioPlayer";
import { colors } from "@/utils/colors";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

interface Props {
  uri: string | null;
}

export default function RecordingPlayerCard({ uri }: Props) {
  const { player, play, pause, reset, playbackTime, duration, formatTime } =
    useAudioPlayback(uri);

  const [isSeeking, setIsSeeking] = useState(false);
  const [seekPosition, setSeekPosition] = useState(0);

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeek = (value: number) => {
    setSeekPosition(value);
  };

  const handleSeekComplete = async (value: number) => {
    setIsSeeking(false);
    if (player.isLoaded) {
      await player.seekTo(value);
    }
  };

  if (player.currentTime >= player.duration && player.duration > 0) {
    reset();
  }

  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <TouchableOpacity onPress={player.playing ? pause : play}>
          {player.playing ? (
            <Ionicons name={"pause"} size={25} color="#000" />
          ) : (
            <Icons.play />
          )}
        </TouchableOpacity>

        <View style={styles.seekContainer}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration || 0}
            value={isSeeking ? seekPosition : playbackTime}
            minimumTrackTintColor={colors.black.b60}
            maximumTrackTintColor={colors.black.b70}
            thumbTintColor={colors.black.b50}
            onSlidingStart={handleSeekStart}
            onValueChange={handleSeek}
            onSlidingComplete={handleSeekComplete}
          />

          <Text style={styles.timeText}>
            {formatTime(!player.playing ? duration : playbackTime)}
          </Text>
          <TouchableOpacity onPress={reset}>
            <Icons.delete />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
