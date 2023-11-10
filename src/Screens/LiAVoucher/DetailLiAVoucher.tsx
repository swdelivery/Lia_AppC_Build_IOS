import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { WHITE } from "../../Constant/Color";
import LiAHeader from "../../Components/Header/LiAHeader";
import { _moderateScale, _width, _widthScale } from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import { sizeText } from "../../Constant/Text";
import RenderHTML from "../../Components/RenderHTML/RenderHTML";
import { getConfigData } from "../../Redux/Action/OrtherAction";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from "react-native-reanimated";
import ModalFlashMsg from "../../Components/ModalFlashMsg/ModalFlashMsg";
import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import {
  getDetailVoucher,
  takeVoucher,
} from "../../Redux/Action/VoucherAction";
import moment from "moment";
import { useSelector } from "react-redux";
import Text from "@Components/Text";
import Screen from "@Components/Screen";
import Image from "@Components/Image";
import Column from "@Components/Column";

const HEIGHT_BOTTOM_SWIPER = _moderateScale(90);

const clamp = (value, min, max) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
};

const DetailLiAVoucher = (props) => {
  const infoUserRedux = useSelector(
    (state) => state?.infoUserReducer?.infoUser
  );

  const [dataHTML, setDataHTML] = useState("");
  const [takingVoucher, setTakingVoucher] = useState(false);

  const tranYBottomSwiper = useSharedValue(0);
  const [showModalFlashMsg, setShowModalFlashMsg] = useState(false);

  const tranCircleX = useSharedValue(0);

  useEffect(() => {
    _getData();
    console.log({ props });
    // _getDetailVoucher()
  }, []);

  useEffect(() => {
    if (props?.route?.params?.idVoucher) {
      _getDetailVoucher(props?.route?.params?.idVoucher);
    }
  }, [props?.route?.params?.idVoucher]);

  const _getDetailVoucher = async (_id) => {
    let result = await getDetailVoucher(_id);
  };

  useEffect(() => {
    if (takingVoucher) {
      _handleTakeVoucher(props?.route?.params?.data);
    }
  }, [takingVoucher]);

  const _handleTakeVoucher = async (item) => {
    let result = await takeVoucher({
      partnerId: infoUserRedux?._id,
      couponCode: item?.code,
    });
    if (result?.isAxiosError) return;

    props?.route?.params?._getListPublicVoucher();

    setShowModalFlashMsg(true);
    setTimeout(() => {
      setShowModalFlashMsg(false);
    }, 500);
  };

  const _getData = async () => {
    let result = await getConfigData("DEMO_HTML_DATA");
    if (result?.isAxiosError) return;

    setDataHTML(result);
  };

  useEffect(() => {
    if (showModalFlashMsg) {
      setTimeout(() => {
        setShowModalFlashMsg(false);
      }, 1000);
    }
  }, [showModalFlashMsg]);

  useEffect(() => {
    console.log({ dataHTML });
  }, [dataHTML]);

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = tranCircleX.value;
    },
    onActive: (event, ctx) => {
      tranCircleX.value = clamp(event.translationX + ctx.startX, 0, 120);
    },
    onEnd: (event) => {
      tranCircleX.value = withDecay(
        {
          velocity: event.velocityX,
          clamp: [0, 120], // optionally define boundaries for the animation
        },
        () => {
          runOnJS(setShowModalFlashMsg)(true);
          runOnJS(setTakingVoucher)(true);
          tranYBottomSwiper.value = withTiming(HEIGHT_BOTTOM_SWIPER, {
            duration: 500,
          });
        }
      );
    },
  });

  const showModal = () => {
    "worklet";
    Alert.alert("awdawd");
  };

  const animCircleX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tranCircleX.value }],
    };
  });
  const animWidthBG = useAnimatedStyle(() => {
    const interpolateWidth = interpolate(
      tranCircleX.value,
      [0, 120],
      [0, 120],
      { extrapolateRight: Extrapolation.CLAMP }
    );
    return {
      width: interpolateWidth,
    };
  });
  const animTranYBottomSwiper = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: tranYBottomSwiper.value,
        },
      ],
    };
  });

  return (
    <Screen safeTop safeBottom style={styles.container}>
      <ModalFlashMsg
        show={showModalFlashMsg}
        hide={() => {
          setShowModalFlashMsg(false);
        }}
        data={"Lấy voucher thành công."}
      />

      <LiAHeader
        barStyle={"dark-content"}
        bg={WHITE}
        title={"Chi tiết mã giảm giá"}
        titleColor={"black"}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.banner}>
          <View style={[styles.banner__voucher]}>
            <View style={[styles.voucherBox__left]}>
              <View>
                <Image
                  style={styles.avatarVoucher}
                  avatar={props?.route?.params?.data?.couponImg}
                />
              </View>
              <Column paddingTop={8} marginLeft={8} flex={1}>
                <Text style={sizeText.small_500}>
                  {props?.route?.params?.data?.name}
                </Text>
                <Text numberOfLines={2} style={sizeText.small_bold}>
                  {props?.route?.params?.data?.description}
                </Text>
                <Text numberOfLines={2} style={[sizeText.small]}>
                  Hiệu lực đến ngày:{" "}
                  {moment(props?.route?.params?.data?.expiredAt).format(
                    "DD/MM/YYYY"
                  )}
                </Text>
              </Column>
            </View>
          </View>
        </View>
        <Column flex={1} paddingHorizontal={16} marginTop={40}>
          {props?.route?.params?.data?.content ? (
            <RenderHTML data={props?.route?.params?.data?.content} />
          ) : (
            <></>
          )}
        </Column>
      </ScrollView>

      <View style={styles.bottomContainer}>
        {props?.route?.params?.data?.isTaked ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenKey.CREATE_BOOKING);
            }}
            style={styles.bottomButton}
          >
            <Text style={[sizeText.normal_bold, { color: WHITE }]}>
              Sử dụng mã giảm giá
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenKey.CREATE_BOOKING);
            }}
            style={styles.bottomButton}
          >
            <Text style={[sizeText.normal_bold, { color: WHITE }]}>
              Lấy mã giảm giá
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Screen>
  );
};

export default DetailLiAVoucher;

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100,
    flexGrow: 1,
  },
  voucherBox__right__btn: {
    paddingHorizontal: _moderateScale(8),
    paddingVertical: _moderateScale(4),
    // backgroundColor:BASE_COLOR,
  },
  avatarVoucher: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    borderRadius: _moderateScale(8),
  },
  dashLine: {
    width: 1,
    height: _moderateScale(8 * 8),
    backgroundColor: "transparent",
    borderStyle: "dashed",
    borderWidth: 1,
    top: _moderateScale(8),
    borderColor: WHITE,
  },
  voucherBox__left: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8),
  },
  voucherBox__right: {
    width: _moderateScale(8 * 10),
    height: _moderateScale(8 * 10),
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    ...styleElement.centerChild,
  },
  banner__voucher: {
    width: _moderateScale(320),
    height: _moderateScale(8 * 10),
    alignSelf: "center",
    bottom: -_moderateScale(8 * 3),
    position: "absolute",
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    flexDirection: "row",
  },
  banner: {
    height: _moderateScale(8 * 12),
    backgroundColor: "#AF7169",
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  bottomContainer: {
    width: _width,
    backgroundColor: WHITE,
    bottom: 0,
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F3F3",
  },
  bottomButton: {
    width: _moderateScale(320),
    height: 50,
    backgroundColor: "#AF7169",
    ...styleElement.centerChild,
    borderRadius: _moderateScale(8),
  },
});
