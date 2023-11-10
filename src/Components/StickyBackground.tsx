import React from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

export default function StickyBackground({
  backgroundColor = "white",
  size = 300,
  horizontal = false,
  position = "top",
}: {
  backgroundColor?: string;
  size?: number;
  horizontal?: boolean;
  position?: "top" | "left" | "right" | "bottom";
}) {
  if (Platform.OS === "ios") {
    const style: StyleProp<ViewStyle> = {
      position: "absolute",
      backgroundColor,
      ...styles[position](size),
    };
    return <View style={style} />;
  }
  return null;
}

const styles = {
  top: (size: number) => ({
    left: 0,
    right: 0,
    top: -size,
    height: size,
  }),
  bottom: (size: number) => ({
    left: 0,
    right: 0,
    bottom: -size,
    height: size,
  }),
  left: (size: number) => ({
    left: -size,
    top: 0,
    bottom: 0,
    width: size,
  }),
  right: (size: number) => ({
    right: -size,
    top: 0,
    bottom: 0,
    width: size,
  }),
};
