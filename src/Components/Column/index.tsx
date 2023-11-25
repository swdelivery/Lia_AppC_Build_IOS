import React, { ReactNode, useMemo } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
} from "react-native";

type Props = ViewStyle & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  onLayout?: ViewProps["onLayout"];
};

export default function Column({ style, children, onLayout, ...props }: Props) {
  const containerStyle = useMemo(() => {
    return { ...props };
  }, [props]);

  return (
    <View style={[styles.container, containerStyle, style]} onLayout={onLayout}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
