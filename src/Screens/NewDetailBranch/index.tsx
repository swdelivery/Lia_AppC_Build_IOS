import { StatusBar, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import CoverImage from "./Components/CoverImage";
import Header from "./Components/Header";
import { _moderateScale, _width } from "../../Constant/Scale";
import BannerInfo from "./Components/BannerInfo";
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
import Screen from "@Components/Screen";
import { useFocused, useNavigationParams } from "src/Hooks/useNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getBranchDetails } from "@Redux/branch/actions";
import ScreenKey from "@Navigation/ScreenKey";
import { getBranchDetailsState } from "@Redux/branch/selectors";
import Column from "@Components/Column";

type ScreenK = typeof ScreenKey.DETAIL_BRAND;

const DetailBranch = () => {
  const dispatch = useDispatch();
  const { idBranch } = useNavigationParams<ScreenK>();
  const { data } = useSelector(getBranchDetailsState);
  const scrollY = useSharedValue(0);

  const getData = useCallback(() => {
    dispatch(getBranchDetails.request(idBranch));
  }, [idBranch]);

  useFocused(() => {
    getData();
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Screen safeBottom>
      <StatusBar barStyle={"dark-content"} />
      <Header scrollY={scrollY} title={data?.name} />
      <CoverImage scrollY={scrollY} />
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={styles.contentContainer}
      >
        <BannerInfo />
        <Wave />
        <Column gap={16}>
          <MainInfo />
          <ListDoctor />
          <ListDiary />
          <ConsultanCus />
          {data?.branchServices?.length > 0 && (
            <TopService title="Dịch vụ phổ biến" items={data.branchServices} />
          )}
          <Feedback />
          <QandA />
        </Column>
      </Animated.ScrollView>
      <BottomAction />
    </Screen>
  );
};

export default DetailBranch;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 200,
  },
});
