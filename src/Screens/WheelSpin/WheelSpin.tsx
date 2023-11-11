import React, { memo, useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { sizeIcon } from "../../Constant/Icon";
import ModalSuccess from "./ModalSuccess";
import LuckyCircle from "./LuckyCircle";
import { BASE_COLOR, SECOND_COLOR, WHITE, BLACK } from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import {
  _moderateScale,
  _heightScale,
  _widthScale,
} from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import { navigation } from "../../../rootNavigation";
import ModalHistory from "./ModalHistory";
import {
  getConfigSpinWheel,
  getPartnerWheelTurn,
  getNumberParticipant,
  getCurrentActiveWheel,
} from "../../Redux/Action/SpinWheelAction";
import store from "../../Redux/store";
import * as ActionType from "../../Redux/Constants/ActionType";
import { getWallet } from "../../Redux/Action/InfoAction";
import { getConfigData } from "../../Redux/Action/OrtherAction";
import ModalThele from "./ModalThele";
import ScreenKey from "../../Navigation/ScreenKey";
import { alertCustomNotAction } from "../../Constant/Utils";
import ModalGetWheelSpinReward from "./ModalGetWheelSpinReward";
import {
  IconChecklistWhite,
  IconHelpWhite,
  IconHistoryWhite,
} from "../../Components/Icon/Icon";
import { sizeText } from "../../Constant/Text";
import ModalRulesSpinWheel from "./Components/ModalRulesSpinWheel";
import ModalListMissions from "./Components/ModalListMissions";
import ModalListHistoryReward from "./Components/ModalListHistoryReward";
import ModalInfoReward from "./Components/ModalInfoReward";
import ModalExchangeToWheelTurn from "./Components/ModalExchangeToWheelTurn";
import Text from "@Components/Text";
import Header from "./Components/Header";
import useVisible from "src/Hooks/useVisible";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Column from "@Components/Column";
import Row from "@Components/Row";
import Screen from "@Components/Screen";

const WheelSpin = memo((props) => {
  const [showModalSuccess, setShowModalSuccess] = useState({
    show: false,
    data: {},
  });
  const [showModalGetWheelSpinReward, setShowModalGetWheelSpinReward] =
    useState({
      show: false,
      data: {},
    });

  const rulesSpinWheel = useVisible(false);
  const listMissionsPopup = useVisible(false);
  const [showModalListHistoryReward, setShowModalListHistoryReward] =
    useState(false);

  const [showModalInfoReward, setShowModalInfoReward] = useState(false);
  const exchangeToWheelTurnPopup = useVisible(false);

  const historyPopup = useVisible(false);
  const rulePopup = useVisible(false);

  const [showOverlay, setShowOverlay] = useState(false);

  const [wheelTurnCount, setWheelTurnCount] = useState(null);
  const [configSpinWheel, setConfigSpinWheel] = useState({});
  const [configThele, setConfigThele] = useState({});

  const [currActiveWheel, setCurrActiveWheel] = useState({});

  const [numberParticipant, setNumberParticipant] = useState(null);

  const childRef = useRef(null);
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    _getConfigSpinWheel();
    _getConfigThele();
    _getPartnerWheelTurn();
    _getNumberParticipant();
    _getCurrentActiveWheel();
  }, []);

  const _getCurrentActiveWheel = async () => {
    let result = await getCurrentActiveWheel();
    if (result?.isAxiosError) return;
    setCurrActiveWheel(result?.data?.data);
  };

  const _getConfigSpinWheel = async () => {
    let result = await getConfigSpinWheel();
    if (result?.isAxiosError) return;
    setConfigSpinWheel(result?.data?.data);
  };
  const _getNumberParticipant = async () => {
    let result = await getNumberParticipant();
    if (result?.isAxiosError) return;
    setNumberParticipant(result?.data?.data?.numberOfParticipant);
    // setConfigSpinWheel(result?.data?.data)
  };
  const _getPartnerWheelTurn = async () => {
    let result = await getPartnerWheelTurn();
    if (result?.isAxiosError) return;
    if (result?.data?.data?.amount == 0) {
      exchangeToWheelTurnPopup.show();
      // Alert.alert(
      //     "Thông báo",
      //     `Bạn đã hết lượt quay, hãy làm nhiệm vụ để lấy thêm lượt nhé!`,
      //     [
      //         {
      //             text: "Để sau",
      //             onPress: () => console.log("Cancel Pressed"),
      //             // style: "cancel"
      //             // style: 'cancel'
      //         },
      //         {
      //             text: "Đồng ý",
      //             onPress: () => {
      //                 navigation.goBack()
      //                 navigation.navigate(ScreenKey.MISSION_SCREEN)
      //             },
      //         }
      //     ])
    }
    setWheelTurnCount(result?.data?.data);
  };
  const _getConfigThele = async () => {
    let result = await getConfigData("WHEEL_RULE");
    if (result?.isAxiosError) return;
    setConfigThele(result);
  };

  const _onSpinEnd = useCallback((data) => {
    console.log({ trungthuong: data });

    setTimeout(() => {
      setShowModalSuccess({
        show: true,
        data: data,
      });
      // alert(number)
      setShowOverlay(false);
    }, 100);
    _getPartnerWheelTurn();

    _getWallet();
  }, []);

  const _getWallet = async () => {
    var data = await getWallet();
    if (data?.isAxiosError) return;
    store.dispatch({
      type: ActionType.SET_DATA_WALLET,
      payload: {
        data: data,
      },
    });
  };

  const _showOverLay = useCallback((boolean) => {
    setShowOverlay(boolean);
    // alert(number)
  }, []);

  return (
    <Screen>
      <ModalRulesSpinWheel
        dataHTML={currActiveWheel}
        isShow={rulesSpinWheel.visible}
        onHideModal={rulesSpinWheel.hide}
      />

      <ModalListMissions
        getPartnerWheelTurn={_getPartnerWheelTurn}
        currActiveWheel={currActiveWheel}
        isShow={listMissionsPopup.visible}
        onHideModal={listMissionsPopup.hide}
      />

      <ModalListHistoryReward
        isShow={showModalListHistoryReward}
        onHideModal={() => setShowModalListHistoryReward(false)}
      />

      <ModalInfoReward
        isShow={showModalInfoReward}
        onHideModal={() => setShowModalInfoReward(false)}
      />

      <ModalExchangeToWheelTurn
        getPartnerWheelTurn={_getPartnerWheelTurn}
        currActiveWheel={currActiveWheel}
        isShow={exchangeToWheelTurnPopup.visible}
        onHideModal={exchangeToWheelTurnPopup.hide}
      />

      <ModalGetWheelSpinReward
        hide={() => {
          setShowModalGetWheelSpinReward({
            show: false,
            data: {},
          });
        }}
        data={showModalGetWheelSpinReward?.data}
        show={showModalGetWheelSpinReward?.show}
      />
      <ImageBackground
        resizeMode={"cover"}
        source={require("../../Image/spin/newBGWhellSpin.png")}
        style={{ flex: 1 }}
      >
        {showOverlay ? (
          <View
            style={{
              zIndex: 1,
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "transparent",
            }}
          />
        ) : (
          <></>
        )}

        <ModalSuccess
          confirmGetReward={() => {
            console.log({ xa: showModalSuccess?.data });

            setShowModalSuccess({
              show: false,
              data: {},
            });

            return Alert.alert("Nhận thưởng thành công");

            if (
              showModalSuccess?.data?.data?.data?.awards[0]?.code == "LIA_BONUS"
            ) {
              navigation.navigate(ScreenKey.AFFILIATE, {
                showModalInfoWallet: true,
              });
              alertCustomNotAction(
                `Thông báo`,
                `${showModalSuccess?.data?.data?.data?.awards[0]?.name} đã được cộng vào ví`
              );
              setShowModalSuccess({
                show: false,
                data: {},
              });
            }
            if (
              showModalSuccess?.data?.data?.data?.awards[0]?.code == "STRING"
            ) {
              setShowModalGetWheelSpinReward({
                show: true,
                data: showModalSuccess?.data?.data,
              });
              // setShowModalSuccess({
              //     show: false,
              //     data: {}
              // })
            }
            if (
              showModalSuccess?.data?.data?.data?.awards[0]?.code == "COUPON"
            ) {
              navigation.navigate(ScreenKey.LIST_VOUCHER);
            }
            if (
              showModalSuccess?.data?.data?.data?.awards[0]?.code ==
              "LIA_TICKET"
            ) {
              setShowModalGetWheelSpinReward({
                show: true,
                data: showModalSuccess?.data?.data,
              });
              // setShowModalSuccess({
              //     show: false,
              //     data: {}
              // })
            }
          }}
          hide={() => {
            setShowModalSuccess({
              show: false,
              data: {},
            });
          }}
          data={showModalSuccess?.data}
          show={showModalSuccess?.show}
        />

        <ModalHistory hide={historyPopup.hide} show={historyPopup.visible} />
        <ModalThele
          hide={rulePopup.hide}
          data={configThele}
          show={rulePopup.visible}
        />
        <Header onOpenRule={rulesSpinWheel.show} />
        <Column flex={1} marginTop={top + 50}>
          <Image
            style={{
              height: _heightScale(8 * 10),
              width: "100%",
              resizeMode: "contain",
            }}
            source={require("../../Image/spin/newTextTop.png")}
          />

          <Column marginTop={_moderateScale(8)}>
            <LuckyCircle
              currActiveWheel={currActiveWheel}
              data={configSpinWheel}
              showOverLay={_showOverLay}
              number={3}
              onSpinEnd={_onSpinEnd}
            />
            <Column
              position="absolute"
              alignSelf="center"
              bottom={_heightScale(7)}
            >
              <Text weight="bold" size={12} color={WHITE}>
                {wheelTurnCount?.amount} lượt
              </Text>
            </Column>
            <TouchableOpacity
              onPress={exchangeToWheelTurnPopup.show}
              hitSlop={styleElement.hitslopSm}
              style={{
                position: "absolute",
                left: 0,
                bottom: 8,
                paddingHorizontal: 16,
                height: _moderateScale(8 * 4),
                backgroundColor: WHITE,
                borderTopRightRadius: _moderateScale(8 * 2),
                borderBottomRightRadius: _moderateScale(8 * 2),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...stylesFont.fontNolan500,
                  fontSize: _moderateScale(13),
                  color: BLACK,
                }}
              >
                Mua lượt quay
              </Text>
            </TouchableOpacity>
          </Column>
          <Column
            marginTop={_heightScale(8 * 6)}
            width={"100%"}
            marginBottom={bottom}
          >
            <Row
              justifyContent="space-between"
              paddingHorizontal={_widthScale(8 * 8)}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={listMissionsPopup.show}
              >
                <IconChecklistWhite style={sizeIcon.xxlllg} />
                <Text weight="bold" size={16} color={WHITE} top={8}>
                  Nhiệm vụ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setShowModalListHistoryReward(true);
                }}
              >
                <IconHistoryWhite style={sizeIcon.xxlllg} />
                <Text weight="bold" size={16} color={WHITE} top={8}>
                  Lịch sử quay
                </Text>
              </TouchableOpacity>
            </Row>
          </Column>
        </Column>
      </ImageBackground>
    </Screen>
  );
});

const styles = StyleSheet.create({
  ls: {
    width: _heightScale(8 * 13),
    height: _heightScale(8 * 13),
    resizeMode: "contain",
  },
  tl: {
    width: _heightScale(8 * 13),
    height: _heightScale(8 * 13),
    resizeMode: "contain",
    // bottom: _heightScale(2)
  },
  button: {
    alignItems: "center",
  },
});

export default WheelSpin;
