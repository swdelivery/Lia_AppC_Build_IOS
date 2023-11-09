import React, { ReactNode, useMemo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
  gap?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  alignItems?: "flex-start" | "flex-end" | "center";
};

export default function Column({
  gap,
  top,
  bottom,
  left,
  right,
  style,
  children,
  alignItems,
}: Props) {
  const containerStyle = useMemo(() => {
    return {
      gap,
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
      alignItems,
    };
  }, [gap, top, bottom, left, right, alignItems]);

  return (
    <View style={[styles.container, containerStyle, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
