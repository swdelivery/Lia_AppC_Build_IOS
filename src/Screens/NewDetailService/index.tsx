import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { _moderateScale, _width, _widthScale } from "../../Constant/Scale";
import Feedback from "./Components/Feedback";
import HorizonListImage from "./Components/HorizonListImage";
import InfoBranch from "./Components/InfoBranch";
import MainInfoService from "./Components/MainInfoService";
import Material from "./Components/Material";
import NameService from "./Components/NameService";
import OverViewFeedBack from "./Components/OverViewFeedBack";
import Spacer from "@Components/Spacer";
import BottomAction from "./Components/BottomAction";
import BeautyInsurance from "./Components/BeautyInsurance";
import { useServiceDetailsContext, withServiceDetailsContext } from "./context";
import useServiceReviews from "./useServiceReviews";
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
import ListVideo from "./Components/ListVideo";
import Products from "./Components/Products";

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

  return (
    <>
      <ScrollView style={styles.content}>
        <HorizonListImage
          images={service?.representationServiceFileArr}
          getColors={getColors}
        />
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
        </View>
        <InfoBranch service={service} />
        {service?.guideVideo?.length > 0 && <ListVideo service={service} />}
        <Material service={service} />
        <Products service={service} />
        <BeautyInsurance
          onViewMore={navigate(ScreenKey.LIST_BEAUTY_INSURANCE)}
        />
        <MainInfoService service={service} />
        <RelatedServices service={service} />
        <Feedback reviews={reviews} />

        <Spacer top={16} />
        <RecommendServices service={service} />
      </ScrollView>
      <BottomAction service={service} />
    </>
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
