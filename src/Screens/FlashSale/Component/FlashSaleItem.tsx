import CachedImageView from "@Components/CachedImage";
import Column from "@Components/Column";
import HorizontalProgress from "@Components/HoriontalProgress";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  GREY,
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
import { isIos } from "src/utils/platform";

const PADDING = 8;
const ITEM_WIDTH = _width / 2 - PADDING - PADDING / 2;
const IMAGE_WIDTH = ITEM_WIDTH - 2;
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
      height={isIos ? 245 : 235}
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
        width={ITEM_WIDTH}
      >
        <Column onPress={onServiceDetails} flex={1} width={IMAGE_WIDTH}>
          <CachedImageView
            avatar={
              item.service.avatar ?? head(item.service.representationFileArr)
            }
            style={styles.image}
            resizeMode="cover"
          />
          <Column flex={1} paddingHorizontal={4}>
            <Text size={12} numberOfLines={2} top={4}>
              {item.service.name}
            </Text>
          </Column>
          <Row
            justifyContent="space-between"
            alignItems="flex-end"
            paddingHorizontal={4}
          >
            <Text weight="bold" color={MAIN_RED} size={16}>
              {`${
                isUpcoming
                  ? replaceFirstCharacter(formatMonney(item.finalPrice), "?")
                  : formatMonney(item.finalPrice)
              }`}
            </Text>
            <Text size={12} textDecorationLine="line-through" color={GREY}>
              {formatMonney(item.originalPrice)}
            </Text>
          </Row>
          <Column marginTop={4} paddingTop={8} paddingHorizontal={4}>
            <HorizontalProgress
              percent={percentage}
              height={isIos ? 12 : 10}
              colors={[MAIN_RED_700, MAIN_RED_700]}
              backgroundColor={MAIN_RED_100}
            />
            <Row style={StyleSheet.absoluteFill}>
              <Column flex={Math.max(percentage / 100, 0.1)} />
              <FlameIcon width={18} height={18} style={styles.fireIcon} />
            </Row>
            <Text
              top={8}
              removePadding
              size={9}
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
          <Text color={!canBook ? TITLE_GREY : MAIN_RED_600} size={12}>
            {"Đặt hẹn"}
          </Text>
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
    overflow: "hidden",
  },
  progress: {
    position: "absolute",
    alignSelf: "center",
  },
  fireIcon: {
    marginLeft: -15,
    marginBottom: 0,
  },
});
