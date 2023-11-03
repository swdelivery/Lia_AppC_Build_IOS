import { StyleSheet, View } from "react-native";
import React from "react";
import { _moderateScale, _width } from "../../../Constant/Scale";
import FastImage from "@Components/FastImage";

const HEIGHT_COVER_IMAGE = (_width * 564) / 1125;

const CoverImage = () => {
  return (
    <View style={styles.coverImage}>
      <FastImage
        style={styles.coverImage__image}
        source={require("../../../Image/coverBranch.png")}
      />
    </View>
  );
};

export default CoverImage;

const styles = StyleSheet.create({
  coverImage__image: {
    width: _width,
    height: HEIGHT_COVER_IMAGE,
  },
  coverImage: {
    width: _width,
    height: _moderateScale(8 * 25),
    borderWidth: 1,
  },
});
