import React, { memo, useEffect, useState } from "react";
import Modal from "react-native-modal";
import {
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { stylesFont } from "../../../Constant/Font";
import {
  _moderateScale,
  _widthScale,
  _width,
  _heightScale,
} from "../../../Constant/Scale";
import { WHITE, BG_GREY_OPACITY_2, BLUE_FB } from "../../../Constant/Color";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { styleElement } from "../../../Constant/StyleElement";
import { sizeIcon } from "../../../Constant/Icon";
import withPortal from "@Components/withPortal";
import Text from "@Components/Text";
import TextInput from "@Components/TextInput";

const ModalEditDescriptionDailyDiary = memo((props: any) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(props?.data?.description);
  }, [props?.data]);

  const _handleConfirmEdit = () => {
    // alert(description)
    props?.confirmEditDescription(props?.data?._id, description?.trim());
    props?.hide();
  };

  return (
    <Modal
      style={{
        margin: 0,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: getBottomSpace() + _moderateScale(8 * 2),
      }}
      onModalShow={() => {}}
      isVisible={props.show}
      useNativeDriver={true}
      coverScreen={Platform.OS == "ios" ? false : true}
      onBackButtonPress={() => {
        props?.hide();
      }}
      onBackdropPress={() => {
        props?.hide();
      }}
    >
      <KeyboardAvoidingView
        // behavior="position"
        keyboardVerticalOffset={
          Platform.OS == "ios" && getBottomSpace() == 0
            ? _heightScale(100)
            : _heightScale(100)
        }
        behavior={Platform.OS == "ios" ? "position" : null}
        enabled
      >
        <View style={styles.container}>
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            style={{ flexGrow: 1, paddingVertical: _moderateScale(8 * 2) }}
          >
            <View
              style={[
                {
                  paddingHorizontal: _moderateScale(8 * 2),
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <TouchableOpacity style={{}}>
                <Image
                  style={sizeIcon.lg}
                  source={require("../../../Icon/cancel.png")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={_handleConfirmEdit}
                style={[
                  styleElement.centerChild,
                  {
                    width: _moderateScale(8 * 6),
                    height: _moderateScale(8 * 3),
                    backgroundColor: BLUE_FB,
                    borderRadius: _moderateScale(4),
                  },
                ]}
              >
                <Text
                  style={{
                    ...stylesFont.fontNolanBold,
                    fontSize: _moderateScale(14),
                    color: WHITE,
                    bottom: 1,
                  }}
                >
                  Lưu
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                paddingHorizontal: _moderateScale(8 * 2),
                marginTop: _moderateScale(8 * 2),
              }}
            >
              <View
                style={{
                  minHeight: _moderateScale(8 * 8),
                  backgroundColor: BG_GREY_OPACITY_2,
                  marginTop: _moderateScale(0),
                  borderRadius: _moderateScale(8),
                  padding: _moderateScale(8),
                  paddingHorizontal: _moderateScale(8 * 1.5),
                }}
              >
                <TextInput
                  onChangeText={(content) => {
                    setDescription(content);
                  }}
                  value={description}
                  autoFocus={true}
                  placeholder={"Bạn đang nghĩ gì?"}
                  multiline
                  style={{
                    flex: 1,
                    fontSize: _moderateScale(14),
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  btnConfirm: {
    marginHorizontal: _moderateScale(8 * 2),
    backgroundColor: BLUE_FB,
    paddingVertical: _moderateScale(6),
    marginTop: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    justifyContent: "center",
    alignItems: "center",
  },
  inputSize: {
    marginHorizontal: _moderateScale(8 * 2),
    backgroundColor: BG_GREY_OPACITY_2,
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8),
    borderRadius: _moderateScale(8),
  },
  container: {
    width: _width - _moderateScale(8 * 4),
    // height: _moderateScale(8 * 30),
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8 * 2),
  },
});

export default withPortal(ModalEditDescriptionDailyDiary);
