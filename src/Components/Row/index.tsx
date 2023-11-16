import React, { ReactNode, useMemo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = ViewStyle & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export default function Row({ alignItems = "center", justifyContent = 'flex-start', children, style, ...props }: Props) {
  const containerStyle = useMemo(() => {
    return {
      alignItems,
      justifyContent,
      ...props,
    };
  }, [alignItems, props]);
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
