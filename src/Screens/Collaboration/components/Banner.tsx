import Image from "@Components/Image";
import { _height, _width } from "@Constant/Scale";
import { ConfigFileCode } from "@typings/configFile";
import { head } from "lodash";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import useConfigFile from "src/Hooks/useConfigFile";

type Props = {
  scrollY: SharedValue<number>;
};

export default function Banner({ scrollY }: Props) {
  const image = useConfigFile(ConfigFileCode.BannerContactCollaboration);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-_height, 0, _height],
            [_height / 2, 0, -_height / 3]
          ),
        },
        {
          scale: interpolate(scrollY.value, [-_height, 0, _height], [6, 1, 1]),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Image
        avatar={head(image?.fileArr)}
        style={styles.image}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: _width,
    height: (_width * 9) / 16,
    backgroundColor: "red",
  },
  image: {
    width: _width,
    height: (_width * 9) / 16,
    overflow: "visible",
  },
});
