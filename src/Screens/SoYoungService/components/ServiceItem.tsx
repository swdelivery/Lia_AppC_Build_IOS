import React, { useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { _width } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import ScreenKey from "@Navigation/ScreenKey";
import { useNavigate } from "src/Hooks/useNavigation";
import Image from "@Components/Image";
import Text from "@Components/Text";
import CountStar2 from "@Components/NewCountStar/CountStar";
import { Service } from "@typings/serviceGroup";
import Column from "@Components/Column";
import { GREY, MAIN_RED_600, RED } from "@Constant/Color";
import Row from "@Components/Row";
import { styleElement } from "@Constant/StyleElement";
import Icon from "@Components/Icon";
import ContentLoader, { Rect } from "react-content-loader/native";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import FlashSale from "./FlashSale";
import { FlashIcon } from "src/SGV";
import { formatTime } from "src/utils/date";

type Props = {
  item: Service;
  numColumns: number;
  isFirstInRow: boolean;
};

export default function ServiceItem({
  item,
  numColumns = 2,
  isFirstInRow,
}: Props) {
  const { navigation } = useNavigate();

  const _handleGoDetailService = useCallback(() => {
    navigation.navigate(ScreenKey.DETAIL_SERVICE, {
      service: item,
    });
  }, [item]);

  // const {} = useMemo(() => {
  //   if (item.currentFlashSale) {
  //     return { item };
  //   }
  // }, [item]);

  return (
    <Column
      style={styles.content}
      onPress={_handleGoDetailService}
      flex={1 / numColumns}
      marginLeft={isFirstInRow ? 0 : 8}
    >
      <Column overflow="hidden">
        <Image style={styles.image} avatar={item.avatar} />
        {item.isOnFlashSale && <FlashSale width={_width / numColumns} />}
      </Column>
      <Column style={styles.info}>
        <Column height={35}>
          <Text numberOfLines={2} size={12} weight="bold">
            {item?.name}
          </Text>
        </Column>
        <Row gap={4}>
          <CountStar2
            rating={item.averageRating}
            count={item.reviewCount}
            size={9}
          />
          {!item.isOnFlashSale && !!item.nextFlashSale && (
            <Row>
              <Column backgroundColor={MAIN_RED_600} marginRight={2}>
                <FlashIcon width={10} height={10} />
              </Column>
              <Text size={6} color={MAIN_RED_600}>
                Flash Sale bắt đầu lúc{" "}
                {formatTime(item.nextFlashSale.timeRange.from)}
              </Text>
            </Row>
          )}
        </Row>
        <Row>
          {item.isOnFlashSale && item?.preferentialInCurrentFlashSale ? (
            <Row flex={1} alignItems="flex-end" gap={4}>
              <Text size={12} weight="bold" color={RED}>
                {`${formatMonney(
                  item?.preferentialInCurrentFlashSale?.finalPrice
                )}`}
              </Text>
              <Text size={8} textDecorationLine="line-through" bottom={1}>
                {formatMonney(item.price)}
              </Text>
            </Row>
          ) : (
            <Text size={12} weight="bold" color={RED} style={styleElement.flex}>
              {`${formatMonney(item?.price)}`}
            </Text>
          )}
          <Icon name="account-multiple" size={14} color={GREY} />
          <Text size={10} bottom={2} left={2}>{`(${item.countPartner})`}</Text>
        </Row>
      </Column>
    </Column>
  );
}

export const PLACEHOLDER_HEIGHT = 200;

export function Placeholder() {
  return (
    <Row style={[styles.container, styles.placeholderRow]} gap={8}>
      <View style={styles.placeholderItem}>
        <ContentLoader>
          <Rect x="0" y="0" rx="4" ry="4" height="100" width="100%" />
          <Rect x="0" y="110" rx="3" ry="3" width="80%" height="12" />
          <Rect x="0" y="128" rx="3" ry="3" width="50%" height="12" />
          <Rect x="0" y="145" rx="3" ry="3" width="50%" height="12" />
        </ContentLoader>
      </View>
      <View style={styles.placeholderItem}>
        <ContentLoader>
          <Rect x="0" y="0" rx="4" ry="4" height="100" width="100%" />
          <Rect x="0" y="110" rx="3" ry="3" width="80%" height="12" />
          <Rect x="0" y="128" rx="3" ry="3" width="50%" height="12" />
          <Rect x="0" y="145" rx="3" ry="3" width="50%" height="12" />
        </ContentLoader>
      </View>
    </Row>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8 * 2,
    backgroundColor: "#F5F9FA",
  },
  content: {
    backgroundColor: "white",
    borderRadius: 8,
    ...styleElement.shadow,
  },
  image: {
    width: "100%",
    aspectRatio: 1 / SERVICE_BANNER_RATIO,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  info: {
    padding: 8,
  },
  placeholderRow: {
    height: PLACEHOLDER_HEIGHT,
    marginHorizontal: 16,
  },
  placeholderItem: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
});
