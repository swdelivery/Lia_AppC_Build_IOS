import { LoadingView } from "@Components/Loading/LoadingView";
import React, { ReactNode, useMemo } from "react";
import {
  ColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

type Props = Omit<TouchableOpacityProps, "style"> & {
  size?: number;
  backgroundColor?: ColorValue;
  children: ReactNode;
  onPress?: () => void;
  borderRadius?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  containerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
};

const DEFAULT_HIT_SLOP = {
  top: 3,
  left: 3,
  bottom: 3,
  right: 3,
};

export default function IconButton({
  size,
  backgroundColor,
  onPress,
  children,
  borderRadius,
  top,
  left,
  bottom,
  right,
  containerStyle,
  isLoading,
  ...props
}: Props) {
  const style: StyleProp<ViewStyle> = useMemo(
    () => ({
      backgroundColor,
      width: size,
      aspectRatio: 1,
      borderRadius,
      alignItems: "center",
      justifyContent: "center",
      marginTop: top,
      marginLeft: left,
      marginRight: right,
      marginBottom: bottom,
    }),
    [size, backgroundColor, borderRadius, top, left, bottom, right]
  );

  return (
    <Pressable
      disabled={!onPress}
      style={[style, containerStyle]}
      onPress={onPress}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    >
      {children}
      {isLoading && <LoadingView style={StyleSheet.absoluteFill} />}
    </Pressable>
  );
}
