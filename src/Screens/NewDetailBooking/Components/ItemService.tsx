import Column from "@Components/Column";
import Image from "@Components/Image";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BASE_COLOR,
  BLACK,
  BORDER_INPUT_TEXT,
  GREY,
  PRICE_ORANGE,
} from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney } from "@Constant/Utils";
import { BookingService } from "@typings/booking";
import { Service } from "@typings/serviceGroup";
import React, { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";

type Props = {
  item: BookingService;
};

const ItemService = ({ item }: Props) => {
  const handlePress = useServiceDetailsNavigation();

  const handleServicePress = useCallback(() => {
    handlePress(item.service);
  }, [item]);

  return (
    <View style={styles.itemService}>
      <Row alignItems={"stretch"} gap={8 * 2}>
        <Image style={styles.avatarService} avatar={item.service.avatar} />
        <Column flex={1} justifyContent="space-between">
          <Row gap={8 * 4}>
            <Text
              numberOfLines={1}
              style={styleElement.flex}
              color={BASE_COLOR}
              weight="bold"
            >
              {item.service.name}
            </Text>
            <Text color={PRICE_ORANGE} weight="bold">
              {`${formatMonney(item.finalPrice, true)}`}
            </Text>
          </Row>
          <Row alignItems="flex-end" gap={4}>
            <Column flex={1}>
              {item.options.map((option) => (
                <Row gap={_moderateScale(5)}>
                  <Column
                    width={_moderateScale(2)}
                    height={_moderateScale(2)}
                    backgroundColor={GREY}
                    borderRadius={_moderateScale(10)}
                  />
                  <Text color={GREY} fontStyle="italic" numberOfLines={1}>
                    {option.name}
                  </Text>
                </Row>
              ))}
            </Column>
            <Pressable onPress={handleServicePress}>
              <Text
                fontStyle="italic"
                textDecorationLine="underline"
                color={BASE_COLOR}
              >
                xem chi tiết
              </Text>
            </Pressable>
          </Row>
        </Column>
      </Row>
    </View>
  );
};

export default ItemService;

const styles = StyleSheet.create({
  itemService: {
    padding: _moderateScale(8 * 2),
    borderBottomWidth: 1,
    borderBottomColor: BORDER_INPUT_TEXT,
  },
  avatarService: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    borderRadius: 8,
  },
});
