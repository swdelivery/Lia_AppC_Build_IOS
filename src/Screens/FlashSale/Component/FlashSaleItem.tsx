import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  MAIN_RED,
  MAIN_RED_100,
  MAIN_RED_600,
  MAIN_RED_700,
  TITLE_GREY,
} from "@Constant/Color";
import { _width } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney, replaceFirstCharacter } from "@Constant/Utils";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import { FlashSaleService } from "@typings/flashsale";
import { head } from "lodash";
import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";
import useCallbackItem from "src/Hooks/useCallbackItem";
import { FlameIcon } from "src/SGV";

const IMAGE_WIDTH = _width / 2 - 8 * 2 + 1;
const IMAGE_HEIGHT = IMAGE_WIDTH * SERVICE_BANNER_RATIO;
type Props = {
  item: FlashSaleService;
  isUpcoming: boolean;
  onBooking: (item: FlashSaleService) => void;
};

export default function FlashSaleItem({ item, isUpcoming, onBooking }: Props) {
  const trigger = useCallbackItem(item);
  const handleServicePress = useServiceDetailsNavigation();

  const percentage = useMemo(() => {
    return isUpcoming || item.usage === 0
      ? 0
      : item.limit
      ? (item.usage / item.limit) * 100
      : 30;
  }, [isUpcoming, item]);

  const isOutOfStock = useMemo(() => {
    return item.limit && item.usage === item.limit;
  }, [item]);

  const canBook = !isOutOfStock && !isUpcoming;

  const saleProgress = useMemo(() => {
    if (isOutOfStock) {
      return "Đã hết ưu đãi";
    }
    return `Đã bán ${item.usage}${item.limit ? `/${item.limit}` : ""}`;
  }, [item, isOutOfStock]);

  const onServiceDetails = useCallback(() => {
    handleServicePress(item.service);
  }, [item, handleServicePress]);

  return (
    <Column
      flex={1 / 2}
      width={_width / 2}
      height={250}
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
        <Column onPress={onServiceDetails} flex={1}>
          <Image
            avatar={
              item.service.avatar ?? head(item.service.representationFileArr)
            }
            style={styles.image}
          />
          <Column flex={1} paddingHorizontal={4}>
            <Text size={12} numberOfLines={2} top={4}>
              {item.service.name}
            </Text>
          </Column>
          <Row justifyContent="space-between" paddingHorizontal={4}>
            <Text weight="bold" color={MAIN_RED} size={16}>
              {`${
                isUpcoming
                  ? replaceFirstCharacter(formatMonney(item.finalPrice), "?")
                  : formatMonney(item.finalPrice)
              }`}
            </Text>
            <Text size={12} textDecorationLine="line-through">
              {formatMonney(item.originalPrice)}
            </Text>
          </Row>
          <Column marginTop={4} paddingTop={8} paddingHorizontal={4}>
            <HorizontalProgress
              percent={percentage}
              height={12}
              colors={[MAIN_RED_700, MAIN_RED_700]}
              backgroundColor={MAIN_RED_100}
            />
            <Row style={StyleSheet.absoluteFill}>
              <Column flex={Math.max(percentage / 100, 0.1)} />
              <FlameIcon width={22} height={22} style={styles.fireIcon} />
            </Row>
            <Text
              top={8}
              removePadding
              size={10}
              weight="bold"
              color={"white"}
              style={styles.progress}
            >
              {saleProgress}
            </Text>
          </Column>
        </Column>
        <Column
          borderWidth={1}
          borderColor={!canBook ? TITLE_GREY : MAIN_RED_600}
          borderRadius={4}
          alignSelf="center"
          paddingHorizontal={8}
          paddingBottom={4}
          paddingTop={2}
          marginVertical={8}
          onPress={trigger(onBooking)}
          disabled={!canBook}
        >
          <Text color={!canBook ? TITLE_GREY : MAIN_RED_600}>{"Đặt hẹn"}</Text>
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
    marginLeft: -22,
    marginBottom: 2,
  },
});
