import React, { ReactNode, useMemo } from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  gap?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  children: ReactNode;
};

export default function Row({
  gap,
  top,
  bottom,
  left,
  right,
  justifyContent,
  flexWrap,
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
      flexWrap,
    };
  }, [gap, top, bottom, left, right, justifyContent, flexWrap]);
  return <View style={[styles.container, containerStyle]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
