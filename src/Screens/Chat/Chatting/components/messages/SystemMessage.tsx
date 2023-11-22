import Text from "@Components/Text";
import { BG_GREY_OPACITY_5 } from "@Constant/Color";
import { _moderateScale, _width, _widthScale } from "@Constant/Scale";
import { Message } from "@typings/chat";
import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  item: Message;
};

export default function SystemMessage({ item }: Props) {
  return (
    <View style={styles.systemMessage}>
      <Text weight="bold">{item?.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  systemMessage: {
    borderRadius: _moderateScale(8),
    overflow: "hidden",
    backgroundColor: BG_GREY_OPACITY_5,
    maxWidth: _width - _widthScale(8 * 4),
    alignSelf: "center",
    marginVertical: _moderateScale(8),
    opacity: 0.8,
  },
});
