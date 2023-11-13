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
import { useFocused, useNavigate } from "src/Hooks/useNavigation";
import { RenderItemProps } from "@typings/common";
import useItemExtractor from "src/Hooks/useItemExtractor";
import { getMyCoupons, loadMoreMyCoupons } from "@Redux/user/actions";
import { getMyCouponsState } from "@Redux/user/selectors";
import useListFilter from "src/Hooks/useListFilter";

const MyVouchers = () => {
  const { navigation } = useNavigate();
  const { isLoading, data, getData, loadMoreData, refreshData } = useListFilter(
    getMyCouponsState,
    getMyCoupons,
    loadMoreMyCoupons
  );

  useFocused(() => {
    getData();
  });

  const handleUseCoupon = useCallback((item: MyVoucher) => {
    navigation.navigate(ScreenKey.CREATE_BOOKING);
  }, []);

  const handleViewDetails = useCallback((item: MyVoucher) => {
    navigation.navigate(ScreenKey.DETAIL_LIA_VOUCHER, {
      data: { ...item.coupon, isTaked: true },
    });
  }, []);

  function renderItem({ item }: RenderItemProps<MyVoucher>) {
    return (
      <MyVoucherItem
        item={item}
        onDetails={handleViewDetails}
        onUseCoupon={handleUseCoupon}
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
