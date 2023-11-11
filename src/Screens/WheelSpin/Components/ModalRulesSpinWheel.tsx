import React, { memo, useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import {
  _height,
  _moderateScale,
  _width,
  _widthScale,
} from "../../../Constant/Scale";
import { IconCancelGrey } from "../../../Components/Icon/Icon";
import { sizeIcon } from "../../../Constant/Icon";
import Text from "@Components/Text";

const ModalRulesSpinWheel = memo((props) => {
  const opacityBackDrop = useSharedValue(0);
  const tranXModal = useSharedValue(0);

  useEffect(() => {
    if (props?.isShow) {
      tranXModal.value = withTiming(-_width, { duration: 300 });
      opacityBackDrop.value = withTiming(1, { duration: 300 });
    } else {
    }
  }, [props?.isShow]);

  const _handleHideModal = () => {
    tranXModal.value = withTiming(0, { duration: 200 }, (fnd) => {
      if (fnd) {
        runOnJS(_hideModal)();
      }
    });
    opacityBackDrop.value = withTiming(0, { duration: 200 });
  };
  const _hideModal = () => {
    props?.onHideModal();
  };

  const animXModal = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tranXModal.value,
        },
      ],
    };
  });
  const animOpacityBackDrop = useAnimatedStyle(() => {
    return {
      opacity: opacityBackDrop.value,
    };
  });

  return (
    <>
      {props?.isShow ? (
        <View
          style={{
            width: _width,
            height: _height,
            position: "absolute",
            zIndex: 100,
            // zIndex:10,
            // backgroundColor:'blue',
            justifyContent: "center",
            alignItems: "center",
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
            style={[
              {
                position: "absolute",
                width: _width,
                alignItems: "center",
                right: -_width,
              },
              animXModal,
            ]}
          >
            <View
              style={{
                width: _widthScale(350),
                height: _widthScale(550),
                backgroundColor: WHITE,
                borderRadius: _moderateScale(8 * 2),
                paddingBottom: _moderateScale(8 * 2),
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginTop: _moderateScale(8 * 2),
                  paddingBottom: _moderateScale(8 * 2),
                }}
              >
                <Text weight="bold">Thể lệ vòng quay</Text>

                <TouchableOpacity
                  onPress={_handleHideModal}
                  style={{
                    position: "absolute",
                    right: _moderateScale(8 * 2),
                  }}
                >
                  <IconCancelGrey style={sizeIcon.md} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
                {/* <RenderHTML data={props?.dataHTML?.value}/> */}
                <Text>{props?.dataHTML?.description}</Text>
              </ScrollView>
            </View>
          </Animated.View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
});

export default ModalRulesSpinWheel;

const styles = StyleSheet.create({
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
    marginTop: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 2),
    alignItems: "center",
  },
});
