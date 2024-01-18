import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { _moderateScale } from "../../../Constant/Scale";
import { stylesFont } from "../../../Constant/Font";
import {
  BLACK_OPACITY_8,
  BG_GREY_OPACITY_5,
  BLUE_FB,
  BG_GREY_OPACITY_2,
} from "../../../Constant/Color";
import { styleElement } from "../../../Constant/StyleElement";
import TextInput from "@Components/TextInput";

const InputRefCode = memo((props) => {
  return (
    <>
      <View style={{ paddingLeft: _moderateScale(8 * 3) }}>
        <Text
          style={{
            ...stylesFont.fontNolanBold,
            fontSize: _moderateScale(16),
            color: BLACK_OPACITY_8,
          }}
        >
          Mã giới thiệu
        </Text>
      </View>
      <View
        style={[
          styleElement.rowAliCenter,
          {
            paddingHorizontal: _moderateScale(8 * 1),
            flex: 1,
            marginTop: _moderateScale(8 * 1),
          },
        ]}
      >
        <TextInput
          onChangeText={(e) => props?.setCodeRef(e)}
          value={props?.codeRef}
          style={[
            styles.inputCodeRef,
            {
              backgroundColor: BG_GREY_OPACITY_2,
              flex: 1,
              marginHorizontal: _moderateScale(8 * 2),
            },
          ]}
          placeholder={"vd: AF209BHN"}
        />
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  inputCodeRef: {
    // marginRight: _moderateScale(8 * 2),
    borderRadius: _moderateScale(8),
    borderWidth: _moderateScale(1),
    borderColor: BG_GREY_OPACITY_5,
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(8),
    color: BLUE_FB,
  },
});

export default InputRefCode;
