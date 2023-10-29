import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export default function Spacer({ top, bottom, left, right }: Props) {
  const style = useMemo(
    () => ({
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    }),
    [top, bottom, left, right]
  );
  return <View style={style} />;
}
