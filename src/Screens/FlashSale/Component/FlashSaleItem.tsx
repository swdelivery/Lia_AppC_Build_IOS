import Button from "@Components/Button/Button";
import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import { GREY, MAIN_RED, MAIN_RED_100, TITLE_GREY } from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney } from "@Constant/Utils";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import { Service } from "@typings/serviceGroup";
import React from "react";
import { View, StyleSheet } from "react-native";

const IMAGE_WIDTH = _width / 2 - 8 * 2 + 1;
const IMAGE_HEIGHT = IMAGE_WIDTH * SERVICE_BANNER_RATIO;
type Props = {
  item: Service;
};

export default function FlashSaleItem({ item }: Props) {
  return (
    <Column
      flex={1}
      width={_width / 2}
      height={240}
      paddingLeft={4}
      paddingRight={4}
      marginBottom={8}
    >
      <Column
        flex={1}
        backgroundColor={"white"}
        borderRadius={8}
        padding={1}
        style={styleElement.shadow}
      >
        <Image avatar={item.avatar} style={styles.image} />
        <Column paddingHorizontal={4}>
          <Text size={12} numberOfLines={2}>
            {item.name}
          </Text>
          <Row justifyContent="space-between">
            <Text weight="bold" color={MAIN_RED} size={16}>
              {formatMonney(item.price * 0.8)}
            </Text>
            <Text size={12} textDecorationLine="line-through">
              {formatMonney(item.price)}
            </Text>
          </Row>
          <Column marginTop={4}>
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
        <Column
          borderWidth={1}
          borderColor={TITLE_GREY}
          borderRadius={4}
          alignSelf="center"
          paddingHorizontal={8}
          paddingBottom={4}
          paddingTop={2}
          marginTop={12}
        >
          <Text color={TITLE_GREY}>{"Đặt hẹn"}</Text>
        </Column>
      </Column>
    </Column>
  );
}

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 8,
  },
  progress: {
    position: "absolute",
    alignSelf: "center",
  },
});
