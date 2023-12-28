import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import {
  BASE_COLOR,
  BG_GREY_OPACITY_5,
  GREEN_SUCCESS,
  GREY,
  GREY_FOR_TITLE,
  WHITE,
} from "../../../Constant/Color";
import {
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import { stylesFont } from "../../../Constant/Font";
import {
  IconBrone,
  IconDiamond,
  IconGold,
  IconHelp,
  IconSilver,
} from "../../../Components/Icon/Icon";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { URL_ORIGINAL } from "../../../Constant/Url";
import { getPartnerLevel } from "../../../Redux/Action/InfoAction";
import Column from "@Components/Column";

const WIDTH_PROCESS_BAR = _width - _widthScale(8 * 10);

const Banner = memo((props) => {
  const [currPartnerLevel, setCurrPartnerLevel] = useState({});
  const [nextPartnerLevel, setNextPartnerLevel] = useState({});

  const infoUserRedux = useSelector((state) => state.infoUserReducer?.infoUser);
  // const [infoUserRedux, setInfoUserRedux] = useState({
  //     levelCode: "GOLD",
  //     liaPoint: 120000,
  //     fileAvatar: {
  //         link: "/public/partner/1697701063424aqQW.jpeg"
  //     }
  // })

  useEffect(() => {
    _getPartnerLevel();
  }, []);

  const _getPartnerLevel = async () => {
    let result = await getPartnerLevel();
    if (result?.isAxiosError) return;
    let findCurrPartnerLevel = result?.data?.data?.find(
      (item) => item?.code == infoUserRedux?.levelCode
    );
    console.log({ findCurrPartnerLevel });
    setCurrPartnerLevel(findCurrPartnerLevel);

    if (infoUserRedux?.levelCode == "BRONZE") {
      setNextPartnerLevel(
        result?.data?.data?.find((item) => item?.code == "SILVER")
      );
    }
    if (infoUserRedux?.levelCode == "SILVER") {
      setNextPartnerLevel(
        result?.data?.data?.find((item) => item?.code == "GOLD")
      );
    }
    if (infoUserRedux?.levelCode == "GOLD") {
      setNextPartnerLevel(
        result?.data?.data?.find((item) => item?.code == "PLATINUM")
      );
    }
  };

  return (
    <Column paddingBottom={_moderateScale(8 * 2)}>
      <LinearGradient
        style={[StyleSheet.absoluteFill]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.8]}
        colors={[BASE_COLOR, "white"]}
      />
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          props?.setShowModalInfoRanked((old) => !old);
        }}
        style={[styles.banner__box, shadow]}
      >
        <View style={styles.banner__box__text}>
          <Text
            style={[stylesFont.fontNolanBold, { fontSize: _moderateScale(14) }]}
          >
            Hạng hiện tại
          </Text>
          <TouchableOpacity
            onPress={() => {
              props?.setShowModalInfoRanked((old) => !old);
            }}
            style={{
              position: "absolute",
              right: _moderateScale(8 * 2),
              top: -_moderateScale(8),
              zIndex: 10,
            }}
          >
            <IconHelp
              style={{
                width: _moderateScale(8 * 4),
                height: _moderateScale(8 * 4),
              }}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginTop: _moderateScale(0) }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={[
                styles.avatarBG__image,
                { position: "absolute", zIndex: -1 },
              ]}
              source={{
                uri: `${URL_ORIGINAL}${infoUserRedux?.fileAvatar?.link}`,
              }}
            />
            {currPartnerLevel?.code == "BRONZE" ? (
              <View style={{}}>
                <IconBrone
                  style={{
                    width: _moderateScale(8 * 13),
                    height: _moderateScale(8 * 13),
                  }}
                />
              </View>
            ) : (
              <></>
            )}
            {currPartnerLevel?.code == "SILVER" ? (
              <View style={{}}>
                <IconSilver
                  style={{
                    width: _moderateScale(8 * 13),
                    height: _moderateScale(8 * 13),
                  }}
                />
              </View>
            ) : (
              <></>
            )}
            {currPartnerLevel?.code == "GOLD" ? (
              <View style={{}}>
                <IconGold
                  style={{
                    width: _moderateScale(8 * 13),
                    height: _moderateScale(8 * 13),
                  }}
                />
              </View>
            ) : (
              <></>
            )}
            {currPartnerLevel?.code == "PLATINUM" ? (
              <View style={{}}>
                <IconDiamond
                  style={{
                    width: _moderateScale(8 * 13),
                    height: _moderateScale(8 * 13),
                  }}
                />
              </View>
            ) : (
              <></>
            )}
          </View>

          <Text
            style={{
              color: GREY_FOR_TITLE,
              ...stylesFont.fontNolanBold,
              fontSize: _moderateScale(14),
              top: -_moderateScale(8),
            }}
          >
            {currPartnerLevel?.name}
          </Text>
        </View>

        {currPartnerLevel?.code == "PLATINUM" ? (
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                marginTop: _moderateScale(8 * 2),
                ...stylesFont.fontNolanBold,
                color: GREEN_SUCCESS,
                fontSize: _moderateScale(18),
              }}
            >
              {infoUserRedux?.liaPoint} Điểm
            </Text>
            <Text
              style={{
                marginTop: _moderateScale(8 * 2),
                ...stylesFont.fontNolanBold,
                color: GREY_FOR_TITLE,
                fontSize: _moderateScale(18),
              }}
            >
              Bạn đã đạt hạng cao nhất!
            </Text>
          </View>
        ) : (
          <View
            style={{ alignItems: "center", marginTop: _moderateScale(8 * 3) }}
          >
            <View style={styles.processbar}>
              <View
                style={[
                  styles.processbar__fill,
                  {
                    width:
                      infoUserRedux?.liaPoint && currPartnerLevel?._id
                        ? ((infoUserRedux?.liaPoint -
                            currPartnerLevel?.startPoint) /
                            (currPartnerLevel?.endPoint -
                              currPartnerLevel?.startPoint)) *
                          WIDTH_PROCESS_BAR
                        : 0,
                  },
                ]}
              >
                <View style={styles.processbar__fill__dot}>
                  <View
                    style={{
                      width: _moderateScale(8 * 7),
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        top: -_moderateScale(8 * 3),
                        zIndex: 10,
                      }}
                    >
                      <Text
                        style={{
                          ...stylesFont.fontNolanBold,
                          fontSize: _moderateScale(14),
                          // color: ''
                        }}
                      >
                        {infoUserRedux?.liaPoint}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.processbarBottom}>
              <View>
                <Text
                  style={{
                    ...stylesFont.fontNolanBold,
                    fontSize: _moderateScale(12),
                  }}
                >
                  {currPartnerLevel?.startPoint}
                </Text>
                <Text
                  style={[
                    stylesFont.fontNolan500,
                    { fontSize: _moderateScale(14) },
                  ]}
                >
                  {currPartnerLevel?.name}
                </Text>
              </View>

              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    ...stylesFont.fontNolanBold,
                    fontSize: _moderateScale(12),
                  }}
                >
                  {currPartnerLevel?.endPoint}
                </Text>
                <Text
                  style={[
                    stylesFont.fontNolan500,
                    { fontSize: _moderateScale(14) },
                  ]}
                >
                  {nextPartnerLevel?.name}
                </Text>
              </View>
            </View>
            <View style={styles.processbarBottom}></View>

            <View style={{ marginTop: _moderateScale(8) }}>
              <Text
                style={{
                  ...stylesFont.fontNolan,
                  fontSize: _moderateScale(14),
                }}
              >
                Bạn còn{" "}
                <Text style={stylesFont.fontNolanBold}>
                  {currPartnerLevel?.endPoint - infoUserRedux?.liaPoint}
                </Text>{" "}
                điểm nữa để thăng hạng {nextPartnerLevel?.name}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      {/* </Animated.View> */}
    </Column>
  );
});

