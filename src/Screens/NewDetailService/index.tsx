import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { _moderateScale, _width, _widthScale } from "../../Constant/Scale";
import Feedback from "./Components/Feedback";
import FlashSale from "./Components/FlashSale";
import Header from "./Components/Header";
import HorizonListImage from "./Components/HorizonListImage";
import InfoBranch from "./Components/InfoBranch";
// import ListBottonService from "./Components/ListBottonService";
import MainInfoService from "./Components/MainInfoService";
import Material from "./Components/Material";
import NameService from "./Components/NameService";
import OverViewFeedBack from "./Components/OverViewFeedBack";
import RecomendService from "./Components/RecomendService";
import Tutorial from "./Components/Tutorial";
import Screen from "@Components/Screen";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigationParams } from "src/Hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getServiceDetails, getServiceReviews, getServicesByGroups } from "@Redux/service/actions";
import Spacer from "@Components/Spacer";
import { getServiceDetailsState, getServiceListState, getServiceReviewsState } from "@Redux/service/selectors";
import ListBottomService from "@Components/ListBottomService/ListBottomService";
import BottomAction from "./Components/BottomAction";
import BeautyInsurance from "./Components/BeautyInsurance";
import BeautyInsurancePopup from "./Components/BeautyInsurancePopup";
import useVisible from "src/Hooks/useVisible";

const HEIGHT_IMAGE_SERVICE = (_width * 926) / 1242;

type ScreenKey = typeof ScreenKey.DETAIL_SERVICE;

const DetailService = () => {
  const dispatch = useDispatch();
  const { idService } = useNavigationParams<ScreenKey>();
  const { data } = useSelector(getServiceDetailsState);
  const { data: dataListService } = useSelector(getServiceListState);
  const beautyInsurancePopup = useVisible(false);

  useEffect(() => {
    dispatch(getServiceDetails.request(idService));
  }, [idService]);

  useEffect(() => {
    if (data?.code) {
      dispatch(
        getServiceReviews.request({
          serviceCode: data.code,
        })
      );
    }
  }, [data?.code]);

  useEffect(() => {
    dispatch(
      getServicesByGroups.request({
        codeGroup: data?.codeGroup,
      })
    );
  }, [data?.codeGroup]);

  return (
    <Screen safeBottom safeTop style={styles.container}>
      <Header />
      <ScrollView>
        <HorizonListImage />
        <View style={styles.body}>
          <LinearGradient
            style={[StyleSheet.absoluteFill, styles.bodyBg]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={["#EC54C3", "white", "#F7F8FA"]}
          />
          {/* <FlashSale /> */}
          <NameService />
          <OverViewFeedBack />
        </View>
        <InfoBranch />
        <Material />
        <BeautyInsurance onViewMore={beautyInsurancePopup.show} />
        <Tutorial />
        <MainInfoService />
        <RecomendService />
        <Feedback />

        <Spacer top={16} />
        <ListBottomService data={dataListService} />
      </ScrollView>
      <BottomAction />
      <BeautyInsurancePopup
        visible={beautyInsurancePopup.visible}
        onClose={beautyInsurancePopup.hide}
      />
    </Screen>
  );
};

export default DetailService;

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
    backgroundColor: "#F7F8FA",
  },
  bodyBg: {
    zIndex: -1,
    borderRadius: _moderateScale(8 * 2),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
