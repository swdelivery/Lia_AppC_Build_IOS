import React, { ReactNode, useCallback, useMemo, useState } from "react";
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
  horizontal?: boolean;
};

export default function LinearGradient({
  style,
  colors,
  children,
  horizontal,
}: Props) {
  const [layout, setLayout] = useState({
    width: 1,
    height: 1,
  });

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setLayout({ ...e.nativeEvent.layout });
  }, []);

  const otherProps = useMemo(() => {
    if (horizontal) {
      return {
        x1: 0,
        x2: 1,
        y1: 0,
        y2: 0,
      };
    }
    return {
      x1: 1,
      x2: 1,
      y1: 1,
      y2: 0,
    };
  }, [horizontal]);

  return (
    <View style={[styles.container, style]} onLayout={handleLayout}>
      <Svg
        height={layout.height}
        width={layout.width}
        style={StyleSheet.absoluteFill}
      >
        <Defs>
          <SvgLinearGradient id="grad" {...otherProps}>
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
