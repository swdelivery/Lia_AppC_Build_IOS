import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
import BeautyInsurancePopup from "./Components/BeautyInsurancePopup";
import useVisible from "src/Hooks/useVisible";
import { useServiceDetailsContext, withServiceDetailsContext } from "./context";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import useServiceReviews from "./useServiceReviews";
import useRecomendServices from "./useRecomendServices";
import HorizontalServicesV2 from "@Components/HorizontalServicesV2";

const DetailService = () => {
  const { service } = useServiceDetailsContext();
  const { data: reviews } = useServiceReviews(service);
  const recomendServices = useRecomendServices(service);
  const beautyInsurancePopup = useVisible(false);

  return (
    <Screen safeBottom safeTop style={styles.container}>
      <Header />
      <AfterTimeoutFragment>
        <ScrollView style={styles.content}>
          <HorizonListImage service={service} />
          <View style={styles.body}>
            <LinearGradient
              style={[StyleSheet.absoluteFill, styles.bodyBg]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              colors={["#EC54C3", "white", "#F7F8FA"]}
            />
            {/* <FlashSale /> */}
            <NameService service={service} />
            <OverViewFeedBack service={service} reviewsData={reviews} />
          </View>
          <InfoBranch service={service} />
          <Material service={service} />
          <BeautyInsurance onViewMore={beautyInsurancePopup.show} />
          {/* <Tutorial /> */}
          <MainInfoService service={service} />
          <HorizontalServicesV2
            title="Có thể bạn sẽ quan tâm"
            items={recomendServices}
            containerStyle={styles.recomendService}
          />
          <Feedback reviews={reviews?.data} />

          <Spacer top={16} />
          <ListBottomService services={recomendServices} />
        </ScrollView>
        <BottomAction />
        <BeautyInsurancePopup
          visible={beautyInsurancePopup.visible}
          onClose={beautyInsurancePopup.hide}
        />
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
    marginTop: -15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: _moderateScale(8 * 2),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    backgroundColor: "#F7F8FA",
    paddingBottom: 60,
  },
  bodyBg: {
    zIndex: -1,
    borderRadius: _moderateScale(8 * 2),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  recomendService: {
    marginHorizontal: 8,
    backgroundColor: "white",
    paddingHorizontal: 16,
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
