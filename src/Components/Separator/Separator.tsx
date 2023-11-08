import React, { useMemo } from "react";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";

type Props = {
  color?: ColorValue;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  position?: "relative" | "absolute";
};

export default function Separator({
  color = "grey",
  top,
  bottom,
  left,
  right,
  position,
}: Props) {
  const style: StyleProp<ViewStyle> = useMemo(
    () => ({
      height: 1,
      backgroundColor: color,
      position,
      ...(position === "absolute"
        ? {
            top,
            bottom,
            left,
            right,
          }
        : {
            marginTop: top,
            marginBottom: bottom,
            marginLeft: left,
            marginRight: right,
          }),
    }),
    [color, top, bottom, left, right, position]
  );

  return <View style={style} />;
}
