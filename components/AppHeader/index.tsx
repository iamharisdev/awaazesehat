import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { styles } from "./style";
import Button from "../Button";
import { useRouter } from "expo-router";

type Props = {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  titleStyle?: object;
  containerStyle?: object;
};

const AppHeader: React.FC<Props> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  titleStyle,
  containerStyle,
}) => {
  const router = useRouter();

  const renderIconButton = (
    icon?: ReactNode,
    onPress?: () => void,
    fallbackPress?: () => void,
    accessibilityLabel?: string
  ) => {
    if (icon) {
      return (
        <Button
          style={styles.btnStyle}
          icon={icon}
          btnProps={{
            onPress: onPress || fallbackPress,
            accessibilityLabel,
          }}
        />
      );
    }
    return <View style={styles.space} />;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {renderIconButton(leftIcon, onLeftPress, () => router.back(), "Go back")}

      {title ? <Text style={[titleStyle]}>{title}</Text> : null}

      {renderIconButton(rightIcon, onRightPress, undefined, "Right action")}
    </View>
  );
};

export default AppHeader;
