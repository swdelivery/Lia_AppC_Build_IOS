import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { _width } from "../../../Constant/Scale";
import FastImage from "@Components/FastImage";

const HEIGHT_IMAGE_SERVICE = (_width * 926) / 1242;

const HorizonListImage = () => {
  return (
    <FastImage
      style={{
        width: _width,
        height: HEIGHT_IMAGE_SERVICE,
      }}
      source={require("../../../Image/bgService.jpg")}
    />
  );
};

export default HorizonListImage;

const styles = StyleSheet.create({});
