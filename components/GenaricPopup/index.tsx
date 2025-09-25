import React, {
  ReactNode
} from "react";
import { Text, View } from "react-native";
import { Icons } from "@/assets/svgs";
import Button from "../Button";
import { styles } from "./style";

type Props = {
  title?: string;
  description?: string;
  btnTitle1?: string;
  btnTitle2?: string;
  icon?: ReactNode;
  onCrossPress?: () => void;
  openPress?: () => void;
  closePress?: () => void;
};

const GenericPopup = ({
  title,
  description,
  btnTitle1,
  btnTitle2,
  icon,
  onCrossPress,
  openPress,
  closePress,
}: Props) => {
  return (
    <View>
      <View style={styles.flex}>
        <Text style={styles.title}>{title}</Text>
        <Button
          style={styles.closeButton}
          icon={<Icons.cross />}
          btnProps={{
            onPress: onCrossPress,
          }}
        />
      </View>

      {icon && <View style={styles.iconWrapper}>{icon}</View>}

      {description && <Text style={styles.description}>{description}</Text>}
      {btnTitle1 && (
        <Button
          title={btnTitle1}
          style={styles.primaryBtn}
          btnProps={{
            onPress: openPress,
          }}
        />
      )}

      {btnTitle2 && (
        <Button
          title={btnTitle2}
          style={styles.linkButton}
          textStyle={styles.link}
          btnProps={{
            onPress: closePress,
          }}
        />
      )}
    </View>
  );
};

export default GenericPopup;
