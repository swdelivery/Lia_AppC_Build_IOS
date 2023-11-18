import Text from "@Components/Text";
import { Booking } from "@typings/booking";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import ItemService from "./ItemService";
import Column from "@Components/Column";
import Row from "@Components/Row";
import { BLACK, BLUE_FB, RED } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import { sum } from "lodash";
import Voucher from "./Voucher";

type Props = {
  booking: Booking;
};

export default function Services({ booking }: Props) {
  const totalAmount = useMemo(() => {
    let total = 0;
    booking.servicesNeedCare?.map((item) => {
      total += item.price;
    });
    return total;
  }, [booking]);

  const discountAmount = useMemo(() => {
    return sum(
      (booking.partnerCoupons || []).map((item) => {
        if (item.coupon.discountType === "percent") {
          const discount = (totalAmount * item.coupon.discountAmount) / 100;
          return Math.min(discount, item.coupon.maxAmountDiscount);
        }
        if (item.coupon.discountType === "fixed") {
          return item.coupon.discountAmount;
        }
        return 0;
      })
    );
  }, [totalAmount]);

  return (
    <View style={styles.container}>
      <Text weight="bold" color={BLACK} top={8} left={16}>
        Danh sách dịch vụ
      </Text>
      {booking.servicesNeedCare &&
        booking.servicesNeedCare?.map((item, index) => {
          return <ItemService key={item._id} item={item} />;
        })}
      <Column gap={8 * 2} paddingHorizontal={16} marginTop={16}>
        <Voucher booking={booking} />
        <Row justifyContent="space-between">
          <Text weight="bold">Tạm tính:</Text>
          <Text color={BLUE_FB} weight="bold">
            {`${formatMonney(Math.max(totalAmount - discountAmount, 0))} VNĐ`}
          </Text>
        </Row>
      </Column>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});
