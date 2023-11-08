import { ImageBackground, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../Constant/Scale";
import LinearGradient from "react-native-linear-gradient";
import Banner from "./Components/Banner";
import OverViewBranch from "./Components/OverViewBranch";
import MainInfoDoctor from "./Components/MainInfoDoctor";
import Feedback from "./Components/Feedback";
import QuestionVideo from "./Components/QuestionVideo";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import BottomAction from "./Components/BottomAction";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDoctorReviewByCode } from "@Redux/Action/DoctorAction";
import Header from "./Components/Header";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigationParams } from "src/Hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetailsState } from "@Redux/doctor/selectors";
import { getDoctorDetails } from "@Redux/doctor/actions";
import ListBottonService from "@Screens/NewDetailService/Components/ListBottonService";

type ScreenK = typeof ScreenKey.DETAIL_DOCTOR;

const DetailDoctor = (props) => {
  const dispatch = useDispatch();
  const scrollY = useSharedValue(0);
  const { idDoctor } = useNavigationParams<ScreenK>();
  const { data } = useSelector(getDoctorDetailsState);

  useEffect(() => {
    if (idDoctor) {
      dispatch(getDoctorDetails.request(idDoctor));
    }
  }, [idDoctor]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {},
  });

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../Image/bgGreen.png")}
    >
      <Header scrollY={scrollY} doctor={data} />
      <Animated.ScrollView scrollEventThrottle={16} onScroll={scrollHandler}>
        <LinearGradient
          style={styles.gradientBg}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["rgba(255,255,255,0.1)", "#F6F8F8", "#F6F8F8", "#F6F8F8"]}
        >
          <Banner />
          <OverViewBranch branch={data.branch} />
          <MainInfoDoctor />
          <Feedback doctor={data} />
          <QuestionVideo doctor={data} />
          <ListBottonService />
        </LinearGradient>
      </Animated.ScrollView>

      <BottomAction doctor={data} />
    </ImageBackground>
  );
};

export default DetailDoctor;

const styles = StyleSheet.create({
  avatar: {
    width: _moderateScale(8 * 4),
    height: _moderateScale(8 * 4),
    borderRadius: _moderateScale(8 * 2),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  gradientBg: {
    width: _width,
    marginTop: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: -26,
  },
});
