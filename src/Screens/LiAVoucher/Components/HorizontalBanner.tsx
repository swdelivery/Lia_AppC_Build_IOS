import { Platform, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BASE_COLOR } from "../../../Constant/Color";
import { _moderateScale, _width, _widthScale } from "../../../Constant/Scale";
import { styleElement } from "../../../Constant/StyleElement";
import ImageColors from "react-native-image-colors";
import Animated, {
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import EachImage from "./EachImage";
import ScreenKey from "../../../Navigation/ScreenKey";
import { navigation } from "../../../../rootNavigation";
import { FlatList } from "react-native-gesture-handler";
import useConfigFile from "src/Hooks/useConfigFile";
import { ConfigFileCode } from "@typings/configFile";
import { getConfigFileByCode } from "@Redux/Action/SpinWheelAction";
import { first } from "lodash";
import { getImageAvataUrl } from "src/utils/avatar";

type Props = {
  flagIndexHasChanged: SharedValue<number>;
  flagSecondIndexHasChanged: SharedValue<number>;
  primaryColor: SharedValue<string>;
  secondColor: SharedValue<string>;
  preColor: SharedValue<string>;
  preSecondColor: SharedValue<string>;
};

const HorizontalBanner = ({
  flagIndexHasChanged,
  flagSecondIndexHasChanged,
  primaryColor,
  secondColor,
  preColor,
  preSecondColor,
}: Props) => {
  const FlatListRef = useRef(null);
  const [listImage, setListImage] = useState([]);
  const [currIndexBanner, setCurrIndexBanner] = useState(0);
  const [time, setTime] = useState(0);
  const [isDragingBanner, setIsDragingBanner] = useState(false);
  const [interval, setInterval] = useState(null);

  useEffect(() => {
    _getListImageBanner()
  }, []);

  const _getListImageBanner = useCallback(async () => {
    let res1 = await getConfigFileByCode(ConfigFileCode.BannerVoucher1)
    let res2 = await getConfigFileByCode(ConfigFileCode.BannerVoucher2)
    let res3 = await getConfigFileByCode(ConfigFileCode.BannerVoucher3)
    let res4 = await getConfigFileByCode(ConfigFileCode.BannerVoucher4)

    let image1 = first(res1?.data?.data?.fileArr);
    let image2 = first(res2?.data?.data?.fileArr);
    let image3 = first(res3?.data?.data?.fileArr);
    let image4 = first(res4?.data?.data?.fileArr);

    let newFormat = [image1, image2, image3, image4]?.map(item => {
      return {
        _id: item?._id,
        url: getImageAvataUrl(item),
      }
    })
    setListImage(newFormat)
  }, [])

  useEffect(() => {
    flagIndexHasChanged.value = 0;
    flagSecondIndexHasChanged.value = 0;
    if (listImage?.length > 0) {
      _getPrimaryColor(listImage[currIndexBanner]?.url);
    }
  }, [currIndexBanner, listImage]);

  useEffect(() => {
    if (time) {
      if (isDragingBanner) return clearInterval(interval);
      if (currIndexBanner == listImage?.length - 1) {
        FlatListRef?.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      } else {
        FlatListRef?.current?.scrollToIndex({
          index: currIndexBanner + 1,
          animated: true,
        });
      }
    }
  }, [time]);

  useEffect(() => {
    _getPrimaryColor(listImage[currIndexBanner]?.url);
  }, [currIndexBanner]);

  const _getPrimaryColor = async (url) => {
    const result = await ImageColors.getColors(url, {
      fallback: "#228B22",
      cache: false,
      key: "",
    });
    console.log({ result });

    let pColor;
    if (Platform.OS == "ios") {
      primaryColor.value = result?.background;
      secondColor.value = result?.secondary;
    } else {
      primaryColor.value = result?.dominant;
      secondColor.value = result?.average;
    }
    flagIndexHasChanged.value = withTiming(
      1,
      {
        duration: 700,
      },
      (isFinished) => {
        if (isFinished) {
          preColor.value = primaryColor.value;
        }
      }
    );
    flagSecondIndexHasChanged.value = withTiming(
      1,
      {
        duration: 700,
      },
      (isFinished) => {
        if (isFinished) {
          preSecondColor.value = secondColor.value;
        }
      }
    );
  };

  const animtedColor = useDerivedValue(() =>
    interpolateColor(
      flagIndexHasChanged.value,
      [0, 1],
      [preColor.value, primaryColor.value]
    )
  );
  console.log({ preColor: preColor.value, primaryColor: primaryColor.value });

  const animBG = useAnimatedStyle(() => {
    return {
      backgroundColor: animtedColor.value,
    };
  });

  const _renderImage = ({ item, index }) => {
    return (
      // <View style={styles.box}>
      //     <Image
      //         style={styles.box__image}
      //         source={{
      //             uri: `${item?.url}`
      //         }} />
      // </View>
      <EachImage
        handlePress={() => {
          // navigation.navigate(ScreenKey.DETAIL_NEWS_VOUCHER, {});
        }}
        currIndexBanner={currIndexBanner}
        data={item}
        indexItem={index}
      />
    );
  };

  return (
    <Animated.View style={[styles.banner, animBG]}>
      <View
        style={
          {
            // height: _widthScale(130)
          }
        }
      >
        <FlatList
          ref={FlatListRef}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEventThrottle={16}
          onScrollBeginDrag={() => {
            // setIsDragingBanner(true)
          }}
          onScrollEndDrag={() => {
            // setIsDragingBanner(false)
          }}
          onMomentumScrollEnd={(event) => {
            // console.log({
            //   contentOffsetX: event.nativeEvent.contentOffset.x,
            //   layoutMeasurementWidth: event.nativeEvent.layoutMeasurement.width,
            // });
            const index =
              event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width;
            console.log({ index });
            flagIndexHasChanged.value = 0;
            flagSecondIndexHasChanged.value = 0;
            setCurrIndexBanner(index);
          }}
          pagingEnabled
          renderItem={_renderImage}
          data={listImage}
          keyExtractor={(item) => item._id}
        />

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 8 * 1,
            alignSelf: "center",
          }}
        >
          {listImage?.map((item, index) => {
            return (
              <View
                key={item._id}
                style={[
                  {
                    width: 6,
                    height: 6,
                    borderRadius: 8 * 2,
                    backgroundColor: "#a6a2a2",
                    marginHorizontal: 2,
                  },
                  index == currIndexBanner && {
                    width: 6 * 2,
                    backgroundColor: "white",
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
};

export default HorizontalBanner;

const styles = StyleSheet.create({
  box__image: {
    width: _widthScale(350),
    height: _widthScale(130),
    borderRadius: _moderateScale(8),
  },
  box: {
    // width: _widthScale(350),
    width: _width,
    height: _widthScale(130),
    ...styleElement.centerChild,
  },
  banner: {
    height: _widthScale(8 * 20),
    width: _width,
    backgroundColor: BASE_COLOR,
    justifyContent: "flex-end",
    paddingBottom: _moderateScale(8 * 2),
  },
});
