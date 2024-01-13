import { FlatList, StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import { BASE_COLOR, WHITE } from "../../Constant/Color";
import LiAHeader from "../../Components/Header/LiAHeader";
import LinearGradient from "react-native-linear-gradient";
import ScreenKey from "../../Navigation/ScreenKey";
import { _moderateScale, _widthScale } from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import { MyVoucher } from "@typings/voucher";
import MyVoucherItem from "./Components/MyVoucherItem";
import {
  useFocused,
  useNavigate,
  useNavigationParams,
} from "src/Hooks/useNavigation";
import { RenderItemProps } from "@typings/common";
import useItemExtractor from "src/Hooks/useItemExtractor";
import { getMyCoupons, loadMoreMyCoupons } from "@Redux/user/actions";
import { getMyCouponsState } from "@Redux/user/selectors";
import useListFilter from "src/Hooks/useListFilter";
import { useDispatch, useSelector } from "react-redux";
import { selectCoupon } from "@Redux/booking/actions";
import { getDataCreateBookingState } from "@Redux/booking/selectors";

type ScreenKey = typeof ScreenKey.MY_VOUCHERS;

const MyVouchers = () => {
  const dispatch = useDispatch();
  const { navigation } = useNavigate();
  const { isCreatingBooking } = useNavigationParams<ScreenKey>();
  const { dataCoupon } = useSelector(getDataCreateBookingState);
  const { isLoading, data, getData, loadMoreData, refreshData } = useListFilter(
    getMyCouponsState,
    getMyCoupons,
    loadMoreMyCoupons
  );

  useFocused(() => {
    getData();
  });

  const handleUseCoupon = useCallback((item: MyVoucher) => {
    navigation.navigate(ScreenKey.CREATE_BOOKING, { coupon: item });
    if (isCreatingBooking) {
      dispatch(selectCoupon(item));
    }
  }, []);

  const handleCancelCoupon = useCallback(() => {
    dispatch(selectCoupon(undefined));
  }, []);

  const handleViewDetails = useCallback((item: MyVoucher) => {
    navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, {
      infoVoucher: item,
      data: { ...item.coupon },
      isCreatingBooking: true,
    });
  }, []);

  function renderItem({ item }: RenderItemProps<MyVoucher>) {
    const isUsing = isCreatingBooking && item._id === dataCoupon?._id;
    return (
      <MyVoucherItem
        isUsing={isUsing}
        item={item}
        onDetails={handleViewDetails}
        onUseCoupon={handleUseCoupon}
        onCancelCoupon={handleCancelCoupon}
      />
    );
  }

  const { keyExtractor } = useItemExtractor<MyVoucher>((item) => item._id);

  return (
    <View style={styles.container}>
      <LiAHeader
        safeTop
        bg="transparent"
        barStyle={"light-content"}
        title={"Mã giảm giá của tôi"}
      />
      <LinearGradient
        style={[StyleSheet.absoluteFill, { zIndex: -1 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[BASE_COLOR, "white"]}
      />

      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={isLoading}
        onRefresh={refreshData}
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.2}
      />
    </View>
  );
};

export default MyVouchers;

const styles = StyleSheet.create({
  voucherBox__right__btn: {
    paddingHorizontal: _moderateScale(8),
    paddingVertical: _moderateScale(4),
    backgroundColor: BASE_COLOR,
    borderRadius: _moderateScale(4),
  },
  avatarVoucher: {
    width: _moderateScale(8 * 8),
    height: _moderateScale(8 * 8),
    borderRadius: _moderateScale(8),
  },
  dashLine: {
    width: 1,
    height: _moderateScale(8 * 8),
    backgroundColor: "transparent",
    borderStyle: "dashed",
    borderWidth: 1,
    top: _moderateScale(8),
    borderColor: WHITE,
  },
  voucherBox__left: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: _moderateScale(8),
  },
  voucherBox__right: {
    width: _moderateScale(8 * 10),
    height: _moderateScale(8 * 10),
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8),
    ...styleElement.centerChild,
  },
  voucherBox: {
    width: _widthScale(340),
    height: _moderateScale(8 * 10),
    alignSelf: "center",
    marginTop: _moderateScale(8 * 2),
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  contentContainer: {
    paddingBottom: 60,
  },
});
