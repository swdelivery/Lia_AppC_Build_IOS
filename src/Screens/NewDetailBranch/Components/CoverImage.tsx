import { StyleSheet, View } from "react-native";
import React from "react";
import { _height, _moderateScale, _width } from "../../../Constant/Scale";
import FastImage from "@Components/FastImage";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const HEIGHT_COVER_IMAGE = (_width * 564) / 1125;

type Props = {
  scrollY: SharedValue<number>;
};

const CoverImage = ({ scrollY }: Props) => {
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
    <Animated.View style={[styles.coverImage, animatedStyle]}>
      <FastImage
        style={styles.coverImage__image}
        source={require("../../../Image/coverBranch.png")}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

export default CoverImage;

const styles = StyleSheet.create({
  coverImage__image: {
    width: _width,
    height: HEIGHT_COVER_IMAGE,
  },
  coverImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: _width,
    height: 200,
    borderWidth: 1,
  },
});
