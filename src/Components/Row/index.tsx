import React, { ReactNode, useMemo } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native";

type Props = ViewStyle & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  onPress?: () => void;
};

export default function Row({
  alignItems = "center",
  justifyContent = "flex-start",
  children,
  style,
  onPress,
  ...props
}: Props) {
  const containerStyle = useMemo(() => {
    return {
      alignItems,
      justifyContent,
      ...props,
    };
  }, [alignItems, props]);

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      style={[styles.container, containerStyle, style]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
