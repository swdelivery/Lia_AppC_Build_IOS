import React, { memo, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { BG_GREY_OPACITY_3, BLACK_OPACITY_8 } from "../../../Constant/Color";
import {
  _heightScale,
  _moderateScale,
  _widthScale,
} from "../../../Constant/Scale";
import TextInput from "@Components/TextInput";

const ItemInput = memo((props) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(props?.content);
  }, [props?.content]);

  return (
    <View style={[styles.input]}>
      <TextInput
        style={[styles.textFeed]}
        value={content}
        multiline={true}
        placeholder={`Bạn đang nghĩ gì?`}
        onChangeText={(text) => {
          setContent(text);
        }}
        onBlur={() => {
          props?.setContent(content);
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: _moderateScale(12),
    fontSize: _widthScale(14),
    padding: _moderateScale(8),
    minHeight: _moderateScale(120),
    borderWidth: _moderateScale(0.5),
    borderColor: BG_GREY_OPACITY_3,
    backgroundColor: BG_GREY_OPACITY_3,
    marginBottom: _moderateScale(16),
    color: BLACK_OPACITY_8,
    borderRadius: _moderateScale(8),
  },
});

export default ItemInput;
