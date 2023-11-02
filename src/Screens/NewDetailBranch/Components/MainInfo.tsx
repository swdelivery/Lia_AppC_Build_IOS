import { StyleSheet, View } from "react-native";
import React from "react";
import { _moderateScale } from "../../../Constant/Scale";
import Text from "@Components/Text";

const MainInfo = () => {
  return (
    <View style={{ paddingHorizontal: _moderateScale(8 * 2) }}>
      <Text color={"grey"} size={14}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s Lorem Ipsum has been the industry's standard dummy
        text ever since the 1500s Lorem Ipsum has been the industry's standard
        dummy text ever since the 1500s Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500sdummy text ever since the 1500s
      </Text>
    </View>
  );
};

export default MainInfo;

const styles = StyleSheet.create({});
