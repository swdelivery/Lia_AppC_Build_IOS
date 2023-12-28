import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { _moderateScale } from "../../../Constant/Scale";
import { IconPolicy, RightArrowIcon } from "../../../Components/Icon/Icon";
import { BASE_COLOR, WHITE } from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Collapsible from "react-native-collapsible";

const Content = (props) => {
  const refView = useAnimatedRef();
  const heightValueBox = useSharedValue(0);
  const [heightContent, setHeightContent] = useState(0);

  useEffect(() => {}, []);

  return (
    <View
    // ref={refView}
    // entering={FadeInRight.duration(120).springify().mass(0.3)}
    // exiting={FadeOut.duration(100).springify().mass(0.3)}
    >
      <Text>
        - Giảm {props?.data?.promotion?.discountRetailService}% khi sử dụng dịch
        vụ
      </Text>
      <Text>- Giảm {props?.data?.promotion?.discountFriend}% cho bạn bè</Text>
      <Text>
        - Nhận được {props?.data?.promotion?.commissionRate}% hoa hồng khi giới
        thiệu bạn bè
      </Text>
      <View
        style={{
          height: _moderateScale(8 * 2),
        }}
      />
    </View>
  );
};

const BtnRanked = memo((props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const rotateIcon = useSharedValue(0);

  useEffect(() => {
    if (!isExpanded) {
      rotateIcon.value = withTiming(0, { duration: 300 });
    } else {
      rotateIcon.value = withTiming(90, { duration: 300 });
    }
  }, [isExpanded]);

  const animIcon = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotateIcon.value}deg`,
        },
      ],
    };
  });

  return (
    <View
      // entering={FadeInRight.duration(1000).springify().mass(0.3)}
      // exiting={FadeOut.duration(1000).springify().mass(0.3)}
      style={[styles.options]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setIsExpanded((old) => !old);
        }}
        style={[
          styles.options__btn,
          shadow,
          isExpanded && { borderColor: BASE_COLOR, borderWidth: 1 },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: _moderateScale(8 * 5),
          }}
        >
          <IconPolicy
            style={{
              width: _moderateScale(8 * 3),
              height: _moderateScale(8 * 3),
            }}
          />

          <View style={{ width: _moderateScale(8) }} />
          <Text
            style={[
              { flex: 1, color: BASE_COLOR, fontSize: _moderateScale(14) },
              stylesFont.fontNolan500,
            ]}
          >
            Quyền lợi thứ hạng
          </Text>
          <Animated.View style={animIcon}>
            <RightArrowIcon color={BASE_COLOR} />
          </Animated.View>
        </View>

        <Collapsible collapsed={!isExpanded}>
          <Content data={props?.data} isExpanded={isExpanded} />
        </Collapsible>
      </TouchableOpacity>
    </View>
  );
});

export default BtnRanked;

const styles = StyleSheet.create({
  options__btn: {
    width: "100%",
    borderRadius: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    backgroundColor: WHITE,
  },
  options: {
    paddingHorizontal: _moderateScale(8 * 3),
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 2,

  elevation: 5,
};
