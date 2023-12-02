import Column from "@Components/Column";
import {
  SENDER_BG
} from "@Constant/Color";
import { _width, _widthScale } from "@Constant/Scale";
import { AIMessage } from "@typings/aichat";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  children?: React.ReactNode;
  item: AIMessage;
  isLatest?: boolean;
};

export default function MyMessage({ children, item, isLatest }: Props) {

  return (
    <View style={styles.container}>
      <Column
        marginLeft={50}
        alignSelf="flex-end"
        backgroundColor={SENDER_BG}
        borderRadius={5}
        overflow="hidden">
        {children}
      </Column>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    paddingRight: _widthScale(16),
    width: _width,
    marginBottom: 15,
  },
  time: {
    textAlign: "right",
  },
});
