import React, { useEffect, useMemo } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { _moderateScale, _width, _widthScale } from "../../Constant/Scale";
import Feedback from "./Components/Feedback";
import Header from "./Components/Header";
import HorizonListImage from "./Components/HorizonListImage";
import InfoBranch from "./Components/InfoBranch";
import MainInfoService from "./Components/MainInfoService";
import Material from "./Components/Material";
import NameService from "./Components/NameService";
import OverViewFeedBack from "./Components/OverViewFeedBack";
import Screen from "@Components/Screen";
import Spacer from "@Components/Spacer";
import ListBottomService from "@Components/ListBottomService/ListBottomService";
import BottomAction from "./Components/BottomAction";
import BeautyInsurance from "./Components/BeautyInsurance";
import { useServiceDetailsContext, withServiceDetailsContext } from "./context";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import useServiceReviews from "./useServiceReviews";
import useRecomendServices from "./useRecomendServices";
import HorizontalServicesV2 from "@Components/HorizontalServicesV2";
import Placeholder from "./Components/Placeholder";
import useImageColors from "src/Hooks/useImageColors";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { getImageAvataUrl } from "src/utils/avatar";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import RecommendServices from "./Components/RecommendServices";
import RelatedServices from "./Components/RelatedServices";
import FlashSale from "./Components/FlashSale";
import { isEmpty } from "lodash";

const DetailService = () => {
  const { navigate } = useNavigate();
  const { service } = useServiceDetailsContext();
  const { data: reviews, meta: reviewsMeta } = useServiceReviews(service);
  const { secondColor, primaryColor, getColors } = useImageColors();

  useEffect(() => {
    if (service?.representationServiceFileArr?.length) {
      getColors(getImageAvataUrl(service.representationServiceFileArr[0]));
    }
  }, [service]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        primaryColor.value === "#FFFFFF"
          ? secondColor.value
          : primaryColor.value,
        { duration: 500 }
      ),
    };
  });

  const bannerImages = useMemo(() => {
    return isEmpty(service?.representationServiceFileArr)
      ? [service.avatar]
      : service.representationServiceFileArr;
  }, [service]);

  return (
    <Screen safeBottom safeTop style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />
      <Header />
      <AfterTimeoutFragment placeholder={<Placeholder />} timeout={1000}>
        <ScrollView style={styles.content}>
          <HorizonListImage images={bannerImages} getColors={getColors} />
          <View style={styles.body}>
            <Animated.View style={[styles.bodyBg2, animatedStyle]} />
            <LinearGradient
              style={styles.bodyBg}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["transparent", "white", "#F7F8FA"]}
            >
              <NameService service={service} />
              <OverViewFeedBack
                service={service}
                reviews={reviews}
                total={reviewsMeta?.totalDocuments}
              />
            </LinearGradient>
            {/* <FlashSale /> */}
          </View>
          <InfoBranch service={service} />
          <Material service={service} />
          <BeautyInsurance
            onViewMore={navigate(ScreenKey.LIST_BEAUTY_INSURANCE)}
          />
          {/* <Tutorial /> */}
          <MainInfoService service={service} />
          <RelatedServices service={service} />
          <Feedback reviews={reviews} />

          <Spacer top={16} />
          <RecommendServices service={service} />
        </ScrollView>
        <BottomAction service={service} />
      </AfterTimeoutFragment>
    </Screen>
  );
};

export default withServiceDetailsContext(DetailService);

const styles = StyleSheet.create({
  start: {
    width: 8 * 1.75,
    height: 8 * 1.75,
    marginLeft: 1,
    resizeMode: "contain",
  },
  infoService: {
    paddingTop: _moderateScale(8),
    width: _widthScale(360),
    height: _moderateScale(8 * 20),
    alignSelf: "center",
    marginTop: _moderateScale(4),
    backgroundColor: "white",
    borderRadius: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 1.5),
  },
  priceFlashSale__filnalPrice: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  priceFlashSale: {
    width: _widthScale(360),
    height: _moderateScale(8 * 8),
    alignSelf: "center",
    marginTop: _moderateScale(8 * 1),
    backgroundColor: "white",
    borderRadius: _moderateScale(8),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: _moderateScale(8 * 2),
  },
  flashsale__text: {
    fontSize: _moderateScale(16),
  },
  flashsale: {
    flexDirection: "row",
    marginTop: _moderateScale(8),
    paddingHorizontal: _moderateScale(8 * 2),
    justifyContent: "space-between",
  },
  body: {
    width: _width,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    backgroundColor: "#F7F8FA",
    paddingBottom: 60,
  },
  bodyBg: {},
  bodyBg2: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
});
