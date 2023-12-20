import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { MAIN_RED, MAIN_RED_100 } from "@Constant/Color";
import { _widthScale } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import { Service } from "@typings/serviceGroup";
import React from "react";
import { View, StyleSheet } from "react-native";

const IMAGE_HEIGHT = 60;

type Props = {
  item: Service;
};

export default function FlashSaleItem({ item }: Props) {
  return (
    <Column width={IMAGE_HEIGHT / SERVICE_BANNER_RATIO}>
      <Image avatar={item.avatar} style={styles.image} />
      <Text size={10} weight="bold" numberOfLines={1}>
        {item.name}
      </Text>
      <Row justifyContent="space-between" alignItems="flex-end">
        <Text size={_widthScale(10)} weight="bold" color={MAIN_RED}>
          {formatMonney(item.price - (20 * item.price) / 100)}
        </Text>
        <Text
          size={_widthScale(8)}
          textDecorationLine="line-through"
          bottom={1}
        >
          {formatMonney(item.price)}
        </Text>
      </Row>
      <Column marginTop={2}>
        <HorizontalProgress
          percent={40}
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
          70/100
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
