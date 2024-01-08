import Column from "@Components/Column";
import LinearGradient from "@Components/LinearGradient";
import Row from "@Components/Row";
import React, { useMemo } from "react";
import { ColorValue, StyleProp, StyleSheet, ViewStyle } from "react-native";

type Props = ViewStyle & {
  percent: number;
  height?: number;
  colors?: string[];
  backgroundColor?: ColorValue;
};

export default function HorizontalProgress({
  height = 8,
  percent = 0,
  colors = ["#2365d2", "#07b4d8"],
  backgroundColor = "#e5e5e5",
  ...props
}: Props) {
  const progressStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      flex: percent,
      height,
    };
  }, [percent, height]);

  return (
    <Row
      height={height}
      borderRadius={height}
      backgroundColor={backgroundColor}
      overflow={"hidden"}
      {...props}
    >
      <LinearGradient horizontal colors={colors} style={progressStyle} />
      <Column flex={100 - percent} height={100} />
    </Row>
  );
}

const styles = StyleSheet.create({
  //
});
