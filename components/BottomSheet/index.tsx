import React, { forwardRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { styles } from "./style";

const { height } = Dimensions.get("window");

type BottomSheetProps = {
  children: React.ReactNode;
  sheetHeight?: number;
};

const BottomSheet = forwardRef<RBSheet, BottomSheetProps>(
  ({ children, sheetHeight = height * 0.4 }, ref) => {
    return (
      <RBSheet
        ref={ref} // ✅ forward ref to RBSheet
        height={sheetHeight}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: { backgroundColor: "rgba(0,0,0,0.5)" },
          draggableIcon: { backgroundColor: "#999" },
          container: styles.containerStyle,
        }}
      >
        <View style={styles.container}>{children}</View>
      </RBSheet>
    );
  }
);

export default BottomSheet;

