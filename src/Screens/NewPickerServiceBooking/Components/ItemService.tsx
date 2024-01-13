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
  RED,
  WHITE,
} from "@Constant/Color";
import { _moderateScale, _width, _widthScale } from "@Constant/Scale";
import { styleElement } from "@Constant/StyleElement";
import { formatMonney } from "@Constant/Utils";
import ModalPickToppingNew from "@Screens/Booking/bookingForBranch/ModalPickToppingNew";
import FlashSale from "@Screens/SoYoungService/components/FlashSale";
import { Service } from "@typings/serviceGroup";
import { cloneDeep, isEmpty } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Toast, { ErrorToast } from "react-native-toast-message";
import useServiceDetailsNavigation from "src/Hooks/navigation/useServiceDetailsNavigation";
import { FlashIcon } from "src/SGV";
import { formatTime } from "src/utils/date";

const ITEM_WIDTH = _width / 2 - 8;

type Props = {
  data: Service;
  isSelected: boolean;
  canSelect: boolean;
  onToggleSelection: (item: Service) => void;
};

const ItemService = ({
  isSelected,
  canSelect,
  data,
  onToggleSelection,
}: Props) => {
  const handleGoDetailService = useServiceDetailsNavigation();

  const _handleGoDetailService = useCallback(() => {
    handleGoDetailService(data);
  }, [data]);

  const [showModalPickTopping, setShowModalPickTopping] = useState({
    data: {} as Service,
    isShow: false
  })

  const isOutOfStock = useMemo(() => {
    return (
      data.preferentialInCurrentFlashSale?.limit &&
      data.preferentialInCurrentFlashSale.limit ===
      data.preferentialInCurrentFlashSale.usage
    );
  }, [data]);

  const handleSelectService = useCallback(() => {
    let error = "";
    if (!canSelect && !isSelected) {
      error =
        "Bạn chỉ được chọn 1 dịch vụ đang trong quá trình diễn ra Flash Sale";
    }
    if (isOutOfStock) {
      error = "Dịch vụ đã hết số lượng ưu đãi";
    }
    if (!!error) {
      Toast.show({
        type: "error",
        text1: error,
        visibilityTime: 3000,
        position: "bottom",
      });
      return;
    }

    if (data.options != null && data.options.length > 0 && !isSelected) {
      setShowModalPickTopping({
        isShow: true,
        data: data
      });
    } else {
      onToggleSelection(data);
    }
  }, [data, isSelected, canSelect, onToggleSelection, isOutOfStock]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={_handleGoDetailService} style={styles.item}>
        <Column
        //overflow="hidden"
        >
          <Image style={styles.avatar} avatar={data?.avatar} />
          {data.isOnFlashSale && <FlashSale item={data} />}
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
                {data.isOnFlashSale && data?.preferentialInCurrentFlashSale ? (
                  <Row flex={1} alignItems="flex-end" gap={4}>
                    <Text size={14} weight="bold" color={RED}>
                      {`${formatMonney(
                        data?.preferentialInCurrentFlashSale?.finalPrice
                      )}`}
                    </Text>
                    <Text size={8} textDecorationLine="line-through" bottom={1}>
                      {formatMonney(data.price)}
                    </Text>
                  </Row>
                ) : (
                  <Text
                    size={14}
                    weight="bold"
                    color={RED}
                    style={styleElement.flex}
                  >
                    {`${formatMonney(data?.price)}`}
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
            <TouchableOpacity
              onPress={handleSelectService}
              style={[
                styles.item__body__btnAdd,
                (isSelected || !canSelect || isOutOfStock) &&
                  styles.item__body__btnAdd_selected,
              ]}
            >
              <Text color={WHITE} weight="bold">
                {isSelected ? "Đã Thêm" : "Thêm"}
              </Text>
            </TouchableOpacity>
          </Column>
        </View>
      </TouchableOpacity>
      <ModalPickToppingNew
        confirm={(currChoice, listTopping) => {
          let options = cloneDeep(currChoice.options);

          for (let i = 0; i < options.length; i++) {
            options[i].data = listTopping.filter(
              (item) => item.groupCode === options[i].groupCode
            );
          }

          let optionsFinal = options.filter((item) => !isEmpty(item.data));
          currChoice.optionsSelected = cloneDeep(optionsFinal);
          onToggleSelection(currChoice);
        }}
        data={showModalPickTopping?.data}
        show={showModalPickTopping?.isShow}
        hide={() => {
          setShowModalPickTopping({
            data: {} as Service,
            isShow: false,
          });
        }}
      />
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
