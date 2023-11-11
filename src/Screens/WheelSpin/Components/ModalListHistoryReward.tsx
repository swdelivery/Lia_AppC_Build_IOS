import React, { memo, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { BtnHistory, IconCancelGrey } from "../../../Components/Icon/Icon";
import ModalFlashMsg from "../../../Components/ModalFlashMsg/ModalFlashMsg";
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { sizeIcon } from "../../../Constant/Icon";
import {
  _height,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import { sizeText } from "../../../Constant/Text";
import { getHistorySpin } from "../../../Redux/Action/SpinWheelAction";
import moment from "moment";
import Text from "@Components/Text";

const ModalListHistoryReward = memo((props) => {
  const infoUserRedux = useSelector((state) => state.infoUserReducer?.infoUser);

  const opacityBackDrop = useSharedValue(0);
  const tranYModal = useSharedValue(0);
  const [showModalFlashMsg, setShowModalFlashMsg] = useState(false);

  const [listHistoryReward, setListHistoryReward] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (props?.isShow) {
      _getListHistoryReward();
      tranYModal.value = withTiming(-650, { duration: 200 });
      opacityBackDrop.value = withTiming(1, { duration: 300 });
    } else {
    }
  }, [props?.isShow]);

  const _getListHistoryReward = async () => {
    let result = await getHistorySpin({
      condition: {
        eventCode: {
          equal: "SPIN_WHEEL",
        },
      },
      // "sort": {},
      // "limit": 50,
      // "page": 1
    });

    setListHistoryReward(result?.data?.data);
  };

  const animTranY = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: tranYModal.value,
        },
      ],
    };
  });

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return {
      opacity: opacityBackDrop.value,
    };
  });

  const _handleHideModal = () => {
    tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
      if (fnd) {
        runOnJS(_hideModal)();
      }
    });
    opacityBackDrop.value = withTiming(0, { duration: 200 });
  };
  const _hideModal = () => {
    props?.onHideModal();
  };

  return (
    <>
      {props?.isShow ? (
        <View
          style={{
            width: _width,
            height: _height,
            position: "absolute",
            zIndex: 100,
          }}
        >
          <ModalFlashMsg
            bottom
            show={showModalFlashMsg}
            hide={() => {
              setShowModalFlashMsg(false);
            }}
            data={"Đã copy."}
          />

          <Animated.View
            style={[
              {
                width: _width,
                height: _height,
              },
              {
                backgroundColor: "rgba(0,0,0,.7)",
              },
              animOpacityBackDrop,
            ]}
          >
            <TouchableOpacity
              onPress={() => _handleHideModal()}
              style={[StyleSheet.absoluteFillObject]}
            />
          </Animated.View>

          <Animated.View
            style={[
              {
                width: _width,
                backgroundColor: WHITE,
                borderRadius: _moderateScale(8 * 2),
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                paddingBottom: _moderateScale(8 * 2),
                position: "absolute",
                bottom: -650,
                height: 650,
              },
              animTranY,
            ]}
          >
            <View style={styles.header}>
              <View style={{ alignItems: "center", width: _width }}>
                <View style={{ top: -_moderateScale((8 * 7) / 2) }}>
                  <BtnHistory
                    style={{
                      width: _moderateScale(8 * 25),
                      height: _moderateScale(8 * 7),
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={_handleHideModal}
                  style={{
                    position: "absolute",
                    right: _moderateScale(8 * 3),
                    zIndex: 100,
                    top: _moderateScale(8 * 2),
                  }}
                >
                  <IconCancelGrey style={sizeIcon.md} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ height: _moderateScale(8 * 0) }} />

            <ScrollView>
              {listHistoryReward?.map((item, index) => {
                return (
                  <View style={styles.itemMission}>
                    <View style={{ flex: 1 }}>
                      <Text weight="bold">{item?.awards[0]?.name}</Text>
                      <Text
                        style={[
                          sizeText.normal_500,
                          {
                            marginTop: _moderateScale(8),
                            color: BASE_COLOR,
                            fontStyle: "italic",
                          },
                        ]}
                      >
                        {moment(item?.created).format("hh:ss - DD/MM/YYYY")}
                      </Text>
                    </View>
                  </View>
                );
              })}
              <View style={{ height: 100 }} />
            </ScrollView>
          </Animated.View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
});

export default ModalListHistoryReward;

const styles = StyleSheet.create({
  itemMission: {
    padding: _moderateScale(8 * 2),
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,.3)",
    flexDirection: "row",
  },
  titleDetail: {
    ...stylesFont.fontNolanBold,
    fontSize: _moderateScale(16),
    color: BASE_COLOR,
  },
  boxDetail__text: {
    ...stylesFont.fontNolan500,
    color: WHITE,
    fontSize: _moderateScale(12),
    fontStyle: "italic",
  },
  boxDetail__textPercent: {
    ...stylesFont.fontNolanBold,
    color: WHITE,
    fontSize: _moderateScale(16),
  },
  boxDetail: {
    flex: 1,
    alignItems: "center",
    height: _moderateScale(8 * 6),
    justifyContent: "center",
    borderRadius: _moderateScale(4),
  },
  lineText: {
    width: _moderateScale(340),
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: _moderateScale(8),
    alignItems: "flex-end",
  },
  line: {
    width: _moderateScale(340),
    height: _moderateScale(8),
    alignSelf: "center",
    borderRadius: _moderateScale(8),
  },
  textRanked: {
    ...stylesFont.fontNolanBold,
    fontSize: _moderateScale(14),
    color: GREY_FOR_TITLE,
  },
  iconSizeRanked: {
    width: _moderateScale(8 * 12),
    height: _moderateScale(8 * 12),
  },
  btnBack: {
    width: _moderateScale(8 * 4),
    height: _moderateScale(8 * 4),
    borderRadius: _moderateScale((8 * 4) / 2),
    backgroundColor: BASE_COLOR,
  },
  header: {
    // marginTop: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 2),
    alignItems: "center",
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.35,
  shadowRadius: 2,

  elevation: 5,
};
