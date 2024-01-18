import React, { memo, useState } from "react";
import Modal from "react-native-modal";
import {
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { _moderateScale } from "../../../Constant/Scale";
import {
  WHITE,
  BASE_COLOR,
  FIFTH_COLOR,
  BTN_PRICE,
  GREEN_SUCCESS,
} from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { styleElement } from "../../../Constant/StyleElement";
import { sizeIcon } from "../../../Constant/Icon";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import TextInput from "@Components/TextInput";

const ModalFeedBack = memo((props) => {
  const [indexCountStar, setIndexCountStar] = useState(3);

  return (
    <Modal
      style={{
        margin: 0,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: _moderateScale(8 * 4),
      }}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={150}
      animationOutTiming={500}
      isVisible={props.show}
      useNativeDriver={true}
      coverScreen={Platform.OS == "ios" ? false : true}
      onBackButtonPress={() => {
        props.hide();
      }}
      onBackdropPress={() => {
        props.hide();
      }}
    >
      <View style={[styles.container]}>
        <KeyboardAwareScrollView>
          <Text
            style={[
              stylesFont.fontNolanBold,
              {
                fontSize: _moderateScale(16),
                color: "#EC3A79",
                alignSelf: "center",
              },
            ]}
          >
            ĐÁNH GIÁ DỊCH VỤ
          </Text>

          <View
            style={[
              styleElement.rowAliCenter,
              { justifyContent: "center", marginTop: _moderateScale(8 * 2) },
            ]}
          >
            {[1, 2, 3, 4, 5]?.map((item, index) => {
              if (index > indexCountStar) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIndexCountStar(index);
                    }}
                    style={styles.btnStar}
                  >
                    <Image
                      style={[sizeIcon.xlllg]}
                      source={require("../../../Icon/i_star.png")}
                    />
                  </TouchableOpacity>
                );
              }
              return (
                <TouchableOpacity
                  onPress={() => {
                    setIndexCountStar(index);
                  }}
                  style={styles.btnStar}
                >
                  <Image
                    style={[sizeIcon.xlllg]}
                    source={require("../../../Icon/a_star.png")}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <Text
            style={[
              stylesFont.fontNolan500,
              {
                fontSize: _moderateScale(16),
                color: BASE_COLOR,
                marginTop: _moderateScale(8 * 2),
                marginLeft: _moderateScale(8),
              },
            ]}
          >
            Nội dung
          </Text>

          <View
            style={{
              backgroundColor: FIFTH_COLOR,
              width: "100%",
              padding: _moderateScale(8 * 2),
              borderRadius: _moderateScale(8),
              marginTop: _moderateScale(8),
            }}
          >
            <TextInput
              multiline
              placeholder={"Nhập cảm nhận của bạn về dịch vụ này..."}
              style={styles.textInput}
            />
          </View>

          <View
            style={[
              styleElement.rowAliCenter,
              {
                justifyContent: "space-between",
                marginTop: _moderateScale(8 * 5),
              },
            ]}
          >
            <TouchableOpacity
              onPress={props?.hide}
              style={[styles.btnConfirm, { backgroundColor: BTN_PRICE }]}
            >
              <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                Huỷ
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnConfirm, { backgroundColor: GREEN_SUCCESS }]}
            >
              <Text style={[stylesFont.fontNolanBold, styles.btnConfirm__text]}>
                Gửi
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: _moderateScale(8 * 3) }} />
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  btnConfirm__text: {
    fontSize: _moderateScale(16),
    color: WHITE,
  },
  btnConfirm: {
    width: "45%",
    borderRadius: _moderateScale(8 * 2),
    justifyContent: "center",
    alignItems: "center",
    height: _moderateScale(8 * 4),
  },
  textInput: {
    height: _moderateScale(8 * 8),
    fontSize: _moderateScale(14),
  },
  btnStar: {
    padding: _moderateScale(8),
  },
  container: {
    width: "100%",
    // paddingVertical: _heightScale(30),
    paddingTop: _moderateScale(20),
    // paddingBottom: _moderateScale(50),
    backgroundColor: WHITE,
    paddingHorizontal: _moderateScale(23),
    borderRadius: _moderateScale(8),
  },
});

export default ModalFeedBack;
