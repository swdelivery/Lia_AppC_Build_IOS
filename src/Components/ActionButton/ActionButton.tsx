import Text from "@Components/Text";
import { BORDER_COLOR, WHITE } from "@Constant/Color";
import { _moderateScale, _width } from "@Constant/Scale";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";


type Props = {
  title?: string;
  onpress?: () => void;
  disable?: any
};

const ActionButton = ({ title, onpress, disable }: Props) => {

  const isDisabled = disable();


  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={isDisabled}
        onPress={onpress}
        style={[styles.btnAction, isDisabled && styles.disable]}>
        <LinearGradient
          style={[StyleSheet.absoluteFillObject, { borderRadius: 8 }]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#01AB84", "#186A57"]}
        />
        <Text color={WHITE} weight="bold" size={14}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  disable: {
    opacity: 0.5
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
