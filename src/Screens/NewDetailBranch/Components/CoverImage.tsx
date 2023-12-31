import { StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { _height, _moderateScale, _width } from "../../../Constant/Scale";
import FastImage from "@Components/FastImage";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { getBranchDetailsState } from "@Redux/branch/selectors";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  scrollY: SharedValue<number>;
};

const CoverImage = ({ scrollY }: Props) => {
  const { data } = useSelector(getBranchDetailsState);

  const bannerUrl = useMemo(() => {
    if (!isEmpty(data?.bannerFileArr)) {
      return getImageAvataUrl(data.bannerFileArr[0]);
    }
    return "";
  }, [data]);

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
      {!!bannerUrl && (
        <FastImage
          style={styles.coverImage__image}
          uri={bannerUrl}
          resizeMode="cover"
        />
      )}
    </Animated.View>
  );
};

export default CoverImage;

const styles = StyleSheet.create({
  coverImage__image: {
    width: _width,
    height: 200,
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
