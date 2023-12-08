import _isEmpty from "lodash/isEmpty";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { navigation } from "../../../../rootNavigation";
import {
  SECOND_COLOR,
  WHITE,
  BLACK_OPACITY_7,
  GREEN_SUCCESS,
} from "../../../Constant/Color";
import { stylesFont } from "../../../Constant/Font";
import { sizeIcon } from "../../../Constant/Icon";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../../Constant/Scale";
import { styleElement } from "../../../Constant/StyleElement";
import { URL_ORIGINAL } from "../../../Constant/Url";
import ScreenKey from "../../../Navigation/ScreenKey";
import ImageView from "react-native-image-viewing";
import FastImage from "react-native-fast-image";
import Row from "@Components/Row";
import { ChervonRightIcon } from "src/SGV";
import Text from "@Components/Text";

const ItemDiary = (props) => {
  const [indexCurrImageView, setIndexCurrImageView] = useState(0);
  const [showImageViewing, setShowImageViewing] = useState(false);
  const [listImagesSeeCurr, setListImagesSeeCurr] = useState([]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(ScreenKey.EDIT_DIARY, {
          diaryId: props?.data?._id,
        });
      }}
      style={[styles.cardDiary, shadow]}
      key={props?.data?._id}
    >
      <ImageView
        images={listImagesSeeCurr?.map((item) => {
          return {
            uri: `${URL_ORIGINAL}${item?.link}`,
          };
        })}
        onRequestClose={() => {
          setShowImageViewing(false);
        }}
        imageIndex={indexCurrImageView}
        visible={showImageViewing}
      />

      <Row>
        <View style={styles.cardDiary__verticalLine} />
        <Text style={styles.cardDiary__name}>{props?.data?.serviceName}</Text>
        <ChervonRightIcon />
      </Row>

      {props?.data?.imageBeforeTreatment?.length > 0 ? (
        <View
          style={[
            styleElement.rowAliCenter,
            { justifyContent: "space-between", marginTop: _moderateScale(8) },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setShowImageViewing(true);
              setIndexCurrImageView(0);
              setListImagesSeeCurr(props?.data?.imageBeforeTreatment);
            }}
            style={{
              width: "48%",
              height: 200,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={[
                styleElement.centerChild,
                {
                  height: _moderateScale(8 * 3),
                  backgroundColor: "rgba(0,0,0,0.5)",
                  position: "absolute",
                  zIndex: 1,
                  bottom: 0,
                  right: 0,
                  left: 0,
                },
              ]}
            >
              <Text color={"white"} size={12}>
                Hình ảnh trước điều trị{" "}
                {props?.data?.imageBeforeTreatment?.length > 1
                  ? `(+ ${props?.data?.imageBeforeTreatment?.length - 1})`
                  : ""}
              </Text>
            </View>
            <FastImage
              style={{
                width: "100%",
                height: "100%",
                borderRadius: _moderateScale(8),
              }}
              source={{
                uri: `${URL_ORIGINAL}${props?.data?.imageBeforeTreatment[0]?.link}`,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowImageViewing(true);
              setIndexCurrImageView(0);
              setListImagesSeeCurr(props?.data?.imageAfterTreatment);
            }}
            style={{
              width: "48%",
              height: 200,
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={[
                styleElement.centerChild,
                {
                  height: _moderateScale(8 * 3),
                  backgroundColor: "rgba(0,0,0,0.5)",
                  position: "absolute",
                  zIndex: 1,
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              ]}
            >
              <Text size={12} color={"white"}>
                Hình ảnh sau điều trị{" "}
                {props?.data?.imageAfterTreatment?.length > 1
                  ? `(+ ${props?.data?.imageAfterTreatment?.length - 1})`
                  : ""}
              </Text>
            </View>
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: _moderateScale(8),
              }}
              source={{
                uri: `${URL_ORIGINAL}${props?.data?.imageAfterTreatment[0]?.link}`,
              }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnNext: {
    alignSelf: "flex-end",
    marginTop: _moderateScale(8 * 2),
    width: _moderateScale(8 * 10),
    height: _moderateScale(8 * 3.5),
    backgroundColor: SECOND_COLOR,
    borderRadius: _moderateScale(8),
    ...styleElement.centerChild,
  },
  cardDiary__verticalLine: {
    width: _moderateScale(2),
    height: _moderateScale(8 * 2),
    backgroundColor: GREEN_SUCCESS,
    marginRight: _moderateScale(8),
  },
  cardDiary__name: {
    ...stylesFont.fontNolanBold,
    flex: 1,
    fontSize: _moderateScale(14),
    color: BLACK_OPACITY_7,
  },
  cardDiary: {
    backgroundColor: WHITE,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15,
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
  shadowRadius: 2,

  elevation: 3,
};

export default ItemDiary;
