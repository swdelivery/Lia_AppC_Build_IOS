import React, { useMemo } from "react";
import { Svg, Path } from "react-native-svg";
import { line, curveBumpX } from "d3-shape";
import { StyleSheet } from "react-native";

const WIDTH = 136;

type Props = {
  width?: number;
  height?: number;
};

const lineGenerator = line()
  // @ts-ignore
  .x(({ x }) => x)
  // @ts-ignore
  .y(({ y }) => y);

export default function FlashSaleBg({ width = WIDTH, height = 63 }: Props) {
  const d = useMemo(() => {
    const ratio = WIDTH / width;
    const curve = lineGenerator.curve(curveBumpX)([
      { x: 0, y: 0 },
      { x: 55 / ratio, y: 0 },

      { x: 75 / ratio, y: height / 3 + 2 },
      { x: width, y: height / 3 + 2 },
      { x: width, y: height },
      { x: 0, y: height },
    ]);
    return curve;
  }, [width, height]);

  return (
    <Svg width={width} {...{ height }} style={StyleSheet.absoluteFillObject}>
      <Path fill="#e3161d" {...{ d }} />
    </Svg>
  );
}
