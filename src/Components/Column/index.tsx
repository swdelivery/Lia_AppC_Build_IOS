import React, { ReactNode, useMemo } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = ViewStyle & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

export default function Column({ style, children, ...props }: Props) {
  const containerStyle = useMemo(() => {
    return { ...props };
  }, [props]);

  return (
    <View style={[styles.container, containerStyle, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
