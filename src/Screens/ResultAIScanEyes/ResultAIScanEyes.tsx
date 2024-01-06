import LiAHeader from "@Components/Header/LiAHeader";
import Screen from "@Components/Screen";
import Spacer from "@Components/Spacer";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { NEW_BASE_COLOR, WHITE } from "../../Constant/Color";
import {
  _moderateScale,
  _width,
  _widthScale
} from "../../Constant/Scale";
import ListDiary from "./Components/ListDiary";
import OverViewEyes from "./Components/OverViewEyes";
import RecomendBrach from "./Components/RecomendBrach";
import RecomendDoctor from "./Components/RecomendDoctor";
import RecomendService from "./Components/RecomendService";

const ResultAIScanEyes = (props) => {
  const { scanningResult, imageScan } = props?.route?.params;

  return (
    <Screen style={styles.container}>
      <LiAHeader
        safeTop
        titleColor={NEW_BASE_COLOR}
        barStyle={"dark-content"}
        bg={WHITE}
        title={"KẾT QUẢ CHI TIẾT"}
      />
      <ScrollView>
        <Spacer top={8 * 2} />
        <OverViewEyes
          scanningResult={scanningResult}
          imageScan={imageScan} />
        <ListDiary />
        <RecomendService />
        <RecomendDoctor />
        <RecomendBrach />
        <Spacer top={8 * 20} />
      </ScrollView>
    </Screen>
  );
};

export default ResultAIScanEyes;

const styles = StyleSheet.create({
  dot: {
    width: _moderateScale(8),
    height: _moderateScale(8),
    borderRadius: _moderateScale(4),
    backgroundColor: "#28A745",
    marginRight: _moderateScale(4),
  },
  overView__box__leftEye: {
    width: _moderateScale(8 * 14),
    height: _moderateScale(8 * 14),
    borderRadius: _moderateScale(8 * 2),
  },
  overView__box: {
    width: _widthScale(350),
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,.3)",
    borderRadius: _moderateScale(8 * 2),
    paddingBottom: _moderateScale(8 * 2),
  },
  overView: {
    width: _width,
    paddingTop: _moderateScale(8 * 4),
    paddingBottom: _moderateScale(8 * 2),
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
