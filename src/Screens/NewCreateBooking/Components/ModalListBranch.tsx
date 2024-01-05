import React, { memo, useCallback, useEffect, useMemo } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { IconCancelGrey } from "../../../Components/Icon/Icon";
import { BASE_COLOR, GREY_FOR_TITLE, WHITE } from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { sizeIcon } from "../../../Constant/Icon";
import {
  _height,
  _heightScale,
  _moderateScale,
  _width,
} from "../../../Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import CardBranch from "./CardBranch";
import Column from "@Components/Column";
import {
  getBranchListForBookingState,
  getDataCreateBookingState,
} from "@Redux/booking/selectors";
import {
  changeBranchListForBookingByService,
  getBranchListForBooking,
} from "@Redux/booking/actions";
import { isEmpty } from "lodash";
import Text from "@Components/Text";
import { LoadingView } from "@Components/Loading/LoadingView";

const HEIGHT_MODAL = _heightScale(650);

type Props = {
  visible: boolean;
  onClose: () => void;
};

const ModalListBranch = ({ visible, onClose }: Props) => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(getBranchListForBookingState);
  const { dataServices, dataDoctor } = useSelector(getDataCreateBookingState);

  const opacityBackDrop = useSharedValue(0);
  const tranYModal = useSharedValue(0);

  console.log({ dataDoctor });

  useEffect(() => {
    if (visible) {
      tranYModal.value = withTiming(-HEIGHT_MODAL, { duration: 200 });
      opacityBackDrop.value = withTiming(1, { duration: 300 });
      getData();
    }
  }, [visible]);

  const getData = useCallback(() => {
    if (dataDoctor && !isEmpty(dataDoctor.branchArr)) {
      return;
    }

    dispatch(
      getBranchListForBooking.request({
        condition: {
          services: !isEmpty(dataServices)
            ? { object: { code: { in: dataServices.map((s) => s.code) } } }
            : undefined,
        },
      })
    );
  }, [dataServices, dataDoctor]);

  const branches = useMemo(() => {
    if (dataDoctor && !isEmpty(dataDoctor.branchArr)) {
      return dataDoctor.branchArr;
    }
    return data;
  }, [data, dataDoctor]);

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
        runOnJS(onClose)();
      }
    });
    opacityBackDrop.value = withTiming(0, { duration: 200 });
  };

  return (
    <>
      {visible ? (
        <View style={styles.container}>
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
            <View style={styles.header}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: _width,
                  height: _moderateScale(8 * 6),
                }}
              >
                <Text weight="bold">Chọn phòng khám</Text>

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
              {isLoading && <LoadingView />}
              <Column style={{ marginTop: 8 * 2 }} gap={8 * 2}>
                {branches?.map((item, index) => {
                  return (
                    <CardBranch
                      onClose={_handleHideModal}
                      data={item}
                      key={index}
                    />
                  );
                })}
              </Column>
              <View style={{ height: 100 }} />
            </ScrollView>
          </Animated.View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default ModalListBranch;

const styles = StyleSheet.create({
  container: {
    width: _width,
    height: _height,
    position: "absolute",
    zIndex: 100,
    bottom: 0,
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
