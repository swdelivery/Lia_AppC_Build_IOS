import React, { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  _height,
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import { TouchableOpacity } from "react-native-gesture-handler";
import Column from "@Components/Column";
import CachedImageView from "@Components/CachedImage";
import { News } from "@typings/news";
import { head } from "lodash";

type Props = {
  data: News;
  currIndexBanner: number;
  indexItem: number;
  handlePress: () => void;
};

const EachImage = memo((props: Props) => {
  const widthImg = useSharedValue(380);
  const heightImg = useSharedValue(140);
  const scaleImage = useSharedValue(1.3);

  const animSizeImg = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleImage.value,
        },
      ],
    };
  });

  useEffect(() => {
    if (props?.currIndexBanner == props?.indexItem) {
      scaleImage.value = withTiming(1, {
        duration: 2000,
      });
    } else {
      scaleImage.value = withTiming(1.3, {
        duration: 2000,
      });
    }
  }, [props?.currIndexBanner]);

  return (
    <TouchableOpacity onPress={props?.handlePress} activeOpacity={0.9}>
      <Column width={_width} alignItems={"center"}>
        <Column
          borderRadius={16}
          overflow={"hidden"}
          marginHorizontal={16}
          height={140}
          alignItems={"center"}
        >
          <Animated.View style={[styles.imagecontainer, animSizeImg]}>
            <CachedImageView
              avatar={head(props.data.representationFileArr)}
              style={styles.image}
              resizeMode="cover"
            />
          </Animated.View>
        </Column>
      </Column>
    </TouchableOpacity>
  );
});

export default EachImage;

const styles = StyleSheet.create({
  imagecontainer: {
    height: 140,
    width: _width - 16 * 2,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 16,
    overflow: "hidden",
  },
});
