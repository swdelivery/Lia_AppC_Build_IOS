import LiAHeader from "@Components/Header/LiAHeader";
import Screen from "@Components/Screen";
import Spacer from "@Components/Spacer";
import React, { useCallback, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { BASE_COLOR, NEW_BASE_COLOR, WHITE } from "../../Constant/Color";
import {
  _height,
  _moderateScale,
  _width,
  _widthScale,
} from "../../Constant/Scale";
import ListDiary from "./Components/ListDiary";
import OverViewEyes from "./Components/OverViewEyes";
import RecomendBrach from "./Components/RecomendBrach";
import RecomendDoctor from "./Components/RecomendDoctor";
import RecomendService from "./Components/RecomendService";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import Column from "@Components/Column";
import Text from "@Components/Text";
import { MirrorIcon } from "@Components/Icon/Icon";
import { useNavigate } from "src/Hooks/useNavigation";
import useConfirmation from "src/Hooks/useConfirmation";
import { useDispatch } from "react-redux";
import { saveResult } from "@Redux/resultcanningeyes/actions";
import Icon from "@Components/Icon";

const ResultAIScanEyes = (props) => {
  const { navigation } = useNavigate();
  const dispatch = useDispatch();
  const { scanningResult, imageScan, fromHistory } = props?.route?.params;
  const { showConfirmation } = useConfirmation();
  const displayedConfirmation = useRef(false);

  const handleSave = useCallback(
    (shouldGoBack = false) =>
      () => {
        displayedConfirmation.current = true;
        showConfirmation(
          "Thông báo",
          'Bạn có muốn lưu lại thông tin\n"Kết quả phân tích" không?',
          () => {
            dispatch(saveResult({ scanningResult, imageScan }));
            if (shouldGoBack) {
              navigation.goBack();
            }
          },
          () => {
            if (shouldGoBack) {
              navigation.goBack();
            }
          }
        );
      },
    [scanningResult, imageScan]
  );

  const handleBackPress = useCallback(() => {
    if (!fromHistory && !displayedConfirmation.current) {
      // Ask to save result
      handleSave(true)();
    } else {
      navigation.goBack();
    }
  }, [handleSave, fromHistory]);

  return (
    <Screen style={styles.container}>
      <LiAHeader
        safeTop
        titleColor={NEW_BASE_COLOR}
        barStyle={"dark-content"}
        bg={WHITE}
        title={"KẾT QUẢ CHI TIẾT"}
        onBackPress={handleBackPress}
        right={
          !fromHistory ? (
            <Column onPress={handleSave(false)}>
              <Icon name="check" color={BASE_COLOR} />
            </Column>
          ) : undefined
        }
      />
      {scanningResult ? (
        <ScrollView>
          <Spacer top={8 * 2} />
          <OverViewEyes scanningResult={scanningResult} imageScan={imageScan} />
          <ListDiary />
          {/* <AfterTimeoutFragment>
            <RecomendService scanningResult={scanningResult} />
            <RecomendDoctor />
            <RecomendBrach />
          </AfterTimeoutFragment> */}
          <Spacer top={8 * 20} />
        </ScrollView>
      ) : (
        <Placeholder />
      )}
    </Screen>
  );
};

function Placeholder() {
  const { navigation } = useNavigate();

  return (
    <Column
      // justifyContent="center"
      alignItems="center"
      height={_height}
      paddingTop={_height / 4}
      gap={16}
    >
      <MirrorIcon width={100} height={100} color={"#E7EDF1"} />
      <Column
        backgroundColor={BASE_COLOR}
        paddingHorizontal={16}
        paddingVertical={4}
        borderRadius={24}
        onPress={navigation.goBack}
      >
        <Text color={"white"} weight="bold">
          Đi đến gương thần
        </Text>
      </Column>
    </Column>
  );
}

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
