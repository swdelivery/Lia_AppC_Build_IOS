import { StyleSheet, View } from "react-native";
import React from "react";
import { _height, _moderateScale, _width } from "../../../Constant/Scale";
import FastImage from "@Components/FastImage";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { getImageAvataUrl } from "src/utils/avatar";
import { Branch } from "@typings/branch";
import HorizonListImage from "@Screens/NewDetailService/Components/HorizonListImage";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import Carousel, { PaginationIndicator } from "@r0b0t3d/react-native-carousel";

const IMAGE_HEIGHT = _width * SERVICE_BANNER_RATIO;

type Props = {
  scrollY: SharedValue<number>;
  branch: Branch;
};

const CoverImage = ({ scrollY, branch }: Props) => {
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-_height / 2, 0, _height / 2],
            [0, 0, -_height / 2]
          ),
        },
      ],
    };
  });

  const animatedContentContainerStyle = useAnimatedStyle(() => {
    return {
      height:
        IMAGE_HEIGHT +
        interpolate(
          scrollY.value,
          [-_height / 2, 0, _height / 2],
          [_height / 2, 0, 0]
        ),
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [-_height / 2, 0, _height / 2],
            [6, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <Animated.View
        style={[styles.containerCoverImage, animatedContentContainerStyle]}
      >
        <Animated.View style={[styles.coverImage, animatedStyle]}>
          <HorizonListImage images={branch?.bannerFileArr ?? []} />
        </Animated.View>
      </Animated.View>
      <View style={styles.bannerInfo__box_avatar_branch}>
        <FastImage
          style={styles.bannerInfo__avatarBranch}
          uri={getImageAvataUrl(
            branch?.avatar,
            "https://cfw.rabbitloader.xyz/eyJjIjp0cnVlLCJoIjoibGlhYmVhdXR5LnZuIiwidiI6OTczNjIwMDQ3LCJpIjoiZjgxYWIyZTctMGZlZi00YmU2LTZhNmItODI5MWI4YWExZTAwIn0/wp-content/uploads/2023/06/photo.png"
          )}
        />
      </View>
    </Animated.View>
  );
};

export default CoverImage;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: _width,
    height: IMAGE_HEIGHT,
  },
  containerCoverImage: {
    overflow: "hidden",
  },
  coverImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: _width,
    height: IMAGE_HEIGHT,
    borderWidth: 1,
  },
  bannerInfo__box_avatar_branch: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    borderRadius: _moderateScale((8 * 8) / 2),
    borderBottomRightRadius: 8,
    borderWidth: 2,
    borderColor: "black",
    marginTop: -30,
    marginRight: 16,
  },
  bannerInfo__avatarBranch: {
    width: _moderateScale(8 * 6),
    height: _moderateScale(8 * 6),
    resizeMode: "contain",
    backgroundColor: "white",
    borderRadius: _moderateScale(8 * 6) / 2,
  },
});
