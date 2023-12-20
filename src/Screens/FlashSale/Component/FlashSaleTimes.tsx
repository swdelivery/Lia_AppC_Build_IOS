import Column from "@Components/Column";
import LinearGradient from "@Components/LinearGradient";
import NumberTicker from "@Components/NumberTicker";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { MAIN_RED, MAIN_RED_500 } from "@Constant/Color";
import React from "react";
import { View, StyleSheet } from "react-native";
import FlashSaleEnds from "./FlashSaleEnds";

type Props = {};

export default function FlashSaleTimes({}: Props) {
  return (
    <Column>
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={["#b40000", "#c90000"]}
      />
      <Row paddingBottom={8} paddingHorizontal={20} gap={30}>
        <Column
          borderBottomWidth={1}
          borderColor={"white"}
          alignItems="center"
          paddingVertical={6}
        >
          <Text weight="bold" color={"white"}>
            17:00
          </Text>
          <Text weight="bold" size={10} color={"white"}>
            Đang diễn ra
          </Text>
        </Column>
        <Column
          borderBottomWidth={0}
          borderColor={"white"}
          alignItems="center"
          paddingVertical={6}
        >
          <Text weight="bold" color={"white"}>
            19:00
          </Text>
          <Text weight="bold" size={10} color={"white"}>
            Sắp diễn ra
          </Text>
        </Column>
        <Column
          borderBottomWidth={0}
          borderColor={"white"}
          alignItems="center"
          paddingVertical={6}
        >
          <Text weight="bold" color={"white"}>
            22:00
          </Text>
          <Text weight="bold" size={10} color={"white"}>
            Sắp diễn ra
          </Text>
        </Column>
      </Row>
      <FlashSaleEnds />
    </Column>
  );
}

const styles = StyleSheet.create({
  //
});
