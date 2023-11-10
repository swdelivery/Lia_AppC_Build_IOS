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
import { getDetailPractitioner, getDoctorReviewByCode } from "@Redux/Action/DoctorAction";
import Header from "./Components/Header";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigationParams } from "src/Hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetailsState } from "@Redux/doctor/selectors";
import { getDoctorDetails } from "@Redux/doctor/actions";
import ListBottonService from "@Screens/NewDetailService/Components/ListBottonService";
import { getPractitionerDetails } from "@Redux/practitioner/actions";
import { getPractitionerDetailsState } from "@Redux/practitioner/selectors";
import { WHITE } from "@Constant/Color";
import Screen from "@Components/Screen";

type ScreenK = typeof ScreenKey.DETAIL_PRACTITIONER;

const DetailPractitioner = (props) => {
  const dispatch = useDispatch();
  const scrollY = useSharedValue(0);
  const { idPractitioner } = useNavigationParams<ScreenK>();
  const { data } = useSelector(getPractitionerDetailsState);

  useEffect(() => {
    if (idPractitioner) {
      console.log({ idPractitioner });

      dispatch(getPractitionerDetails.request(idPractitioner));
    }
  }, [idPractitioner]);

  console.log({ XYZ: data });


  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => { },
  });

  return (
    <Screen safeBottom>
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
            colors={["rgba(255,255,255,0.1)", "#F6F8F8"]}
          ></LinearGradient>
          <View style={styles.content}>
            <View style={styles.bg} />
            <Banner />
          </View>
          <View style={styles.info}>
            <OverViewBranch branch={data.branch} />
            <MainInfoDoctor />
            {/* <Feedback doctor={data} /> */}
            <QuestionVideo doctor={data} />
            <ListBottonService />
            <View style={{ height: 100, backgroundColor: WHITE }} />
          </View>
        </Animated.ScrollView>

        <BottomAction doctor={data} />
      </ImageBackground>
    </Screen>
  );
};

export default DetailPractitioner;

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
    top: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: -26,
    position: "absolute",
    height: 150,
  },
  content: {
    marginTop: 90,
    paddingHorizontal: 8,
  },
  bg: {
    backgroundColor: "#F6F8F8",
    position: "absolute",
    top: 150,
    left: 0,
    right: 0,
    height: 500,
  },
  info: {
    backgroundColor: "#F6F8F8",
  },
});
