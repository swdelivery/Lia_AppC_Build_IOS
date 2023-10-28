import React, { ReactNode, useMemo } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
});

interface Props extends ViewProps {
  children: ReactNode;
  safeTop?: boolean;
  safeBottom?: boolean;
  backgroundColor?: string;
}

export default function Screen({
  safeTop = false,
  safeBottom = false,
  backgroundColor = "white",
  children,
  style,
}: Props) {
  const insets = useSafeAreaInsets();

  const mContainerStyle = useMemo(
    () => ({
      paddingTop: safeTop ? insets.top : 0,
      paddingBottom: safeBottom ? insets.bottom : 0,
      backgroundColor,
    }),
    [safeTop, safeBottom, backgroundColor]
  );

  return (
    <View style={[styles.container, mContainerStyle, style]}>{children}</View>
  );
}
