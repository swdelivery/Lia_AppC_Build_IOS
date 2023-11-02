import React, { ReactNode, useMemo } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  gap?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  children: ReactNode;
};

export default function Column({
  gap,
  top,
  bottom,
  left,
  right,
  children,
}: Props) {
  const containerStyle = useMemo(() => {
    return {
      gap,
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    };
  }, [gap, top, bottom, left, right]);
  return <View style={[styles.container, containerStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {},
});
