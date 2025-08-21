// components/AppHeader.tsx
import { Icons } from "@/assets/svgs";
import React from "react";
import { Text, View } from "react-native";
import ReuseableButton from "../ReuseableButton";
import { styles } from "./style";


type Props = {
  title?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
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
  return (
    <View style={styles.container}>
      {leftIcon ? (
        <ReuseableButton
          style={styles.btnStyle}
          leftComponent={<Icons.left />}
          btnProps={{ onPress: onLeftPress }}
        />
      ) : (
        <View style={styles.space} />
      )}

      {title ? <Text>{title}</Text> : null}

      {rightIcon ? (
        <ReuseableButton
          style={styles.btnStyle}
          leftComponent={<Icons.cross />}
          btnProps={{ onPress: onRightPress }}
        />
      ) : (
        <View style={styles.space} />
      )}
    </View>
  );
};

export default AppHeader;
