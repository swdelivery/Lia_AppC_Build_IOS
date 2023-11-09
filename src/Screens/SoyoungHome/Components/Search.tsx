import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { memo, useEffect, useMemo, useState } from "react";
import IconRight from "../../../SGV/right.svg";
import IconFind from "../../../SGV/find_grey.svg";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../../Constant/Scale";
import { navigation } from "../../../../rootNavigation";
import ScreenKey from "../../../Navigation/ScreenKey";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { WHITE } from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { useSelector } from "react-redux";
import ModalPickSingleNotSearch from "../../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch";
import { IconArrowDown, IconQRScaner } from "../../../Components/Icon/Icon";
import { sizeIcon } from "../../../Constant/Icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImagePicker from "react-native-image-crop-picker";
import { scanningEyes } from "../../../Redux/Action/FaceAiAction";
import Text from "@Components/Text";
import Row from "@Components/Row";

const Search = (props) => {
  const { top } = useSafeAreaInsets();
  const listServiceGroupRedux = useSelector(
    (state) => state.serviceGroupReducer?.listServiceGroup
  );

  const heightExpandServiceGr = useSharedValue(0);

  const [expandServiceGr, setExpandServiceGr] = useState(false);

  useEffect(() => {
    if (expandServiceGr) {
      heightExpandServiceGr.value = withTiming(_heightScale(300), {
        duration: 300,
      });
    } else {
      heightExpandServiceGr.value = withTiming(0, { duration: 300 });
    }
  }, [expandServiceGr]);

  const animHeightExpandServiceGr = useAnimatedStyle(() => {
    return {
      height: heightExpandServiceGr.value,
    };
  });

  const containerStyle = useMemo(() => {
    return {
      marginTop: top + 8,
    };
  }, [top]);

  const _handleQR = () => {
    // ImagePicker.openCamera({
    //   mediaType: 'photo',
    //   compressImageQuality: 0.5
    // }).then(async (images) => {

    //   console.log({ images });
    //   let result = await scanningEyes(images)
    //   return
    // }).catch(e => { });
    ImagePicker.openPicker({
      multiple: false,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      mediaType: "photo",
      compressImageQuality: 0.5,
      compressImageMaxWidth: 700,
    })
      .then(async (images) => {
        console.log({ images });
        let result = await scanningEyes(images);
        // GlobalStore.socket.emit(CSS_SEND_MESSAGE, data)
      })
      .catch((e) => {});
  };

  return (
    <Row style={[styles.container, containerStyle]} gap={8}>
      <Row style={[styles.search, shadow]}>
        <ModalPickSingleNotSearch
          hide={() => {
            setExpandServiceGr(false);
          }}
          onSelect={(item) => {
            // _handleChoiceItemFilter(item)
            // navigation.navigate(ScreenKey.SEARCHING_HOME)
            navigation.navigate(ScreenKey.SEARCHING_HOME, {
              keySearch: item?.name,
            });
          }}
          data={listServiceGroupRedux?.length > 0 ? listServiceGroupRedux : []}
          show={expandServiceGr}
        />

        <View style={{ width: 8 }} />
        <TouchableOpacity
          onPress={() => {
            setExpandServiceGr((old) => !old);
          }}
        >
          <View style={styles.search__option}>
            <Text
              style={[
                stylesFont.fontNolan500,
                { fontSize: _moderateScale(12) },
              ]}
            >
              Mắt
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setExpandServiceGr((old) => !old);
          }}
          // onPress={props?.press}
          style={[
            styles.search_down_icon,
            {
              // transform: [
              //     {
              //         rotate: '90deg'
              //     }
              // ]
            },
          ]}
        >
          <IconArrowDown style={sizeIcon.sm} />

          {/* <IconRight
                    width={8 * 1.7}
                    height={8 * 1.7} /> */}
        </TouchableOpacity>
        <View style={{ width: 8 }} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ScreenKey.SEARCHING_HOME);
          }}
          style={styles.search__input}
        >
          <IconFind width={8 * 2} height={8 * 2} />
          <View style={{ width: 8 }} />
          <Text
            style={{
              fontSize: 13,
              color: "#454444",
            }}
          >
            Nhập thông tin tìm kiếm
          </Text>
        </TouchableOpacity>
      </Row>

      <TouchableOpacity onPress={_handleQR} style={[styles.qrButton, shadow]}>
        <IconQRScaner style={sizeIcon.lg} />
      </TouchableOpacity>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  search__input: {
    // width: _widthScale(250),
    flex: 1,
    width: "100%",
    height: 8 * 3.5,
    borderRadius: 8,
    backgroundColor: "#f0f1f2",
    alignItems: "center",
    paddingHorizontal: 8,
    flexDirection: "row",
  },
  search_down_icon: {
    height: 8 * 3,
    width: 8 * 3,
    justifyContent: "center",
    alignItems: "center",
  },
  search__option: {
    height: 8 * 4,
    width: 8 * 5,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    width: _widthScale(310),
    height: _moderateScale(8 * 4.5),
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: _moderateScale(8 * 1),
  },
  qrButton: {
    height: _moderateScale(8 * 4.5),
    width: _moderateScale(8 * 4.5),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 3,
};

export default Search;
