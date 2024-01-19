import Column from "@Components/Column";
import LiAHeader from "@Components/Header/LiAHeader";
import Screen from "@Components/Screen";
import Spacer from "@Components/Spacer";
import { FocusAwareStatusBar } from "@Components/StatusBar";
import { _heightScale, _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { getInfoUserReducer } from "@Redux/Selectors";
import { getPartnerLevel, setCurrPartnerLevel } from "@Redux/affiliate/actions";
import {
  getCurrPartnerLevelState,
  getListPartnerLevelState,
} from "@Redux/affiliate/selectors";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CardLevel from "./Components/CardLevel";
import InfoUser from "./Components/InfoUser";
import Text from "@Components/Text";
import { NEW_BASE_COLOR, WHITE } from "@Constant/Color";
import InfoReward from "./Components/InfoReward";
import TutMakeMoney from "./Components/TutMakeMoney";
import ListF1Btn from "./Components/ListF1Btn";
import CheckOrderBtn from "./Components/CheckOrderBtn";
import QA from "./Components/QA";
import Row from "@Components/Row";
import Icon from "@Components/Icon";
import { IconAffiliateRanked, IconAffiliateWallet, IconBXH, IconWallet } from "@Components/Icon/Icon";
import { useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import useHapticCallback from "src/Hooks/useHapticCallback";
import { checkStepUnlockAffiliate } from "@Redux/Action/Affiilate";
import ModalShareCodeAffiliate from "./Components/ModalShareCodeAffiliate";
import ModalRequireBecomeCTV from "./Components/ModalRequireBecomeCTV";
import ModalShowInfoRanked from "./Components/ModalShowInfoRanked";
import ModalPolicy from "./Components/ModalPolicy";
import useVisible from "src/Hooks/useVisible";
import ModalPromotionPolicy from "./Components/ModalPromotionPolicy";

const WIDTH_CARD = _width - 8 * 4;
const WIDTH_PROCESS_BAR = _width - 8 * 4 - 8 * 4;

const NewAffiliate = () => {
  const flatListRef = useRef(null)
  const dispatch = useDispatch();
  const { navigate } = useNavigate();
  const { data: listPartnerLevel } = useSelector(getListPartnerLevelState);
  const { data: currPartnerLevel } = useSelector(getCurrPartnerLevelState);
  const { infoUser } = useSelector(getInfoUserReducer);

  const [currIndexCard, setCurrIndexCard] = useState(0);
  const [flagRequireDoneStepToShareCode, setFlagRequireDoneStepToShareCode] =
    useState(false);
  const [stepUnlockAffiliate, setStepUnlockAffiliate] = useState({});
  const [showModalShareCodeAffiliate, setShowModalShareCodeAffiliate] =
    useState(false);
  const [showModalRequireBecomeCTV, setShowModalRequireBecomeCTV] =
    useState(false);
  const [showModalInfoRanked, setShowModalInfoRanked] = useState(false);

  const visiblePolicy = useVisible();
  const visiblePromotionPolicy = useVisible();

  useEffect(() => {
    dispatch(getPartnerLevel.request());
    _checkStep(infoUser?._id);
  }, []);

  useEffect(() => {
    if (listPartnerLevel && currPartnerLevel) {
      let findIndexCurrPartnerLevel = listPartnerLevel.findIndex(
        (item) => item?.code == currPartnerLevel?.code
      );
      if (findIndexCurrPartnerLevel !== -1) {
        setTimeout(() => {
          flatListRef?.current?.scrollToIndex({
            index: findIndexCurrPartnerLevel,
            animated: true,
          });
        }, 1000);
      }
    }
  }, [listPartnerLevel, currPartnerLevel])

  useEffect(() => {
    let findCurrPartnerLevel = listPartnerLevel.find(
      (item) => item?.code == infoUser?.levelCode
    );
    if (findCurrPartnerLevel) {
      dispatch(setCurrPartnerLevel(findCurrPartnerLevel));
    }
  }, [listPartnerLevel, infoUser]);

  const _checkStep = async (id) => {
    let result = await checkStepUnlockAffiliate(id);
    if (result?.isAxiosError) return;

    let { isCollaburator, serviceUsed, diaryFinished, sharedDiary } =
      result?.data?.data;
    if (isCollaburator && serviceUsed && diaryFinished && sharedDiary) {
      setStepUnlockAffiliate(result?.data?.data);
    }
  };

  const _handlePressIntiveBtn = useHapticCallback(() => {
    if (stepUnlockAffiliate?.isCollaburator) {
      setShowModalShareCodeAffiliate((old) => !old);
    } else {
      setFlagRequireDoneStepToShareCode(true);
      setTimeout(() => {
        setFlagRequireDoneStepToShareCode(false);
      }, 300);
    }
  }, [stepUnlockAffiliate]);

  const _renderItem = useCallback(
    ({ item }) => {
      return (
        <Column alignItems="center" width={_width}>
          <CardLevel
            showPolicy={visiblePolicy.show}
            setShowModalInfoRanked={setShowModalInfoRanked}
            data={item}
          />
        </Column>
      );
    },
    [currPartnerLevel, listPartnerLevel]
  );

  const _awesomeChildListKeyExtractor = useCallback(
    (item) => `awesome-child-key-${item._id}`,
    []
  );

  return (
    <Screen>
      <FocusAwareStatusBar barStyle="light-content" />
      <ImageBackground
        resizeMode={"stretch"}
        style={styleElement.flex}
        source={require("../../NewImage/Affiliate/background.png")}
      >
        <LiAHeader
          right={
            <Row alignItems="flex-end" gap={8 * 2}>
              <TouchableOpacity onPress={navigate(ScreenKey.LIST_RANKED)}>
                <IconAffiliateRanked width={8 * 3.5} height={8 * 4.5} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigate(ScreenKey.INFO_WALLET_NEW_AFFILIATE)}
              >
                <IconAffiliateWallet width={8 * 3} height={8 * 3} />
              </TouchableOpacity>
            </Row>
          }
          safeTop
          bg={"transparent"}
          title="TRI  ÂN"
        />

        <ScrollView>
          <InfoUser />
          <Spacer top={_heightScale(8 * 6)} />
          <FlatList
            ref={flatListRef}
            onMomentumScrollEnd={(event) => {
              const index = Math.ceil(
                event.nativeEvent.contentOffset.x /
                event.nativeEvent.layoutMeasurement.width
              );
              setCurrIndexCard(index);
            }}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            keyExtractor={_awesomeChildListKeyExtractor}
            horizontal
            renderItem={_renderItem}
            data={listPartnerLevel}
          />
          <InfoReward visiblePromotionPolicy={visiblePromotionPolicy} currIndexCard={currIndexCard} />
          <Spacer top={8 * 2} />

          <Column
            borderRadius={8}
            marginHorizontal={8 * 2}
            backgroundColor={"#182128"}
          >
            <TutMakeMoney
              flagRequireDoneStepToShareCode={flagRequireDoneStepToShareCode}
            />
            <View style={styles.line} />
            <ListF1Btn />
            <View style={styles.line} />
            <CheckOrderBtn />
            <View style={styles.line} />
            <QA />
          </Column>

          <Spacer top={8 * 5} />

          <TouchableOpacity onPress={_handlePressIntiveBtn}>
            <Column
              borderRadius={8 * 3}
              borderWidth={1}
              height={8 * 7}
              borderColor={NEW_BASE_COLOR}
              backgroundColor={"#182128"}
              justifyContent="center"
              alignItems="center"
              marginHorizontal={8 * 2}
            >
              <Row>
                <Text color={WHITE} weight="bold">
                  Giới thiệu bạn bè
                </Text>
              </Row>

              <Column right={8 * 5} position="absolute">
                <Icon color={WHITE} name="share" />
              </Column>
            </Column>
          </TouchableOpacity>

          <Spacer top={8 * 20} />
        </ScrollView>
        <ModalShareCodeAffiliate
          isShow={showModalShareCodeAffiliate}
          onHideModal={() => setShowModalShareCodeAffiliate(false)}
        />
        <ModalRequireBecomeCTV
          isShow={showModalRequireBecomeCTV}
          onHideModal={() => setShowModalRequireBecomeCTV(false)}
        />
        <ModalShowInfoRanked
          isShow={showModalInfoRanked}
          onHideModal={() => setShowModalInfoRanked(false)}
        />
        <ModalPolicy visiblePolicy={visiblePolicy} />
        <ModalPromotionPolicy visiblePromotionPolicy={visiblePromotionPolicy} />

      </ImageBackground>
    </Screen>
  );
};

export default NewAffiliate;

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 0.5,
    backgroundColor: WHITE,
  },
  card: {
    width: WIDTH_CARD,
    height: (WIDTH_CARD * 796) / 1484,
  },
});
