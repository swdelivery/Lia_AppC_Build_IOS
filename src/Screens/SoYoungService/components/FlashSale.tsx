import Column from "@Components/Column";
import React from "react";
import { View, StyleSheet } from "react-native";
import FlashSaleBg from "./FlashSaleBg";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { FlashIcon } from "src/SGV";

type Props = {
  width: number;
  height?: number;
  textSize?: number;
};

export default function FlashSale({
  width,
  height = 25,
  textSize = 12,
}: Props) {
  return (
    <Column position="absolute" bottom={0}>
      <FlashSaleBg width={width} height={height} />
      <Row>
        <FlashIcon height={height} width={height} />
        <Text weight="bold" color={"white"} size={textSize} left={-5}>
          Flash Sale
        </Text>
        <Row marginLeft={30} marginTop={7}>
          <Text size={textSize - 3} color={"white"} weight="bold">
            Đang diễn ra
          </Text>
        </Row>
      </Row>
    </Column>
  );
}

const styles = StyleSheet.create({
  //
});
