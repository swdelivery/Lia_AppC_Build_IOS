import { StatusBar, StyleSheet } from "react-native";
import React from "react";
import CoverImage from "./Components/CoverImage";
import Header from "./Components/Header";
import { _moderateScale, _width } from "../../Constant/Scale";
import BannerInfo from "./Components/BannerInfo";
import Wave from "./Components/Wave";
import ListDiary from "./Components/ListDiary";
import ConsultanCus from "./Components/ConsultanCus";
import ListDoctor from "./Components/ListDoctor";
import MainInfo from "./Components/MainInfo";
import HorizontalServices from "@Components/HorizontalServices";
import Feedback from "./Components/Feedback";
import BottomAction from "./Components/BottomAction";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import Screen from "@Components/Screen";
import { useNavigationParams } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import Column from "@Components/Column";
import useBranchDetails from "./useBranchDetails";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import Placeholder from "./Components/Placeholder";

type ScreenK = typeof ScreenKey.DETAIL_BRAND;

const DetailBranch = () => {
  const { branch } = useNavigationParams<ScreenK>();
  const { data } = useBranchDetails(branch);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  return (
    <Screen safeBottom>
      <StatusBar barStyle={"dark-content"} />
      <Header scrollY={scrollY} title={data?.name} />
      <AfterTimeoutFragment placeholder={<Placeholder />}>
        <CoverImage scrollY={scrollY} branch={data} />
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          contentContainerStyle={styles.contentContainer}
        >
          <BannerInfo branch={data} />
          <Wave />
          <Column gap={30}>
            <MainInfo branch={data} />
            <ListDoctor branch={data} />
            <ListDiary branch={data} />
            {data?.branchProblemFileArr?.length > 0 && (
              <ConsultanCus branch={data} />
            )}
            {data?.branchServices?.length > 0 && (
              <HorizontalServices
                title="Dịch vụ phổ biến"
                items={data.branchServices}
              />
            )}
            <Feedback branch={data} />
            {/* <QandA /> */}
          </Column>
        </Animated.ScrollView>
        <BottomAction branch={data} />
      </AfterTimeoutFragment>
    </Screen>
  );
};

export default DetailBranch;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 200,
    backgroundColor: "transparent",
  },
});
