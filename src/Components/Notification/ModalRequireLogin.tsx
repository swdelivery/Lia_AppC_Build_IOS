import React, { useCallback } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import * as Color from "../../Constant/Color";
import { stylesFont } from "../../Constant/Font";
import {
  _heightScale,
  _widthScale,
  _moderateScale,
} from "../../Constant/Scale";
import * as ActionType from "../../Redux/Constants/ActionType";
import Store from "../../Redux/store";
import { styleElement } from "../../Constant/StyleElement";
import { sizeIcon } from "../../Constant/Icon";
import ScreenKey from "../../Navigation/ScreenKey";
import { navigation } from "../../../rootNavigation";
import LinearGradient from "react-native-linear-gradient";
import Button from "../Button/Button";

const ModalRequireLogin = (props) => {
  const dispatch = useDispatch();

  const isShowRequireLoginRedux = useSelector(
    (state) => state.authReducer?.isShowRequireLogin
  );

  const closeModal = useCallback(() => {
    dispatch({
      type: ActionType.SHOW_MODAL_REQUIRE_LOGIN,
      payload: {
        flag: false,
      },
    });
  }, []);

  const handleLoginPress = useCallback(() => {
    closeModal();
    navigation.navigate(ScreenKey?.LOGIN_IN_APP, {
      routeName: ScreenKey?.HOME,
    });
  }, []);

  return (
    <Modal
      style={{
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
      animationIn="zoomIn"
      animationOut="zoomOut"
      // animationInTiming={500}
      // animationOutTiming={500}
      isVisible={isShowRequireLoginRedux?.flag}
      useNativeDriver={true}
      coverScreen={Platform.OS == "ios" ? false : true}
      onBackButtonPress={() => {
        closeModal();
      }}
      onBackdropPress={() => {
        closeModal();
      }}
    >
      <View style={styles.modalFilter}>
        <View
          style={{
            alignItems: "flex-end",
            paddingRight: _moderateScale(8 * 2),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              closeModal();
            }}
            style={{
              padding: _moderateScale(8),
              backgroundColor: "#C4C4C4",
              borderRadius: 100,
            }}
          >
            <Image
              style={sizeIcon.xxxxs}
              source={require("../../NewIcon/xWhite.png")}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            width: _widthScale(160),
            height: _widthScale(160),
            resizeMode: "contain",
            alignSelf: "center",
            marginVertical: _moderateScale(8 * 2),
          }}
          source={require("../../NewImage/requireLogin.png")}
        />
        <View style={styles.viewContent}>
          <Text
            style={[
              stylesFont.fontNolan500,
              {
                fontSize: _widthScale(18),
                marginBottom: _heightScale(8),
                color: Color.BLACK_OPACITY_8,
              },
            ]}
          >
            Đăng nhập để sử dụng tính năng này
          </Text>
          <Text style={[stylesFont.fontNolan500, styles.content]}>
            Bạn cần đăng nhập hoặc đăng kí tài khoản để sử dụng tính năng này
          </Text>
          {/* <TouchableOpacity
                        onPress={closeModal}
                        style={styles.cancelBtn}>
                        <Text style={[stylesFont.fontNolan500, styles.cancelBtn__text]}>
                            ĐÓNG
                        </Text>
                    </TouchableOpacity> */}

          <View
            style={[
              styleElement.rowAliCenter,
              {
                justifyContent: "space-between",
                marginTop: _moderateScale(8 * 4),
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                closeModal();
                navigation.navigate(ScreenKey.REGISTER_IN_APP, {
                  routeName: ScreenKey.HOME,
                });
              }}
              style={[
                {
                  backgroundColor: "transparent",
                  width: "48%",
                  borderRadius: _moderateScale(8),
                },
                styleElement.centerChild,
              ]}
            >
              <Text
                style={{
                  ...stylesFont.fontNolan500,
                  fontSize: _moderateScale(14),
                  color: Color.BLACK_OPACITY_7,
                }}
              >
                Đăng ký
              </Text>
            </TouchableOpacity>
            <Button.Gradient
              title="Đăng nhập"
              titleSize={14}
              onPress={handleLoginPress}
              height={32}
              containerStyle={styles.button}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalFilter: {
    width: "85%",
    backgroundColor: Color.WHITE,
    borderRadius: _widthScale(8 * 2),
    paddingVertical: _heightScale(8 * 2),
  },
  viewContent: {
    paddingHorizontal: _widthScale(8 * 3),
  },
  content: {
    fontSize: _widthScale(14),
    // lineHeight: _heightScale(16),
    color: Color.GREY,
  },
  cancelBtn: {
    alignSelf: "flex-end",
    padding: _widthScale(8),
    marginTop: _heightScale(8),
  },
  cancelBtn__text: {
    fontSize: _widthScale(16),
    color: Color.BASE_COLOR,
  },
  button: {
    backgroundColor: Color.SECOND_COLOR,
    width: "48%",
    borderRadius: _moderateScale(8),
  },
});

export default ModalRequireLogin;
