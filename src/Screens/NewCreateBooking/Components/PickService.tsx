import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import Text from "@Components/Text";
import {
  BLACK,
  BORDER_COLOR,
  GREY_FOR_TITLE,
  MAIN_RED_600,
  RED,
} from "@Constant/Color";
import { _moderateScale } from "@Constant/Scale";
import { IconPlusGrey } from "@Components/Icon/Icon";
import { styleElement } from "@Constant/StyleElement";
import CountStar2 from "@Components/NewCountStar/CountStar";
import Column from "@Components/Column";
import Row from "@Components/Row";
import Icon from "@Components/Icon";
import { navigation } from "rootNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import { useDispatch, useSelector } from "react-redux";
import { getDataCreateBookingState } from "@Redux/booking/selectors";
import Image from "@Components/Image";
import { formatMonney } from "@Constant/Utils";
import { Alert } from "react-native";
import ButtonDelete from "@Components/ButtonDelete/ButtonDelete";
import useHapticCallback from "src/Hooks/useHapticCallback";
import { removeService, selectCoupon } from "@Redux/booking/actions";
import { SERVICE_BANNER_RATIO } from "@Constant/image";
import FlashSale from "@Screens/SoYoungService/components/FlashSale";
import { FlashIcon } from "src/SGV";
import { formatTime, fromFlashSaleDate } from "src/utils/date";
import { Service, ServiceOption } from "@typings/serviceGroup";

const ITEM_SERVICE_WIDTH = 8 * 22;

const PickService = () => {
  const dispatch = useDispatch();
  const { dataServices, dataBranch } = useSelector(getDataCreateBookingState);

  const _handleGoPickerService = useCallback(() => {
    if (!dataBranch?.code) {
      return Alert.alert("Bạn cần chọn phòng khám trước tiên");
    }
    navigation.navigate(ScreenKey.PICK_SERVICE_TO_BOOKING);
  }, [dataBranch?.code]);

  useEffect(() => {
    dispatch(selectCoupon(null));
  }, [dataServices]);

  return (
    <View style={styles.container}>
      <Text size={14} weight="bold">
        Dịch vụ <Text color={RED}>*</Text>
      </Text>
      <View style={{ height: _moderateScale(8 * 2) }} />

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {dataServices?.map((item, index) => {
          return <ItemService key={item?.id} data={item} />
        })}
        <TouchableOpacity
          onPress={_handleGoPickerService}
          activeOpacity={0.8}
          style={[styles.btnAddService, styleElement.centerChild]}
        >
          <IconPlusGrey />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PickService;

const ItemService = ({ data }) => {
  const dispatch = useDispatch();

  const _handleRemoveService = useHapticCallback(() => {
    dispatch(removeService(data));
  }, []);

  const isFlashSaleStarted = useMemo(() => {
    if (data.isOnFlashSale && data.currentFlashSale) {
      const currentFlashSale = fromFlashSaleDate(data.currentFlashSale);
      return currentFlashSale.to > Date.now();
    }
  }, [data]);

  const buildItemTopping = (value: string) => {
    return (
      <Row gap={_moderateScale(5)}>
        <Column width={_moderateScale(5)} height={_moderateScale(5)} backgroundColor={BLACK} borderRadius={_moderateScale(20)}>
        </Column>
        <Text size={_moderateScale(12)} fontStyle="italic" numberOfLines={1}>{value}</Text>
      </Row>
    )
  }

  const toppingPrice = useMemo(() => {
    let total = 0;
    if (data != null && data?.optionsSelected != null && data?.optionsSelected?.length > 0) {
      for (let i = 0; i < data?.optionsSelected?.length; i++) {
        const element = data?.optionsSelected[i];
        for (let j = 0; j < element?.data.length; j++) {
          const elementChild = element?.data[j];
          total += elementChild?.extraAmount != null ? elementChild?.extraAmount : 0;
        }
      }
    }
    return total;
  }, [data])


  return (
    <Column width={ITEM_SERVICE_WIDTH} borderRadius={8}>
      <Column position={"absolute"} zIndex={1} top={-8} right={-8}>
        <ButtonDelete onPress={_handleRemoveService} />
      </Column>

      <Column>
        <Image style={styles.image} avatar={data?.representationFileArr[0]} />
        {isFlashSaleStarted && (
          <FlashSale item={data} width={ITEM_SERVICE_WIDTH} />
        )}
      </Column>

      <Column
        borderWidth={1}
        borderTopWidth={0}
        borderColor={BORDER_COLOR}
        padding={8}
        flex={1}
      >
        <Text weight="bold" color={GREY_FOR_TITLE}>
          {data?.name}
        </Text>
        <Column flex={1} />
        <Row gap={4}>
          <CountStar2 size={9} count={data?.reviewCount} rating={5} />
          {!data.isOnFlashSale && !!data.nextFlashSale && (
            <Row>
              <Column backgroundColor={MAIN_RED_600} marginRight={2}>
                <FlashIcon width={8} height={8} />
              </Column>
              <Text size={6} color={MAIN_RED_600}>
                Flash Sale bắt đầu lúc{" "}
                {formatTime(data.nextFlashSale.timeRange.from)}
              </Text>
            </Row>
          )}
        </Row>
        <Column gap={_moderateScale(5)}>
          {
            (data?.optionsSelected != null && data?.optionsSelected.length > 0) && (
              data?.optionsSelected.map(item => item?.data?.map(itemChild => buildItemTopping(itemChild?.name)))
            )
          }
        </Column>
        <Row marginTop={2} justifyContent="space-between">
          {data.isOnFlashSale && data?.preferentialInCurrentFlashSale ? (
            <Row flex={1} alignItems="flex-end" gap={4}>
              <Text size={14} weight="bold" color={RED}>
                {`${formatMonney(
                  data?.preferentialInCurrentFlashSale?.finalPrice + toppingPrice
                )}`}
              </Text>
              <Text size={8} textDecorationLine="line-through" bottom={1}>
                {formatMonney(data.price + toppingPrice)}
              </Text>
            </Row>
          ) : (
            <Text size={14} weight="bold" color={RED} style={styleElement.flex}>
              {`${formatMonney(data?.price + toppingPrice)}`}
            </Text>
          )}

          <Row>
            <Icon name="account-multiple" size={14} color="grey" />
            <Text size={10} left={4}>
              ({data?.countPartner})
            </Text>
          </Row>
        </Row>
      </Column>
    </Column>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    gap: 8 * 2,
    paddingVertical: 8 * 2,
    flexGrow: 1,
  },
  btnAddService: {
    width: _moderateScale(8 * 10),
    height: _moderateScale(8 * 13),
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
  },
  container: {
    paddingHorizontal: _moderateScale(8 * 2),
  },
  image: {
    width: ITEM_SERVICE_WIDTH,
    height: ITEM_SERVICE_WIDTH * SERVICE_BANNER_RATIO,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
