import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Icon from "@Components/Icon";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  MAIN_RED,
  MAIN_RED_100,
  MAIN_RED_500,
  TITLE_GREY,
} from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney } from "@Constant/Utils";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import { Service } from "@typings/serviceGroup";
import React from "react";
import { StyleSheet } from "react-native";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";
import useCallbackItem from "src/Hooks/useCallbackItem";

const IMAGE_WIDTH = _width / 2 - 8 * 2 + 1;
const IMAGE_HEIGHT = IMAGE_WIDTH * SERVICE_BANNER_RATIO;
type Props = {
  item: Service;
};

export default function FlashSaleItem({ item }: Props) {
  const trigger = useCallbackItem(item);
  const handleServicePress = useServiceDetailsNavigation();

  return (
    <Column
      flex={1}
      width={_width / 2}
      height={250}
      paddingLeft={4}
      paddingRight={4}
      marginBottom={8}
      onPress={trigger(handleServicePress)}
    >
      <Column
        flex={1}
        backgroundColor={"white"}
        borderRadius={8}
        padding={1}
        style={styleElement.shadow}
      >
        <Image avatar={item.avatar} style={styles.image} />
        <Column flex={1} paddingHorizontal={4}>
          <Text size={12} numberOfLines={2} top={4}>
            {item.name}
          </Text>
        </Column>
        <Row justifyContent="space-between">
          <Text weight="bold" color={MAIN_RED} size={16}>
            {formatMonney(item.price * 0.8)}
          </Text>
          <Text size={12} textDecorationLine="line-through">
            {formatMonney(item.price)}
          </Text>
        </Row>
        <Column marginTop={4} paddingTop={8}>
          <HorizontalProgress
            percent={40}
            height={12}
            colors={[MAIN_RED_500, MAIN_RED_500]}
            backgroundColor={MAIN_RED_100}
          />
          <Text
            top={8}
            removePadding
            size={10}
            weight="bold"
            color={"white"}
            style={styles.progress}
          >
            70/100
          </Text>
          <Row style={StyleSheet.absoluteFill}>
            <Column flex={0.4} />
            <Icon
              name="fire"
              size={24}
              color={"#fec400"}
              style={styles.fireIcon}
            />
          </Row>
        </Column>
        <Column
          borderWidth={1}
          borderColor={TITLE_GREY}
          borderRadius={4}
          alignSelf="center"
          paddingHorizontal={8}
          paddingBottom={4}
          paddingTop={2}
          marginVertical={8}
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
  fireIcon: {
    marginLeft: -24,
  },
});
