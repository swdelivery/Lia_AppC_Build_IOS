import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Animated, {
  interpolateColor,
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
import { getAllNewsv2 } from "../../../Redux/Action/News";
import { URL_ORIGINAL } from "../../../Constant/Url";
import { navigation } from "../../../../rootNavigation";
import ScreenKey from "../../../Navigation/ScreenKey";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Spacer from "../../../Components/Spacer";
import useItemExtractor from "../../../Hooks/useItemExtractor";
import useImageColors from "src/Hooks/useImageColors";

const Banner = () => {
  const { top } = useSafeAreaInsets();
  const FlatListRef = useRef(null);
  const [listImage, setListImage] = useState([]);
  const [currIndexBanner, setCurrIndexBanner] = useState(0);
  const flagIndexHasChanged = useSharedValue(0);
  const preColor = useSharedValue("#000");
  const { primaryColor, getColors } = useImageColors({
    defaultPrimayColor: "#228B22",
  });

  useEffect(() => {
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

  useEffect(() => {
    if (primaryColor) {
    }
  }, [primaryColor]);

  useEffect(() => {
    flagIndexHasChanged.value = 0;
    if (listImage?.length > 0) {
      getColors(listImage[currIndexBanner]?.url).then(() => {
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
      });
    }
  }, [currIndexBanner, listImage]);

  const animBG = useAnimatedStyle(() => {
    const animtedColor = interpolateColor(
      flagIndexHasChanged.value,
      [0, 1],
      [preColor.value, primaryColor.value]
    );
    return {
      backgroundColor: animtedColor,
    };
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
        colors={["transparent", "#9a0000"]}
      />
      <Spacer top={top + 65} />
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
            // console.log({
            //   contentOffsetX: event.nativeEvent.contentOffset.x,
            //   layoutMeasurementWidth: event.nativeEvent.layoutMeasurement.width,
            // });
            const index =
              event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width;
            setCurrIndexBanner(index);
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
