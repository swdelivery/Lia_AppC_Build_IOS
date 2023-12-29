import Column from "@Components/Column";
import Icon from "@Components/Icon";
import Image from "@Components/Image";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Row from "@Components/Row";
import Text from "@Components/Text";
import {
  BASE_COLOR,
  BORDER_COLOR,
  GREY,
  GREY_FOR_TITLE,
  MAIN_RED_600,
  PRICE_ORANGE,
  WHITE,
} from "@Constant/Color";
import { _moderateScale, _width, _widthScale } from "@Constant/Scale";
import { formatMonney } from "@Constant/Utils";
import FlashSale from "@Screens/SoYoungService/components/FlashSale";
import { Service } from "@typings/serviceGroup";
import React, { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";
import useCallbackItem from "src/Hooks/useCallbackItem";
import { FlashIcon } from "src/SGV";
import { formatTime } from "src/utils/date";

const ITEM_WIDTH = _width / 2 - 8;

type Props = {
  data: Service;
  isSelected: boolean;
  onToggleSelection: (item: Service) => void;
};

const ItemService = ({ isSelected, data, onToggleSelection }: Props) => {
  const trigger = useCallbackItem(data);

  const handleGoDetailService = useServiceDetailsNavigation();

  const _handleGoDetailService = useCallback(() => {
    handleGoDetailService(data);
  }, [data]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_handleGoDetailService} style={styles.item}>
        <Column overflow="hidden">
          <Image style={styles.avatar} avatar={data?.avatar} />
          {data.isOnFlashSale && <FlashSale width={_width / 2} />}
        </Column>

        <View style={styles.item__body}>
          <Column padding={8}>
            <Column gap={0}>
              <Text numberOfLines={1} weight="bold" color={GREY_FOR_TITLE}>
                {data.name}
              </Text>
              <Row gap={4}>
                <CountStar2 size={10} count={data?.reviewCount} rating={5} />
                {!data.isOnFlashSale && !!data.nextFlashSale && (
                  <Row>
                    <Column backgroundColor={MAIN_RED_600} marginRight={2}>
                      <FlashIcon width={10} height={10} />
                    </Column>
                    <Text size={7} color={MAIN_RED_600}>
                      Flash Sale bắt đầu lúc{" "}
                      {formatTime(data.nextFlashSale.timeRange.from)}
                    </Text>
                  </Row>
                )}
              </Row>

              <Row justifyContent="space-between">
                <Text color={PRICE_ORANGE} weight="bold" size={14}>
                  {formatMonney(data?.price)} VNĐ
                </Text>

                <Row>
                  <Icon name="account-multiple" size={14} color="grey" />
                  <Text size={10} left={4}>
                    ({data?.countPartner})
                  </Text>
                </Row>
              </Row>
            </Column>
            <TouchableOpacity
              onPress={trigger(onToggleSelection)}
              style={[
                styles.item__body__btnAdd,
                isSelected && styles.item__body__btnAdd_selected,
              ]}
            >
              <Text color={WHITE} weight="bold">
                {isSelected ? "Đã Thêm" : "Thêm"}
              </Text>
            </TouchableOpacity>
          </Column>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemService;

const styles = StyleSheet.create({
  item__body__btnAdd: {
    marginHorizontal: _moderateScale(0),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderRadius: 4,
    height: _moderateScale(8 * 3.5),
    backgroundColor: BASE_COLOR,
  },
  item__body__btnAdd_selected: {
    backgroundColor: GREY,
  },
  item__body: {
    width: ITEM_WIDTH,
    // height: ITEM_WIDTH / 2,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: BORDER_COLOR,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  avatar: {
    width: ITEM_WIDTH,
    height: (ITEM_WIDTH * 9) / 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  item: {
    width: ITEM_WIDTH,
  },
  container: {
    width: _width / 2 - 8,
    alignItems: "center",
    marginBottom: _widthScale(8),
    marginLeft: 8,
  },
});
