import { RenderItemProps } from "@typings/common";
import { FlashSale, FlashSaleService as FSService } from "@typings/flashsale";
import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import FlashSaleItem from "./FlashSaleItem";
import useApi from "src/Hooks/services/useApi";
import FlashSaleService from "src/Services/FlashSaleService";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";
import ListEmpty from "@Components/ListEmpty";
import { useNavigate } from "src/Hooks/useNavigation";
import useRequireLoginCallback from "src/Hooks/useRequireLoginAction";
import ScreenKey from "@Navigation/ScreenKey";
import ModalPickToppingNew from "@Screens/Booking/bookingForBranch/ModalPickToppingNew";
import { cloneDeep, isEmpty } from "lodash";
import useVisible from "src/Hooks/useVisible";
import { Service } from "@typings/serviceGroup";

type Props = {
  flashSale: FlashSale;
};

export default function FlashSaleServices({ flashSale }: Props) {
  const { navigation } = useNavigate();
  const toppingPicker = useVisible<Service>();

  const { isLoading, data, performRequest, refresh } = useApi(
    FlashSaleService.getFlashSaleServices,
    []
  );

  useEffect(() => {
    if (flashSale) {
      performRequest(flashSale._id);
    }
  }, [flashSale]);

  const handleBooking = useRequireLoginCallback(
    (item: FSService) => {
      const service: Service = {
        ...item.service,
        isOnFlashSale: true,
        currentFlashSale: flashSale,
        // @ts-ignore
        preferentialInCurrentFlashSale: item,
      };
      if (item.service?.options?.length > 0) {
        toppingPicker.show(service);
        return;
      }
      // @ts-ignore
      navigation.navigate(ScreenKey.CREATE_BOOKING, {
        service,
      });
    },
    [flashSale]
  );

  function renderItem({ item }: RenderItemProps<FSService>) {
    return (
      <FlashSaleItem
        item={item}
        isUpcoming={flashSale?.isUpcoming}
        onBooking={handleBooking}
      />
    );
  }

  return (
    <AfterTimeoutFragment>
      <FlatList
        data={flashSale ? data : []}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        refreshing={isLoading}
        onRefresh={refresh}
        ListEmptyComponent={<ListEmpty title="Hãy chờ đón sự kiện FlashSale sắp tới nhé!" />}
      />
      <ModalPickToppingNew
        confirm={(currChoice, listTopping) => {
          const service = toppingPicker.selectedItem.current;
          let options = cloneDeep(service.options);

          for (let i = 0; i < options.length; i++) {
            options[i].data = listTopping.filter(
              (item) => item.groupCode === options[i].groupCode
            );
          }

          let optionsFinal = options.filter((item) => !isEmpty(item.data));
          service.optionsSelected = cloneDeep(optionsFinal);
          navigation.navigate(ScreenKey.CREATE_BOOKING, { service: service });
        }}
        data={toppingPicker.selectedItem.current}
        show={toppingPicker.visible}
        hide={toppingPicker.hide}
      />
    </AfterTimeoutFragment>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 60,
  },
});
