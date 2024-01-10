import React, { memo, useEffect, useState } from "react";
import {
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IconCancelGrey } from "../../../Components/Icon/Icon";
import {
  BLACK,
  BLUE_FB,
  BORDER_COLOR,
  PRICE_ORANGE,
  WHITE,
} from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { sizeIcon } from "../../../Constant/Icon";
import {
  _height,
  _heightScale,
  _moderateScale,
  _width,
} from "../../../Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import Column from "@Components/Column";
import Row from "@Components/Row";
import Image from "@Components/Image";
// import Text from '@Components/Text'
import { formatMonney } from "@Constant/Utils";
import { sizeText } from "@Constant/Text";
import ListTopping from "./ListTopping";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HEIGHT_MODAL = _heightScale(670);

const ModalConfirmService = memo((props) => {
  const { bottom } = useSafeAreaInsets();
  const { data } = props;

  const opacityBackDrop = useSharedValue(0);
  const tranYModal = useSharedValue(0);
  const [isCollapDescription, setIsCollapDescription] = useState(true);

  useEffect(() => {
    if (data?.description?.length > 85) {
      setIsCollapDescription(true);
    } else {
      setIsCollapDescription(false);
    }
  }, [data?.description]);

  useEffect(() => {
    if (props?.isShow) {
      tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 200 });
      opacityBackDrop.value = withTiming(1, { duration: 300 });
    } else {
    }
  }, [props?.isShow]);

  const _handleConfirmAddService = () => {
    _handleHideModal();
  };

  const animTranY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tranYModal.value }],
    };
  });

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value };
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
    props?.hideModal();
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
            bottom: 0,
          }}
        >
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
            style={[styles.modal, { paddingBottom: bottom }, animTranY]}
          >
            <View style={styles.header}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: _width,
                  height: _moderateScale(8 * 6),
                }}
              >
                <Text
                  style={[
                    stylesFont.fontNolanBold,
                    { fontSize: _moderateScale(14) },
                  ]}
                >
                  Chọn dịch vụ
                </Text>
                <TouchableOpacity
                  hitSlop={styleElement.hitslopSm}
                  onPress={_handleHideModal}
                  style={{
                    position: "absolute",
                    right: _moderateScale(8 * 3),
                    zIndex: 100,
                    top: _moderateScale(8 * 2),
                  }}
                >
                  <IconCancelGrey style={sizeIcon.sm} />
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView>
              <Row
                gap={8 * 2}
                alignItems={"flex-start"}
                style={{ paddingHorizontal: 8 * 2, marginTop: 8 * 2 }}
              >
                <View>
                  <Image
                    style={styles.avatar}
                    avatar={data?.representationFileArr[0]}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Column gap={4}>
                    <Text style={sizeText.normal_bold}>{data?.name}</Text>
                    <Text
                      style={[sizeText.normal_bold, { color: PRICE_ORANGE }]}
                    >
                      {formatMonney(data?.price)} VNĐ
                    </Text>
                    {isCollapDescription ? (
                      <Text style={sizeText.normal_500}>
                        {data?.description?.slice(0, 85)}... {` `}
                        <Text
                          style={{
                            color: BLUE_FB,
                            marginLeft: _moderateScale(8 * 2),
                          }}
                          onPress={() => {
                            setIsCollapDescription(false);
                            LayoutAnimation.configureNext(
                              LayoutAnimation.Presets.easeInEaseOut
                            );
                          }}
                        >
                          Xem thêm
                        </Text>
                      </Text>
                    ) : (
                      <Text style={sizeText.normal_500}>
                        {data?.description} {` `}
                        <Text
                          style={{
                            color: BLACK,
                            marginLeft: _moderateScale(8 * 2),
                          }}
                          onPress={() => {
                            setIsCollapDescription(true);
                            LayoutAnimation.configureNext(
                              LayoutAnimation.Presets.easeInEaseOut
                            );
                          }}
                        >
                          Thu gọn
                        </Text>
                      </Text>
                    )}
                  </Column>
                </View>
              </Row>
              <View style={{ height: 8 * 3 }} />
              <ListTopping data={data} />
              <View style={{ height: 100 }} />
            </ScrollView>
            <View style={styles.bottomAction}>
              <TouchableOpacity
                onPress={_handleConfirmAddService}
                style={styles.btnAction}
              >
                <LinearGradient
                  style={[StyleSheet.absoluteFillObject, { borderRadius: 8 }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  colors={["#1C5579", "#186A57"]}
                />
                <Text style={[sizeText.normal_bold, { color: WHITE }]}>
                  Xác nhận ( {formatMonney(data?.price)} VNĐ )
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
});

export default ModalConfirmService;

const styles = StyleSheet.create({
  btnAction: {
    marginHorizontal: _moderateScale(8 * 2),
    height: _moderateScale(8 * 5),
    justifyContent: "center",
    alignItems: "center",
  },
  bottomAction: {
    height: _moderateScale(8 * 7),
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    width: _width,
    justifyContent: "center",
    // alignItems:'center'
  },
  avatar: {
    width: _moderateScale(8 * 16),
    height: _moderateScale(8 * 16),
    borderRadius: 8,
  },
  modal: {
    width: _width,
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8 * 2),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // paddingBottom: _moderateScale(8 * 2),
    position: "absolute",
    bottom: -HEIGHT_MODAL,
    height: HEIGHT_MODAL,
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
