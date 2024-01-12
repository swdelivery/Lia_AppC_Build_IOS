import Text from "@Components/Text";
import { Booking } from "@typings/booking";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import ItemService from "./ItemService";
import Column from "@Components/Column";
import Row from "@Components/Row";
import { BASE_COLOR, BLACK } from "@Constant/Color";
import { formatMonney } from "@Constant/Utils";
import { sum } from "lodash";
import ItemInsurance from "@Screens/NewCreateBooking/Components/ItemInsurance";

type Props = {
  booking: Booking;
};

export default function Services({ booking }: Props) {
  const discountAmount = useMemo(() => {
    return sum(
      (booking.partnerCoupons || []).map((item) => {
        if (item.coupon.discountType === "percent") {
          const discount =
            (booking.totalAmount * item.coupon.discountAmount) / 100;
          return Math.min(discount, item.coupon.maxAmountDiscount);
        }
        if (item.coupon.discountType === "fixed") {
          return item.coupon.discountAmount;
        }
        return 0;
      })
    );
  }, [booking]);

  const discountLevel = useMemo(() => {
    if (!booking.partnerLevelPromotion) return 0;
    return (
      (booking.totalAmount *
        booking.partnerLevelPromotion.discountRetailService) /
      100
    );
  }, [booking]);

  return (
    <View style={styles.container}>
      <Text weight="bold" color={BLACK} top={8} left={16}>
        Danh sách dịch vụ
      </Text>
      {booking.services &&
        booking.services?.map((item, index) => {
          return <ItemService key={item._id} item={item} />;
        })}
      {booking.insurances?.length > 0 && (
        <>
          <Text weight="bold" color={BLACK} top={16} left={16}>
            Danh sách bảo hiểm
          </Text>
          {booking.insurances.map((item) => {
            return <ItemInsurance item={item.insurance} key={item._id} />;
          })}
        </>
      )}
      <Column gap={8 * 2} paddingHorizontal={16} marginTop={16}>
        <Row justifyContent="space-between">
          <Text weight="bold">Ưu đãi:</Text>
          <Text color={BASE_COLOR} weight="bold">
            {`-${formatMonney(discountAmount, true)}`}
          </Text>
        </Row>
        <Row justifyContent="space-between">
          <Text weight="bold">Giảm giá ước tính theo hạng:</Text>
          <Text color={BASE_COLOR} weight="bold">
            {`-${formatMonney(discountLevel, true)}`}
          </Text>
        </Row>
        <Row justifyContent="space-between">
          <Text weight="bold">Tạm tính:</Text>
          <Text color={"#0053BD"} weight="bold">
            {`${formatMonney(
              booking.totalAmount - discountAmount - discountLevel,
              true
            )}`}
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
