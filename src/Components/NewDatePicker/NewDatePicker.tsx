import React, { memo, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  BASE_COLOR,
  BORDER_COLOR,
  GREY_FOR_TITLE,
  WHITE,
} from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import {
  _height,
  _heightScale,
  _moderateScale,
  _width,
  _widthScale,
} from "../../Constant/Scale";

import CalendarPicker from "react-native-calendar-picker";
import LinearGradient from "react-native-linear-gradient";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (item) => void;
  minDate: string;
  maxDate: string;
  colors: any;
  selectedDayColor: any;
  onNew?: () => void;
  // other props
};

const HEIGHT_MODAL = _heightScale(420);

const NewDatePicker = memo(
  ({ visible, onClose, minDate, maxDate, onConfirm, colors, selectedDayColor, onNew }: Props) => {
    const [datePick, setDatePick] = useState(null);
    const opacityBackDrop = useSharedValue(0);
    const tranYModal = useSharedValue(0);

    const { bottom } = useSafeAreaInsets();

    useEffect(() => {
      if (visible) {
        tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 200 });
        opacityBackDrop.value = withTiming(1, { duration: 300 });
      } else {
      }
    }, [visible]);

    const _handleOnDateChange = (date, type) => {
      setDatePick(date?._d);
    };

    const _handleConfirmPickDate = () => {
      _handleHideModal();
      onConfirm(datePick);
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

    const _handleHideModal = useCallback(() => {
      tranYModal.value = withTiming(0, { duration: 200 }, (fnd) => {
        if (fnd) {
          runOnJS(_hideModal)();
        }
      });
      opacityBackDrop.value = withTiming(0, { duration: 200 });
    }, []);
    const _hideModal = () => {
      onClose();
    };

    return (
      <>
        {visible ? (
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
                onPress={_handleHideModal}
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
                  bottom: -HEIGHT_MODAL,
                  height: HEIGHT_MODAL,
                },
                animTranY,
              ]}
            >
              <View style={{ marginTop: _moderateScale(8 * 2) }} />

              <CalendarPicker
                onDateChange={_handleOnDateChange}
                minDate={minDate ? minDate : null}
                maxDate={maxDate ? maxDate : null}
                // maxDate={props?.maxDate ? props?.maxDate : null}
                previousTitle={"Trước"}
                nextTitle={"Sau"}
                weekdays={["CN", "T2", "T3", "T4", "T5", "T6", "T7"]}
                months={[
                  "Tháng 1",
                  "Tháng 2",
                  "Tháng 3",
                  "Tháng 4",
                  "Tháng 5",
                  "Tháng 6",
                  "Tháng 7",
                  "Tháng 8",
                  "Tháng 9",
                  "Tháng 10",
                  "Tháng 11",
                  "Tháng 12",
                ]}
                selectedDayColor={
                  selectedDayColor ? selectedDayColor : BASE_COLOR
                }
                selectedDayTextColor={WHITE}
                selectedDayTextStyle={[stylesFont.fontNolanBold]}
                textStyle={[stylesFont.fontNolan]}
                todayBackgroundColor={"#ccc"}
                todayTextStyle={[stylesFont.fontDinTextPro, { color: WHITE }]}
                enableSwipe={true}
                selectMonthTitle={"Chọn tháng trong năm "}
                selectYearTitle={"Chọn năm"}
                dayLabelsWrapper={{
                  borderTopWidth: 0,
                  borderBottomWidth: 0.5,
                  borderBottomColor: BORDER_COLOR,
                }}
                width={_width - _widthScale(8 * 2)}
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-end",
                  paddingBottom: bottom,
                }}
              >
                <Row gap={16} paddingHorizontal={_moderateScale(8 * 2)}>
                  <TouchableOpacity
                    onPress={_handleConfirmPickDate}
                    style={styles.leftBtn}
                  >
                    <LinearGradient
                      style={[
                        StyleSheet.absoluteFillObject,
                        { borderRadius: 8 },
                      ]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      colors={colors ? colors : ["#1C5579", "#186A57"]}
                    />

                    <Text weight="bold" size={14} color={WHITE}>
                      Xác nhận
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.rightBtn} onPress={() => { onNew() }}>
                    <Text weight="bold" size={14} color={GREY_FOR_TITLE}>
                      Làm mới
                    </Text>
                  </TouchableOpacity>
                </Row>
              </View>
            </Animated.View>
          </View>
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default NewDatePicker;

const styles = StyleSheet.create({
  leftBtn: {
    flex: 1,
    height: _moderateScale(8 * 5),
    backgroundColor: "#F2F2F5",
    justifyContent: "center",
    alignItems: "center",
  },
  rightBtn: {
    width: _moderateScale(8 * 13),
    height: _moderateScale(8 * 5),
    borderRadius: 8,
    backgroundColor: "#F2F2F5",
    justifyContent: "center",
    alignItems: "center",
  },
  modalFilter: {
    width: "100%",
    // paddingVertical: _heightScale(30),
    paddingTop: _moderateScale(8 * 1),
    paddingBottom: _moderateScale(8 * 2),
    backgroundColor: WHITE,
    // paddingHorizontal: _moderateScale(23),
    borderBottomStartRadius: _moderateScale(8 * 2),
    borderBottomEndRadius: _moderateScale(8 * 2),
    justifyContent: "flex-end",
    alignItems: "center",
  },
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
