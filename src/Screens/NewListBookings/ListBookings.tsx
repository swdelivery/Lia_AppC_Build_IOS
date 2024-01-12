import CardBooking from '@Components/Booking/CardBooking';
import Button from '@Components/Button/Button';
import Column from '@Components/Column';
import { IconEmptyData } from '@Components/Icon/Icon';
import EmptyResultData from '@Components/LoadingIndicator/EmptyResultData';
import Text from '@Components/Text';
import ScreenKey from '@Navigation/ScreenKey';
import { getMyBooking, loadMoreMyBooking } from "@Redux/user/actions";
import { getMyBookingState } from "@Redux/user/selectors";
import { FlashList } from "@shopify/flash-list";
import { Booking } from "@typings/booking";
import { RenderItemProps } from "@typings/common";
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import useListFilter from "src/Hooks/useListFilter";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";

const ListBookings = () => {
  const { navigate } = useNavigate()
  const { isLoading, data, refreshData } = useListFilter(
    getMyBookingState,
    getMyBooking,
    loadMoreMyBooking
  );
  const { processingBooking } = useSelector(getMyBookingState);

  useFocused(() => {
    refreshData();
  });

  const _renderItem = ({ item }: RenderItemProps<Booking>) => {
    const isProcessing = processingBooking === item._id;
    return <CardBooking item={item} isProcessing={isProcessing} />;
  };

  const _handleCreateBooking = useCallback(() => {
    navigate(ScreenKey.CREATE_BOOKING)()
  }, [])

  return (
    <FlashList
      ListEmptyComponent={
        isLoading ? (
          <></>
        ) : (
          <Column marginTop={8 * 20} flex={1}>
            <EmptyResultData>
              <Column gap={8} alignItems='center'>
                <IconEmptyData width={8 * 8} height={8 * 8} />
                <Text>
                  Làm đẹp cùng LiA
                </Text>
                <Button.Gradient
                  onPress={_handleCreateBooking}
                  height={8 * 4}
                  borderRadius={8 * 4}
                  width={8 * 20}
                  horizontal
                  colors={['#2A78BD', '#21587E']}
                  title='Đặt hẹn ngay' />
              </Column>
            </EmptyResultData>
          </Column>
        )
      }
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
  styleContent: {
    paddingTop: 8 * 2,
    paddingBottom: 8 * 10,
  },
});
