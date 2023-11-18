import { StyleSheet, View } from "react-native";
import React from "react";
import { _width } from "@Constant/Scale";
import Image from "@Components/Image";
import { Insurance } from "@typings/insurance";

type Props = {
  insurance: Insurance;
};

const HorizontalListImage = ({ insurance }: Props) => {
  return (
    <View>
      <Image auto style={styles.image} avatar={insurance.avatar} />
    </View>
  );
};

export default HorizontalListImage;

const styles = StyleSheet.create({
  image: {
    width: _width,
    height: _width / 2,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,.3)",
  },
});
