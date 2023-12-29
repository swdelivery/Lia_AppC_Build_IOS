import Column from "@Components/Column";
import Row from "@Components/Row";
import Text, { TextProps } from "@Components/Text";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";

type Props = TextProps & {
  style?: StyleProp<ViewStyle>;
  value: number | string;
  spacing?: number;
  padding?: number;
  textSize?: number;
};

const digits = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default function NumberTicker({
  style,
  value,
  padding = 2,
  textSize = 14,
  ...props
}: Props) {
  const height = useMemo(() => textSize + padding * 2, [textSize, padding]);

  const indices = useMemo(
    () =>
      value
        .toString()
        .split("")
        .map((digit) => parseInt(digit, 10)),
    [value]
  );

  return (
    <Row key={indices.length} style={style} height={height}>
      {indices.map((i, idx) => (
        <Digit
          key={idx}
          value={i}
          textSize={textSize}
          height={height}
          {...props}
        />
      ))}
    </Row>
  );
}

function Digit({
  value = 0,
  textSize,
  height,
  ...props
}: TextProps & {
  value: number;
  textSize: number;
  height: number;
}) {
  const aref = useRef<ScrollView>(null);
  const number = useSharedValue(value);

  useEffect(() => {
    number.value = value;
  }, [value]);

  const scrollToDigit = useCallback((value: number, animated = true) => {
    if (aref.current) {
      aref.current.scrollTo({ x: 0, y: value, animated });
    }
  }, []);

  const resetPosition = useCallback((result) => {
    setTimeout(() => scrollToDigit(11 * height, false), 500);
  }, []);

  useAnimatedReaction(
    () => (number.value + 1) * height,
    // @ts-ignore
    (result: number, prev: number) => {
      if (result !== prev) {
        runOnJS(scrollToDigit)(result);
        if (result === height) {
          runOnJS(resetPosition)(result);
        }
      }
    }
  );

  return (
    <Column>
      <ScrollView
        ref={aref}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        pagingEnabled
      >
        {digits.map((i, idx) => (
          <Column
            key={idx}
            height={height}
            justifyContent="center"
            alignItems="center"
          >
            <Text {...props} size={textSize}>
              {i}
            </Text>
          </Column>
        ))}
      </ScrollView>
    </Column>
  );
}
