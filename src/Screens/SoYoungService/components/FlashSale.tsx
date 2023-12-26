import Column from "@Components/Column";
import React from "react";
import { View, StyleSheet } from "react-native";
import FlashSaleBg from "./FlashSaleBg";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { FlashIcon } from "src/SGV";

type Props = {
  width: number;
};

export default function FlashSale({ width }: Props) {
  return (
    <Column position="absolute" bottom={-1}>
      <FlashSaleBg width={width} height={25} />
      <Row>
        <FlashIcon height={25} width={20} />
        <Text weight="bold" color={"white"} size={12} left={-5}>
          Flash Sale
        </Text>
        <Row marginLeft={30} marginTop={7}>
          <Text size={10} color={"white"} weight="bold">
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
