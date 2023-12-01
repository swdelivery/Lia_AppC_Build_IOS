import React, { useMemo } from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  ColorValue,
  StyleSheet,
  Platform,
  StyleProp,
  TextStyle,
} from "react-native";
import {
  FONT_NOLAN_NEXT,
  FONT_NOLAN_NEXT_ANDROID,
  FONT_NOLAN_NEXT_ANDROID_BOLD,
  FONT_NOLAN_NEXT_ANDROID_MEDIUM,
} from "@Constant/Font";
import { BLACK } from "@Constant/Color";

const isAndroid = Platform.OS === "android";

export const FONT_WEIGHTS = {
  regular: isAndroid ? FONT_NOLAN_NEXT_ANDROID : FONT_NOLAN_NEXT,
  bold: isAndroid ? FONT_NOLAN_NEXT_ANDROID_BOLD : FONT_NOLAN_NEXT,
  medium: isAndroid ? FONT_NOLAN_NEXT_ANDROID_MEDIUM : FONT_NOLAN_NEXT,
};

export type FontWeight = keyof typeof FONT_WEIGHTS;
export type TextProps = RNTextProps & {
  children?: React.ReactNode;
  weight?: FontWeight;
  size?: number;
  color?: ColorValue;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  removePadding?: boolean;
  fontStyle?: "normal" | "italic";
  flex?: number;
  textDecorationLine?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";
};

const Text = ({
  style,
  weight = "regular",
  size = 14,
  color,
  top = 0,
  left = 0,
  bottom = 0,
  right = 0,
  removePadding = false,
  textDecorationLine = "none",
  fontStyle,
  flex,
  ...props
}: TextProps) => {
  // @ts-ignore
  const customStyle: StyleProp<TextStyle> = useMemo(() => {
    const fontSize = size || 14;
    return {
      fontFamily: FONT_WEIGHTS[weight],
      fontWeight: isAndroid
        ? undefined
        : weight === "regular"
        ? "normal"
        : "bold",
      fontSize,
      color: color || BLACK,
      marginTop: top || undefined,
      marginLeft: left || undefined,
      marginRight: right || undefined,
      marginBottom: bottom || undefined,
      textDecorationLine,
      fontStyle,
      flex,
      ...(removePadding
        ? {
            height: fontSize,
            lineHeight: fontSize * 1.2,
          }
        : {}),
    };
  }, [
    weight,
    size,
    color,
    top,
    left,
    right,
    bottom,
    removePadding,
    textDecorationLine,
    fontStyle,
    flex,
  ]);

  return (
    <RNText
      style={[styles.baseStyle, customStyle, style]}
      {...props}
      allowFontScaling={false}
      // @ts-ignore
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  baseStyle: {
    fontVariant: ["lining-nums", "proportional-nums", "tabular-nums"],
    includeFontPadding: false,
  },
});

export default Text;
