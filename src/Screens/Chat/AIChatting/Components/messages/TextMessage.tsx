import { FONT_WEIGHTS } from "@Components/Text";
import { BLACK } from "@Constant/Color";
import { AIMessage } from "@typings/aichat";
import React from "react";
import { StyleSheet } from "react-native";
import ParsedText from "react-native-parsed-text";

type Props = { item: AIMessage };

export default function TextMessage({ item }: Props) {
  return <ParsedText style={styles.text}>{item.content}</ParsedText>;
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontFamily: FONT_WEIGHTS["regular"],
    fontSize: 14,
    color: BLACK,
    minWidth: 50,
    maxWidth: 230
  },
});
