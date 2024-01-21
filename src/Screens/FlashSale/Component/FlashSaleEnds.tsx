import Row from "@Components/Row";
import Text from "@Components/Text";
import { MAIN_RED_500 } from "@Constant/Color";
import FlashSaleTimer from "@Screens/SoyoungHome/Components/FlashSale/components/FlashSaleTimer";
import { FlashSale } from "@typings/flashsale";
import React from "react";

type Props = {
  flashSale: FlashSale;
  onFlashSaleUpdate: () => void;
};

export default function FlashSaleEnds({ flashSale, onFlashSaleUpdate }: Props) {
  return (
    <Row justifyContent="center" gap={4}>
      <Text size={12} weight="bold" color={"white"}>
        {flashSale?.isUpcoming ? "Bắt đầu trong" : "Kết thúc trong"}
      </Text>
      <FlashSaleTimer
        backgroundColor={"white"}
        textColor={MAIN_RED_500}
        flashSale={flashSale}
        useUnit
        textSize={11}
        onFlashSaleUpdate={onFlashSaleUpdate}
      />
    </Row>
  );
}
