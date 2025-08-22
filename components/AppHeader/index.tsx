// components/AppHeader.tsx
import { Icons } from "@/assets/svgs";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { styles } from "./style";
import Button from "../Button";

type Props = {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

const AppHeader: React.FC<Props> = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
}) => {
  const IconRender = (check: string) => {
    if (leftIcon || rightIcon) {
      return (
        <Button
          style={styles.btnStyle}
          icon={check == "left" ? leftIcon : rightIcon}
          btnProps={{ onPress: check == "left" ? onLeftPress : onRightPress }}
        />
      );
    } else {
      return <View style={styles.space} />;
    }
  };

  return (
    <View style={styles.container}>
      {IconRender("left")}

      {title ? <Text>{title}</Text> : null}

      {IconRender("right")}
    </View>
  );
};

export default AppHeader;
