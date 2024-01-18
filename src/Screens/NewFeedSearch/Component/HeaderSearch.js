import React, { useRef, useState, useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import * as Color from "../../../Constant/Color";
import { BASE_COLOR, BG_GREY_OPACITY_5 } from "../../../Constant/Color";
import { sizeIcon } from "../../../Constant/Icon";
import { _moderateScale } from "../../../Constant/Scale";
import { styleElement } from "../../../Constant/StyleElement";
import TextInput from "@Components/TextInput";

const HeaderSearch = (props) => {
  const inputRef = useRef(null);

  const [text, setText] = useState("");

  useEffect(() => {
    console.log({ value: props?.value });
    if (!props?.value) {
      setText(props?.value);
    }
  }, [props?.value]);

  return (
    <View
      style={{
        height: _moderateScale(8 * 6),
        justifyContent: "center",
        backgroundColor: BASE_COLOR,
      }}
    >
      <View
        style={[
          styleElement.rowAliCenter,
          {
            justifyContent: "space-between",
            paddingHorizontal: _moderateScale(8 * 2),
          },
        ]}
      >
        <View style={[styleElement.rowAliTop]}>
          <TouchableOpacity
            onPress={() => props?.handleGoBack()}
            style={[
              styleElement.centerChild,
              {
                width: _moderateScale(8 * 4),
                height: _moderateScale(8 * 4),
                borderRadius: _moderateScale(4),
                // backgroundColor:WHITE,
              },
            ]}
          >
            <Image
              style={sizeIcon.lg}
              source={require("../../../Icon/backWhite.png")}
            />
          </TouchableOpacity>

          <View style={{ position: "relative", flex: 1 }}>
            <TextInput
              ref={props?.inputRef}
              onChangeText={(e) => {
                setText(e);
                props?.onChangeText(e);
              }}
              value={text}
              onFocus={() => props?.handleShow("show")}
              onSubmitEditing={() => props?.handleSearch()}
              style={[
                styles.inputCodeRef,
                { flex: 1, marginHorizontal: _moderateScale(0) },
              ]}
              placeholder={"vd: Cắt mí T2020"}
            />

            <TouchableOpacity
              onPress={() => props?.handleSearch()}
              style={[
                styleElement.centerChild,
                {
                  width: _moderateScale(8 * 4),
                  height: _moderateScale(8 * 4),
                  borderRadius: _moderateScale(4),
                  position: "absolute",
                  zIndex: 1000,
                  right: _moderateScale(8),
                },
              ]}
            >
              <Image
                style={sizeIcon.lg}
                source={require("../../../NewIcon/searchLinear.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputCodeRef: {
    // marginRight: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8 * 4),
    // borderWidth: _moderateScale(1),
    borderColor: BG_GREY_OPACITY_5,
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(4),
    color: Color.GREY_FOR_TITLE,
    backgroundColor: Color.BG_CLEAR,
  },
});

export default HeaderSearch;
