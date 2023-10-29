import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ImageColors from "react-native-image-colors";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import EachImage from "./EachImage";
import FlashSale from "./FlashSale";
import ListDoctor from "./ListDoctor";
import OptionService from "./OptionService";
import Voucher from "./Voucher";
import { _moderateScale } from "../../../Constant/Scale";
import { BASE_COLOR } from "../../../Constant/Color";
import { getAllNewsv2 } from "../../../Redux/Action/News";
import { URL_ORIGINAL } from "../../../Constant/Url";
import { navigation } from "../../../../rootNavigation";
import ScreenKey from "../../../Navigation/ScreenKey";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Spacer from "../../../Components/Spacer";
import useItemExtractor from "../../../Hooks/useItemExtractor";

const Banner = () => {
  const { top } = useSafeAreaInsets();
  const FlatListRef = useRef(null);
  const [listImage, setListImage] = useState([]);
  const widthImg = useSharedValue(380);
  const heightImg = useSharedValue(140);
  const [currIndexBanner, setCurrIndexBanner] = useState(0);
  const [primaryColor, setPrimaryColor] = useState(null);

  const flagIndexHasChanged = useSharedValue(0);
  const [preColor, setPreColor] = useState("#000");
  const [time, setTime] = useState(0);

  const [isDragingBanner, setIsDragingBanner] = useState(false);

  const [interval, setInterval] = useState(null);

  useEffect(() => {
    // setListImage([
    //     {
    //         _id: '1',
    //         url: `https://img2.soyoung.com/upload/20210924/2/9a0441f5159d66125f5252bd886c3946.jpg`
    //     },
    //     {
    //         _id: '2',
    //         url: `https://img2.soyoung.com/upload/20210924/6/642739b17effba4d31b163757e4d0114.jpg`
    //     },
    //     {
    //         _id: '3',
    //         url: `https://img2.soyoung.com/upload/20210924/4/b61733f1b5fafde858db04c7bcb04869.jpg`
    //     },
    //     {
    //         _id: '4',
    //         url: `https://img2.soyoung.com/upload/20210924/9/e4b63471060c8d9cfd934752fb3dafe8.jpg`
    //     }
    // ])
    // startInterval()

    _getAllNews();
  }, []);

  const _getAllNews = async () => {
    let result = await getAllNewsv2({
      condition: {
        isPin: { equal: true },
      },
      sort: {
        orderNumber: -1,
      },
      limit: 5,
    });
    if (result?.isAxiosError) return;

    let listImages = result?.data?.data?.map((item, index) => {
      return {
        _id: item?._id,
        url: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`,
      };
    });

    setListImage(listImages);
  };

  const startInterval = () => {
    const timer = window.setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 5000);
    setInterval(timer);
    return () => {
      window.clearInterval(timer);
    };
  };

  useEffect(() => {
    if (time) {
      if (isDragingBanner) return window.clearInterval(interval);
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

  const _getPrimaryColor = async (url) => {
    const result = await ImageColors.getColors(url, {
      fallback: "#228B22",
      cache: false,
      key: "",
    });
    console.log({ result });
    if (Platform.OS == "ios") {
      setPrimaryColor(result?.secondary);
    } else {
      setPrimaryColor(result?.dominant);
    }
  };

  const _changePreColor = (color) => {
    setPreColor(color);
  };

  useEffect(() => {
    if (primaryColor) {
      flagIndexHasChanged.value = withTiming(
        1,
        {
          duration: 700,
        },
        (isFinished) => {
          if (isFinished) {
            runOnJS(_changePreColor)(primaryColor);
          }
        }
      );
    }
  }, [primaryColor]);

  useEffect(() => {
    flagIndexHasChanged.value = 0;
    if (listImage?.length > 0) {
      _getPrimaryColor(listImage[currIndexBanner]?.url);
    }
  }, [currIndexBanner, listImage]);

  const animBG = useAnimatedStyle(() => {
    if (primaryColor) {
      const animtedColor = interpolateColor(
        flagIndexHasChanged.value,
        [0, 1],
        [preColor, primaryColor]
      );
      return {
        backgroundColor: animtedColor,
      };
    } else {
      return {};
    }
  });

  const _renderImage = ({ item, index }) => {
    return (
      <EachImage
        handlePress={() => {
          navigation.navigate(ScreenKey.DETAIL_NEWS, { idNews: item?._id });
        }}
        currIndexBanner={currIndexBanner}
        data={item}
        indexItem={index}
      />
    );
  };

  const { keyExtractor } = useItemExtractor((item) => item._id);

  return (
    <Animated.View style={[styles.container, animBG]}>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={["transparent", "#EE79B8"]}
      />
      <Spacer top={top + 50} />
      <View>
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
            console.log({
              contentOffsetX: event.nativeEvent.contentOffset.x,
              layoutMeasurementWidth: event.nativeEvent.layoutMeasurement.width,
            });
            const index =
              event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width;
            console.log({ index });
            setCurrIndexBanner(index.toFixed());
          }}
          pagingEnabled
          renderItem={_renderImage}
          data={listImage}
          keyExtractor={keyExtractor}
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
                key={keyExtractor(item)}
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
      <OptionService />
      <Voucher />
      <FlashSale />
      <ListDoctor />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 200,
  },
  container: {
    // height: 780,,
    paddingBottom: _moderateScale(8 * 1),
    gap: 8,
  },
});

export default Banner;