export default Banner;

const styles = StyleSheet.create({
  processbarBottom: {
    width: WIDTH_PROCESS_BAR,
    marginTop: _moderateScale(8 * 1),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  processbar__fill__dot: {
    width: _moderateScale(8 * 1.5),
    height: _moderateScale(8 * 1.5),
    borderRadius: _moderateScale((8 * 1.5) / 2),
    backgroundColor: GREEN_SUCCESS,
    alignItems: "center",
    left: _moderateScale(8 * 1.5) / 2,
  },
  processbar__fill: {
    // width: _widthScale(8 * 26),
    height: _moderateScale(8 * 0.5),
    backgroundColor: GREEN_SUCCESS,
    borderRadius: _moderateScale(8),
    justifyContent: "center",
    alignItems: "flex-end",
  },
  processbar: {
    width: WIDTH_PROCESS_BAR,
    height: _moderateScale(8 * 0.5),
    backgroundColor: "#C0C0C0",
    borderRadius: _moderateScale(8),
  },
  avatarBG__image: {
    width: _moderateScale(8 * 7.5),
    height: _moderateScale(8 * 7.5),
    borderRadius: _moderateScale((8 * 8) / 2),
    zIndex: -1,
  },
  avatarBG: {
    width: _moderateScale(8 * 13),
    height: _moderateScale(8 * 13),
    alignItems: "center",
    justifyContent: "center",
  },
  banner__box__text: {
    alignItems: "center",
    marginTop: _moderateScale(8 * 2),
  },
  banner__box: {
    width: _width - _widthScale(8 * 4),
    height: _moderateScale(8 * 35),
    marginHorizontal: 30,
    marginVertical: 8,
    alignSelf: "center",
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8 * 2),
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
