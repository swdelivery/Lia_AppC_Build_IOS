import Column from "@Components/Column";
import NumberTicker from "@Components/NumberTicker";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { MAIN_RED_500 } from "@Constant/Color";
import React from "react";

type Props = {};

export default function FlashSaleEnds({}: Props) {
  return (
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
  );
}
