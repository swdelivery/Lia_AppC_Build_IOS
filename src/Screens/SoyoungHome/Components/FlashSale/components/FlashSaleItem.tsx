import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { MAIN_RED, MAIN_RED_100 } from "@Constant/Color";
import { _widthScale } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import { FlashSaleService } from "@typings/flashsale";
import React from "react";
import { StyleSheet } from "react-native";

const IMAGE_HEIGHT = 60;

type Props = {
  item: FlashSaleService;
};

export default function FlashSaleItem({ item }: Props) {
  return (
    <Column width={IMAGE_HEIGHT / SERVICE_BANNER_RATIO}>
      <Image avatar={item.service.avatar} style={styles.image} />
      <Text size={10} weight="bold" numberOfLines={1}>
        {item.service.name}
      </Text>
      <Row justifyContent="space-between" alignItems="flex-end">
        <Text size={_widthScale(10)} weight="bold" color={MAIN_RED}>
          {formatMonney(item.finalPrice)}
        </Text>
        <Text
          size={_widthScale(8)}
          textDecorationLine="line-through"
          bottom={1}
        >
          {formatMonney(item.originalPrice)}
        </Text>
      </Row>
      <Column marginTop={2}>
        <HorizontalProgress
          percent={item.limit ? item.usage / item.limit : 30}
          height={12}
          colors={[MAIN_RED, MAIN_RED]}
          backgroundColor={MAIN_RED_100}
        />
        <Text
          removePadding
          size={10}
          weight="bold"
          color={"white"}
          style={styles.progress}
        >
          {item.usage}
          {item.limit ? "/" + item.limit : ""}
        </Text>
      </Column>
    </Column>
  );
}

const styles = StyleSheet.create({
  progress: {
    position: "absolute",
    alignSelf: "center",
  },
  image: {
    height: IMAGE_HEIGHT,
    width: IMAGE_HEIGHT / SERVICE_BANNER_RATIO,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 2,
  },
});
