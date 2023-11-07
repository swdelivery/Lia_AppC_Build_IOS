import React, { ReactNode, useMemo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
  gap?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  alignItems?: "flex-start" | "flex-end" | "center";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};

export default function Row({
  gap,
  top,
  bottom,
  left,
  right,
  alignItems,
  justifyContent,
  flexWrap,
  style,
  children,
}: Props) {
  const containerStyle = useMemo(() => {
    return {
      gap,
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
      justifyContent,
      alignItems,
      flexWrap,
    };
  }, [gap, top, bottom, left, right, justifyContent, flexWrap, alignItems]);
  return (
    <View style={[styles.container, containerStyle, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
