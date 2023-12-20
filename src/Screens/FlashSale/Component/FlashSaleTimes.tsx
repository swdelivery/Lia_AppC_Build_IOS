import Column from "@Components/Column";
import LinearGradient from "@Components/LinearGradient";
import NumberTicker from "@Components/NumberTicker";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { MAIN_RED, MAIN_RED_500 } from "@Constant/Color";
import React from "react";
import { View, StyleSheet } from "react-native";

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
      <Row justifyContent="center" gap={4} marginBottom={16} marginTop={4}>
        <Text size={10} weight="bold" color={"white"}>
          Kết thúc trong
        </Text>
        <Column
          backgroundColor={"white"}
          width={18}
          borderRadius={4}
          alignItems="center"
          paddingBottom={1}
        >
          <NumberTicker
            value={11}
            textSize={12}
            weight="bold"
            color={MAIN_RED_500}
          />
        </Column>
        <Text size={10} weight="bold" color={"white"}>
          giờ
        </Text>
        <Column
          backgroundColor={"white"}
          width={18}
          borderRadius={4}
          alignItems="center"
          paddingBottom={1}
        >
          <NumberTicker
            value={45}
            textSize={12}
            weight="bold"
            color={MAIN_RED_500}
          />
        </Column>
        <Text size={10} weight="bold" color={"white"}>
          phút
        </Text>
        <Column
          backgroundColor={"white"}
          width={18}
          borderRadius={4}
          alignItems="center"
          paddingBottom={1}
        >
          <NumberTicker
            value={31}
            textSize={12}
            weight="bold"
            color={MAIN_RED_500}
          />
        </Column>
      </Row>
    </Column>
  );
}

const styles = StyleSheet.create({
  //
});
