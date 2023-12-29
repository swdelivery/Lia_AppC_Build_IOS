import Column from "@Components/Column";
import React, { useMemo } from "react";
import FlashSaleBg from "./FlashSaleBg";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { FlashIcon } from "src/SGV";
import { Service } from "@typings/serviceGroup";

type Props = {
  width: number;
  height?: number;
  textSize?: number;
  item: Service;
};

export default function FlashSale({
  width,
  height = 25,
  textSize = 12,
  item,
}: Props) {
  const isOutOfStock = useMemo(() => {
    return (
      item.preferentialInCurrentFlashSale.limit &&
      item.preferentialInCurrentFlashSale.limit ===
        item.preferentialInCurrentFlashSale.usage
    );
  }, [item]);

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
            {isOutOfStock ? "Đã bán hết" : "Đang diễn ra"}
          </Text>
        </Row>
      </Row>
    </Column>
  );
}
