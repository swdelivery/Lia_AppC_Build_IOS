import Column from "@Components/Column";
import React, { useCallback, useMemo, useState } from "react";
import FlashSaleBg from "./FlashSaleBg";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { FlashIcon } from "src/SGV";
import { Service } from "@typings/serviceGroup";
import { LayoutChangeEvent } from "react-native";

type Props = {
  height?: number;
  textSize?: number;
  item: Service;
};

export default function FlashSale({ height = 25, textSize = 12, item }: Props) {
  const [contentWidth, setContentWidth] = useState(0);

  const isOutOfStock = useMemo(() => {
    return (
      item.preferentialInCurrentFlashSale.limit &&
      item.preferentialInCurrentFlashSale.limit ===
        item.preferentialInCurrentFlashSale.usage
    );
  }, [item]);

  const handleLayout = useCallback(
    ({
      nativeEvent: {
        layout: { width },
      },
    }: LayoutChangeEvent) => {
      setContentWidth(width);
    },
    []
  );

  return (
    <Column
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      onLayout={handleLayout}
    >
      <FlashSaleBg width={contentWidth} height={height} />
      <Row>
        <FlashIcon height={height} width={height} />
        <Text weight="bold" color={"white"} size={textSize} left={-5}>
          Flash Sale
        </Text>
        <Row flex={1} marginTop={7} justifyContent="center">
          <Text
            size={textSize - 3}
            color={"white"}
            weight="bold"
            // flex={1}
            // textAlign="right"
            // style={{ backgroundColor: "black" }}
          >
            {isOutOfStock ? "Đã bán hết" : "Đang diễn ra"}
          </Text>
        </Row>
      </Row>
    </Column>
  );
}
