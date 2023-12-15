import Column from "@Components/Column";
import LinearGradient from "@Components/LinearGradient";
import Row from "@Components/Row";
import React, { useMemo } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

type Props = ViewStyle & {
  percent: number;
  height?: number;
};

export default function HorizontalProgress({
  height = 8,
  percent = 0,
  ...props
}: Props) {
  const progressStyle: StyleProp<ViewStyle> = useMemo(() => {
    return {
      flex: percent,
      height,
      borderRadius: height,
      overflow: "hidden",
    };
  }, [percent, height]);

  return (
    <Row
      height={height}
      borderRadius={height}
      backgroundColor={"#e5e5e5"}
      {...props}
    >
      <LinearGradient
        horizontal
        colors={["#2365d2", "#07b4d8"]}
        style={progressStyle}
      />
      <Column flex={100 - percent} height={100} />
    </Row>
  );
}

const styles = StyleSheet.create({
  //
});
