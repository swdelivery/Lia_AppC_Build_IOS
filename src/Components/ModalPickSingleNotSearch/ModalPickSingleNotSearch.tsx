import React, { memo, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Modal from "react-native-modal";
import { useDispatch } from "react-redux";
import {
  BASE_COLOR,
  BG_GREY_OPACITY_5,
  BG_GREY_OPACITY_7,
  BLUE_FB,
  GREEN,
  RED,
  WHITE,
} from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import { _moderateScale } from "../../Constant/Scale";
import Text from "@Components/Text";

const ModalPickSingleNotSearch = memo((props) => {
  useEffect(() => {}, []);

  const _renderStatusDoctor = (status) => {
    switch (status) {
      case "WAIT":
        return (
          <View style={[{ flexDirection: "row", alignItems: "center" }]}>
            <View style={[styles.dotColor, { backgroundColor: BLUE_FB }]} />

            <Text
              style={[
                stylesFont.fontNolan500,
                { fontSize: _moderateScale(14), color: BLUE_FB },
              ]}
            >
              Sẵn sàng
            </Text>
          </View>
        );

      case "IN_PROGRESS":
        return (
          <View style={[{ flexDirection: "row", alignItems: "center" }]}>
            <View style={[styles.dotColor, { backgroundColor: GREEN }]} />

            <Text
              style={[
                stylesFont.fontNolan500,
                { fontSize: _moderateScale(14), color: GREEN },
              ]}
            >
              Đang có khách
            </Text>
          </View>
        );

      case "BUSY":
        return (
          <View style={[{ flexDirection: "row", alignItems: "center" }]}>
            <View style={[styles.dotColor, { backgroundColor: RED }]} />

            <Text
              style={[
                stylesFont.fontNolan500,
                { fontSize: _moderateScale(14), color: RED },
              ]}
            >
              Đang bận
            </Text>
          </View>
        );

      default:
        break;
    }
  };

  const _renderItem = ({ item, index }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            props?.onSelect(item);
            props?.hide();
          }}
          style={{
            paddingVertical: _moderateScale(8 * 1.5),
            width: "100%",
            borderBottomWidth: _moderateScale(0.5),
            borderBottomColor: BG_GREY_OPACITY_5,
            alignItems: "center",
          }}
        >
          <Text
            style={[stylesFont.fontNolan500, { fontSize: _moderateScale(14) }]}
          >
            {item?.name}
          </Text>
          {props?.forDoctor ? _renderStatusDoctor(item?.status) : <></>}
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <Modal
        supportedOrientations={["portrait", "landscape"]}
        style={{
          margin: 0,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: _moderateScale(8 * 2),
          paddingVertical: _moderateScale(8 * 2),
          paddingTop:
            Platform.OS == "ios"
              ? getStatusBarHeight() + _moderateScale(8 * 2)
              : _moderateScale(8 * 2),
        }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationOutTiming={100}
        isVisible={props?.show}
        useNativeDriver={true}
        coverScreen={Platform.OS == "ios" ? true : true}
        backdropTransitionOutTiming={0}
        onBackButtonPress={() => {
          props?.hide();
        }}
        onBackdropPress={() => {
          props?.hide();
        }}
        hideModalContentWhileAnimating
      >
        <View style={styles.modalFilter}>
          <FlatList renderItem={_renderItem} data={props?.data} />
        </View>
      </Modal>
    </>
  );
});

const gradient = {
  container: {
    width: "100%",
    height: "100%",
    // paddingVertical: basePadding.sm,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
  },
  color: ["rgba(104, 47, 144,.7)", BASE_COLOR],
};

const styles = StyleSheet.create({
  btnGoBack: {
    marginVertical: _moderateScale(12),
  },
  btnCancel: {
    height: _moderateScale(8 * 4),
    backgroundColor: WHITE,
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_7,
    width: _moderateScale(8 * 12),
    borderRadius: _moderateScale(8),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  modalFilter: {
    width: "80%",
    // paddingVertical: _heightScale(30),
    // paddingTop: _moderateScale(getStatusBarHeight() + 8 * 1),
    // paddingBottom: _moderateScale(8 * 2),
    backgroundColor: WHITE,
    // paddingHorizontal: _moderateScale(23),
    borderRadius: _moderateScale(8),
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    paddingHorizontal: _moderateScale(8 * 2),
    maxHeight: "100%",
    // height: "100%"
  },
});

export default ModalPickSingleNotSearch;
