import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import CardBooking from '@Components/Booking/CardBooking'
import useListFilter from "src/Hooks/useListFilter";
import { getMyBookingState } from "@Redux/user/selectors";
import { getMyBooking, loadMoreMyBooking } from "@Redux/user/actions";
import { useFocused } from "src/Hooks/useNavigation";
import { RenderItemProps } from "@typings/common";
import { Booking } from "@typings/booking";
import { FlashList } from "@shopify/flash-list";
import { useSelector } from "react-redux";

const ListBookings = () => {
  const { isLoading, data, refreshData } = useListFilter(
    getMyBookingState,
    getMyBooking,
    loadMoreMyBooking
  );
  const { processingBooking } = useSelector(getMyBookingState);

  useFocused(() => {
    refreshData();
  });

  console.log({ processingBooking });

  const _renderItem = ({ item }: RenderItemProps<Booking>) => {
    const isProcessing = processingBooking === item._id;
    return <CardBooking item={item} isProcessing={isProcessing} />;
  };

  return (
    <FlashList
      data={data}
      contentContainerStyle={styles.styleContent}
      renderItem={_renderItem}
      keyExtractor={(item, index) => item._id}
      refreshing={isLoading}
      onRefresh={refreshData}
      estimatedItemSize={100}
      extraData={processingBooking}
    />
  );
};

export default ListBookings;

const styles = StyleSheet.create({
  styleContent: { paddingTop: 8 * 2, paddingBottom: 8 * 10 },
});
