import Row from "@Components/Row";
import Text, { TextProps } from "@Components/Text";
import React, { memo, useMemo } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  SlideInDown,
  SlideOutDown,
  SlideOutUp,
} from "react-native-reanimated";

type Props = TextProps & {
  style?: StyleProp<ViewStyle>;
  value: number | string;
  spacing?: number;
  padding?: number;
  textSize?: number;
};

function NumberTicker({
  style,
  value,
  padding = 2,
  textSize = 14,
  ...props
}: Props) {
  const height = useMemo(() => textSize + padding * 2, [textSize, padding]);

  const indices = useMemo(() => value.toString().split(""), [value]);

  return (
    <Row style={style} height={height} overflow="hidden">
      {indices.map((i, idx) => (
        <Animated.View
          key={idx + "" + i}
          entering={SlideInDown.damping(35).stiffness(400).springify()}
          exiting={
            idx === 0
              ? SlideOutUp.duration(200).damping(10).stiffness(100)
              : SlideOutDown.duration(200).damping(10).stiffness(100)
          }
        >
          <Text {...props} size={textSize}>
            {i}
          </Text>
        </Animated.View>
      ))}
    </Row>
  );
}

export default memo(NumberTicker);
