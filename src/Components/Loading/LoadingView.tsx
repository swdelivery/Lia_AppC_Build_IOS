import Column from "@Components/Column";
import Text from "@Components/Text";
import { BASE_COLOR, BLACK, BLACK_OPACITY_4 } from "@Constant/Color";
import React, { ReactNode, useState } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
  Modal,
  StatusBar,
} from "react-native";

type Props = {
  size?: "large" | "small";
  color?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  height?: number;
  message?: string;
  children?: ReactNode;
};

export function LoadingModal({
  visible,
  size = "large",
  color = BASE_COLOR,
  backgroundColor = BLACK_OPACITY_4,
  style,
  message,
  children,
}: Props & { visible: boolean }) {
  return (
    <Modal visible={visible} transparent>
      <StatusBar backgroundColor="rgba(0,0,0,0.5)" />
      {children}
      {!children && (
        <LoadingView
          size={size}
          color={color}
          backgroundColor={backgroundColor}
          style={[styles.loadingView, style]}
          message={message}
        />
      )}
    </Modal>
  );
}

export const LoadingView = ({
  size,
  color,
  backgroundColor = "transparent",
  style,
  height,
  message,
  ...props
}: Props) => (
  <Column
    style={style}
    justifyContent="center"
    alignItems="center"
    backgroundColor={backgroundColor}
    height={height}
    pointerEvents="none"
    {...props}
  >
    <ActivityIndicator size={size} color={color} />
    {!!message && (
      <Text color={BLACK} top={15}>
        {message}
      </Text>
    )}
  </Column>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BLACK_OPACITY_4,
  },
  loadingView: {
    flex: 1,
  },
});
