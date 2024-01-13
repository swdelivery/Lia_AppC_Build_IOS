import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { _moderateScale } from "@Constant/Scale";
import Text from "@Components/Text";
import CardVoucher from "@Components/Voucher/CardVoucher";
import Row from "@Components/Row";
import { BASE_COLOR } from "@Constant/Color";
import useListFilter from "src/Hooks/useListFilter";
import { getMyCoupons, loadMoreMyCoupons } from "@Redux/user/actions";
import { getMyCouponsState } from "@Redux/user/selectors";
import { useFocused, useNavigate } from "src/Hooks/useNavigation";
import ScreenKey from "@Navigation/ScreenKey";
import Column from "@Components/Column";

const ListVoucher = () => {
  const { navigate } = useNavigate();
  const { isLoading, data, getData, loadMoreData, refreshData } = useListFilter(
    getMyCouponsState,
    getMyCoupons,
    loadMoreMyCoupons
  );

  useFocused(() => {
    getData();
  });

  const listVoucherAvailable = useMemo(() => {
    return data?.filter((item) => !item?.usedAt);
  }, [data]);

  useFocused(() => {
    getData({
      condition: {
        status: {
          equal: "UNUSED",
        },
      },
    });
  });
  return (
    <View style={{}}>
      <Row marginHorizontal={16} justifyContent="space-between">
        <Text size={14} weight="bold">
          Voucher
        </Text>

        <TouchableOpacity
          onPress={navigate(ScreenKey.MY_VOUCHERS, {
            isCreatingBooking: true,
          })}
        >
          <Text style={{ textDecorationLine: "underline" }} color={BASE_COLOR}>
            Xem tất cả
          </Text>
        </TouchableOpacity>
      </Row>

      <Column marginTop={8}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            gap: 4,
            paddingLeft: _moderateScale(8 * 2),
          }}
        >
          {listVoucherAvailable?.map((item, index) => {
            return <CardVoucher data={item} key={index} />;
          })}
        </ScrollView>
      </Column>
    </View>
  );
};

export default ListVoucher;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
