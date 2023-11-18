import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import CardBooking from '@Components/Booking/CardBooking'
import useListFilter from "src/Hooks/useListFilter";
import { getMyBookingState } from "@Redux/user/selectors";
import { getMyBooking, loadMoreMyBooking } from "@Redux/user/actions";
import { useFocused } from "src/Hooks/useNavigation";
import { RenderItemProps } from "@typings/common";
import { Booking } from "@typings/booking";

const ListBookings = () => {
  const { getData, data } = useListFilter(
    getMyBookingState,
    getMyBooking,
    loadMoreMyBooking
  );

  useFocused(() => {
    getData();
  });

  const _renderItem = ({ item }: RenderItemProps<Booking>) => {
    return <CardBooking item={item} />;
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.styleContent}
      renderItem={_renderItem}
      keyExtractor={(item, index) => item._id}
    />
  );
};

export default ListBookings;

const styles = StyleSheet.create({
  styleContent: { gap: 8, paddingTop: 8 * 2, paddingBottom: 8 * 10 },
});
