import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import CoverImage from "./Components/CoverImage";
import Header from "./Components/Header";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { _moderateScale, _width } from "../../Constant/Scale";
import BannerInfo from "./Components/BannerInfo";
import { styleElement } from "../../Constant/StyleElement";
import Wave from "./Components/Wave";
import ListDiary from "./Components/ListDiary";
import ConsultanCus from "./Components/ConsultanCus";
import ListDoctor from "./Components/ListDoctor";
import MainInfo from "./Components/MainInfo";
import TopService from "./Components/TopService";
import Feedback from "./Components/Feedback";
import QandA from "./Components/QandA";
import BottomAction from "./Components/BottomAction";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { ScrollView } from "react-native-gesture-handler";
import Screen from "@Components/Screen";

const DetailBranch = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {},
    // onEndDrag: (e) => {
    //     isScrolling.value = false;
    // },
  });

  return (
    <Screen safeBottom>
      <StatusBar barStyle={"light-content"} />
      <Header scrollY={scrollY} />

      <Animated.ScrollView scrollEventThrottle={16} onScroll={scrollHandler}>
        <CoverImage />
        <BannerInfo />
        <View style={{ flex: 1 }}>
          <Wave />
        </View>
        <View style={{ height: _moderateScale(8 * 3) }} />

        <View style={styleElement.lineHoriGrey8} />

        <MainInfo />

        <View
          style={[
            styleElement.lineHoriGrey8,
            { marginTop: _moderateScale(8 * 2) },
          ]}
        />

        <ListDoctor />
        <View
          style={[
            styleElement.lineHoriGrey8,
            { marginTop: _moderateScale(8 * 2) },
          ]}
        />

        <ListDiary />

        <View
          style={[
            styleElement.lineHoriGrey8,
            { marginTop: _moderateScale(8 * 2) },
          ]}
        />

        <ConsultanCus />
        <View
          style={[
            styleElement.lineHoriGrey8,
            { marginTop: _moderateScale(8 * 2) },
          ]}
        />

        <TopService />

        <Feedback />
        <View
          style={[
            styleElement.lineHoriGrey8,
            { marginTop: _moderateScale(8 * 2) },
          ]}
        />

        <QandA />

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
      <BottomAction />
    </Screen>
  );
};

export default DetailBranch;
