import React, { memo, useEffect } from "react";
import { View } from "react-native";
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

const EachImage = memo((props) => {
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
          marginHorizontal={_moderateScale(20)}
          height={_heightScale(140)}
          alignItems={"center"}
        >
          <Animated.Image
            style={[
              {
                width: _width - _moderateScale(20) * 2,
                height: _heightScale(140),
              },
              animSizeImg,
            ]}
            source={{ uri: `${props?.data?.url}` }}
          />
        </Column>
      </Column>
    </TouchableOpacity>
  );
});

export default EachImage;
