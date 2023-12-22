import { RenderItemProps } from "@typings/common";
import { FlashSale, FlashSaleService as Service } from "@typings/flashsale";
import React, { useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import FlashSaleItem from "./FlashSaleItem";
import useApi from "src/Hooks/services/useApi";
import FlashSaleService from "src/Services/FlashSaleService";
import { AfterTimeoutFragment } from "@Components/AfterTimeoutFragment";

type Props = {
  flashSale: FlashSale;
};

export default function FlashSaleServices({ flashSale }: Props) {
  const { isLoading, data, performRequest, refresh } = useApi(
    FlashSaleService.getFlashSaleServices,
    []
  );

  useEffect(() => {
    if (flashSale) {
      performRequest(flashSale._id);
    }
  }, [flashSale]);

  function renderItem({ item }: RenderItemProps<Service>) {
    return <FlashSaleItem item={item} isUpcoming={flashSale.isUpcoming} />;
  }

  return (
    <AfterTimeoutFragment>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        refreshing={isLoading}
        onRefresh={refresh}
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
