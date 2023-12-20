import Button from "@Components/Button/Button";
import Text from "@Components/Text";
import { BORDER_COLOR, WHITE } from "@Constant/Color";
import { _moderateScale, _width } from "@Constant/Scale";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type Props = {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  colors?: any;
};

const ActionButton = ({ title, onPress, disabled, colors }: Props) => {
  return (
    <View style={styles.container}>
      <Button.Gradient
        colors={colors}
        title={title}
        onPress={onPress}
        disabled={disabled}
        height={45}
        marginHorizontal={16}
      />
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  disable: {
    opacity: 0.5,
  },
  btnAction: {
    marginHorizontal: _moderateScale(8 * 2),
    height: _moderateScale(8 * 5),
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: _moderateScale(8 * 7),
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    width: _width,
    justifyContent: "center",
  },
});
