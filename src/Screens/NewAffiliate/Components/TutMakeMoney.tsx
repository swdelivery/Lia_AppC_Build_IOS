import { isEmpty } from "lodash";
import React, { memo, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Collapsible from "react-native-collapsible";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { navigation } from "../../../../rootNavigation";
import {
  IconAffiliateTutorial,
  RightArrowIcon,
} from "../../../Components/Icon/Icon";
import { BASE_COLOR, BLUE_FB, GREEN_SUCCESS, GREY, WHITE } from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { _moderateScale } from "../../../Constant/Scale";
import ScreenKey from "../../../Navigation/ScreenKey";
import {
  checkStepUnlockAffiliate,
  getCurrentCollaborator,
} from "../../../Redux/Action/Affiilate";
import Icon from "@Components/Icon";
import Column from "@Components/Column";

const Content = (props) => {
  const infoUserRedux = useSelector((state) => state.infoUserReducer?.infoUser);
  const [stepUnlockAffiliate, setStepUnlockAffiliate] = useState({});

  useEffect(() => {
    _checkStep(infoUserRedux);
  }, []);

  const _checkStep = async (infoUserRedux) => {
    let result = await checkStepUnlockAffiliate(infoUserRedux?._id);
    if (result?.isAxiosError) return;
    setStepUnlockAffiliate(result?.data?.data);
  };

  const _handleCheckCurrCollabRequest = async () => {
    let result = await getCurrentCollaborator();
    if (!isEmpty(result?.data?.data) && result?.data?.data?.status !== "DENY") {
      navigation.navigate(ScreenKey.CURR_COLLAB_REQUEST);
    } else {
      navigation.navigate(ScreenKey.NEW_VERIFICATION_CTV);
    }
  };

  return (
    <Animated.View>
      <TouchableOpacity
        onPress={() => {
          _handleCheckCurrCollabRequest();
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {stepUnlockAffiliate?.isCollaburator ? (
          <>
            <Text
              style={{
                flex: 1,
                color: WHITE,
                textDecorationLine: "underline",
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
              }}
            >
              Bước 1: Đăng kí để trở thành cộng tác viên
            </Text>
            <Column
              backgroundColor={WHITE}
              borderRadius={4}
              height={8 * 2.5}
              width={8 * 2.5}
              justifyContent="center"
              alignItems="center">
              <Icon size={18} name="check" color={GREEN_SUCCESS} />
            </Column>
          </>
        ) : (
          <>
            <Text
              style={{
                flex: 1,
                color: WHITE,
                textDecorationLine: "underline",
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
              }}
            >
              Bước 1: Đăng kí để trở thành cộng tác viên
            </Text>
            <Column
              borderWidth={1}
              borderColor={WHITE}
              borderRadius={4}
              height={8 * 2.5}
              width={8 * 2.5}
              justifyContent="center"
              alignItems="center">
            </Column>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenKey.CREATE_BOOKING);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: _moderateScale(8 * 2),
        }}
      >
        {stepUnlockAffiliate?.serviceUsed ? (
          <>
            <Text
              style={{
                flex: 1,
                color: WHITE,
                textDecorationLine: "underline",
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
              }}
            >
              Bước 2: Đặt lịch sử dụng dịch vụ bất kì
            </Text>
            <Column
              backgroundColor={WHITE}
              borderRadius={4}
              height={8 * 2.5}
              width={8 * 2.5}
              justifyContent="center"
              alignItems="center">
              <Icon size={18} name="check" color={GREEN_SUCCESS} />
            </Column>
          </>
        ) : (
          <>
            <Text
              style={{
                flex: 1,
                color: WHITE,
                textDecorationLine: "underline",
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
              }}
            >
              Bước 2: Đặt lịch sử dụng dịch vụ bất kì
            </Text>
            <Column
              borderWidth={1}
              borderColor={WHITE}
              borderRadius={4}
              height={8 * 2.5}
              width={8 * 2.5}
              justifyContent="center"
              alignItems="center">
            </Column>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenKey.LIST_PARTNER_DIARY);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: _moderateScale(8 * 2),
        }}
      >
        {stepUnlockAffiliate?.diaryFinished ? (
          <>
            <Text
              style={{
                flex: 1,
                color: WHITE,
                textDecorationLine: "underline",
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
              }}
            >
              Bước 3: Hoàn thành nhật kí làm đẹp
            </Text>
            <Column
              backgroundColor={WHITE}
              borderRadius={4}
              height={8 * 2.5}
              width={8 * 2.5}
              justifyContent="center"
              alignItems="center">
              <Icon size={18} name="check" color={GREEN_SUCCESS} />
            </Column>
          </>
        ) : (
          <>
            <Text
              style={{
                flex: 1,
                color: WHITE,
                textDecorationLine: "underline",
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
              }}
            >
              Bước 3: Hoàn thành nhật kí làm đẹp
            </Text>
            <Column
              borderWidth={1}
              borderColor={WHITE}
              borderRadius={4}
              height={8 * 2.5}
              width={8 * 2.5}
              justifyContent="center"
              alignItems="center">
            </Column>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenKey.CREATE_NEW_FEED);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: _moderateScale(8 * 2),
        }}
      >
        {stepUnlockAffiliate?.sharedDiary ? (
          <>
            <Text
              style={{
                flex: 1,
                color: WHITE,
                textDecorationLine: "underline",
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
              }}
            >
              Bước 4: Chia sẻ nhật ký kèm mã giới thiệu
            </Text>
            <Column
              backgroundColor={WHITE}
              borderRadius={4}
              height={8 * 2.5}
              width={8 * 2.5}
              justifyContent="center"
              alignItems="center">
              <Icon size={18} name="check" color={GREEN_SUCCESS} />
            </Column>
          </>
        ) : (
          <>
            <Text
              style={{
                flex: 1,
                color: WHITE,
                textDecorationLine: "underline",
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
              }}
            >
              Bước 4: Chia sẻ nhật ký kèm mã giới thiệu
            </Text>
            <Column
              borderWidth={1}
              borderColor={WHITE}
              borderRadius={4}
              height={8 * 2.5}
              width={8 * 2.5}
              justifyContent="center"
              alignItems="center">
            </Column>
          </>
        )}
      </TouchableOpacity>

      <View
        style={{
          height: _moderateScale(8 * 2),
        }}
      />
    </Animated.View>
  );
};

