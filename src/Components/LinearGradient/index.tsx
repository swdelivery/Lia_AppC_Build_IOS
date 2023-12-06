import React, { ReactNode, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
  ColorValue,
} from "react-native";
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
} from "react-native-svg";

type Props = {
  style?: StyleProp<ViewStyle>;
  colors: ColorValue[];
  children?: ReactNode;
};

export default function LinearGradient({ style, colors, children }: Props) {
  const [layout, setLayout] = useState({
    width: 1,
    height: 1,
  });

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout({ ...e.nativeEvent.layout });
  }, []);

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      <Svg
        height={layout.height}
        width={layout.width}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <SvgLinearGradient id="grad" x1="1" y1="1" x2="1" y2="0">
            <Stop offset={0} stopColor={colors[0]} stopOpacity="1" />
            <Stop offset={1} stopColor={colors[1]} stopOpacity="1" />
          </SvgLinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={layout.width}
          height={layout.height}
          fill="url(#grad)"
        />
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
