import { ImageBackground, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo } from "react";
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
import Header from "./Components/Header";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigationParams } from "src/Hooks/useNavigation";
import Screen from "@Components/Screen";
import StickyBackground from "@Components/StickyBackground";
import useApi from "src/Hooks/services/useApi";
import PartnerService from "src/Services/PartnerService";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import ListBottomService from "@Components/ListBottomService/ListBottomService";
import Placeholder from "./Components/Placeholder";

type ScreenK = typeof ScreenKey.DETAIL_DOCTOR;

const DetailDoctor = () => {
  const scrollY = useSharedValue(0);
  const { doctor } = useNavigationParams<ScreenK>();
  const { data, performRequest } = useApi(
    PartnerService.getDoctorDetails,
    doctor
  );

  useEffect(() => {
    if (doctor) {
      performRequest(doctor._id);
    }
  }, [doctor]);

  const services = useMemo(() => {
    if (!data || !data.doctorServices) {
      return [];
    }
    return data.doctorServices
      .map((item) => item.service)
      .filter((item) => !!item);
  }, [data]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
    onBeginDrag: (e) => {},
  });

  return (
    <Screen>
      <AfterTimeoutFragment placeholder={<Placeholder />}>
        <ImageBackground
          style={styles.container}
          source={require("../../Image/bgGreen.png")}
        >
          <Header scrollY={scrollY} doctor={data} />
          <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={scrollHandler}
          >
            <StickyBackground position="bottom" backgroundColor="#F6F8F8" />
            <LinearGradient
              style={styles.gradientBg}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["rgba(255,255,255,0.1)", "#F6F8F8"]}
            ></LinearGradient>
            <View style={styles.content}>
              <View style={styles.bg} />
              <Banner doctor={data} />
            </View>
            <View style={styles.info}>
              <OverViewBranch branch={data?.branch} />
              <MainInfoDoctor doctor={data} />
              <Feedback doctor={data} />
              <QuestionVideo doctor={data} />
              <ListBottomService
                services={services}
                containerStyle={styles.services}
              />
            </View>
          </Animated.ScrollView>

          <BottomAction doctor={data} />
        </ImageBackground>
      </AfterTimeoutFragment>
    </Screen>
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
  services: {
    marginTop: 8,
    marginBottom: 60,
    backgroundColor: "white",
    paddingTop: 20,
  },
});
