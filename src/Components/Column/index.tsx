import React, { ReactNode, useMemo } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

type Props = ViewStyle & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  onLayout?: ViewProps["onLayout"];
  onPress?: () => void | Promise<void>;
};

export default function Column({
  style,
  children,
  onLayout,
  onPress,
  ...props
}: Props) {
  const containerStyle = useMemo(() => {
    return { ...props };
  }, [props]);

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
  container: {},
});
