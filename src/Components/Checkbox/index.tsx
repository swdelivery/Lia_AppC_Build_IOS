import Icon from "@Components/Icon";
import { GREY } from "@Constant/Color";
import React, { useMemo } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
} from "react-native";

type Props = {
  value: boolean;
  size?: number;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function Checkbox({
  value,
  size = 16,
  containerStyle,
  color = "black",
}: Props) {
  const mContainerStyle = useMemo(() => {
    return {
      width: size,
      aspectRatio: 1,
      borderRadius: 4,
    };
  }, [size]);

  return (
    <View style={[styles.container, mContainerStyle, containerStyle]}>
      {value && <Icon name="check-bold" color={color} size={size} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: GREY,
  },
});
