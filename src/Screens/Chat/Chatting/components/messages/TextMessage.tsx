import Text, { FONT_WEIGHTS } from "@Components/Text";
import { Message } from "@typings/chat";
import React from "react";
import { View, StyleSheet } from "react-native";
import ParsedText from "react-native-parsed-text";

type Props = { item: Message };

export default function TextMessage({ item }: Props) {
  return <ParsedText style={styles.text}>{item.content}</ParsedText>;
}

const styles = StyleSheet.create({
  text: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontFamily: FONT_WEIGHTS["regular"],
    fontSize: 14,
  },
});
