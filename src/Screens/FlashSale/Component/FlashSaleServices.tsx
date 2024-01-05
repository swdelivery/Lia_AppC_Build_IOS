import { RenderItemProps } from "@typings/common";
import {
  FlashSale,
  FlashSaleService as FSService,
  FlashSaleService as Service,
} from "@typings/flashsale";
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

type Props = {
  flashSale: FlashSale;
};

export default function FlashSaleServices({ flashSale }: Props) {
  const { navigation } = useNavigate();

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
      // @ts-ignore
      navigation.navigate(ScreenKey.CREATE_BOOKING, {
        service: {
          ...item.service,
          isOnFlashSale: true,
          currentFlashSale: flashSale,
          preferentialInCurrentFlashSale: item,
        },
      });
    },
    [flashSale]
  );

  function renderItem({ item }: RenderItemProps<Service>) {
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
        ListEmptyComponent={<ListEmpty title="Không có thông tin flash sale" />}
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