const TutMakeMoney = memo((props) => {
  const { flagRequireDoneStepToShareCode } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const valueBackgroundColor = useSharedValue(0);
  const rotateIcon = useSharedValue(0);

  useEffect(() => {
    if (flagRequireDoneStepToShareCode) {
      valueBackgroundColor.value = withTiming(1, { duration: 500 });
    } else {
      valueBackgroundColor.value = withTiming(0, { duration: 500 });
    }
  }, [flagRequireDoneStepToShareCode]);

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
  const animBgColor = useAnimatedStyle(() => {
    const color = interpolateColor(
      valueBackgroundColor.value,
      [0, 1],
      ["#182128", BLUE_FB]
    );
    return {
      backgroundColor: color,
    };
  });

  return (
    <View style={[styles.options]}>
      <Animated.View
        style={[
          styles.options__btn,
          isExpanded && { borderColor: BASE_COLOR, borderWidth: 1 },
          animBgColor,
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIsExpanded((old) => !old);
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: _moderateScale(8 * 5),
          }}
        >
          <IconAffiliateTutorial width={8 * 2.5} height={8 * 2.5} />

          <View style={{ width: _moderateScale(8) }} />
          <Text
            style={[
              { flex: 1, color: WHITE, fontSize: _moderateScale(14) },
              stylesFont.fontNolan500,
            ]}
          >
            Hướng dẫn kiếm tiền
          </Text>
          <Animated.View style={animIcon}>
            <RightArrowIcon color={WHITE} />
          </Animated.View>
        </TouchableOpacity>

        <Collapsible collapsed={!isExpanded}>
          <Content />
        </Collapsible>
      </Animated.View>
    </View>
  );
});

export default TutMakeMoney;

const styles = StyleSheet.create({
  options__btn: {
    width: "100%",
    borderRadius: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    backgroundColor: '#182128',
    paddingVertical: 8
  },
  options: {
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 2,

  elevation: 5,
};
