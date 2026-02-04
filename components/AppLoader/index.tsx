import React from "react";
import { ActivityIndicator, View } from "react-native";
import { styles } from "./style";

interface AppLoaderProps {
  fullScreen?: boolean;
  size?: "small" | "large";
}

const AppLoader: React.FC<AppLoaderProps> = ({
  fullScreen = false,
  size = "large",
}) => {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} />
    </View>
  );
};

export default AppLoader;
