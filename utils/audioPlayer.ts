// utils/useAudioPlayback.ts
import { useAudioPlayer } from "expo-audio";
import { useState, useEffect, useRef, useCallback } from "react";

export const useAudioPlayback = (uri: string | null) => {
  const player = useAudioPlayer(uri ?? undefined);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // ▶️ Play
  const play = useCallback(async () => {
    if (!uri) return;
    try {
      await player.play();
      setPaused(false);
    } catch (e) {
      console.log("Play error", e);
    }
  }, [uri, player]);

  // ⏸ Pause
  const pause = useCallback(async () => {
    try {
      await player.pause();
      setPaused(true);
    } catch (e) {
      console.log("Pause error", e);
    }
  }, [player]);

  // ⏹ Reset
  const reset = useCallback(async () => {
    try {
      await player.pause();
      await player.seekTo(0);
      setPlaybackTime(0);
      setPaused(false);
    } catch (e) {
      console.log("Reset error", e);
    }
  }, [player]);

  // 🧭 Timer and duration tracking
  useEffect(() => {
    if (player.isLoaded) {
      setDuration(player.duration);
    }

    if (player.playing) {
      timerRef.current = setInterval(() => {
        setPlaybackTime(player.currentTime);
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [player.playing, player.isLoaded]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return {
    player,
    play,
    pause,
    reset,
    playbackTime,
    duration,
    paused,
    formatTime,
  };
};
